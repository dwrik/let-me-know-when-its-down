import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable!')
}

/**
 * Mongoose Docs
 */
let conn = null

async function dbConnect() {
  if (conn === null) {
    conn = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    }).then(() => mongoose)

    // awaiting connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn
  }

  return conn
}

/**
 * Random Article
 */
// async function dbConnect() {
//   if (mongoose.connections[0].readyState) {
//     return
//   }
//   try {
//     await mongoose.connect(MONGODB_URI)
//     console.log('Connected to MongoDB')
//   } catch (error) {
//     console.log('Couldn\'t connect to MongoDB')
//     console.error(error)
//   }
// }

/**
 * NextJs Github
 * 
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose
//     })
//   }

//   cached.conn = await cached.promise
//   return cached.conn
// }

export default dbConnect