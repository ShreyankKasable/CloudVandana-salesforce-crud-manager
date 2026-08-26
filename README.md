# Salesforce CRUD Manager

A full-stack Salesforce integration application built as part of the
CloudVandana Associate Software Engineer assignment.

The application allows users to authenticate with Salesforce using OAuth 2.0
and manage Salesforce records directly from a custom React interface without
using the native Salesforce UI.

## Live Application

**Frontend:**  
https://cloudvandana-salesforce-frontend-psg2.onrender.com

**Backend:**  
https://cloudvandana-salesforce-crud-manager.onrender.com

---

## Features

- Salesforce OAuth 2.0 authentication
- PKCE-based OAuth authorization flow
- Secure server-side session management
- Redis-backed session storage
- Automatic Salesforce access-token refresh
- Redis-based locking to prevent concurrent refresh-token race conditions
- Dynamic Salesforce field metadata using the Describe API
- CRUD operations on Salesforce standard objects
- Dynamic forms based on Salesforce field metadata
- Dynamic record tables
- Picklist support using Salesforce metadata
- Server-side pagination
- Infinite scrolling with 20 records per request
- Centralized API and error handling
- Responsive React dashboard
- Production deployment using Render

---

## Supported Salesforce Objects

The application supports the following Salesforce standard objects:

- Account
- Contact
- Lead
- Opportunity
- Case

Each object exposes a selected set of useful fields while field metadata such
as labels, data types, required status, editability, and picklist values is
retrieved dynamically from Salesforce.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- styled-components
- Axios
- Intersection Observer API

### Backend

- Node.js
- Express.js
- Axios
- express-session
- Redis / Valkey
- connect-redis

### Salesforce

- Salesforce REST API
- Salesforce OAuth 2.0
- PKCE
- SOQL
- sObject API
- Salesforce Describe API

### Deployment

- Render Web Service
- Render Static Site
- Render Key Value

---

## Application Architecture

```text
                    +---------------------+
                    |    React Frontend   |
                    |       Render        |
                    +----------+----------+
                               |
                         HTTPS / REST
                               |
                               v
                    +---------------------+
                    |   Express Backend   |
                    |       Render        |
                    +------+--------+-----+
                           |        |
                Sessions / |        | Salesforce REST API
                Locks      |        |
                           v        v
                  +------------+  +---------------+
                  |Redis/Valkey|  |  Salesforce   |
                  |   Render   |  | Developer Org |
                  +------------+  +---------------+
```

The frontend never stores Salesforce access or refresh tokens.

OAuth credentials and Salesforce tokens are managed entirely by the backend.
The browser only stores the HTTP session cookie used to identify the
server-side session.

---

## Salesforce Authentication Flow

The application uses Salesforce OAuth 2.0 with PKCE.

```text
User
  |
  | Connect Salesforce
  v
GET /auth/salesforce
  |
  v
Generate:
- state
- PKCE code verifier
- PKCE code challenge
  |
  v
Redirect to Salesforce
  |
  v
User authenticates
  |
  v
Salesforce callback
/auth/salesforce/callback
  |
  v
Validate state
  |
  v
Exchange authorization code
  |
  v
Receive:
- access token
- refresh token
- Salesforce instance URL
  |
  v
Store credentials in Redis-backed session
  |
  v
Redirect to React dashboard
```

---

## Automatic Token Refresh

Salesforce access tokens can expire while the user is using the application.

The backend automatically handles this situation.

```text
Salesforce API Request
        |
        v
 Access token valid?
     |       |
    Yes      No
     |       |
     v       v
  Response   401 / INVALID_SESSION_ID
                |
                v
          Refresh access token
                |
                v
          Update session tokens
                |
                v
         Retry original request
```

The frontend does not need to manage token refresh.

---

## Concurrent Refresh Protection

Multiple API requests can fail at the same time when an access token expires.

If every request attempted to refresh the same Salesforce refresh token,
refresh-token rotation could cause race conditions.

The application prevents this using a Redis lock.

```text
Request A --+
Request B --+-- Expired Access Token
Request C --+
             |
             v
        Redis Refresh Lock
             |
      +------+------+
      |             |
   Winner         Waiting
 Request          Requests
      |             |
      v             |
Refresh token       |
      |             |
      v             |
Store refreshed tokens
      |             |
      +------+------+
             |
             v
      All requests continue
```

Redis uses `SET NX PX` so only one request performs the token refresh.

Waiting requests use the refreshed token produced by the request that acquired
the lock.

---

## Dynamic Salesforce Metadata

The frontend does not maintain separate hardcoded forms for every Salesforce
object.

The backend calls Salesforce's Describe API:

```text
GET /services/data/{version}/sobjects/{ObjectName}/describe
```

and extracts metadata such as:

- field name
- label
- Salesforce data type
- createable
- updateable
- required
- picklist values

Example metadata:

```json
{
  "name": "Industry",
  "label": "Industry",
  "type": "picklist",
  "createable": true,
  "updateable": true,
  "required": false,
  "options": [
    {
      "label": "Technology",
      "value": "Technology"
    }
  ]
}
```

The React frontend uses this metadata to dynamically generate forms.

