import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
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
    this.route("public");
  });
});

export default Router;
