import Component from "@ember/component";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { computed } from "@ember/object";
import { getOwner } from "@ember/application";
import drawEngine from "./draw-engine";
import { initMenu } from "./menu";
import DrawTools from "./DrawTools";
import PubSub from "pubsub-js";
import { TOPIC_DRAW_DATA } from "./pubsub-topics";

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
  async didRender() {
    this._super(...arguments);

    const hud = this.element.children[0];
    const canvas = this.element.children[1];
    canvas.style.pointerEvents = "auto"; //probably move this to CSS
    const transmissionService = this.get("transmissionService");
    const context = initCanvas(canvas);
    const hudContext = initCanvas(hud);

    transmissionService.startService(transmissionService.TRANSMISSIONMODE.P2P);

    disablePageScroll();

    const tools = new DrawTools(this.settings);
    initMenu(this, context, tools, this.settings);
    const drawState = drawEngine.init(context, hudContext, tools);

    transmissionService.onReceivingMessage((data, address) => {
      //To do: BUG, at this moment palm cancellation fails b/c of the wrong window being set
      //To do: BUG, at this moment color is not being sent
      drawEngine.draw(drawState, data);
    });
    const token = PubSub.subscribe(
      TOPIC_DRAW_DATA,
      broadcastDrawData(transmissionService)
    );
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

function broadcastDrawData(transmissionService) {
  return (msg, data) => {
    // if (isMakingOwnChanges) { // <-- most likely I don't need this
    // data.currX, data.currY, data.prevX, data.prevY;
    transmissionService.send(data);
  };
}
