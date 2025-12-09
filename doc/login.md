# Login with username and password

**Table of Contents**
 
 - [Authenticate User](#post-apiv1login)
 - [Related Endpoints](#related-endpoints)
 
 ---

## POST /api/v1/login

### Purpose

Authenticates a user using their credentials (username and password).
On successful login, a session is created, and a session ID is stored in a secure, HTTP-only cookie.

---

### Authentication

- Not required before calling this endpoint
- Session cookie is issued on success

---

### Request

- **Method:** POST
- **URL:** /api/v1/login
- **Content-Type:** application/json
- **Body:** Must include both fields:

```json
{
	"userName": "string",
	"password": "string"
}
```

---

### Response

#### Success (200 OK)

JSON response example:

```json
{
	"httpStatusCode": 200,
	"userId": 3,
	"userSessionId": "3ca2ba3aaaefff86a57e213026565c4ab7335"
}
```

**Explanation:**

- **userId:** The unique ID of the authenticated user
- **userSessionId:** The identifier for the newly created session
- A secure, HTTP-only cookie containing the session ID is also set in the response

#### Error (401 Unauthorized)

JSON response example:

```json
{
	"errorText": "The username or password is invalid.",
	"httpStatusCode": 401
}
```

**Explanation:**

- Returned when the credentials are incorrect or missing

---

### Usage Notes

- On successful login, store no session data on the client—rely on the secure cookie.
- This endpoint is typically called from a login form.
- Subsequent authenticated requests should automatically include the session via the browser cookie.

---

### Related Endpoints

- [GET /api/v1/status](status.md) - Check current login state
- [POST /api/v1/logout](logout.md) - Log out and invalidate session