// Código con uso inseguro de JWT
const jwt = require('jsonwebtoken');

const secretKey = 'claveSuperSecreta';
const userData = { userId: 123, role: 'admin' };

// Token expira en 1 hora, pero no se verifica la firma al decodificar
const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });

// Decodificación sin verificar la firma
const decoded = jwt.decode(token);
console.log(decoded);