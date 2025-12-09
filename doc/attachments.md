# Attachments API Documentation

**Table of Contents**

- [Downloading an Attachment File](#get-apiv1attachmentsattachmentidattachmentfilename)
- [Retrieving Attachment Metadata](#get-apiv1attachmentsattachmentid)
- [Attach Files to an Existing Message](#post-apiv1messagesmessageidattachments)
- [Deleting an Attachment](#delete-apiv1attachmentsattachmentid)
- [Related API](#related-api)

---

## GET /api/v1/attachments/${attachmentId}/${attachmentFileName}

### Purpose

Download a specific attachment file by its unique identifier and filename.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** GET

- **URL Format:** /api/v1/attachments/${attachmentId}/${attachmentFileName}
	- **attachmentId:** The unique identifier of the attachment to be downloaded.
	- **attachmentFileName:** The original filename of the attachment.

- **Headers:** None required
- **Cookies:** Must include a valid session cookie

### Response

#### Success (200 OK)

- Returns the attachment file as a binary stream.
- The `Content-Length` header will indicate the size of the file.
- The `Content-Type` header will reflect the MIME type of the attachment.
- The `Content-Disposition` header will suggest the original filename for download.

#### Error

JSON response example:

```json
{
	"errorText": "Attachment not found",
	"httpStatusCode": 404
}
```

**Explanation:**

- **errorText:** Contains a description of the failure
- **httpStatusCode:** HTTP status code reflects the error type (e.g., 401 for unauthorized, 500 for internal error)

---

## GET /api/v1/attachments/${attachmentId}

### Purpose

Retrieve metadata information about a specific attachment by its unique identifier.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

### Request

- **Method:** GET

- **URL Format:** /api/v1/attachments/${attachmentId}
	- **attachmentId:** The unique identifier of the attachment.

- **Headers:** None required
- **Cookies:** Must include a valid session cookie

### Response

#### Success (200 OK)

JSON response example:

```json
{
	"attachmentId": 3423,
	"attachmentState": "ReadyForDownloadFromServerToClient",
	"createdUtc": 1753209786659,
	"fileChecksum": "745b0802bd1233adee5985eb5933a4aad",
	"fileName": "Document.pdf",
	"fileSize": 645560,
	"hasThumbnail": false,
	"lastModifiedUtc": 1753209786659,
	"roomId": 6,
	"textMessageId": 1234567
}
```

**Explanation:**

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

## POST /api/v1/messages/{messageId}/attachments

### Purpose

Upload one or more attachment files to be associated with a specific text message.

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

### Request

- **Method:** POST

- **URL Format:** /api/v1/messages/${messageId}/attachments
	- **messageId:** The unique identifier of the text message to which the attachments will be linked.

- **Headers:**
	- **Content-Type:** multipart/form-data

- **Cookies:** Must include a valid session cookie

- **Body:** Must contain one or more uploaded files under the field name **files**.

**Example Client Request using JavaScript and Fetch API:**

```javascript
const formData = new FormData();
files.forEach(file => {
    formData.append("files", file);
});

await fetch(`/api/v1/messages/${messageId}/attachments`, {
    method: "POST",
    body: formData
});
```

---

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

## DELETE /api/v1/attachments/${attachmentId}

### Purpose

Delete a specific attachment by its unique identifier.

---

### Authentication

- **Required:** Secure, HTTP-only session cookie
- Unauthorized access returns a 401 error.

---

### Request

- **Method:** DELETE

- **URL Format:** /api/v1/attachments/${attachmentId}
	- **attachmentId:** The unique identifier of the attachment to be deleted.

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

### Related API

- [Message API](messages.md) - retrieve and send messages
- [Comments API](comments.md) - retrieve and send comments on messages