import Pressure from "pressure";
import PubSub from "pubsub-js";
import { TOPIC_DRAW_DATA } from "./pubsub-topics";

class DrawState {
  constructor(context, hudContext, drawTools) {
    this.prevX = undefined;
    this.prevY = undefined;
    this.started = false;
    this.context = context;
    this.hudContext = hudContext;
    this.drawTools = drawTools;
  }
}

class DrawData {
  constructor(currX, currY, prevX, prevY, force) {
    this.currX = currX;
    this.currY = currY;
    this.prevX = prevX;
    this.prevY = prevY;
    this.force = force;
  }
}

//this.start
//this.startDeepPress
function startDraw(state, e) {
  state.started = true;
  state.prevX = e._x - e.target.offsetLeft;
  state.prevY = e._y - e.target.offsetTop;
}

function duringDraw(state, e) {
  // let inputDevice = e.touches[0].touchType;
  let inputDevice = "stylus";
  if (inputDevice === "stylus") {
    if (state.started) {
      const data = new DrawData(
        e._x,
        e._y,
        state.prevX,
        state.prevY,
        e.userForce
      );
      PubSub.publish(TOPIC_DRAW_DATA, data); //transmissionService needs to listen in on this
      draw(state, data);
      state.prevX = data.currX;
      state.prevY = data.currY;
    }
  }
}

//this.end
//this.endDeepPress
function endDraw(state) {
  if (state.started) {
    state.started = false;
  }
}

//emberComponent
export function init(context, hudContext, drawTools) {
  const canvas = context.canvas;
  const state = new DrawState(context, hudContext, drawTools);

  //init pressure settings
  let block = {
    start: e => {
      e = mousePosOnCanvas(e);
      startDraw(state, e);
    },

    startDeepPress: e => {
      e = mousePosOnCanvas(e);
      startDraw(state, e);
    },

    change: (force, e) => {
      e.userForce = force;
      e = mousePosOnCanvas(e);
      duringDraw(state, e);
    },

    end: () => {
      endDraw(state);
    },

    endDeepPress: () => {
      endDraw(state);
    }

    // todo: implement unsupported
    // unsupported: () => {
    //   this.innerHTML = "Your device / browser does not support this :(";
    // }
  };

  Pressure.set(canvas, block);

  return state;
}

export function draw(state, data) {
  const coordinates = bresenhamsLineAlgorithm(data, detectPalm);
  drawToCanvas(state, coordinates, data.force);
  drawHud(state, data.currX, data.currY);
}

function drawToCanvas(state, coordinates, force) {
  coordinates.forEach(coord => {
    state.drawTools.active.render(state.context, coord.x, coord.y, force);
  });
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

function drawHud(state, x, y) {
  /* draw all circles */
  //note: this will interfere with multi-user hud drawing
  state.hudContext.clearRect(
    0,
    0,
    state.hudContext.canvas.width,
    state.hudContext.canvas.height
  );
  state.hudContext.strokeStyle = "#f00";
  state.hudContext.lineWidth = 1;
  state.hudContext.beginPath();

  // need adjustX & Y for drawTool overlay
  const adj = state.drawTools.active.thickness / 2;
  state.hudContext.rect(
    x - adj,
    y - adj,
    state.drawTools.active.thickness,
    state.drawTools.active.thickness
  );
  state.hudContext.stroke();
}

// https://stackoverflow.com/questions/10122553/create-a-realistic-pencil-tool-for-a-painting-app-with-html5-canvas
function bresenhamsLineAlgorithm(data, determineIfValidDrawCallback) {
  // method of explanation: draw a star from inside out, coord-system: * clock-wise quadrants starting with top vertical as 1, bottom vertical is 5
  // How this algo works in short: it is able to draw
  // 1 - 3 * and 5 - 7 * and then flips it on the y-axis if needed to produce
  // 3 - 5 * and 8 - 1 *

  // draws between below left horizontal and diagonal, 6-7 of *
  let x1 = data.currX;
  let x2 = data.prevX;
  let y1 = data.currY;
  let y2 = data.prevY;
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

  let shouldDraw = determineIfValidDrawCallback(x1, x2, y1, y2);

  const coordinates = [];
  for (let x = x1; x < x2; x++) {
    if (shouldDraw) {
      if (isSteep) {
        //does up/down -- flipped key-value mapping
        coordinates.push({
          x: y,
          y: x
        });
      } else {
        //does left/right -- normal key-value mapping
        coordinates.push({ x, y });
      }
    }

    error += de;

    //needed to enable fast drawing
    if (error >= 0.5) {
      y += yStep;
      error -= 1.0;
    }
  }

  return coordinates;
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
  const shouldDraw = !palmDetected;
  return shouldDraw;
}
