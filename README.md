# Backend - Engineering Resource Management API

A robust RESTful API server built with Node.js, Express.js, and MongoDB for managing engineering resources, projects, and assignments with JWT-based authentication.

## 🚀 Tech Stack

- **Node.js** with **Express.js** - Web framework for RESTful API
- **TypeScript** - Type-safe server-side development
- **MongoDB** with **Mongoose ODM** - Document database with schema validation
- **JWT (jsonwebtoken)** - Stateless authentication tokens
- **bcryptjs** - Password hashing and security
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration management

## 🏗️ Architecture Overview

### Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.ts              # MongoDB connection configuration
│   ├── controllers/
│   │   ├── analyticsController.ts    # Analytics and reporting logic
│   │   ├── assignmentController.ts   # Assignment CRUD operations
│   │   ├── authController.ts         # Authentication and authorization
│   │   ├── engineerController.ts     # Engineer management
│   │   ├── managerController.ts      # Manager-specific operations
│   │   └── projectController.ts      # Project management
│   ├── middleware/
│   │   └── authMiddleware.ts         # JWT token validation
│   ├── models/
│   │   ├── Assignment.ts             # Assignment schema
│   │   ├── Project.ts                # Project schema
│   │   └── User.ts                   # User schema (engineers & managers)
│   ├── routes/
│   │   ├── analytics.ts              # Analytics endpoints
│   │   ├── assignments.ts            # Assignment routes
│   │   ├── auth.ts                   # Authentication routes
│   │   ├── engineers.ts              # Engineer management routes
│   │   ├── manager.ts                # Manager-specific routes
│   │   └── projects.ts               # Project routes
│   ├── seed/
│   │   ├── assignments.ts            # Sample assignment data
│   │   ├── projects.ts               # Sample project data
│   │   ├── seedAll.ts                # Orchestrates all seeding
│   │   └── users.ts                  # Sample user data
│   └── index.ts                      # Express server entry point
├── package.json
└── tsconfig.json
```

### API Design Principles

#### RESTful Resource Structure
- **Users** (`/api/auth`, `/api/engineers`, `/api/manager`) - User management and authentication
- **Projects** (`/api/projects`) - Project lifecycle management
- **Assignments** (`/api/assignments`) - Resource allocation tracking
- **Analytics** (`/api/analytics`) - Reporting and insights

#### Middleware Pipeline
```typescript
Request → CORS → JSON Parser → Auth Middleware → Route Handler → Response
```

## 🔐 Authentication & Authorization

### JWT Token System
```typescript
// Token structure
{
  id: string,           // User ID
  email: string,        // User email
  role: 'manager' | 'engineer',
  iat: number,          // Issued at
  exp: number           // Expiration
}
```

### Role-Based Access Control
- **Managers**: Full access to all resources, can create/modify projects and assignments
- **Engineers**: Read access to projects, limited access to own profile and assignments

### Password Security
- **bcrypt hashing** with salt rounds for secure password storage
- **Password validation** on authentication endpoints
- **Token expiration** for session management

## 📊 Database Schema

### User Model
```typescript
interface IUser {
  email: string;           // Unique identifier
  name: string;            // Display name
  role: 'engineer' | 'manager';
  skills?: string[];       // Technical skills (engineers)
  seniorityLevel?: 'junior' | 'mid' | 'senior' | 'lead';
  employmentType?: 'full-time' | 'part-time';
  capacity?: number;       // Work capacity percentage
  department?: string;     // Organizational unit
  joinDate?: Date;         // Employment start date
  password: string;        // Hashed password
}
```

### Project Model
```typescript
interface IProject {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  requiredTeamSize: number;
  requiredSkills: string[];
  status: 'planning' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdBy: ObjectId;     // Reference to User
  createdAt: Date;
}
```

### Assignment Model
```typescript
interface IAssignment {
  engineerId: ObjectId;    // Reference to User (engineer)
  projectId: ObjectId;     // Reference to Project
  allocationPercentage: number;  // 0-100%
  startDate: Date;
  endDate: Date;
  role?: string;           // Role in project
  notes?: string;          // Additional details
  createdBy: ObjectId;     // Reference to User (manager)
  createdAt: Date;
}
```

## 🛠️ API Endpoints

### Authentication Routes (`/api/auth`)
```
POST /login/manager     - Manager login
POST /login/engineer    - Engineer login
GET  /profile          - Get current user profile (protected)
```

### Engineer Routes (`/api/engineers`)
```
GET    /               - List all engineers (manager only)
POST   /               - Create new engineer (manager only)
GET    /:id            - Get engineer details
PUT    /:id            - Update engineer profile
DELETE /:id            - Remove engineer (manager only)
```

### Project Routes (`/api/projects`)
```
GET    /               - List all projects
POST   /               - Create new project (manager only)
GET    /:id            - Get project details
PUT    /:id            - Update project (manager only)
DELETE /:id            - Delete project (manager only)
```

### Assignment Routes (`/api/assignments`)
```
GET    /               - List assignments (filtered by role)
POST   /               - Create new assignment (manager only)
GET    /:id            - Get assignment details
PUT    /:id            - Update assignment (manager only)
DELETE /:id            - Remove assignment (manager only)
```

### Analytics Routes (`/api/analytics`)
```
GET    /workload       - Engineer workload distribution (manager only)
GET    /projects       - Project status overview (manager only)
GET    /capacity       - Team capacity analysis (manager only)
```

## 🚦 Setup & Installation

### Prerequisites
- **Node.js** v18+ and npm
- **MongoDB** (local or MongoDB Atlas)

### Environment Configuration
Create `.env` file:
```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/engineering-resource-management
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/engineering-resource-management

