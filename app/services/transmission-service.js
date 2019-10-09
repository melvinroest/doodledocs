import Service from "@ember/service";
import Bugout from "bugout";
const TRANSMISSIONMODE = Object.freeze({ P2P: "p2p", SERVER: "server" });

function initBugout() {
  let swarmId = "doodledocs"; //type in your own swarmId for it to work
  let b = new Bugout(swarmId);
  b.on("seen", address => {
    let p = document.createElement("p");
    p.innerHTML = `Bugout address ${address} connected`;
    document.getElementById("content").append(p);
  });
  return b;
}

export default Service.extend({
  TRANSMISSIONMODE,

  init(transmissionSetting) {
    this._super(...arguments);
    this.transmissionSetting = transmissionSetting;
    if (!this.transmissionSetting) {
      this.transmissionMode = TRANSMISSIONMODE.P2P;
    }

    if (this.transmissionSetting === TRANSMISSIONMODE.P2P) {
      this.transmissionInstance = initBugout();
    } else if (this.transmissionSetting === TRANSMISSIONMODE.SERVER) {
      //sockets
    }
  },
  send(data) {
    if (this.transmissionSetting === TRANSMISSIONMODE.P2P) {
      this.transmissionInstance.send(data);
    } else if (this.transmissionSetting === TRANSMISSIONMODE.SERVER) {
      //sockets
    }
  },
  onMessage(cb) {
    if (this.transmissionSetting === TRANSMISSIONMODE.P2P) {
      this.transmissionInstance.on("message", (address, data) => {
        if (address !== this.transmissionInstance.addr) {
          cb(data, address);
        }
      });
    } else if (this.transmissionSetting === TRANSMISSIONMODE.SERVER) {
      //sockets
    }
  }
});
