# Users API Documentation

**Table of Contents**

- [Retrieving a List of Users](#get-apiv1users)
- [Retrieving a User's Avatar](#get-apiv1usersuseridavatarjpg)
- [Related API](#related-api)

---

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

---

## GET /api/v1/users/${userId}/avatar.jpg

### Purpose

Retrieves the avatar image for a specific user.

### Authentication

- **Required:** Secure, HTTP-only session cookie (or valid session token)
- Unauthorized access returns a 401 error.

### Request

- **Method:** GET

- **URL Format:** /api/v1/users/${userId}/avatar.jpg
	- **userId:** The unique identifier of the user whose avatar is being requested.

- **Headers:** None required
- **Cookies:** Must include a valid session cookie

### Response

#### Success (200 OK)

- Binary data of the user's avatar image.
- The `Content-Length` header will indicate the size of the image.
- The `Content-Type` header will reflect the MIME type of the image.
- The `Content-Disposition` header will suggest the original filename for download.

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

### Related API

- [Permissions API](permissions.md) - retrieve user permissions
- [Status API](status.md) - check current login state