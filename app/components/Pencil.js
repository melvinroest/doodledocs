const FORCE_MODIFIER = 8;

export default class Pencil {
  constructor(color, thickness) {
    this.color = color; //opacity assumed w/ rgba
    this.thickness = thickness;
  }

  render(paper, x, y, force) {
    let thickness = this.thickness + force * FORCE_MODIFIER; //todo: need adj for tool overlay -- todo: put this in tool overlay code
    const adj = thickness / 2;
    paper.fillStyle = this.color;
    paper.fillRect(x - adj, y - adj, thickness, thickness);
  }
}
