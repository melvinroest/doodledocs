import { helper } from "@ember/component/helper";

export function websiteValidation(params) {
  if (params.length > 1) {
    console.log(new Error("length of your arguments should be 1"));
    return;
  }
  if (params[0] === "") {
    //empty string is fine
    return params;
  }
  const a = document.createElement("a");
  a.href = params;
  if (a.host && a.host != window.location.host) {
    return params;
  } else {
    console.log(new Error("invalid URL"));
    return;
  }
}

export default helper(websiteValidation);
