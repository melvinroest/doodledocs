import Component from "@ember/component";

export default Component.extend({
  tagName: "iframe",
  didRender() {
    if (this.src) {
      this.src = typeof this.src === "string" ? this.src : this.src[0];
      this.load(this.src); //load in src URL of iframe
      // on subsequent page requests, the iframe will be "this", so I am hooking up all the functions it needs to know
      this.element.load = this.load;
      this.element.fetchProxy = this.fetchProxy;
      this.src = "";
      // all except allow-top-navigation
      this.sandbox =
        "" + this.sandbox ||
        "allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation";
    }
  },
  load(url, options) {
    const element = this.element ? this.element : this;
    console.log("url", url);
    if (url === "") {
      //empty url is fine
      element.srcdoc = "";
      return;
    }
    if (!url || !url.startsWith("http")) {
      throw new Error(
        `X-Frame-Bypass src ${url} does not start with http(s)://`
      );
    }
    console.log("X-Frame-Bypass loading:", url);
    const html = `
      <html>
        <head>
          <style>
          .loader {
            position: absolute;
            top: calc(20% - 25px);
            left: calc(50% - 25px);
            width: 50px;
            height: 50px;
            background-color: #333;
            border-radius: 50%;  
            animation: loader 1s infinite ease-in-out;
            z-index: 1000;
          }
          @keyframes loader {
            0% {
            transform: scale(0);
            }
            100% {
            transform: scale(1);
            opacity: 0;
            }
          }
          </style>
        </head>
        <body>
          <div class="loader"></div>
        </body>
      </html>
      `;
    element.srcdoc = html;
    this.fetchProxy(url, options, 0)
      .then(async res => {
        const resBlob = await res.clone().blob();
        const resText = await res.clone().text();
        const type = resBlob.type.split("/")[0];
        const subType = resBlob.type.split("/")[1];
        let result = undefined;
        switch (type) {
          case "image":
            result = {
              content: resBlob,
              type,
              subType
            };
            break;
          case "video":
            result = {
              content: resBlob,
              type,
              subType
            };
            break;
          case "text":
            result = {
              content: resText,
              type,
              subType
            };
            if (subType === "json") {
              result = {
                content: res.clone().json(),
                type,
                subType
              };
            }
            break;
          default:
            break;
        }
        return result;
      })
      .then(data => {
        console.log("fetch proxy initiated", data);
        if (data) {
          const element = this.element ? this.element : this;
          if (data.subType === "html") {
            const regex = /<head([^>]*)>/i;
            const html = `
          <head$1>
            <base href="${url}">
            <script>
              // X-Frame-Bypass navigation event handlers
              document.addEventListener('click', e => {
                if (frameElement && document.activeElement && document.activeElement.href) {
                  e.preventDefault()
                  frameElement.load(document.activeElement.href)
                }
              })
              document.addEventListener('submit', e => {
                if (frameElement && document.activeElement && document.activeElement.form && document.activeElement.form.action) {
                  e.preventDefault()
                  if (document.activeElement.form.method === 'post')
                    frameElement.load(document.activeElement.form.action, {method: 'post', body: new FormData(document.activeElement.form)})
                  else
                    frameElement.load(document.activeElement.form.action + '?' + new URLSearchParams(new FormData(document.activeElement.form)))
                }
              })
            </script>
            `;
            data.content = data.content.replace(regex, html);
            element.srcdoc = data.content;
          }
          if (data.type === "image") {
            // const myImage = document.createElement("img");
            // myImage.src = url;
            // data.content = myImage;
            // element.appendChild(myImage);
            element.srcdoc = `<img src="${url}">`;
          }
        }
      })
      .catch(e => console.error("Cannot load X-Frame-Bypass:", e));
  },
  fetchProxy(url, options, i) {
    const proxy = [
      "https://cors-anywhere.herokuapp.com/",
      "https://jsonp.afeld.me/?url=",
      "https://cors.io/?"
    ];
    return fetch(proxy[i] + url, options)
      .then(res => {
        console.log("fetch completed");
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res;
      })
      .catch(error => {
        console.log("fetch completed in catch", error);
        if (i === proxy.length - 1) {
          throw error;
        }
        return this.fetchProxy(url, options, i + 1);
      });
  }
});
