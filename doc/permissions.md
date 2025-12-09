# Permissions API Documentation
 
**Table of Contents**

 - [Retrieving Room Permissions](#get-apiv1room-permissionsroomid)
 - [Related API](#related-api)
 
 ---

 ## GET /api/v1/room-permissions/${roomId}

 ### Purpose

Retrieves the permission set for the current user in a specific room.
Permissions determine what actions the user is allowed to perform in the room (messaging, file uploads, intercom features, UI visibility, etc.).

 ---

 ### Authentication

 - **Required:** Secure, HTTP-only session cookie
 - Unauthorized access returns a 401 error.

 ---

 ### Request

 - **Method:** GET

 - **URL Format:** /api/v1/room-permissions/${roomId}
	- **roomId:** Unique identifier of the room for which permissions are requested

 - **Headers:** None required
 - **Cookies:** Valid session cookie must be present

 ---

 ### Response

 #### Success (200 OK)

JSON response example:

```json
{
    "httpStatusCode": 200,
    "roomPermissions": {
        "permissions": {
            "canAttachOrDeleteFilesInOwnMessagesInDiscussion": true,
            "canAttachOrDeleteFilesInOwnMessagesInMainThread": true,
            "canChangePropertiesOfUnrelatedIssues": true,
            "canCreateIssues": true,
            "canCreateMeetings": true,
            "canEditOrDeleteOwnMessagesInDiscussion": true,
            "canEditOrDeleteOwnMessagesInMainThread": true,
            "canIntercomListen": true,
            "canIntercomStreamVideo": true,
            "canIntercomTalk": true,
            "canIntercomWatchVideo": true,
            "canReactToMessagesWithEmojiInDiscussion": true,
            "canReactToMessagesWithEmojiInMainThread": true,
            "canRecordMeetings": true,
            "canSendFilesIntoRoomInDiscussion": true,
            "canSendFilesIntoRoomInMainThread": true,
            "canSendMessagesInDiscussion": true,
            "canSendMessagesInMainThread": true,
            "canSendNudge": true,
            "canShareScreen": true,
            "canUseIntercom": true,
            "uiCanSeeRoomSidebar": true,
            "uiCanSeeWhoReadMessageInDiscussion": true,
            "uiCanSeeWhoReadMessageInMainThread": true
        },
        "roomId": 3
    }
}
``` 

**Explanation:**

- **roomPermissions:** Contains the permissions data for the room
	- **roomId:** The unique identifier of the room
	- **permissions:** An object listing various permission flags (true/false) indicating what actions the user can perform in the room

**Permission Flags:**

- **Messaging & Reactions:**
	- **canSendMessagesInDiscussion:** Whether the user can send messages within discussion threads
	- **canSendMessagesInMainThread:** Whether the user can send messages in the main thread
	- **canEditOrDeleteOwnMessagesInDiscussion:** Whether the user can edit or delete their own messages within discussion threads
	- **canEditOrDeleteOwnMessagesInMainThread:** Whether the user can edit or delete their own messages in the main thread
	- **canReactToMessagesWithEmojiInDiscussion:** Whether the user can react to messages with emojis in discussion threads
	- **canReactToMessagesWithEmojiInMainThread:** Whether the user can react to messages with emojis in the main thread

- **Files & Attachments:**
	- **canAttachOrDeleteFilesInOwnMessagesInDiscussion:** Whether the user can attach or delete files in their own messages within discussion threads
	- **canAttachOrDeleteFilesInOwnMessagesInMainThread:** Whether the user can attach or delete files in their own messages in the main thread
	- **canSendFilesIntoRoomInDiscussion:** Whether the user can send files into the room within discussion threads
	- **canSendFilesIntoRoomInMainThread:** Whether the user can send files into the room in the main thread

- **Intercom / Audio-Video:**
	- **canUseIntercom:** Whether the user can use intercom features in the room
	- **canIntercomListen:** Whether the user can listen to intercom audio in the room
	- **canIntercomStreamVideo:** Whether the user can stream video via intercom in the room
	- **canIntercomTalk:** Whether the user can talk via intercom in the room
	- **canIntercomWatchVideo:** Whether the user can watch intercom video in the room
	- **canShareScreen:** Whether the user can share their screen in the room

- **Issue & Meeting Management:**
	- **canCreateIssues:** Whether the user can create new issues in the room
	- **canCreateMeetings:** Whether the user can create meetings in the room
	- **canChangePropertiesOfUnrelatedIssues:** Whether the user can change properties of issues they are not directly involved with
	- **canRecordMeetings:** Whether the user can record meetings in the room

- **UI Permissions:**
	- **uiCanSeeRoomSidebar:** Whether the user can see the room sidebar in the UI
	- **uiCanSeeWhoReadMessageInDiscussion:** Whether the user can see who has read messages in discussion threads
	- **uiCanSeeWhoReadMessageInMainThread:** Whether the user can see who has read messages in the main thread

- **Other:**
	- **canSendNudge:** Whether the user can send nudges to other users in the room

---

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

- [Room API](rooms.md) - retrieve room information
- [User API](users.md) - retrieve user information
- [Messages API](messages.md) - retrieve and send messages
- [Comments API](comments.md) - retrieve and send comments on messages
- [Attachments API](attachments.md) - manage message attachments