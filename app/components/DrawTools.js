import Pencil from "./Pencil";
import Eraser from "./Eraser";

export default class DrawTools {
  constructor(settings) {
    this.pencil = new Pencil(
      "rgba(0, 0, 0, 0.5)",
      settings.pencil_thickness,
      settings.pencil_pressure_sensitivity
    );
    this.eraser = new Eraser(settings.eraser_thickness);
    this.active = this.pencil;
  }
}
