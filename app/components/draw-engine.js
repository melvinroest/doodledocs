import Pressure from "pressure";

//emberComponent
export default function init(context, pencil) {
  const canvas = context.canvas;

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

export function drawHud(hudContext, lineThickness, x, y) {
  /* draw all circles */
  hudContext.clearRect(0, 0, hudContext.canvas.width, hudContext.canvas.height);
  hudContext.strokeStyle = "#f00";
  hudContext.lineWidth = 1;
  hudContext.beginPath();

  // need adjustX & Y for tool overlay
  const adj = lineThickness / 2;
  hudContext.rect(x - adj, y - adj, lineThickness, lineThickness);
  hudContext.stroke();
}

export function partnerMakesChanges(data, context, hudContext) {
  //hudcontext needs to be used for a hud display for the partner
  data.context = context;
  data.isMakingOwnChanges = false;
  data.b = undefined; //todo: rename b to bugout
  // data.context.fillStyle = "red"; //debug
  bresenhamsLineAlgorithm(data);
  drawHud(hudContext, data.thickness, data.e._x, data.e._y);
}

// https://stackoverflow.com/questions/10122553/create-a-realistic-pencil-tool-for-a-painting-app-with-html5-canvas
// todo: the calculation shouldn't care about drawing, just calculating coord stuff
export function bresenhamsLineAlgorithm(args) {
  // method of explanation: draw a star from inside out, coord-system: * clock-wise quadrants starting with top vertical as 1, bottom vertical is 5
  // How this algo works in short: it is able to draw
  // 1 - 3 * and 5 - 7 * and then flips it on the y-axis if needed to produce
  // 3 - 5 * and 8 - 1 *
  let {
    e,
    lastX,
    lastY,
    color,
    context,
    thickness,
    isMakingOwnChanges,
    transmissionService,
    mode
  } = args;
  context.fillStyle = color;

  //todo: wrong level of abstraction
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

  let palmIsDetected = detectPalm(x1, x2, y1, y2); //rudimentary and simple

  //todo: move this somewhere else, bresenham should not be aware of data sending
  if (isMakingOwnChanges && palmIsDetected === false) {
    let data = {
      e: {
        _x: e._x,
        _y: e._y,
        userForce: e.userForce
      },
      lastX,
      lastY,
      color,
      thickness,
      mode
    };
    // partnerMakesChanges
    transmissionService.send(data);
  }
  //some line thickness settings
  // alert(`${x}, ${y}, ${lineThickness}`);
  thickness = thickness + 8 * e.userForce;
  // need adj for tool overlay
  const adj = thickness / 2;

  for (let x = x1; x < x2; x++) {
    if (palmIsDetected === false) {
      if (isSteep) {
        //does up/down
        drawRect(context, y - adj, x - adj, thickness, mode);
      } else {
        //does left/right
        drawRect(context, x - adj, y - adj, thickness, mode);
      }
    }

    error += de;

    //needed to enable fast drawing
    if (error >= 0.5) {
      y += yStep;
      error -= 1.0;
    }
  }

  //todo: rename to prevX and prevY
  lastX = mouseX;
  lastY = mouseY;
  return { lastX, lastY };
}

//todo: switch, should not be called drawRect, should probably not be here (?)
//should be in pencil + eraser class
function drawRect(context, x, y, thickness, mode) {
  if (mode === "fill") {
    context.fillRect(x, y, thickness, thickness);
  } else if (mode === "clear") {
    context.clearRect(x, y, thickness, thickness);
  } else {
    //legacy (partnerMakesChanges makes use of this, todo: change this -- this only matters atm for iframe support)
    context.fillRect(x, y, thickness, thickness);
  }
}

// rudimentary palm cancellation -- I simply logged values and handcoded a threshold that I think is too big
// in testing this method shows that super duper fast drawing is impossible (though you'd almost need your damage screen, that's how fast it is)
function detectPalm(x1, x2, y1, y2) {
  //lowest bug values observed: diffX: 0.47265625 – diffY: 0.0783132530120482
  const thresholdPercent = 0.4; //you can tweak this
  const diffX = Math.abs(x1 - x2) / window.innerWidth;
  const diffY = Math.abs(y1 - y2) / window.innerHeight;
  const diffPct = diffX + diffY;

  const palmDetected = diffPct > thresholdPercent;
  return palmDetected;
}
