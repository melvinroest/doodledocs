import { drawHud } from "./draw-engine";
import { bresenhamsLineAlgorithm } from "./draw-engine";

export default class Pencil {
  constructor(
    pencilColor,
    pencilThickness,
    context,
    canvas,
    hudContext,
    transmissionSerice
  ) {
    this.started = false;
    this.pencilColor = pencilColor;
    this.pencilThickness = pencilThickness;
    this.context = context;
    this.canvas = canvas;
    this.hudContext = hudContext;
    this.transmissionSerice = transmissionSerice;
    this.mode = "pencil";
  }

  //this.start
  //this.startDeepPress
  startDraw(e) {
    this.started = true;
    this.context.fillStyle = this.pencilColor;
    this.lastX = e._x - e.target.offsetLeft;
    this.lastY = e._y - e.target.offsetTop;
  }

  duringDraw(e) {
    // let inputDevice = e.touches[0].touchType;
    let inputDevice = "stylus";
    if (inputDevice === "stylus") {
      if (this.started) {
        let args = {
          e,
          lastX: this.lastX,
          lastY: this.lastY,
          pencilColor: this.pencilColor,
          context: this.context,
          pencilThickness: this.pencilThickness,
          isMakingOwnChanges: true,
          transmissionService: this.transmissionSerice,
          mode: this.mode === "pencil" ? "fill" : "clear"
        };
        let last = bresenhamsLineAlgorithm.call(this, args);
        this.lastX = last.lastX;
        this.lastY = last.lastY;
        drawHud(this.hudContext, this.canvas, this.pencilThickness, e._x, e._y);
      }
    }
  }

  //this.end
  //this.endDeepPress
  endDraw(e) {
    // good for standard collaborative drawing, not so handy for when I use my iframe hack
    // this.hudContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.started) {
      this.started = false;
    }
  }
}
