import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URL;

const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

client = new MongoClient(uri!, options);
clientPromise = client.connect();

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}
clientPromise
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.log(error, "MongoDB Error");
  });

export default clientPromise;
