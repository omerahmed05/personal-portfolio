const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event) => {
  const { name } = JSON.parse(event.body);

  try {
    // Ensure no duplicates in categories
    const existingCategory = await client.query(
      q.Exists(q.Match(q.Index('categories_by_name'), name))
    );
    if (existingCategory) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Category already exists' }),
      };
    }

    const result = await client.query(
      q.Create(q.Collection('categories'), { data: { name } })
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
