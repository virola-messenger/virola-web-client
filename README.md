# Virola Messenger Web Client

**Virola Client** is an essential part of  [**Virola Messenger**](https://virola.io/). It is used both to **communicate and to manage Virola Server** if you have an admin role.

Native Virola Client apps for major desktop and mobile operating systems are already available and contain the same full set of features. You can find them on the [Virola website](https://virola.io/get-virola).

**Virola Web Client** app development started in response to clients' requests and as a project where we can test the Virola Web API to ensure it is implemented in the best possible way.

**Note!** Virola Web Client is currently in an early development stage and does not yet support all the features available in the desktop client apps.

You can find the **Virola Web API documentation** in the `doc` directory of this repository. We add information about new handlers as soon as it becomes available. 

To **start working with Virola Web Client**, you need to **install and run Virola Server locally**:
- download the server installation package for your OS from the [Virola website](https://virola.io/get-virola#server)
- install the server
- configure it to listen on `host 127.0.0.1`, `port 7777`
- run the server

After this, you can **run Virola Web Client locally** using the script below. Use the following credentials to **log in to the app**:
- Username `admin`
- Password `admin`

## Rsbuild project

### Setup

Install the dependencies:

```bash
npm install
```

### Get started

Start the dev server:

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```
