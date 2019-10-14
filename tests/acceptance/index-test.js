import { module, test } from "qunit";
import { visit, currentURL, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | index", function(hooks) {
  setupApplicationTest(hooks);

  test("visiting /", async function(assert) {
    await visit("/");
    assert.equal(currentURL(), "/site/home");
  });

  test("visiting /site/faq and back", async function(assert) {
    await visit("/site/home");
    assert.equal(currentURL(), "/site/home");
    const faq = document.evaluate(
      '//a[contains(.,"FAQ")]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    await click(faq);
    assert.equal(currentURL(), "/site/faq");
    const home = document.evaluate(
      '//a[contains(.,"Home")]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    await click(home);
    assert.equal(currentURL(), "/site/home");
  });

  test("opening a doodle doc", async function(assert) {
    await visit("/site/home");
    const button = document.querySelector('a[href*="/app/dd:"]');
    await click(button);
    assert.equal(currentURL().includes("/app/dd:"), true);
  });
});
