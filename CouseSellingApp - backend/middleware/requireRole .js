function requireRole(role) {
    return function (req, res, next) {
      if (req.role !== role) {
        return res.status(403).json({ message: `Only ${role}s allowed` });
      }
      next();
    };
  }
  module.exports = { requireRole };