import DS from "ember-data";
import * as authServer from "doodledocs-app/config/auth-ms";

export default DS.JSONAPIAdapter.extend({
  host: authServer.HOST
});
