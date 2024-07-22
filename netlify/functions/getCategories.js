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
    console.log('Attempting to fetch categories from Firestore...');
    const categoriesSnapshot = await db.collection('categories').get();
    if (categoriesSnapshot.empty) {
      console.log('No matching documents found.');
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }
    const categories = categoriesSnapshot.docs.map(doc => doc.data().name);
    console.log('Fetched categories:', categories);
    return {
      statusCode: 200,
      body: JSON.stringify(categories),
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch categories', details: error.toString() }),
    };
  }
};
