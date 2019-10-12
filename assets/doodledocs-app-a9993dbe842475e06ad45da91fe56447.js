"use strict"
define("doodledocs-app/app",["exports","doodledocs-app/resolver","ember-load-initializers","doodledocs-app/config/environment"],function(e,t,o,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,o.default)(a,n.default.modulePrefix)
var i=a
e.default=i}),define("doodledocs-app/components/doodledoc",["exports","scroll-lock","doodledocs-app/components/draw-engine"],function(e,t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Component.extend({transmissionService:Ember.computed(function(){return Ember.getOwner(this).lookup("service:transmission-service")}),attributeBindings:["style"],style:"position: relative; height: 100vh",didRender:function(){if(this._super.apply(this,arguments),(0,t.disablePageScroll)(),2===this.element.children.length&&"CANVAS"===this.element.children[0].nodeName&&"CANVAS"===this.element.children[1].nodeName){var e=this.element.children[0],n=this.element.children[1],a=this.get("transmissionService")
a.startService(a.TRANSMISSIONMODE.P2P),o.default.call(this,e,n)}},willDestroyElement:function(){(0,t.enablePageScroll)(),this._super.apply(this,arguments)}})
e.default=n}),define("doodledocs-app/components/draw-engine",["exports","pressure"],function(e,t){function o(e){var t=e.e,o=e.lastX,n=e.lastY,a=e.lineThickness,i=e.pencilColor,s=e.context,r=e.pencilThickness,d=e.isMakingOwnChanges,l=e.transmissionService,u=t._x,c=t._y,p=u,f=o,m=c,h=n,v=void 0,b=void 0,g=Math.abs(h-m)>=Math.abs(f-p)
g&&(v=p,p=m,m=v,b=h,h=f,f=b),p>=f&&(v=p,p=f,f=v,b=m,m=h,h=b)
var y=f-p,x=0,_=Math.abs(h-m)/y,P=-1
if(b=m,m<=h&&(P=1),d){var M={e:{_x:t._x,_y:t._y,userForce:t.userForce},lastX:o,lastY:n,lineThickness:a,pencilColor:i,pencilThickness:r}
requestAnimationFrame(function(){l.send(M)})}for(var w=(a+=8*t.userForce)/2,E=p;E<f;E++)g?s.fillRect(b-w,E-w,a,a):s.fillRect(E-w,b-w,a,a),(x+=_)>=.5&&(b+=P,x-=1)
return a=r,{lastX:o=u,lastY:n=c}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(e,n){var a=this,i=this.get("transmissionService")
i.onReceivingMessage(function(e,t){requestAnimationFrame(function(){(function(e){e.context=s,e.isMakingOwnChanges=!1,e.b=void 0,e.context.fillStyle=e.pencilColor,e.transmissionService=i,o.call(this,e)})(e)})})
var s=n.getContext("2d")
n.style.width="100%",n.style.height="100%",n.width=n.offsetWidth,n.height=n.offsetHeight,s.clearRect(0,0,n.width,n.height),s.fillStyle="#FFFBEB",s.fillRect(0,0,n.width,n.height)
var r=e.getContext("2d")
e.style.width="100%",e.style.height="100%",e.width=n.offsetWidth,e.height=n.offsetHeight,r.clearRect(0,0,n.width,n.height)
var d=0,l=0,u=1,c="rgba(0, 0, 0, 0.33)",p=u,f=new function(){var e=this
function t(t){e.started=!0,s.fillStyle=c,d=t._x-t.target.offsetLeft,l=t._y-t.target.offsetTop,p=u}function a(e){r.clearRect(0,0,n.width,n.height),f.started&&(f.started=!1)}this.started=!1,this.start=function(e){t(e)},this.startDeepPress=function(e){t(e)},this.change=function(e){performance.now()
var t=e.touches[0].touchType
if("stylus"===t&&f.started){var a={e:e,lastX:d,lastY:l,lineThickness:p,pencilColor:c,context:s,pencilThickness:u,isMakingOwnChanges:!0,transmissionService:i},m=o.call(this,a)
d=m.lastX,l=m.lastY}(function(e,t,o){r.clearRect(0,0,n.width,n.height),r.strokeStyle="#f00",r.lineWidth=1,r.beginPath()
var a=e/2
r.rect(t-a,o-a,e,e),r.stroke()})(p,e._x,e._y)
performance.now()},this.end=function(e){a(e)},this.endDeepPress=function(e){a(e)}};["click","touchstart"].forEach(function(e){document.getElementById("pencil").addEventListener(e,function(e){u=1,c="rgba(0, 0, 0, 0.33)"})}),["click","touchstart"].forEach(function(e){document.getElementById("eraser").addEventListener(e,function(e){u=20,c="#FFFBEB"})})
var m={start:function(e){e.userInput="start",h.call(a,e)},change:function(e,t){t.userInput="change",t.userForce=e,h.call(a,t)},startDeepPress:function(e){e.userInput="startDeepPress",h.call(a,e)},endDeepPress:function(){var e={userInput:"endDeepPress"}
h.call(a,e)},end:function(){var e={userInput:"end"}
console.log("end",e),h.call(a,e)},unsupported:function(){a.innerHTML="Your device / browser does not support this :("}}
function h(e){e.offsetX||0==e.offsetX?(e._x=e.offsetX,e._y=e.offsetY):(e.layerX||0==e.layerX)&&(e._x=e.layerX,e._y=e.layerY)
var t=f[e.userInput].bind(this)
t&&t(e)}t.default.set(n,m)}}),define("doodledocs-app/components/example-image",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({})
e.default=t}),define("doodledocs-app/helpers/app-version",["exports","doodledocs-app/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,o){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.default.APP.version,i=n.versionOnly||n.hideSha,s=n.shaOnly||n.hideVersion,r=null
return i&&(n.showExtended&&(r=a.match(o.versionExtendedRegExp)),r||(r=a.match(o.versionRegExp))),s&&(r=a.match(o.shaRegExp)),r?r[0]:a}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var a=Ember.Helper.helper(n)
e.default=a}),define("doodledocs-app/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=t.default
e.default=o}),define("doodledocs-app/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=t.default
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
e.default=o}),define("doodledocs-app/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=t.default
e.default=o}),define("doodledocs-app/router",["exports","doodledocs-app/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
o.map(function(){this.route("site",function(){this.route("home"),this.route("faq")}),this.route("app",function(){this.route("doc",{path:"/:random_url"})})})
var n=o
e.default=n}),define("doodledocs-app/routes/app",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("doodledocs-app/routes/app/doc",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("doodledocs-app/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({redirect:function(){this.transitionTo("site.home")}})
e.default=t}),define("doodledocs-app/routes/site",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({redirect:function(){this.transitionTo("site.home")}})
e.default=t}),define("doodledocs-app/routes/site/faq",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("doodledocs-app/routes/site/home",["exports"],function(e){function t(e,t){var o=""
t.indexOf("a")>-1&&(o+="abcdefghijklmnopqrstuvwxyz"),t.indexOf("A")>-1&&(o+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"),t.indexOf("#")>-1&&(o+="0123456789"),t.indexOf("!")>-1&&(o+="-_")
for(var n="",a=e;a>0;--a)n+=o[Math.floor(Math.random()*o.length)]
return n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Route.extend({model:function(){for(var e=[{caption:"Made with laptop (no pressure sensitivity)",image:"/ex1-2c68589e386227152b68bb0f8dfddb1a.png"},{caption:"Collaborative Quick sketch with iPad",image:"/ex2-eb3c2656e2f66bd6815fb94effac0001.png"},{caption:"Collaborative drawing with iPad",image:"/ex3-7c7be9499e8db2b9d5284425d91d5a64.png"},{caption:"Solo drawing with iPad, no pressure sensitivity",image:"/ex4-24e20e514457ed05d9e8d60d0a1b1b2d.png"},{caption:"Solo drawing with iPad with pressure sensitivity",image:"/ex5-ae49925dc8ee3cad8c67372b883a7763.png"}],o=[],n=0;n<3;n++){var a=[Math.floor(Math.random()*e.length)]
o.push(e.splice(a,1)[0])}return{examples:o,randomURL:"dd:".concat(t(8,"aA#!"))}}})
e.default=o}),define("doodledocs-app/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("doodledocs-app/services/transmission-service",["exports","bugout"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Object.freeze({P2P:"P2P",SERVER:"SERVER"})
function n(e){for(var t=Object.entries(e),o=0;o<t.length;o++){var n=t[o][0],a=t[o][1]
"command"!==n&&(e[n]=JSON.stringify(a))}return JSON.stringify(e)}var a=Ember.Service.extend({TRANSMISSIONMODE:o,send:function(e){if(this.transmissionSetting===o.P2P)this.transmissionInstance.send(e)
else if(this.transmissionSetting===o.SERVER){var t=function(e,t,o,a){return n({command:"message",identifier:{channel:e,urlPath:a},data:{action:t,args:o}})}("MessageChannel","broadcastData",e,"dd:".concat(window.location.pathname.split("dd:")[1]))
this.transmissionInstance.send(t)}},onReceivingMessage:function(e){var t=this
if(this.transmissionSetting===o.P2P)this.transmissionInstance.on("message",function(o,n){o!==t.transmissionInstance.addr&&e(n,o)})
else if(this.transmissionSetting===o.SERVER){this.transmissionInstance.onmessage=function(t){var o=JSON.parse(t.data)
"ping"!==o.type&&"welcome"!==o.type&&"confirm_subscription"!==o.type&&e(o.message.args)}}},startService:function(e){if(this.transmissionSetting=e||o.P2P,this.transmissionSetting===o.P2P)this.transmissionInstance=(a="dd:".concat(window.location.pathname.split("dd:")[1]),(i=new t.default(a)).on("seen",function(e){var t=document.createElement("p")
t.innerHTML="Bugout address ".concat(e," connected"),document.getElementById("content").append(t)}),i)
else if(this.transmissionSetting===o.SERVER){this.transmissionInstance=function(e){var t=new WebSocket(e)
return t.onopen=function(e){t.send(n({command:"subscribe",identifier:{channel:"MessageChannel",urlPath:"dd:".concat(window.location.pathname.split("dd:")[1])}}))},t}("ws://localhost:8888/websocket")}var a,i
this.start=!0},init:function(){this._super.apply(this,arguments),this.transmissionSetting=void 0}})
e.default=a}),define("doodledocs-app/templates/app",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"FTKFUwE3",block:'{"symbols":[],"statements":[[7,"main",true],[8],[0,"\\n  "],[7,"header",true],[8],[0,"\\n    "],[7,"img",true],[10,"src","/doodle docs big logo-6bcec9aebf8fe226c0dee202ee53a3d4.png"],[8],[9],[0,"\\n    "],[7,"span",true],[8],[0,"Options: "],[7,"a",true],[10,"id","pencil"],[10,"href","#using-pencil"],[8],[0,"pencil"],[9],[0," | "],[7,"a",true],[10,"id","eraser"],[10,"href","#using-eraser"],[8],[0,"Eraser"],[9],[0," "],[9],[0,"\\n    "],[7,"nav",true],[8],[0,"\\n      "],[4,"link-to",null,[["class","route"],["button","site.home"]],{"statements":[[0,"Home"]],"parameters":[]},null],[0,"\\n      |\\n      "],[4,"link-to",null,[["class","route"],["button","site.faq"]],{"statements":[[0,"FAQ"]],"parameters":[]},null],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[1,[22,"outlet"],false],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/app.hbs"}})
e.default=t}),define("doodledocs-app/templates/app/doc",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"wmMKKV8c",block:'{"symbols":[],"statements":[[7,"div",true],[10,"id","content"],[8],[9],[0,"\\n"],[5,"doodledoc",[],[[],[]]]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/app/doc.hbs"}})
e.default=t}),define("doodledocs-app/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"ICM7Nu02",block:'{"symbols":[],"statements":[[7,"div",true],[10,"id","page-container"],[8],[0,"\\n  "],[1,[22,"outlet"],false],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/application.hbs"}})
e.default=t}),define("doodledocs-app/templates/components/doodledoc",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"WdfOyGti",block:'{"symbols":[],"statements":[[7,"canvas",true],[10,"id","hud"],[10,"style","position: absolute; left: 0; top: 0; z-index: 2; pointer-events:none;"],[8],[9],[0,"\\n"],[7,"canvas",true],[10,"id","imageView"],[10,"style","position: absolute; left: 0; top: 0; z-index: 1"],[8],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/components/doodledoc.hbs"}})
e.default=t}),define("doodledocs-app/templates/components/example-image",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"ZJObVGGT",block:'{"symbols":["&default"],"statements":[[7,"div",true],[10,"class","example col3"],[8],[0,"\\n  "],[14,1],[0," "],[0,"\\n  "],[7,"p",true],[8],[1,[23,0,["caption"]],false],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/components/example-image.hbs"}})
e.default=t}),define("doodledocs-app/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"ASYvSUaT",block:'{"symbols":[],"statements":[[1,[22,"outlet"],false]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/index.hbs"}})
e.default=t}),define("doodledocs-app/templates/site",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"Sv3xesY1",block:'{"symbols":[],"statements":[[7,"main",true],[8],[0,"\\n  "],[7,"header",true],[8],[0,"\\n    "],[7,"img",true],[10,"src","/doodle docs big logo-6bcec9aebf8fe226c0dee202ee53a3d4.png"],[8],[9],[0,"\\n    "],[7,"span",true],[8],[0,"Early Alpha"],[9],[0,"\\n    "],[7,"nav",true],[8],[0,"\\n      "],[4,"link-to",null,[["class","route"],["button","site.home"]],{"statements":[[0,"Home"]],"parameters":[]},null],[0,"\\n      |\\n      "],[4,"link-to",null,[["class","route"],["button","site.faq"]],{"statements":[[0,"FAQ"]],"parameters":[]},null],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[1,[22,"outlet"],false],[0,"\\n"],[9],[0,"\\n"],[7,"footer",true],[8],[0,"\\n  "],[7,"p",true],[8],[0,"Made with ❤️ by Melvin Roest "],[9],[0,"\\n  "],[7,"p",true],[8],[0,"Github | LinkedIn"],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/site.hbs"}})
e.default=t}),define("doodledocs-app/templates/site/faq",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"2mxBKDS7",block:'{"symbols":[],"statements":[[7,"section",true],[10,"class","grid-container grid-clearfix"],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"FAQ"],[9],[0,"\\n  "],[7,"h2",true],[8],[0,"Why does this exist?"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"I couldn\'t find a drawing web app that respects a pressure sensitive stylus. So I decided to create my own."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"Why are there so many features missing?"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"I try to keep it simple."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"I have an idea for a feature!"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"Great! Let me know, you can email me at mettamage at protonmail dot com."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"Is this free?"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"I try to keep a simple version free, but server costs are a thing :( . I also open-sourced it, so you can always roll your own. I think people should always be able to doodle and to create some quick collaborative sketches."],[9],[0,"\\n\\n  "],[7,"h2",true],[8],[0,"I have another question!"],[9],[0,"\\n  "],[7,"p",true],[8],[0,"Contact me somehow! I leave it up to you to figure it out ;-)"],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/site/faq.hbs"}})
e.default=t})
define("doodledocs-app/templates/site/home",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"hBt8h3es",block:'{"symbols":["example"],"statements":[[7,"section",true],[10,"class","grid-container grid-clearfix"],[8],[0,"\\n  "],[7,"div",true],[10,"class","col2"],[8],[0,"\\n    "],[7,"h1",true],[8],[0,"Draw together on the web"],[9],[0,"\\n    "],[7,"p",true],[8],[0,"Doodle Docs allows you to sketch and collaborate with your pressure sensitive stylus-powered tablet or your\\n      laptop."],[9],[0,"\\n    "],[7,"button",true],[8],[0,"\\n"],[4,"link-to",null,[["class","route","model"],["button","app.doc",[23,0,["model","randomURL"]]]],{"statements":[[0,"      "],[7,"div",true],[8],[0,"\\n        "],[7,"img",true],[10,"src","/doodle docs logo-80bf0f6f1eede51b54e579aaca4b0824.png"],[8],[9],[0,"\\n        "],[7,"div",true],[8],[0,"Open New Doodle Doc"],[9],[0,"\\n      "],[9],[0,"\\n"]],"parameters":[]},null],[0,"    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[7,"div",true],[10,"class","col2 example"],[8],[0,"\\n    "],[7,"img",true],[10,"src","/prototype-example1-c54a64b3aa5ff9a960a5e0e97774f9d6.gif"],[8],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"],[7,"section",true],[10,"class","blue"],[8],[0,"\\n  "],[7,"div",true],[10,"class","grid-container grid-clearfix"],[8],[0,"\\n    "],[7,"h1",true],[10,"class","center"],[8],[0,"Examples"],[9],[0,"\\n"],[4,"each",[[23,0,["model","examples"]]],null,{"statements":[[0,"    "],[5,"example-image",[],[["@caption"],[[23,1,["caption"]]]],{"statements":[[0,"\\n      "],[7,"img",true],[11,"src",[23,1,["image"]]],[8],[9],[0,"\\n    "]],"parameters":[]}],[0,"\\n"]],"parameters":[1]},null],[0,"  "],[9],[0,"\\n"],[9],[0,"\\n"],[1,[22,"outlet"],false]],"hasEval":false}',meta:{moduleName:"doodledocs-app/templates/site/home.hbs"}})
e.default=t}),define("doodledocs-app/config/environment",[],function(){try{var e="doodledocs-app/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),o={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(o,"__esModule",{value:!0}),o}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("doodledocs-app/app").default.create({name:"doodledocs-app",version:"0.0.0+b445f639"})
