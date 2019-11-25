import ColorPicker from "./ColorPicker";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import {
  putImageOnCanvas,
  copyToClipboard,
  downloadCanvasImage
} from "doodledocs-app/utils";

const CLICK = "click";

const CanvasModeEnum = Object.freeze({
  DRAW: Symbol("draw"),
  SCROLL: Symbol("scroll")
});

export function initMenu(emberObject, context, tools, settings) {
  const canvas = context.canvas;
  let canvasMode = CanvasModeEnum.DRAW;

  //color picker
  const newElement = document.getElementById("pencil-picker");
  const picker = new ColorPicker(newElement, tools.pencil.color);
  picker.on("change", (color, instance) => {
    const colorRGBA = color.toRGBA().toString();
    tools.pencil.color = colorRGBA;
  });

  //upload functionality -- todo: make cross-browser compatible
  //todo: simplify like you know you should
  document.getElementById("upload-menu-item").addEventListener(CLICK, e => {
    putImageOnCanvas(context);
  });

  document.getElementById("pencil").addEventListener(CLICK, e => {
    tools.active = tools.pencil;
  });

  document.getElementById("eraser").addEventListener(CLICK, e => {
    tools.active = tools.eraser;
  });

  document.getElementById("download").addEventListener(CLICK, e => {
    downloadCanvasImage(context.canvas);
  });

  document.getElementById("share").addEventListener(CLICK, e => {
    copyToClipboard(window.location.href);
  });

  document.getElementById("scroll-menu-item-on").addEventListener(CLICK, e => {
    if (canvasMode === CanvasModeEnum.DRAW) {
      canvas.style.pointerEvents = "none";
      enablePageScroll();
      canvasMode = CanvasModeEnum.SCROLL;
    }
  });

  document.getElementById("scroll-menu-item-off").addEventListener(CLICK, e => {
    if (canvasMode === CanvasModeEnum.SCROLL) {
      canvas.style.pointerEvents = "auto";
      disablePageScroll();
      canvasMode = CanvasModeEnum.DRAW;
    }
  });

  if (settings.annotation_options) {
    document
      .getElementById("website-submit-menu-item")
      .addEventListener(CLICK, e => {
        const url = document.getElementById("website-input-menu-item").value;
        emberObject._target.set("website", url);
      });
  }

  //init zoom settings -- ipad only
  const menu = document.getElementById("app-header");
  const colorPicker = document.getElementsByClassName("pcr-app")[0];
  scaleMenu(menu, colorPicker);
}

function scaleMenu(menu, colorPicker) {
  menu.style.left = "0px";
  menu.style.top = "0px";
  colorPicker.style.left = "0px";
  colorPicker.style.top = "0px";
  //touchmove is also possible, scroll will introduce bugs with pcr-app positioning
  //put in a function
  document.addEventListener("touchmove", event => {
    const viewportOffsetMenu = menu.getBoundingClientRect();
    const viewportOffsetColorPicker = colorPicker.getBoundingClientRect();
    // these are relative to the viewport

    const zoom = document.documentElement.clientWidth / window.innerWidth;
    menu.style.transform = `scale(${1 / zoom})`;
    menu.style.position = "absolute";
    menu.style.left = `${parseFloat(menu.style.left) -
      viewportOffsetMenu.left}px`;
    menu.style.top = `${parseFloat(menu.style.top) - viewportOffsetMenu.top}px`;

    colorPicker.style.transform = `scale(${1 / zoom})`;
    colorPicker.style.position = "absolute";
    colorPicker.style.left = `${parseFloat(colorPicker.style.left) -
      viewportOffsetColorPicker.left}px`;
    colorPicker.style.top = `${parseFloat(colorPicker.style.top) -
      viewportOffsetColorPicker.top +
      viewportOffsetMenu.height}px`;
  });
}

//refactor proposal (not too happy with it as the branching logic complicates it)

// //init zoom settings -- ipad only
//   const menu = document.getElementById("app-header");
//   const colorPicker = document.getElementsByClassName("pcr-app")[0];
//   scaleMenu(menu);
//   scaleMenu(colorPicker, menu);
// }

// function scaleMenu(overlay, dependentOverlay) {
//   //the scroll event will introduce bugs with pcr-app positioning
//   overlay.style.left = "0px";
//   overlay.style.top = "0px";
//   document.addEventListener("touchmove", event => {
//     const viewportOffset = overlay.getBoundingClientRect();
//     const zoom = document.documentElement.clientWidth / window.innerWidth;
//     overlay.style.transform = `scale(${1 / zoom})`;
//     overlay.style.position = "absolute";
//     overlay.style.left = `${parseFloat(overlay.style.left) -
//       viewportOffset.left}px`;

//     if (dependentOverlay === undefined) {
//       //it's the menu
//       overlay.style.top = `${parseFloat(overlay.style.top) -
//         viewportOffset.top}px`;
//     } else {
//       //it's the color picker which needs to be below the menu
//       const viewportOffsetDependentOverlay = dependentOverlay.getBoundingClientRect();
//       overlay.style.top = `${parseFloat(overlay.style.top) -
//         viewportOffset.top +
//         viewportOffsetDependentOverlay.height}px`;
//     }

//   });
// }
