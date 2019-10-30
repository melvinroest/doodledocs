import ColorPicker from "./ColorPicker";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { putImageOnCanvas, copyToClipboard } from "doodledocs-app/utils";

const CanvasModeEnum = Object.freeze({
  DRAW: Symbol("draw"),
  SCROLL: Symbol("scroll")
});

export function initMenu(emberObject, pencil, context) {
  const canvas = context.canvas;
  let canvasMode = CanvasModeEnum.DRAW;

  //color picker
  const newElement = document.getElementById("pencil-picker");
  const picker = new ColorPicker(newElement, pencil.color);
  picker.on("change", (color, instance) => {
    const colorRGBA = color.toRGBA().toString();
    pencil.color = colorRGBA;
  });

  //upload functionality -- todo: make cross-browser compatible
  //todo: simplify like you know you should
  ["click"].forEach(function(eventName) {
    document
      .getElementById("upload-menu-item")
      .addEventListener(eventName, e => {
        e.preventDefault();
        putImageOnCanvas(context);
      });
  });

  //init buttons
  ["click"].forEach(function(eventName) {
    //init buttons
    document.getElementById("pencil").addEventListener(eventName, e => {
      pencil.thickness = 1; //todo: turn this into a widget
      pencil.mode = "pencil";
    });
  });
  ["click"].forEach(function(eventName) {
    document.getElementById("eraser").addEventListener(eventName, e => {
      pencil.thickness = 20; //todo: turn this into a widget
      pencil.mode = "eraser";
    });
  });
  ["click"].forEach(function(eventName) {
    document.getElementById("download").addEventListener(eventName, e => {
      //create a new canvas and convert it to a blob
      const newCanvas = document.createElement("canvas");
      const newContext = newCanvas.getContext("2d");
      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height;
      newContext.drawImage(canvas, 0, 0);
      newContext.fillStyle = "#000";
      newContext.font = "32px Roboto Mono";
      newContext.fillText("doodledocs.com", 10, 50);

      //create the download
      const mimeType = "image/png";
      const imageQuality = 1;
      newCanvas.toBlob(
        blob => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          // Chrome on iOS behaves a bit differently
          if (navigator.userAgent.match("CriOS")) {
            link.href = newCanvas.toDataURL();
          }
          link.target = "_blank";
          link.download = "doodle.png";
          link.click();
        },
        mimeType,
        imageQuality
      );
    });
  });
  ["click"].forEach(function(eventName) {
    document.getElementById("share").addEventListener(eventName, e => {
      copyToClipboard(window.location.href);
    });
  });

  ["click"].forEach(function(eventName) {
    document
      .getElementById("scroll-menu-item-on")
      .addEventListener(eventName, e => {
        if (canvasMode === CanvasModeEnum.DRAW) {
          canvas.style.pointerEvents = "none";
          enablePageScroll();
          canvasMode = CanvasModeEnum.SCROLL;
        }
      });
  });

  ["click"].forEach(function(eventName) {
    document
      .getElementById("scroll-menu-item-off")
      .addEventListener(eventName, e => {
        //scrolling needs to be off, therefore canvasModeIsDraw = true
        if (canvasMode === CanvasModeEnum.SCROLL) {
          canvas.style.pointerEvents = "auto";
          disablePageScroll();
          canvasMode = CanvasModeEnum.DRAW;
        }
      });
  });

  document.getElementById("w-submit-menu-item").addEventListener("click", e => {
    e.preventDefault();
    let url = document.getElementById("w-input-menu-item").value;
    //variable name _target, rename "w" to "website"
    emberObject._target.set("w", url);
  });

  //init zoom settings (stub)
  const overlay = document.getElementById("app-header");
  const overlay2 = document.getElementsByClassName("pcr-app")[0];
  overlay.style.left = "0px";
  overlay.style.top = "0px";
  overlay2.style.left = "0px";
  overlay2.style.top = "0px";
  //touchmove is also possible, scroll will introduce bugs with pcr-app positioning
  //put in a function
  document.addEventListener("touchmove", event => {
    const viewportOffset = overlay.getBoundingClientRect();
    const viewportOffset2 = overlay2.getBoundingClientRect();
    // these are relative to the viewport
    // console.log(
    //   "scroll",
    //   overlay.style.left,
    //   viewportOffset.left,
    //   newX,
    //   overlay.style.top,
    //   viewportOffset.top,
    //   overlay.style
    // );
    const zoom = document.documentElement.clientWidth / window.innerWidth;
    overlay.style.transform = `scale(${1 / zoom})`;
    overlay.style.position = "absolute";
    overlay.style.left = `${parseFloat(overlay.style.left) -
      viewportOffset.left}px`;
    overlay.style.top = `${parseFloat(overlay.style.top) -
      viewportOffset.top}px`;

    overlay2.style.transform = `scale(${1 / zoom})`;
    overlay2.style.position = "absolute";
    overlay2.style.left = `${parseFloat(overlay2.style.left) -
      viewportOffset2.left}px`;
    overlay2.style.top = `${parseFloat(overlay2.style.top) -
      viewportOffset2.top +
      viewportOffset.height}px`;
  });
}
