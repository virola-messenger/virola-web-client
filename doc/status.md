# Status Check

**Table of Contents**
 
 - [Check Login Status](#get-apiv1status)
 - [Related Endpoints](#related-endpoints)
 
 ---

## GET /api/v1/status

### Purpose

Checks whether the current user is logged in to the server.

This endpoint is intended for frontend applications to verify authentication status. Since authentication is handled via secure, HTTP-only cookies, this endpoint allows client-side code (which cannot access these cookies) to confirm whether a user session exists.

---

### Authentication
- **Required**: Secure, HTTP-only session cookie
- **Not required**: `Authorization` header or access token in request body

---

### Request 

- **Method:** `GET`
- **URL:** `/api/v1/status`
- **Headers:** None required
- **Cookies:** Must include a valid session cookie

---

### Response

#### Success (200 OK)

JSON response example:

```json
{
	"httpStatusCode": 200,
	"userId": 352,
	"userSessionId": "f1017fac1232132353421a9d5c95714aaafff33232bb27b1bdc693"
}
```

**Explanation:**

- **userId:** The unique ID of the authenticated user
- **userSessionId:** The identifier for the active user session

#### Error (401 Unauthorized)

JSON response example:

```json
{
	"errorText": "Wrong Bearer, please renew Web API Access Token",
	"httpStatusCode": 401
}
```

**Explanation:**

- This occurs when:
	- No valid session cookie is present
	- The session has expired
	- The cookie token is malformed or revoked

---

### Usage Notes

- Call this endpoint on app load or route change to determine if a session exists.
- A 401 response means the user is not authenticated and should be redirected to the login page or flow.
- No sensitive data is exposed in the response—safe for public frontend use.

---

### Related Endpoints

- [POST /api/v1/login](login.md) - Authenticate user and initiate session
- [POST /api/v1/logout](logout.md) - Terminate the current session