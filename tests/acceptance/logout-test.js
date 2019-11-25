import { module, test } from "qunit";
import { visit, currentURL, click, pauseTest } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";
import {
  currentSession,
  authenticateSession,
  invalidateSession
} from "ember-simple-auth/test-support";

const user = {
  fullname: "Bobby Tables",
  username: "bobbytables123",
  email: "bobbytables@gmail.com",
  email_confirmation: "bobbytables@gmail.com",
  password: "testpassword",
  email_opt_out: true
};

module("Acceptance | logout", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  hooks.beforeEach(function() {
    this.server.create("user", user);
  });

  test("logging out on /site/home", async function(assert) {
    await visit("/site/home");
    assert.equal(currentURL(), "/site/home");
    const user = this.server.db.users[0];
    authenticateSession(user);
    const session = await currentSession();
    assert.equal(session.isAuthenticated, true);

    const logout = [...document.getElementsByTagName("a")].filter(element => {
      return element.hash === "#logout";
    })[0];

    await click(logout);

    assert.equal(session.isAuthenticated, false);
  });
});
