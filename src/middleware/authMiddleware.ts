import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error('JWT_SECRET environment variable is required');
    process.exit(1);
}

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
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
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Role-based authorization middleware
export const requireRole = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
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
export const requireManager = requireRole(['manager']);

// Convenience middleware for engineer-only routes  
export const requireEngineer = requireRole(['engineer']); 