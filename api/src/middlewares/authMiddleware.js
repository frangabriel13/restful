const isSuperAdmin = (req, res, next) => {
  if(req.user.role === 'superAdmin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado: solo superAdmin puede realizar esta acción.' });
  }
};


module.exports = {
  isSuperAdmin,
};