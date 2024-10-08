const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');
const { createPassword, getPasswordsByUserId } = require('../models/Password');

// Usar una clave fija para el cifrado
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Clave de cifrado fija
const ivLength = 16; // Longitud del IV para aes-256-cbc

const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength); // Generar un nuevo IV para cada cifrado
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

const decrypt = (iv, encryptedText) => {
  const ivBuffer = Buffer.from(iv, 'hex');
  const encryptedTextBuffer = Buffer.from(encryptedText, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encryptedTextBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const register = async (req, res) => {
  const { email, password } = req.body;
  // Encriptar la contraseña
  const { iv, encryptedData } = encrypt(password);
  const user = await createUser(email, encryptedData, iv);
  res.status(201).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  // Verificar la contraseña (comparar el cifrado)
  if (!user || !(decrypt(user.iv, user.password) === password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const addPassword = async (req, res) => {
  const { userId } = req.user;
  const { name, value } = req.body;

  try {
    const { iv, encryptedData } = encrypt(value);
    const newPassword = await createPassword(userId, name, encryptedData, iv);
    res.status(201).json(newPassword);
  } catch (error) {
    console.error('Error adding password:', error);
    res.status(500).json({ message: 'Error adding password' });
  }
};

const getPasswords = async (req, res) => {
  const { userId } = req.user;

  try {
    const passwords = await getPasswordsByUserId(userId);
    // Descifrar contraseñas antes de enviarlas al frontend
    const decryptedPasswords = passwords.map(password => ({
      ...password,
      value: decrypt(password.iv, password.value) // Desencriptar la contraseña
    }));
    res.status(200).json(decryptedPasswords);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving passwords' });
  }
};

module.exports = {
  register,
  login,
  addPassword,
  getPasswords,
};
