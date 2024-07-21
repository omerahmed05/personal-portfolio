const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    const note = JSON.parse(event.body);
    const noteRef = await db.collection('notes').add(note);
    return {
      statusCode: 200,
      body: JSON.stringify({ id: noteRef.id }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
