/*
  Archivo: database/queries.js
  Autor: William Cardona
  Descripción: Pipelines de agregación para Apple Music Analytics
*/

const { MongoClient } = require('mongodb');

// Configuración
const URI = 'mongodb://localhost:27017';
const DB_NAME = 'apple_music_db';

async function runQueries() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("🔥 Ejecutando Analíticas de Negocio...\n");

        // ==========================================
        // 1. Reporte de Regalías (Royalties)
        // "¿Cuánto tiempo total (en segundos) se ha reproducido cada artista en el último mes?"
        // ==========================================
        const royaltiesQuery = [
            {
                // Filtrar último mes (aprox)
                $match: {
                    date: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
                }
            },
            {
                // Agrupar por Artista (usamos artist_id que ya viene en streams para optimizar)
                $group: {
                    _id: "$artist_id",
                    totalSeconds: { $sum: "$seconds_played" }
                }
            },
            {
                // Traer el nombre del artista
                $lookup: {
                    from: "artists",
                    localField: "_id",
                    foreignField: "_id",
                    as: "artist_info"
                }
            },
            { $unwind: "$artist_info" },
            {
                $project: {
                    _id: 0,
                    artist: "$artist_info.name",
                    total_seconds_played: "$totalSeconds"
                }
            }
        ];
        console.log("--- 1. ROYALTY REPORT ---");
        console.log(await db.collection('streams').aggregate(royaltiesQuery).toArray());


        // ==========================================
        // 2. El "Top 10" Regional (Guatemala)
        // "¿Cuáles son las 10 canciones más escuchadas en 'GT' en los últimos 7 días?"
        // ==========================================
        const top10GT = [
            {
                // Paso 1: Filtrar por fecha (7 días)
                $match: {
                    date: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
                }
            },
            {
                // Paso 2: Traer datos del usuario para ver su país
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user_info"
                }
            },
            { $unwind: "$user_info" },
            {
                // Paso 3: Filtrar solo usuarios de GT
                $match: { "user_info.country": "GT" }
            },
            {
                // Paso 4: Agrupar por canción y contar reproducciones
                $group: {
                    _id: "$song_id",
                    plays: { $count: {} }
                }
            },
            { $sort: { plays: -1 } }, // Orden descendente
            { $limit: 10 },           // Top 10
            {
                // Paso 5: Traer nombre de la canción para mostrar bonito
                $lookup: {
                    from: "songs",
                    localField: "_id",
                    foreignField: "_id",
                    as: "song_info"
                }
            },
            { $unwind: "$song_info" },
            {
                $project: {
                    song: "$song_info.title",
                    artist: "$song_info.artist_name",
                    plays: 1
                }
            }
        ];
        console.log("\n--- 2. TOP 10 GT ---");
        console.log(await db.collection('streams').aggregate(top10GT).toArray());


        // ==========================================
        // 3. Detección de "Usuarios Zombis" (Churn Risk)
        // "Usuarios Premium que NO han reproducido nada en los últimos 30 días"
        // ==========================================
        const zombieUsers = [
            {
                // Paso 1: Solo usuarios Premium
                $match: { subscription: "Premium" }
            },
            {
                // Paso 2: Buscar sus streams en los últimos 30 días
                $lookup: {
                    from: "streams",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user_id", "$$userId"] },
                                        { $gte: ["$date", new Date(new Date().setDate(new Date().getDate() - 30))] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "recent_streams"
                }
            },
            {
                // Paso 3: Filtrar los que tengan array de streams vacío
                $match: { recent_streams: { $size: 0 } }
            },
            {
                $project: {
                    username: 1,
                    email: 1,
                    subscription: 1
                }
            }
        ];
        console.log("\n--- 3. ZOMBIE USERS ---");
        console.log(await db.collection('users').aggregate(zombieUsers).toArray());


        // ==========================================
        // 4. Análisis de Demografía por Género (Reggaeton)
        // ==========================================
        const reggaetonDemographics = [
            {
                // Paso 1: Traer información de la canción para filtrar por género
                $lookup: {
                    from: "songs",
                    localField: "song_id",
                    foreignField: "_id",
                    as: "song_info"
                }
            },
            { $unwind: "$song_info" },
            { $match: { "song_info.genre": "Reggaeton" } },
            {
                // Paso 2: Traer usuario para saber edad
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user_info"
                }
            },
            { $unwind: "$user_info" },
            {
                // Paso 3: Calcular Edad y Agrupar (Bucket)
                $project: {
                    age: {
                        $dateDiff: {
                            startDate: "$user_info.birth_date",
                            endDate: "$$NOW",
                            unit: "year"
                        }
                    }
                }
            },
            {
                $bucket: {
                    groupBy: "$age",
                    boundaries: [0, 15, 21, 31, 50, 100],
                    default: "Other",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            }
        ];
        console.log("\n--- 4. REGGAETON DEMOGRAPHICS ---");
        console.log(await db.collection('streams').aggregate(reggaetonDemographics).toArray());


        // ==========================================
        // 5. Heavy Users (Gamification - Bad Bunny)
        // "Top 5 usuarios que han escuchado más canciones distintas de Bad Bunny"
        // ==========================================
        const heavyUsers = [
            {
                // Paso 1: Traer info de canción y filtrar Bad Bunny
                $lookup: {
                    from: "songs",
                    localField: "song_id",
                    foreignField: "_id",
                    as: "song_info"
                }
            },
            { $unwind: "$song_info" },
            { $match: { "song_info.artist_name": "Bad Bunny" } },
            {
                // Paso 2: Agrupar por usuario y recolectar IDs de canciones ÚNICAS (addToSet)
                $group: {
                    _id: "$user_id",
                    uniqueSongs: { $addToSet: "$song_id" }
                }
            },
            {
                // Paso 3: Contar el tamaño del set
                $project: {
                    unique_songs_count: { $size: "$uniqueSongs" }
                }
            },
            { $sort: { unique_songs_count: -1 } },
            { $limit: 5 },
            {
                // Paso 4: Nombre del usuario (Opcional para mostrar bonito)
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user_details"
                }
            },
            { $unwind: "$user_details" },
            {
                $project: {
                    username: "$user_details.username",
                    unique_bad_bunny_songs: "$unique_songs_count"
                }
            }
        ];
        console.log("\n--- 5. HEAVY USERS (Bad Bunny) ---");
        console.log(await db.collection('streams').aggregate(heavyUsers).toArray());

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

runQueries();