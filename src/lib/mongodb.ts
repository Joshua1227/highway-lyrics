import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = { appName: "LyricsDB0" };

// let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  clientPromise = globalWithMongo._mongoClient.connect();
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = new MongoClient(uri, options).connect();
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.

export default clientPromise;
