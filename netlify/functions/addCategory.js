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
    const { name } = JSON.parse(event.body);
    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Category name is required' }),
      };
    }
    const existingCategory = await db.collection('categories').where('name', '==', name).get();
    if (!existingCategory.empty) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Category already exists' }),
      };
    }
    await db.collection('categories').add({ name });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error adding category:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add category', details: error.toString() }),
    };
  }
};
