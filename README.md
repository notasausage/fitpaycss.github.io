# Fitpay CSS for the Token Mobile App

## About This Repository

This is a fork of [the Fitpay CSS repository](https://github.com/fitpaycss/fitpaycss.github.io) used as an example of overriding the built-in CSS for Fitpay's WebView. This repository contains custom styles to apply to the Fitpay screens shown within the Token mobile apps, in order to give them a more native feel.

## Requirements to Build Files

To build distribution files for this repository, you'll need [Node.js](https://nodejs.org/en/) and [Gulp](https://gulpjs.com) installed. The build process uses the Gulp taskrunner to quickly push distribution files to the `dist` folder, where the Token app's Fitpay WebView will look for them.

## The Build Process

The build process, run in the root directory of this repository, has 3 possible tasks available:

- `gulp clean` will remove all files in the `dist` folder
- `gulp dist` will take all files in the `src` folder and compile/minify/optimize/move them to the `dist` folder
- `gulp` is the default task, which will run the `clean` task, then the `dist` task, followed by a `watch` task that will continue to run and look for changes in any of the files in the `src` folder

Running the default `gulp` task will allow you to make changes to files, add images, remove fonts, etc. while continually updating the `dist` folder while you work. When you're done, be sure to quit the process.

## More on CSS Whitelabeling
Fitpay's WebView implementation supports overriding of the built-in CSS by providing a ```themeOverrideCssUrl``` value in the config object passed to the WebView when the WebView is invoked. Config object is a Base64-encoded value of the JSON representing config values. For example, config JSON:

```
{
  "clientId": "pagare",
  "version": "UNKNOWN",
  "devices": [],
  "themeOverrideCssUrl": "https://localhost:8080/default-oem.css"
}
```

CSS content referenced by the ```themeOverrideCssUrl``` value should be accessible from End User devices. Note that the URL needs to be an HTTPS URL. One option would be to host the CSS content on [GitHub Pages](https://pages.github.com) similar to how [the Fitpay CSS repository](https://github.com/fitpaycss/fitpaycss.github.io) hosts the ```default-oem.css``` file and then reference the CSS file like so: https://fitpaycss.github.io/default-oem.css

For rapid development, setup a local environment for CSS modification and then push it out to be hosted externally once the modifications are implemented. All that you'll need to set up locally is a web server capable of serving content over HTTPS and a text editor of your choice to modify the CSS files. There are multiple options available as far as the web server setup is concerned.

## More on Internationalization (i18n) via language and baseLangUrl parameter overrides

In addition to being able to override the default WebView CSS, config parameters object alllows overriding of the ```language``` and ```baseLangUrl``` parameters.

```language``` parameter can be of any length, but the first two characters must conform to the ISO 639-1 standard. It is the ISO 639-1 code of the language that would be used by the WebView UI. Currently supported values are ```en``` (default value for the ```language``` parameter) for English and ```zh``` for Chinese. When passed in, the WebView app will use the built-in language file with translations for the specified language. If the provided value is not currently supported, WebView will fallback to ```en```.

```baseLangUrl``` parameter can be used to provide an external URL where a custom language file is located. Refer to a sample ```en.json``` file in this repository for an example. If WebView is unable to load the external language file, it will default to the internal ```en``` language file.

External language file can also be used to override the verbiage in the text strings presented in the UI. The sample ```en.json``` file overrides the ```enter_security_pin``` message (this message is presented to the existing user when they get to the PIN Entry Screen).
