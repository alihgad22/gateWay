# API Gateway

This is a NestJS-based API Gateway that routes requests to different microservices:
- Tenant Service (Port 3001)
- User Service (Port 3002)

## Installation

```bash
npm install
```

## Running the Gateway

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Routes

The API Gateway runs on port 3000 and routes requests as follows:

### Tenant Service
- All requests to `/api/tenants/*` are forwarded to `http://localhost:3001`
- Example: `/api/tenants/list` → `http://localhost:3001/list`

### User Service
- All requests to `/api/users/*` are forwarded to `http://localhost:3002`
- Example: `/api/users/profile` → `http://localhost:3002/profile`

## Features

- Request proxying to multiple services
- Path rewriting
- CORS enabled
- Error handling
- Request routing based on path patterns #   g a t e W a y  
 