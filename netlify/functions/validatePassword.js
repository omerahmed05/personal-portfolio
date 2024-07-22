const PASSWORD = process.env.PASSWORD_HASH;

exports.handler = async (event) => {
  const { password } = JSON.parse(event.body);

  try {
    const isMatch = password === PASSWORD;
    return {
      statusCode: 200,
      body: JSON.stringify({ isAuthenticated: isMatch }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to validate password' }),
    };
  }
};