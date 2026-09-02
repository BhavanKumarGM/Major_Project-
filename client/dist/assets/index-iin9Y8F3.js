(function(){const m=document.createElement("link").relList;if(m&&m.supports&&m.supports("modulepreload"))return;for(const M of document.querySelectorAll('link[rel="modulepreload"]'))K(M);new MutationObserver(M=>{for(const C of M)if(C.type==="childList")for(const V of C.addedNodes)V.tagName==="LINK"&&V.rel==="modulepreload"&&K(V)}).observe(document,{childList:!0,subtree:!0});function f(M){const C={};return M.integrity&&(C.integrity=M.integrity),M.referrerPolicy&&(C.referrerPolicy=M.referrerPolicy),M.crossOrigin==="use-credentials"?C.credentials="include":M.crossOrigin==="anonymous"?C.credentials="omit":C.credentials="same-origin",C}function K(M){if(M.ep)return;M.ep=!0;const C=f(M);fetch(M.href,C)}})();function nu(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var Ki={exports:{}},Vr={},qi={exports:{}},de={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hc;function sf(){if(Hc)return de;Hc=1;var h=Symbol.for("react.element"),m=Symbol.for("react.portal"),f=Symbol.for("react.fragment"),K=Symbol.for("react.strict_mode"),M=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),V=Symbol.for("react.context"),F=Symbol.for("react.forward_ref"),_=Symbol.for("react.suspense"),Y=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),ne=Symbol.iterator;function O(o){return o===null||typeof o!="object"?null:(o=ne&&o[ne]||o["@@iterator"],typeof o=="function"?o:null)}var fe={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},re=Object.assign,ae={};function U(o,v,b){this.props=o,this.context=v,this.refs=ae,this.updater=b||fe}U.prototype.isReactComponent={},U.prototype.setState=function(o,v){if(typeof o!="object"&&typeof o!="function"&&o!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,o,v,"setState")},U.prototype.forceUpdate=function(o){this.updater.enqueueForceUpdate(this,o,"forceUpdate")};function B(){}B.prototype=U.prototype;function ue(o,v,b){this.props=o,this.context=v,this.refs=ae,this.updater=b||fe}var se=ue.prototype=new B;se.constructor=ue,re(se,U.prototype),se.isPureReactComponent=!0;var me=Array.isArray,we=Object.prototype.hasOwnProperty,he={current:null},ye={key:!0,ref:!0,__self:!0,__source:!0};function Ee(o,v,b){var z,L={},I=null,T=null;if(v!=null)for(z in v.ref!==void 0&&(T=v.ref),v.key!==void 0&&(I=""+v.key),v)we.call(v,z)&&!ye.hasOwnProperty(z)&&(L[z]=v[z]);var D=arguments.length-2;if(D===1)L.children=b;else if(1<D){for(var J=Array(D),oe=0;oe<D;oe++)J[oe]=arguments[oe+2];L.children=J}if(o&&o.defaultProps)for(z in D=o.defaultProps,D)L[z]===void 0&&(L[z]=D[z]);return{$$typeof:h,type:o,key:I,ref:T,props:L,_owner:he.current}}function Ve(o,v){return{$$typeof:h,type:o.type,key:v,ref:o.ref,props:o.props,_owner:o._owner}}function De(o){return typeof o=="object"&&o!==null&&o.$$typeof===h}function E(o){var v={"=":"=0",":":"=2"};return"$"+o.replace(/[=:]/g,function(b){return v[b]})}var Z=/\/+/g;function xe(o,v){return typeof o=="object"&&o!==null&&o.key!=null?E(""+o.key):v.toString(36)}function Re(o,v,b,z,L){var I=typeof o;(I==="undefined"||I==="boolean")&&(o=null);var T=!1;if(o===null)T=!0;else switch(I){case"string":case"number":T=!0;break;case"object":switch(o.$$typeof){case h:case m:T=!0}}if(T)return T=o,L=L(T),o=z===""?"."+xe(T,0):z,me(L)?(b="",o!=null&&(b=o.replace(Z,"$&/")+"/"),Re(L,v,b,"",function(oe){return oe})):L!=null&&(De(L)&&(L=Ve(L,b+(!L.key||T&&T.key===L.key?"":(""+L.key).replace(Z,"$&/")+"/")+o)),v.push(L)),1;if(T=0,z=z===""?".":z+":",me(o))for(var D=0;D<o.length;D++){I=o[D];var J=z+xe(I,D);T+=Re(I,v,b,J,L)}else if(J=O(o),typeof J=="function")for(o=J.call(o),D=0;!(I=o.next()).done;)I=I.value,J=z+xe(I,D++),T+=Re(I,v,b,J,L);else if(I==="object")throw v=String(o),Error("Objects are not valid as a React child (found: "+(v==="[object Object]"?"object with keys {"+Object.keys(o).join(", ")+"}":v)+"). If you meant to render a collection of children, use an array instead.");return T}function Me(o,v,b){if(o==null)return o;var z=[],L=0;return Re(o,z,"","",function(I){return v.call(b,I,L++)}),z}function Le(o){if(o._status===-1){var v=o._result;v=v(),v.then(function(b){(o._status===0||o._status===-1)&&(o._status=1,o._result=b)},function(b){(o._status===0||o._status===-1)&&(o._status=2,o._result=b)}),o._status===-1&&(o._status=0,o._result=v)}if(o._status===1)return o._result.default;throw o._result}var be={current:null},P={transition:null},X={ReactCurrentDispatcher:be,ReactCurrentBatchConfig:P,ReactCurrentOwner:he};function d(){throw Error("act(...) is not supported in production builds of React.")}return de.Children={map:Me,forEach:function(o,v,b){Me(o,function(){v.apply(this,arguments)},b)},count:function(o){var v=0;return Me(o,function(){v++}),v},toArray:function(o){return Me(o,function(v){return v})||[]},only:function(o){if(!De(o))throw Error("React.Children.only expected to receive a single React element child.");return o}},de.Component=U,de.Fragment=f,de.Profiler=M,de.PureComponent=ue,de.StrictMode=K,de.Suspense=_,de.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=X,de.act=d,de.cloneElement=function(o,v,b){if(o==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+o+".");var z=re({},o.props),L=o.key,I=o.ref,T=o._owner;if(v!=null){if(v.ref!==void 0&&(I=v.ref,T=he.current),v.key!==void 0&&(L=""+v.key),o.type&&o.type.defaultProps)var D=o.type.defaultProps;for(J in v)we.call(v,J)&&!ye.hasOwnProperty(J)&&(z[J]=v[J]===void 0&&D!==void 0?D[J]:v[J])}var J=arguments.length-2;if(J===1)z.children=b;else if(1<J){D=Array(J);for(var oe=0;oe<J;oe++)D[oe]=arguments[oe+2];z.children=D}return{$$typeof:h,type:o.type,key:L,ref:I,props:z,_owner:T}},de.createContext=function(o){return o={$$typeof:V,_currentValue:o,_currentValue2:o,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},o.Provider={$$typeof:C,_context:o},o.Consumer=o},de.createElement=Ee,de.createFactory=function(o){var v=Ee.bind(null,o);return v.type=o,v},de.createRef=function(){return{current:null}},de.forwardRef=function(o){return{$$typeof:F,render:o}},de.isValidElement=De,de.lazy=function(o){return{$$typeof:H,_payload:{_status:-1,_result:o},_init:Le}},de.memo=function(o,v){return{$$typeof:Y,type:o,compare:v===void 0?null:v}},de.startTransition=function(o){var v=P.transition;P.transition={};try{o()}finally{P.transition=v}},de.unstable_act=d,de.useCallback=function(o,v){return be.current.useCallback(o,v)},de.useContext=function(o){return be.current.useContext(o)},de.useDebugValue=function(){},de.useDeferredValue=function(o){return be.current.useDeferredValue(o)},de.useEffect=function(o,v){return be.current.useEffect(o,v)},de.useId=function(){return be.current.useId()},de.useImperativeHandle=function(o,v,b){return be.current.useImperativeHandle(o,v,b)},de.useInsertionEffect=function(o,v){return be.current.useInsertionEffect(o,v)},de.useLayoutEffect=function(o,v){return be.current.useLayoutEffect(o,v)},de.useMemo=function(o,v){return be.current.useMemo(o,v)},de.useReducer=function(o,v,b){return be.current.useReducer(o,v,b)},de.useRef=function(o){return be.current.useRef(o)},de.useState=function(o){return be.current.useState(o)},de.useSyncExternalStore=function(o,v,b){return be.current.useSyncExternalStore(o,v,b)},de.useTransition=function(){return be.current.useTransition()},de.version="18.3.1",de}var Qc;function es(){return Qc||(Qc=1,qi.exports=sf()),qi.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kc;function of(){if(Kc)return Vr;Kc=1;var h=es(),m=Symbol.for("react.element"),f=Symbol.for("react.fragment"),K=Object.prototype.hasOwnProperty,M=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C={key:!0,ref:!0,__self:!0,__source:!0};function V(F,_,Y){var H,ne={},O=null,fe=null;Y!==void 0&&(O=""+Y),_.key!==void 0&&(O=""+_.key),_.ref!==void 0&&(fe=_.ref);for(H in _)K.call(_,H)&&!C.hasOwnProperty(H)&&(ne[H]=_[H]);if(F&&F.defaultProps)for(H in _=F.defaultProps,_)ne[H]===void 0&&(ne[H]=_[H]);return{$$typeof:m,type:F,key:O,ref:fe,props:ne,_owner:M.current}}return Vr.Fragment=f,Vr.jsx=V,Vr.jsxs=V,Vr}var qc;function cf(){return qc||(qc=1,Ki.exports=of()),Ki.exports}var l=cf(),G=es();const ru=nu(G);var ta={},Gi={exports:{}},pt={},Yi={exports:{}},Xi={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gc;function uf(){return Gc||(Gc=1,(function(h){function m(P,X){var d=P.length;P.push(X);e:for(;0<d;){var o=d-1>>>1,v=P[o];if(0<M(v,X))P[o]=X,P[d]=v,d=o;else break e}}function f(P){return P.length===0?null:P[0]}function K(P){if(P.length===0)return null;var X=P[0],d=P.pop();if(d!==X){P[0]=d;e:for(var o=0,v=P.length,b=v>>>1;o<b;){var z=2*(o+1)-1,L=P[z],I=z+1,T=P[I];if(0>M(L,d))I<v&&0>M(T,L)?(P[o]=T,P[I]=d,o=I):(P[o]=L,P[z]=d,o=z);else if(I<v&&0>M(T,d))P[o]=T,P[I]=d,o=I;else break e}}return X}function M(P,X){var d=P.sortIndex-X.sortIndex;return d!==0?d:P.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var C=performance;h.unstable_now=function(){return C.now()}}else{var V=Date,F=V.now();h.unstable_now=function(){return V.now()-F}}var _=[],Y=[],H=1,ne=null,O=3,fe=!1,re=!1,ae=!1,U=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,ue=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function se(P){for(var X=f(Y);X!==null;){if(X.callback===null)K(Y);else if(X.startTime<=P)K(Y),X.sortIndex=X.expirationTime,m(_,X);else break;X=f(Y)}}function me(P){if(ae=!1,se(P),!re)if(f(_)!==null)re=!0,Le(we);else{var X=f(Y);X!==null&&be(me,X.startTime-P)}}function we(P,X){re=!1,ae&&(ae=!1,B(Ee),Ee=-1),fe=!0;var d=O;try{for(se(X),ne=f(_);ne!==null&&(!(ne.expirationTime>X)||P&&!E());){var o=ne.callback;if(typeof o=="function"){ne.callback=null,O=ne.priorityLevel;var v=o(ne.expirationTime<=X);X=h.unstable_now(),typeof v=="function"?ne.callback=v:ne===f(_)&&K(_),se(X)}else K(_);ne=f(_)}if(ne!==null)var b=!0;else{var z=f(Y);z!==null&&be(me,z.startTime-X),b=!1}return b}finally{ne=null,O=d,fe=!1}}var he=!1,ye=null,Ee=-1,Ve=5,De=-1;function E(){return!(h.unstable_now()-De<Ve)}function Z(){if(ye!==null){var P=h.unstable_now();De=P;var X=!0;try{X=ye(!0,P)}finally{X?xe():(he=!1,ye=null)}}else he=!1}var xe;if(typeof ue=="function")xe=function(){ue(Z)};else if(typeof MessageChannel<"u"){var Re=new MessageChannel,Me=Re.port2;Re.port1.onmessage=Z,xe=function(){Me.postMessage(null)}}else xe=function(){U(Z,0)};function Le(P){ye=P,he||(he=!0,xe())}function be(P,X){Ee=U(function(){P(h.unstable_now())},X)}h.unstable_IdlePriority=5,h.unstable_ImmediatePriority=1,h.unstable_LowPriority=4,h.unstable_NormalPriority=3,h.unstable_Profiling=null,h.unstable_UserBlockingPriority=2,h.unstable_cancelCallback=function(P){P.callback=null},h.unstable_continueExecution=function(){re||fe||(re=!0,Le(we))},h.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ve=0<P?Math.floor(1e3/P):5},h.unstable_getCurrentPriorityLevel=function(){return O},h.unstable_getFirstCallbackNode=function(){return f(_)},h.unstable_next=function(P){switch(O){case 1:case 2:case 3:var X=3;break;default:X=O}var d=O;O=X;try{return P()}finally{O=d}},h.unstable_pauseExecution=function(){},h.unstable_requestPaint=function(){},h.unstable_runWithPriority=function(P,X){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var d=O;O=P;try{return X()}finally{O=d}},h.unstable_scheduleCallback=function(P,X,d){var o=h.unstable_now();switch(typeof d=="object"&&d!==null?(d=d.delay,d=typeof d=="number"&&0<d?o+d:o):d=o,P){case 1:var v=-1;break;case 2:v=250;break;case 5:v=1073741823;break;case 4:v=1e4;break;default:v=5e3}return v=d+v,P={id:H++,callback:X,priorityLevel:P,startTime:d,expirationTime:v,sortIndex:-1},d>o?(P.sortIndex=d,m(Y,P),f(_)===null&&P===f(Y)&&(ae?(B(Ee),Ee=-1):ae=!0,be(me,d-o))):(P.sortIndex=v,m(_,P),re||fe||(re=!0,Le(we))),P},h.unstable_shouldYield=E,h.unstable_wrapCallback=function(P){var X=O;return function(){var d=O;O=X;try{return P.apply(this,arguments)}finally{O=d}}}})(Xi)),Xi}var Yc;function df(){return Yc||(Yc=1,Yi.exports=uf()),Yi.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xc;function ff(){if(Xc)return pt;Xc=1;var h=es(),m=df();function f(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var K=new Set,M={};function C(e,t){V(e,t),V(e+"Capture",t)}function V(e,t){for(M[e]=t,e=0;e<t.length;e++)K.add(t[e])}var F=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_=Object.prototype.hasOwnProperty,Y=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,H={},ne={};function O(e){return _.call(ne,e)?!0:_.call(H,e)?!1:Y.test(e)?ne[e]=!0:(H[e]=!0,!1)}function fe(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function re(e,t,n,r){if(t===null||typeof t>"u"||fe(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ae(e,t,n,r,a,i,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=s}var U={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){U[e]=new ae(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];U[t]=new ae(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){U[e]=new ae(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){U[e]=new ae(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){U[e]=new ae(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){U[e]=new ae(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){U[e]=new ae(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){U[e]=new ae(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){U[e]=new ae(e,5,!1,e.toLowerCase(),null,!1,!1)});var B=/[\-:]([a-z])/g;function ue(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(B,ue);U[t]=new ae(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(B,ue);U[t]=new ae(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(B,ue);U[t]=new ae(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){U[e]=new ae(e,1,!1,e.toLowerCase(),null,!1,!1)}),U.xlinkHref=new ae("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){U[e]=new ae(e,1,!1,e.toLowerCase(),null,!0,!0)});function se(e,t,n,r){var a=U.hasOwnProperty(t)?U[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(re(t,n,a,r)&&(n=null),r||a===null?O(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var me=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,we=Symbol.for("react.element"),he=Symbol.for("react.portal"),ye=Symbol.for("react.fragment"),Ee=Symbol.for("react.strict_mode"),Ve=Symbol.for("react.profiler"),De=Symbol.for("react.provider"),E=Symbol.for("react.context"),Z=Symbol.for("react.forward_ref"),xe=Symbol.for("react.suspense"),Re=Symbol.for("react.suspense_list"),Me=Symbol.for("react.memo"),Le=Symbol.for("react.lazy"),be=Symbol.for("react.offscreen"),P=Symbol.iterator;function X(e){return e===null||typeof e!="object"?null:(e=P&&e[P]||e["@@iterator"],typeof e=="function"?e:null)}var d=Object.assign,o;function v(e){if(o===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);o=t&&t[1]||""}return`
`+o+e}var b=!1;function z(e,t){if(!e||b)return"";b=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(x){var r=x}Reflect.construct(e,[],t)}else{try{t.call()}catch(x){r=x}e.call(t.prototype)}else{try{throw Error()}catch(x){r=x}e()}}catch(x){if(x&&r&&typeof x.stack=="string"){for(var a=x.stack.split(`
`),i=r.stack.split(`
`),s=a.length-1,c=i.length-1;1<=s&&0<=c&&a[s]!==i[c];)c--;for(;1<=s&&0<=c;s--,c--)if(a[s]!==i[c]){if(s!==1||c!==1)do if(s--,c--,0>c||a[s]!==i[c]){var u=`
`+a[s].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=s&&0<=c);break}}}finally{b=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?v(e):""}function L(e){switch(e.tag){case 5:return v(e.type);case 16:return v("Lazy");case 13:return v("Suspense");case 19:return v("SuspenseList");case 0:case 2:case 15:return e=z(e.type,!1),e;case 11:return e=z(e.type.render,!1),e;case 1:return e=z(e.type,!0),e;default:return""}}function I(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ye:return"Fragment";case he:return"Portal";case Ve:return"Profiler";case Ee:return"StrictMode";case xe:return"Suspense";case Re:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case E:return(e.displayName||"Context")+".Consumer";case De:return(e._context.displayName||"Context")+".Provider";case Z:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Me:return t=e.displayName||null,t!==null?t:I(e.type)||"Memo";case Le:t=e._payload,e=e._init;try{return I(e(t))}catch{}}return null}function T(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return I(t);case 8:return t===Ee?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function D(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function J(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function oe(e){var t=J(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(s){r=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ge(e){e._valueTracker||(e._valueTracker=oe(e))}function je(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=J(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function w(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function R(e,t){var n=t.checked;return d({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ce(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=D(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function _e(e,t){t=t.checked,t!=null&&se(e,"checked",t,!1)}function Ke(e,t){_e(e,t);var n=D(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?st(e,t.type,n):t.hasOwnProperty("defaultValue")&&st(e,t.type,D(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function rt(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function st(e,t,n){(t!=="number"||w(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ne=Array.isArray;function lt(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+D(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function yn(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(f(91));return d({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function It(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(f(92));if(Ne(n)){if(1<n.length)throw Error(f(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:D(n)}}function St(e,t){var n=D(t.value),r=D(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function In(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Rn(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Dt(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Rn(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ln,sr=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ln=Ln||document.createElement("div"),Ln.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ln.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Xt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $t={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},la=["Webkit","ms","Moz","O"];Object.keys($t).forEach(function(e){la.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),$t[t]=$t[e]})});function Kr(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||$t.hasOwnProperty(e)&&$t[e]?(""+t).trim():t+"px"}function is(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=Kr(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var du=d({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function aa(e,t){if(t){if(du[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(f(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(f(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(f(61))}if(t.style!=null&&typeof t.style!="object")throw Error(f(62))}}function ia(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var sa=null;function oa(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ca=null,On=null,An=null;function ss(e){if(e=Mr(e)){if(typeof ca!="function")throw Error(f(280));var t=e.stateNode;t&&(t=gl(t),ca(e.stateNode,e.type,t))}}function os(e){On?An?An.push(e):An=[e]:On=e}function cs(){if(On){var e=On,t=An;if(An=On=null,ss(e),t)for(e=0;e<t.length;e++)ss(t[e])}}function us(e,t){return e(t)}function ds(){}var ua=!1;function fs(e,t,n){if(ua)return e(t,n);ua=!0;try{return us(e,t,n)}finally{ua=!1,(On!==null||An!==null)&&(ds(),cs())}}function or(e,t){var n=e.stateNode;if(n===null)return null;var r=gl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(f(231,t,typeof n));return n}var da=!1;if(F)try{var cr={};Object.defineProperty(cr,"passive",{get:function(){da=!0}}),window.addEventListener("test",cr,cr),window.removeEventListener("test",cr,cr)}catch{da=!1}function fu(e,t,n,r,a,i,s,c,u){var x=Array.prototype.slice.call(arguments,3);try{t.apply(n,x)}catch(j){this.onError(j)}}var ur=!1,qr=null,Gr=!1,fa=null,pu={onError:function(e){ur=!0,qr=e}};function mu(e,t,n,r,a,i,s,c,u){ur=!1,qr=null,fu.apply(pu,arguments)}function hu(e,t,n,r,a,i,s,c,u){if(mu.apply(this,arguments),ur){if(ur){var x=qr;ur=!1,qr=null}else throw Error(f(198));Gr||(Gr=!0,fa=x)}}function xn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ps(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ms(e){if(xn(e)!==e)throw Error(f(188))}function gu(e){var t=e.alternate;if(!t){if(t=xn(e),t===null)throw Error(f(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return ms(a),e;if(i===r)return ms(a),t;i=i.sibling}throw Error(f(188))}if(n.return!==r.return)n=a,r=i;else{for(var s=!1,c=a.child;c;){if(c===n){s=!0,n=a,r=i;break}if(c===r){s=!0,r=a,n=i;break}c=c.sibling}if(!s){for(c=i.child;c;){if(c===n){s=!0,n=i,r=a;break}if(c===r){s=!0,r=i,n=a;break}c=c.sibling}if(!s)throw Error(f(189))}}if(n.alternate!==r)throw Error(f(190))}if(n.tag!==3)throw Error(f(188));return n.stateNode.current===n?e:t}function hs(e){return e=gu(e),e!==null?gs(e):null}function gs(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=gs(e);if(t!==null)return t;e=e.sibling}return null}var vs=m.unstable_scheduleCallback,ys=m.unstable_cancelCallback,vu=m.unstable_shouldYield,yu=m.unstable_requestPaint,$e=m.unstable_now,xu=m.unstable_getCurrentPriorityLevel,pa=m.unstable_ImmediatePriority,xs=m.unstable_UserBlockingPriority,Yr=m.unstable_NormalPriority,wu=m.unstable_LowPriority,ws=m.unstable_IdlePriority,Xr=null,Rt=null;function ku(e){if(Rt&&typeof Rt.onCommitFiberRoot=="function")try{Rt.onCommitFiberRoot(Xr,e,void 0,(e.current.flags&128)===128)}catch{}}var Ct=Math.clz32?Math.clz32:bu,ju=Math.log,Nu=Math.LN2;function bu(e){return e>>>=0,e===0?32:31-(ju(e)/Nu|0)|0}var Jr=64,Zr=4194304;function dr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function el(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,i=e.pingedLanes,s=n&268435455;if(s!==0){var c=s&~a;c!==0?r=dr(c):(i&=s,i!==0&&(r=dr(i)))}else s=n&~a,s!==0?r=dr(s):i!==0&&(r=dr(i));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,i=t&-t,a>=i||a===16&&(i&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ct(t),a=1<<n,r|=e[n],t&=~a;return r}function Su(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cu(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,i=e.pendingLanes;0<i;){var s=31-Ct(i),c=1<<s,u=a[s];u===-1?((c&n)===0||(c&r)!==0)&&(a[s]=Su(c,t)):u<=t&&(e.expiredLanes|=c),i&=~c}}function ma(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ks(){var e=Jr;return Jr<<=1,(Jr&4194240)===0&&(Jr=64),e}function ha(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function fr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ct(t),e[t]=n}function zu(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-Ct(n),i=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~i}}function ga(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ct(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var ke=0;function js(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Ns,va,bs,Ss,Cs,ya=!1,tl=[],Jt=null,Zt=null,en=null,pr=new Map,mr=new Map,tn=[],Eu="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zs(e,t){switch(e){case"focusin":case"focusout":Jt=null;break;case"dragenter":case"dragleave":Zt=null;break;case"mouseover":case"mouseout":en=null;break;case"pointerover":case"pointerout":pr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mr.delete(t.pointerId)}}function hr(e,t,n,r,a,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[a]},t!==null&&(t=Mr(t),t!==null&&va(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function Mu(e,t,n,r,a){switch(t){case"focusin":return Jt=hr(Jt,e,t,n,r,a),!0;case"dragenter":return Zt=hr(Zt,e,t,n,r,a),!0;case"mouseover":return en=hr(en,e,t,n,r,a),!0;case"pointerover":var i=a.pointerId;return pr.set(i,hr(pr.get(i)||null,e,t,n,r,a)),!0;case"gotpointercapture":return i=a.pointerId,mr.set(i,hr(mr.get(i)||null,e,t,n,r,a)),!0}return!1}function Es(e){var t=wn(e.target);if(t!==null){var n=xn(t);if(n!==null){if(t=n.tag,t===13){if(t=ps(n),t!==null){e.blockedOn=t,Cs(e.priority,function(){bs(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function nl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=wa(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);sa=r,n.target.dispatchEvent(r),sa=null}else return t=Mr(n),t!==null&&va(t),e.blockedOn=n,!1;t.shift()}return!0}function Ms(e,t,n){nl(e)&&n.delete(t)}function Pu(){ya=!1,Jt!==null&&nl(Jt)&&(Jt=null),Zt!==null&&nl(Zt)&&(Zt=null),en!==null&&nl(en)&&(en=null),pr.forEach(Ms),mr.forEach(Ms)}function gr(e,t){e.blockedOn===t&&(e.blockedOn=null,ya||(ya=!0,m.unstable_scheduleCallback(m.unstable_NormalPriority,Pu)))}function vr(e){function t(a){return gr(a,e)}if(0<tl.length){gr(tl[0],e);for(var n=1;n<tl.length;n++){var r=tl[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Jt!==null&&gr(Jt,e),Zt!==null&&gr(Zt,e),en!==null&&gr(en,e),pr.forEach(t),mr.forEach(t),n=0;n<tn.length;n++)r=tn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<tn.length&&(n=tn[0],n.blockedOn===null);)Es(n),n.blockedOn===null&&tn.shift()}var Fn=me.ReactCurrentBatchConfig,rl=!0;function _u(e,t,n,r){var a=ke,i=Fn.transition;Fn.transition=null;try{ke=1,xa(e,t,n,r)}finally{ke=a,Fn.transition=i}}function Tu(e,t,n,r){var a=ke,i=Fn.transition;Fn.transition=null;try{ke=4,xa(e,t,n,r)}finally{ke=a,Fn.transition=i}}function xa(e,t,n,r){if(rl){var a=wa(e,t,n,r);if(a===null)Aa(e,t,r,ll,n),zs(e,r);else if(Mu(a,e,t,n,r))r.stopPropagation();else if(zs(e,r),t&4&&-1<Eu.indexOf(e)){for(;a!==null;){var i=Mr(a);if(i!==null&&Ns(i),i=wa(e,t,n,r),i===null&&Aa(e,t,r,ll,n),i===a)break;a=i}a!==null&&r.stopPropagation()}else Aa(e,t,r,null,n)}}var ll=null;function wa(e,t,n,r){if(ll=null,e=oa(r),e=wn(e),e!==null)if(t=xn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ps(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ll=e,null}function Ps(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(xu()){case pa:return 1;case xs:return 4;case Yr:case wu:return 16;case ws:return 536870912;default:return 16}default:return 16}}var nn=null,ka=null,al=null;function _s(){if(al)return al;var e,t=ka,n=t.length,r,a="value"in nn?nn.value:nn.textContent,i=a.length;for(e=0;e<n&&t[e]===a[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===a[i-r];r++);return al=a.slice(e,1<r?1-r:void 0)}function il(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function sl(){return!0}function Ts(){return!1}function mt(e){function t(n,r,a,i,s){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(i):i[c]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?sl:Ts,this.isPropagationStopped=Ts,this}return d(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=sl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=sl)},persist:function(){},isPersistent:sl}),t}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ja=mt(Dn),yr=d({},Dn,{view:0,detail:0}),Iu=mt(yr),Na,ba,xr,ol=d({},yr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ca,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xr&&(xr&&e.type==="mousemove"?(Na=e.screenX-xr.screenX,ba=e.screenY-xr.screenY):ba=Na=0,xr=e),Na)},movementY:function(e){return"movementY"in e?e.movementY:ba}}),Is=mt(ol),Ru=d({},ol,{dataTransfer:0}),Lu=mt(Ru),Ou=d({},yr,{relatedTarget:0}),Sa=mt(Ou),Au=d({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),Fu=mt(Au),Du=d({},Dn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),$u=mt(Du),Uu=d({},Dn,{data:0}),Rs=mt(Uu),Bu={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Wu={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Vu={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Hu(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Vu[e])?!!t[e]:!1}function Ca(){return Hu}var Qu=d({},yr,{key:function(e){if(e.key){var t=Bu[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=il(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Wu[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ca,charCode:function(e){return e.type==="keypress"?il(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?il(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ku=mt(Qu),qu=d({},ol,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ls=mt(qu),Gu=d({},yr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ca}),Yu=mt(Gu),Xu=d({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ju=mt(Xu),Zu=d({},ol,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ed=mt(Zu),td=[9,13,27,32],za=F&&"CompositionEvent"in window,wr=null;F&&"documentMode"in document&&(wr=document.documentMode);var nd=F&&"TextEvent"in window&&!wr,Os=F&&(!za||wr&&8<wr&&11>=wr),As=" ",Fs=!1;function Ds(e,t){switch(e){case"keyup":return td.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $s(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var $n=!1;function rd(e,t){switch(e){case"compositionend":return $s(t);case"keypress":return t.which!==32?null:(Fs=!0,As);case"textInput":return e=t.data,e===As&&Fs?null:e;default:return null}}function ld(e,t){if($n)return e==="compositionend"||!za&&Ds(e,t)?(e=_s(),al=ka=nn=null,$n=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Os&&t.locale!=="ko"?null:t.data;default:return null}}var ad={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Us(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ad[e.type]:t==="textarea"}function Bs(e,t,n,r){os(r),t=pl(t,"onChange"),0<t.length&&(n=new ja("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var kr=null,jr=null;function id(e){io(e,0)}function cl(e){var t=Hn(e);if(je(t))return e}function sd(e,t){if(e==="change")return t}var Ws=!1;if(F){var Ea;if(F){var Ma="oninput"in document;if(!Ma){var Vs=document.createElement("div");Vs.setAttribute("oninput","return;"),Ma=typeof Vs.oninput=="function"}Ea=Ma}else Ea=!1;Ws=Ea&&(!document.documentMode||9<document.documentMode)}function Hs(){kr&&(kr.detachEvent("onpropertychange",Qs),jr=kr=null)}function Qs(e){if(e.propertyName==="value"&&cl(jr)){var t=[];Bs(t,jr,e,oa(e)),fs(id,t)}}function od(e,t,n){e==="focusin"?(Hs(),kr=t,jr=n,kr.attachEvent("onpropertychange",Qs)):e==="focusout"&&Hs()}function cd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return cl(jr)}function ud(e,t){if(e==="click")return cl(t)}function dd(e,t){if(e==="input"||e==="change")return cl(t)}function fd(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var zt=typeof Object.is=="function"?Object.is:fd;function Nr(e,t){if(zt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!_.call(t,a)||!zt(e[a],t[a]))return!1}return!0}function Ks(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function qs(e,t){var n=Ks(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ks(n)}}function Gs(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Gs(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ys(){for(var e=window,t=w();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=w(e.document)}return t}function Pa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function pd(e){var t=Ys(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Gs(n.ownerDocument.documentElement,n)){if(r!==null&&Pa(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,i=Math.min(r.start,a);r=r.end===void 0?i:Math.min(r.end,a),!e.extend&&i>r&&(a=r,r=i,i=a),a=qs(n,i);var s=qs(n,r);a&&s&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var md=F&&"documentMode"in document&&11>=document.documentMode,Un=null,_a=null,br=null,Ta=!1;function Xs(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ta||Un==null||Un!==w(r)||(r=Un,"selectionStart"in r&&Pa(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),br&&Nr(br,r)||(br=r,r=pl(_a,"onSelect"),0<r.length&&(t=new ja("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Un)))}function ul(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Bn={animationend:ul("Animation","AnimationEnd"),animationiteration:ul("Animation","AnimationIteration"),animationstart:ul("Animation","AnimationStart"),transitionend:ul("Transition","TransitionEnd")},Ia={},Js={};F&&(Js=document.createElement("div").style,"AnimationEvent"in window||(delete Bn.animationend.animation,delete Bn.animationiteration.animation,delete Bn.animationstart.animation),"TransitionEvent"in window||delete Bn.transitionend.transition);function dl(e){if(Ia[e])return Ia[e];if(!Bn[e])return e;var t=Bn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Js)return Ia[e]=t[n];return e}var Zs=dl("animationend"),eo=dl("animationiteration"),to=dl("animationstart"),no=dl("transitionend"),ro=new Map,lo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function rn(e,t){ro.set(e,t),C(t,[e])}for(var Ra=0;Ra<lo.length;Ra++){var La=lo[Ra],hd=La.toLowerCase(),gd=La[0].toUpperCase()+La.slice(1);rn(hd,"on"+gd)}rn(Zs,"onAnimationEnd"),rn(eo,"onAnimationIteration"),rn(to,"onAnimationStart"),rn("dblclick","onDoubleClick"),rn("focusin","onFocus"),rn("focusout","onBlur"),rn(no,"onTransitionEnd"),V("onMouseEnter",["mouseout","mouseover"]),V("onMouseLeave",["mouseout","mouseover"]),V("onPointerEnter",["pointerout","pointerover"]),V("onPointerLeave",["pointerout","pointerover"]),C("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),C("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),C("onBeforeInput",["compositionend","keypress","textInput","paste"]),C("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Sr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),vd=new Set("cancel close invalid load scroll toggle".split(" ").concat(Sr));function ao(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,hu(r,t,void 0,e),e.currentTarget=null}function io(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var s=r.length-1;0<=s;s--){var c=r[s],u=c.instance,x=c.currentTarget;if(c=c.listener,u!==i&&a.isPropagationStopped())break e;ao(a,c,x),i=u}else for(s=0;s<r.length;s++){if(c=r[s],u=c.instance,x=c.currentTarget,c=c.listener,u!==i&&a.isPropagationStopped())break e;ao(a,c,x),i=u}}}if(Gr)throw e=fa,Gr=!1,fa=null,e}function Ce(e,t){var n=t[Wa];n===void 0&&(n=t[Wa]=new Set);var r=e+"__bubble";n.has(r)||(so(t,e,2,!1),n.add(r))}function Oa(e,t,n){var r=0;t&&(r|=4),so(n,e,r,t)}var fl="_reactListening"+Math.random().toString(36).slice(2);function Cr(e){if(!e[fl]){e[fl]=!0,K.forEach(function(n){n!=="selectionchange"&&(vd.has(n)||Oa(n,!1,e),Oa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[fl]||(t[fl]=!0,Oa("selectionchange",!1,t))}}function so(e,t,n,r){switch(Ps(t)){case 1:var a=_u;break;case 4:a=Tu;break;default:a=xa}n=a.bind(null,t,n,e),a=void 0,!da||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Aa(e,t,n,r,a){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===a||c.nodeType===8&&c.parentNode===a)break;if(s===4)for(s=r.return;s!==null;){var u=s.tag;if((u===3||u===4)&&(u=s.stateNode.containerInfo,u===a||u.nodeType===8&&u.parentNode===a))return;s=s.return}for(;c!==null;){if(s=wn(c),s===null)return;if(u=s.tag,u===5||u===6){r=i=s;continue e}c=c.parentNode}}r=r.return}fs(function(){var x=i,j=oa(n),N=[];e:{var k=ro.get(e);if(k!==void 0){var A=ja,W=e;switch(e){case"keypress":if(il(n)===0)break e;case"keydown":case"keyup":A=Ku;break;case"focusin":W="focus",A=Sa;break;case"focusout":W="blur",A=Sa;break;case"beforeblur":case"afterblur":A=Sa;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=Is;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=Lu;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=Yu;break;case Zs:case eo:case to:A=Fu;break;case no:A=Ju;break;case"scroll":A=Iu;break;case"wheel":A=ed;break;case"copy":case"cut":case"paste":A=$u;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=Ls}var Q=(t&4)!==0,Ue=!Q&&e==="scroll",g=Q?k!==null?k+"Capture":null:k;Q=[];for(var p=x,y;p!==null;){y=p;var S=y.stateNode;if(y.tag===5&&S!==null&&(y=S,g!==null&&(S=or(p,g),S!=null&&Q.push(zr(p,S,y)))),Ue)break;p=p.return}0<Q.length&&(k=new A(k,W,null,n,j),N.push({event:k,listeners:Q}))}}if((t&7)===0){e:{if(k=e==="mouseover"||e==="pointerover",A=e==="mouseout"||e==="pointerout",k&&n!==sa&&(W=n.relatedTarget||n.fromElement)&&(wn(W)||W[Ut]))break e;if((A||k)&&(k=j.window===j?j:(k=j.ownerDocument)?k.defaultView||k.parentWindow:window,A?(W=n.relatedTarget||n.toElement,A=x,W=W?wn(W):null,W!==null&&(Ue=xn(W),W!==Ue||W.tag!==5&&W.tag!==6)&&(W=null)):(A=null,W=x),A!==W)){if(Q=Is,S="onMouseLeave",g="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(Q=Ls,S="onPointerLeave",g="onPointerEnter",p="pointer"),Ue=A==null?k:Hn(A),y=W==null?k:Hn(W),k=new Q(S,p+"leave",A,n,j),k.target=Ue,k.relatedTarget=y,S=null,wn(j)===x&&(Q=new Q(g,p+"enter",W,n,j),Q.target=y,Q.relatedTarget=Ue,S=Q),Ue=S,A&&W)t:{for(Q=A,g=W,p=0,y=Q;y;y=Wn(y))p++;for(y=0,S=g;S;S=Wn(S))y++;for(;0<p-y;)Q=Wn(Q),p--;for(;0<y-p;)g=Wn(g),y--;for(;p--;){if(Q===g||g!==null&&Q===g.alternate)break t;Q=Wn(Q),g=Wn(g)}Q=null}else Q=null;A!==null&&oo(N,k,A,Q,!1),W!==null&&Ue!==null&&oo(N,Ue,W,Q,!0)}}e:{if(k=x?Hn(x):window,A=k.nodeName&&k.nodeName.toLowerCase(),A==="select"||A==="input"&&k.type==="file")var q=sd;else if(Us(k))if(Ws)q=dd;else{q=cd;var ee=od}else(A=k.nodeName)&&A.toLowerCase()==="input"&&(k.type==="checkbox"||k.type==="radio")&&(q=ud);if(q&&(q=q(e,x))){Bs(N,q,n,j);break e}ee&&ee(e,k,x),e==="focusout"&&(ee=k._wrapperState)&&ee.controlled&&k.type==="number"&&st(k,"number",k.value)}switch(ee=x?Hn(x):window,e){case"focusin":(Us(ee)||ee.contentEditable==="true")&&(Un=ee,_a=x,br=null);break;case"focusout":br=_a=Un=null;break;case"mousedown":Ta=!0;break;case"contextmenu":case"mouseup":case"dragend":Ta=!1,Xs(N,n,j);break;case"selectionchange":if(md)break;case"keydown":case"keyup":Xs(N,n,j)}var te;if(za)e:{switch(e){case"compositionstart":var le="onCompositionStart";break e;case"compositionend":le="onCompositionEnd";break e;case"compositionupdate":le="onCompositionUpdate";break e}le=void 0}else $n?Ds(e,n)&&(le="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(le="onCompositionStart");le&&(Os&&n.locale!=="ko"&&($n||le!=="onCompositionStart"?le==="onCompositionEnd"&&$n&&(te=_s()):(nn=j,ka="value"in nn?nn.value:nn.textContent,$n=!0)),ee=pl(x,le),0<ee.length&&(le=new Rs(le,e,null,n,j),N.push({event:le,listeners:ee}),te?le.data=te:(te=$s(n),te!==null&&(le.data=te)))),(te=nd?rd(e,n):ld(e,n))&&(x=pl(x,"onBeforeInput"),0<x.length&&(j=new Rs("onBeforeInput","beforeinput",null,n,j),N.push({event:j,listeners:x}),j.data=te))}io(N,t)})}function zr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function pl(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,i=a.stateNode;a.tag===5&&i!==null&&(a=i,i=or(e,n),i!=null&&r.unshift(zr(e,i,a)),i=or(e,t),i!=null&&r.push(zr(e,i,a))),e=e.return}return r}function Wn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function oo(e,t,n,r,a){for(var i=t._reactName,s=[];n!==null&&n!==r;){var c=n,u=c.alternate,x=c.stateNode;if(u!==null&&u===r)break;c.tag===5&&x!==null&&(c=x,a?(u=or(n,i),u!=null&&s.unshift(zr(n,u,c))):a||(u=or(n,i),u!=null&&s.push(zr(n,u,c)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var yd=/\r\n?/g,xd=/\u0000|\uFFFD/g;function co(e){return(typeof e=="string"?e:""+e).replace(yd,`
`).replace(xd,"")}function ml(e,t,n){if(t=co(t),co(e)!==t&&n)throw Error(f(425))}function hl(){}var Fa=null,Da=null;function $a(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ua=typeof setTimeout=="function"?setTimeout:void 0,wd=typeof clearTimeout=="function"?clearTimeout:void 0,uo=typeof Promise=="function"?Promise:void 0,kd=typeof queueMicrotask=="function"?queueMicrotask:typeof uo<"u"?function(e){return uo.resolve(null).then(e).catch(jd)}:Ua;function jd(e){setTimeout(function(){throw e})}function Ba(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),vr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);vr(t)}function ln(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function fo(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Vn=Math.random().toString(36).slice(2),Lt="__reactFiber$"+Vn,Er="__reactProps$"+Vn,Ut="__reactContainer$"+Vn,Wa="__reactEvents$"+Vn,Nd="__reactListeners$"+Vn,bd="__reactHandles$"+Vn;function wn(e){var t=e[Lt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ut]||n[Lt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fo(e);e!==null;){if(n=e[Lt])return n;e=fo(e)}return t}e=n,n=e.parentNode}return null}function Mr(e){return e=e[Lt]||e[Ut],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Hn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(f(33))}function gl(e){return e[Er]||null}var Va=[],Qn=-1;function an(e){return{current:e}}function ze(e){0>Qn||(e.current=Va[Qn],Va[Qn]=null,Qn--)}function Se(e,t){Qn++,Va[Qn]=e.current,e.current=t}var sn={},Ze=an(sn),ot=an(!1),kn=sn;function Kn(e,t){var n=e.type.contextTypes;if(!n)return sn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},i;for(i in n)a[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ct(e){return e=e.childContextTypes,e!=null}function vl(){ze(ot),ze(Ze)}function po(e,t,n){if(Ze.current!==sn)throw Error(f(168));Se(Ze,t),Se(ot,n)}function mo(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(f(108,T(e)||"Unknown",a));return d({},n,r)}function yl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||sn,kn=Ze.current,Se(Ze,e),Se(ot,ot.current),!0}function ho(e,t,n){var r=e.stateNode;if(!r)throw Error(f(169));n?(e=mo(e,t,kn),r.__reactInternalMemoizedMergedChildContext=e,ze(ot),ze(Ze),Se(Ze,e)):ze(ot),Se(ot,n)}var Bt=null,xl=!1,Ha=!1;function go(e){Bt===null?Bt=[e]:Bt.push(e)}function Sd(e){xl=!0,go(e)}function on(){if(!Ha&&Bt!==null){Ha=!0;var e=0,t=ke;try{var n=Bt;for(ke=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Bt=null,xl=!1}catch(a){throw Bt!==null&&(Bt=Bt.slice(e+1)),vs(pa,on),a}finally{ke=t,Ha=!1}}return null}var qn=[],Gn=0,wl=null,kl=0,yt=[],xt=0,jn=null,Wt=1,Vt="";function Nn(e,t){qn[Gn++]=kl,qn[Gn++]=wl,wl=e,kl=t}function vo(e,t,n){yt[xt++]=Wt,yt[xt++]=Vt,yt[xt++]=jn,jn=e;var r=Wt;e=Vt;var a=32-Ct(r)-1;r&=~(1<<a),n+=1;var i=32-Ct(t)+a;if(30<i){var s=a-a%5;i=(r&(1<<s)-1).toString(32),r>>=s,a-=s,Wt=1<<32-Ct(t)+a|n<<a|r,Vt=i+e}else Wt=1<<i|n<<a|r,Vt=e}function Qa(e){e.return!==null&&(Nn(e,1),vo(e,1,0))}function Ka(e){for(;e===wl;)wl=qn[--Gn],qn[Gn]=null,kl=qn[--Gn],qn[Gn]=null;for(;e===jn;)jn=yt[--xt],yt[xt]=null,Vt=yt[--xt],yt[xt]=null,Wt=yt[--xt],yt[xt]=null}var ht=null,gt=null,Pe=!1,Et=null;function yo(e,t){var n=Nt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function xo(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ht=e,gt=ln(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ht=e,gt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=jn!==null?{id:Wt,overflow:Vt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Nt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ht=e,gt=null,!0):!1;default:return!1}}function qa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ga(e){if(Pe){var t=gt;if(t){var n=t;if(!xo(e,t)){if(qa(e))throw Error(f(418));t=ln(n.nextSibling);var r=ht;t&&xo(e,t)?yo(r,n):(e.flags=e.flags&-4097|2,Pe=!1,ht=e)}}else{if(qa(e))throw Error(f(418));e.flags=e.flags&-4097|2,Pe=!1,ht=e}}}function wo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ht=e}function jl(e){if(e!==ht)return!1;if(!Pe)return wo(e),Pe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!$a(e.type,e.memoizedProps)),t&&(t=gt)){if(qa(e))throw ko(),Error(f(418));for(;t;)yo(e,t),t=ln(t.nextSibling)}if(wo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){gt=ln(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}gt=null}}else gt=ht?ln(e.stateNode.nextSibling):null;return!0}function ko(){for(var e=gt;e;)e=ln(e.nextSibling)}function Yn(){gt=ht=null,Pe=!1}function Ya(e){Et===null?Et=[e]:Et.push(e)}var Cd=me.ReactCurrentBatchConfig;function Pr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(f(309));var r=n.stateNode}if(!r)throw Error(f(147,e));var a=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(s){var c=a.refs;s===null?delete c[i]:c[i]=s},t._stringRef=i,t)}if(typeof e!="string")throw Error(f(284));if(!n._owner)throw Error(f(290,e))}return e}function Nl(e,t){throw e=Object.prototype.toString.call(t),Error(f(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function jo(e){var t=e._init;return t(e._payload)}function No(e){function t(g,p){if(e){var y=g.deletions;y===null?(g.deletions=[p],g.flags|=16):y.push(p)}}function n(g,p){if(!e)return null;for(;p!==null;)t(g,p),p=p.sibling;return null}function r(g,p){for(g=new Map;p!==null;)p.key!==null?g.set(p.key,p):g.set(p.index,p),p=p.sibling;return g}function a(g,p){return g=gn(g,p),g.index=0,g.sibling=null,g}function i(g,p,y){return g.index=y,e?(y=g.alternate,y!==null?(y=y.index,y<p?(g.flags|=2,p):y):(g.flags|=2,p)):(g.flags|=1048576,p)}function s(g){return e&&g.alternate===null&&(g.flags|=2),g}function c(g,p,y,S){return p===null||p.tag!==6?(p=Ui(y,g.mode,S),p.return=g,p):(p=a(p,y),p.return=g,p)}function u(g,p,y,S){var q=y.type;return q===ye?j(g,p,y.props.children,S,y.key):p!==null&&(p.elementType===q||typeof q=="object"&&q!==null&&q.$$typeof===Le&&jo(q)===p.type)?(S=a(p,y.props),S.ref=Pr(g,p,y),S.return=g,S):(S=Kl(y.type,y.key,y.props,null,g.mode,S),S.ref=Pr(g,p,y),S.return=g,S)}function x(g,p,y,S){return p===null||p.tag!==4||p.stateNode.containerInfo!==y.containerInfo||p.stateNode.implementation!==y.implementation?(p=Bi(y,g.mode,S),p.return=g,p):(p=a(p,y.children||[]),p.return=g,p)}function j(g,p,y,S,q){return p===null||p.tag!==7?(p=_n(y,g.mode,S,q),p.return=g,p):(p=a(p,y),p.return=g,p)}function N(g,p,y){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Ui(""+p,g.mode,y),p.return=g,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case we:return y=Kl(p.type,p.key,p.props,null,g.mode,y),y.ref=Pr(g,null,p),y.return=g,y;case he:return p=Bi(p,g.mode,y),p.return=g,p;case Le:var S=p._init;return N(g,S(p._payload),y)}if(Ne(p)||X(p))return p=_n(p,g.mode,y,null),p.return=g,p;Nl(g,p)}return null}function k(g,p,y,S){var q=p!==null?p.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return q!==null?null:c(g,p,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case we:return y.key===q?u(g,p,y,S):null;case he:return y.key===q?x(g,p,y,S):null;case Le:return q=y._init,k(g,p,q(y._payload),S)}if(Ne(y)||X(y))return q!==null?null:j(g,p,y,S,null);Nl(g,y)}return null}function A(g,p,y,S,q){if(typeof S=="string"&&S!==""||typeof S=="number")return g=g.get(y)||null,c(p,g,""+S,q);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case we:return g=g.get(S.key===null?y:S.key)||null,u(p,g,S,q);case he:return g=g.get(S.key===null?y:S.key)||null,x(p,g,S,q);case Le:var ee=S._init;return A(g,p,y,ee(S._payload),q)}if(Ne(S)||X(S))return g=g.get(y)||null,j(p,g,S,q,null);Nl(p,S)}return null}function W(g,p,y,S){for(var q=null,ee=null,te=p,le=p=0,Ye=null;te!==null&&le<y.length;le++){te.index>le?(Ye=te,te=null):Ye=te.sibling;var ve=k(g,te,y[le],S);if(ve===null){te===null&&(te=Ye);break}e&&te&&ve.alternate===null&&t(g,te),p=i(ve,p,le),ee===null?q=ve:ee.sibling=ve,ee=ve,te=Ye}if(le===y.length)return n(g,te),Pe&&Nn(g,le),q;if(te===null){for(;le<y.length;le++)te=N(g,y[le],S),te!==null&&(p=i(te,p,le),ee===null?q=te:ee.sibling=te,ee=te);return Pe&&Nn(g,le),q}for(te=r(g,te);le<y.length;le++)Ye=A(te,g,le,y[le],S),Ye!==null&&(e&&Ye.alternate!==null&&te.delete(Ye.key===null?le:Ye.key),p=i(Ye,p,le),ee===null?q=Ye:ee.sibling=Ye,ee=Ye);return e&&te.forEach(function(vn){return t(g,vn)}),Pe&&Nn(g,le),q}function Q(g,p,y,S){var q=X(y);if(typeof q!="function")throw Error(f(150));if(y=q.call(y),y==null)throw Error(f(151));for(var ee=q=null,te=p,le=p=0,Ye=null,ve=y.next();te!==null&&!ve.done;le++,ve=y.next()){te.index>le?(Ye=te,te=null):Ye=te.sibling;var vn=k(g,te,ve.value,S);if(vn===null){te===null&&(te=Ye);break}e&&te&&vn.alternate===null&&t(g,te),p=i(vn,p,le),ee===null?q=vn:ee.sibling=vn,ee=vn,te=Ye}if(ve.done)return n(g,te),Pe&&Nn(g,le),q;if(te===null){for(;!ve.done;le++,ve=y.next())ve=N(g,ve.value,S),ve!==null&&(p=i(ve,p,le),ee===null?q=ve:ee.sibling=ve,ee=ve);return Pe&&Nn(g,le),q}for(te=r(g,te);!ve.done;le++,ve=y.next())ve=A(te,g,le,ve.value,S),ve!==null&&(e&&ve.alternate!==null&&te.delete(ve.key===null?le:ve.key),p=i(ve,p,le),ee===null?q=ve:ee.sibling=ve,ee=ve);return e&&te.forEach(function(af){return t(g,af)}),Pe&&Nn(g,le),q}function Ue(g,p,y,S){if(typeof y=="object"&&y!==null&&y.type===ye&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case we:e:{for(var q=y.key,ee=p;ee!==null;){if(ee.key===q){if(q=y.type,q===ye){if(ee.tag===7){n(g,ee.sibling),p=a(ee,y.props.children),p.return=g,g=p;break e}}else if(ee.elementType===q||typeof q=="object"&&q!==null&&q.$$typeof===Le&&jo(q)===ee.type){n(g,ee.sibling),p=a(ee,y.props),p.ref=Pr(g,ee,y),p.return=g,g=p;break e}n(g,ee);break}else t(g,ee);ee=ee.sibling}y.type===ye?(p=_n(y.props.children,g.mode,S,y.key),p.return=g,g=p):(S=Kl(y.type,y.key,y.props,null,g.mode,S),S.ref=Pr(g,p,y),S.return=g,g=S)}return s(g);case he:e:{for(ee=y.key;p!==null;){if(p.key===ee)if(p.tag===4&&p.stateNode.containerInfo===y.containerInfo&&p.stateNode.implementation===y.implementation){n(g,p.sibling),p=a(p,y.children||[]),p.return=g,g=p;break e}else{n(g,p);break}else t(g,p);p=p.sibling}p=Bi(y,g.mode,S),p.return=g,g=p}return s(g);case Le:return ee=y._init,Ue(g,p,ee(y._payload),S)}if(Ne(y))return W(g,p,y,S);if(X(y))return Q(g,p,y,S);Nl(g,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,p!==null&&p.tag===6?(n(g,p.sibling),p=a(p,y),p.return=g,g=p):(n(g,p),p=Ui(y,g.mode,S),p.return=g,g=p),s(g)):n(g,p)}return Ue}var Xn=No(!0),bo=No(!1),bl=an(null),Sl=null,Jn=null,Xa=null;function Ja(){Xa=Jn=Sl=null}function Za(e){var t=bl.current;ze(bl),e._currentValue=t}function ei(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Zn(e,t){Sl=e,Xa=Jn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(ut=!0),e.firstContext=null)}function wt(e){var t=e._currentValue;if(Xa!==e)if(e={context:e,memoizedValue:t,next:null},Jn===null){if(Sl===null)throw Error(f(308));Jn=e,Sl.dependencies={lanes:0,firstContext:e}}else Jn=Jn.next=e;return t}var bn=null;function ti(e){bn===null?bn=[e]:bn.push(e)}function So(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,ti(t)):(n.next=a.next,a.next=n),t.interleaved=n,Ht(e,r)}function Ht(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var cn=!1;function ni(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Co(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Qt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function un(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(pe&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Ht(e,n)}return a=r.interleaved,a===null?(t.next=t,ti(r)):(t.next=a.next,a.next=t),r.interleaved=t,Ht(e,n)}function Cl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ga(e,n)}}function zo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?a=i=s:i=i.next=s,n=n.next}while(n!==null);i===null?a=i=t:i=i.next=t}else a=i=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function zl(e,t,n,r){var a=e.updateQueue;cn=!1;var i=a.firstBaseUpdate,s=a.lastBaseUpdate,c=a.shared.pending;if(c!==null){a.shared.pending=null;var u=c,x=u.next;u.next=null,s===null?i=x:s.next=x,s=u;var j=e.alternate;j!==null&&(j=j.updateQueue,c=j.lastBaseUpdate,c!==s&&(c===null?j.firstBaseUpdate=x:c.next=x,j.lastBaseUpdate=u))}if(i!==null){var N=a.baseState;s=0,j=x=u=null,c=i;do{var k=c.lane,A=c.eventTime;if((r&k)===k){j!==null&&(j=j.next={eventTime:A,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var W=e,Q=c;switch(k=t,A=n,Q.tag){case 1:if(W=Q.payload,typeof W=="function"){N=W.call(A,N,k);break e}N=W;break e;case 3:W.flags=W.flags&-65537|128;case 0:if(W=Q.payload,k=typeof W=="function"?W.call(A,N,k):W,k==null)break e;N=d({},N,k);break e;case 2:cn=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,k=a.effects,k===null?a.effects=[c]:k.push(c))}else A={eventTime:A,lane:k,tag:c.tag,payload:c.payload,callback:c.callback,next:null},j===null?(x=j=A,u=N):j=j.next=A,s|=k;if(c=c.next,c===null){if(c=a.shared.pending,c===null)break;k=c,c=k.next,k.next=null,a.lastBaseUpdate=k,a.shared.pending=null}}while(!0);if(j===null&&(u=N),a.baseState=u,a.firstBaseUpdate=x,a.lastBaseUpdate=j,t=a.shared.interleaved,t!==null){a=t;do s|=a.lane,a=a.next;while(a!==t)}else i===null&&(a.shared.lanes=0);zn|=s,e.lanes=s,e.memoizedState=N}}function Eo(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(f(191,a));a.call(r)}}}var _r={},Ot=an(_r),Tr=an(_r),Ir=an(_r);function Sn(e){if(e===_r)throw Error(f(174));return e}function ri(e,t){switch(Se(Ir,t),Se(Tr,e),Se(Ot,_r),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Dt(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Dt(t,e)}ze(Ot),Se(Ot,t)}function er(){ze(Ot),ze(Tr),ze(Ir)}function Mo(e){Sn(Ir.current);var t=Sn(Ot.current),n=Dt(t,e.type);t!==n&&(Se(Tr,e),Se(Ot,n))}function li(e){Tr.current===e&&(ze(Ot),ze(Tr))}var Te=an(0);function El(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ai=[];function ii(){for(var e=0;e<ai.length;e++)ai[e]._workInProgressVersionPrimary=null;ai.length=0}var Ml=me.ReactCurrentDispatcher,si=me.ReactCurrentBatchConfig,Cn=0,Ie=null,He=null,qe=null,Pl=!1,Rr=!1,Lr=0,zd=0;function et(){throw Error(f(321))}function oi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!zt(e[n],t[n]))return!1;return!0}function ci(e,t,n,r,a,i){if(Cn=i,Ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ml.current=e===null||e.memoizedState===null?_d:Td,e=n(r,a),Rr){i=0;do{if(Rr=!1,Lr=0,25<=i)throw Error(f(301));i+=1,qe=He=null,t.updateQueue=null,Ml.current=Id,e=n(r,a)}while(Rr)}if(Ml.current=Il,t=He!==null&&He.next!==null,Cn=0,qe=He=Ie=null,Pl=!1,t)throw Error(f(300));return e}function ui(){var e=Lr!==0;return Lr=0,e}function At(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qe===null?Ie.memoizedState=qe=e:qe=qe.next=e,qe}function kt(){if(He===null){var e=Ie.alternate;e=e!==null?e.memoizedState:null}else e=He.next;var t=qe===null?Ie.memoizedState:qe.next;if(t!==null)qe=t,He=e;else{if(e===null)throw Error(f(310));He=e,e={memoizedState:He.memoizedState,baseState:He.baseState,baseQueue:He.baseQueue,queue:He.queue,next:null},qe===null?Ie.memoizedState=qe=e:qe=qe.next=e}return qe}function Or(e,t){return typeof t=="function"?t(e):t}function di(e){var t=kt(),n=t.queue;if(n===null)throw Error(f(311));n.lastRenderedReducer=e;var r=He,a=r.baseQueue,i=n.pending;if(i!==null){if(a!==null){var s=a.next;a.next=i.next,i.next=s}r.baseQueue=a=i,n.pending=null}if(a!==null){i=a.next,r=r.baseState;var c=s=null,u=null,x=i;do{var j=x.lane;if((Cn&j)===j)u!==null&&(u=u.next={lane:0,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),r=x.hasEagerState?x.eagerState:e(r,x.action);else{var N={lane:j,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null};u===null?(c=u=N,s=r):u=u.next=N,Ie.lanes|=j,zn|=j}x=x.next}while(x!==null&&x!==i);u===null?s=r:u.next=c,zt(r,t.memoizedState)||(ut=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do i=a.lane,Ie.lanes|=i,zn|=i,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function fi(e){var t=kt(),n=t.queue;if(n===null)throw Error(f(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,i=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do i=e(i,s.action),s=s.next;while(s!==a);zt(i,t.memoizedState)||(ut=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Po(){}function _o(e,t){var n=Ie,r=kt(),a=t(),i=!zt(r.memoizedState,a);if(i&&(r.memoizedState=a,ut=!0),r=r.queue,pi(Ro.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||qe!==null&&qe.memoizedState.tag&1){if(n.flags|=2048,Ar(9,Io.bind(null,n,r,a,t),void 0,null),Ge===null)throw Error(f(349));(Cn&30)!==0||To(n,t,a)}return a}function To(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ie.updateQueue,t===null?(t={lastEffect:null,stores:null},Ie.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Io(e,t,n,r){t.value=n,t.getSnapshot=r,Lo(t)&&Oo(e)}function Ro(e,t,n){return n(function(){Lo(t)&&Oo(e)})}function Lo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!zt(e,n)}catch{return!0}}function Oo(e){var t=Ht(e,1);t!==null&&Tt(t,e,1,-1)}function Ao(e){var t=At();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Or,lastRenderedState:e},t.queue=e,e=e.dispatch=Pd.bind(null,Ie,e),[t.memoizedState,e]}function Ar(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ie.updateQueue,t===null?(t={lastEffect:null,stores:null},Ie.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Fo(){return kt().memoizedState}function _l(e,t,n,r){var a=At();Ie.flags|=e,a.memoizedState=Ar(1|t,n,void 0,r===void 0?null:r)}function Tl(e,t,n,r){var a=kt();r=r===void 0?null:r;var i=void 0;if(He!==null){var s=He.memoizedState;if(i=s.destroy,r!==null&&oi(r,s.deps)){a.memoizedState=Ar(t,n,i,r);return}}Ie.flags|=e,a.memoizedState=Ar(1|t,n,i,r)}function Do(e,t){return _l(8390656,8,e,t)}function pi(e,t){return Tl(2048,8,e,t)}function $o(e,t){return Tl(4,2,e,t)}function Uo(e,t){return Tl(4,4,e,t)}function Bo(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Wo(e,t,n){return n=n!=null?n.concat([e]):null,Tl(4,4,Bo.bind(null,t,e),n)}function mi(){}function Vo(e,t){var n=kt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&oi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ho(e,t){var n=kt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&oi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Qo(e,t,n){return(Cn&21)===0?(e.baseState&&(e.baseState=!1,ut=!0),e.memoizedState=n):(zt(n,t)||(n=ks(),Ie.lanes|=n,zn|=n,e.baseState=!0),t)}function Ed(e,t){var n=ke;ke=n!==0&&4>n?n:4,e(!0);var r=si.transition;si.transition={};try{e(!1),t()}finally{ke=n,si.transition=r}}function Ko(){return kt().memoizedState}function Md(e,t,n){var r=mn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},qo(e))Go(t,n);else if(n=So(e,t,n,r),n!==null){var a=it();Tt(n,e,r,a),Yo(n,t,r)}}function Pd(e,t,n){var r=mn(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(qo(e))Go(t,a);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,c=i(s,n);if(a.hasEagerState=!0,a.eagerState=c,zt(c,s)){var u=t.interleaved;u===null?(a.next=a,ti(t)):(a.next=u.next,u.next=a),t.interleaved=a;return}}catch{}finally{}n=So(e,t,a,r),n!==null&&(a=it(),Tt(n,e,r,a),Yo(n,t,r))}}function qo(e){var t=e.alternate;return e===Ie||t!==null&&t===Ie}function Go(e,t){Rr=Pl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Yo(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ga(e,n)}}var Il={readContext:wt,useCallback:et,useContext:et,useEffect:et,useImperativeHandle:et,useInsertionEffect:et,useLayoutEffect:et,useMemo:et,useReducer:et,useRef:et,useState:et,useDebugValue:et,useDeferredValue:et,useTransition:et,useMutableSource:et,useSyncExternalStore:et,useId:et,unstable_isNewReconciler:!1},_d={readContext:wt,useCallback:function(e,t){return At().memoizedState=[e,t===void 0?null:t],e},useContext:wt,useEffect:Do,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,_l(4194308,4,Bo.bind(null,t,e),n)},useLayoutEffect:function(e,t){return _l(4194308,4,e,t)},useInsertionEffect:function(e,t){return _l(4,2,e,t)},useMemo:function(e,t){var n=At();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=At();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Md.bind(null,Ie,e),[r.memoizedState,e]},useRef:function(e){var t=At();return e={current:e},t.memoizedState=e},useState:Ao,useDebugValue:mi,useDeferredValue:function(e){return At().memoizedState=e},useTransition:function(){var e=Ao(!1),t=e[0];return e=Ed.bind(null,e[1]),At().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Ie,a=At();if(Pe){if(n===void 0)throw Error(f(407));n=n()}else{if(n=t(),Ge===null)throw Error(f(349));(Cn&30)!==0||To(r,t,n)}a.memoizedState=n;var i={value:n,getSnapshot:t};return a.queue=i,Do(Ro.bind(null,r,i,e),[e]),r.flags|=2048,Ar(9,Io.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=At(),t=Ge.identifierPrefix;if(Pe){var n=Vt,r=Wt;n=(r&~(1<<32-Ct(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Lr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=zd++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Td={readContext:wt,useCallback:Vo,useContext:wt,useEffect:pi,useImperativeHandle:Wo,useInsertionEffect:$o,useLayoutEffect:Uo,useMemo:Ho,useReducer:di,useRef:Fo,useState:function(){return di(Or)},useDebugValue:mi,useDeferredValue:function(e){var t=kt();return Qo(t,He.memoizedState,e)},useTransition:function(){var e=di(Or)[0],t=kt().memoizedState;return[e,t]},useMutableSource:Po,useSyncExternalStore:_o,useId:Ko,unstable_isNewReconciler:!1},Id={readContext:wt,useCallback:Vo,useContext:wt,useEffect:pi,useImperativeHandle:Wo,useInsertionEffect:$o,useLayoutEffect:Uo,useMemo:Ho,useReducer:fi,useRef:Fo,useState:function(){return fi(Or)},useDebugValue:mi,useDeferredValue:function(e){var t=kt();return He===null?t.memoizedState=e:Qo(t,He.memoizedState,e)},useTransition:function(){var e=fi(Or)[0],t=kt().memoizedState;return[e,t]},useMutableSource:Po,useSyncExternalStore:_o,useId:Ko,unstable_isNewReconciler:!1};function Mt(e,t){if(e&&e.defaultProps){t=d({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function hi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:d({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Rl={isMounted:function(e){return(e=e._reactInternals)?xn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=it(),a=mn(e),i=Qt(r,a);i.payload=t,n!=null&&(i.callback=n),t=un(e,i,a),t!==null&&(Tt(t,e,a,r),Cl(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=it(),a=mn(e),i=Qt(r,a);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=un(e,i,a),t!==null&&(Tt(t,e,a,r),Cl(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=it(),r=mn(e),a=Qt(n,r);a.tag=2,t!=null&&(a.callback=t),t=un(e,a,r),t!==null&&(Tt(t,e,r,n),Cl(t,e,r))}};function Xo(e,t,n,r,a,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,s):t.prototype&&t.prototype.isPureReactComponent?!Nr(n,r)||!Nr(a,i):!0}function Jo(e,t,n){var r=!1,a=sn,i=t.contextType;return typeof i=="object"&&i!==null?i=wt(i):(a=ct(t)?kn:Ze.current,r=t.contextTypes,i=(r=r!=null)?Kn(e,a):sn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Rl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=i),t}function Zo(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Rl.enqueueReplaceState(t,t.state,null)}function gi(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},ni(e);var i=t.contextType;typeof i=="object"&&i!==null?a.context=wt(i):(i=ct(t)?kn:Ze.current,a.context=Kn(e,i)),a.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(hi(e,t,i,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&Rl.enqueueReplaceState(a,a.state,null),zl(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function tr(e,t){try{var n="",r=t;do n+=L(r),r=r.return;while(r);var a=n}catch(i){a=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:a,digest:null}}function vi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function yi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Rd=typeof WeakMap=="function"?WeakMap:Map;function ec(e,t,n){n=Qt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ul||(Ul=!0,Ii=r),yi(e,t)},n}function tc(e,t,n){n=Qt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){yi(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){yi(e,t),typeof r!="function"&&(fn===null?fn=new Set([this]):fn.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function nc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rd;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=qd.bind(null,e,t,n),t.then(e,e))}function rc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function lc(e,t,n,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Qt(-1,1),t.tag=2,un(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var Ld=me.ReactCurrentOwner,ut=!1;function at(e,t,n,r){t.child=e===null?bo(t,null,n,r):Xn(t,e.child,n,r)}function ac(e,t,n,r,a){n=n.render;var i=t.ref;return Zn(t,a),r=ci(e,t,n,r,i,a),n=ui(),e!==null&&!ut?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Kt(e,t,a)):(Pe&&n&&Qa(t),t.flags|=1,at(e,t,r,a),t.child)}function ic(e,t,n,r,a){if(e===null){var i=n.type;return typeof i=="function"&&!$i(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,sc(e,t,i,r,a)):(e=Kl(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,(e.lanes&a)===0){var s=i.memoizedProps;if(n=n.compare,n=n!==null?n:Nr,n(s,r)&&e.ref===t.ref)return Kt(e,t,a)}return t.flags|=1,e=gn(i,r),e.ref=t.ref,e.return=t,t.child=e}function sc(e,t,n,r,a){if(e!==null){var i=e.memoizedProps;if(Nr(i,r)&&e.ref===t.ref)if(ut=!1,t.pendingProps=r=i,(e.lanes&a)!==0)(e.flags&131072)!==0&&(ut=!0);else return t.lanes=e.lanes,Kt(e,t,a)}return xi(e,t,n,r,a)}function oc(e,t,n){var r=t.pendingProps,a=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Se(rr,vt),vt|=n;else{if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Se(rr,vt),vt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Se(rr,vt),vt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,Se(rr,vt),vt|=r;return at(e,t,a,n),t.child}function cc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function xi(e,t,n,r,a){var i=ct(n)?kn:Ze.current;return i=Kn(t,i),Zn(t,a),n=ci(e,t,n,r,i,a),r=ui(),e!==null&&!ut?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Kt(e,t,a)):(Pe&&r&&Qa(t),t.flags|=1,at(e,t,n,a),t.child)}function uc(e,t,n,r,a){if(ct(n)){var i=!0;yl(t)}else i=!1;if(Zn(t,a),t.stateNode===null)Ol(e,t),Jo(t,n,r),gi(t,n,r,a),r=!0;else if(e===null){var s=t.stateNode,c=t.memoizedProps;s.props=c;var u=s.context,x=n.contextType;typeof x=="object"&&x!==null?x=wt(x):(x=ct(n)?kn:Ze.current,x=Kn(t,x));var j=n.getDerivedStateFromProps,N=typeof j=="function"||typeof s.getSnapshotBeforeUpdate=="function";N||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(c!==r||u!==x)&&Zo(t,s,r,x),cn=!1;var k=t.memoizedState;s.state=k,zl(t,r,s,a),u=t.memoizedState,c!==r||k!==u||ot.current||cn?(typeof j=="function"&&(hi(t,n,j,r),u=t.memoizedState),(c=cn||Xo(t,n,c,r,k,u,x))?(N||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),s.props=r,s.state=u,s.context=x,r=c):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,Co(e,t),c=t.memoizedProps,x=t.type===t.elementType?c:Mt(t.type,c),s.props=x,N=t.pendingProps,k=s.context,u=n.contextType,typeof u=="object"&&u!==null?u=wt(u):(u=ct(n)?kn:Ze.current,u=Kn(t,u));var A=n.getDerivedStateFromProps;(j=typeof A=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(c!==N||k!==u)&&Zo(t,s,r,u),cn=!1,k=t.memoizedState,s.state=k,zl(t,r,s,a);var W=t.memoizedState;c!==N||k!==W||ot.current||cn?(typeof A=="function"&&(hi(t,n,A,r),W=t.memoizedState),(x=cn||Xo(t,n,x,r,k,W,u)||!1)?(j||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,W,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,W,u)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||c===e.memoizedProps&&k===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&k===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=W),s.props=r,s.state=W,s.context=u,r=x):(typeof s.componentDidUpdate!="function"||c===e.memoizedProps&&k===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&k===e.memoizedState||(t.flags|=1024),r=!1)}return wi(e,t,n,r,i,a)}function wi(e,t,n,r,a,i){cc(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return a&&ho(t,n,!1),Kt(e,t,i);r=t.stateNode,Ld.current=t;var c=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=Xn(t,e.child,null,i),t.child=Xn(t,null,c,i)):at(e,t,c,i),t.memoizedState=r.state,a&&ho(t,n,!0),t.child}function dc(e){var t=e.stateNode;t.pendingContext?po(e,t.pendingContext,t.pendingContext!==t.context):t.context&&po(e,t.context,!1),ri(e,t.containerInfo)}function fc(e,t,n,r,a){return Yn(),Ya(a),t.flags|=256,at(e,t,n,r),t.child}var ki={dehydrated:null,treeContext:null,retryLane:0};function ji(e){return{baseLanes:e,cachePool:null,transitions:null}}function pc(e,t,n){var r=t.pendingProps,a=Te.current,i=!1,s=(t.flags&128)!==0,c;if((c=s)||(c=e!==null&&e.memoizedState===null?!1:(a&2)!==0),c?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Se(Te,a&1),e===null)return Ga(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(s=r.children,e=r.fallback,i?(r=t.mode,i=t.child,s={mode:"hidden",children:s},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=s):i=ql(s,r,0,null),e=_n(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=ji(n),t.memoizedState=ki,e):Ni(t,s));if(a=e.memoizedState,a!==null&&(c=a.dehydrated,c!==null))return Od(e,t,s,r,c,a,n);if(i){i=r.fallback,s=t.mode,a=e.child,c=a.sibling;var u={mode:"hidden",children:r.children};return(s&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=gn(a,u),r.subtreeFlags=a.subtreeFlags&14680064),c!==null?i=gn(c,i):(i=_n(i,s,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,s=e.child.memoizedState,s=s===null?ji(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},i.memoizedState=s,i.childLanes=e.childLanes&~n,t.memoizedState=ki,r}return i=e.child,e=i.sibling,r=gn(i,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ni(e,t){return t=ql({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ll(e,t,n,r){return r!==null&&Ya(r),Xn(t,e.child,null,n),e=Ni(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Od(e,t,n,r,a,i,s){if(n)return t.flags&256?(t.flags&=-257,r=vi(Error(f(422))),Ll(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,a=t.mode,r=ql({mode:"visible",children:r.children},a,0,null),i=_n(i,a,s,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,(t.mode&1)!==0&&Xn(t,e.child,null,s),t.child.memoizedState=ji(s),t.memoizedState=ki,i);if((t.mode&1)===0)return Ll(e,t,s,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var c=r.dgst;return r=c,i=Error(f(419)),r=vi(i,r,void 0),Ll(e,t,s,r)}if(c=(s&e.childLanes)!==0,ut||c){if(r=Ge,r!==null){switch(s&-s){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|s))!==0?0:a,a!==0&&a!==i.retryLane&&(i.retryLane=a,Ht(e,a),Tt(r,e,a,-1))}return Di(),r=vi(Error(f(421))),Ll(e,t,s,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Gd.bind(null,e),a._reactRetry=t,null):(e=i.treeContext,gt=ln(a.nextSibling),ht=t,Pe=!0,Et=null,e!==null&&(yt[xt++]=Wt,yt[xt++]=Vt,yt[xt++]=jn,Wt=e.id,Vt=e.overflow,jn=t),t=Ni(t,r.children),t.flags|=4096,t)}function mc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ei(e.return,t,n)}function bi(e,t,n,r,a){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=a)}function hc(e,t,n){var r=t.pendingProps,a=r.revealOrder,i=r.tail;if(at(e,t,r.children,n),r=Te.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&mc(e,n,t);else if(e.tag===19)mc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Se(Te,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&El(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),bi(t,!1,a,n,i);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&El(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}bi(t,!0,n,null,i);break;case"together":bi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ol(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Kt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),zn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(f(153));if(t.child!==null){for(e=t.child,n=gn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=gn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ad(e,t,n){switch(t.tag){case 3:dc(t),Yn();break;case 5:Mo(t);break;case 1:ct(t.type)&&yl(t);break;case 4:ri(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;Se(bl,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Se(Te,Te.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?pc(e,t,n):(Se(Te,Te.current&1),e=Kt(e,t,n),e!==null?e.sibling:null);Se(Te,Te.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return hc(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Se(Te,Te.current),r)break;return null;case 22:case 23:return t.lanes=0,oc(e,t,n)}return Kt(e,t,n)}var gc,Si,vc,yc;gc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Si=function(){},vc=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,Sn(Ot.current);var i=null;switch(n){case"input":a=R(e,a),r=R(e,r),i=[];break;case"select":a=d({},a,{value:void 0}),r=d({},r,{value:void 0}),i=[];break;case"textarea":a=yn(e,a),r=yn(e,r),i=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=hl)}aa(n,r);var s;n=null;for(x in a)if(!r.hasOwnProperty(x)&&a.hasOwnProperty(x)&&a[x]!=null)if(x==="style"){var c=a[x];for(s in c)c.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else x!=="dangerouslySetInnerHTML"&&x!=="children"&&x!=="suppressContentEditableWarning"&&x!=="suppressHydrationWarning"&&x!=="autoFocus"&&(M.hasOwnProperty(x)?i||(i=[]):(i=i||[]).push(x,null));for(x in r){var u=r[x];if(c=a!=null?a[x]:void 0,r.hasOwnProperty(x)&&u!==c&&(u!=null||c!=null))if(x==="style")if(c){for(s in c)!c.hasOwnProperty(s)||u&&u.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in u)u.hasOwnProperty(s)&&c[s]!==u[s]&&(n||(n={}),n[s]=u[s])}else n||(i||(i=[]),i.push(x,n)),n=u;else x==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,c=c?c.__html:void 0,u!=null&&c!==u&&(i=i||[]).push(x,u)):x==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(x,""+u):x!=="suppressContentEditableWarning"&&x!=="suppressHydrationWarning"&&(M.hasOwnProperty(x)?(u!=null&&x==="onScroll"&&Ce("scroll",e),i||c===u||(i=[])):(i=i||[]).push(x,u))}n&&(i=i||[]).push("style",n);var x=i;(t.updateQueue=x)&&(t.flags|=4)}},yc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Fr(e,t){if(!Pe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function tt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Fd(e,t,n){var r=t.pendingProps;switch(Ka(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tt(t),null;case 1:return ct(t.type)&&vl(),tt(t),null;case 3:return r=t.stateNode,er(),ze(ot),ze(Ze),ii(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(jl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Et!==null&&(Oi(Et),Et=null))),Si(e,t),tt(t),null;case 5:li(t);var a=Sn(Ir.current);if(n=t.type,e!==null&&t.stateNode!=null)vc(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(f(166));return tt(t),null}if(e=Sn(Ot.current),jl(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Lt]=t,r[Er]=i,e=(t.mode&1)!==0,n){case"dialog":Ce("cancel",r),Ce("close",r);break;case"iframe":case"object":case"embed":Ce("load",r);break;case"video":case"audio":for(a=0;a<Sr.length;a++)Ce(Sr[a],r);break;case"source":Ce("error",r);break;case"img":case"image":case"link":Ce("error",r),Ce("load",r);break;case"details":Ce("toggle",r);break;case"input":ce(r,i),Ce("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Ce("invalid",r);break;case"textarea":It(r,i),Ce("invalid",r)}aa(n,i),a=null;for(var s in i)if(i.hasOwnProperty(s)){var c=i[s];s==="children"?typeof c=="string"?r.textContent!==c&&(i.suppressHydrationWarning!==!0&&ml(r.textContent,c,e),a=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(i.suppressHydrationWarning!==!0&&ml(r.textContent,c,e),a=["children",""+c]):M.hasOwnProperty(s)&&c!=null&&s==="onScroll"&&Ce("scroll",r)}switch(n){case"input":ge(r),rt(r,i,!0);break;case"textarea":ge(r),In(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=hl)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Rn(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[Lt]=t,e[Er]=r,gc(e,t,!1,!1),t.stateNode=e;e:{switch(s=ia(n,r),n){case"dialog":Ce("cancel",e),Ce("close",e),a=r;break;case"iframe":case"object":case"embed":Ce("load",e),a=r;break;case"video":case"audio":for(a=0;a<Sr.length;a++)Ce(Sr[a],e);a=r;break;case"source":Ce("error",e),a=r;break;case"img":case"image":case"link":Ce("error",e),Ce("load",e),a=r;break;case"details":Ce("toggle",e),a=r;break;case"input":ce(e,r),a=R(e,r),Ce("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=d({},r,{value:void 0}),Ce("invalid",e);break;case"textarea":It(e,r),a=yn(e,r),Ce("invalid",e);break;default:a=r}aa(n,a),c=a;for(i in c)if(c.hasOwnProperty(i)){var u=c[i];i==="style"?is(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&sr(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Xt(e,u):typeof u=="number"&&Xt(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(M.hasOwnProperty(i)?u!=null&&i==="onScroll"&&Ce("scroll",e):u!=null&&se(e,i,u,s))}switch(n){case"input":ge(e),rt(e,r,!1);break;case"textarea":ge(e),In(e);break;case"option":r.value!=null&&e.setAttribute("value",""+D(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?lt(e,!!r.multiple,i,!1):r.defaultValue!=null&&lt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=hl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return tt(t),null;case 6:if(e&&t.stateNode!=null)yc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(f(166));if(n=Sn(Ir.current),Sn(Ot.current),jl(t)){if(r=t.stateNode,n=t.memoizedProps,r[Lt]=t,(i=r.nodeValue!==n)&&(e=ht,e!==null))switch(e.tag){case 3:ml(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ml(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Lt]=t,t.stateNode=r}return tt(t),null;case 13:if(ze(Te),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Pe&&gt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)ko(),Yn(),t.flags|=98560,i=!1;else if(i=jl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(f(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(f(317));i[Lt]=t}else Yn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tt(t),i=!1}else Et!==null&&(Oi(Et),Et=null),i=!0;if(!i)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Te.current&1)!==0?Qe===0&&(Qe=3):Di())),t.updateQueue!==null&&(t.flags|=4),tt(t),null);case 4:return er(),Si(e,t),e===null&&Cr(t.stateNode.containerInfo),tt(t),null;case 10:return Za(t.type._context),tt(t),null;case 17:return ct(t.type)&&vl(),tt(t),null;case 19:if(ze(Te),i=t.memoizedState,i===null)return tt(t),null;if(r=(t.flags&128)!==0,s=i.rendering,s===null)if(r)Fr(i,!1);else{if(Qe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=El(e),s!==null){for(t.flags|=128,Fr(i,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,s=i.alternate,s===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,e=s.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Se(Te,Te.current&1|2),t.child}e=e.sibling}i.tail!==null&&$e()>lr&&(t.flags|=128,r=!0,Fr(i,!1),t.lanes=4194304)}else{if(!r)if(e=El(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Fr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!Pe)return tt(t),null}else 2*$e()-i.renderingStartTime>lr&&n!==1073741824&&(t.flags|=128,r=!0,Fr(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(n=i.last,n!==null?n.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=$e(),t.sibling=null,n=Te.current,Se(Te,r?n&1|2:n&1),t):(tt(t),null);case 22:case 23:return Fi(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(vt&1073741824)!==0&&(tt(t),t.subtreeFlags&6&&(t.flags|=8192)):tt(t),null;case 24:return null;case 25:return null}throw Error(f(156,t.tag))}function Dd(e,t){switch(Ka(t),t.tag){case 1:return ct(t.type)&&vl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return er(),ze(ot),ze(Ze),ii(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return li(t),null;case 13:if(ze(Te),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(f(340));Yn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ze(Te),null;case 4:return er(),null;case 10:return Za(t.type._context),null;case 22:case 23:return Fi(),null;case 24:return null;default:return null}}var Al=!1,nt=!1,$d=typeof WeakSet=="function"?WeakSet:Set,$=null;function nr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Oe(e,t,r)}else n.current=null}function Ci(e,t,n){try{n()}catch(r){Oe(e,t,r)}}var xc=!1;function Ud(e,t){if(Fa=rl,e=Ys(),Pa(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var s=0,c=-1,u=-1,x=0,j=0,N=e,k=null;t:for(;;){for(var A;N!==n||a!==0&&N.nodeType!==3||(c=s+a),N!==i||r!==0&&N.nodeType!==3||(u=s+r),N.nodeType===3&&(s+=N.nodeValue.length),(A=N.firstChild)!==null;)k=N,N=A;for(;;){if(N===e)break t;if(k===n&&++x===a&&(c=s),k===i&&++j===r&&(u=s),(A=N.nextSibling)!==null)break;N=k,k=N.parentNode}N=A}n=c===-1||u===-1?null:{start:c,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Da={focusedElem:e,selectionRange:n},rl=!1,$=t;$!==null;)if(t=$,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,$=e;else for(;$!==null;){t=$;try{var W=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(W!==null){var Q=W.memoizedProps,Ue=W.memoizedState,g=t.stateNode,p=g.getSnapshotBeforeUpdate(t.elementType===t.type?Q:Mt(t.type,Q),Ue);g.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(f(163))}}catch(S){Oe(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,$=e;break}$=t.return}return W=xc,xc=!1,W}function Dr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var i=a.destroy;a.destroy=void 0,i!==void 0&&Ci(t,n,i)}a=a.next}while(a!==r)}}function Fl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function zi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function wc(e){var t=e.alternate;t!==null&&(e.alternate=null,wc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Lt],delete t[Er],delete t[Wa],delete t[Nd],delete t[bd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function kc(e){return e.tag===5||e.tag===3||e.tag===4}function jc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||kc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ei(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=hl));else if(r!==4&&(e=e.child,e!==null))for(Ei(e,t,n),e=e.sibling;e!==null;)Ei(e,t,n),e=e.sibling}function Mi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Mi(e,t,n),e=e.sibling;e!==null;)Mi(e,t,n),e=e.sibling}var Xe=null,Pt=!1;function dn(e,t,n){for(n=n.child;n!==null;)Nc(e,t,n),n=n.sibling}function Nc(e,t,n){if(Rt&&typeof Rt.onCommitFiberUnmount=="function")try{Rt.onCommitFiberUnmount(Xr,n)}catch{}switch(n.tag){case 5:nt||nr(n,t);case 6:var r=Xe,a=Pt;Xe=null,dn(e,t,n),Xe=r,Pt=a,Xe!==null&&(Pt?(e=Xe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Xe.removeChild(n.stateNode));break;case 18:Xe!==null&&(Pt?(e=Xe,n=n.stateNode,e.nodeType===8?Ba(e.parentNode,n):e.nodeType===1&&Ba(e,n),vr(e)):Ba(Xe,n.stateNode));break;case 4:r=Xe,a=Pt,Xe=n.stateNode.containerInfo,Pt=!0,dn(e,t,n),Xe=r,Pt=a;break;case 0:case 11:case 14:case 15:if(!nt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var i=a,s=i.destroy;i=i.tag,s!==void 0&&((i&2)!==0||(i&4)!==0)&&Ci(n,t,s),a=a.next}while(a!==r)}dn(e,t,n);break;case 1:if(!nt&&(nr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){Oe(n,t,c)}dn(e,t,n);break;case 21:dn(e,t,n);break;case 22:n.mode&1?(nt=(r=nt)||n.memoizedState!==null,dn(e,t,n),nt=r):dn(e,t,n);break;default:dn(e,t,n)}}function bc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new $d),t.forEach(function(r){var a=Yd.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function _t(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var i=e,s=t,c=s;e:for(;c!==null;){switch(c.tag){case 5:Xe=c.stateNode,Pt=!1;break e;case 3:Xe=c.stateNode.containerInfo,Pt=!0;break e;case 4:Xe=c.stateNode.containerInfo,Pt=!0;break e}c=c.return}if(Xe===null)throw Error(f(160));Nc(i,s,a),Xe=null,Pt=!1;var u=a.alternate;u!==null&&(u.return=null),a.return=null}catch(x){Oe(a,t,x)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Sc(t,e),t=t.sibling}function Sc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(_t(t,e),Ft(e),r&4){try{Dr(3,e,e.return),Fl(3,e)}catch(Q){Oe(e,e.return,Q)}try{Dr(5,e,e.return)}catch(Q){Oe(e,e.return,Q)}}break;case 1:_t(t,e),Ft(e),r&512&&n!==null&&nr(n,n.return);break;case 5:if(_t(t,e),Ft(e),r&512&&n!==null&&nr(n,n.return),e.flags&32){var a=e.stateNode;try{Xt(a,"")}catch(Q){Oe(e,e.return,Q)}}if(r&4&&(a=e.stateNode,a!=null)){var i=e.memoizedProps,s=n!==null?n.memoizedProps:i,c=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{c==="input"&&i.type==="radio"&&i.name!=null&&_e(a,i),ia(c,s);var x=ia(c,i);for(s=0;s<u.length;s+=2){var j=u[s],N=u[s+1];j==="style"?is(a,N):j==="dangerouslySetInnerHTML"?sr(a,N):j==="children"?Xt(a,N):se(a,j,N,x)}switch(c){case"input":Ke(a,i);break;case"textarea":St(a,i);break;case"select":var k=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!i.multiple;var A=i.value;A!=null?lt(a,!!i.multiple,A,!1):k!==!!i.multiple&&(i.defaultValue!=null?lt(a,!!i.multiple,i.defaultValue,!0):lt(a,!!i.multiple,i.multiple?[]:"",!1))}a[Er]=i}catch(Q){Oe(e,e.return,Q)}}break;case 6:if(_t(t,e),Ft(e),r&4){if(e.stateNode===null)throw Error(f(162));a=e.stateNode,i=e.memoizedProps;try{a.nodeValue=i}catch(Q){Oe(e,e.return,Q)}}break;case 3:if(_t(t,e),Ft(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{vr(t.containerInfo)}catch(Q){Oe(e,e.return,Q)}break;case 4:_t(t,e),Ft(e);break;case 13:_t(t,e),Ft(e),a=e.child,a.flags&8192&&(i=a.memoizedState!==null,a.stateNode.isHidden=i,!i||a.alternate!==null&&a.alternate.memoizedState!==null||(Ti=$e())),r&4&&bc(e);break;case 22:if(j=n!==null&&n.memoizedState!==null,e.mode&1?(nt=(x=nt)||j,_t(t,e),nt=x):_t(t,e),Ft(e),r&8192){if(x=e.memoizedState!==null,(e.stateNode.isHidden=x)&&!j&&(e.mode&1)!==0)for($=e,j=e.child;j!==null;){for(N=$=j;$!==null;){switch(k=$,A=k.child,k.tag){case 0:case 11:case 14:case 15:Dr(4,k,k.return);break;case 1:nr(k,k.return);var W=k.stateNode;if(typeof W.componentWillUnmount=="function"){r=k,n=k.return;try{t=r,W.props=t.memoizedProps,W.state=t.memoizedState,W.componentWillUnmount()}catch(Q){Oe(r,n,Q)}}break;case 5:nr(k,k.return);break;case 22:if(k.memoizedState!==null){Ec(N);continue}}A!==null?(A.return=k,$=A):Ec(N)}j=j.sibling}e:for(j=null,N=e;;){if(N.tag===5){if(j===null){j=N;try{a=N.stateNode,x?(i=a.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(c=N.stateNode,u=N.memoizedProps.style,s=u!=null&&u.hasOwnProperty("display")?u.display:null,c.style.display=Kr("display",s))}catch(Q){Oe(e,e.return,Q)}}}else if(N.tag===6){if(j===null)try{N.stateNode.nodeValue=x?"":N.memoizedProps}catch(Q){Oe(e,e.return,Q)}}else if((N.tag!==22&&N.tag!==23||N.memoizedState===null||N===e)&&N.child!==null){N.child.return=N,N=N.child;continue}if(N===e)break e;for(;N.sibling===null;){if(N.return===null||N.return===e)break e;j===N&&(j=null),N=N.return}j===N&&(j=null),N.sibling.return=N.return,N=N.sibling}}break;case 19:_t(t,e),Ft(e),r&4&&bc(e);break;case 21:break;default:_t(t,e),Ft(e)}}function Ft(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(kc(n)){var r=n;break e}n=n.return}throw Error(f(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Xt(a,""),r.flags&=-33);var i=jc(e);Mi(e,i,a);break;case 3:case 4:var s=r.stateNode.containerInfo,c=jc(e);Ei(e,c,s);break;default:throw Error(f(161))}}catch(u){Oe(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Bd(e,t,n){$=e,Cc(e)}function Cc(e,t,n){for(var r=(e.mode&1)!==0;$!==null;){var a=$,i=a.child;if(a.tag===22&&r){var s=a.memoizedState!==null||Al;if(!s){var c=a.alternate,u=c!==null&&c.memoizedState!==null||nt;c=Al;var x=nt;if(Al=s,(nt=u)&&!x)for($=a;$!==null;)s=$,u=s.child,s.tag===22&&s.memoizedState!==null?Mc(a):u!==null?(u.return=s,$=u):Mc(a);for(;i!==null;)$=i,Cc(i),i=i.sibling;$=a,Al=c,nt=x}zc(e)}else(a.subtreeFlags&8772)!==0&&i!==null?(i.return=a,$=i):zc(e)}}function zc(e){for(;$!==null;){var t=$;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:nt||Fl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!nt)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:Mt(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Eo(t,i,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Eo(t,s,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var x=t.alternate;if(x!==null){var j=x.memoizedState;if(j!==null){var N=j.dehydrated;N!==null&&vr(N)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(f(163))}nt||t.flags&512&&zi(t)}catch(k){Oe(t,t.return,k)}}if(t===e){$=null;break}if(n=t.sibling,n!==null){n.return=t.return,$=n;break}$=t.return}}function Ec(e){for(;$!==null;){var t=$;if(t===e){$=null;break}var n=t.sibling;if(n!==null){n.return=t.return,$=n;break}$=t.return}}function Mc(e){for(;$!==null;){var t=$;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Fl(4,t)}catch(u){Oe(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(u){Oe(t,a,u)}}var i=t.return;try{zi(t)}catch(u){Oe(t,i,u)}break;case 5:var s=t.return;try{zi(t)}catch(u){Oe(t,s,u)}}}catch(u){Oe(t,t.return,u)}if(t===e){$=null;break}var c=t.sibling;if(c!==null){c.return=t.return,$=c;break}$=t.return}}var Wd=Math.ceil,Dl=me.ReactCurrentDispatcher,Pi=me.ReactCurrentOwner,jt=me.ReactCurrentBatchConfig,pe=0,Ge=null,We=null,Je=0,vt=0,rr=an(0),Qe=0,$r=null,zn=0,$l=0,_i=0,Ur=null,dt=null,Ti=0,lr=1/0,qt=null,Ul=!1,Ii=null,fn=null,Bl=!1,pn=null,Wl=0,Br=0,Ri=null,Vl=-1,Hl=0;function it(){return(pe&6)!==0?$e():Vl!==-1?Vl:Vl=$e()}function mn(e){return(e.mode&1)===0?1:(pe&2)!==0&&Je!==0?Je&-Je:Cd.transition!==null?(Hl===0&&(Hl=ks()),Hl):(e=ke,e!==0||(e=window.event,e=e===void 0?16:Ps(e.type)),e)}function Tt(e,t,n,r){if(50<Br)throw Br=0,Ri=null,Error(f(185));fr(e,n,r),((pe&2)===0||e!==Ge)&&(e===Ge&&((pe&2)===0&&($l|=n),Qe===4&&hn(e,Je)),ft(e,r),n===1&&pe===0&&(t.mode&1)===0&&(lr=$e()+500,xl&&on()))}function ft(e,t){var n=e.callbackNode;Cu(e,t);var r=el(e,e===Ge?Je:0);if(r===0)n!==null&&ys(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ys(n),t===1)e.tag===0?Sd(_c.bind(null,e)):go(_c.bind(null,e)),kd(function(){(pe&6)===0&&on()}),n=null;else{switch(js(r)){case 1:n=pa;break;case 4:n=xs;break;case 16:n=Yr;break;case 536870912:n=ws;break;default:n=Yr}n=Dc(n,Pc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Pc(e,t){if(Vl=-1,Hl=0,(pe&6)!==0)throw Error(f(327));var n=e.callbackNode;if(ar()&&e.callbackNode!==n)return null;var r=el(e,e===Ge?Je:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Ql(e,r);else{t=r;var a=pe;pe|=2;var i=Ic();(Ge!==e||Je!==t)&&(qt=null,lr=$e()+500,Mn(e,t));do try{Qd();break}catch(c){Tc(e,c)}while(!0);Ja(),Dl.current=i,pe=a,We!==null?t=0:(Ge=null,Je=0,t=Qe)}if(t!==0){if(t===2&&(a=ma(e),a!==0&&(r=a,t=Li(e,a))),t===1)throw n=$r,Mn(e,0),hn(e,r),ft(e,$e()),n;if(t===6)hn(e,r);else{if(a=e.current.alternate,(r&30)===0&&!Vd(a)&&(t=Ql(e,r),t===2&&(i=ma(e),i!==0&&(r=i,t=Li(e,i))),t===1))throw n=$r,Mn(e,0),hn(e,r),ft(e,$e()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(f(345));case 2:Pn(e,dt,qt);break;case 3:if(hn(e,r),(r&130023424)===r&&(t=Ti+500-$e(),10<t)){if(el(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){it(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Ua(Pn.bind(null,e,dt,qt),t);break}Pn(e,dt,qt);break;case 4:if(hn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var s=31-Ct(r);i=1<<s,s=t[s],s>a&&(a=s),r&=~i}if(r=a,r=$e()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Wd(r/1960))-r,10<r){e.timeoutHandle=Ua(Pn.bind(null,e,dt,qt),r);break}Pn(e,dt,qt);break;case 5:Pn(e,dt,qt);break;default:throw Error(f(329))}}}return ft(e,$e()),e.callbackNode===n?Pc.bind(null,e):null}function Li(e,t){var n=Ur;return e.current.memoizedState.isDehydrated&&(Mn(e,t).flags|=256),e=Ql(e,t),e!==2&&(t=dt,dt=n,t!==null&&Oi(t)),e}function Oi(e){dt===null?dt=e:dt.push.apply(dt,e)}function Vd(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],i=a.getSnapshot;a=a.value;try{if(!zt(i(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function hn(e,t){for(t&=~_i,t&=~$l,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ct(t),r=1<<n;e[n]=-1,t&=~r}}function _c(e){if((pe&6)!==0)throw Error(f(327));ar();var t=el(e,0);if((t&1)===0)return ft(e,$e()),null;var n=Ql(e,t);if(e.tag!==0&&n===2){var r=ma(e);r!==0&&(t=r,n=Li(e,r))}if(n===1)throw n=$r,Mn(e,0),hn(e,t),ft(e,$e()),n;if(n===6)throw Error(f(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Pn(e,dt,qt),ft(e,$e()),null}function Ai(e,t){var n=pe;pe|=1;try{return e(t)}finally{pe=n,pe===0&&(lr=$e()+500,xl&&on())}}function En(e){pn!==null&&pn.tag===0&&(pe&6)===0&&ar();var t=pe;pe|=1;var n=jt.transition,r=ke;try{if(jt.transition=null,ke=1,e)return e()}finally{ke=r,jt.transition=n,pe=t,(pe&6)===0&&on()}}function Fi(){vt=rr.current,ze(rr)}function Mn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,wd(n)),We!==null)for(n=We.return;n!==null;){var r=n;switch(Ka(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&vl();break;case 3:er(),ze(ot),ze(Ze),ii();break;case 5:li(r);break;case 4:er();break;case 13:ze(Te);break;case 19:ze(Te);break;case 10:Za(r.type._context);break;case 22:case 23:Fi()}n=n.return}if(Ge=e,We=e=gn(e.current,null),Je=vt=t,Qe=0,$r=null,_i=$l=zn=0,dt=Ur=null,bn!==null){for(t=0;t<bn.length;t++)if(n=bn[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,i=n.pending;if(i!==null){var s=i.next;i.next=a,r.next=s}n.pending=r}bn=null}return e}function Tc(e,t){do{var n=We;try{if(Ja(),Ml.current=Il,Pl){for(var r=Ie.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}Pl=!1}if(Cn=0,qe=He=Ie=null,Rr=!1,Lr=0,Pi.current=null,n===null||n.return===null){Qe=1,$r=t,We=null;break}e:{var i=e,s=n.return,c=n,u=t;if(t=Je,c.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var x=u,j=c,N=j.tag;if((j.mode&1)===0&&(N===0||N===11||N===15)){var k=j.alternate;k?(j.updateQueue=k.updateQueue,j.memoizedState=k.memoizedState,j.lanes=k.lanes):(j.updateQueue=null,j.memoizedState=null)}var A=rc(s);if(A!==null){A.flags&=-257,lc(A,s,c,i,t),A.mode&1&&nc(i,x,t),t=A,u=x;var W=t.updateQueue;if(W===null){var Q=new Set;Q.add(u),t.updateQueue=Q}else W.add(u);break e}else{if((t&1)===0){nc(i,x,t),Di();break e}u=Error(f(426))}}else if(Pe&&c.mode&1){var Ue=rc(s);if(Ue!==null){(Ue.flags&65536)===0&&(Ue.flags|=256),lc(Ue,s,c,i,t),Ya(tr(u,c));break e}}i=u=tr(u,c),Qe!==4&&(Qe=2),Ur===null?Ur=[i]:Ur.push(i),i=s;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var g=ec(i,u,t);zo(i,g);break e;case 1:c=u;var p=i.type,y=i.stateNode;if((i.flags&128)===0&&(typeof p.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(fn===null||!fn.has(y)))){i.flags|=65536,t&=-t,i.lanes|=t;var S=tc(i,c,t);zo(i,S);break e}}i=i.return}while(i!==null)}Lc(n)}catch(q){t=q,We===n&&n!==null&&(We=n=n.return);continue}break}while(!0)}function Ic(){var e=Dl.current;return Dl.current=Il,e===null?Il:e}function Di(){(Qe===0||Qe===3||Qe===2)&&(Qe=4),Ge===null||(zn&268435455)===0&&($l&268435455)===0||hn(Ge,Je)}function Ql(e,t){var n=pe;pe|=2;var r=Ic();(Ge!==e||Je!==t)&&(qt=null,Mn(e,t));do try{Hd();break}catch(a){Tc(e,a)}while(!0);if(Ja(),pe=n,Dl.current=r,We!==null)throw Error(f(261));return Ge=null,Je=0,Qe}function Hd(){for(;We!==null;)Rc(We)}function Qd(){for(;We!==null&&!vu();)Rc(We)}function Rc(e){var t=Fc(e.alternate,e,vt);e.memoizedProps=e.pendingProps,t===null?Lc(e):We=t,Pi.current=null}function Lc(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Fd(n,t,vt),n!==null){We=n;return}}else{if(n=Dd(n,t),n!==null){n.flags&=32767,We=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Qe=6,We=null;return}}if(t=t.sibling,t!==null){We=t;return}We=t=e}while(t!==null);Qe===0&&(Qe=5)}function Pn(e,t,n){var r=ke,a=jt.transition;try{jt.transition=null,ke=1,Kd(e,t,n,r)}finally{jt.transition=a,ke=r}return null}function Kd(e,t,n,r){do ar();while(pn!==null);if((pe&6)!==0)throw Error(f(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(f(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(zu(e,i),e===Ge&&(We=Ge=null,Je=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Bl||(Bl=!0,Dc(Yr,function(){return ar(),null})),i=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||i){i=jt.transition,jt.transition=null;var s=ke;ke=1;var c=pe;pe|=4,Pi.current=null,Ud(e,n),Sc(n,e),pd(Da),rl=!!Fa,Da=Fa=null,e.current=n,Bd(n),yu(),pe=c,ke=s,jt.transition=i}else e.current=n;if(Bl&&(Bl=!1,pn=e,Wl=a),i=e.pendingLanes,i===0&&(fn=null),ku(n.stateNode),ft(e,$e()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(Ul)throw Ul=!1,e=Ii,Ii=null,e;return(Wl&1)!==0&&e.tag!==0&&ar(),i=e.pendingLanes,(i&1)!==0?e===Ri?Br++:(Br=0,Ri=e):Br=0,on(),null}function ar(){if(pn!==null){var e=js(Wl),t=jt.transition,n=ke;try{if(jt.transition=null,ke=16>e?16:e,pn===null)var r=!1;else{if(e=pn,pn=null,Wl=0,(pe&6)!==0)throw Error(f(331));var a=pe;for(pe|=4,$=e.current;$!==null;){var i=$,s=i.child;if(($.flags&16)!==0){var c=i.deletions;if(c!==null){for(var u=0;u<c.length;u++){var x=c[u];for($=x;$!==null;){var j=$;switch(j.tag){case 0:case 11:case 15:Dr(8,j,i)}var N=j.child;if(N!==null)N.return=j,$=N;else for(;$!==null;){j=$;var k=j.sibling,A=j.return;if(wc(j),j===x){$=null;break}if(k!==null){k.return=A,$=k;break}$=A}}}var W=i.alternate;if(W!==null){var Q=W.child;if(Q!==null){W.child=null;do{var Ue=Q.sibling;Q.sibling=null,Q=Ue}while(Q!==null)}}$=i}}if((i.subtreeFlags&2064)!==0&&s!==null)s.return=i,$=s;else e:for(;$!==null;){if(i=$,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:Dr(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,$=g;break e}$=i.return}}var p=e.current;for($=p;$!==null;){s=$;var y=s.child;if((s.subtreeFlags&2064)!==0&&y!==null)y.return=s,$=y;else e:for(s=p;$!==null;){if(c=$,(c.flags&2048)!==0)try{switch(c.tag){case 0:case 11:case 15:Fl(9,c)}}catch(q){Oe(c,c.return,q)}if(c===s){$=null;break e}var S=c.sibling;if(S!==null){S.return=c.return,$=S;break e}$=c.return}}if(pe=a,on(),Rt&&typeof Rt.onPostCommitFiberRoot=="function")try{Rt.onPostCommitFiberRoot(Xr,e)}catch{}r=!0}return r}finally{ke=n,jt.transition=t}}return!1}function Oc(e,t,n){t=tr(n,t),t=ec(e,t,1),e=un(e,t,1),t=it(),e!==null&&(fr(e,1,t),ft(e,t))}function Oe(e,t,n){if(e.tag===3)Oc(e,e,n);else for(;t!==null;){if(t.tag===3){Oc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(fn===null||!fn.has(r))){e=tr(n,e),e=tc(t,e,1),t=un(t,e,1),e=it(),t!==null&&(fr(t,1,e),ft(t,e));break}}t=t.return}}function qd(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=it(),e.pingedLanes|=e.suspendedLanes&n,Ge===e&&(Je&n)===n&&(Qe===4||Qe===3&&(Je&130023424)===Je&&500>$e()-Ti?Mn(e,0):_i|=n),ft(e,t)}function Ac(e,t){t===0&&((e.mode&1)===0?t=1:(t=Zr,Zr<<=1,(Zr&130023424)===0&&(Zr=4194304)));var n=it();e=Ht(e,t),e!==null&&(fr(e,t,n),ft(e,n))}function Gd(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ac(e,n)}function Yd(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(f(314))}r!==null&&r.delete(t),Ac(e,n)}var Fc;Fc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ot.current)ut=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return ut=!1,Ad(e,t,n);ut=(e.flags&131072)!==0}else ut=!1,Pe&&(t.flags&1048576)!==0&&vo(t,kl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ol(e,t),e=t.pendingProps;var a=Kn(t,Ze.current);Zn(t,n),a=ci(null,t,r,e,a,n);var i=ui();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ct(r)?(i=!0,yl(t)):i=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,ni(t),a.updater=Rl,t.stateNode=a,a._reactInternals=t,gi(t,r,e,n),t=wi(null,t,r,!0,i,n)):(t.tag=0,Pe&&i&&Qa(t),at(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ol(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Jd(r),e=Mt(r,e),a){case 0:t=xi(null,t,r,e,n);break e;case 1:t=uc(null,t,r,e,n);break e;case 11:t=ac(null,t,r,e,n);break e;case 14:t=ic(null,t,r,Mt(r.type,e),n);break e}throw Error(f(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Mt(r,a),xi(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Mt(r,a),uc(e,t,r,a,n);case 3:e:{if(dc(t),e===null)throw Error(f(387));r=t.pendingProps,i=t.memoizedState,a=i.element,Co(e,t),zl(t,r,null,n);var s=t.memoizedState;if(r=s.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){a=tr(Error(f(423)),t),t=fc(e,t,r,n,a);break e}else if(r!==a){a=tr(Error(f(424)),t),t=fc(e,t,r,n,a);break e}else for(gt=ln(t.stateNode.containerInfo.firstChild),ht=t,Pe=!0,Et=null,n=bo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Yn(),r===a){t=Kt(e,t,n);break e}at(e,t,r,n)}t=t.child}return t;case 5:return Mo(t),e===null&&Ga(t),r=t.type,a=t.pendingProps,i=e!==null?e.memoizedProps:null,s=a.children,$a(r,a)?s=null:i!==null&&$a(r,i)&&(t.flags|=32),cc(e,t),at(e,t,s,n),t.child;case 6:return e===null&&Ga(t),null;case 13:return pc(e,t,n);case 4:return ri(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Xn(t,null,r,n):at(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Mt(r,a),ac(e,t,r,a,n);case 7:return at(e,t,t.pendingProps,n),t.child;case 8:return at(e,t,t.pendingProps.children,n),t.child;case 12:return at(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,i=t.memoizedProps,s=a.value,Se(bl,r._currentValue),r._currentValue=s,i!==null)if(zt(i.value,s)){if(i.children===a.children&&!ot.current){t=Kt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var c=i.dependencies;if(c!==null){s=i.child;for(var u=c.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Qt(-1,n&-n),u.tag=2;var x=i.updateQueue;if(x!==null){x=x.shared;var j=x.pending;j===null?u.next=u:(u.next=j.next,j.next=u),x.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),ei(i.return,n,t),c.lanes|=n;break}u=u.next}}else if(i.tag===10)s=i.type===t.type?null:i.child;else if(i.tag===18){if(s=i.return,s===null)throw Error(f(341));s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),ei(s,n,t),s=i.sibling}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===t){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}at(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Zn(t,n),a=wt(a),r=r(a),t.flags|=1,at(e,t,r,n),t.child;case 14:return r=t.type,a=Mt(r,t.pendingProps),a=Mt(r.type,a),ic(e,t,r,a,n);case 15:return sc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Mt(r,a),Ol(e,t),t.tag=1,ct(r)?(e=!0,yl(t)):e=!1,Zn(t,n),Jo(t,r,a),gi(t,r,a,n),wi(null,t,r,!0,e,n);case 19:return hc(e,t,n);case 22:return oc(e,t,n)}throw Error(f(156,t.tag))};function Dc(e,t){return vs(e,t)}function Xd(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nt(e,t,n,r){return new Xd(e,t,n,r)}function $i(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Jd(e){if(typeof e=="function")return $i(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Z)return 11;if(e===Me)return 14}return 2}function gn(e,t){var n=e.alternate;return n===null?(n=Nt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Kl(e,t,n,r,a,i){var s=2;if(r=e,typeof e=="function")$i(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case ye:return _n(n.children,a,i,t);case Ee:s=8,a|=8;break;case Ve:return e=Nt(12,n,t,a|2),e.elementType=Ve,e.lanes=i,e;case xe:return e=Nt(13,n,t,a),e.elementType=xe,e.lanes=i,e;case Re:return e=Nt(19,n,t,a),e.elementType=Re,e.lanes=i,e;case be:return ql(n,a,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case De:s=10;break e;case E:s=9;break e;case Z:s=11;break e;case Me:s=14;break e;case Le:s=16,r=null;break e}throw Error(f(130,e==null?e:typeof e,""))}return t=Nt(s,n,t,a),t.elementType=e,t.type=r,t.lanes=i,t}function _n(e,t,n,r){return e=Nt(7,e,r,t),e.lanes=n,e}function ql(e,t,n,r){return e=Nt(22,e,r,t),e.elementType=be,e.lanes=n,e.stateNode={isHidden:!1},e}function Ui(e,t,n){return e=Nt(6,e,null,t),e.lanes=n,e}function Bi(e,t,n){return t=Nt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Zd(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ha(0),this.expirationTimes=ha(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ha(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Wi(e,t,n,r,a,i,s,c,u){return e=new Zd(e,t,n,c,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Nt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ni(i),e}function ef(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:he,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function $c(e){if(!e)return sn;e=e._reactInternals;e:{if(xn(e)!==e||e.tag!==1)throw Error(f(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ct(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(f(171))}if(e.tag===1){var n=e.type;if(ct(n))return mo(e,n,t)}return t}function Uc(e,t,n,r,a,i,s,c,u){return e=Wi(n,r,!0,e,a,i,s,c,u),e.context=$c(null),n=e.current,r=it(),a=mn(n),i=Qt(r,a),i.callback=t??null,un(n,i,a),e.current.lanes=a,fr(e,a,r),ft(e,r),e}function Gl(e,t,n,r){var a=t.current,i=it(),s=mn(a);return n=$c(n),t.context===null?t.context=n:t.pendingContext=n,t=Qt(i,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=un(a,t,s),e!==null&&(Tt(e,a,s,i),Cl(e,a,s)),s}function Yl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Bc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Vi(e,t){Bc(e,t),(e=e.alternate)&&Bc(e,t)}function tf(){return null}var Wc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Hi(e){this._internalRoot=e}Xl.prototype.render=Hi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(f(409));Gl(e,t,null,null)},Xl.prototype.unmount=Hi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;En(function(){Gl(null,e,null,null)}),t[Ut]=null}};function Xl(e){this._internalRoot=e}Xl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ss();e={blockedOn:null,target:e,priority:t};for(var n=0;n<tn.length&&t!==0&&t<tn[n].priority;n++);tn.splice(n,0,e),n===0&&Es(e)}};function Qi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Jl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Vc(){}function nf(e,t,n,r,a){if(a){if(typeof r=="function"){var i=r;r=function(){var x=Yl(s);i.call(x)}}var s=Uc(t,r,e,0,null,!1,!1,"",Vc);return e._reactRootContainer=s,e[Ut]=s.current,Cr(e.nodeType===8?e.parentNode:e),En(),s}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var c=r;r=function(){var x=Yl(u);c.call(x)}}var u=Wi(e,0,!1,null,null,!1,!1,"",Vc);return e._reactRootContainer=u,e[Ut]=u.current,Cr(e.nodeType===8?e.parentNode:e),En(function(){Gl(t,u,n,r)}),u}function Zl(e,t,n,r,a){var i=n._reactRootContainer;if(i){var s=i;if(typeof a=="function"){var c=a;a=function(){var u=Yl(s);c.call(u)}}Gl(t,s,e,a)}else s=nf(n,t,e,a,r);return Yl(s)}Ns=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=dr(t.pendingLanes);n!==0&&(ga(t,n|1),ft(t,$e()),(pe&6)===0&&(lr=$e()+500,on()))}break;case 13:En(function(){var r=Ht(e,1);if(r!==null){var a=it();Tt(r,e,1,a)}}),Vi(e,1)}},va=function(e){if(e.tag===13){var t=Ht(e,134217728);if(t!==null){var n=it();Tt(t,e,134217728,n)}Vi(e,134217728)}},bs=function(e){if(e.tag===13){var t=mn(e),n=Ht(e,t);if(n!==null){var r=it();Tt(n,e,t,r)}Vi(e,t)}},Ss=function(){return ke},Cs=function(e,t){var n=ke;try{return ke=e,t()}finally{ke=n}},ca=function(e,t,n){switch(t){case"input":if(Ke(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=gl(r);if(!a)throw Error(f(90));je(r),Ke(r,a)}}}break;case"textarea":St(e,n);break;case"select":t=n.value,t!=null&&lt(e,!!n.multiple,t,!1)}},us=Ai,ds=En;var rf={usingClientEntryPoint:!1,Events:[Mr,Hn,gl,os,cs,Ai]},Wr={findFiberByHostInstance:wn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},lf={bundleType:Wr.bundleType,version:Wr.version,rendererPackageName:Wr.rendererPackageName,rendererConfig:Wr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:me.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=hs(e),e===null?null:e.stateNode},findFiberByHostInstance:Wr.findFiberByHostInstance||tf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ea=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ea.isDisabled&&ea.supportsFiber)try{Xr=ea.inject(lf),Rt=ea}catch{}}return pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rf,pt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Qi(t))throw Error(f(200));return ef(e,t,null,n)},pt.createRoot=function(e,t){if(!Qi(e))throw Error(f(299));var n=!1,r="",a=Wc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Wi(e,1,!1,null,null,n,!1,r,a),e[Ut]=t.current,Cr(e.nodeType===8?e.parentNode:e),new Hi(t)},pt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(f(188)):(e=Object.keys(e).join(","),Error(f(268,e)));return e=hs(t),e=e===null?null:e.stateNode,e},pt.flushSync=function(e){return En(e)},pt.hydrate=function(e,t,n){if(!Jl(t))throw Error(f(200));return Zl(null,e,t,!0,n)},pt.hydrateRoot=function(e,t,n){if(!Qi(e))throw Error(f(405));var r=n!=null&&n.hydratedSources||null,a=!1,i="",s=Wc;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Uc(t,null,e,1,n??null,a,!1,i,s),e[Ut]=t.current,Cr(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Xl(t)},pt.render=function(e,t,n){if(!Jl(t))throw Error(f(200));return Zl(null,e,t,!1,n)},pt.unmountComponentAtNode=function(e){if(!Jl(e))throw Error(f(40));return e._reactRootContainer?(En(function(){Zl(null,null,e,!1,function(){e._reactRootContainer=null,e[Ut]=null})}),!0):!1},pt.unstable_batchedUpdates=Ai,pt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Jl(n))throw Error(f(200));if(e==null||e._reactInternals===void 0)throw Error(f(38));return Zl(e,t,n,!1,r)},pt.version="18.3.1-next-f1338f8080-20240426",pt}var Jc;function pf(){if(Jc)return Gi.exports;Jc=1;function h(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h)}catch(m){console.error(m)}}return h(),Gi.exports=ff(),Gi.exports}var Zc;function mf(){if(Zc)return ta;Zc=1;var h=pf();return ta.createRoot=h.createRoot,ta.hydrateRoot=h.hydrateRoot,ta}var hf=mf();const gf=nu(hf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lu=(...h)=>h.filter((m,f,K)=>!!m&&m.trim()!==""&&K.indexOf(m)===f).join(" ").trim();/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=h=>h.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=h=>h.replace(/^([A-Z])|[\s-_]+(\w)/g,(m,f,K)=>K?K.toUpperCase():f.toLowerCase());/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=h=>{const m=yf(h);return m.charAt(0).toUpperCase()+m.slice(1)};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ji={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xf=h=>{for(const m in h)if(m.startsWith("aria-")||m==="role"||m==="title")return!0;return!1},wf=G.createContext({}),kf=()=>G.useContext(wf),jf=G.forwardRef(({color:h,size:m,strokeWidth:f,absoluteStrokeWidth:K,className:M="",children:C,iconNode:V,...F},_)=>{const{size:Y=24,strokeWidth:H=2,absoluteStrokeWidth:ne=!1,color:O="currentColor",className:fe=""}=kf()??{},re=K??ne?Number(f??H)*24/Number(m??Y):f??H;return G.createElement("svg",{ref:_,...Ji,width:m??Y??Ji.width,height:m??Y??Ji.height,stroke:h??O,strokeWidth:re,className:lu("lucide",fe,M),...!C&&!xf(F)&&{"aria-hidden":"true"},...F},[...V.map(([ae,U])=>G.createElement(ae,U)),...Array.isArray(C)?C:[C]])});/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=(h,m)=>{const f=G.forwardRef(({className:K,...M},C)=>G.createElement(jf,{ref:C,iconNode:m,className:lu(`lucide-${vf(eu(h))}`,`lucide-${h}`,K),...M}));return f.displayName=eu(h),f};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],tu=ie("activity",Nf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Tn=ie("arrow-right",bf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],au=ie("award",Sf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],ts=ie("bot",Cf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],ra=ie("brain-circuit",zf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Mf=ie("chart-column",Ef);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Gt=ie("check",Pf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _f=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Tf=ie("chevron-down",_f);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Rf=ie("chevron-up",If);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lf=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Of=ie("circle-alert",Lf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],Hr=ie("circle-check",Af);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],iu=ie("clock",Ff);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Zi=ie("copy",Df);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $f=[["path",{d:"m15 10 5 5-5 5",key:"qqa56n"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]],Uf=ie("corner-down-right",$f);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bf=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],ns=ie("cpu",Bf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wf=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],su=ie("file-text",Wf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vf=[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]],ir=ie("git-branch",Vf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=[["path",{d:"m2 21 9.6-9.6",key:"9l79m3"}],["path",{d:"m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19",key:"fw8biw"}],["circle",{cx:"15.5",cy:"7.5",r:"5.5",key:"4wxmhb"}]],Qf=ie("key",Hf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kf=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],rs=ie("layers",Kf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qf=[["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"M3 10a2 2 0 0 0 2 2h3",key:"1npucw"}],["path",{d:"M3 5v12a2 2 0 0 0 2 2h3",key:"x1gjn2"}]],ou=ie("list-tree",qf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],na=ie("loader-circle",Gf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yf=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],Xf=ie("message-square",Yf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jf=[["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",key:"1miecu"}]],Zf=ie("paperclip",Jf);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ep=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],tp=ie("pen-line",ep);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const np=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],rp=ie("plus",np);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lp=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],ap=ie("refresh-cw",lp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ip=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],sp=ie("save",ip);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const op=[["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"m19 8 3 8a5 5 0 0 1-6 0zV7",key:"zcdpyk"}],["path",{d:"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",key:"1yorad"}],["path",{d:"m5 8 3 8a5 5 0 0 1-6 0zV7",key:"eua70x"}],["path",{d:"M7 21h10",key:"1b0cd5"}]],Yt=ie("scale",op);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],cu=ie("search",cp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],dp=ie("send",up);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],pp=ie("settings",fp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mp=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],hp=ie("shield-check",mp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gp=[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],vp=ie("sliders-vertical",gp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yp=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],bt=ie("sparkles",yp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xp=[["path",{d:"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",key:"2acyp4"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],uu=ie("square-check-big",xp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wp=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],kp=ie("square",wp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jp=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Np=ie("trash-2",jp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bp=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],Sp=ie("wand-sparkles",bp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cp=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ls=ie("x",Cp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zp=[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]],Qr=ie("zap",zp);function Ep({activeView:h,setActiveView:m,onOpenSettings:f}){return l.jsxs("header",{className:"navbar-container",children:[l.jsxs("div",{className:"navbar-inner",children:[l.jsxs("div",{className:"brand-badge",onClick:()=>m("landing"),style:{cursor:"pointer"},children:[l.jsxs("div",{className:"logo-icon-wrap",children:[l.jsx(ns,{className:"logo-icon",size:22}),l.jsx("div",{className:"logo-glow"})]}),l.jsxs("div",{className:"brand-text",children:[l.jsx("span",{className:"brand-name",children:"AI HIVE MIND"}),l.jsx("span",{className:"brand-tagline",children:"Multi-LLM Intelligence Layer"})]})]}),l.jsxs("nav",{className:"nav-links",children:[l.jsx("button",{className:`nav-btn ${h==="landing"?"active":""}`,onClick:()=>m("landing"),children:"Overview"}),l.jsxs("button",{className:`nav-btn ${h==="workspace"?"active":""}`,onClick:()=>m("workspace"),children:[l.jsx(bt,{size:16}),"AI Workspace"]}),l.jsxs("button",{className:`nav-btn ${h==="dashboard"?"active":""}`,onClick:()=>m("dashboard"),children:[l.jsx(Mf,{size:16}),"Telemetry & Stats"]}),l.jsxs("button",{className:`nav-btn ${h==="legal"?"active":""}`,onClick:()=>m("legal"),children:[l.jsx(Yt,{size:16}),"Doc Analyzer"]})]}),l.jsxs("div",{className:"nav-actions",children:[l.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:f,title:"Configure API Keys & Model Profiles",children:[l.jsx(pp,{size:16}),l.jsx("span",{children:"Settings"})]}),l.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>m("workspace"),children:[l.jsx(bt,{size:15}),l.jsx("span",{children:"Launch Workspace"})]})]})]}),l.jsx("style",{children:`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(7, 9, 14, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }
        .navbar-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0.85rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .brand-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          user-select: none;
        }
        .logo-icon-wrap {
          position: relative;
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        .logo-glow {
          position: absolute;
          inset: -4px;
          background: radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%);
          z-index: -1;
        }
        .brand-text {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
          background: linear-gradient(90deg, #fff, #c7d2fe);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .brand-tagline {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-btn.active {
          color: #fff;
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .btn-sm {
          padding: 0.45rem 0.95rem;
          font-size: 0.825rem;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `})]})}function Mp({onStartWorkspace:h,onSelectSamplePrompt:m}){const[f,K]=G.useState("flow"),M=[{title:"C Prime Number Checker",category:"Coding",prompt:"Write a C program to check whether a number is prime and explain the logic.",icon:"⚡"},{title:"Python Async Architecture",category:"Architecture",prompt:"Design a high-throughput async worker pool in Python with error handling.",icon:"🐍"},{title:"Quantum Key Distribution",category:"Reasoning",prompt:"Explain how BB84 protocol detects quantum eavesdropping step by step.",icon:"🔬"}];return l.jsxs("div",{className:"landing-container",children:[l.jsxs("section",{className:"hero-section",children:[l.jsx("div",{className:"hero-badge",children:l.jsxs("span",{className:"hero-badge-pill",children:[l.jsx(bt,{size:13,className:"hero-sparkle"}),"Next-Gen Multi-LLM Orchestration Layer"]})}),l.jsxs("h1",{className:"hero-title",children:["One Question. ",l.jsx("span",{className:"shimmer-text",children:"Multiple Minds."}),l.jsx("br",{}),"One Better Answer."]}),l.jsxs("p",{className:"hero-subtitle",children:["AI Hive Mind analyzes your prompt, refines it with precision, recommends the optimal AI models, generates parallel responses, and evaluates them with a dedicated ",l.jsx("strong",{children:"Critic AI"}),"—putting you in complete control."]}),l.jsxs("div",{className:"hero-cta-group",children:[l.jsxs("button",{className:"btn btn-primary btn-lg",onClick:()=>h(),children:[l.jsx("span",{children:"Start AI Hive Mind"}),l.jsx(Tn,{size:18})]}),l.jsx("a",{href:"#pipeline-demo",className:"btn btn-secondary btn-lg",children:l.jsx("span",{children:"Explore Architecture"})})]}),l.jsxs("div",{className:"sample-prompts-bar",children:[l.jsx("span",{className:"sample-label",children:"Try primary benchmark:"}),M.map((C,V)=>l.jsxs("button",{className:"sample-chip",onClick:()=>m(C.prompt),children:[l.jsx("span",{children:C.icon}),l.jsx("span",{children:C.title})]},V))]})]}),l.jsxs("section",{id:"pipeline-demo",className:"pipeline-visual-section",children:[l.jsxs("div",{className:"section-header",children:[l.jsx("span",{className:"section-tag",children:"Interactive Architecture"}),l.jsx("h2",{className:"section-title",children:"The Multi-LLM Consensus Loop"}),l.jsx("p",{className:"section-desc",children:"How a single raw prompt gets transformed through our multi-agent consensus workflow"})]}),l.jsx("div",{className:"pipeline-graph-card glass-panel",children:l.jsxs("div",{className:"pipeline-nodes",children:[l.jsxs("div",{className:"pipeline-node user-node",children:[l.jsx("div",{className:"node-icon bg-indigo",children:l.jsx(bt,{size:20})}),l.jsx("div",{className:"node-title",children:"1. User Prompt"}),l.jsx("div",{className:"node-desc",children:"Raw input entered"})]}),l.jsx("div",{className:"flow-arrow",children:l.jsx(Tn,{size:16})}),l.jsxs("div",{className:"pipeline-node engine-node",children:[l.jsx("div",{className:"node-icon bg-cyan",children:l.jsx(ra,{size:20})}),l.jsx("div",{className:"node-title",children:"2. Analysis & Refinement"}),l.jsx("div",{className:"node-desc",children:"Intent %, breakdown & fit scoring"})]}),l.jsx("div",{className:"flow-arrow",children:l.jsx(Tn,{size:16})}),l.jsxs("div",{className:"pipeline-node fanout-node",children:[l.jsx("div",{className:"fanout-header",children:l.jsx("span",{className:"node-title",children:"3. Parallel Execution"})}),l.jsxs("div",{className:"model-pill-stack",children:[l.jsxs("div",{className:"model-chip",children:[l.jsx("span",{className:"dot",style:{background:"#10a37f"}})," GPT-4o"]}),l.jsxs("div",{className:"model-chip",children:[l.jsx("span",{className:"dot",style:{background:"#d97706"}})," Claude 3.5 Sonnet"]}),l.jsxs("div",{className:"model-chip",children:[l.jsx("span",{className:"dot",style:{background:"#3b82f6"}})," Gemini 2.0"]})]})]}),l.jsx("div",{className:"flow-arrow",children:l.jsx(Tn,{size:16})}),l.jsxs("div",{className:"pipeline-node critic-node",children:[l.jsx("div",{className:"node-icon bg-purple",children:l.jsx(Yt,{size:20})}),l.jsx("div",{className:"node-title",children:"4. Critic AI"}),l.jsx("div",{className:"node-desc",children:"Multi-criteria scoring & ranking"})]}),l.jsx("div",{className:"flow-arrow",children:l.jsx(Tn,{size:16})}),l.jsxs("div",{className:"pipeline-node memory-node",children:[l.jsx("div",{className:"node-icon bg-emerald",children:l.jsx(ir,{size:20})}),l.jsx("div",{className:"node-title",children:"5. Active Branch"}),l.jsx("div",{className:"node-desc",children:"Provider-neutral shared memory"})]})]})})]}),l.jsxs("section",{className:"features-section",children:[l.jsxs("div",{className:"section-header",children:[l.jsx("span",{className:"section-tag",children:"Core Capabilities"}),l.jsx("h2",{className:"section-title",children:"Built For Precision & Control"})]}),l.jsxs("div",{className:"feature-grid",children:[l.jsxs("div",{className:"feature-card glass-card",children:[l.jsx("div",{className:"feature-icon-wrap",style:{color:"#818cf8",background:"rgba(99, 102, 241, 0.12)"},children:l.jsx(bt,{size:24})}),l.jsx("h3",{className:"feature-card-title",children:"Prompt Refinement & Breakdown"}),l.jsx("p",{className:"feature-card-text",children:"Automatically diagnoses prompt ambiguity, identifies task categories, extracts boundary constraints, and constructs a refined version without altering your true intent."})]}),l.jsxs("div",{className:"feature-card glass-card",children:[l.jsx("div",{className:"feature-icon-wrap",style:{color:"#06b6d4",background:"rgba(6, 182, 212, 0.12)"},children:l.jsx(ts,{size:24})}),l.jsx("h3",{className:"feature-card-title",children:"Smart Model Recommendation"}),l.jsx("p",{className:"feature-card-text",children:"Dynamic matching engine pairs your prompt intent with configurable model capability profiles, providing transparent recommendation scores with explainable rationale."})]}),l.jsxs("div",{className:"feature-card glass-card",children:[l.jsx("div",{className:"feature-icon-wrap",style:{color:"#f59e0b",background:"rgba(245, 158, 11, 0.12)"},children:l.jsx(rs,{size:24})}),l.jsx("h3",{className:"feature-card-title",children:"Multi-Model Arena Comparison"}),l.jsx("p",{className:"feature-card-text",children:"Dispatch requests to multiple LLMs simultaneously (OpenAI, Claude, Gemini, Groq, Ollama) and view streaming answers in side-by-side comparison columns."})]}),l.jsxs("div",{className:"feature-card glass-card",children:[l.jsx("div",{className:"feature-icon-wrap",style:{color:"#a855f7",background:"rgba(168, 85, 247, 0.12)"},children:l.jsx(Yt,{size:24})}),l.jsx("h3",{className:"feature-card-title",children:"Critic AI Evaluation"}),l.jsx("p",{className:"feature-card-text",children:"An impartial evaluator grades generated responses across Correctness (35%), Relevance (20%), Completeness (20%), Clarity (15%), and Instruction Adherence (10%)."})]}),l.jsxs("div",{className:"feature-card glass-card",children:[l.jsx("div",{className:"feature-icon-wrap",style:{color:"#10b981",background:"rgba(16, 185, 129, 0.12)"},children:l.jsx(ir,{size:24})}),l.jsx("h3",{className:"feature-card-title",children:"Provider-Neutral Shared Memory"}),l.jsx("p",{className:"feature-card-text",children:"You choose which answer becomes the active conversation branch. Easily switch between AI models mid-conversation while preserving full conversational context."})]}),l.jsxs("div",{className:"feature-card glass-card",children:[l.jsx("div",{className:"feature-icon-wrap",style:{color:"#f43f5e",background:"rgba(244, 63, 94, 0.12)"},children:l.jsx(Qr,{size:24})}),l.jsx("h3",{className:"feature-card-title",children:"Consensus Synthesis Engine"}),l.jsx("p",{className:"feature-card-text",children:'Merge the highest scoring algorithmic logic, clarity, and syntax from multiple candidate models into a single, unified "Best Combined Answer".'})]})]})]}),l.jsx("section",{className:"cta-banner-section",children:l.jsxs("div",{className:"cta-banner glass-panel",children:[l.jsxs("div",{className:"cta-content",children:[l.jsx("h2",{children:"Ready to experience the power of the Hive Mind?"}),l.jsx("p",{children:"Start a session, test prompt refinement, and see multi-model comparison in real-time."})]}),l.jsxs("button",{className:"btn btn-primary btn-lg",onClick:()=>h(),children:[l.jsx("span",{children:"Launch Workspace"}),l.jsx(Tn,{size:18})]})]})}),l.jsx("style",{children:`
        .landing-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 3rem 1.5rem 6rem;
          display: flex;
          flex-direction: column;
          gap: 5rem;
        }
        .hero-section {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
          padding-top: 2rem;
        }
        .hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: #a5b4fc;
        }
        .hero-sparkle {
          color: #818cf8;
          animation: pulse 2s infinite;
        }
        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          font-weight: 800;
        }
        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 750px;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        .btn-lg {
          padding: 0.85rem 1.85rem;
          font-size: 1rem;
          border-radius: var(--radius-lg);
        }
        .sample-prompts-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 1.5rem;
        }
        .sample-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .sample-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-light);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sample-chip:hover {
          color: #fff;
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }
        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .section-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-cyan);
          display: block;
          margin-bottom: 0.5rem;
        }
        .section-title {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }
        .section-desc {
          color: var(--text-secondary);
          font-size: 1rem;
        }
        .pipeline-graph-card {
          padding: 2.5rem 1.5rem;
          overflow-x: auto;
        }
        .pipeline-nodes {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 950px;
          gap: 1rem;
        }
        .pipeline-node {
          background: rgba(13, 18, 28, 0.9);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 170px;
          position: relative;
        }
        .node-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          color: white;
        }
        .bg-indigo { background: linear-gradient(135deg, #6366f1, #818cf8); }
        .bg-cyan { background: linear-gradient(135deg, #0891b2, #06b6d4); }
        .bg-purple { background: linear-gradient(135deg, #9333ea, #c084fc); }
        .bg-emerald { background: linear-gradient(135deg, #059669, #34d399); }
        .node-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .node-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .flow-arrow {
          color: var(--text-dim);
        }
        .fanout-node {
          width: 200px;
        }
        .model-pill-stack {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          width: 100%;
          margin-top: 0.5rem;
        }
        .model-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .model-chip .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .feature-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-card-title {
          font-size: 1.25rem;
        }
        .feature-card-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .cta-banner {
          padding: 3rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%), var(--bg-surface);
        }
        .cta-content h2 {
          font-size: 1.85rem;
          margin-bottom: 0.5rem;
        }
        .cta-content p {
          color: var(--text-secondary);
        }
        @media (max-width: 900px) {
          .hero-title { font-size: 2.5rem; }
          .cta-banner { flex-direction: column; text-align: center; }
        }
      `})]})}const Ae="/api";async function Fe(h){if(!h.ok){const m=await h.json().catch(()=>({}));throw new Error(m.error||`HTTP error ${h.status}: ${h.statusText}`)}return h.json()}const Be={async getModels(){const h=await fetch(`${Ae}/models`);return Fe(h)},async updateModelSettings(h,m){const f=await fetch(`${Ae}/models/update`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({models:h,weights:m})});return Fe(f)},async testModelConnection(h){const m=await fetch(`${Ae}/models/test`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({modelId:h})});return Fe(m)},async getKeyStatus(){const h=await fetch(`${Ae}/settings/keys/status`);return Fe(h)},async updateKeys(h){const m=await fetch(`${Ae}/settings/keys`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)});return Fe(m)},async analyzePrompt(h){const m=await fetch(`${Ae}/analyze-prompt`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h})});return Fe(m)},async refinePrompt(h,m){const f=await fetch(`${Ae}/refine-prompt`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h,analysis:m})});return Fe(f)},async recommendModels(h,m){const f=await fetch(`${Ae}/recommend-models`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h,analysis:m})});return Fe(f)},async preflightPrompt(h){const m=await fetch(`${Ae}/preflight-prompt`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h})});return Fe(m)},async generateResponses({prompt:h,modelIds:m,conversationId:f,documentContext:K}){const M=await fetch(`${Ae}/generate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h,modelIds:m,conversationId:f,documentContext:K})});return Fe(M)},async criticEvaluate({originalPrompt:h,refinedPrompt:m,responses:f,weights:K}){const M=await fetch(`${Ae}/critic-evaluate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({originalPrompt:h,refinedPrompt:m,responses:f,weights:K})});return Fe(M)},async synthesize({originalPrompt:h,refinedPrompt:m,responses:f,criticEvaluation:K}){const M=await fetch(`${Ae}/synthesize`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({originalPrompt:h,refinedPrompt:m,responses:f,criticEvaluation:K})});return Fe(M)},async uploadDocument(h){const m=new FormData;m.append("file",h);const f=await fetch(`${Ae}/upload`,{method:"POST",body:m});return Fe(f)},async getConversations(){const h=await fetch(`${Ae}/conversations`);return Fe(h)},async createConversation(h){const m=await fetch(`${Ae}/conversations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:h})});return Fe(m)},async getConversation(h){const m=await fetch(`${Ae}/conversations/${h}`);return Fe(m)},async saveTurn(h,m){const f=await fetch(`${Ae}/conversations/${h}/turn`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)});return Fe(f)},async selectBranch(h,m,f){const K=await fetch(`${Ae}/conversations/${h}/branch`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({turnId:m,selectedModelId:f})});return Fe(K)},async saveSynthesis(h,m,f){const K=await fetch(`${Ae}/conversations/${h}/synthesis`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({turnId:m,synthesis:f})});return Fe(K)},async updateConversationTitle(h,m){const f=await fetch(`${Ae}/conversations/${h}/title`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:m})});return Fe(f)},async deleteConversation(h){const m=await fetch(`${Ae}/conversations/${h}`,{method:"DELETE"});return Fe(m)},async getStats(){const h=await fetch(`${Ae}/stats`);return Fe(h)}};function Pp({currentStage:h,onStageClick:m}){const f=[{id:"prompt",label:"Prompt",icon:bt},{id:"analyze",label:"Analyze",icon:cu},{id:"refine",label:"Refine",icon:Sp},{id:"breakdown",label:"Breakdown",icon:ou},{id:"recommend",label:"Recommend",icon:ts},{id:"select_model",label:"Select",icon:uu},{id:"generate",label:"Generate",icon:Qr},{id:"compare",label:"Compare",icon:rs},{id:"critic",label:"Critic AI",icon:Yt},{id:"branch",label:"Active Branch",icon:ir}],M=f.map(C=>C.id).indexOf(h);return l.jsxs("div",{className:"pipeline-wrapper glass-panel",children:[l.jsx("div",{className:"pipeline-inner",children:f.map((C,V)=>{const F=C.icon;let _="waiting";return V<M?_="completed":V===M&&(_="active"),l.jsxs(ru.Fragment,{children:[l.jsxs("div",{className:`stage-item ${_}`,onClick:()=>m&&m(C.id),title:`Stage: ${C.label} (${_})`,children:[l.jsx("div",{className:"stage-icon-wrap",children:_==="active"?l.jsx(na,{size:14,className:"animate-spin active-spinner"}):_==="completed"?l.jsx(Hr,{size:14,className:"completed-check"}):l.jsx(F,{size:14})}),l.jsx("span",{className:"stage-label",children:C.label})]}),V<f.length-1&&l.jsx("div",{className:`stage-connector ${V<M?"completed":""}`})]},C.id)})}),l.jsx("style",{children:`
        .pipeline-wrapper {
          padding: 0.65rem 1.25rem;
          margin-bottom: 1rem;
          border-radius: var(--radius-md);
          overflow-x: auto;
        }
        .pipeline-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 800px;
          gap: 0.5rem;
        }
        .stage-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .stage-icon-wrap {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          transition: all 0.25s ease;
        }
        .stage-item.waiting {
          opacity: 0.45;
        }
        .stage-item.waiting .stage-icon-wrap {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-dim);
          border: 1px solid var(--border-subtle);
        }
        .stage-item.waiting .stage-label {
          color: var(--text-dim);
        }
        .stage-item.active {
          opacity: 1;
        }
        .stage-item.active .stage-icon-wrap {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 0 12px var(--accent-glow);
          transform: scale(1.1);
        }
        .stage-item.active .stage-label {
          color: #fff;
          font-weight: 700;
        }
        .stage-item.completed {
          opacity: 0.9;
        }
        .stage-item.completed .stage-icon-wrap {
          background: rgba(16, 185, 129, 0.15);
          color: var(--accent-emerald);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .stage-item.completed .stage-label {
          color: var(--text-secondary);
        }
        .stage-label {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .stage-connector {
          flex: 1;
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          min-width: 14px;
          transition: all 0.3s ease;
        }
        .stage-connector.completed {
          background: var(--accent-emerald);
        }
      `})]})}function _p({analysis:h,refinement:m,recommendations:f,onUseRefined:K,onUseOriginal:M,onSelectRecommendedModels:C,onClose:V}){var B,ue,se,me,we,he,ye,Ee,Ve,De;const[F,_]=G.useState("refinement"),[Y,H]=G.useState(!1),[ne,O]=G.useState(!1),[fe,re]=G.useState((m==null?void 0:m.refinedPrompt)||""),ae=E=>{navigator.clipboard.writeText(E),H(!0),setTimeout(()=>H(!1),2e3)},U=()=>{K(fe),O(!1)};return l.jsxs("div",{className:"analysis-panel glass-panel",children:[l.jsxs("div",{className:"panel-header",children:[l.jsxs("div",{className:"panel-title-wrap",children:[l.jsx(ra,{size:18,className:"text-cyan"}),l.jsx("h3",{children:"Prompt Intelligence & Strategy"})]}),V&&l.jsx("button",{className:"btn-icon",onClick:V,children:l.jsx(ls,{size:16})})]}),l.jsxs("div",{className:"panel-tabs",children:[l.jsxs("button",{className:`panel-tab ${F==="refinement"?"active":""}`,onClick:()=>_("refinement"),children:[l.jsx(bt,{size:14}),l.jsx("span",{children:"Refinement"})]}),l.jsxs("button",{className:`panel-tab ${F==="breakdown"?"active":""}`,onClick:()=>_("breakdown"),children:[l.jsx(ou,{size:14}),l.jsx("span",{children:"Breakdown"})]}),l.jsxs("button",{className:`panel-tab ${F==="recommendation"?"active":""}`,onClick:()=>_("recommendation"),children:[l.jsx(ts,{size:14}),l.jsxs("span",{children:["Models (",((B=f==null?void 0:f.topRecommendation)==null?void 0:B.score)||95,"%)"]})]})]}),(h==null?void 0:h.intentDistribution)&&l.jsxs("div",{className:"intent-bar-section",children:[l.jsxs("div",{className:"intent-header",children:[l.jsx("span",{className:"intent-title",children:"Intent Distribution (AI-Estimated)"}),l.jsx("span",{className:"intent-badge badge badge-indigo",children:h.primaryCategory})]}),l.jsx("div",{className:"intent-meter",children:h.intentDistribution.map((E,Z)=>l.jsx("div",{className:"meter-segment",style:{width:`${E.percentage}%`,background:Z===0?"#6366f1":Z===1?"#06b6d4":Z===2?"#10b981":"#a855f7"},title:`${E.category}: ${E.percentage}%`},Z))}),l.jsx("div",{className:"intent-legend",children:h.intentDistribution.map((E,Z)=>l.jsxs("div",{className:"legend-item",children:[l.jsx("span",{className:"legend-dot",style:{background:Z===0?"#6366f1":Z===1?"#06b6d4":Z===2?"#10b981":"#a855f7"}}),l.jsxs("span",{children:[E.category,": ",l.jsxs("strong",{children:[E.percentage,"%"]})]})]},Z))})]}),F==="refinement"&&l.jsx("div",{className:"tab-body",children:l.jsxs("div",{className:"card-box glass-card",children:[l.jsxs("div",{className:"card-box-header",children:[l.jsxs("div",{className:"card-label",children:[l.jsx(bt,{size:14,className:"text-cyan"}),l.jsx("span",{children:"Refined & Augmented Prompt"})]}),l.jsxs("div",{className:"card-actions",children:[l.jsx("button",{className:"btn-icon",onClick:()=>ae((m==null?void 0:m.refinedPrompt)||""),title:"Copy",children:Y?l.jsx(Gt,{size:14,className:"text-emerald"}):l.jsx(Zi,{size:14})}),l.jsx("button",{className:"btn-icon",onClick:()=>{O(!ne),re((m==null?void 0:m.refinedPrompt)||"")},title:"Edit",children:l.jsx(tp,{size:14})})]})]}),ne?l.jsxs("div",{className:"edit-wrap",children:[l.jsx("textarea",{className:"edit-textarea",value:fe,onChange:E=>re(E.target.value),rows:6}),l.jsxs("div",{className:"edit-btn-row",children:[l.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>O(!1),children:"Cancel"}),l.jsx("button",{className:"btn btn-primary btn-sm",onClick:U,children:"Save & Apply"})]})]}):l.jsx("div",{className:"prompt-text-display",children:l.jsx("pre",{children:(m==null?void 0:m.refinedPrompt)||"Enter a prompt to see automated refinement..."})}),(m==null?void 0:m.improvements)&&m.improvements.length>0&&l.jsxs("div",{className:"improvements-list",children:[l.jsx("span",{className:"imp-title",children:"✨ Enhancements Applied:"}),l.jsx("ul",{children:m.improvements.map((E,Z)=>l.jsxs("li",{children:[l.jsx(Hr,{size:13,className:"text-emerald"}),l.jsx("span",{children:E})]},Z))})]}),l.jsxs("div",{className:"refinement-action-row",children:[l.jsxs("button",{className:"btn btn-cyan btn-sm flex-1",onClick:()=>K(m==null?void 0:m.refinedPrompt),children:[l.jsx(Gt,{size:14}),l.jsx("span",{children:"Use Refined Prompt"})]}),l.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>M(m==null?void 0:m.originalPrompt),children:l.jsx("span",{children:"Use Original"})})]})]})}),F==="breakdown"&&l.jsx("div",{className:"tab-body",children:l.jsxs("div",{className:"breakdown-grid",children:[l.jsxs("div",{className:"breakdown-item glass-card",children:[l.jsx("span",{className:"bd-label",children:"Goal & Purpose"}),l.jsx("span",{className:"bd-value",children:((ue=m==null?void 0:m.breakdown)==null?void 0:ue.goal)||"N/A"})]}),l.jsxs("div",{className:"breakdown-item glass-card",children:[l.jsx("span",{className:"bd-label",children:"Task Type"}),l.jsx("span",{className:"bd-value",children:((se=m==null?void 0:m.breakdown)==null?void 0:se.taskType)||"N/A"})]}),l.jsxs("div",{className:"breakdown-item glass-card",children:[l.jsx("span",{className:"bd-label",children:"Required Output Format"}),l.jsx("span",{className:"bd-value",children:((me=m==null?void 0:m.breakdown)==null?void 0:me.requiredOutput)||"N/A"})]}),l.jsxs("div",{className:"breakdown-item glass-card",children:[l.jsx("span",{className:"bd-label",children:"Detected Tech / Language"}),l.jsx("span",{className:"bd-value",children:((he=(we=m==null?void 0:m.breakdown)==null?void 0:we.technologies)==null?void 0:he.join(", "))||"None specified"})]}),l.jsxs("div",{className:"breakdown-item glass-card",children:[l.jsx("span",{className:"bd-label",children:"Expected Complexity"}),l.jsx("span",{className:"bd-value",children:((ye=m==null?void 0:m.breakdown)==null?void 0:ye.expectedComplexity)||"Standard"})]}),l.jsxs("div",{className:"breakdown-item glass-card",children:[l.jsx("span",{className:"bd-label",children:"Ambiguity / Assumptions"}),l.jsx("span",{className:"bd-value",children:((Ve=(Ee=m==null?void 0:m.breakdown)==null?void 0:Ee.assumptions)==null?void 0:Ve.join("; "))||"No ambiguity flagged"})]})]})}),F==="recommendation"&&l.jsx("div",{className:"tab-body",children:f!=null&&f.topRecommendation?l.jsxs("div",{className:"rec-wrap",children:[l.jsxs("div",{className:"top-rec-card glass-card",children:[l.jsxs("div",{className:"rec-badge-row",children:[l.jsxs("span",{className:"badge badge-emerald",children:[l.jsx(bt,{size:12})," Top Recommendation (",f.topRecommendation.score,"%)"]}),l.jsx("span",{className:"rec-provider",children:f.topRecommendation.provider})]}),l.jsx("h4",{className:"rec-model-name",children:f.topRecommendation.modelName}),l.jsx("p",{className:"rec-reason",children:f.topRecommendation.reason}),l.jsxs("div",{className:"rec-actions",children:[l.jsx("button",{className:"btn btn-primary btn-sm flex-1",onClick:()=>C([f.topRecommendation.modelId]),children:l.jsxs("span",{children:["Select ",f.topRecommendation.modelName]})}),f.suggestedComparisonPair&&f.suggestedComparisonPair.length>1&&l.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>C(f.suggestedComparisonPair),title:"Select top 2 models for multi-model comparison",children:[l.jsx(rs,{size:14}),l.jsx("span",{children:"Compare Top 2"})]})]})]}),l.jsxs("div",{className:"all-models-list",children:[l.jsx("span",{className:"list-title",children:"Model Suitability Rankings"}),(De=f.models)==null?void 0:De.map(E=>l.jsxs("div",{className:"model-score-row glass-card",children:[l.jsxs("div",{className:"model-left",children:[l.jsx("span",{className:"model-avatar",children:E.avatar}),l.jsxs("div",{children:[l.jsx("div",{className:"model-name-text",children:E.name}),l.jsx("div",{className:"model-rationale-text",children:E.recommendationRationale})]})]}),l.jsxs("div",{className:"model-right",children:[l.jsxs("span",{className:"score-num",children:[E.recommendationScore,"%"]}),l.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>C([E.id]),children:"Select"})]})]},E.id))]})]}):l.jsx("div",{className:"empty-state-text",children:"Enter a prompt to calculate dynamic model capability scores."})}),l.jsx("style",{children:`
        .analysis-panel {
          width: 380px;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-left: 1px solid var(--border-subtle);
          background: rgba(13, 18, 28, 0.95);
          overflow-y: auto;
          position: relative;
        }
        .panel-header {
          padding: 1.1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }
        .panel-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .panel-title-wrap h3 {
          font-size: 0.95rem;
          font-weight: 700;
        }
        .text-cyan { color: var(--accent-cyan); }
        .text-emerald { color: var(--accent-emerald); }
        .panel-tabs {
          display: flex;
          padding: 0.5rem 0.85rem;
          gap: 0.35rem;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.2);
        }
        .panel-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.45rem 0.5rem;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .panel-tab:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }
        .panel-tab.active {
          color: #fff;
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .intent-bar-section {
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .intent-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }
        .intent-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .intent-meter {
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
          display: flex;
          margin-bottom: 0.5rem;
        }
        .meter-segment {
          height: 100%;
          transition: width 0.3s ease;
        }
        .intent-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          color: var(--text-secondary);
        }
        .legend-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .tab-body {
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .card-box {
          padding: 1rem;
        }
        .card-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.65rem;
        }
        .card-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
        }
        .card-actions {
          display: flex;
          gap: 0.25rem;
        }
        .prompt-text-display pre {
          white-space: pre-wrap;
          word-break: break-word;
          font-size: 0.8rem;
          color: #e2e8f0;
          background: rgba(0, 0, 0, 0.35) !important;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          line-height: 1.5;
        }
        .improvements-list {
          margin-top: 0.75rem;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: var(--radius-sm);
          padding: 0.65rem;
        }
        .imp-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #6ee7b7;
          display: block;
          margin-bottom: 0.35rem;
        }
        .improvements-list ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .improvements-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .refinement-action-row {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.85rem;
        }
        .flex-1 { flex: 1; }
        .edit-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .edit-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-focus);
          border-radius: var(--radius-sm);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          padding: 0.5rem;
          resize: vertical;
        }
        .edit-btn-row {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .breakdown-grid {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .breakdown-item {
          padding: 0.75rem 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .bd-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .bd-value {
          font-size: 0.8rem;
          color: #f1f5f9;
        }
        .top-rec-card {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.04);
          padding: 1rem;
        }
        .rec-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .rec-provider {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .rec-model-name {
          font-size: 1.1rem;
          margin-bottom: 0.35rem;
        }
        .rec-reason {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.85rem;
        }
        .rec-actions {
          display: flex;
          gap: 0.5rem;
        }
        .all-models-list {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .list-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .model-score-row {
          padding: 0.65rem 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .model-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .model-avatar {
          font-size: 1.1rem;
        }
        .model-name-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
        }
        .model-rationale-text {
          font-size: 0.7rem;
          color: var(--text-muted);
          max-width: 170px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .model-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .score-num {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .btn-xs {
          padding: 0.25rem 0.55rem;
          font-size: 0.72rem;
        }
        .empty-state-text {
          text-align: center;
          color: var(--text-dim);
          font-size: 0.85rem;
          padding: 2rem 1rem;
        }
      `})]})}var as={};(function h(m,f,K,M){var C=!!(m.Worker&&m.Blob&&m.Promise&&m.OffscreenCanvas&&m.OffscreenCanvasRenderingContext2D&&m.HTMLCanvasElement&&m.HTMLCanvasElement.prototype.transferControlToOffscreen&&m.URL&&m.URL.createObjectURL),V=typeof Path2D=="function"&&typeof DOMMatrix=="function",F=(function(){if(!m.OffscreenCanvas)return!1;try{var d=new OffscreenCanvas(1,1),o=d.getContext("2d");o.fillRect(0,0,1,1);var v=d.transferToImageBitmap();o.createPattern(v,"no-repeat")}catch{return!1}return!0})();function _(){}function Y(d){var o=f.exports.Promise,v=o!==void 0?o:m.Promise;return typeof v=="function"?new v(d):(d(_,_),null)}var H=(function(d,o){return{transform:function(v){if(d)return v;if(o.has(v))return o.get(v);var b=new OffscreenCanvas(v.width,v.height),z=b.getContext("2d");return z.drawImage(v,0,0),o.set(v,b),b},clear:function(){o.clear()}}})(F,new Map),ne=(function(){var d=Math.floor(16.666666666666668),o,v,b={},z=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(o=function(L){var I=Math.random();return b[I]=requestAnimationFrame(function T(D){z===D||z+d-1<D?(z=D,delete b[I],L()):b[I]=requestAnimationFrame(T)}),I},v=function(L){b[L]&&cancelAnimationFrame(b[L])}):(o=function(L){return setTimeout(L,d)},v=function(L){return clearTimeout(L)}),{frame:o,cancel:v}})(),O=(function(){var d,o,v={};function b(z){function L(I,T){z.postMessage({options:I||{},callback:T})}z.init=function(T){var D=T.transferControlToOffscreen();z.postMessage({canvas:D},[D])},z.fire=function(T,D,J){if(o)return L(T,null),o;var oe=Math.random().toString(36).slice(2);return o=Y(function(ge){function je(w){w.data.callback===oe&&(delete v[oe],z.removeEventListener("message",je),o=null,H.clear(),J(),ge())}z.addEventListener("message",je),L(T,oe),v[oe]=je.bind(null,{data:{callback:oe}})}),o},z.reset=function(){z.postMessage({reset:!0});for(var T in v)v[T](),delete v[T]}}return function(){if(d)return d;if(!K&&C){var z=["var CONFETTI, SIZE = {}, module = {};","("+h.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{d=new Worker(URL.createObjectURL(new Blob([z])))}catch(L){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",L),null}b(d)}return d}})(),fe={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function re(d,o){return o?o(d):d}function ae(d){return d!=null}function U(d,o,v){return re(d&&ae(d[o])?d[o]:fe[o],v)}function B(d){return d<0?0:Math.floor(d)}function ue(d,o){return Math.floor(Math.random()*(o-d))+d}function se(d){return parseInt(d,16)}function me(d){return d.map(we)}function we(d){var o=String(d).replace(/[^0-9a-f]/gi,"");return o.length<6&&(o=o[0]+o[0]+o[1]+o[1]+o[2]+o[2]),{r:se(o.substring(0,2)),g:se(o.substring(2,4)),b:se(o.substring(4,6))}}function he(d){var o=U(d,"origin",Object);return o.x=U(o,"x",Number),o.y=U(o,"y",Number),o}function ye(d){d.width=document.documentElement.clientWidth,d.height=document.documentElement.clientHeight}function Ee(d){var o=d.getBoundingClientRect();d.width=o.width,d.height=o.height}function Ve(d){var o=document.createElement("canvas");return o.style.position="fixed",o.style.top="0px",o.style.left="0px",o.style.pointerEvents="none",o.style.zIndex=d,o}function De(d,o,v,b,z,L,I,T,D){d.save(),d.translate(o,v),d.rotate(L),d.scale(b,z),d.arc(0,0,1,I,T,D),d.restore()}function E(d){var o=d.angle*(Math.PI/180),v=d.spread*(Math.PI/180);return{x:d.x,y:d.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:d.startVelocity*.5+Math.random()*d.startVelocity,angle2D:-o+(.5*v-Math.random()*v),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:d.color,shape:d.shape,tick:0,totalTicks:d.ticks,decay:d.decay,drift:d.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:d.gravity*3,ovalScalar:.6,scalar:d.scalar,flat:d.flat}}function Z(d,o){o.x+=Math.cos(o.angle2D)*o.velocity+o.drift,o.y+=Math.sin(o.angle2D)*o.velocity+o.gravity,o.velocity*=o.decay,o.flat?(o.wobble=0,o.wobbleX=o.x+10*o.scalar,o.wobbleY=o.y+10*o.scalar,o.tiltSin=0,o.tiltCos=0,o.random=1):(o.wobble+=o.wobbleSpeed,o.wobbleX=o.x+10*o.scalar*Math.cos(o.wobble),o.wobbleY=o.y+10*o.scalar*Math.sin(o.wobble),o.tiltAngle+=.1,o.tiltSin=Math.sin(o.tiltAngle),o.tiltCos=Math.cos(o.tiltAngle),o.random=Math.random()+2);var v=o.tick++/o.totalTicks,b=o.x+o.random*o.tiltCos,z=o.y+o.random*o.tiltSin,L=o.wobbleX+o.random*o.tiltCos,I=o.wobbleY+o.random*o.tiltSin;if(d.fillStyle="rgba("+o.color.r+", "+o.color.g+", "+o.color.b+", "+(1-v)+")",d.beginPath(),V&&o.shape.type==="path"&&typeof o.shape.path=="string"&&Array.isArray(o.shape.matrix))d.fill(be(o.shape.path,o.shape.matrix,o.x,o.y,Math.abs(L-b)*.1,Math.abs(I-z)*.1,Math.PI/10*o.wobble));else if(o.shape.type==="bitmap"){var T=Math.PI/10*o.wobble,D=Math.abs(L-b)*.1,J=Math.abs(I-z)*.1,oe=o.shape.bitmap.width*o.scalar,ge=o.shape.bitmap.height*o.scalar,je=new DOMMatrix([Math.cos(T)*D,Math.sin(T)*D,-Math.sin(T)*J,Math.cos(T)*J,o.x,o.y]);je.multiplySelf(new DOMMatrix(o.shape.matrix));var w=d.createPattern(H.transform(o.shape.bitmap),"no-repeat");w.setTransform(je),d.globalAlpha=1-v,d.fillStyle=w,d.fillRect(o.x-oe/2,o.y-ge/2,oe,ge),d.globalAlpha=1}else if(o.shape==="circle")d.ellipse?d.ellipse(o.x,o.y,Math.abs(L-b)*o.ovalScalar,Math.abs(I-z)*o.ovalScalar,Math.PI/10*o.wobble,0,2*Math.PI):De(d,o.x,o.y,Math.abs(L-b)*o.ovalScalar,Math.abs(I-z)*o.ovalScalar,Math.PI/10*o.wobble,0,2*Math.PI);else if(o.shape==="star")for(var R=Math.PI/2*3,ce=4*o.scalar,_e=8*o.scalar,Ke=o.x,rt=o.y,st=5,Ne=Math.PI/st;st--;)Ke=o.x+Math.cos(R)*_e,rt=o.y+Math.sin(R)*_e,d.lineTo(Ke,rt),R+=Ne,Ke=o.x+Math.cos(R)*ce,rt=o.y+Math.sin(R)*ce,d.lineTo(Ke,rt),R+=Ne;else d.moveTo(Math.floor(o.x),Math.floor(o.y)),d.lineTo(Math.floor(o.wobbleX),Math.floor(z)),d.lineTo(Math.floor(L),Math.floor(I)),d.lineTo(Math.floor(b),Math.floor(o.wobbleY));return d.closePath(),d.fill(),o.tick<o.totalTicks}function xe(d,o,v,b,z){var L=o.slice(),I=d.getContext("2d"),T,D,J=Y(function(oe){function ge(){T=D=null,I.clearRect(0,0,b.width,b.height),H.clear(),z(),oe()}function je(){K&&!(b.width===M.width&&b.height===M.height)&&(b.width=d.width=M.width,b.height=d.height=M.height),!b.width&&!b.height&&(v(d),b.width=d.width,b.height=d.height),I.clearRect(0,0,b.width,b.height),L=L.filter(function(w){return Z(I,w)}),L.length?T=ne.frame(je):ge()}T=ne.frame(je),D=ge});return{addFettis:function(oe){return L=L.concat(oe),J},canvas:d,promise:J,reset:function(){T&&ne.cancel(T),D&&D()}}}function Re(d,o){var v=!d,b=!!U(o||{},"resize"),z=!1,L=U(o,"disableForReducedMotion",Boolean),I=C&&!!U(o||{},"useWorker"),T=I?O():null,D=v?ye:Ee,J=d&&T?!!d.__confetti_initialized:!1,oe=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,ge;function je(R,ce,_e){for(var Ke=U(R,"particleCount",B),rt=U(R,"angle",Number),st=U(R,"spread",Number),Ne=U(R,"startVelocity",Number),lt=U(R,"decay",Number),yn=U(R,"gravity",Number),It=U(R,"drift",Number),St=U(R,"colors",me),In=U(R,"ticks",Number),Rn=U(R,"shapes"),Dt=U(R,"scalar"),Ln=!!U(R,"flat"),sr=he(R),Xt=Ke,$t=[],la=d.width*sr.x,Kr=d.height*sr.y;Xt--;)$t.push(E({x:la,y:Kr,angle:rt,spread:st,startVelocity:Ne,color:St[Xt%St.length],shape:Rn[ue(0,Rn.length)],ticks:In,decay:lt,gravity:yn,drift:It,scalar:Dt,flat:Ln}));return ge?ge.addFettis($t):(ge=xe(d,$t,D,ce,_e),ge.promise)}function w(R){var ce=L||U(R,"disableForReducedMotion",Boolean),_e=U(R,"zIndex",Number);if(ce&&oe)return Y(function(Ne){Ne()});v&&ge?d=ge.canvas:v&&!d&&(d=Ve(_e),document.body.appendChild(d)),b&&!J&&D(d);var Ke={width:d.width,height:d.height};T&&!J&&T.init(d),J=!0,T&&(d.__confetti_initialized=!0);function rt(){if(T){var Ne={getBoundingClientRect:function(){if(!v)return d.getBoundingClientRect()}};D(Ne),T.postMessage({resize:{width:Ne.width,height:Ne.height}});return}Ke.width=Ke.height=null}function st(){ge=null,b&&(z=!1,m.removeEventListener("resize",rt)),v&&d&&(document.body.contains(d)&&document.body.removeChild(d),d=null,J=!1)}return b&&!z&&(z=!0,m.addEventListener("resize",rt,!1)),T?T.fire(R,Ke,st):je(R,Ke,st)}return w.reset=function(){T&&T.reset(),ge&&ge.reset()},w}var Me;function Le(){return Me||(Me=Re(null,{useWorker:!0,resize:!0})),Me}function be(d,o,v,b,z,L,I){var T=new Path2D(d),D=new Path2D;D.addPath(T,new DOMMatrix(o));var J=new Path2D;return J.addPath(D,new DOMMatrix([Math.cos(I)*z,Math.sin(I)*z,-Math.sin(I)*L,Math.cos(I)*L,v,b])),J}function P(d){if(!V)throw new Error("path confetti are not supported in this browser");var o,v;typeof d=="string"?o=d:(o=d.path,v=d.matrix);var b=new Path2D(o),z=document.createElement("canvas"),L=z.getContext("2d");if(!v){for(var I=1e3,T=I,D=I,J=0,oe=0,ge,je,w=0;w<I;w+=2)for(var R=0;R<I;R+=2)L.isPointInPath(b,w,R,"nonzero")&&(T=Math.min(T,w),D=Math.min(D,R),J=Math.max(J,w),oe=Math.max(oe,R));ge=J-T,je=oe-D;var ce=10,_e=Math.min(ce/ge,ce/je);v=[_e,0,0,_e,-Math.round(ge/2+T)*_e,-Math.round(je/2+D)*_e]}return{type:"path",path:o,matrix:v}}function X(d){var o,v=1,b="#000000",z='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof d=="string"?o=d:(o=d.text,v="scalar"in d?d.scalar:v,z="fontFamily"in d?d.fontFamily:z,b="color"in d?d.color:b);var L=10*v,I=""+L+"px "+z,T=new OffscreenCanvas(L,L),D=T.getContext("2d");D.font=I;var J=D.measureText(o),oe=Math.ceil(J.actualBoundingBoxRight+J.actualBoundingBoxLeft),ge=Math.ceil(J.actualBoundingBoxAscent+J.actualBoundingBoxDescent),je=2,w=J.actualBoundingBoxLeft+je,R=J.actualBoundingBoxAscent+je;oe+=je+je,ge+=je+je,T=new OffscreenCanvas(oe,ge),D=T.getContext("2d"),D.font=I,D.fillStyle=b,D.fillText(o,w,R);var ce=1/v;return{type:"bitmap",bitmap:T.transferToImageBitmap(),matrix:[ce,0,0,ce,-oe*ce/2,-ge*ce/2]}}f.exports=function(){return Le().apply(this,arguments)},f.exports.reset=function(){Le().reset()},f.exports.create=Re,f.exports.shapeFromPath=P,f.exports.shapeFromText=X})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),as,!1);const Tp=as.exports;as.exports.create;function Ip({turnData:h,onSelectBranch:m,onSynthesize:f,isSynthesizing:K,activeSelectedModelId:M}){var re,ae,U;const[C,V]=G.useState(null),[F,_]=G.useState(!0);if(!h||!h.responses||h.responses.length===0)return null;const Y=h.responses,H=h.criticEvaluation,ne=Y.length>1,O=(B,ue)=>{navigator.clipboard.writeText(ue),V(B),setTimeout(()=>V(null),2e3)},fe=B=>{try{Tp({particleCount:50,spread:60,origin:{y:.8},colors:["#6366f1","#06b6d4","#10b981","#f59e0b"]})}catch{}m(B)};return l.jsxs("div",{className:"comparison-arena-wrap",children:[ne&&H&&l.jsxs("div",{className:"critic-evaluation-panel glass-panel",children:[l.jsxs("div",{className:"critic-header",onClick:()=>_(!F),children:[l.jsxs("div",{className:"critic-title-row",children:[l.jsxs("div",{className:"critic-badge",children:[l.jsx(Yt,{size:16,className:"text-purple"}),l.jsx("span",{children:"Critic AI Evaluation"})]}),H.winner&&l.jsxs("span",{className:"critic-winner-tag",children:[l.jsx(au,{size:14,className:"text-amber"}),"Critic Pick: ",l.jsx("strong",{children:H.winner.modelName})," (",H.winner.score,"/100)"]})]}),l.jsx("button",{className:"btn-icon",children:F?l.jsx(Rf,{size:16}):l.jsx(Tf,{size:16})})]}),F&&l.jsxs("div",{className:"critic-body",children:[H.recommendationReason&&l.jsxs("div",{className:"critic-rationale-box",children:[l.jsx("strong",{children:"💡 Evaluator Verdict:"})," ",H.recommendationReason]}),l.jsx("div",{className:"score-table-wrap",children:l.jsxs("table",{className:"score-table",children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"Candidate Model"}),l.jsx("th",{children:"Correctness (35%)"}),l.jsx("th",{children:"Relevance (20%)"}),l.jsx("th",{children:"Completeness (20%)"}),l.jsx("th",{children:"Clarity (15%)"}),l.jsx("th",{children:"Instruction Following (10%)"}),l.jsx("th",{children:"Overall Score"})]})}),l.jsx("tbody",{children:(re=H.evaluations)==null?void 0:re.map(B=>{var se;const ue=B.modelId===((se=H.winner)==null?void 0:se.modelId);return l.jsxs("tr",{className:ue?"winner-row":"",children:[l.jsxs("td",{className:"model-cell",children:[l.jsx("span",{className:"ev-avatar",children:B.avatar}),l.jsx("strong",{children:B.modelName}),ue&&l.jsx("span",{className:"winner-pill",children:"⭐ Recommended"})]}),l.jsx("td",{children:l.jsx("span",{className:"score-cell",children:B.scores.correctness})}),l.jsx("td",{children:l.jsx("span",{className:"score-cell",children:B.scores.relevance})}),l.jsx("td",{children:l.jsx("span",{className:"score-cell",children:B.scores.completeness})}),l.jsx("td",{children:l.jsx("span",{className:"score-cell",children:B.scores.clarity})}),l.jsx("td",{children:l.jsx("span",{className:"score-cell",children:B.scores.instructionFollowing})}),l.jsx("td",{children:l.jsx("span",{className:`score-badge ${ue?"high-score":""}`,children:B.scores.overall})})]},B.modelId)})})]})}),l.jsx("div",{className:"critique-details-grid",children:(ae=H.evaluations)==null?void 0:ae.map(B=>{var ue,se;return l.jsxs("div",{className:"critique-card glass-card",children:[l.jsx("div",{className:"critique-card-title",children:l.jsxs("span",{children:[B.avatar," ",B.modelName," Critique"]})}),l.jsxs("div",{className:"critique-points",children:[l.jsxs("div",{className:"strengths-col",children:[l.jsx("span",{className:"col-label text-emerald",children:"Key Strengths"}),l.jsx("ul",{children:(ue=B.strengths)==null?void 0:ue.map((me,we)=>l.jsxs("li",{children:[l.jsx(Hr,{size:12,className:"text-emerald"})," ",me]},we))})]}),l.jsxs("div",{className:"weaknesses-col",children:[l.jsx("span",{className:"col-label text-amber",children:"Observations"}),l.jsx("ul",{children:(se=B.weaknesses)==null?void 0:se.map((me,we)=>l.jsxs("li",{children:[l.jsx(Of,{size:12,className:"text-amber"})," ",me]},we))})]})]})]},B.modelId)})}),l.jsxs("div",{className:"critic-disclaimer",children:["ℹ️ ",H.disclaimer," You retain full authority to select whichever response fits your workflow."]})]})]}),ne&&f&&l.jsxs("div",{className:"synthesis-action-bar",children:[l.jsxs("div",{className:"synthesis-text",children:[l.jsx(bt,{size:16,className:"text-purple"}),l.jsx("span",{children:"Want the best of all models combined into one consolidated answer?"})]}),l.jsxs("button",{className:"btn btn-primary btn-sm",onClick:f,disabled:K,children:[K?l.jsx(Qr,{size:14,className:"animate-spin"}):l.jsx(ra,{size:14}),l.jsx("span",{children:K?"Synthesizing Answers...":"Create Best Combined Answer"})]})]}),h.synthesis&&l.jsxs("div",{className:"synthesis-response-card glass-panel",children:[l.jsxs("div",{className:"response-card-header",children:[l.jsxs("div",{className:"model-id-badge",children:[l.jsx("span",{className:"avatar",children:"🔮"}),l.jsxs("div",{children:[l.jsx("div",{className:"model-name",children:"Hive Mind Synthesis AI"}),l.jsxs("div",{className:"model-sub",children:["Consensus from ",(U=h.synthesis.sources)==null?void 0:U.map(B=>B.name).join(" & ")]})]})]}),l.jsxs("div",{className:"header-actions",children:[l.jsx("button",{className:"btn-icon",onClick:()=>O("synthesis",h.synthesis.text),children:C==="synthesis"?l.jsx(Gt,{size:14,className:"text-emerald"}):l.jsx(Zi,{size:14})}),l.jsxs("button",{className:`btn btn-sm ${M==="synthesis"?"btn-emerald":"btn-secondary"}`,onClick:()=>fe("synthesis"),children:[M==="synthesis"?l.jsx(Gt,{size:14}):null,l.jsx("span",{children:M==="synthesis"?"Active Continuation Branch":"Use Synthesized Branch"})]})]})]}),l.jsx("div",{className:"response-body markdown-body",children:l.jsx("pre",{style:{whiteSpace:"pre-wrap"},children:h.synthesis.text})})]}),l.jsx("div",{className:`response-columns-container ${Y.length>1?"multi-col":"single-col"}`,children:Y.map((B,ue)=>{var we,he;const se=M===B.modelId,me=((we=H==null?void 0:H.winner)==null?void 0:we.modelId)===B.modelId;return l.jsxs("div",{className:`response-col-card glass-panel ${se?"selected-branch-card":""}`,children:[l.jsxs("div",{className:"response-card-header",children:[l.jsxs("div",{className:"model-id-badge",children:[l.jsx("span",{className:"avatar",children:B.avatar||"🤖"}),l.jsxs("div",{children:[l.jsxs("div",{className:"model-name-wrap",children:[l.jsx("span",{className:"model-name",children:B.modelName}),me&&l.jsx("span",{className:"badge badge-amber badge-xs",children:"Critic Top Pick"})]}),l.jsxs("div",{className:"telemetry-tags",children:[l.jsxs("span",{className:"telemetry-tag",children:[l.jsx(ns,{size:10})," ",B.provider]}),l.jsxs("span",{className:"telemetry-tag",children:[l.jsx(iu,{size:10})," ",B.latency,"ms"]}),((he=B.tokenUsage)==null?void 0:he.totalTokens)>0&&l.jsxs("span",{className:"telemetry-tag",children:[B.tokenUsage.totalTokens," tokens"]}),B.isLive&&l.jsx("span",{className:"badge badge-emerald badge-xs",children:"Live API"})]})]})]}),l.jsxs("div",{className:"header-actions",children:[l.jsx("button",{className:"btn-icon",onClick:()=>O(B.modelId,B.text),title:"Copy Answer",children:C===B.modelId?l.jsx(Gt,{size:14,className:"text-emerald"}):l.jsx(Zi,{size:14})}),l.jsxs("button",{className:`btn btn-sm ${se?"btn-emerald":"btn-secondary"}`,onClick:()=>fe(B.modelId),children:[se?l.jsx(Gt,{size:14}):null,l.jsx("span",{children:se?"Active Branch":"Use this response"})]})]})]}),l.jsx("div",{className:"response-body markdown-body",children:l.jsx("pre",{style:{whiteSpace:"pre-wrap",background:"transparent !important"},children:B.text})}),l.jsx("div",{className:"card-footer-branch",children:l.jsx("button",{className:`btn btn-sm w-full ${se?"btn-emerald":"btn-secondary"}`,onClick:()=>fe(B.modelId),children:se?l.jsxs(l.Fragment,{children:[l.jsx(Hr,{size:15}),l.jsx("span",{children:"Currently Active Branch for Follow-ups"})]}):l.jsxs(l.Fragment,{children:[l.jsx(Xf,{size:14}),l.jsx("span",{children:"Select Response to Continue Conversation"})]})})})]},B.modelId||ue)})}),l.jsx("style",{children:`
        .comparison-arena-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .critic-evaluation-panel {
          border: 1px solid rgba(168, 85, 247, 0.3);
          background: rgba(22, 18, 38, 0.85);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .critic-header {
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 1px solid rgba(168, 85, 247, 0.15);
          background: rgba(168, 85, 247, 0.06);
        }
        .critic-title-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .critic-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          color: #d8b4fe;
        }
        .text-purple { color: #c084fc; }
        .text-amber { color: #fbbf24; }
        .critic-winner-tag {
          font-size: 0.8rem;
          color: #fef08a;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(245, 158, 11, 0.15);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .critic-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .critic-rationale-box {
          font-size: 0.85rem;
          color: #f1f5f9;
          background: rgba(255, 255, 255, 0.04);
          border-left: 3px solid var(--accent-purple);
          padding: 0.75rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          line-height: 1.5;
        }
        .score-table-wrap {
          overflow-x: auto;
        }
        .score-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8rem;
          text-align: left;
        }
        .score-table th {
          padding: 0.6rem 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          border-bottom: 1px solid var(--border-subtle);
          white-space: nowrap;
        }
        .score-table td {
          padding: 0.65rem 0.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          vertical-align: middle;
        }
        .model-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .winner-row {
          background: rgba(168, 85, 247, 0.08);
        }
        .winner-pill {
          font-size: 0.65rem;
          font-weight: 700;
          color: #fef08a;
          background: rgba(245, 158, 11, 0.2);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .score-cell {
          font-family: var(--font-mono);
          color: #cbd5e1;
        }
        .score-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .score-badge.high-score {
          background: rgba(16, 185, 129, 0.2);
          color: #6ee7b7;
          border: 1px solid rgba(16, 185, 129, 0.4);
        }
        .critique-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }
        .critique-card {
          padding: 0.85rem 1rem;
        }
        .critique-card-title {
          font-size: 0.825rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          color: #fff;
        }
        .critique-points {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .col-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.25rem;
        }
        .critique-points ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .critique-points li {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
        }
        .critic-disclaimer {
          font-size: 0.72rem;
          color: var(--text-dim);
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.65rem;
        }
        .synthesis-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(168, 85, 247, 0.1);
          border: 1px dashed rgba(168, 85, 247, 0.35);
          border-radius: var(--radius-md);
        }
        .synthesis-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #e9d5ff;
        }
        .synthesis-response-card {
          border: 1px solid rgba(168, 85, 247, 0.4);
          background: rgba(24, 18, 42, 0.9);
          padding: 1.25rem;
        }
        .response-columns-container {
          display: grid;
          gap: 1.25rem;
        }
        .multi-col {
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
        }
        .single-col {
          grid-template-columns: 1fr;
        }
        .response-col-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          position: relative;
          transition: all 0.25s ease;
        }
        .selected-branch-card {
          border-color: var(--accent-emerald);
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.2);
          background: rgba(16, 32, 28, 0.75);
        }
        .response-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1rem;
        }
        .model-id-badge {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .model-id-badge .avatar {
          font-size: 1.4rem;
        }
        .model-name-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .model-name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }
        .model-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .telemetry-tags {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.2rem;
          flex-wrap: wrap;
        }
        .telemetry-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }
        .badge-xs {
          font-size: 0.65rem;
          padding: 0.1rem 0.45rem;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .response-body {
          flex: 1;
          font-size: 0.875rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        .card-footer-branch {
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }
        .w-full { width: 100%; }
        @media (max-width: 800px) {
          .multi-col { grid-template-columns: 1fr; }
        }
      `})]})}function Rp({conversation:h,onSelectBranch:m}){return!h||!h.turns||h.turns.length===0?l.jsxs("div",{className:"branch-viewer-empty glass-panel",children:[l.jsx(ir,{size:32,className:"text-dim"}),l.jsx("p",{children:"No active conversation turns yet. Send a prompt to start building the branch tree."})]}):l.jsxs("div",{className:"branch-viewer-container glass-panel",children:[l.jsxs("div",{className:"branch-header",children:[l.jsxs("div",{className:"branch-title-wrap",children:[l.jsx(ir,{size:18,className:"text-emerald"}),l.jsx("h3",{children:"Provider-Neutral Shared Memory & Branch Tree"})]}),l.jsxs("span",{className:"badge badge-indigo",children:[h.turns.length," Turn(s)"]})]}),l.jsx("div",{className:"turns-timeline",children:h.turns.map((f,K)=>{var M;return l.jsxs("div",{className:"turn-branch-node",children:[l.jsxs("div",{className:"turn-prompt-badge",children:[l.jsxs("span",{className:"turn-num",children:["Turn ",K+1]}),l.jsx("span",{className:"turn-prompt-text",children:f.userPrompt})]}),l.jsxs("div",{className:"candidate-branches-row",children:[l.jsx(Uf,{size:16,className:"branch-arrow text-muted"}),l.jsxs("div",{className:"branch-chips-list",children:[(M=f.responses)==null?void 0:M.map(C=>{const V=f.selectedModelId===C.modelId;return l.jsxs("button",{className:`branch-chip glass-card ${V?"active-branch":""}`,onClick:()=>m(f.turnId,C.modelId),title:`Click to activate ${C.modelName} branch for downstream turns`,children:[l.jsx("span",{className:"chip-avatar",children:C.avatar}),l.jsx("span",{className:"chip-name",children:C.modelName}),V?l.jsxs("span",{className:"active-tag",children:[l.jsx(Gt,{size:12})," Active"]}):l.jsx("span",{className:"switch-tag",children:"Switch"})]},C.modelId)}),f.synthesis&&l.jsxs("button",{className:`branch-chip glass-card ${f.selectedModelId==="synthesis"?"active-branch":""}`,onClick:()=>m(f.turnId,"synthesis"),children:[l.jsx("span",{className:"chip-avatar",children:"🔮"}),l.jsx("span",{className:"chip-name",children:"Synthesized Consensus"}),f.selectedModelId==="synthesis"&&l.jsxs("span",{className:"active-tag",children:[l.jsx(Gt,{size:12})," Active"]})]})]})]})]},f.turnId)})}),l.jsx("style",{children:`
        .branch-viewer-container {
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border-radius: var(--radius-lg);
          background: rgba(13, 18, 28, 0.9);
        }
        .branch-viewer-empty {
          padding: 3rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
        }
        .branch-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1.25rem;
        }
        .branch-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .branch-title-wrap h3 {
          font-size: 1rem;
          font-weight: 700;
        }
        .text-emerald { color: var(--accent-emerald); }
        .text-dim { color: var(--text-dim); }
        .text-muted { color: var(--text-muted); }
        .turns-timeline {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
        }
        .turn-branch-node {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .turn-prompt-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .turn-num {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.15);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .turn-prompt-text {
          font-size: 0.85rem;
          color: #fff;
          font-weight: 500;
        }
        .candidate-branches-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-left: 1.25rem;
        }
        .branch-arrow {
          flex-shrink: 0;
        }
        .branch-chips-list {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }
        .branch-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
        }
        .branch-chip:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          transform: translateY(-1px);
        }
        .branch-chip.active-branch {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.5);
          color: #6ee7b7;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
        }
        .active-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-weight: 700;
          font-size: 0.7rem;
        }
        .switch-tag {
          font-size: 0.68rem;
          color: var(--text-dim);
        }
      `})]})}function Lp({models:h=[],criticWeights:m,initialPrompt:f="",onOpenSettings:K}){const[M,C]=G.useState([]),[V,F]=G.useState(null),[_,Y]=G.useState(null),[H,ne]=G.useState(""),[O,fe]=G.useState("compare"),[re,ae]=G.useState(["gpt-4o","claude-3-5-sonnet"]),[U,B]=G.useState(f),[ue,se]=G.useState(null),[me,we]=G.useState(!1),[he,ye]=G.useState("prompt"),[Ee,Ve]=G.useState(!0),[De,E]=G.useState(!1),[Z,xe]=G.useState(null),[Re,Me]=G.useState(!1),[Le,be]=G.useState(!1),[P,X]=G.useState(!1),d=G.useRef(null),o=G.useRef(null);G.useEffect(()=>{v()},[]),G.useEffect(()=>{f&&(B(f),I(f))},[f]);const v=async()=>{try{const w=await Be.getConversations();C(w||[]),w&&w.length>0&&!V&&b(w[0].id)}catch(w){console.error("Failed to load conversations:",w)}},b=async w=>{try{const R=await Be.getConversation(w);Y(R),F(w),ye("prompt")}catch(R){console.error("Failed to load conversation:",R)}},z=async()=>{try{const w=await Be.createConversation("New Hive Mind Chat");C(R=>[w,...R]),Y(w),F(w.id),B(""),se(null),xe(null),ye("prompt")}catch(w){console.error("Failed to create new chat:",w)}},L=async(w,R)=>{w.stopPropagation();try{await Be.deleteConversation(R);const ce=M.filter(_e=>_e.id!==R);C(ce),V===R&&(ce.length>0?b(ce[0].id):z())}catch(ce){console.error("Failed to delete conversation:",ce)}},I=async w=>{var R;if(!(!w||w.trim().length<3)){Me(!0),ye("analyze");try{const ce=await Be.preflightPrompt(w);xe(ce),ye("refine"),O==="auto"&&((R=ce.recommendations)!=null&&R.topRecommendation)&&ae([ce.recommendations.topRecommendation.modelId])}catch(ce){console.error("Preflight analysis error:",ce)}finally{Me(!1)}}},T=w=>{O==="single"?ae([w]):re.includes(w)?re.length>1&&ae(re.filter(R=>R!==w)):ae([...re,w])},D=async w=>{var ce;const R=(ce=w.target.files)==null?void 0:ce[0];if(R){we(!0);try{const _e=await Be.uploadDocument(R);se(_e)}catch(_e){alert("File upload error: "+_e.message)}finally{we(!1)}}},J=async()=>{var R,ce,_e,Ke,rt,st;const w=U.trim();if(!(!w||Le)){be(!0),ye("generate");try{let Ne=Z;Ne||(Ne=await Be.preflightPrompt(w),xe(Ne));let lt=V;lt||(lt=(await Be.createConversation(w.substring(0,35))).id,F(lt));const yn=re.length>0?re:["gpt-4o","claude-3-5-sonnet"],It=await Be.generateResponses({prompt:((R=Ne.refinement)==null?void 0:R.refinedPrompt)||w,modelIds:yn,conversationId:lt,documentContext:ue?ue.fullText:""});ye("compare");let St=null;It.responses&&It.responses.length>1&&(ye("critic"),St=await Be.criticEvaluate({originalPrompt:w,refinedPrompt:((ce=Ne.refinement)==null?void 0:ce.refinedPrompt)||w,responses:It.responses,weights:m}));const In=((_e=St==null?void 0:St.winner)==null?void 0:_e.modelId)||((Ke=It.responses[0])==null?void 0:Ke.modelId),Rn=await Be.saveTurn(lt,{userPrompt:w,refinedPrompt:((rt=Ne.refinement)==null?void 0:rt.refinedPrompt)||w,analysis:Ne.analysis,breakdown:(st=Ne.refinement)==null?void 0:st.breakdown,recommendations:Ne.recommendations,responses:It.responses,criticEvaluation:St,selectedModelId:In});await b(lt),await v(),B(""),se(null),ye("branch"),setTimeout(()=>{var Dt;(Dt=d.current)==null||Dt.scrollIntoView({behavior:"smooth"})},100)}catch(Ne){alert("Workflow execution error: "+Ne.message)}finally{be(!1)}}},oe=async(w,R)=>{if(V)try{await Be.selectBranch(V,w,R),await b(V)}catch(ce){console.error("Failed to select branch:",ce)}},ge=async w=>{if(!(!V||P)){X(!0);try{const R=await Be.synthesize({originalPrompt:w.userPrompt,refinedPrompt:w.refinedPrompt,responses:w.responses,criticEvaluation:w.criticEvaluation});await Be.saveSynthesis(V,w.turnId,R),await b(V)}catch(R){alert("Synthesis error: "+R.message)}finally{X(!1)}}},je=M.filter(w=>{var R;return(R=w.title)==null?void 0:R.toLowerCase().includes(H.toLowerCase())});return l.jsxs("div",{className:"workspace-container",children:[l.jsxs("aside",{className:"workspace-sidebar glass-panel",children:[l.jsxs("div",{className:"sidebar-top",children:[l.jsxs("button",{className:"btn btn-primary btn-sm w-full",onClick:z,children:[l.jsx(rp,{size:16}),l.jsx("span",{children:"New Hive Mind Chat"})]}),l.jsxs("div",{className:"search-box",children:[l.jsx(cu,{size:14,className:"search-icon"}),l.jsx("input",{type:"text",placeholder:"Search history...",value:H,onChange:w=>ne(w.target.value),className:"search-input"})]})]}),l.jsxs("div",{className:"conversations-list",children:[l.jsx("div",{className:"sidebar-section-title",children:"Past Sessions"}),je.length===0?l.jsx("div",{className:"empty-history-text",children:"No matching sessions found"}):je.map(w=>l.jsxs("div",{className:`conv-item ${w.id===V?"active":""}`,onClick:()=>b(w.id),children:[l.jsxs("div",{className:"conv-item-left",children:[l.jsx("span",{className:"conv-title",children:w.title}),l.jsxs("span",{className:"conv-turns-badge",children:[w.turnCount||0," turn(s)"]})]}),l.jsx("button",{className:"btn-icon delete-conv-btn",onClick:R=>L(R,w.id),title:"Delete Session",children:l.jsx(Np,{size:13})})]},w.id))]}),l.jsx("div",{className:"sidebar-footer",children:l.jsxs("button",{className:`btn btn-secondary btn-sm w-full ${De?"active-tree-btn":""}`,onClick:()=>E(!De),children:[l.jsx(ir,{size:15,className:"text-emerald"}),l.jsx("span",{children:De?"Hide Branch Tree":"View Memory Branches"})]})})]}),l.jsxs("main",{className:"workspace-main",children:[l.jsxs("div",{className:"main-chat-header glass-panel",children:[l.jsxs("div",{className:"header-left",children:[l.jsx("h2",{className:"current-chat-title",children:(_==null?void 0:_.title)||"New Hive Mind Chat"}),l.jsxs("div",{className:"mode-toggle-group",children:[l.jsx("span",{className:"mode-label",children:"Mode:"}),l.jsx("button",{className:`mode-chip ${O==="auto"?"active":""}`,onClick:()=>fe("auto"),title:"Auto analyzes prompt and picks optimal model",children:"Auto Recommend"}),l.jsx("button",{className:`mode-chip ${O==="single"?"active":""}`,onClick:()=>{fe("single"),re.length>1&&ae([re[0]])},title:"Explicit single model execution",children:"Single Model"}),l.jsx("button",{className:`mode-chip ${O==="compare"?"active":""}`,onClick:()=>fe("compare"),title:"Parallel multi-model comparison with Critic AI",children:"Multi-Model Arena"})]})]}),l.jsx("div",{className:"header-right",children:l.jsxs("button",{className:`btn btn-secondary btn-sm ${Ee?"active-panel-btn":""}`,onClick:()=>Ve(!Ee),children:[l.jsx(ra,{size:15,className:"text-cyan"}),l.jsx("span",{children:Ee?"Hide Intelligence Panel":"Show Intelligence Panel"})]})})]}),l.jsx(Pp,{currentStage:he,onStageClick:w=>{["analyze","refine","breakdown","recommend"].includes(w)&&Ve(!0)}}),De&&l.jsx(Rp,{conversation:_,onSelectBranch:oe}),l.jsxs("div",{className:"chat-messages-container",children:[!(_!=null&&_.turns)||_.turns.length===0?l.jsxs("div",{className:"chat-welcome-box glass-panel",children:[l.jsx("div",{className:"welcome-avatar",children:"🧠"}),l.jsx("h3",{children:"Welcome to AI Hive Mind"}),l.jsxs("p",{children:["Enter a question or coding prompt below. The platform will analyze its intent, refine the specifications, dispatch it across your selected AI models concurrently, and provide a comprehensive ",l.jsx("strong",{children:"Critic AI evaluation"}),"."]}),l.jsxs("div",{className:"quick-benchmark-row",children:[l.jsx("span",{className:"quick-label",children:"Try primary benchmark:"}),l.jsx("button",{className:"quick-btn",onClick:()=>{const w="Write a C program to check whether a number is prime and explain the logic.";B(w),I(w)},children:'⚡ "Write a C program to check whether a number is prime..."'})]})]}):_.turns.map((w,R)=>l.jsxs("div",{className:"conversation-turn-block",children:[l.jsxs("div",{className:"user-message-card glass-panel",children:[l.jsxs("div",{className:"msg-header",children:[l.jsx("span",{className:"msg-author",children:"You"}),l.jsx("span",{className:"msg-time",children:new Date(w.timestamp||Date.now()).toLocaleTimeString()})]}),l.jsx("div",{className:"msg-text",children:w.userPrompt}),w.refinedPrompt&&w.refinedPrompt!==w.userPrompt&&l.jsxs("div",{className:"refined-tag-box",children:[l.jsx(bt,{size:12,className:"text-cyan"}),l.jsx("span",{children:"Executed via Refined Specifications"})]})]}),l.jsx(Ip,{turnData:w,onSelectBranch:ce=>oe(w.turnId,ce),onSynthesize:()=>ge(w),isSynthesizing:P,activeSelectedModelId:w.selectedModelId})]},w.turnId||R)),Le&&l.jsxs("div",{className:"generating-indicator glass-panel",children:[l.jsx(na,{size:20,className:"animate-spin text-cyan"}),l.jsxs("div",{children:[l.jsx("strong",{children:"Generating Parallel Model Responses & Running Critic AI..."}),l.jsxs("p",{children:["Calling ",re.join(", ")," simultaneously"]})]})]}),l.jsx("div",{ref:d})]}),l.jsxs("div",{className:"composer-container glass-panel",children:[l.jsxs("div",{className:"models-select-bar",children:[l.jsx("span",{className:"select-bar-label",children:"Active Models:"}),l.jsx("div",{className:"models-chips-scroll",children:h.map(w=>{const R=re.includes(w.id);return l.jsxs("button",{className:`model-pill ${R?"selected":""}`,onClick:()=>T(w.id),title:`${w.name} (${w.provider}) - ${w.description}`,children:[l.jsx("span",{className:"status-dot active"}),l.jsx("span",{className:"pill-avatar",children:w.avatar}),l.jsx("span",{className:"pill-name",children:w.name}),R?l.jsx(uu,{size:13,className:"text-cyan"}):l.jsx(kp,{size:13,className:"text-dim"})]},w.id)})})]}),ue&&l.jsxs("div",{className:"attached-doc-chip",children:[l.jsx(su,{size:14,className:"text-cyan"}),l.jsxs("span",{children:[ue.filename," (",ue.charCount," chars)"]}),l.jsx("button",{className:"btn-icon",onClick:()=>se(null),children:l.jsx(ls,{size:13})})]}),l.jsxs("div",{className:"composer-input-row",children:[l.jsx("input",{type:"file",ref:o,style:{display:"none"},accept:".txt,.pdf,.docx,.md,.json",onChange:D}),l.jsx("button",{className:"btn-icon attach-btn",onClick:()=>{var w;return(w=o.current)==null?void 0:w.click()},disabled:me,title:"Attach Document (PDF, DOCX, TXT)",children:me?l.jsx(na,{size:18,className:"animate-spin"}):l.jsx(Zf,{size:18})}),l.jsx("textarea",{className:"composer-textarea",placeholder:"Enter your prompt... (e.g. 'Write a C program to check whether a number is prime and explain the logic.')",rows:2,value:U,onChange:w=>{B(w.target.value),w.target.value.length>5&&w.target.value.endsWith(" ")&&I(w.target.value)},onKeyDown:w=>{w.key==="Enter"&&!w.shiftKey&&(w.preventDefault(),J())}}),l.jsx("button",{className:"btn btn-secondary btn-icon preflight-btn",onClick:()=>I(U),disabled:Re||!U.trim(),title:"Analyze & Refine Prompt",children:l.jsx(bt,{size:17,className:Re?"animate-spin text-cyan":"text-cyan"})}),l.jsxs("button",{className:"btn btn-primary send-btn",onClick:J,disabled:Le||!U.trim(),children:[Le?l.jsx(na,{size:16,className:"animate-spin"}):l.jsx(dp,{size:16}),l.jsx("span",{children:"Send"})]})]})]})]}),Ee&&l.jsx(_p,{analysis:Z==null?void 0:Z.analysis,refinement:Z==null?void 0:Z.refinement,recommendations:Z==null?void 0:Z.recommendations,onUseRefined:w=>{w&&(B(w),I(w))},onUseOriginal:w=>{w&&B(w)},onSelectRecommendedModels:w=>{ae(w)},onClose:()=>Ve(!1)}),l.jsx("style",{children:`
        .workspace-container {
          display: flex;
          height: calc(100vh - 65px);
          overflow: hidden;
          position: relative;
        }
        .workspace-sidebar {
          width: 280px;
          border-right: 1px solid var(--border-subtle);
          background: rgba(10, 14, 22, 0.95);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          border-radius: 0;
        }
        .sidebar-top {
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-light);
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .search-icon {
          color: var(--text-muted);
        }
        .search-input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 0.8rem;
          outline: none;
          width: 100%;
        }
        .conversations-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .sidebar-section-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.5rem;
        }
        .empty-history-text {
          font-size: 0.75rem;
          color: var(--text-dim);
          padding: 1rem 0.5rem;
          text-align: center;
        }
        .conv-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .conv-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .conv-item.active {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .conv-item-left {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          overflow: hidden;
        }
        .conv-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 190px;
        }
        .conv-turns-badge {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
        .delete-conv-btn {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .conv-item:hover .delete-conv-btn {
          opacity: 1;
        }
        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border-subtle);
        }
        .active-tree-btn {
          background: rgba(16, 185, 129, 0.15) !important;
          border-color: rgba(16, 185, 129, 0.4) !important;
        }
        .workspace-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 1rem 1.5rem;
          gap: 0.85rem;
        }
        .main-chat-header {
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-md);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .current-chat-title {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .mode-toggle-group {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .mode-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .mode-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mode-chip:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
        .mode-chip.active {
          background: rgba(6, 182, 212, 0.15);
          border-color: rgba(6, 182, 212, 0.4);
          color: #67e8f9;
        }
        .active-panel-btn {
          background: rgba(6, 182, 212, 0.15) !important;
          border-color: rgba(6, 182, 212, 0.4) !important;
        }
        .chat-messages-container {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-right: 0.5rem;
        }
        .chat-welcome-box {
          margin: 3rem auto;
          max-width: 650px;
          text-align: center;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .welcome-avatar {
          font-size: 3rem;
        }
        .chat-welcome-box h3 {
          font-size: 1.5rem;
        }
        .chat-welcome-box p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .quick-benchmark-row {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .quick-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .quick-btn {
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.35);
          color: #c7d2fe;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.825rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quick-btn:hover {
          background: rgba(99, 102, 241, 0.25);
          transform: translateY(-1px);
        }
        .conversation-turn-block {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .user-message-card {
          padding: 1.1rem 1.25rem;
          border-left: 3px solid var(--accent-primary);
        }
        .msg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
        }
        .msg-author {
          font-weight: 700;
          color: #a5b4fc;
        }
        .msg-text {
          font-size: 0.95rem;
          color: #fff;
          line-height: 1.5;
        }
        .refined-tag-box {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.6rem;
          font-size: 0.72rem;
          color: #67e8f9;
          background: rgba(6, 182, 212, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .generating-indicator {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-color: rgba(6, 182, 212, 0.3);
          background: rgba(6, 182, 212, 0.05);
        }
        .generating-indicator strong {
          color: #fff;
          font-size: 0.9rem;
        }
        .generating-indicator p {
          color: var(--text-secondary);
          font-size: 0.75rem;
        }
        .composer-container {
          padding: 0.85rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
        }
        .models-select-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        .select-bar-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .models-chips-scroll {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .model-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .model-pill:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }
        .model-pill.selected {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.4);
          color: #fff;
        }
        .attached-doc-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: #67e8f9;
          width: fit-content;
        }
        .composer-input-row {
          display: flex;
          align-items: flex-end;
          gap: 0.6rem;
        }
        .composer-textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          line-height: 1.5;
          outline: none;
          resize: none;
          max-height: 120px;
        }
        .attach-btn, .preflight-btn {
          padding: 0.5rem;
          margin-bottom: 0.2rem;
        }
        .send-btn {
          padding: 0.6rem 1.25rem;
          margin-bottom: 0.2rem;
        }
      `})]})}function Op({models:h=[]}){const[m,f]=G.useState(null),[K,M]=G.useState(!0),C=async()=>{M(!0);try{const F=await Be.getStats();f(F)}catch(F){console.error("Failed to load stats:",F)}finally{M(!1)}};G.useEffect(()=>{C()},[]);const V=m&&m.totalRequests>0;return l.jsxs("div",{className:"dashboard-container",children:[l.jsxs("div",{className:"dash-header",children:[l.jsxs("div",{children:[l.jsx("h1",{className:"dash-title",children:"Telemetry & Usage Analytics"}),l.jsx("p",{className:"dash-subtitle",children:"Real-time performance metrics and multi-model consensus statistics"})]}),l.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:C,disabled:K,children:[l.jsx(ap,{size:14,className:K?"animate-spin":""}),l.jsx("span",{children:"Refresh Metrics"})]})]}),V?l.jsxs("div",{className:"stats-layout",children:[l.jsxs("div",{className:"metric-cards-grid",children:[l.jsxs("div",{className:"metric-card glass-card",children:[l.jsx("div",{className:"metric-icon-wrap",style:{color:"#6366f1",background:"rgba(99,102,241,0.12)"},children:l.jsx(tu,{size:22})}),l.jsxs("div",{children:[l.jsx("span",{className:"metric-label",children:"Total Orchestrated Turns"}),l.jsx("span",{className:"metric-value",children:m.totalRequests})]})]}),l.jsxs("div",{className:"metric-card glass-card",children:[l.jsx("div",{className:"metric-icon-wrap",style:{color:"#06b6d4",background:"rgba(6,182,212,0.12)"},children:l.jsx(iu,{size:22})}),l.jsxs("div",{children:[l.jsx("span",{className:"metric-label",children:"Connected Models"}),l.jsx("span",{className:"metric-value",children:h.length})]})]}),l.jsxs("div",{className:"metric-card glass-card",children:[l.jsx("div",{className:"metric-icon-wrap",style:{color:"#10b981",background:"rgba(16,185,129,0.12)"},children:l.jsx(au,{size:22})}),l.jsxs("div",{children:[l.jsx("span",{className:"metric-label",children:"Critic Top Picks Logged"}),l.jsx("span",{className:"metric-value",children:Object.values(m.criticWins||{}).reduce((F,_)=>F+_,0)})]})]}),l.jsxs("div",{className:"metric-card glass-card",children:[l.jsx("div",{className:"metric-icon-wrap",style:{color:"#f59e0b",background:"rgba(245,158,11,0.12)"},children:l.jsx(Qr,{size:22})}),l.jsxs("div",{children:[l.jsx("span",{className:"metric-label",children:"User Chosen Branches"}),l.jsx("span",{className:"metric-value",children:Object.values(m.userSelections||{}).reduce((F,_)=>F+_,0)})]})]})]}),l.jsxs("div",{className:"model-stats-card glass-panel",children:[l.jsx("h3",{className:"section-heading",children:"Model Performance & Usage Distribution"}),l.jsx("div",{className:"table-responsive",children:l.jsxs("table",{className:"stats-table",children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"Model Name"}),l.jsx("th",{children:"Provider"}),l.jsx("th",{children:"Requests Served"}),l.jsx("th",{children:"Average Latency"}),l.jsx("th",{children:"Critic Recommendation Wins"}),l.jsx("th",{children:"User Final Selections"})]})}),l.jsx("tbody",{children:h.map(F=>{var O,fe,re,ae;const _=((O=m.modelUsage)==null?void 0:O[F.id])||0,Y=(fe=m.averageLatency)!=null&&fe[F.id]?`${m.averageLatency[F.id]} ms`:"—",H=((re=m.criticWins)==null?void 0:re[F.id])||0,ne=((ae=m.userSelections)==null?void 0:ae[F.id])||0;return l.jsxs("tr",{children:[l.jsxs("td",{className:"model-name-cell",children:[l.jsx("span",{children:F.avatar}),l.jsx("strong",{children:F.name})]}),l.jsx("td",{children:l.jsx("span",{className:"badge badge-indigo",children:F.provider})}),l.jsx("td",{children:l.jsx("span",{className:"num-cell",children:_})}),l.jsx("td",{children:l.jsx("span",{className:"num-cell",children:Y})}),l.jsx("td",{children:l.jsx("span",{className:"num-cell text-emerald",children:H})}),l.jsx("td",{children:l.jsx("span",{className:"num-cell text-cyan",children:ne})})]},F.id)})})]})})]})]}):l.jsxs("div",{className:"empty-stats-card glass-panel",children:[l.jsx(tu,{size:48,className:"text-dim animate-pulse"}),l.jsx("h3",{children:"No Telemetry Data Recorded Yet"}),l.jsx("p",{children:"Real performance data, latency benchmarks, token usage, and Critic AI selections will appear here as you run prompts in the AI Workspace."})]}),l.jsx("style",{children:`
        .dashboard-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .dash-title {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }
        .dash-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .empty-stats-card {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          max-width: 600px;
          margin: 2rem auto;
        }
        .empty-stats-card h3 {
          font-size: 1.3rem;
        }
        .empty-stats-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .stats-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .metric-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }
        .metric-card {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .metric-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .metric-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .metric-value {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 800;
          color: #fff;
        }
        .model-stats-card {
          padding: 1.5rem;
        }
        .section-heading {
          font-size: 1.15rem;
          margin-bottom: 1.25rem;
        }
        .table-responsive {
          overflow-x: auto;
        }
        .stats-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.875rem;
        }
        .stats-table th {
          padding: 0.85rem 1rem;
          color: var(--text-muted);
          font-weight: 600;
          border-bottom: 1px solid var(--border-subtle);
          white-space: nowrap;
        }
        .stats-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .model-name-cell {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .num-cell {
          font-family: var(--font-mono);
          font-weight: 600;
        }
      `})]})}function Ap({onSendToWorkspace:h}){const[m,f]=G.useState(`SOFTWARE SERVICE AGREEMENT & LIABILITY CLAUSE
1. LIMITATION OF LIABILITY: Under no circumstances shall Provider's total aggregate liability exceed $50.00 USD, regardless of the cause of action, negligence, data loss, or breach of contract.
2. INTELLECTUAL PROPERTY: Customer grants Provider an irrevocable, perpetual, worldwide, royalty-free license to use, reproduce, modify, and distribute any Customer Data ingested into the System for training commercial AI models.
3. TERMINATION: Provider reserves the sole right to terminate access immediately without prior notice or refund.`),[K,M]=G.useState(!1),[C,V]=G.useState(null),F=async()=>{M(!0);try{await new Promise(Y=>setTimeout(Y,1e3)),V({riskScore:84,riskLevel:"HIGH RISK (Unfavorable to Customer)",flaggedClauses:[{clause:"Limitation of Liability ($50 USD cap)",risk:"Severe",finding:"Extremely disproportionate liability ceiling that leaves customer unprotected against severe outages, security breaches, or total data loss.",recommendation:"Negotiate liability cap to minimum 12 months of fees paid or $1,000,000 insurance coverage."},{clause:"Intellectual Property (Perpetual AI training license)",risk:"Critical",finding:"Permits the vendor to ingest proprietary trade secrets and confidential customer data into general AI models.",recommendation:"Strike out AI training rights and insist on complete enterprise data isolation."},{clause:"Unilateral Termination without Notice",risk:"Moderate",finding:"Allows immediate service discontinuation without transition period or pro-rated refund.",recommendation:"Require 30 days written notice with guaranteed data export window."}],modelConsensus:"GPT-4o, Claude 3.5 Sonnet, and Gemini consensus agree this agreement presents unacceptable exposure."})}catch(Y){alert("Analysis failed: "+Y.message)}finally{M(!1)}},_=()=>{const Y=`Please draft an amended, redlined version of the following software service agreement to mitigate the critical risks identified (Liability cap, IP training rights, and Termination notice):

${m}`;h(Y)};return l.jsxs("div",{className:"legal-container",children:[l.jsx("div",{className:"legal-header",children:l.jsxs("div",{children:[l.jsx("div",{className:"tag-row",children:l.jsx("span",{className:"badge badge-purple",children:"Academic Project Showcase"})}),l.jsx("h1",{className:"legal-title",children:"Legal Contract & Document Risk Analyzer"}),l.jsx("p",{className:"legal-subtitle",children:"Multi-LLM cross-examination of complex contracts, extraction of high-risk clauses, and Critic AI risk scoring."})]})}),l.jsxs("div",{className:"legal-grid",children:[l.jsxs("div",{className:"legal-input-card glass-panel",children:[l.jsx("div",{className:"card-top",children:l.jsxs("div",{className:"top-title",children:[l.jsx(su,{size:18,className:"text-cyan"}),l.jsx("h3",{children:"Contract / Document Text"})]})}),l.jsx("textarea",{className:"legal-textarea",rows:14,value:m,onChange:Y=>f(Y.target.value),placeholder:"Paste contract terms or clauses here..."}),l.jsx("div",{className:"input-footer",children:l.jsxs("button",{className:"btn btn-primary btn-md w-full",onClick:F,disabled:K||!m.trim(),children:[K?l.jsx(Qr,{size:16,className:"animate-spin"}):l.jsx(Yt,{size:16}),l.jsx("span",{children:K?"Auditing Clauses Across LLMs...":"Audit Document with Hive Mind"})]})})]}),l.jsxs("div",{className:"legal-results-card glass-panel",children:[l.jsxs("div",{className:"card-top",children:[l.jsxs("div",{className:"top-title",children:[l.jsx(Yt,{size:18,className:"text-purple"}),l.jsx("h3",{children:"Critic AI Risk Audit & Cross-Model Findings"})]}),C&&l.jsx("span",{className:"badge badge-amber",children:C.riskLevel})]}),C?l.jsxs("div",{className:"audit-content",children:[l.jsxs("div",{className:"risk-score-box glass-card",children:[l.jsxs("div",{className:"risk-score-header",children:[l.jsx("span",{children:"Calculated Contract Risk Level"}),l.jsxs("span",{className:"score-number text-rose",children:[C.riskScore,"/100"]})]}),l.jsx("div",{className:"risk-meter",children:l.jsx("div",{className:"meter-fill",style:{width:`${C.riskScore}%`}})}),l.jsxs("p",{className:"consensus-text",children:["🤖 ",C.modelConsensus]})]}),l.jsxs("div",{className:"flagged-clauses-list",children:[l.jsx("h4",{children:"⚠️ Identified Risk Flags & Suggested Counter-Terms"}),C.flaggedClauses.map((Y,H)=>l.jsxs("div",{className:"clause-card glass-card",children:[l.jsxs("div",{className:"clause-header",children:[l.jsx("strong",{children:Y.clause}),l.jsxs("span",{className:`badge ${Y.risk==="Critical"?"badge-rose":Y.risk==="Severe"?"badge-amber":"badge-indigo"}`,children:[Y.risk," Risk"]})]}),l.jsxs("p",{className:"finding-text",children:[l.jsx("strong",{children:"Analysis:"})," ",Y.finding]}),l.jsxs("div",{className:"rec-box",children:[l.jsx(Hr,{size:14,className:"text-emerald flex-shrink-0"}),l.jsxs("span",{children:[l.jsx("strong",{children:"Proposed Remedy:"})," ",Y.recommendation]})]})]},H))]}),l.jsx("div",{className:"export-action-row",children:l.jsxs("button",{className:"btn btn-cyan btn-md w-full",onClick:_,children:[l.jsx("span",{children:"Send Redline Request to AI Workspace"}),l.jsx(Tn,{size:16})]})})]}):l.jsxs("div",{className:"empty-audit-state",children:[l.jsx(Yt,{size:40,className:"text-dim"}),l.jsx("p",{children:'Click "Audit Document with Hive Mind" to trigger parallel clause extraction and multi-LLM risk scoring.'})]})]})]}),l.jsx("style",{children:`
        .legal-container {
          max-width: 1380px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .tag-row {
          margin-bottom: 0.5rem;
        }
        .legal-title {
          font-size: 2.2rem;
          margin-bottom: 0.4rem;
        }
        .legal-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 800px;
        }
        .legal-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 1.5rem;
        }
        .legal-input-card, .legal-results-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .top-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .top-title h3 {
          font-size: 1.05rem;
        }
        .legal-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          padding: 1rem;
          resize: vertical;
          line-height: 1.6;
        }
        .input-footer {
          margin-top: 1rem;
        }
        .empty-audit-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
        }
        .audit-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .risk-score-box {
          padding: 1rem 1.25rem;
        }
        .risk-score-header {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .score-number {
          font-family: var(--font-mono);
          font-size: 1.15rem;
        }
        .text-rose { color: var(--accent-rose); }
        .risk-meter {
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.6rem;
        }
        .meter-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b, #f43f5e);
        }
        .consensus-text {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .flagged-clauses-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .flagged-clauses-list h4 {
          font-size: 0.9rem;
        }
        .clause-card {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .clause-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #fff;
        }
        .badge-rose {
          background: rgba(244, 63, 94, 0.15);
          color: #fda4af;
          border: 1px solid rgba(244, 63, 94, 0.3);
        }
        .finding-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .rec-box {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.6rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          color: #6ee7b7;
        }
        .export-action-row {
          margin-top: 0.5rem;
        }
        @media (max-width: 900px) {
          .legal-grid { grid-template-columns: 1fr; }
        }
      `})]})}function Fp({isOpen:h,onClose:m,models:f,onSaveModels:K,criticWeights:M,onSaveCriticWeights:C}){const[V,F]=G.useState("keys"),[_,Y]=G.useState({}),[H,ne]=G.useState({sarvam:"",openai:"",gemini:"",anthropic:"",groq:"",ollamaUrl:"http://127.0.0.1:11434"}),[O,fe]=G.useState({}),[re,ae]=G.useState(null),[U,B]=G.useState(f||[]),[ue,se]=G.useState(M||{}),[me,we]=G.useState(!1);if(G.useEffect(()=>{h&&(Be.getKeyStatus().then(E=>{Y(E||{}),E.ollamaUrl&&ne(Z=>({...Z,ollamaUrl:E.ollamaUrl}))}).catch(console.error),B(JSON.parse(JSON.stringify(f))),se({...M}))},[h,f,M]),!h)return null;const he=async E=>{ae(E);try{const Z=await Be.testModelConnection(E);fe(xe=>({...xe,[E]:Z}))}catch(Z){fe(xe=>({...xe,[E]:{status:"error",message:Z.message}}))}finally{ae(null)}},ye=async()=>{try{await Be.updateKeys(H);const E=await Be.getKeyStatus();Y(E),we(!0),setTimeout(()=>we(!1),2500)}catch(E){alert("Error saving keys: "+E.message)}},Ee=(E,Z,xe)=>{B(Re=>Re.map(Me=>Me.id===E?{...Me,capabilities:{...Me.capabilities,[Z]:parseInt(xe,10)}}:Me))},Ve=(E,Z)=>{se(xe=>({...xe,[E]:parseFloat(Z)}))},De=async()=>{await ye(),K(U),C(ue),await Be.updateModelSettings(U,ue),m()};return l.jsxs("div",{className:"modal-overlay",onClick:m,children:[l.jsxs("div",{className:"modal-content glass-panel",onClick:E=>E.stopPropagation(),children:[l.jsxs("div",{className:"settings-header",children:[l.jsxs("div",{className:"title-with-icon",children:[l.jsx(vp,{size:20,className:"text-indigo"}),l.jsx("h2",{children:"System Settings & Model Configuration"})]}),l.jsx("button",{className:"btn-icon",onClick:m,children:l.jsx(ls,{size:18})})]}),l.jsxs("div",{className:"settings-tabs",children:[l.jsxs("button",{className:`tab-btn ${V==="keys"?"active":""}`,onClick:()=>F("keys"),children:[l.jsx(Qf,{size:15}),l.jsx("span",{children:"API Keys & Providers"})]}),l.jsxs("button",{className:`tab-btn ${V==="capabilities"?"active":""}`,onClick:()=>F("capabilities"),children:[l.jsx(ns,{size:15}),l.jsx("span",{children:"Model Profiles"})]}),l.jsxs("button",{className:`tab-btn ${V==="critic"?"active":""}`,onClick:()=>F("critic"),children:[l.jsx(Yt,{size:15}),l.jsx("span",{children:"Critic AI Weights"})]})]}),l.jsxs("div",{className:"settings-body",children:[V==="keys"&&l.jsxs("div",{className:"tab-section",children:[l.jsxs("div",{className:"info-banner",children:[l.jsx(hp,{size:18,className:"text-emerald"}),l.jsx("p",{children:"Keys are handled exclusively on the backend server. When an API key is absent, the platform safely runs via deterministic academic simulation."})]}),l.jsxs("div",{className:"keys-grid",children:[l.jsxs("div",{className:"key-row glass-card",children:[l.jsxs("div",{className:"key-info",children:[l.jsxs("div",{className:"key-title",children:[l.jsx("span",{children:"🇮🇳 Sarvam AI (105B Indic Model)"}),_.sarvam?l.jsx("span",{className:"badge badge-emerald",children:"Active & Configured"}):l.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),l.jsx("p",{className:"key-desc",children:"Powers Sarvam 105B multilingual and Indic domain intelligence."})]}),l.jsxs("div",{className:"key-input-row",children:[l.jsx("input",{type:"password",placeholder:_.sarvam?"••••••••••••••••":"Paste Sarvam API Key",className:"key-input",value:H.sarvam,onChange:E=>ne({...H,sarvam:E.target.value})}),l.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>he("sarvam-105b"),disabled:re==="sarvam-105b",children:re==="sarvam-105b"?"Testing...":"Test"})]}),O["sarvam-105b"]&&l.jsxs("div",{className:"test-feedback",children:["Status: ",O["sarvam-105b"].message," (",O["sarvam-105b"].latency,"ms)"]})]}),l.jsxs("div",{className:"key-row glass-card",children:[l.jsxs("div",{className:"key-info",children:[l.jsxs("div",{className:"key-title",children:[l.jsx("span",{children:"✨ Google Gemini API Key"}),_.gemini?l.jsx("span",{className:"badge badge-emerald",children:"Configured"}):l.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),l.jsx("p",{className:"key-desc",children:"Powers Gemini 2.0 Flash / Pro models."})]}),l.jsxs("div",{className:"key-input-row",children:[l.jsx("input",{type:"password",placeholder:_.gemini?"••••••••••••••••":"Paste AI Studio API Key",className:"key-input",value:H.gemini,onChange:E=>ne({...H,gemini:E.target.value})}),l.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>he("gemini-2-0-flash"),disabled:re==="gemini-2-0-flash",children:re==="gemini-2-0-flash"?"Testing...":"Test"})]}),O["gemini-2-0-flash"]&&l.jsxs("div",{className:"test-feedback",children:["Status: ",O["gemini-2-0-flash"].message," (",O["gemini-2-0-flash"].latency,"ms)"]})]}),l.jsxs("div",{className:"key-row glass-card",children:[l.jsxs("div",{className:"key-info",children:[l.jsxs("div",{className:"key-title",children:[l.jsx("span",{children:"🧠 OpenAI API Key"}),_.openai?l.jsx("span",{className:"badge badge-emerald",children:"Configured"}):l.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),l.jsx("p",{className:"key-desc",children:"Powers GPT-4o and OpenAI endpoints."})]}),l.jsxs("div",{className:"key-input-row",children:[l.jsx("input",{type:"password",placeholder:_.openai?"••••••••••••••••":"Paste OpenAI sk-...",className:"key-input",value:H.openai,onChange:E=>ne({...H,openai:E.target.value})}),l.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>he("gpt-4o"),disabled:re==="gpt-4o",children:re==="gpt-4o"?"Testing...":"Test"})]}),O["gpt-4o"]&&l.jsxs("div",{className:"test-feedback",children:["Status: ",O["gpt-4o"].message," (",O["gpt-4o"].latency,"ms)"]})]}),l.jsxs("div",{className:"key-row glass-card",children:[l.jsxs("div",{className:"key-info",children:[l.jsxs("div",{className:"key-title",children:[l.jsx("span",{children:"🎭 Anthropic Claude API Key"}),_.anthropic?l.jsx("span",{className:"badge badge-emerald",children:"Configured"}):l.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),l.jsx("p",{className:"key-desc",children:"Powers Claude 3.5 Sonnet."})]}),l.jsxs("div",{className:"key-input-row",children:[l.jsx("input",{type:"password",placeholder:_.anthropic?"••••••••••••••••":"Paste sk-ant-...",className:"key-input",value:H.anthropic,onChange:E=>ne({...H,anthropic:E.target.value})}),l.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>he("claude-3-5-sonnet"),disabled:re==="claude-3-5-sonnet",children:re==="claude-3-5-sonnet"?"Testing...":"Test"})]})]}),l.jsxs("div",{className:"key-row glass-card",children:[l.jsxs("div",{className:"key-info",children:[l.jsxs("div",{className:"key-title",children:[l.jsx("span",{children:"⚡ Groq Cloud API Key"}),_.groq?l.jsx("span",{className:"badge badge-emerald",children:"Configured"}):l.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),l.jsx("p",{className:"key-desc",children:"Powers ultra-fast Llama 3.3 70B inference."})]}),l.jsxs("div",{className:"key-input-row",children:[l.jsx("input",{type:"password",placeholder:_.groq?"••••••••••••••••":"Paste gsk_...",className:"key-input",value:H.groq,onChange:E=>ne({...H,groq:E.target.value})}),l.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>he("llama-3-3-70b"),disabled:re==="llama-3-3-70b",children:re==="llama-3-3-70b"?"Testing...":"Test"})]})]}),l.jsxs("div",{className:"key-row glass-card",children:[l.jsxs("div",{className:"key-info",children:[l.jsx("div",{className:"key-title",children:l.jsx("span",{children:"🦙 Ollama Local Host URL"})}),l.jsx("p",{className:"key-desc",children:"Private local model instance."})]}),l.jsxs("div",{className:"key-input-row",children:[l.jsx("input",{type:"text",placeholder:"http://127.0.0.1:11434",className:"key-input",value:H.ollamaUrl,onChange:E=>ne({...H,ollamaUrl:E.target.value})}),l.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>he("ollama-local"),disabled:re==="ollama-local",children:re==="ollama-local"?"Testing...":"Test"})]})]})]})]}),V==="capabilities"&&l.jsxs("div",{className:"tab-section",children:[l.jsx("p",{className:"section-instruction",children:"Adjust capability profiles to customize how the Recommendation Engine calculates match percentages for different prompt types."}),l.jsx("div",{className:"capabilities-editor-list",children:U.map(E=>l.jsxs("div",{className:"model-cap-card glass-card",children:[l.jsxs("div",{className:"cap-card-header",children:[l.jsx("span",{className:"avatar",children:E.avatar}),l.jsxs("div",{children:[l.jsx("strong",{children:E.name}),l.jsxs("span",{className:"cap-provider-tag",children:[" (",E.provider,")"]})]})]}),l.jsx("div",{className:"sliders-grid",children:["coding","reasoning","creative","summarization","speed"].map(Z=>{var xe,Re;return l.jsxs("div",{className:"slider-item",children:[l.jsxs("div",{className:"slider-label-row",children:[l.jsx("span",{className:"cap-name",children:Z}),l.jsxs("span",{className:"cap-val",children:[((xe=E.capabilities)==null?void 0:xe[Z])||85,"%"]})]}),l.jsx("input",{type:"range",min:"50",max:"99",value:((Re=E.capabilities)==null?void 0:Re[Z])||85,onChange:Me=>Ee(E.id,Z,Me.target.value),className:"cap-range"})]},Z)})})]},E.id))})]}),V==="critic"&&l.jsxs("div",{className:"tab-section",children:[l.jsx("p",{className:"section-instruction",children:"Customize the weighting formulas used by Critic AI to evaluate candidate responses."}),l.jsx("div",{className:"critic-weights-card glass-card",children:[{key:"correctness",label:"Correctness & Accuracy",default:35},{key:"relevance",label:"Relevance to Prompt",default:20},{key:"completeness",label:"Completeness & Depth",default:20},{key:"clarity",label:"Clarity & Formatting",default:15},{key:"instructionFollowing",label:"Instruction Following",default:10}].map(E=>l.jsxs("div",{className:"weight-slider-row",children:[l.jsxs("div",{className:"weight-info",children:[l.jsx("span",{className:"weight-title",children:E.label}),l.jsxs("span",{className:"weight-percent",children:[Math.round((ue[E.key]||E.default/100)*100),"%"]})]}),l.jsx("input",{type:"range",min:"0.05",max:"0.6",step:"0.05",value:ue[E.key]||E.default/100,onChange:Z=>Ve(E.key,Z.target.value),className:"cap-range"})]},E.key))})]})]}),l.jsxs("div",{className:"settings-footer",children:[me&&l.jsxs("span",{className:"save-toast text-emerald",children:[l.jsx(Gt,{size:16})," Saved!"]}),l.jsx("button",{className:"btn btn-secondary btn-sm",onClick:m,children:"Cancel"}),l.jsxs("button",{className:"btn btn-primary btn-sm",onClick:De,children:[l.jsx(sp,{size:15}),l.jsx("span",{children:"Apply & Save Configuration"})]})]})]}),l.jsx("style",{children:`
        .settings-header {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }
        .title-with-icon {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .title-with-icon h2 {
          font-size: 1.15rem;
        }
        .text-indigo { color: var(--accent-primary); }
        .settings-tabs {
          display: flex;
          padding: 0.6rem 1.5rem;
          gap: 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.2);
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }
        .tab-btn.active {
          color: #fff;
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .settings-body {
          padding: 1.5rem;
          max-height: 60vh;
          overflow-y: auto;
        }
        .info-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: #a7f3d0;
          margin-bottom: 1.25rem;
        }
        .keys-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .key-row {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .key-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          font-weight: 700;
          color: #fff;
        }
        .key-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .key-input-row {
          display: flex;
          gap: 0.5rem;
        }
        .key-input {
          flex: 1;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          color: #fff;
          padding: 0.45rem 0.75rem;
          font-size: 0.8rem;
          font-family: var(--font-mono);
        }
        .test-feedback {
          font-size: 0.72rem;
          color: var(--accent-cyan);
        }
        .section-instruction {
          font-size: 0.825rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        .capabilities-editor-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .model-cap-card {
          padding: 1rem;
        }
        .cap-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }
        .cap-provider-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .sliders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }
        .slider-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .slider-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--text-secondary);
          text-transform: capitalize;
        }
        .cap-val {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .cap-range {
          accent-color: var(--accent-primary);
          cursor: pointer;
        }
        .critic-weights-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .weight-slider-row {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .weight-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #fff;
          font-weight: 600;
        }
        .weight-percent {
          font-family: var(--font-mono);
          color: var(--accent-purple);
        }
        .settings-footer {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          border-top: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.25);
        }
        .save-toast {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 600;
        }
      `})]})}function Dp(){const[h,m]=G.useState("landing"),[f,K]=G.useState([]),[M,C]=G.useState({}),[V,F]=G.useState(!1),[_,Y]=G.useState("");G.useEffect(()=>{H()},[]);const H=async()=>{try{const O=await Be.getModels();O.models&&K(O.models),O.criticWeights&&C(O.criticWeights)}catch(O){console.error("Failed to load models:",O)}},ne=(O="")=>{Y(O),m("workspace")};return l.jsxs("div",{className:"app-container",children:[l.jsx(Ep,{activeView:h,setActiveView:m,onOpenSettings:()=>F(!0)}),l.jsxs("div",{className:"main-content",children:[h==="landing"&&l.jsx(Mp,{onStartWorkspace:()=>ne(""),onSelectSamplePrompt:O=>ne(O)}),h==="workspace"&&l.jsx(Lp,{models:f,criticWeights:M,initialPrompt:_,onOpenSettings:()=>F(!0)}),h==="dashboard"&&l.jsx(Op,{models:f}),h==="legal"&&l.jsx(Ap,{onSendToWorkspace:O=>ne(O)})]}),l.jsx(Fp,{isOpen:V,onClose:()=>F(!1),models:f,onSaveModels:O=>K(O),criticWeights:M,onSaveCriticWeights:O=>C(O)})]})}gf.createRoot(document.getElementById("root")).render(l.jsx(ru.StrictMode,{children:l.jsx(Dp,{})}));
