export default class Eraser {
  constructor(thickness) {
    this.thickness = thickness;
  }

  render(paper, x, y, force) {
    const adj = this.thickness / 2; //todo: need adj for tool overlay -- todo: put this in tool overlay code
    paper.clearRect(x - adj, y - adj, this.thickness, this.thickness);
  }
}
