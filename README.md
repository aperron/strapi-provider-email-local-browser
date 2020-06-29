# strapi-provider-email-local-browser

A fake email provider for Strapi, use in development environment.

1. write email's content in a temporary file
2. open this file with your web browser
3. delete the temporary file

## Install

`yarn add strapi-provider-email-local-browser`


## Configure

```js
// ./config/plugins.js  OR  ./config/env/development/plugins.js

module.exports = ({ env }) => ({
  email: {
    provider: 'local-browser',
    providerOptions: {
      browser: "chromium" // default : 'firefox'
    }
  }
});
```