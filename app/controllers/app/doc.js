import Controller from "@ember/controller";

export default Controller.extend({
  w: "",
  m: "draw",
  queryParams: [
    {
      w: {
        type: "string"
      },
      m: {
        type: "string"
      },
      l: {
        type: "boolean"
      }
    }
  ]
});
