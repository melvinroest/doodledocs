import { module, test } from "qunit";
import {
  visit,
  currentURL,
  fillIn,
  click,
  pauseTest
} from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";

const user = {
  fullname: "Bobby Tables",
  username: "bobbytables123",
  email: "bobbytables@gmail.com",
  email_confirmation: "bobbytables@gmail.com",
  password: "testpassword",
  email_opt_out: true
};

function getCorrectUserInput(isCorrect) {
  if (isCorrect) {
    return ["bobbytables@gmail.com", "testpassword"];
  } else {
    return ["bobbytables@gmail.com", "wrong-password"];
  }
}

module("Acceptance | login", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  hooks.beforeEach(function() {
    this.server.create("user", user);
  });

  test("visiting /site/login -- happy path", async function(assert) {
    await visit("/site/login");
    assert.equal(currentURL(), "/site/login");

    const formControlsElements = document.getElementsByClassName(
      "form-control"
    );

    const formSubmitElement = document.querySelectorAll(
      "input[type=submit]"
    )[0];
    const formControlsUserInput = getCorrectUserInput(true);

    for (let i = 0; i < formControlsElements.length; i++) {
      await fillIn(formControlsElements[i], formControlsUserInput[i]);
    }

    await click(formSubmitElement);
    assert.equal(this.server.token, "Bearer awesome-auth-token");
  });

  test("visiting /site/login -- sad path", async function(assert) {
    await visit("/site/login");
    assert.equal(currentURL(), "/site/login");

    const formControlsElements = document.getElementsByClassName(
      "form-control"
    );

    const formSubmitElement = document.querySelectorAll(
      "input[type=submit]"
    )[0];
    const formControlsUserInput = getCorrectUserInput(false);

    for (let i = 0; i < formControlsElements.length; i++) {
      await fillIn(formControlsElements[i], formControlsUserInput[i]);
    }

    await click(formSubmitElement);
    assert.equal(this.server.token, undefined);
  });
});
