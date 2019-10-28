import { module, test } from "qunit";
import { visit, currentURL, click, find } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY // been adjusted to be relative to element
  };
}

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

  test("using pencil", async function(assert) {
    await visit("/app/dd:testdoodle");
    await click("#pencil");
    const c = find("#imageView");
    const context = c.getContext("2d");
    assert.ok(c);
    assert.ok(context);

    // draw a line
    const e1 = new PointerEvent("pointerdown", { clientX: 970, clientY: 371 });
    const e2 = new PointerEvent("pointermove", {
      clientX: 1035,
      clientY: 387,
      pressure: 0.5
    });
    assert.equal(window.location.hash, "#using-pencil");

    const e1c = getMousePos(c, e1);
    const e2c = getMousePos(c, e2);
    c.dispatchEvent(e1);
    c.dispatchEvent(e2);
    let imageData = context.getImageData(
      e1c.x,
      e1c.y,
      e2c.x - e1c.x,
      e2c.y - e1c.y
    );
    // Regarding imageData, if you want to visualize what I just did, uncomment
    // for (let i = 0; i < imageData.data.length; i++) {
    //   imageData.data[i] -= 100;
    // }
    // context.putImageData(imageData, e1c.x, e1c.y);

    let amntOfBlackPixels = 0;
    for (let i = 0; i < imageData.data.length; i++) {
      if (imageData.data[i] < 50) {
        amntOfBlackPixels++;
      }
    }
    const minimumExpectedAmountOfBlackPixels = 1000;
    assert.ok(
      amntOfBlackPixels > minimumExpectedAmountOfBlackPixels,
      "amntOfBlackPixels > minimumExpectedAmountOfBlackPixels"
    );
  });

  test("using eraser", async function(assert) {
    await visit("/app/dd:testdoodle");
    await click("#eraser");
    const c = find("#imageView");
    const context = c.getContext("2d");
    assert.ok(c);
    assert.ok(context);

    // draw a line
    const e1 = new PointerEvent("pointerdown", { clientX: 970, clientY: 371 });
    const e2 = new PointerEvent("pointermove", {
      clientX: 1035,
      clientY: 387,
      pressure: 0.5
    });
    const e3 = new PointerEvent("pointermove", {
      clientX: 1050,
      clientY: 399,
      pressure: 0.5
    });
    assert.equal(window.location.hash, "#using-eraser");
    const e1c = getMousePos(c, e1);
    const e2c = getMousePos(c, e2);
    c.dispatchEvent(e1);
    c.dispatchEvent(e2);
    c.dispatchEvent(e3);
    let imageData = context.getImageData(
      e1c.x,
      e1c.y,
      e2c.x - e1c.x,
      e2c.y - e1c.y
    );
    // Regarding imageData, if you want to visualize what I just did, uncomment
    // for (let i = 0; i < imageData.data.length; i++) {
    //   imageData.data[i] -= 100;
    // }
    // context.putImageData(imageData, e1c.x, e1c.y);

    let amntOfWhitePixels = 0;
    for (let i = 0; i < imageData.data.length; i++) {
      if (imageData.data[i] < 150) amntOfWhitePixels++;
    }
    assert.equal(amntOfWhitePixels, 0);
  });

  // this test fails, probably because there is no time for an event callback
  // 2 questions: do I need to use things like "triggerEvent" or can I use my own things?
  // Am I missing a form of asynchronicity? Because I do see a drawing happening!
  // At the end I do see an eraser stroke, but it happens after this test, weirdly enough
  // It is also slightly weird when you do use your own clicking, you can kind of
  // reproduce the error. But in a lot more cases, you can't, and that's weird
  test("switching + using pencil and eraser", async function(assert) {
    await visit("/app/dd:testdoodle");
    await click("#pencil");
    const c = find("#imageView");
    const context = c.getContext("2d");
    assert.ok(c);
    assert.ok(context);

    // draw a line
    const e1Args = { clientX: 970, clientY: 371 };
    let e1 = new PointerEvent("pointerdown", e1Args);
    const e2Args = {
      clientX: 1035,
      clientY: 387,
      pressure: 0.5
    };
    let e2 = new PointerEvent("pointermove", e2Args);
    const e3Args = {
      clientX: 1050,
      clientY: 399,
      pressure: 0.5
    };
    let e3 = new PointerEvent("pointermove", e3Args);
    assert.equal(window.location.hash, "#using-pencil");
    const e1c = getMousePos(c, e1);
    const e2c = getMousePos(c, e2);
    c.dispatchEvent(e1);
    c.dispatchEvent(e2);
    let imageData = context.getImageData(
      e1c.x,
      e1c.y,
      e2c.x - e1c.x,
      e2c.y - e1c.y
    );
    // Regarding imageData, if you want to visualize what I just did, uncomment
    // for (let i = 0; i < imageData.data.length; i++) {
    //   imageData.data[i] -= 100;
    // }
    // context.putImageData(imageData, e1c.x, e1c.y);

    let amntOfBlackPixels = 0;
    for (let i = 0; i < imageData.data.length; i++) {
      if (imageData.data[i] < 50) {
        amntOfBlackPixels++;
      }
    }
    const minimumExpectedAmountOfBlackPixels = 1000;
    assert.ok(
      amntOfBlackPixels > minimumExpectedAmountOfBlackPixels,
      "amntOfBlackPixels > minimumExpectedAmountOfBlackPixels"
    );

    await click("#eraser");
    const eraser = document.getElementById("eraser");
    await eraser.dispatchEvent(
      new PointerEvent("pointerdown", {
        pressure: 1,
        pointerType: "mouse",
        userInput: "start"
      })
    );
    await eraser.dispatchEvent(
      new PointerEvent("pointerdown", {
        pressure: 1,
        pointerType: "mouse",
        userInput: "start"
      })
    );

    const done = assert.async();
    setTimeout(async function() {
      await click("#eraser");
      e1 = new PointerEvent("pointerdown", e1Args);
      e2 = new PointerEvent("pointermove", e2Args);
      e3 = new PointerEvent("pointermove", e3Args);
      assert.equal(window.location.hash, "#using-eraser");

      //erase the line
      c.dispatchEvent(e1);
      c.dispatchEvent(e2);
      c.dispatchEvent(e3);
      imageData = context.getImageData(
        e1c.x,
        e1c.y,
        e2c.x - e1c.x,
        e2c.y - e1c.y
      );
      let amntOfWhitePixels = 0;
      for (let i = 0; i < imageData.data.length; i++) {
        if (imageData.data[i] < 150) amntOfWhitePixels++;
      }
      assert.equal(amntOfWhitePixels, 0);
      done();
    }, 5000);
  });
});
