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
    await db.collection('notes').doc(noteId).delete();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error deleting note:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete note', details: error.toString() }),
    };
  }
};
