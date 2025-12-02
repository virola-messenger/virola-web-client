## GET /api/v1/rooms

### Purpose

Retrieves a list of chat rooms the authenticated user has access to.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** GET
- **URL:** /api/v1/rooms
- **Headers:** None required
- **Cookies:** Valid session cookie must be present

---

### Response

#### Success (200 OK)

JSON response example:

```json
{
  "httpStatusCode": 200,
  "rooms": [
    {
      "createdUtc": 1718454147258,
      "displayName": "Admin",
      "lastModifiedUtc": 1718454147258,
      "roomId": 2,
      "roomType": "Private",
      "unreadMessageCount": 0
    },
    {
      "createdUtc": 1718454147265,
      "displayName": "Welcome!",
      "lastModifiedUtc": 1718454147265,
      "roomId": 3,
      "roomType": "Public",
      "unreadMessageCount": 2243
    }
  ]
}
```

**Explanation:**

- **roomId:** Unique identifier for the room
- **displayName:** Name displayed in the UI
- **roomType:** "Private" or "Public"
- **unreadMessageCount:** Number of unread messages in the room
- **createdUtc, lastModifiedUtc:** Unix timestamp in milliseconds (UTC)

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

### Usage Notes

- This endpoint is used to populate the list of available chat rooms for the user interface.
- Rooms may be filtered or sorted on the client side if needed.

---

### Related Endpoints

- GET /api/v1/room/{roomId}/messages - Retrieve messages from a specific room