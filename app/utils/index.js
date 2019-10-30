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

// /**
//  * https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
//  * Copy a string to clipboard
//  * @param  {String} string         The string to be copied to clipboard
//  * @return {Boolean}               returns a boolean correspondent to the success of the copy operation.
//  */
export function copyToClipboard(string) {
  let textarea;
  let result;

  try {
    textarea = document.createElement("textarea");
    textarea.setAttribute("readonly", true);
    textarea.setAttribute("contenteditable", true);
    textarea.style.position = "fixed"; // prevent scroll from jumping to the bottom when focus is set.
    textarea.value = string;

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const range = document.createRange();
    range.selectNodeContents(textarea);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    textarea.setSelectionRange(0, textarea.value.length);
    result = document.execCommand("copy");
  } catch (err) {
    console.error(err);
    result = null;
  } finally {
    document.body.removeChild(textarea);
  }

  // manual copy fallback using prompt
  // if (!result) {
  //   const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  //   const copyHotkey = isMac ? "⌘C" : "CTRL+C";
  //   result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
  //   if (!result) {
  //     return false;
  //   }
  // }
  return true;
}

function doNotUse() {
  //own not too great zooming/panning come in handy
  let scaling = false;
  let dist = undefined;
  let prevDist = undefined;
  const docContent = document.getElementById("doc-content");
  let zoom = 1.0;
  docContent.addEventListener("touchstart", e => {
    if (e.touches.length === 2) {
      const fingerDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      scaling = true;
      dist = fingerDistance;
      // console.log("touchstart zooming", zoom);
    }
  });
  docContent.addEventListener(
    "touchmove",
    e => {
      const fingerDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      if (event.scale < 0.95 || event.scale > 1.05) {
        event.preventDefault();
      }
      if (scaling && fingerDistance > 125) {
        // value empirically found via logging to console on Safari iOS
        e.preventDefault();
        prevDist = dist;
        dist = dist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        if (dist > prevDist && zoom < 4) {
          zoom = zoom + 0.025;
        } else if (dist < prevDist && zoom > 0.25) {
          zoom = zoom - 0.025;
        }
        docContent.style.transform = `scale(${zoom})`;
        // console.log("touchmove zooming", zoom);
      }
    },
    { passive: false }
  );
  docContent.addEventListener("touchend", e => {
    if (scaling) {
      e.preventDefault();
      scaling = false;
    }
  });
}
