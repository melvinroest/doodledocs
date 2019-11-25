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

module("acceptance | routes authorization", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.create("user", user); //for some reason this did not work inside test()... so I just put it here for now.
  });

  test("anonymous user routing through the whole app", async function(assert) {
    await visit("/site/home");
    assert.equal(currentURL(), "/site/home");
    await visit("/site/faq");
    assert.equal(currentURL(), "/site/faq");
    await visit("/site/login");
    assert.equal(currentURL(), "/site/login");
    await visit("/site/signup");
    assert.equal(currentURL(), "/site/signup");
    await visit("/site/settings");
    assert.equal(currentURL(), "/site/login"); //not allowed
    await visit("/app/public");
    assert.equal(currentURL(), "/app/public");
  });

  test("logged in user routing through the whole app", async function(assert) {
    const user = await this.server.db.users[0];
    await authenticateSession(user);
    const session = await currentSession();
    assert.equal(session.isAuthenticated, true);

    await visit("/site/home");
    assert.equal(currentURL(), "/site/home");
    await visit("/site/faq");
    assert.equal(currentURL(), "/site/faq");
    await visit("/site/login");
    assert.equal(currentURL(), "/site/home"); //not allowed
    await visit("/site/signup");
    assert.equal(currentURL(), "/site/home"); //not allowed
    await visit("/site/settings");
    assert.equal(currentURL(), "/site/settings");
    await visit("/app/public");
    assert.equal(currentURL(), "/app/public");
  });
});
