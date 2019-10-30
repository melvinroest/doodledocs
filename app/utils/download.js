export function downloadCanvasImage(canvas) {
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
}
