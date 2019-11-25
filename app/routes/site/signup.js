import Route from "@ember/routing/route";
import UnauthenticatedRouteMixin from "ember-simple-auth/mixins/unauthenticated-route-mixin";

export default Route.extend(UnauthenticatedRouteMixin, {
  actions: {
    createUser(name, username, email, email_confirmation, password, optOut) {
      // console.log(`Create user: ${name} ${email}`);
      const store = this.get("store");
      let user = store.createRecord("user", {
        fullname: name,
        username,
        email,
        email_confirmation,
        password,
        email_opt_out: optOut
      });
      user.save().then(
        function(result) {
          // Success callback
          store.unloadAll("user");
        },
        function(result, b) {
          // Error callback
          store.unloadAll("user");
        }
      );
    }
  },
  model() {
    return this.store.createRecord("user");
  }
});