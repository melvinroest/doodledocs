import Controller from "@ember/controller";
import Ember from "ember";
const { service } = Ember.inject;

export default Controller.extend({
  session: service("session"),
  actions: {
    authenticate() {
      let { email, password } = this.getProperties("email", "password");
      this.get("session")
        .authenticate("authenticator:devise", email, password)
        .catch(reason => {
          this.set("errorMessage", reason.error || reason);
        });
    }
  }
});
