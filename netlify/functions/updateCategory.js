const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  const { name } = JSON.parse(event.body);

  try {
    const result = await client.query(
      q.Update(q.Ref(q.Collection('categories'), id), { data: { name } })
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
