import Devise from "ember-simple-auth/authenticators/devise";
import { HOST } from "doodledocs-app/config/auth-ms";

export default Devise.extend({
  serverTokenEndpoint: `${HOST}/auth/login`
});
