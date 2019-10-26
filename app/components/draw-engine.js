import Pressure from "pressure";
import Pencil from "./Pencil";
import ColorPicker from "./ColorPicker";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

export default function init(hud, canvas, transmissionService) {
  let context = canvas.getContext("2d");
  canvas.style.width = "100%";
  canvas.style.height = "300vh";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);
  // context.fillStyle = "#FFFBEB"; //for debug use: $55f
  // context.fillRect(0, 0, canvas.width, canvas.height);

  //init hud
  let hudContext = hud.getContext("2d");
  hud.style.width = "100%";
  hud.style.height = "300vh";
  hud.width = canvas.offsetWidth;
  hud.height = canvas.offsetHeight;
  hudContext.clearRect(0, 0, canvas.width, canvas.height);

  let pencilThickness = 1;
  let pencilColor = "rgba(0, 0, 0, 0.33)";
  let pencil = new Pencil(
    pencilColor,
    pencilThickness,
    context,
    canvas,
    hudContext,
    transmissionService
  );

  //todo: maybe seperate menu items out from the draw-engine

  const newElement = document.getElementById("pencil-picker");
  const picker = new ColorPicker(newElement, "rgba(0, 0, 0, 1)"); //I don't want to scare users with the alpha channel in the beginning
  picker.on("change", (color, instance) => {
    const colorRGBA = color.toRGBA().toString();
    pencil.pencilColor = colorRGBA;
  });

  //init buttons
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("pencil").addEventListener(eventName, e => {
      pencil.pencilThickness = 1;
      // pencil.pencilColor = "rgba(0, 0, 0, 0.33)"; //maybe re-init color here, to think about
      pencil.mode = "pencil";
    });
  });
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("eraser").addEventListener(eventName, e => {
      pencil.pencilThickness = 20;
      pencil.mode = "eraser";
    });
  });
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("download").addEventListener(eventName, e => {
      //create a new canvas
      const newCanvas = document.createElement("canvas");
      const newContext = newCanvas.getContext("2d");
      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height;
      newContext.drawImage(canvas, 0, 0);
      newContext.fillStyle = "#000";
      newContext.font = "32px Roboto Mono";
      newContext.fillText("doodledocs.com", 10, 50);

      //create the download
      const link = document.createElement("a");
      link.download = "drawing.png";
      link.href = newCanvas.toDataURL();
      link.click();
    });
  });
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("share").addEventListener(eventName, e => {
      const dummy = document.createElement("input");
      const text = window.location.href;
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      //show tooltip or message - now I'm doing a console.log... yea I know
      console.log(
        "URL copied, you can share it with your friends and they'll be able to draw as well"
      );
    });
  });

  ["click", "touchstart"].forEach(function(eventName) {
    document
      .getElementById("scroll-menu-item-on")
      .addEventListener(eventName, e => {
        enablePageScroll();
      });
  });

  ["click", "touchstart"].forEach(function(eventName) {
    document
      .getElementById("scroll-menu-item-off")
      .addEventListener(eventName, e => {
        disablePageScroll();
      });
  });

  transmissionService.onReceivingMessage((data, address) => {
    if (data.e) {
      partnerMakesChanges(data, context, canvas, hudContext);
    }
  });

  //init pressure settings
  let block = {
    start: e => {
      e = mousePosOnCanvas.call(this, e);
      pencil.startDraw(e);
    },

    startDeepPress: e => {
      e = mousePosOnCanvas.call(this, e);
      pencil.startDraw(e);
    },

    change: (force, e) => {
      e.userForce = force;
      e = mousePosOnCanvas.call(this, e);
      pencil.duringDraw(e);
    },

    end: () => {
      let e = {};
      e = mousePosOnCanvas.call(this, e);
      pencil.endDraw(e);
    },

    endDeepPress: () => {
      let e = {};
      e = mousePosOnCanvas.call(this, e);
      pencil.endDraw(e);
    },

    unsupported: () => {
      this.innerHTML = "Your device / browser does not support this :(";
    }
  };

  Pressure.set(canvas, block);
}

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

  return e;
}

export function drawHud(hudContext, canvas, lineThickness, x, y) {
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

function partnerMakesChanges(data, context, canvas, hudContext) {
  //hudcontext needs to be used for a hud display for the partner
  data.context = context;
  data.isMakingOwnChanges = false;
  data.b = undefined;
  // data.context.fillStyle = "red"; //debug
  bresenhamsLineAlgorithm(data);
  drawHud(hudContext, canvas, data.pencilThickness, data.e._x, data.e._y);
}

// https://stackoverflow.com/questions/10122553/create-a-realistic-pencil-tool-for-a-painting-app-with-html5-canvas
export function bresenhamsLineAlgorithm(args) {
  // method of explanation: draw a star from inside out, coord-system: * clock-wise quadrants starting with top vertical as 1, bottom vertical is 5
  // How this algo works in short: it is able to draw
  // 1 - 3 * and 5 - 7 * and then flips it on the y-axis if needed to produce
  // 3 - 5 * and 8 - 1 *
  let {
    e,
    lastX,
    lastY,
    pencilColor,
    context,
    pencilThickness,
    isMakingOwnChanges,
    transmissionService,
    mode
  } = args;
  context.fillStyle = pencilColor;

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
      pencilColor,
      pencilThickness,
      mode
    };
    // partnerMakesChanges
    transmissionService.send(data);
  }
  //some line thickness settings
  // alert(`${x}, ${y}, ${lineThickness}`);
  pencilThickness = pencilThickness + 8 * e.userForce;
  // need adj for tool overlay
  const adj = pencilThickness / 2;

  let hasNoPalm = detectPalm(x, x1, x2, y, y1, y2); //rudimentary and simple

  for (let x = x1; x < x2; x++) {
    if (hasNoPalm) {
      if (isSteep) {
        //does up/down
        drawRect(context, y - adj, x - adj, pencilThickness, mode);
      } else {
        //does left/right
        drawRect(context, x - adj, y - adj, pencilThickness, mode);
      }
    }

    error += de;

    //needed to enable fast drawing
    if (error >= 0.5) {
      y += yStep;
      error -= 1.0;
    }
  }

  lastX = mouseX;
  lastY = mouseY;
  return { lastX, lastY };
}

function drawRect(context, x, y, pencilThickness, mode) {
  if (mode === "fill") {
    context.fillRect(x, y, pencilThickness, pencilThickness);
  } else if (mode === "clear") {
    context.clearRect(x, y, pencilThickness, pencilThickness);
  } else {
    //legacy (partnerMakesChanges makes use of this, todo: change this -- this only matters atm for iframe support)
    context.fillRect(x, y, pencilThickness, pencilThickness);
  }
}

// rudimentary palm cancellation -- I simply logged values and handcoded a threshold that I think is too big
function detectPalm(x, x1, x2, y, y1, y2) {
  let hasNoPalm = true;

  //lowest bug values observed: 0.47265625 – 0.0783132530120482
  const thresholdPercent = 40; //you can tweak this
  const diffX = Math.abs(x1 - x2) / window.innerWidth;
  const diffY = Math.abs(y1 - y2) / window.innerHeight;

  if (diffX + diffY > thresholdPercent) {
    hasNoPalm = false;
  }
  return hasNoPalm;
}
