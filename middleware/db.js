import mongoose from 'mongoose';

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose
    .connect(process.env.MONGODB_URI)
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err);
    });

  return mongoose;
}

export function jsonify(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default async function dbMiddleware(req, res, next) {
  try {
    if (!global.mongoose) {
      global.mongoose = dbConnect();
    }
  } catch (error) {
    console.error(error);
  }

  return next();
}
