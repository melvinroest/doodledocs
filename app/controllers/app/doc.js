import Controller from "@ember/controller";

export default Controller.extend({
  w: "",
  queryParams: [
    {
      w: {
        type: "string"
      }
    }
  ],
  getWebsite() {
    //todo: validate URL
    console.log("getWebsite", this.get("w"));
  }
});
