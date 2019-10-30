export function putImageOnCanvas(context) {
  const input = document.createElement("input");
  input.type = "file";
  input.addEventListener(
    "change",
    e => {
      const reader = new FileReader();

      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          context.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
      };

      reader.readAsDataURL(e.target.files[0]);
    },
    false
  );
  input.click();
}
