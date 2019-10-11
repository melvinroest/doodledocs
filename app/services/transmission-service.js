import Service from "@ember/service";
import Bugout from "bugout";
const TRANSMISSIONMODE = Object.freeze({ P2P: "P2P", SERVER: "SERVER" });

function initBugout() {
  let swarmId = `dd:${window.location.pathname.split("dd:")[1]}`; //type in your own swarmId for it to work
  let b = new Bugout(swarmId);
  b.on("seen", address => {
    let p = document.createElement("p");
    p.innerHTML = `Bugout address ${address} connected`;
    document.getElementById("content").append(p);
  });
  return b;
}

function constructDataMessage(channel, method, data, urlPath) {
  const message = {
    command: "message",
    identifier: {
      channel: channel,
      urlPath
    },
    data: {
      action: method,
      args: data
    }
  };
  return createMessage(message);
}

function createMessage(message) {
  let entries = Object.entries(message);
  for (let i = 0; i < entries.length; i++) {
    let key = entries[i][0];
    let value = entries[i][1];
    if (key !== "command") {
      message[key] = JSON.stringify(value);
    }
  }
  // console.log(JSON.stringify(message));
  return JSON.stringify(message);
}

function initSocket(host) {
  let socket = new WebSocket(host);
  socket.onopen = event => {
    socket.send(
      createMessage({
        command: "subscribe",
        identifier: {
          channel: "MessageChannel",
          urlPath: `dd:${window.location.pathname.split("dd:")[1]}`
        }
      })
    );
    // socket.send(constructDataMessage("MessageChannel", "ping", "HELLO WORLD!"));
  };
  return socket;
}

export default Service.extend({
  TRANSMISSIONMODE,

  send(data) {
    if (this.transmissionSetting === TRANSMISSIONMODE.P2P) {
      this.transmissionInstance.send(data);
    } else if (this.transmissionSetting === TRANSMISSIONMODE.SERVER) {
      const message = constructDataMessage(
        "MessageChannel",
        "broadcastData",
        data,
        `dd:${window.location.pathname.split("dd:")[1]}`
      );
      this.transmissionInstance.send(message);
    }
  },
  onReceivingMessage(cb) {
    if (this.transmissionSetting === TRANSMISSIONMODE.P2P) {
      let bugoutInstance = this.transmissionInstance;
      bugoutInstance.on("message", (address, data) => {
        if (address !== this.transmissionInstance.addr) {
          cb(data, address);
        }
      });
    } else if (this.transmissionSetting === TRANSMISSIONMODE.SERVER) {
      let socket = this.transmissionInstance;
      socket.onmessage = data => {
        const parsedData = JSON.parse(data.data);
        if (
          parsedData.type !== "ping" &&
          parsedData.type !== "welcome" &&
          parsedData.type !== "confirm_subscription"
        ) {
          cb(parsedData.message.args);
        }
      };
    }
  },
  startService(transmissionSetting) {
    this.transmissionSetting = transmissionSetting || TRANSMISSIONMODE.P2P;

    //debug
    // this.transmissionSetting = TRANSMISSIONMODE.P2P;

    if (this.transmissionSetting === TRANSMISSIONMODE.P2P) {
      this.transmissionInstance = initBugout();
    } else if (this.transmissionSetting === TRANSMISSIONMODE.SERVER) {
      let host = "ws://localhost:8888/websocket"; //need to put this into an env file
      this.transmissionInstance = initSocket(host);
    }

    this.start = true;
  },
  init() {
    this._super(...arguments);
    this.transmissionSetting = undefined;
  }
});
