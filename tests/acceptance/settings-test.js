import { module, test } from "qunit";
import {
  visit,
  currentURL,
  click,
  pauseTest,
  getRootElement,
  triggerKeyEvent
} from "@ember/test-helpers";
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

module("Acceptance | settings", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  hooks.beforeEach(function() {
    this.server.create("user", user);
  });

  test("changing settings on /site/settings", async function(assert) {
    await visit("/site/home");
    assert.equal(currentURL(), "/site/home");
    const user = this.server.db.users[0];
    authenticateSession(user);
    const session = await currentSession();
    assert.equal(session.isAuthenticated, true);
    await visit("/site/settings");
    assert.equal(currentURL(), "/site/settings");
    const rootElement = getRootElement();
    const inputs = [...rootElement.getElementsByTagName("input")];
    const submitButton = inputs.filter(e => e.type === "submit")[0];
    const rangeSliders = inputs.filter(e => e.type === "range");
    const checkboxes = inputs.filter(e => e.type === "checkbox");
    for (let i = 0; i < rangeSliders.length; i++) {
      const el = rangeSliders[i];
      //this does not change the model... I'm not sure how to test that part.
      //in React I'd bind a setter to the value property of the tag, but I'm not sure if I can do that here
      //I tried simulating to drag the slider with JS but that didn't work either.
      //So I'll be leaving this test as is with no asserts for now
      el.value = 5;
    }
    for (let i = 0; i < checkboxes.length; i++) {
      await click(checkboxes[i]);
    }
    click(submitButton);
    const store = this.owner.lookup("service:store");
    //assert that everything is a 5 now...
  });
});
