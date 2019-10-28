import Component from "@ember/component";
import {
  disablePageScroll,
  enablePageScroll,
  addScrollableSelector
} from "scroll-lock";
import { computed } from "@ember/object";
import { getOwner } from "@ember/application";
import drawEngine from "./draw-engine";

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
    if (
      this.element.children.length === 2 &&
      this.element.children[0].nodeName === "CANVAS" &&
      this.element.children[1].nodeName === "CANVAS"
    ) {
      let hud = this.element.children[0];
      let canvas = this.element.children[1];
      let transmissionService = this.get("transmissionService");

      transmissionService.startService(
        transmissionService.TRANSMISSIONMODE.P2P
      );

      canvas.style.pointerEvents = "auto";
      disablePageScroll();
      drawEngine.call(this, hud, canvas, transmissionService);

      // todo: remove
      // const target = this._target;
      // const ele = this.get("element");

      // if (target.m === "browse") {
      //   ele.style.pointerEvents = "none";
      // } else {
      //   ele.style.pointerEvents = "auto";
      // }
      // window.onhashchange = function() {
      //   if (location.hash === "#browse") {
      //     ele.style.pointerEvents = "none";
      //   } else {
      //     ele.style.pointerEvents = "auto";
      //   }
      // };
      document
        .getElementById("w-submit-menu-item")
        .addEventListener("click", e => {
          e.preventDefault();
          let url = document.getElementById("w-input-menu-item").value;
          this._target.set("w", url);
        });
    }
  },
  willDestroyElement() {
    enablePageScroll();
    //need to reset query parameters here
    this._super(...arguments);
  }
});
