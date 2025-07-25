const jwt = require('jsonwebtoken');

const getJWTSecret = () => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is required');
    }
    return JWT_SECRET;
};

const protect = (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return;
    }
    try {
        const decoded = jwt.verify(token, getJWTSecret());
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Role-based authorization middleware
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: 'Not authorized, no user info' });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                message: `Access denied. Required role: ${allowedRoles.join(' or ')}, your role: ${req.user.role}`
            });
            return;
        }

        next();
    };
};

// Convenience middleware for manager-only routes
const requireManager = requireRole(['manager']);

// Convenience middleware for engineer-only routes  
const requireEngineer = requireRole(['engineer']);

module.exports = {
    protect,
    requireRole,
    requireManager,
    requireEngineer
}; 