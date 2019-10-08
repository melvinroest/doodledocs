import Component from "@ember/component";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Pressure from "pressure";
import Bugout from "bugout";

// When person is drawing, put everything else on non-clickable (and visually display it by greying it out)

function init(hud, canvas, b) {
  disablePageScroll();
  let context = canvas.getContext("2d");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#FFFBEB"; //for debug use: $55f
  context.fillRect(0, 0, canvas.width, canvas.height);

  //init hud
  let hudContext = hud.getContext("2d");
  hud.style.width = "100%";
  hud.style.height = "100%";
  hud.width = canvas.offsetWidth;
  hud.height = canvas.offsetHeight;

  hudContext.clearRect(0, 0, canvas.width, canvas.height);

  // //debug
  // hudContext.strokeStyle = "#f00"
  // hudContext.lineWidth = 1
  // hudContext.beginPath()
  // hudContext.rect(200, 200, 100, 100)
  // hudContext.stroke()

  // //debug 2
  // context.strokeStyle = "#0f0"
  // context.lineWidth = 1
  // context.beginPath()
  // context.rect(500, 500, 100, 100)
  // context.stroke()

  let lastX = 0;
  let lastY = 0;
  let pencilThickness = 1;
  let pencilColor = "#000";
  let lineThickness = pencilThickness;
  let tool = new pencil();

  //init buttons
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("pencil").addEventListener(eventName, e => {
      pencilThickness = 1;
      pencilColor = "#000";
    });
  });
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("eraser").addEventListener(eventName, e => {
      pencilThickness = 20;
      pencilColor = "#FFFBEB";
    });
  });

  //init pressure settings
  let block = {
    start: function(e) {
      e.userInput = "start";
      mousePosOnCanvas(e);
    },

    change: function(force, e) {
      e.userInput = "change";
      e.userForce = force;
      mousePosOnCanvas(e);
    },

    startDeepPress: function(e) {
      e.userInput = "startDeepPress";
      mousePosOnCanvas(e);
    },

    endDeepPress: function() {
      let e = {};
      e.userInput = "endDeepPress";
      mousePosOnCanvas(e);
    },

    end: function() {
      let e = {};
      e.userInput = "end";
      console.log("end", e);
      mousePosOnCanvas(e);
    },

    unsupported: function() {
      this.innerHTML = "Your device / browser does not support this :(";
    }
  };

  Pressure.set(canvas, block);

  function pencil() {
    let currentTool = this;
    this.started = false;

    function startDraw(e) {
      currentTool.started = true;
      context.fillStyle = pencilColor;
      lastX = e._x - e.target.offsetLeft;
      lastY = e._y - e.target.offsetTop;
      lineThickness = pencilThickness;
    }

    function endDraw(e) {
      hudContext.clearRect(0, 0, canvas.width, canvas.height);
      if (tool.started) {
        tool.started = false;
      }
    }

    this.start = function(e) {
      startDraw(e);
    };

    this.startDeepPress = function(e) {
      startDraw(e);
    };

    this.change = function(e) {
      // let inputDevice = e.touches[0].touchType
      let inputDevice = "stylus";
      if (inputDevice === "stylus") {
        if (tool.started) {
          // console.log('pencil/change')
          // console.log(e)

          let mouseX = e._x;
          let mouseY = e._y;

          // find all points between
          let x1 = mouseX;
          let x2 = lastX;
          let y1 = mouseY;
          let y2 = lastY;

          //steep: y > x in any direction
          let steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);

          if (steep) {
            var x = x1;
            x1 = y1;
            y1 = x;

            var y = y2;
            y2 = x2;
            x2 = y;
          }

          if (x1 > x2) {
            var x = x1;
            x1 = x2;
            x2 = x;

            var y = y1;
            y1 = y2;
            y2 = y;
          }

          let dx = x2 - x1;
          let dy = Math.abs(y2 - y1);
          let error = 0;
          let de = dy / dx;
          let yStep = -1;
          y = y1;

          if (y1 < y2) {
            yStep = 1;
          }

          lineThickness = lineThickness + 12 * e.userForce;
          for (var x = x1; x < x2; x++) {
            if (steep) {
              context.fillRect(
                y - lineThickness / 2,
                x - lineThickness / 2,
                lineThickness,
                lineThickness
              );
            } else {
              context.fillRect(
                x - lineThickness / 2,
                y - lineThickness / 2,
                lineThickness,
                lineThickness
              );
            }

            error += de;

            if (error >= 0.5) {
              y += yStep;
              error -= 1.0;
            }
          }
          lineThickness = pencilThickness;

          lastX = mouseX;
          lastY = mouseY;
        }
      }

      hudContext.clearRect(0, 0, canvas.width, canvas.height);
      hudContext.strokeStyle = "#f00";
      hudContext.lineWidth = 1;
      hudContext.beginPath();
      hudContext.rect(
        e._x - lineThickness / 2,
        e._y - lineThickness / 2,
        lineThickness + 5,
        lineThickness + 5
      );
      hudContext.stroke();
    };

    this.end = function(e) {
      endDraw(e);
    };

    this.endDeepPress = function(e) {
      endDraw(e);
    };
  } //end pencil()

  function mousePosOnCanvas(e) {
    // Opera
    if (e.offsetX || e.offsetX == 0) {
      e._x = e.offsetX;
      e._y = e.offsetY;
    }
    // Firefox
    else if (e.layerX || e.layerX == 0) {
      e._x = e.layerX;
      e._y = e.layerY;
    }

    // Call the event handler of the tool
    let func = tool[e.userInput];
    if (func) {
      func(e);
    }
  }
}

export default Component.extend({
  attributeBindings: ["style"],
  style: "position: relative; height: 100vh",
  async didInsertElement() {
    this._super(...arguments);
    if (
      this.element.children.length === 2 &&
      this.element.children[0].nodeName === "CANVAS" &&
      this.element.children[1].nodeName === "CANVAS"
    ) {
      let hud = this.element.children[0];
      let canvas = this.element.children[1];
      let b = await initbugout();
      console.log([hud, canvas, b]);
      document.getElementById("content").innerHTML = "";
      init(hud, canvas, b);
    }
  },
  willDestroyElement() {
    enablePageScroll();
    this._super(...arguments);
  }
});

async function initbugout() {
  let swarmId = "doodledocs"; //type in your own swarmId for it to work
  let b = new Bugout(swarmId);

  // It's always nice to inspect what's there

  b.on("message", function(address, msg) {
    let p = document.createElement("p");
    p.innerHTML = `address ${address}: sends message ${msg}`;
    document.getElementById("content").append(p);
  });

  // wait for peer list -- yes, with a setTimeout. No I will not apologize ;-)
  return new Promise(resolve => {
    setTimeout(() => {
      b.send("Hello World!");
      resolve(b);
    }, 3000);
  });
}
