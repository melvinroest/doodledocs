import Component from '@ember/component';

// When person is drawing, put everything else on non-clickable (and visually display it by greying it out)

function init(canvas){
  let context = canvas.getContext('2d');
  canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#55f';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

export default Component.extend({
  attributeBindings: ['style'],
  style: "position: relative; height: 100vh;",
  didInsertElement() {
    this._super(...arguments);
    console.log([this.element.firstChild])
    if(this.element.childNodes.length === 1 && this.element.childNodes[0].nodeName === "CANVAS"){
      init(this.element.childNodes[0]);  
    }
  }
});