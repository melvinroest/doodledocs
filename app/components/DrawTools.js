import Pencil from "./Pencil";
import Eraser from "./Eraser";

export default class DrawTools {
  constructor(active) {
    this.pencil = new Pencil("rgba(0, 0, 0, 0.5)", 1);
    this.eraser = new Eraser(20);
    this.active = active || this.pencil;
  }
}
