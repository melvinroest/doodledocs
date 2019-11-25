import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  session: service(),
  authorizer: "authorizer:devise",
  async getSettings() {
    const session = this.session.data.authenticated;
    const settings = await this.store.queryRecord("settings", session);
    return settings;
  },
  async model() {
    return this.getSettings();
  },
  actions: {
    async updateSettings() {
      const settings = await this.getSettings();
      settings.save();
    }
  }
});
