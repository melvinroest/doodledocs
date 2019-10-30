import Controller from "@ember/controller";

export default Controller.extend({
  website: "",
  queryParams: [
    {
      website: {
        type: "string"
      }
    }
  ]
});
