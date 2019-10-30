import Component from "@ember/component";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { computed } from "@ember/object";
import { getOwner } from "@ember/application";
import drawEngine from "./draw-engine";
import { initMenu } from "./menu";
import Pencil from "./Pencil";

export default Component.extend({
  //So I can't use arrow functions because the this object is bound to the function or something?
  //That is quite odd...
  transmissionService: computed(function() {
    let owner = getOwner(this);
    return owner.lookup(`service:transmission-service`);
  }),
  attributeBindings: ["style"],
  style:
    "position: absolute; left: 0; top: 0; z-index: 99; height: 300vh; width: 100%; pointer-events: none;",
  didRender() {
    this._super(...arguments);
    const hud = this.element.children[0];
    const canvas = this.element.children[1];
    canvas.style.pointerEvents = "auto"; //probably move this to CSS
    const transmissionService = this.get("transmissionService");
    const context = initCanvas(canvas);
    const hudContext = initCanvas(hud);

    transmissionService.startService(transmissionService.TRANSMISSIONMODE.P2P);

    disablePageScroll();

    const pencil = new Pencil(
      "rgba(0, 0, 0, 0.5)", //color
      1, //thickness
      context,
      canvas,
      hudContext,
      transmissionService
    );
    initMenu(this, pencil, context);
    drawEngine.call(this, hudContext, context, transmissionService, pencil);

    transmissionService.onReceivingMessage((data, address) => {
      if (data.e) {
        drawEngine.partnerMakesChanges(data, context, hudContext);
      }
    });
  },
  willDestroyElement() {
    enablePageScroll();
    //need to reset query parameters here
    this._super(...arguments);
  }
});

function initCanvas(canvas) {
  let context = canvas.getContext("2d");
  canvas.style.width = "100%";
  canvas.style.height = "300vh";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);
  return context;
}
