# Server Health API Documentation

```bash
curl -k -X GET \
	-H "Authorization: Bearer TOKEN" \
	https://HOST:PORT/api/v1/server-health
```

You can also use the javascript language to access wabapi, as shown in the following example:

```html
<html>
<body>
<script>
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200)
            document.write("<pre>" + req.responseText + "</pre>");
    }
    req.open("GET", "https://HOST:PORT/api/v1/server-health", true);
    req.setRequestHeader("Authorization", "Bearer TOKEN");
    req.send(null);
</script>
</body>
</html>
```
