## GET /api/v1/messages/${messageId}/comments

### Purpose

Retrieve a paginated list of comments (child messages) associated with a specific parent message.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** GET
- **URL Format:** /api/v1/messages/${messageId}/comments?cursor=-1&limit=100&direction=backward
	- **messageId:** The unique identifier of the parent message to fetch comments for.

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
      "parentMessageId": 2000127,
      "priority": "Normal",
      "roomId": 2,
      "text": "Test message with attachment",
      "userId": 1
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
      "parentMessageId": 2000127,
      "priority": "Normal",
      "roomId": 2,
      "text": "Test message",
      "userId": 3
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

- **roomId:** Unique identifier for the chat room
- **parentMessageId:** Unique identifier for the parent message

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

- This endpoint is typically used in chat applications to display comments for message in a room, allowing efficiently load comments while users scroll through the conversation history.
- Use message ID as the `cursor` parameter to control where to start loading comments. If not specified, it defaults to the first or last comment for parent message, depending on the `direction` parameter. If `direction` is "backward", it will load older comments starting from the most recent comment. If "forward", it will load newer comments starting from the oldest comment.
- The `direction` parameter allows you to specify whether to load older comments ("backward") or newer comments ("forward") beginning from the specified cursor (message ID). If not specified, the default is to load newer comments.
- The `limit` parameter allows you to control how many comments are returned in a single request. If not specified, all comments according to `cursor` and `direction` parameters will be returned.
- Comments are returned in chronological order based on their `messageId`.

