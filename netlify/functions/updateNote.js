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
    const updatedNote = JSON.parse(event.body);
    const noteId = updatedNote.id;
    
    if (!noteId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Note ID is required' }),
      };
    }
    
    // Remove the id from the data to be stored (Firestore doesn't store it in the document)
    const { id, ...noteData } = updatedNote;
    
    await db.collection('notes').doc(noteId).set(noteData, { merge: true });
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
