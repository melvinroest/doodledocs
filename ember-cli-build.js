"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // https://github.com/ef4/ember-auto-import/issues/126
    autoImport: {
      webpack: {
        node: {
          fs: "empty"
        }
      }
    }
  });

  app.import("vendor/edited/pressure/pressure.js", {
    using: [{ transformation: "amd", as: "pressure" }]
  });

  // app.import("vendor/google-analytics.js"); //to do: I think I can remove this

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
