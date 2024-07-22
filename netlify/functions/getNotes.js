// netlify/functions/getNotes.js
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
    const notesSnapshot = await db.collection('notes').get();
    const notes = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return {
      statusCode: 200,
      body: JSON.stringify(notes),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
