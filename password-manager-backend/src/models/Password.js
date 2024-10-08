const pool = require('../utils/db');

const createPassword = async (userId, name, encryptedPassword, iv) => {
  const result = await pool.query(
    'INSERT INTO passwords (user_id, name, value, iv) VALUES ($1, $2, $3, $4) RETURNING id, name',
    [userId, name, encryptedPassword, iv] // Aquí se usa `value` para almacenar la contraseña cifrada
  );
  return result.rows[0];
};

const getPasswordsByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM passwords WHERE user_id = $1', [userId]);
  return result.rows;
};

module.exports = {
  createPassword,
  getPasswordsByUserId,
};
