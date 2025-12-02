## POST /api/v1/logout

### Purpose

Logs out the currently authenticated user by invalidating the server-side session and removing the session cookie.

---

### Authentication

- Required a valid session via secure, HTTP-only cookie

---

### Request

- **Method:** POST
- **URL:** /api/v1/logout
- **Headers:** None required
- **Body:** No body content required

---

### Response

#### Success (200 OK)

JSON response example:

```json
{
	"httpStatusCode": 200
}
```

**Explanation:**

- Indicates the session has been successfully terminated
- The server instructs the client to delete the session cookie

#### Error (401 Unauthorized)

JSON response example:

```json
{
	"errorText": "The Authorization HTTP-header or VirolaUserSessionId cookie expected",
	"httpStatusCode": 401
}
```

**Explanation:**

- Returned when no valid session identifier is found in the request
- May happen if the session cookie is missing or already expired

---

### Usage Notes

- This endpoint should be called when a user logs out manually (e.g., clicks a "Logout" button)
- It is safe to call even if the session has already expired
- Always expect the cookie to be cleared by the server after logout

---

### Related Endpoints

- POST /api/v1/login - Start a new session
- GET /api/v1/status - Check if session is active

