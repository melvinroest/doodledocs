import { drawHud } from "./draw-engine";
import { bresenhamsLineAlgorithm } from "./draw-engine";

export default class Pencil {
  constructor(
    color,
    thickness
    // context,
    // canvas,
    // hudContext,
    // transmissionSerice
  ) {
    // this.started = false;
    this.color = color;
    this.thickness = thickness;
    this.mode = "pencil";
  }
}
