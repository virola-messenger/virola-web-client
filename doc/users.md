## GET /api/v1/users

### Purpose

Retrieves a list of users from the server.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie (or valid session token)
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** GET
- **URL:** /api/v1/users
- **Headers:** None required
- **Cookies:** Valid session cookie must be present

### Response

#### Success (200 OK)

JSON response example:

```json
{
  "httpStatusCode": 200,
  "users": [
    {
      "createdUtc": 1718454147233,
      "displayName": "Admin",
      "isAdmin": true,
      "lastModifiedUtc": 1718454147233,
      "status": "Active",
      "userId": 1,
      "userName": "admin"
    },
    {
      "createdUtc": 1718454147239,
      "displayName": "Bob (Test User)",
      "isAdmin": false,
      "lastModifiedUtc": 1718454147239,
      "status": "Active",
      "userId": 2,
      "userName": "bob"
    }
  ]
}
```

**Explanation:**

- **userId:** Unique identifier for the user
- **userName:** System username
- **displayName:** Name shown in the UI
- **isAdmin:** true if the user is an administrator
- **status:** Account status

	- **Possible values:**
		- *Active*
		- *Suspended*
		- *DeletionInProgress*

- **createdUtc, lastModifiedUtc:** Unix timestamps in milliseconds (UTC)

#### Error (any HTTP error code)

JSON response example:

```json
{
	"errorText": "Wrong Bearer, please renew Web API Access Token",
	"httpStatusCode": 401
}
```

**Explanation:**

- **errorText:** Contains a description of the failure
- **httpStatusCode:** HTTP status code reflects the error type (e.g., 401 for unauthorized, 500 for internal error)
