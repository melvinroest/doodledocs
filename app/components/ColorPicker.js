// import Pickr from "@simonwep/pickr/dist/pickr.es5.min";
import Pickr from "@simonwep/pickr";

// function needed in order to patch the library
const on = eventListener.bind(null, "addEventListener");

// function needed in order to patch the library
function eventListener(method, elements, events, fn, options = {}) {
  // Normalize array
  if (elements instanceof HTMLCollection || elements instanceof NodeList) {
    elements = Array.from(elements);
  } else if (!Array.isArray(elements)) {
    elements = [elements];
  }

  if (!Array.isArray(events)) {
    events = [events];
  }

  for (const el of elements) {
    for (const ev of events) {
      el[method](ev, fn, { capture: false, ...options });
    }
  }

  return Array.prototype.slice.call(arguments, 1);
}

export default class ColorPicker {
  constructor(newElement, color) {
    this.newElement = newElement;
    const pickr = new Pickr({
      el: newElement,
      // Where the pickr-app should be added as child.
      // container: "body",
      // Default color
      default: color,
      theme: "nano",
      lockOpacity: false,
      // Custom class which gets added to the pcr-app. Can be used to apply custom styles.
      appClass: "color-picker",
      // Don't replace 'el' Element with the pickr-button, instead use 'el' as a button.
      // If true, appendToBody will also be automatically true.
      useAsButton: false,
      // Size of gap between pickr (widget) and the corresponding reference (button) in px
      padding: 4,
      // If true pickr won't be floating, and instead will append after the in el resolved element.
      // It's possible to hide it via .hide() anyway.
      inline: false,
      // If true, pickr will be repositioned automatically on page scroll or window resize.
      // Can be set to false to make custom positioning easier.
      autoReposition: true,
      // Defines the direction in which the knobs of hue and opacity can be moved.
      // 'v' => opacity- and hue-slider can both only moved vertically.
      // 'hv' => opacity-slider can be moved horizontally and hue-slider vertically.
      // Can be used to apply custom layouts
      sliders: "h",
      // Start state. If true 'disabled' will be added to the button's classlist.
      disabled: false,
      // Precision of output string (only effective if components.interaction.input is true)
      outputPrecision: 0,
      // If set to false it would directly apply the selected color on the button and preview.
      comparison: false,
      // Optional color swatches. When null, swatches are disabled.
      // Types are all those which can be produced by pickr e.g. hex(a), hsv(a), hsl(a), rgb(a), cmyk, and also CSS color names like 'magenta'.
      // Example: swatches: ['#F44336', '#E91E63', '#9C27B0', '#673AB7'],
      swatches: null,
      // Default color representation of the input/output textbox.
      // Valid options are `HEX`, `RGBA`, `HSVA`, `HSLA` and `CMYK`.
      defaultRepresentation: "HEX",
      // Option to keep the color picker always visible.
      // You can still hide / show it via 'pickr.hide()' and 'pickr.show()'.
      // The save button keeps its functionality, so still fires the onSave event when clicked.
      showAlways: false,
      // Close pickr with a keypress.
      // Default is 'Escape'. Can be the event key or code.
      // (see: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
      closeWithKey: "Escape",
      // Defines the position of the color-picker.
      // Any combinations of top, left, bottom or right with one of these optional modifiers: start, middle, end
      // Examples: top-start / right-end
      // If clipping occurs, the color picker will automatically choose its position.
      position: "bottom-middle",
      // Enables the ability to change numbers in an input field with the scroll-wheel.
      // To use it set the cursor on a position where a number is and scroll, use ctrl to make steps of five
      adjustableNumbers: true,

      // Show or hide specific components.
      // By default only the palette (and the save button) is visible.
      components: {
        // Defines if the palette itself should be visible.
        // Will be overwritten with true if preview, opacity or hue are true
        // palette: true,
        preview: true, // Display comparison between previous state and new color
        opacity: true, // Display opacity slider
        hue: true, // Display hue slider

        // show or hide components on the bottom interaction bar.
        interaction: {
          hex: false, // Display 'input/output format as hex' button  (hexadecimal representation of the rgba value)
          rgba: false, // Display 'input/output format as rgba' button (red green blue and alpha)
          hsla: false, // Display 'input/output format as hsla' button (hue saturation lightness and alpha)
          hsva: false, // Display 'input/output format as hsva' button (hue saturation value and alpha)
          cmyk: false, // Display 'input/output format as cmyk' button (cyan mangenta yellow key )
          input: false, // Display input/output textbox which shows the selected color value.
          // the format of the input is determined by defaultRepresentation,
          // and can be changed by the user with the buttons set by hex, rgba, hsla, etc (above).
          cancel: false, // Display Cancel Button, resets the color to the previous state
          clear: false, // Display Clear Button; same as cancel, but keeps the window open
          save: false // Display Save Button,
        },
        // Button strings, brings the possibility to use a language other than English.
        strings: {
          save: "Save", // Default for save button
          clear: "Clear", // Default for clear button
          cancel: "Cancel" // Default for cancel button
        }
      }
    });

    // event listeners
    // pickr
    //   .on("init", instance => {
    //     console.log("init", instance);
    //   })
    //   .on("hide", instance => {
    //     console.log("hide", instance);
    //   })
    //   .on("show", (color, instance) => {
    //     console.log("show", color, instance);
    //   })
    //   .on("save", (color, instance) => {
    //     console.log("save", color, instance);
    //   })
    //   .on("clear", instance => {
    //     console.log("clear", instance);
    //   })
    //   .on("change", (color, instance) => {
    //     console.log("change", color, instance);
    //   })
    //   .on("changestop", instance => {
    //     console.log("changestop", instance);
    //   })
    //   .on("cancel", instance => {
    //     console.log("cancel", instance);
    //   })
    //   .on("swatchselect", (color, instance) => {
    //     console.log("swatchselect", color, instance);
    //   });

    console.log("pickr", pickr);
    pickr._eventBindings.push(
      on(pickr._root.button, "pointerdown", () => {
        this.isOpen() ? this.hide() : this.show();
      })
    );

    this.pickr = pickr;
    return pickr;
  }

  //copying some of the functions in order to use it here
  /**
   * Hides the color-picker ui.
   */
  hide() {
    console.log("hide", this);
    this.pickr._root.app.classList.remove("visible");
    this.pickr._emit("hide", this);
    return this;
  }

  /**
   * Shows the color-picker ui.
   */
  show() {
    console.log("show", this);
    this.pickr._root.app.classList.add("visible");
    this.pickr._rePositioningPicker();
    this.pickr._emit("show", this);
    return this;
  }

  /**
   * @return {boolean} If the color picker is currently open
   */
  isOpen() {
    console.log(this);
    return this.pickr._root.app.classList.contains("visible");
  }
}
