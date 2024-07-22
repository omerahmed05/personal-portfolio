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
    const noteId = event.queryStringParameters.id;
    const updatedNote = JSON.parse(event.body);
    await db.collection('notes').doc(noteId).set(updatedNote, { merge: true });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error updating note:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update note', details: error.toString() }),
    };
  }
};
