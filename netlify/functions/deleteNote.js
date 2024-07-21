const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    const noteId = event.queryStringParameters.id;
    await db.collection('notes').doc(noteId).delete();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
