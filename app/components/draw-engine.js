import Pressure from "pressure";

export default function init(hud, canvas) {
  const transmissionService = this.get("transmissionService");
  transmissionService.onReceivingMessage((data, address) => {
    requestAnimationFrame(() => {
      partnerMakesChanges(data);
    });
  });

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
  let pencilColor = "rgba(0, 0, 0, 0.33)";
  let lineThickness = pencilThickness;
  let tool = new pencil();

  //init buttons
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("pencil").addEventListener(eventName, e => {
      pencilThickness = 1;
      pencilColor = "rgba(0, 0, 0, 0.33)";
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
    start: e => {
      e.userInput = "start";
      mousePosOnCanvas.call(this, e);
    },

    change: (force, e) => {
      e.userInput = "change";
      e.userForce = force;
      mousePosOnCanvas.call(this, e);
    },

    startDeepPress: e => {
      e.userInput = "startDeepPress";
      mousePosOnCanvas.call(this, e);
    },

    endDeepPress: () => {
      let e = {};
      e.userInput = "endDeepPress";
      mousePosOnCanvas.call(this, e);
    },

    end: () => {
      let that = this;
      let e = {};
      e.userInput = "end";
      mousePosOnCanvas.call(this, e);
    },

    unsupported: () => {
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
      let t1 = performance.now();
      // let inputDevice = e.touches[0].touchType;
      let inputDevice = "stylus";
      if (inputDevice === "stylus") {
        if (tool.started) {
          let args = {
            e,
            lastX,
            lastY,
            lineThickness,
            pencilColor,
            context,
            pencilThickness,
            isMakingOwnChanges: true,
            transmissionService
          };
          let last = bresenhamsLineAlgorithm.call(this, args);
          lastX = last.lastX;
          lastY = last.lastY;
        }
      }
      drawHud(lineThickness, e._x, e._y);
      let t2 = performance.now();
      // console.log(`this.change: ${t2 - t1}`);
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
    let func = tool[e.userInput].bind(this);
    if (func) {
      func(e);
    }
  }

  function partnerMakesChanges(data) {
    data.context = context;
    data.isMakingOwnChanges = false;
    data.b = undefined;
    // data.context.fillStyle = "red"; //debug
    data.context.fillStyle = data.pencilColor;
    data.transmissionService = transmissionService;
    bresenhamsLineAlgorithm.call(this, data);
  }

  function drawHud(lineThickness, x, y) {
    /* draw all circles */
    hudContext.clearRect(0, 0, canvas.width, canvas.height);
    hudContext.strokeStyle = "#f00";
    hudContext.lineWidth = 1;
    hudContext.beginPath();

    // need adjustX & Y for tool overlay
    const adj = lineThickness / 2;
    hudContext.rect(x - adj, y - adj, lineThickness, lineThickness);
    hudContext.stroke();
  }
}

// https://stackoverflow.com/questions/10122553/create-a-realistic-pencil-tool-for-a-painting-app-with-html5-canvas
function bresenhamsLineAlgorithm(args) {
  // method of explanation: draw a star from inside out, coord-system: * clock-wise quadrants starting with top vertical as 1, bottom vertical is 5
  // How this algo works in short: it is able to draw
  // 1 - 3 * and 5 - 7 * and then flips it on the y-axis if needed to produce
  // 3 - 5 * and 8 - 1 *
  let {
    e,
    lastX,
    lastY,
    lineThickness,
    pencilColor,
    context,
    pencilThickness,
    isMakingOwnChanges,
    transmissionService
  } = args;

  let mouseX = e._x;
  let mouseY = e._y;

  // draws between below left horizontal and diagonal, 6-7 of *
  let x1 = mouseX;
  let x2 = lastX;
  let y1 = mouseY;
  let y2 = lastY;
  let x = undefined;
  let y = undefined;

  //steep: y > x in any direction
  let isSteep = Math.abs(y2 - y1) >= Math.abs(x2 - x1);

  //draws
  // draws between top vertical and top right diagonal, 1-2 of *
  if (isSteep) {
    x = x1;
    x1 = y1;
    y1 = x;
    y = y2;
    y2 = x2;
    x2 = y;
  }

  // draws between right horizontal and diagonal, 2-3 of *
  if (x1 >= x2) {
    x = x1;
    x1 = x2;
    x2 = x;
    y = y1;
    y1 = y2;
    y2 = y;
  }

  //testing combination of both if-statements
  // draws between bottom vertical and bottom left diagonal, 5-6 of *
  let dx = x2 - x1;
  let dy = Math.abs(y2 - y1);
  let error = 0;
  let de = dy / dx;
  let yStep = -1;
  y = y1;

  //this allows for the flip
  if (y1 <= y2) {
    yStep = 1;
  }

  if (isMakingOwnChanges) {
    let data = {
      e: {
        _x: e._x,
        _y: e._y,
        userForce: e.userForce
      },
      lastX,
      lastY,
      lineThickness,
      pencilColor,
      pencilThickness
    };
    // partnerMakesChanges
    requestAnimationFrame(() => {
      transmissionService.send(data);
    });
  }
  //some line thickness settings
  // alert(`${x}, ${y}, ${lineThickness}`);
  lineThickness = lineThickness + 8 * e.userForce;
  // need adj for tool overlay
  const adj = lineThickness / 2;
  for (let x = x1; x < x2; x++) {
    if (isSteep) {
      //does up/down
      context.fillRect(y - adj, x - adj, lineThickness, lineThickness);
    } else {
      //does left/right
      context.fillRect(x - adj, y - adj, lineThickness, lineThickness);
    }

    error += de;

    //needed to enable fast drawing
    if (error >= 0.5) {
      y += yStep;
      error -= 1.0;
    }
  }
  lineThickness = pencilThickness;

  lastX = mouseX;
  lastY = mouseY;
  return { lastX, lastY };
}
