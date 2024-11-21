const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Acesso negado. Token não encontrado.' });
  }

  jwt.verify(token, 'secrectKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Somente administradores.' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = adminAuth;
