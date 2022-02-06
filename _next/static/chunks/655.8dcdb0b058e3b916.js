"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[655],{9437:function(e,t,n){n.r(t),n.d(t,{default:function(){return ie}});var r=n(4051),o=n.n(r),i=n(5893),l=n(2648),a=n(2241),s=n(786),c=n(6421),u=n.n(c),f=(n(1948),n(7494)),d=n(8683),p=n(1090),h=n(5963),w=n(4570),v=n(188),Z=n(7517),x=n(8734),y=n(1162),m=n(2482),g=(n(9440),n(1053)),j=n(8125),b=n(9261),P=n(3376),S=n(7539),C=n(1345),k=n(8958),A=n(283),M=n(7294),T=n(517),G=n(9840),I=n(9334),O=function(e){var t=e.contextMenu,n=e.setContextMenu,r=e.contextMenuFeaturesData,o=e.setRepeaterInfo;return(0,i.jsx)(i.Fragment,{children:null!==t&&(0,i.jsxs)(T.Z,{className:"ContextMenu",open:null!==t,onClose:function(){n(null)},anchorReference:"anchorPosition",sx:{position:"fixed",zIndex:1200},anchorPosition:{top:Math.floor(t.mouseY),left:Math.floor(t.mouseX)},defaultChecked:!1,defaultValue:void 0,children:[(0,i.jsx)(G.Z,{disabled:!0,children:"\uc911\uacc4\uae30"}),r.map((function(e,t){return(0,i.jsx)(G.Z,{onClick:function(){n(null),o(e)},children:(0,i.jsx)(I.Z,{primary:"".concat(e.Type," (CallSign: ").concat(e.Callsign,")"),secondary:"Tx:".concat(e.Tx,", Rx:").concat(e.Rx,", Tone: ").concat(e.Tone)})},t)}))]})})},E=n(1280),R=n(5393),z=function(e,t){if(null!==e&&t){var n=e.get("features").length,r=(n>0?e.get("features")[0].getProperties():"").Callsign;return new S.ZP({image:t>300?new A.Z({radius:14,fill:new C.Z({color:n>30?"#ff3333D0":n>10?"#ffcc33D0":"#33cc33D0"}),stroke:new k.Z({color:"#fff",width:1})}):new A.Z({radius:5,fill:new C.Z({color:"#33cc33"}),stroke:new k.Z({color:"#f00",width:1})}),text:t>300?new E.Z({text:"".concat(n.toString()),fill:new C.Z({color:"#fff"}),stroke:new k.Z({color:"#000",width:2}),font:"bold 14px Arial",textAlign:"center",textBaseline:"middle"}):new E.Z({text:r||"",fill:new C.Z({color:"#ffcc33"}),stroke:new k.Z({color:"#000",width:3}),offsetY:-15,font:'bold 14px "Malgun Gothic", "Apple Gothic", sans-serif',textAlign:"center",textBaseline:"middle"})})}return new S.ZP},F=function(e,t){var n=e.getProperties().Callsign;return null!==e&&t?new S.ZP({image:new R.Z({points:4,radius:5,fill:new C.Z({color:"#ff3333"}),stroke:new k.Z({color:"#fff",width:1})}),text:new E.Z({text:n?"[\uad11]".concat(n):"",fill:new C.Z({color:"#ff6666"}),stroke:new k.Z({color:"#000",width:3}),offsetY:-15,font:'bold 14px "Malgun Gothic", "Apple Gothic", sans-serif',textAlign:"center",textBaseline:"middle"})}):new S.ZP},D=function(e,t){var n=e.get("COLOR")||"#eeeeee",r=function(e,t){var n=e.get("features")[0].getProperties().Name;return new S.ZP({image:new A.Z({radius:10,fill:new C.Z({color:"#00ff00a0"}),stroke:new k.Z({color:"#ff0000",width:2})}),text:new E.Z({text:n||"",fill:new C.Z({color:"#00ff00"}),stroke:new k.Z({color:"#ff0000",width:3}),offsetY:-20,font:'bold 20px "Malgun Gothic", "Apple Gothic", sans-serif',textAlign:"center",textBaseline:"middle"}),fill:new C.Z({color:"#eeeeee"}),stroke:new k.Z({color:"rgba(255, 255, 255, 0.7)",width:2})})}(e);return r.getFill().setColor(n),r},B=n(657),Y=n(7645),N=n(6514),_=n(2882),L=n(5113),V=n(7906),X=n(295),H=n(3816),U=n(3252),$=n(7918),q=n(1425),J=n(3321);function K(e){var t=e.open,n=e.repeaterInfo,r=e.onClose;return(0,i.jsxs)(B.Z,{open:t,onClose:r,children:[(0,i.jsx)(Y.Z,{children:null===n||void 0===n?void 0:n.Callsign}),(0,i.jsx)(N.Z,{children:(0,i.jsx)(_.Z,{component:L.Z,elevation:1,children:(0,i.jsx)(V.Z,{children:(0,i.jsxs)(X.Z,{children:[(0,i.jsxs)(H.Z,{children:[(0,i.jsx)(U.Z,{component:"th",scope:"row",children:"Tx"}),(0,i.jsxs)(U.Z,{children:[null===n||void 0===n?void 0:n.Tx," Mhz"]})]}),(0,i.jsxs)(H.Z,{children:[(0,i.jsx)(U.Z,{component:"th",scope:"row",children:"Rx"}),(0,i.jsxs)(U.Z,{children:[null===n||void 0===n?void 0:n.Rx," Mhz"]})]}),(0,i.jsxs)(H.Z,{children:[(0,i.jsx)(U.Z,{component:"th",scope:"row",children:"Shift"}),(0,i.jsx)(U.Z,{children:(0,i.jsx)($.Z,{size:"small",color:"primary",label:(null===n||void 0===n?void 0:n.Rx)&&(null===n||void 0===n?void 0:n.Rx)?((null===n||void 0===n?void 0:n.Tx)-(null===n||void 0===n?void 0:n.Rx)).toFixed(2):"-"})})]}),(0,i.jsxs)(H.Z,{children:[(0,i.jsx)(U.Z,{component:"th",scope:"row",children:"\ud1a4"}),(0,i.jsx)(U.Z,{children:null===n||void 0===n?void 0:n.Tone})]}),(0,i.jsxs)(H.Z,{children:[(0,i.jsx)(U.Z,{component:"th",scope:"row",children:"\uc720\ud615"}),(0,i.jsx)(U.Z,{children:(0,i.jsx)($.Z,{size:"small",color:"secondary",label:null===n||void 0===n?void 0:n.Type})})]}),(0,i.jsxs)(H.Z,{children:[(0,i.jsx)(U.Z,{component:"th",scope:"row",children:"\uc8fc\uc18c"}),(0,i.jsx)(U.Z,{children:null===n||void 0===n?void 0:n.Address})]})]})})})}),(0,i.jsx)(q.Z,{children:(0,i.jsx)(J.Z,{onClick:r,children:"\ub2eb\uae30"})})]})}function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function W(e,t,n,r,o,i,l){try{var a=e[i](l),s=a.value}catch(c){return void n(c)}a.done?t(s):Promise.resolve(s).then(r,o)}function ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){ee(e,t,n[t])}))}return e}function ne(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],l=!0,a=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);l=!0);}catch(s){a=!0,o=s}finally{try{l||null==n.return||n.return()}finally{if(a)throw o}}return i}}(e,t)||oe(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function re(e){return function(e){if(Array.isArray(e))return Q(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||oe(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function oe(e,t){if(e){if("string"===typeof e)return Q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Q(e,t):void 0}}var ie=function(){var e=ne(M.useState({open:!1,repeaterInfo:void 0}),2),t=e[0],n=e[1],r=ne(M.useState(),2),c=r[0],T=r[1],G=ne(M.useState(void 0),2),I=G[0],E=G[1],R=ne(M.useState([]),2),B=R[0],Y=R[1],N=ne(M.useState(null),2),_=N[0],L=N[1],V=ne(M.useState(),2),X=V[0],H=V[1],U=ne(M.useState(),2),$=U[0],q=U[1];M.useEffect((function(){var e=new a.ZP({center:(0,g.mi)([126.9388092,37.4355672]),zoom:6,maxZoom:19}),t=new w.Z({trackingOptions:{enableHighAccuracy:!0},projection:e.getProjection()});t.setTracking(!0);var n=new p.Z;t.on("change:accuracyGeometry",(function(){n.setGeometry(t.getAccuracyGeometry()||void 0)}));var r=new p.Z;r.setStyle(new S.ZP({image:new A.Z({radius:6,fill:new C.Z({color:"#3399CC"}),stroke:new k.Z({color:"#fff",width:2})})})),t.on("change:position",(function(){var e=t.getPosition();r.setGeometry(e?new v.Z(e):void 0)}));var i=new m.Z({source:new P.Z({features:[n,r]}),zIndex:1e3}),c=new x.default({title:"\uc9c0\uc5ed\ub9dd \uc911\uacc4\uae30",layers:[]}),d=new x.default({title:"\uad11\uc5ed\ub9dd \uc911\uacc4\uae30",layers:[]});H(c),q(d);var h=new s.Z({target:"map",layers:[new x.default({title:"Base maps",layers:[new x.default({title:"OSM",type:"base",combine:!0,visible:!0,layers:[new y.Z({source:new j.Z({url:"https://tile.osmand.net/hd/{z}/{x}/{y}.png",crossOrigin:null,tilePixelRatio:2,maxZoom:19,tileSize:256,attributionsCollapsible:!1})})]})]}),new x.default({title:"GPS \ubcf8\uc778 \uc704\uce58",layers:[i]}),new x.default({title:"\uc911\uacc4\uae30",layers:[c,d]})],view:e});h.addControl(new f.Z({units:"metric"}));var Z={reverse:!0,groupSelectStyle:"children",startActive:!0,activationMode:"click"},b=new(u())(Z);h.addControl(b),T(h),fetch("data/repeater.csv").then(function(){var e,t=(e=o().mark((function e(t){var n,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text();case 2:(n=e.sent)&&(r=(0,l.Z)(n),E(r));case 4:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function l(e){W(i,r,o,l,a,"next",e)}function a(e){W(i,r,o,l,a,"throw",e)}l(void 0)}))});return function(e){return t.apply(this,arguments)}}())}),[]),M.useEffect((function(){if(c&&I){var e=te({},I),t=te({},I);void 0!==e.features&&(e.features=e.features.filter((function(e){var t;return"\uad11\uc5ed\ub9dd"!==(null===e||void 0===e||null===(t=e.properties)||void 0===t?void 0:t.Type)}))),void 0!==t.features&&(t.features=t.features.filter((function(e){var t;return"\uad11\uc5ed\ub9dd"===(null===e||void 0===e||null===(t=e.properties)||void 0===t?void 0:t.Type)})));var n=new m.Z({source:new b.Z({source:new P.Z({features:new h.Z({dataProjection:"EPSG:4326",featureProjection:"EPSG:3857"}).readFeatures(e)})}),style:z}),r=new m.Z({source:new P.Z({features:new h.Z({dataProjection:"EPSG:4326",featureProjection:"EPSG:3857"}).readFeatures(t)}),style:F});X&&X.getLayers().push(n),$&&$.getLayers().push(r);var o=new Z.Z({condition:d.V4,layers:[n,r],multi:!0,hitTolerance:10,style:D});c.addInteraction(o);o.on("select",(function(e){if(e.selected.length>0){var t=ne(e.mapBrowserEvent.pixel,2),n=t[0],r=t[1],i=[];e.selected.forEach((function(e){var t,n;void 0!==e.getProperties().features?(t=i).push.apply(t,re(e.getProperties().features.map((function(e){return e.getProperties()})))):e.length>0?(n=i).push.apply(n,re(e.map((function(e){return e.getProperties()})))):i.push(e.getProperties())}));e.preventDefault(),Y(i),L(null===_?{mouseX:n,mouseY:r}:null),o.getFeatures().clear()}}))}}),[c,I]);return(0,i.jsxs)("div",{id:"map",style:{width:"100%",height:"100%"},children:[(0,i.jsx)(O,{contextMenu:_,setContextMenu:L,contextMenuFeaturesData:B,setRepeaterInfo:function(e){n({open:!0,repeaterInfo:e})}}),(0,i.jsx)(K,{open:t.open,onClose:function(){return n(te({},t,{open:!1}))},repeaterInfo:t.repeaterInfo})]})}}}]);