# Server Configuration
PORT=5001
NODE_ENV=development

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
```

### Installation Steps
```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Populate database with sample data
npm run seed
```

## 🗄️ Database Seeding

The application includes comprehensive sample data:

```bash
# Seed all data at once
npm run seed

# Or seed individually
npx ts-node src/seed/users.ts
npx ts-node src/seed/projects.ts
npx ts-node src/seed/assignments.ts
```

### Sample Data Includes:
- **1 Manager**: `manager1@example.com`
- **4 Engineers**: Various skills, seniority levels, and capacities
- **4 Projects**: Different priorities and requirements
- **8 Assignments**: Complex allocation scenarios

All users have password: `password123`

## 🔍 Error Handling

### HTTP Status Codes
- **200** - Success with data
- **201** - Resource created successfully
- **400** - Bad request (validation errors)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (insufficient permissions)
- **404** - Resource not found
- **500** - Internal server error

### Error Response Format
```json
{
  "error": "Error message",
  "details": "Additional context (in development)",
  "code": "ERROR_CODE"
}
```

## 🧪 Testing & Debugging

### Manual API Testing
```bash
# Test authentication
curl -X POST http://localhost:5001/api/auth/login/manager \
  -H "Content-Type: application/json" \
  -d '{"email":"manager1@example.com","password":"password123"}'

# Test protected endpoint
curl -X GET http://localhost:5001/api/engineers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Database Queries
```bash
# Connect to MongoDB (if local)
mongosh engineering-resource-management

# View collections
show collections

# Sample queries
db.users.find({role: "engineer"})
db.projects.find({status: "active"})
db.assignments.aggregate([...])
```

## 🚀 Performance Considerations

### Database Optimization
- **Indexes** on frequently queried fields (email, role, projectId, engineerId)
- **Population** for related documents (assignments with user/project details)
- **Aggregation pipelines** for complex analytics queries

### Security Best Practices
- **Input validation** using Mongoose schemas
- **Rate limiting** (recommended for production)
- **CORS configuration** for specific origins
- **Environment variable protection** for sensitive data

## 🔮 Future Enhancements

### API Improvements
- **Pagination** for large datasets
- **Filtering and sorting** query parameters
- **API versioning** for backward compatibility
- **Rate limiting** and request throttling
- **API documentation** with Swagger/OpenAPI

### Advanced Features
- **Real-time WebSocket** integration
- **File upload** for project documents
- **Email notifications** for assignment changes
- **Audit logging** for all operations
- **Batch operations** for bulk updates

### Monitoring & Observability
- **Health check endpoints** for load balancers
- **Metrics collection** with Prometheus
- **Logging** with structured JSON format
- **Performance monitoring** with APM tools

## 🤝 Development Guidelines

### Code Organization
- **Controllers** handle HTTP request/response logic
- **Models** define data structure and validation
- **Middleware** handles cross-cutting concerns
- **Routes** define endpoint structure and apply middleware

### TypeScript Best Practices
- **Interface definitions** for all data structures
- **Type guards** for runtime validation
- **Generic types** for reusable functions
- **Strict mode** enabled for type safety

### Database Best Practices
- **Schema validation** at the database level
- **Reference population** for related data
- **Compound indexes** for complex queries
- **Connection pooling** for performance

---

*This backend serves as the foundation for a scalable engineering resource management system, providing secure, performant APIs for frontend consumption.* 
# Backend converted to JavaScript for deployment
This backend has been converted from TypeScript to JavaScript to resolve deployment issues.
