# Virola Web API

The Virola Web API is currently under development. We add information about implemented endpoints and requests as soon as they become available on the Virola Server.

The Virola Web API has two main purposes:

- Integration with external tools
- Creating basic web-based Virola Client

All Web API requests are sent to a specific Virola Server using its host name and port number.

Most requests require authentication, either with a [username and password](./login.md) or with a [Web API token](./token-authentication.md).

## All available Web API calls

- [Authentication with token](token-authentication.md) – suitable for individual requests
- [Login with username and password](login.md) – suitable for maintaining a session to send multiple requests
- [Logout the current user](logout.md) – terminate the current session
- [Getting user status](status.md) – check the current user's authentication and session status
- [Users API](users.md) – retrieve user information
- [Rooms API](rooms.md) – retrieve room information
- [Messages API](messages.md) – retrieve and send messages
- [Comments API](comments.md) – retrieve and send comments on messages
- [Attachments API](attachments.md) – manage message attachments
- [Events API](events.md) – receive real-time updates about changes on the server
- [Permissions API](permissions.md) – retrieve user permissions in rooms
- [Server Health API](server-health.md) – check the health status of the Virola Server