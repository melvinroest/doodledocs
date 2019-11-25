// app/authorizers/devise.js
import Devise from "ember-simple-auth/authorizers/devise";

export default Devise.extend({
  authorize(sessionData, block) {
    block("Authorization", "Bearer " + sessionData.token);
  }
});
