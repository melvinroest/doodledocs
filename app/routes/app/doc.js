import Route from "@ember/routing/route";

export default Route.extend({
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    controller.set("model", this.modelFor("app"));
  }
  // queryParams: {
  //   w: {
  //     // refreshModel says whether the model hook on the route should be re-run if the query parameter changes. Its default is false!
  //     refreshModel: true
  //   }
  // }
});