```text
Salesforce Type     UI Field

string              Text Input
phone               Phone Input
email               Email Input
url                 URL Input
date                Date Input
currency            Number Input
boolean             Checkbox
picklist            Select
```

---

## CRUD Operations

Users can perform complete CRUD operations from the custom interface.

### List Records

```http
GET /api/salesforce/:objectName?page=1
```

Records are loaded in groups of 20.

### Get Field Metadata

```http
GET /api/salesforce/:objectName/fields
```

Returns dynamic Salesforce field metadata.

### View Record

```http
GET /api/salesforce/:objectName/:recordId
```

### Create Record

```http
POST /api/salesforce/:objectName
```

Example:

```json
{
  "Name": "Example Account",
  "Industry": "Technology",
  "Phone": "9876543210"
}
```

Only Salesforce fields marked as `createable` are submitted.

### Update Record

```http
PATCH /api/salesforce/:objectName/:recordId
```

Only Salesforce fields marked as `updateable` are submitted.

### Delete Record

```http
DELETE /api/salesforce/:objectName/:recordId
```

The frontend displays a confirmation dialog before deletion.

---

## Pagination and Infinite Scroll

The backend loads a maximum of 20 records per request.

Example:

```http
GET /api/salesforce/Account?page=1
```

The response includes:

```json
{
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "hasMore": true,
    "nextPage": 2
  }
}
```

The frontend uses the Intersection Observer API to detect when the user reaches
the bottom of the table.

If additional records exist, the next page is fetched and appended to the
existing records.

---

## Project Structure

```text
CloudVandana-salesforce-crud-manager/

+-- backend/
|   +-- src/
|       +-- config/
|       +-- controllers/
|       +-- middleware/
|       +-- routes/
|       +-- services/
|       +-- utils/
|       +-- app.js
|       +-- server.js
|
+-- frontend/
|   +-- src/
|       +-- components/
|       +-- config/
|       +-- hooks/
|       +-- pages/
|       +-- services/
|       +-- styles/
|       +-- App.jsx
|       +-- main.jsx
|
+-- README.md
```

---

## Local Development

### Prerequisites

Make sure the following are available:

- Node.js
- npm
- Salesforce Developer Org
- Salesforce External Client App
- Redis-compatible database

### Backend Setup

Move into the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`.

```env
PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173

SALESFORCE_CLIENT_ID=your_client_id
SALESFORCE_CLIENT_SECRET=your_client_secret

SALESFORCE_REDIRECT_URI=http://localhost:5000/auth/salesforce/callback
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_API_VERSION=v67.0

SESSION_SECRET=your_session_secret

REDIS_URL=your_redis_connection_url
```

Never commit actual secrets to GitHub.

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### Frontend Setup

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `frontend/.env.example`.

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start Vite:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Production Configuration

The deployed application uses separate frontend and backend services.

### Frontend

```env
VITE_API_BASE_URL=https://cloudvandana-salesforce-crud-manager.onrender.com
```

### Backend

Production configuration includes:

```env
NODE_ENV=production

FRONTEND_URL=https://cloudvandana-salesforce-frontend-psg2.onrender.com

SALESFORCE_REDIRECT_URI=https://cloudvandana-salesforce-crud-manager.onrender.com/auth/salesforce/callback
```

Sensitive credentials such as the Salesforce Client Secret, Redis URL, and
session secret are stored securely as Render environment variables and are
not committed to the repository.

---

## Security Considerations

The project includes several security-focused implementation details:

- Salesforce OAuth 2.0 authentication
- PKCE authorization flow
- OAuth `state` validation for CSRF protection
- HTTP-only session cookies
- Secure cookies in production
- Server-side Salesforce token storage
- Redis-backed sessions
- Salesforce access tokens are never exposed to React
- Refresh-token rotation support
- Redis locking for concurrent token refresh
- Redis lock ownership validation before lock deletion
- Salesforce object whitelist
- Salesforce record ID validation
- Create/update field validation
- Centralized error handling
- Secrets stored using environment variables

---

## Deployment

The application is deployed using Render.

### Frontend

Render Static Site

[https://cloudvandana-salesforce-frontend-psg2.onrender.com](https://cloudvandana-salesforce-frontend-psg2.onrender.com)

### Backend

Render Web Service

[https://cloudvandana-salesforce-crud-manager.onrender.com](https://cloudvandana-salesforce-crud-manager.onrender.com)

### Redis

Render Key Value / Valkey is used for:

- Express session storage
- Salesforce refresh-token coordination
- Short-lived refresh results

The deployed backend uses Render's internal Key Value connection URL.

---

## Assignment Requirements Covered

The application provides:

- Salesforce OAuth authentication
- Custom UI without using Salesforce native UI
- Account management
- Contact management
- Lead management
- Opportunity management
- Case management
- Dynamic field handling
- View records
- Create records
- Update records
- Delete records
- 20-record pagination
- Infinite scrolling
- Online deployment

---

## Author

**Shreyank Kasable**

GitHub:  
[https://github.com/ShreyankKasable](https://github.com/ShreyankKasable)

---

## Repository

[https://github.com/ShreyankKasable/CloudVandana-salesforce-crud-manager](https://github.com/ShreyankKasable/CloudVandana-salesforce-crud-manager)
