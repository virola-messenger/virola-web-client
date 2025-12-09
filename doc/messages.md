
# Messages API Documentation

**Table of Contents**

- [Retrieving Messages](#get-apiv1roomsroomidmessages)
- [Sending a Message](#post-apiv1roomsroomidmessages)
- [Deleting a Message](#delete-apiv1messagesmessageid)
- [Marking a Message as Read](#post-apiv1messagesmessageidread)
- [Related API](#related-api)

---

## GET /api/v1/rooms/${roomId}/messages

### Purpose

Retrieves a list of messages from a specific chat room, with support for pagination and directional loading.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** GET
- **URL Format:** /api/v1/rooms/${roomId}/messages?cursor=2000129&limit=100&direction=backward
	- **roomId:** The unique identifier of the chat room to fetch messages from.

- **Query Parameters:**
	
	- **cursor:** The message ID to start from.
	- **limit:** Maximum number of messages to return.
	- **direction:**
		- "backward" for older messages
		- "forward" for newer messages

- **Headers:** None required
- **Cookies:** Must include a valid session cookie

---

### Response

#### Success (200 OK)

JSON response example:

```json
{
  "httpStatusCode": 200,
  "messages": [
    {
      "attachments": [
        {
          "attachmentId": 13,
          "attachmentState": "ReadyForDownloadFromServerToClient",
          "createdUtc": 0,
          "fileChecksum": "74578eba4b0802bd3c1f0adee5985eb5933a4aad",
          "fileName": "Screenshot.png",
          "fileSize": 63560,
          "hasThumbnail": true,
          "lastModifiedUtc": 1753209786659,
          "roomId": 2,
          "textMessageId": 2000124
        }
      ],
      "commentCount": 0,
      "createdUtc": 1753207692547,
      "lastEditedUtc": 1753207692547,
      "lastModifiedUtc": 1753359160687,
      "markupType": "TextPlain",
      "messageId": 2000124,
      "messageType": "Regular",
      "parentMessageId": 0,
      "priority": "Normal",
      "roomId": 2,
      "text": "Test message with attachment",
      "userId": 1,
	  "readTimestamps": [
			{
				"readUtc": 1759757496294,
				"userId": 1
			},
			{
				"readUtc": 1759757494239,
				"userId": 2
			}
	  ]
    },
    {
      "attachments": [],
      "commentCount": 0,
      "createdUtc": 1753210377178,
      "lastEditedUtc": 1753210377178,
      "lastModifiedUtc": 1753210404075,
      "markupType": "TextPlain",
      "messageId": 2000129,
      "messageType": "Regular",
      "parentMessageId": 0,
      "priority": "Normal",
      "roomId": 2,
      "text": "Test message",
      "userId": 3,
	  "readTimestamps": [
			{
				"readUtc": 1759757494299,
				"userId": 22
			}
	  ]
    }
  ],
  "roomId": 2
}
```

**Explanation:**

- **messages:** An array of message objects

	- **messageId:** Unique identifier for the message
	- **parentMessageId:** ID of the parent message if this is a comment (0 if not a comment)
	- **userId:** ID of the user who sent the message
	- **roomId:** ID of the room the message was sent in
	- **text:** The content of the message
	- **createdUtc:** Timestamp when the message was created
	- **lastModifiedUtc:** Timestamp when the message was last modified
	- **lastEditedUtc:** Timestamp when the message was last edited
	- **markupType:** Type of markup used
		- **Possible values:**
			- *TextPlain*
			- *TextHtml*
			- *TextMarkdown*
			- *TextCode*
			- *TextLatex*

	- **messageType:** Type of message
		- **Possible values:**
			- *Regular*
			- *Issue*
			- *Meeting*

	- **priority:** Priority of the message
		- **Possible values:**
			- *Blocker*
			- *Critical*
			- *High*
			- *Normal*
			- *Low*
			- *Trivial*

	- **commentCount:** Number of comments on this message
	- **attachments:** Array of attachment objects (if any)

		- **attachmentId:** Unique identifier for the attachment
		- **fileName:** Name of the file
		- **fileSize:** Size of the file in bytes
		- **fileChecksum:** Checksum for file integrity
		- **hasThumbnail:** Indicates if a thumbnail is available
		- **attachmentState:** Current state of the attachment
			- **Possible states:**
				- *Initial*,
				- *ChecksumCalculationOnClientSideInProgress*,
				- *ChecksumCalculationOnClientSideFailed*,
				- *UploadFromClientToServerInProgress*,
				- *UploadFromClientToServerFailed*,
				- *ChecksumVerificationOnServerSideInProgress*,
				- *ChecksumVerificationOnServerSideMismatch*,
				- *ChecksumVerificationOnServerSideFailed*,
				- *ReadyForDownloadFromServerToClient*

		- **createdUtc, lastModifiedUtc:** Timestamps for the attachment
		- **textMessageId:** ID of the message this attachment belongs to
		- **roomId:** ID of the room the attachment belongs to
	
	- **readTimestamps:** Timestamps indicating when users read the message

		- **userId:** ID of the user who read the message
		- **readUtc:** Timestamp when the message was read by the user

	- **issueProperties:** (if messageType is "Issue")

		- **type:** Type of the issue
			- **Possible values:**
				- *Task*,
				- *Subtask*,
				- *Bug*,
				- *Epic*,
				- *Story*,
				- *FeatureRequest*,
				- *MergeRequest*

		- **status:** Current status of the issue
			- **Possible values:**
				- *Backlog*,
				- *ToDo*,
				- *InProgress*,
				- *ToVerify*,
				- *Done*,
				- *Declined*,

		- **assignees:** Array of user IDs assigned to the issue
	
	- **meetingProperties:** (if messageType is "Meeting")

		- **timeUtc:** Time of the meeting start
		- **duration:** Duration of the meeting

- **roomId:** Unique identifier for the chat room

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

- This endpoint is typically used in chat applications to display messages in a room, allowing efficiently load messages while users scroll through the conversation history.
- Use message ID as the `cursor` parameter to control where to start loading messages. If not specified, it defaults to the first or last message in the room, depending on the `direction` parameter. If `direction` is "backward", it will load older messages starting from the most recent message. If "forward", it will load newer messages starting from the oldest message.
- The `direction` parameter allows you to specify whether to load older messages ("backward") or newer messages ("forward") beginning from the specified cursor (message ID). If not specified, the default is to load newer messages.
- The `limit` parameter allows you to control how many messages are returned in a single request. If not specified, all messages according to `cursor` and `direction` parameters will be returned.
- Messages are returned in chronological order based on their `messageId`.

---


## POST /api/v1/rooms/${roomId}/messages

### Purpose

Creates a new message in the specified chat room.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** POST

- **URL Format:** /api/v1/rooms/${roomId}/messages
	- **roomId:** The unique identifier of the chat room to create a message in.

- **Headers:**
	- **Content-Type:** application/json

- **Cookies:** Must include a valid session cookie

#### Request Body

JSON object containing the message details:

```json
{
  "content": "New message!"
}
```

**Explanation:**

- **content:** The text content of the new message to be created in the chat room.

---

### Response

#### Success (200 OK)

JSON response example:

```json
{
	"httpStatusCode": 200,
}
```

#### Error

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

## DELETE /api/v1/messages/${messageId}

### Purpose

Deletes a specific message by its ID.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** DELETE

- **URL Format:** /api/v1/messages/${messageId}
	- **messageId:** The unique identifier of the message to be deleted.

- **Headers:** None required
- **Cookies:** Must include a valid session cookie

### Response

#### Success (200 OK)

JSON response example:

```json
{
	"httpStatusCode": 200
}
```

#### Error

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

## POST /api/v1/messages/${messageId}/read

### Purpose

Marks a specific message as read by the user.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** POST

- **URL Format:** /api/v1/messages/${messageId}/read
	- **messageId:** The unique identifier of the message to be marked as read.

- **Headers:**
	- **Content-Type:** application/json
	
- **Cookies:** Must include a valid session cookie

### Response

#### Success (200 OK)

JSON response example:

```json
{
	"httpStatusCode": 200
}
```

#### Error

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

- [Comments API](comments.md) - retrieve and send comments on messages
- [Attachments API](attachments.md) - manage message attachments