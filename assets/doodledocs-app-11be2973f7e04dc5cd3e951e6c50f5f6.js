"use strict"
define("doodledocs-app/app",["exports","doodledocs-app/resolver","ember-load-initializers","doodledocs-app/config/environment"],function(e,t,o,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,o.default)(a,n.default.modulePrefix)
var i=a
e.default=i}),define("doodledocs-app/components/Pencil",["exports","doodledocs-app/components/draw-engine"],function(e,t){function o(e,t){for(var o=0;o<t.length;o++){var n=t[o]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=function(){function e(t,o,n,a,i,r){(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),this.started=!1,this.pencilColor=t,this.pencilThickness=o,this.context=n,this.canvas=a,this.hudContext=i,this.transmissionSerice=r,this.mode="pencil"}var n,a,i
return n=e,(a=[{key:"startDraw",value:function(e){this.started=!0,this.lastX=e._x-e.target.offsetLeft,this.lastY=e._y-e.target.offsetTop}},{key:"duringDraw",value:function(e){if(this.started){var o={e:e,lastX:this.lastX,lastY:this.lastY,pencilColor:this.pencilColor,context:this.context,pencilThickness:this.pencilThickness,isMakingOwnChanges:!0,transmissionService:this.transmissionSerice,mode:"pencil"===this.mode?"fill":"clear"},n=t.bresenhamsLineAlgorithm.call(this,o)
this.lastX=n.lastX,this.lastY=n.lastY,(0,t.drawHud)(this.hudContext,this.canvas,this.pencilThickness,e._x,e._y)}}},{key:"endDraw",value:function(e){this.started&&(this.started=!1)}}])&&o(n.prototype,a),i&&o(n,i),e}()
e.default=n}),define("doodledocs-app/components/doodledoc",["exports","scroll-lock","doodledocs-app/components/draw-engine"],function(e,t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Component.extend({transmissionService:Ember.computed(function(){return Ember.getOwner(this).lookup("service:transmission-service")}),attributeBindings:["style"],style:"position: absolute; z-index: 99; height: 100vh; width: 100%; pointer-events: none;",didRender:function(){if(this._super.apply(this,arguments),(0,t.disablePageScroll)(),2===this.element.children.length&&"CANVAS"===this.element.children[0].nodeName&&"CANVAS"===this.element.children[1].nodeName){var e=this.element.children[0],n=this.element.children[1],a=this.get("transmissionService")
a.startService(a.TRANSMISSIONMODE.P2P),o.default.call(this,e,n,a)
var i=this._target,r=this.get("element")
"browse"===i.m?r.style.pointerEvents="none":r.style.pointerEvents="auto"}},willDestroyElement:function(){(0,t.enablePageScroll)(),this._super.apply(this,arguments)}})
e.default=n}),define("doodledocs-app/components/draw-engine",["exports","pressure","doodledocs-app/components/Pencil"],function(e,t,o){function n(e){return e.offsetX||0==e.offsetX?(e._x=e.offsetX,e._y=e.offsetY):(e.layerX||0==e.layerX)&&(e._x=e.layerX,e._y=e.layerY),e}function a(e,t,o,n,a){e.clearRect(0,0,t.width,t.height),e.strokeStyle="#f00",e.lineWidth=1,e.beginPath()
var i=o/2
e.rect(n-i,a-i,o,o),e.stroke()}function i(e){var t=e.e,o=e.lastX,n=e.lastY,a=e.pencilColor,i=e.context,d=e.pencilThickness,s=e.isMakingOwnChanges,l=e.transmissionService,u=e.mode
i.fillStyle=a
var c=t._x,p=t._y,f=c,m=o,h=p,v=n,b=void 0,g=void 0,y=Math.abs(v-h)>=Math.abs(m-f)
y&&(b=f,f=h,h=b,g=v,v=m,m=g),f>=m&&(b=f,f=m,m=b,g=h,h=v,v=g)
var x=m-f,w=0,_=Math.abs(v-h)/x,P=-1
if(g=h,h<=v&&(P=1),s){var O={e:{_x:t._x,_y:t._y,userForce:t.userForce},lastX:o,lastY:n,pencilColor:a,pencilThickness:d,mode:u}
l.send(O)}for(var M=(d+=8*t.userForce)/2,E=function(e,t,o,n,a,i){if(Math.abs(t-o)+Math.abs(a-i)>400)return!1
return!0}(0,f,m,0,h,v),j=f;j<m;j++)E&&(y?r(i,g-M,j-M,d,u):r(i,j-M,g-M,d,u)),(w+=_)>=.5&&(g+=P,w-=1)
return{lastX:o=c,lastY:n=p}}function r(e,t,o,n,a){"fill"===a?e.fillRect(t,o,n,n):"clear"===a?e.clearRect(t,o,n,n):e.fillRect(t,o,n,n)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(e,r,d){var s=this,l=r.getContext("2d")
r.style.width="100%",r.style.height="100%",r.width=r.offsetWidth,r.height=r.offsetHeight,l.clearRect(0,0,r.width,r.height)
var u=e.getContext("2d")
e.style.width="100%",e.style.height="100%",e.width=r.offsetWidth,e.height=r.offsetHeight,u.clearRect(0,0,r.width,r.height)
var c=new o.default("rgba(0, 0, 0, 0.33)",1,l,r,u,d);["click","touchstart"].forEach(function(e){document.getElementById("pencil").addEventListener(e,function(e){c.pencilThickness=1,c.pencilColor="rgba(0, 0, 0, 0.33)",c.mode="pencil"})}),["click","touchstart"].forEach(function(e){document.getElementById("eraser").addEventListener(e,function(e){c.pencilThickness=20,c.pencilColor="#FFFBEB",c.mode="eraser"})}),["click","touchstart"].forEach(function(e){document.getElementById("download").addEventListener(e,function(e){var t=document.createElement("canvas"),o=t.getContext("2d")
t.width=r.width,t.height=r.height,o.drawImage(r,0,0),o.fillStyle="#000",o.font="32px Roboto Mono",o.fillText("doodledocs.com",10,50)
var n=document.createElement("a")
n.download="drawing.png",n.href=t.toDataURL(),n.click()})}),["click","touchstart"].forEach(function(e){document.getElementById("share").addEventListener(e,function(e){var t=document.createElement("input"),o=window.location.href
document.body.appendChild(t),t.value=o,t.select(),document.execCommand("copy"),document.body.removeChild(t),alert("URL copied, you can share it with your friends and they'll be able to draw as well")})}),d.onReceivingMessage(function(e,t){e.e&&function(e,t,o,n){e.context=t,e.isMakingOwnChanges=!1,e.b=void 0,i(e),a(n,o,e.pencilThickness,e.e._x,e.e._y)}(e,l,r,u)})
var p={start:function(e){e=n.call(s,e),c.startDraw(e)},startDeepPress:function(e){e=n.call(s,e),c.startDraw(e)},change:function(e,t){t.userForce=e,t=n.call(s,t),c.duringDraw(t)},end:function(){var e={}
e=n.call(s,e),c.endDraw(e)},endDeepPress:function(){var e={}
e=n.call(s,e),c.endDraw(e)},unsupported:function(){s.innerHTML="Your device / browser does not support this :("}}
t.default.set(r,p)},e.drawHud=a,e.bresenhamsLineAlgorithm=i}),define("doodledocs-app/components/example-image",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({})
e.default=t}),define("doodledocs-app/controllers/app/doc",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({w:"",m:"draw",queryParams:[{w:{type:"string"},m:{type:"string"},l:{type:"boolean"}}]})
e.default=t}),define("doodledocs-app/helpers/app-version",["exports","doodledocs-app/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,o){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.default.APP.version,i=n.versionOnly||n.hideSha,r=n.shaOnly||n.hideVersion,d=null
return i&&(n.showExtended&&(d=a.match(o.versionExtendedRegExp)),d||(d=a.match(o.versionRegExp))),r&&(d=a.match(o.shaRegExp)),d?d[0]:a}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var a=Ember.Helper.helper(n)
e.default=a}),define("doodledocs-app/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=t.default
e.default=o}),define("doodledocs-app/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=t.default
e.default=o}),define("doodledocs-app/helpers/website-validation",["exports"],function(e){function t(e){if(!(e.length>1)){var t=document.createElement("a")
return t.href=e,t.host&&t.host!=window.location.host?e:void console.log(new Error("invalid URL"))}console.log(new Error("length of your arguments should be 1"))}Object.defineProperty(e,"__esModule",{value:!0}),e.websiteValidation=t,e.default=void 0
var o=Ember.Helper.helper(t)
e.default=o}),define("doodledocs-app/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","doodledocs-app/config/environment"],function(e,t,o){var n,a
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,o.default.APP&&(n=o.default.APP.name,a=o.default.APP.version)
var i={name:"App Version",initialize:(0,t.default)(n,a)}
e.default=i}),define("doodledocs-app/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=o}),define("doodledocs-app/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n}),define("doodledocs-app/initializers/export-application-global",["exports","doodledocs-app/config/environment"],function(e,t){function o(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var o
if("undefined"!=typeof window)o=window
else if("undefined"!=typeof global)o=global
else{if("undefined"==typeof self)return
o=self}var n,a=t.default.exportApplicationGlobal
n="string"==typeof a?a:Ember.String.classify(t.default.modulePrefix),o[n]||(o[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete o[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=o,e.default=void 0
var n={name:"export-application-global",initialize:o}
e.default=n}),define("doodledocs-app/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o={name:"ember-data",initialize:t.default}
e.default=o}),define("doodledocs-app/integrations/base",["exports","ember-cli-analytics/integrations/base"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/integrations/bing",["exports","ember-cli-analytics/integrations/bing"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/integrations/facebook",["exports","ember-cli-analytics/integrations/facebook"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/integrations/google-adwords",["exports","ember-cli-analytics/integrations/google-adwords"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/integrations/google-analytics",["exports","ember-cli-analytics/integrations/google-analytics"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/integrations/mixpanel",["exports","ember-cli-analytics/integrations/mixpanel"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/integrations/optimizely",["exports","ember-cli-analytics/integrations/optimizely"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=t.default
e.default=o}),define("doodledocs-app/router",["exports","ember-cli-analytics/mixins/trackable","doodledocs-app/config/environment"],function(e,t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend(t.default,{location:o.default.locationType,rootURL:o.default.rootURL})
n.map(function(){this.route("site",function(){this.route("home"),this.route("faq")}),this.route("app",function(){this.route("doc",{path:"/:random_url"})})})
var a=n
e.default=a}),define("doodledocs-app/routes/app",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("doodledocs-app/routes/app/doc",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("doodledocs-app/routes/app/public",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({templateName:"app/doc"})
e.default=t}),define("doodledocs-app/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({redirect:function(){this.transitionTo("site.home")}})
e.default=t}),define("doodledocs-app/routes/site/faq",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("doodledocs-app/routes/site/home",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){for(var e=[{caption:"Made with laptop (no pressure sensitivity)",image:"ex1-2c68589e386227152b68bb0f8dfddb1a.png"},{caption:"Collaborative Quick sketch with iPad",image:"ex2-eb3c2656e2f66bd6815fb94effac0001.png"},{caption:"Collaborative drawing with iPad",image:"ex3-7c7be9499e8db2b9d5284425d91d5a64.png"},{caption:"Solo drawing with iPad, no pressure sensitivity",image:"ex4-24e20e514457ed05d9e8d60d0a1b1b2d.png"},{caption:"Solo drawing with iPad with pressure sensitivity",image:"ex5-ae49925dc8ee3cad8c67372b883a7763.png"}],t=[],o=0;o<3;o++){var n=[Math.floor(Math.random()*e.length)]
t.push(e.splice(n,1)[0])}var a="dd:".concat(function(e,t){var o=""
t.indexOf("a")>-1&&(o+="abcdefghijklmnopqrstuvwxyz"),t.indexOf("A")>-1&&(o+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"),t.indexOf("#")>-1&&(o+="0123456789"),t.indexOf("!")>-1&&(o+="-_")
for(var n="",a=e;a>0;--a)n+=o[Math.floor(Math.random()*o.length)]
return n}(8,"aA#!"))
return{examples:t,randomURL:a}}})
e.default=t})
define("doodledocs-app/routes/site/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("doodledocs-app/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/services/analytics",["exports","ember-cli-analytics/services/analytics","doodledocs-app/config/environment"],function(e,t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.extend({config:o.default})
e.default=n}),define("doodledocs-app/services/transmission-service",["exports","bugout","doodledocs-app/config/environment"],function(e,t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Object.freeze({P2P:"P2P",SERVER:"SERVER"})
function a(e){for(var t=Object.entries(e),o=0;o<t.length;o++){var n=t[o][0],a=t[o][1]
"command"!==n&&(e[n]=JSON.stringify(a))}return JSON.stringify(e)}var i=Ember.Service.extend({TRANSMISSIONMODE:n,send:function(e){if(this.transmissionSetting===n.P2P)this.transmissionInstance.send(e)
else if(this.transmissionSetting===n.SERVER){var t=function(e,t,o,n){return a({command:"message",identifier:{channel:e,urlPath:n},data:{action:t,args:o}})}("MessageChannel","broadcastData",e,"dd:".concat(window.location.pathname.split("dd:")[1]))
this.transmissionInstance.send(t)}},onReceivingMessage:function(e){var t=this
if(this.transmissionSetting===n.P2P)this.transmissionInstance.on("message",function(o,n){o!==t.transmissionInstance.addr&&e(n,o)})
else if(this.transmissionSetting===n.SERVER){this.transmissionInstance.onmessage=function(t){var o=JSON.parse(t.data)
"ping"!==o.type&&"welcome"!==o.type&&"confirm_subscription"!==o.type&&e(o.message.args)}}},startService:function(e){if(this.transmissionSetting=e||n.P2P,this.transmissionSetting===n.P2P)this.transmissionInstance=(o="dd:".concat(window.location.pathname.split("dd:")[1]),new t.default(o))
else if(this.transmissionSetting===n.SERVER){this.transmissionInstance=function(e){var t=new WebSocket(e)
return t.onopen=function(e){t.send(a({command:"subscribe",identifier:{channel:"MessageChannel",urlPath:"dd:".concat(window.location.pathname.split("dd:")[1])}}))},t}("ws://localhost:8888/websocket")}var o
this.start=!0},init:function(){this._super.apply(this,arguments),this.transmissionSetting=void 0}})
e.default=i}),define("doodledocs-app/templates/app",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"yhuWx52n",block:'{"symbols":[],"statements":[[7,"main",true],[8],[0,"\\n  "],[7,"header",true],[8],[0,"\\n    "],[7,"img",true],[11,"src",[29,[[23,0,["target","location","rootURL"]],"doodle docs big logo-6bcec9aebf8fe226c0dee202ee53a3d4.png"]]],[8],[9],[0,"\\n    "],[7,"span",true],[8],[0,"Options: "],[7,"a",true],[10,"id","download"],[10,"href","#using-download"],[8],[0,"Download"],[9],[0," | "],[7,"a",true],[10,"id","share"],[10,"href","#using-share"],[8],[0,"Share"],[9],[9],[0,"\\n    "],[7,"br",true],[8],[9],[0,"\\n    "],[7,"span",true],[8],[0,"Palette: "],[7,"a",true],[10,"id","pencil"],[10,"href","#using-pencil"],[8],[0,"pencil"],[9],[0," | "],[7,"a",true],[10,"id","eraser"],[10,"href","#using-eraser"],[8],[0,"Eraser"],[9],[9],[0,"\\n    "],[7,"nav",true],[8],[0,"\\n      "],[4,"link-to",null,[["class","route"],["button","site.home"]],{"statements":[[0,"Home"]],"parameters":[]},null],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[1,[22,"outlet"],false],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/app.hbs"}})
e.default=t}),define("doodledocs-app/templates/app/doc",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"yPgYZTdV",block:'{"symbols":[],"statements":[[1,[28,"log",[[23,0,[]]],null],false],[0,"\\n\\n"],[7,"div",true],[8],[0,"\\n  "],[5,"doodledoc",[],[[],[]]],[0,"\\n  "],[7,"iframe",true],[10,"id","iframed-page"],[10,"style","position: absolute;  height: 100vh; z-index: 90; width: 100%; pointer-events: auto; background-color: #FFFBEB; border: 0;"],[11,"src",[28,"website-validation",[[24,["w"]]],null]],[8],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/app/doc.hbs"}})
e.default=t}),define("doodledocs-app/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"ICM7Nu02",block:'{"symbols":[],"statements":[[7,"div",true],[10,"id","page-container"],[8],[0,"\\n  "],[1,[22,"outlet"],false],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/application.hbs"}})
e.default=t}),define("doodledocs-app/templates/components/doodledoc",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"WdfOyGti",block:'{"symbols":[],"statements":[[7,"canvas",true],[10,"id","hud"],[10,"style","position: absolute; left: 0; top: 0; z-index: 2; pointer-events:none;"],[8],[9],[0,"\\n"],[7,"canvas",true],[10,"id","imageView"],[10,"style","position: absolute; left: 0; top: 0; z-index: 1"],[8],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/components/doodledoc.hbs"}})
e.default=t}),define("doodledocs-app/templates/components/example-image",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"ZJObVGGT",block:'{"symbols":["&default"],"statements":[[7,"div",true],[10,"class","example col3"],[8],[0,"\\n  "],[14,1],[0," "],[0,"\\n  "],[7,"p",true],[8],[1,[23,0,["caption"]],false],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/components/example-image.hbs"}})
e.default=t}),define("doodledocs-app/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"ASYvSUaT",block:'{"symbols":[],"statements":[[1,[22,"outlet"],false]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/index.hbs"}})
e.default=t}),define("doodledocs-app/templates/public",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"bhyA/Vta",block:'{"symbols":[],"statements":[[1,[22,"outlet"],false]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/public.hbs"}})
e.default=t}),define("doodledocs-app/templates/site",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"lLSK9MIP",block:'{"symbols":[],"statements":[[7,"main",true],[8],[0,"\\n  "],[7,"header",true],[8],[0,"\\n    "],[7,"img",true],[11,"src",[29,[[23,0,["target","location","rootURL"]],"doodle docs big logo-6bcec9aebf8fe226c0dee202ee53a3d4.png"]]],[8],[9],[0,"\\n    "],[7,"span",true],[8],[0,"Early Alpha"],[9],[0,"\\n    "],[7,"nav",true],[8],[0,"\\n      "],[4,"link-to",null,[["class","route"],["button","site.home"]],{"statements":[[0,"Home"]],"parameters":[]},null],[0,"\\n      |\\n      "],[4,"link-to",null,[["class","route"],["button","site.faq"]],{"statements":[[0,"FAQ"]],"parameters":[]},null],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[1,[22,"outlet"],false],[0,"\\n"],[9],[0,"\\n"],[7,"footer",true],[8],[0,"\\n  "],[7,"p",true],[8],[0,"Made with ❤️ by "],[7,"img",true],[11,"src",[29,[[23,0,["target","location","rootURL"]],"melvin-ee3f7ccd58c4fb11c456e6b033049fea.png"]]],[8],[9],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/site.hbs"}})
e.default=t}),define("doodledocs-app/templates/site/faq",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"p8KMaxSC",block:'{"symbols":[],"statements":[[7,"section",true],[10,"class","grid-container grid-clearfix"],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"FAQ"],[9],[0,"\\n  "],[7,"h2",true],[8],[0,"Why does this exist?"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"I couldn\'t find a drawing web app that respects a pressure sensitive stylus. So I decided to create my own."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"Why are there so many features missing?"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"I try to keep it simple."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"I have an idea for a feature!"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"Great! Let me know, you can email me at mettamage at protonmail dot com."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"How can I draw with my friends?"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"Open op a Doodle Document and share the link with your friend. When they click on the link you shared, they\'ll be\\n    in the same Doodle Doc."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"How do I know whether my friend and I see the same thing?"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"If you see someone else doodling that\'s how you know! What helps is that you text or talk to your friend while\\n    having this web app open."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"How do I save my work"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"I\'m working on that feature still. For now, a screenshot? 😇"],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"I lost my work upon refresh"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"There is no saving functionality built-in yet."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"I have another question!"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"Contact me somehow! I leave it up to you to figure it out ;-)"],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/site/faq.hbs"}})
e.default=t}),define("doodledocs-app/templates/site/home",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"kbhnpqGf",block:'{"symbols":["example"],"statements":[[7,"section",true],[10,"class","grid-container grid-clearfix"],[8],[0,"\\n  "],[7,"div",true],[10,"class","col2"],[8],[0,"\\n    "],[7,"h1",true],[8],[0,"Draw together on the web"],[9],[0,"\\n    "],[7,"p",true],[8],[0,"Doodle Docs allows you to sketch and collaborate with your pressure sensitive stylus-powered tablet or your\\n      laptop."],[9],[0,"\\n    "],[7,"button",true],[8],[0,"\\n"],[4,"link-to",null,[["class","route","model"],["button","app.doc",[23,0,["model","randomURL"]]]],{"statements":[[0,"      "],[7,"div",true],[8],[0,"\\n        "],[7,"img",true],[11,"src",[29,[[23,0,["target","location","rootURL"]],"doodle docs logo-80bf0f6f1eede51b54e579aaca4b0824.png"]]],[8],[9],[0,"\\n        "],[7,"div",true],[8],[0,"Open New Doodle Doc"],[7,"span",true],[8],[0,"(And share the link with friends)"],[9],[9],[0,"\\n      "],[9],[0,"\\n"]],"parameters":[]},null],[0,"    "],[9],[0,"\\n    "],[7,"br",true],[8],[9],[0,"\\n    "],[7,"button",true],[8],[0,"\\n"],[4,"link-to",null,[["class","route","model"],["button","app.doc","public"]],{"statements":[[0,"      "],[7,"div",true],[8],[0,"\\n        "],[7,"img",true],[11,"src",[29,[[23,0,["target","location","rootURL"]],"doodle docs logo-80bf0f6f1eede51b54e579aaca4b0824.png"]]],[8],[9],[0,"\\n        "],[7,"div",true],[8],[0,"Open Public Doodle Doc"],[7,"span",true],[8],[0,"(And meet someone new! Everyone can draw here)"],[9],[9],[0,"\\n      "],[9],[0,"\\n"]],"parameters":[]},null],[0,"    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[7,"div",true],[10,"class","col2 example"],[8],[0,"\\n    "],[7,"img",true],[11,"src",[29,[[23,0,["target","location","rootURL"]],"prototype-example1-c54a64b3aa5ff9a960a5e0e97774f9d6.gif"]]],[8],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"],[7,"section",true],[10,"class","blue"],[8],[0,"\\n  "],[7,"div",true],[10,"class","grid-container grid-clearfix"],[8],[0,"\\n    "],[7,"h1",true],[10,"class","center"],[8],[0,"Examples"],[9],[0,"\\n"],[4,"each",[[23,0,["model","examples"]]],null,{"statements":[[0,"    "],[5,"example-image",[],[["@caption"],[[23,1,["caption"]]]],{"statements":[[0,"\\n      "],[7,"img",true],[11,"src",[29,[[23,0,["target","location","rootURL"]],[23,1,["image"]]]]],[8],[9],[0,"\\n    "]],"parameters":[]}],[0,"\\n"]],"parameters":[1]},null],[0,"  "],[9],[0,"\\n"],[9],[0,"\\n"],[1,[22,"outlet"],false]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/site/home.hbs"}})
e.default=t}),define("doodledocs-app/utils/can-use-dom",["exports","ember-cli-analytics/utils/can-use-dom"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/utils/proxy-to-adapter",["exports","ember-cli-adapter-pattern/utils/proxy-to-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/utils/required-method",["exports","ember-cli-adapter-pattern/utils/required-method"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/utils/required-property",["exports","ember-cli-adapter-pattern/utils/required-property"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/utils/without",["exports","ember-cli-analytics/utils/without"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/config/environment",[],function(){try{var e="doodledocs-app/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),o={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(o,"__esModule",{value:!0}),o}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("doodledocs-app/app").default.create({name:"doodledocs-app",version:"0.0.0+15e41e34"})
