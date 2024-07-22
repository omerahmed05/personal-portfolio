const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

exports.handler = async () => {
  try {
    console.log('Attempting to fetch notes from Firestore...');
    const notesSnapshot = await db.collection('notes').get();
    if (notesSnapshot.empty) {
      console.log('No matching documents found.');
      return {
        statusCode: 200,
        body: JSON.stringify([]), // Return an empty array if no documents are found
      };
    }
    const notes = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched notes:', notes);
    return {
      statusCode: 200,
      body: JSON.stringify(notes),
    };
  } catch (error) {
    console.error('Error fetching notes:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch notes', details: error.toString() }),
    };
  }
};
