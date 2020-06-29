'use strict';
const open = require('open')
const tmp = require('tmp');
const fs = require('fs');

module.exports = {
  provider: 'local-browser',
  name: 'Local browser',

  init: (providerOptions = {}, settings = {}) => {
    
    if(!providerOptions.browser) providerOptions.browser = "firefox";

    return {
      send: (options, cb) => {
        return new Promise((resolve, reject) => {

          // Default values.
          options = options ? options : {};
          options.from = options.from || "no-reply@strapi.io";
          options.replyTo = options.replyTo || options.from;
          options.text = options.text || options.html;
          options.html = options.html || options.text;

          tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
            if (err) {
              reject(err)
              return
            }

            fs.writeFile(path + '.html', options.html, { encoding: 'utf8' }, async () => {
              try{
                await open('file://' + path + '.html', {
                  app: providerOptions.browser,
                  wait: true
                });
              } catch (e){
                strapi.log.error(`strapi-provider-email-locale-template, Error on open file with email rendered: ${path}.html`, e)
                reject(e)
              }
              setTimeout(cleanupCallback, 1000);
            })
          });

          resolve()
        });
      }
    };
  }
};
