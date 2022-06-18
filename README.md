# Privalytics JS
A JS library for [Privalytics](https://github.com/vocalizando/privalytics).

Check releases [here](https://github.com/vocalizando/privalytics-js/releases).

## API Usage
```js
// Submit entry
const result = await submitEntry("https://analytics.example.com", {
    metadata: {
        page: "/auth/login",
    },
    data: {
        "error:api": "Status 500: API is down",
    },
})

// Retrieve all entries
const result = await retrieveAllEntries("https://analytics.example.com", {
    username: "admin",
    token: "1234",
})

// Delete entry
const result = await deleteEntry("https://analytics.example.com", {
    username: "admin",
    token: "1234",
}, "61fd401f-5379-4cab-992a-9266477e32e1")
```
