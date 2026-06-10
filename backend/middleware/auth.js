// Allowed roles in the system
const ALLOWED_ROLES = ['admin', 'staff', 'manager', 'storekeeper'];

// Middleware to check if user is authenticated via session
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized. Please log in.' });
};

// Middleware to require admin role (full control)
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};

// Role permission map:
//   admin       → full CRUD (GET, POST, PUT, DELETE)
//   manager     → full CRUD (GET, POST, PUT, DELETE)
//   staff       → read (GET) + insert (POST)
//   storekeeper → read (GET) + insert (POST)
const requireAdminOrInsert = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
  const role = req.session.user.role;
  // admin & manager can do everything
  if (role === 'admin' || role === 'manager') return next();
  // staff & storekeeper can only GET and POST
  if (req.method === 'GET' || req.method === 'POST') return next();
  return res.status(403).json({ message: 'Access denied. You can only view or add records.' });
};

module.exports = { requireAuth, requireAdmin, requireAdminOrInsert, ALLOWED_ROLES };
