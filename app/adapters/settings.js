import DS from "ember-data";
import fetch from "fetch";
import * as authServer from "doodledocs-app/config/auth-ms";
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: "authorizer:devise",
  host: authServer.HOST,
  async queryRecord(store, type, data) {
    const response = await fetch(`${authServer.HOST}/settings`, {
      method: "GET",
      headers: { Authorization: data.token }
    });
    let json = await response.json();
    if (!json.settings) {
      //a hack to make the tests pass as it does settings: {settings: ...}. I'm keeping this comment here as I need to learn more about why RestSerializer in Mirage is doing this.
      json = { settings: json };
    }
    return json;
  }
});
