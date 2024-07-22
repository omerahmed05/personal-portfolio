const bcrypt = require('bcrypt');

exports.handler = async (event, context) => {
  const { password } = JSON.parse(event.body);
  const storedHashedPassword = process.env.PASSWORD_HASH;

  try {
    const match = await bcrypt.compare(password, storedHashedPassword);
    if (match) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isAuthenticated: true }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ isAuthenticated: false }),
      };
    }
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ isAuthenticated: false }),
    };
  }
};
