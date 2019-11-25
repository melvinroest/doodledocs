import DS from "ember-data";
import * as authServer from "doodledocs-app/config/auth-ms";
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: "authorizer:devise",
  async createRecord(store, type, snapshot) {
    const data = this.serialize(snapshot);
    const response = await fetch(`${authServer.HOST}/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": authServer.MIMETYPE }
    });
    const json = await response.json();
    console.log("json", json);
    //initialize session here TODO
    return { user: { id: 0 } }; //keeping ember happy
  }
  // host: settings.HOST,
  // dataType: settings.DATATYPE,
  // urlForCreateRecord(modelName, snapshot) {
  //   return this.buildURL() + "/signup";
  // }
});
