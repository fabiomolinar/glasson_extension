# glasson_extension

Chrome extension to add a few functionalities to Glasson service.

## Learning

**[Source](https://developer.chrome.com/extensions)**

An extension must fulfill a **single purpose** that is narrowly defined and easy to understand. A single extension can include multiple components and a range of functionality, as long as everything contributes towards a common purpose. 

User interfaces should be minimal and have intent.

Extension files are zipped into a single **.crx** package that the user downloads and installs.

### Persistent storate

To persistently store a variable, one can use the `storage` API. **This will allow multiple extension components to access that value and update it.** Example below:

```javascript
chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
});
```

### API registration

Most APIs, including the `storage` API, has to be registered under the *"permissions"* field in the manifest.