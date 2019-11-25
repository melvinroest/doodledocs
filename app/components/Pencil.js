export default class Pencil {
  constructor(color, thickness, pressureSensitivityValue) {
    this.color = color; //opacity assumed w/ rgba
    this.thickness = thickness;
    this.pressureSensitivityValue = pressureSensitivityValue;
  }

  render(paper, x, y, force) {
    let thickness = this.thickness + force * this.pressureSensitivityValue; //todo: need adj for tool overlay -- todo: put this in tool overlay code
    const adj = thickness / 2;
    paper.fillStyle = this.color;
    paper.fillRect(x - adj, y - adj, thickness, thickness);
  }
}
