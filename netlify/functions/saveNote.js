const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    const note = JSON.parse(event.body);
    const noteRef = await db.collection('notes').add(note);
    return {
      statusCode: 200,
      body: JSON.stringify({ id: noteRef.id }),
    };
  } catch (error) {
    console.error('Error saving note:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save note', details: error.toString() }),
    };
  }
};
