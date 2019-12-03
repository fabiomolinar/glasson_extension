# glasson_extension

Chrome extension to add a few functionalities to Glasson service.

## Learning

**Sources:**
- [Google getting started guide](https://developer.chrome.com/extensions)
- [Examples](https://github.com/orbitbot/chrome-extensions-examples)

An extension must fulfill a **single purpose** that is narrowly defined and easy to understand. A single extension can include multiple components and a range of functionality, as long as everything contributes towards a common purpose. 

User interfaces should be minimal and have intent.

Extension files are zipped into a single **.crx** package that the user downloads and installs.

### Persistent storage

To persistently store a variable, one can use the `storage` API. **This will allow multiple extension components to access that value and update it.** Example below:

```javascript
chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
});
```

### API registration

Most APIs, including the `storage` API, has to be registered under the *"permissions"* field in the manifest.

### Extension options

An options page and scripts can be used to configure the extension's options. Once created, on the manifest, it is required to point the `options_page` option to the desired page. Example:

```json
{
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "permissions": ["activeTab", "declarativeContent", "storage"],
    "options_page": "options.html",
    "page_action": {
      "default_popup": "popup.html",
      "default_icon": "eyeglass.png"
    },
    "manifest_version": 2
}
```