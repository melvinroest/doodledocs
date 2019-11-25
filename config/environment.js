"use strict";

module.exports = function(environment) {
  let ENV = {
    "ember-simple-auth": {
      authenticationRoute: "/site/login",
      routeAfterAuthentication: "/",
      routeIfAlreadyAuthenticated: "/"
    },
    modulePrefix: "doodledocs-app",
    environment,
    buildTarget: process.env.TARGET || environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    analytics: {
      options: {
        limitRouteInformation: false //I might want to set this to true, need to test
      },
      integrations: [
        // {
        //   name: "GoogleAdwords",
        //   config: {
        //     id: "XXXXXXXXXX",
        //     label: "XXXXXXXXXXXXXXXXXXX"
        //   }
        // },
        {
          name: "GoogleAnalytics",
          config: {
            id: "UA-150531741-1",
            remarketing: true,
            ecommerce: true,
            enhancedEcommerce: false,
            set: {
              anonymizeIp: false //currently false for testing purposes, todo reset this to true
            }
          }
        }
      ]
    }
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV["ember-cli-mirage"] = {
      enabled: false
    };
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature
    ENV.rootURL = "/this/should/break/for/now/put/env/var/in/prod";
    if (process.env.TARGET === "gh-pages") {
      ENV.rootURL = "/doodledocs/";
    }
    if (
      process.env.TARGET === "doodledocs" ||
      process.env.TARGET === "local-test-gh-pages"
    ) {
      ENV.rootURL = "/";
    }
  }

  return ENV;
};
