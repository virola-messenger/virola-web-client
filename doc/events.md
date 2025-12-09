# Events API Documentation

The **/api/v1/events** endpoint provides a real-time event stream used by clients to receive notifications from the server.
This WebSocket connection complements the REST API by pushing updates instantly without polling.

**Endpoints:** ws(s)://your-server.com/api/v1/events

**Overview**

The Events WebSocket delivers real-time notifications about activity in chat rooms and user sessions. After establishing a WebSocket connection, the client automatically begins receiving events relevant to the authenticated user, such as new messages, message edits, read receipts, room updates, etc.

The server ensures that each connected client only receives events for the rooms and resources they have permission to access.

**Event Types:**

- [**TextMessagesCreated:** A new text message(s) has been created in a room.](#textmessagescreated-event)
- [**TextMessagesUpdated:** An existing text message(s) has been updated.](#textmessagesupdated-event)
- [**TextMessageDeleted:** An existing text message has been deleted.](#textmessagedeleted-event)
- [**RoomCreated:** A new room has been created.](#roomcreated-event)
- [**RoomUpdated:** An existing room has been updated.](#roomupdated-event)
- [**RoomDeleted:** An existing room has been deleted.](#roomdeleted-event)
- [Related API](#related-api)

---

## TextMessagesCreated Event

### Purpose

Notify clients when new text messages are created in a room.

### Event Payload

```json
{
	"type": "TextMessagesCreated",
	"data": {
		"messages": [
			{
				"messageId": 2000124,
      			"messageType": "Regular",
				"roomId": 2,
     			"text": "Test message with attachment",
      			"userId": 1,
				... other message fields ...
			}
		]
	}
}
```

**Explanation:**

- **eventType:** The type of event being sent (TextMessagesCreated)
- **data:** Contains the event-specific data
	- **messages:** An array of message objects that were created

### Usage Notes: 

- Message objects include all standard message fields as defined in the [Messages API documentation](./messages.md).

---

## TextMessagesUpdated Event

### Purpose

Notify clients when existing text messages are updated in a room.

### Event Payload

```json
{
	"type": "TextMessagesUpdated",
	"data": {
		"messages": [
			{
				"messageId": 2000124,
	  			"messageType": "Regular",
				"roomId": 2,
	 			"text": "Updated message text",
	  			"userId": 1,
				... other message fields ...
			}
		]
	}
}
```

**Explanation:**

- **type:** The type of event being sent (TextMessagesUpdated)
- **data:** Contains the event-specific data
	- **messages:** An array of message objects that were updated

### Usage Notes

- Message objects include all standard message fields as defined in the [Messages API documentation](./messages.md).

---

## TextMessageDeleted Event

### Purpose

Notify clients when existing text messages are deleted from a room.

### Event Payload

```json
{
	"type": "TextMessageDeleted",
	"data": {
		"parentMessageId": 2000124,
		"roomId": 2,
		"messageId": 2000125
	}
}
```

**Explanation:**

- **type:** The type of event being sent (TextMessageDeleted)
- **data:** Contains the event-specific data
	- **parentMessageId:** ID of the parent message if message was a comment
	- **roomId:** ID of the room the message was deleted from
	- **messageId:** ID of the deleted message

---

## RoomCreated Event

### Purpose

Notify clients when a new room is created.

### Event Payload

```json
{
	"type": "RoomCreated",
	"data": {
		"room": {
			"roomId": 2,
			"name": "New Room",
			... other room fields ...
		}
	}
}
```

**Explanation:**

- **type:** The type of event being sent (RoomCreated)
- **data:** Contains the event-specific data
	- **room:** The room object that was created

### Usage Notes

- Room object include all standard room fields as defined in the [Rooms API documentation](./rooms.md).

---

## RoomUpdated Event

### Purpose

Notify clients when an existing room is updated.

### Event Payload

```json
{
	"type": "RoomUpdated",
	"data": {
		"room": {
			"roomId": 2,
			"name": "Updated Room Name",
			... other room fields ...
		}
	}
}
```

**Explanation:**
- **type:** The type of event being sent (RoomUpdated)
- **data:** Contains the event-specific data
	- **room:** The room object that was updated

### Usage Notes

- Room object include all standard room fields as defined in the [Rooms API documentation](./rooms.md).

---

## RoomDeleted Event

### Purpose

Notify clients when an existing room is deleted.

### Event Payload

```json
{
	"type": "RoomDeleted",
	"data": {
		"roomId": 2
	}
}
```

**Explanation:**

- **type:** The type of event being sent (RoomDeleted)
- **data:** Contains the event-specific data
	- **roomId:** ID of the room that was deleted

### Related API

- [Messages API](messages.md) - retrieve and send messages
- [Comments API](comments.md) - retrieve and send comments on messages
- [Rooms API](rooms.md) - retrieve room information and avatars