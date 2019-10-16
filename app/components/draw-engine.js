import Pressure from "pressure";
import Pencil from "./Pencil";

export default function init(hud, canvas, transmissionService) {
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

  //init buttons
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("pencil").addEventListener(eventName, e => {
      pencil.pencilThickness = 1;
      pencil.pencilColor = "rgba(0, 0, 0, 0.33)";
    });
  });
  ["click", "touchstart"].forEach(function(eventName) {
    document.getElementById("eraser").addEventListener(eventName, e => {
      pencil.pencilThickness = 20;
      pencil.pencilColor = "#FFFBEB";
    });
  });

  transmissionService.onReceivingMessage((data, address) => {
    partnerMakesChanges(data, context, canvas, hudContext, transmissionService);
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

function partnerMakesChanges(
  data,
  context,
  canvas,
  hudContext,
  transmissionService
) {
  //hudcontext needs to be used for a hud display for the partner
  data.context = context;
  data.isMakingOwnChanges = false;
  data.b = undefined;
  // data.context.fillStyle = "red"; //debug
  data.context.fillStyle = data.pencilColor;
  data.transmissionService = transmissionService;
  bresenhamsLineAlgorithm.call(this, data);
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
      pencilColor,
      pencilThickness
    };
    // partnerMakesChanges
    transmissionService.send(data);
  }
  //some line thickness settings
  // alert(`${x}, ${y}, ${lineThickness}`);
  pencilThickness = pencilThickness + 8 * e.userForce;
  // need adj for tool overlay
  const adj = pencilThickness / 2;
  for (let x = x1; x < x2; x++) {
    if (isSteep) {
      //does up/down
      context.fillRect(y - adj, x - adj, pencilThickness, pencilThickness);
    } else {
      //does left/right
      context.fillRect(x - adj, y - adj, pencilThickness, pencilThickness);
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
