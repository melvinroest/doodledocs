import Route from "@ember/routing/route";

function randomString(length, chars) {
  var mask = "";
  if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
  if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (chars.indexOf("#") > -1) mask += "0123456789";
  if (chars.indexOf("!") > -1) mask += "-_";
  var result = "";
  for (var i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

export default Route.extend({
  model() {
    let data = [
      {
        caption: "Made with laptop (no pressure sensitivity)",
        image: "/ex1.png"
      },
      {
        caption: "Collaborative Quick sketch with iPad",
        image: "/ex2.png"
      },
      {
        caption: "Collaborative drawing with iPad",
        image: "/ex3.png"
      },
      {
        caption: "Solo drawing with iPad, no pressure sensitivity",
        image: "/ex4.png"
      },
      {
        caption: "Solo drawing with iPad with pressure sensitivity",
        image: "/ex5.png"
      }
    ];
    let result = [];
    // pick 3 random array elements and return it
    for (let i = 0; i < 3; i++) {
      let randomIndex = [Math.floor(Math.random() * data.length)];
      result.push(data.splice(randomIndex, 1)[0]);
    }
    return {
      examples: result,
      randomURL: `dd:${randomString(8, "aA#!")}`
    };
  }
});
