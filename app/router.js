import EmberRouter from "@ember/routing/router";
import Trackable from "ember-cli-analytics/mixins/trackable";
import config from "./config/environment";

const Router = EmberRouter.extend(Trackable, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("site", function() {
    this.route("home");
    this.route("faq");
  });
  this.route("app", function() {
    this.route("doc", { path: "/:random_url" });
  });
});

export default Router;
