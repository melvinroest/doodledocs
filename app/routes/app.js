import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  //To do: unDRY, copy/paste was easier for now, but this looks a lot like settings.js
  session: service(),
  authorizer: "authorizer:devise",
  async getSettings() {
    const session = this.session.data.authenticated;
    let settings = undefined;
    if (session && Object.keys(session).length > 0) {
      settings = await this.store.queryRecord("settings", session);
    } else {
      settings = await this.store.peekAll("settings").objectAt(0);
      if (!settings) {
        settings = await this.store.createRecord("settings");
      }
    }
    return settings;
  },
  async model() {
    return { settings: await this.getSettings() };
  }
});
