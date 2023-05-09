
const { v4: uuidv4 } = require('uuid'); // Importer la fonction v4 de la bibliothèque uuid
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb+srv://userTest:spider1997@cluster0.pgsenuo.mongodb.net/?retryWrites=true&w=majority"
const uri = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const deviceId = uuidv4();
let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('AddressTrackingTest');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function addWatchedLocation(userId, latitude, longitude) {
    // Rechercher l'entrée existante pour cet userId
    const existingEntry = await db.collection('watchedLocations').findOne({ [userId]: { $exists: true } });
  
    if (existingEntry) {
      // Si l'entrée existe déjà, mettre à jour la latitude et la longitude
      existingEntry[userId].latitude = latitude;
      existingEntry[userId].longitude = longitude;
      await db.collection('watchedLocations').updateOne({ _id: existingEntry._id }, { $set: existingEntry });
    } else {
      // Si l'entrée n'existe pas, créer une nouvelle entrée
      const userObject = {
        [userId]: {
          latitude: latitude,
          longitude: longitude
        },
      };
      await db.collection('watchedLocations').insertOne(userObject);
    }
}

connectToDatabase();

module.exports = {
    connectToDatabase,
    addWatchedLocation,
    deviceId
  };
