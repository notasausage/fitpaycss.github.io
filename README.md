# Fitpay CSS Whitelabeling and i18n Instructions.

## CSS Whitelabeling
Fitpay's WebView implementation supports overriding of the built-in CSS by providing a ```themeOverrideCssUrl``` value in the config object passed to the WebView when the WebView is invoked. Config object is a Base64-encoded value of the JSON representing config values. For example, config JSON:```{
  "clientId": "pagare",
  "version": "UNKNOWN",
  "devices": [],
  "themeOverrideCssUrl": "https://localhost:8080/default-oem.css"
}```

would be Base64-encoded as ```ew0KICAiY2xpZW50SWQiOiAicGFnYXJlIiwNCiAgInZlcnNpb24iOiAiVU5LTk9XTiIsDQogICJkZXZpY2VzIjogW10sDQogICJ0aGVtZU92ZXJyaWRlQ3NzVXJsIjogImh0dHBzOi8vbG9jYWxob3N0OjgwODAvZGVmYXVsdC1vZW0uY3NzIg0KfQ==```

This Base64-encoded value can then be passed to the WebView: ```https://webview_server:port/walletAccess?config=ew0KICAiY2xpZW50SWQiOiAicGFnYXJlIiwNCiAgInZlcnNpb24iOiAiVU5LTk9XTiIsDQogICJkZXZpY2VzIjogW10sDQogICJ0aGVtZU92ZXJyaWRlQ3NzVXJsIjogImh0dHBzOi8vbG9jYWxob3N0OjgwODAvZGVmYXVsdC1vZW0uY3NzIg0KfQ%3D%3D```


To Base64-encode JSON object one of the many Base64 encoders available online can be used.

CSS content referenced by the ```themeOverrideCssUrl``` value should be accessible from End User devices. Note that the URL needs to be an HTTPS URL. One option would be to host the CSS content on github pages similar to how this repository hosts ```default-oem.css``` file and then reference the CSS file like so: https://fitpaycss.github.io/default-oem.css

For rapid development we recommend setting up a local environment for CSS modification and then pushing it out to be hosted externally once the modifications are implemented.

All that you'll need to set up locally is a Web Server capable of serving content over HTTPS and a text editor of your choice to modify the CSS files. There are multiple options available as far as the web server setup is concerned.

## Internationalization (i18n) via language and baseLangUrl parameter overrides
In addition to being able to override the default WebView CSS, config parameters object alllows overriding of the ```language``` and ```baseLangUrl``` parameters.

```language``` parameter can be of any length, but the first two characters must conform to the ISO 639-1 standard. It is the ISO 639-1 code of the language that would be used by the WebView UI. Currently supported values are ```en``` (default value for the ```language``` parameter) for English and ```zh``` for Chinese. When passed in, the WebView app will use the built-in language file with translations for the specified language. If the provided value is not currently supported, WebView will fallback to ```en```.

```baseLangUrl``` parameter can be used to provide an external URL where a custom language file is located. Refer to a sample ```en.json``` file in this repository for an example. If WebView is unable to load the external language file, it will default to the internal ```en``` language file.

External language file can also be used to override the verbiage in the text strings presented in the UI. The sample ```en.json``` file overrides the ```enter_security_pin``` message (this message is presented to the existing user when they get to the PIN Entry Screen).
