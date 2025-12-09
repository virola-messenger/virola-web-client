# Rooms API Documentation

**Table of Contents**

- [Retrieving a List of Rooms](#get-apiv1rooms)
- [Retrieving a Room's Avatar](#get-apiv1roomsroomidavatarjpg)
- [Related API](#related-api)

---


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
			"unreadMessageCount": 0,
			"isArchived": false,
			"isModerator": true,
			"isPinned": true,
			"lastMessage": {
                "createdUtc": 1764350672498,
                "messageId": 209141
            }
		},
		{
			"createdUtc": 1718454147265,
			"displayName": "Welcome!",
			"lastModifiedUtc": 1718454147265,
			"roomId": 3,
			"roomType": "Public",
			"unreadMessageCount": 2243,
			"isArchived": false,
			"isModerator": false,
			"isPinned": false,
			"lastMessage": {
                "createdUtc": 1764347619969,
                "messageId": 209128
            }
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
- **isArchived:** Indicates if the room is archived
- **isModerator:** Indicates if the user has moderator privileges in the room
- **isPinned:** Indicates if the room is pinned by the user

- **lastMessage:** Object containing details of the last message in the room

  - **createdUtc:** Timestamp of the last message
  - **messageId:** Unique identifier of the last message

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

## GET /api/v1/rooms/{roomId}/avatar.jpg

### Purpose

Retrieve the avatar image for a specific chat room.

### Request

- **Method:** GET
- **URL Format:** /api/v1/rooms/${roomId}/avatar.jpg
	- **roomId:** The unique identifier of the chat room.

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


## Related API

- [Messages API](messages.md) - retrieve and send messages
- [Comments API](comments.md) - retrieve and send comments on messages
- [Attachments API](attachments.md) - manage message attachments
- [Permissions API](permissions.md) - manage room permissions