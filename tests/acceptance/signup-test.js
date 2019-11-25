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

function getCorrectUserInput(isCorrect) {
  if (isCorrect) {
    return [
      "Bobby Tables",
      "bobbytables123",
      "bobbytables@gmail.com",
      "bobbytables@gmail.com",
      "testpassword"
    ];
  } else {
    return [
      "Bobby Tables",
      "bobbytables123",
      "bobbytables@gmail.com",
      "wrong-email@gmail.com",
      "testpassword"
    ];
  }
}

module("Acceptance | signup", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("visiting /site/signup -- happy path", async function(assert) {
    await visit("/site/signup");

    assert.equal(currentURL(), "/site/signup");

    const formControlsElements = document.getElementsByClassName(
      "form-control"
    );
    const formCheckboxElement = document.getElementsByClassName("checkbox")[0];
    const formSubmitElement = document.querySelectorAll(
      "input[type=submit]"
    )[0];
    const formControlsUserInput = getCorrectUserInput(true);

    for (let i = 0; i < formControlsElements.length; i++) {
      await fillIn(formControlsElements[i], formControlsUserInput[i]);
    }
    await click(formCheckboxElement);
    await click(formSubmitElement);

    const user = this.server.db.users[0];
    assert.equal(user.email, "bobbytables@gmail.com");
    assert.equal(user.email_confirmation, "bobbytables@gmail.com");
    assert.equal(user.email_opt_out, true);
    assert.equal(user.fullname, "Bobby Tables");
    assert.equal(user.password, "testpassword");
    assert.equal(user.username, "bobbytables123");
  });

  test("visiting /site/signup -- wrong email", async function(assert) {
    await visit("/site/signup");

    assert.equal(currentURL(), "/site/signup");

    const formControlsElements = document.getElementsByClassName(
      "form-control"
    );
    const formCheckboxElement = document.getElementsByClassName("checkbox")[0];
    const formSubmitElement = document.querySelectorAll(
      "input[type=submit]"
    )[0];
    const formControlsUserInput = getCorrectUserInput(false);

    for (let i = 0; i < formControlsElements.length; i++) {
      await fillIn(formControlsElements[i], formControlsUserInput[i]);
    }
    await click(formCheckboxElement);
    await click(formSubmitElement);

    const user = this.server.db.users[0];
    assert.equal(user, undefined);
  });
});
