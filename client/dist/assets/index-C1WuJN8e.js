(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const R of document.querySelectorAll('link[rel="modulepreload"]'))S(R);new MutationObserver(R=>{for(const P of R)if(P.type==="childList")for(const Z of P.addedNodes)Z.tagName==="LINK"&&Z.rel==="modulepreload"&&S(Z)}).observe(document,{childList:!0,subtree:!0});function m(R){const P={};return R.integrity&&(P.integrity=R.integrity),R.referrerPolicy&&(P.referrerPolicy=R.referrerPolicy),R.crossOrigin==="use-credentials"?P.credentials="include":R.crossOrigin==="anonymous"?P.credentials="omit":P.credentials="same-origin",P}function S(R){if(R.ep)return;R.ep=!0;const P=m(R);fetch(R.href,P)}})();function ld(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var Gs={exports:{}},Kr={},Ys={exports:{}},fe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qc;function om(){if(qc)return fe;qc=1;var h=Symbol.for("react.element"),p=Symbol.for("react.portal"),m=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),P=Symbol.for("react.provider"),Z=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),G=Symbol.for("react.memo"),W=Symbol.for("react.lazy"),re=Symbol.iterator;function ee(o){return o===null||typeof o!="object"?null:(o=re&&o[re]||o["@@iterator"],typeof o=="function"?o:null)}var ce={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},V=Object.assign,A={};function D(o,v,C){this.props=o,this.context=v,this.refs=A,this.updater=C||ce}D.prototype.isReactComponent={},D.prototype.setState=function(o,v){if(typeof o!="object"&&typeof o!="function"&&o!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,o,v,"setState")},D.prototype.forceUpdate=function(o){this.updater.enqueueForceUpdate(this,o,"forceUpdate")};function Q(){}Q.prototype=D.prototype;function oe(o,v,C){this.props=o,this.context=v,this.refs=A,this.updater=C||ce}var de=oe.prototype=new Q;de.constructor=oe,V(de,D.prototype),de.isPureReactComponent=!0;var he=Array.isArray,M=Object.prototype.hasOwnProperty,X={current:null},je={key:!0,ref:!0,__self:!0,__source:!0};function pe(o,v,C){var E,L={},F=null,T=null;if(v!=null)for(E in v.ref!==void 0&&(T=v.ref),v.key!==void 0&&(F=""+v.key),v)M.call(v,E)&&!je.hasOwnProperty(E)&&(L[E]=v[E]);var B=arguments.length-2;if(B===1)L.children=C;else if(1<B){for(var ne=Array(B),me=0;me<B;me++)ne[me]=arguments[me+2];L.children=ne}if(o&&o.defaultProps)for(E in B=o.defaultProps,B)L[E]===void 0&&(L[E]=B[E]);return{$$typeof:h,type:o,key:F,ref:T,props:L,_owner:X.current}}function Oe(o,v){return{$$typeof:h,type:o.type,key:v,ref:o.ref,props:o.props,_owner:o._owner}}function We(o){return typeof o=="object"&&o!==null&&o.$$typeof===h}function K(o){var v={"=":"=0",":":"=2"};return"$"+o.replace(/[=:]/g,function(C){return v[C]})}var ve=/\/+/g;function ue(o,v){return typeof o=="object"&&o!==null&&o.key!=null?K(""+o.key):v.toString(36)}function Ce(o,v,C,E,L){var F=typeof o;(F==="undefined"||F==="boolean")&&(o=null);var T=!1;if(o===null)T=!0;else switch(F){case"string":case"number":T=!0;break;case"object":switch(o.$$typeof){case h:case p:T=!0}}if(T)return T=o,L=L(T),o=E===""?"."+ue(T,0):E,he(L)?(C="",o!=null&&(C=o.replace(ve,"$&/")+"/"),Ce(L,v,C,"",function(me){return me})):L!=null&&(We(L)&&(L=Oe(L,C+(!L.key||T&&T.key===L.key?"":(""+L.key).replace(ve,"$&/")+"/")+o)),v.push(L)),1;if(T=0,E=E===""?".":E+":",he(o))for(var B=0;B<o.length;B++){F=o[B];var ne=E+ue(F,B);T+=Ce(F,v,C,ne,L)}else if(ne=ee(o),typeof ne=="function")for(o=ne.call(o),B=0;!(F=o.next()).done;)F=F.value,ne=E+ue(F,B++),T+=Ce(F,v,C,ne,L);else if(F==="object")throw v=String(o),Error("Objects are not valid as a React child (found: "+(v==="[object Object]"?"object with keys {"+Object.keys(o).join(", ")+"}":v)+"). If you meant to render a collection of children, use an array instead.");return T}function Ne(o,v,C){if(o==null)return o;var E=[],L=0;return Ce(o,E,"","",function(F){return v.call(C,F,L++)}),E}function Ae(o){if(o._status===-1){var v=o._result;v=v(),v.then(function(C){(o._status===0||o._status===-1)&&(o._status=1,o._result=C)},function(C){(o._status===0||o._status===-1)&&(o._status=2,o._result=C)}),o._status===-1&&(o._status=0,o._result=v)}if(o._status===1)return o._result.default;throw o._result}var we={current:null},k={transition:null},I={ReactCurrentDispatcher:we,ReactCurrentBatchConfig:k,ReactCurrentOwner:X};function d(){throw Error("act(...) is not supported in production builds of React.")}return fe.Children={map:Ne,forEach:function(o,v,C){Ne(o,function(){v.apply(this,arguments)},C)},count:function(o){var v=0;return Ne(o,function(){v++}),v},toArray:function(o){return Ne(o,function(v){return v})||[]},only:function(o){if(!We(o))throw Error("React.Children.only expected to receive a single React element child.");return o}},fe.Component=D,fe.Fragment=m,fe.Profiler=R,fe.PureComponent=oe,fe.StrictMode=S,fe.Suspense=O,fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I,fe.act=d,fe.cloneElement=function(o,v,C){if(o==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+o+".");var E=V({},o.props),L=o.key,F=o.ref,T=o._owner;if(v!=null){if(v.ref!==void 0&&(F=v.ref,T=X.current),v.key!==void 0&&(L=""+v.key),o.type&&o.type.defaultProps)var B=o.type.defaultProps;for(ne in v)M.call(v,ne)&&!je.hasOwnProperty(ne)&&(E[ne]=v[ne]===void 0&&B!==void 0?B[ne]:v[ne])}var ne=arguments.length-2;if(ne===1)E.children=C;else if(1<ne){B=Array(ne);for(var me=0;me<ne;me++)B[me]=arguments[me+2];E.children=B}return{$$typeof:h,type:o.type,key:L,ref:F,props:E,_owner:T}},fe.createContext=function(o){return o={$$typeof:Z,_currentValue:o,_currentValue2:o,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},o.Provider={$$typeof:P,_context:o},o.Consumer=o},fe.createElement=pe,fe.createFactory=function(o){var v=pe.bind(null,o);return v.type=o,v},fe.createRef=function(){return{current:null}},fe.forwardRef=function(o){return{$$typeof:_,render:o}},fe.isValidElement=We,fe.lazy=function(o){return{$$typeof:W,_payload:{_status:-1,_result:o},_init:Ae}},fe.memo=function(o,v){return{$$typeof:G,type:o,compare:v===void 0?null:v}},fe.startTransition=function(o){var v=k.transition;k.transition={};try{o()}finally{k.transition=v}},fe.unstable_act=d,fe.useCallback=function(o,v){return we.current.useCallback(o,v)},fe.useContext=function(o){return we.current.useContext(o)},fe.useDebugValue=function(){},fe.useDeferredValue=function(o){return we.current.useDeferredValue(o)},fe.useEffect=function(o,v){return we.current.useEffect(o,v)},fe.useId=function(){return we.current.useId()},fe.useImperativeHandle=function(o,v,C){return we.current.useImperativeHandle(o,v,C)},fe.useInsertionEffect=function(o,v){return we.current.useInsertionEffect(o,v)},fe.useLayoutEffect=function(o,v){return we.current.useLayoutEffect(o,v)},fe.useMemo=function(o,v){return we.current.useMemo(o,v)},fe.useReducer=function(o,v,C){return we.current.useReducer(o,v,C)},fe.useRef=function(o){return we.current.useRef(o)},fe.useState=function(o){return we.current.useState(o)},fe.useSyncExternalStore=function(o,v,C){return we.current.useSyncExternalStore(o,v,C)},fe.useTransition=function(){return we.current.useTransition()},fe.version="18.3.1",fe}var Gc;function ai(){return Gc||(Gc=1,Ys.exports=om()),Ys.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yc;function cm(){if(Yc)return Kr;Yc=1;var h=ai(),p=Symbol.for("react.element"),m=Symbol.for("react.fragment"),S=Object.prototype.hasOwnProperty,R=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,P={key:!0,ref:!0,__self:!0,__source:!0};function Z(_,O,G){var W,re={},ee=null,ce=null;G!==void 0&&(ee=""+G),O.key!==void 0&&(ee=""+O.key),O.ref!==void 0&&(ce=O.ref);for(W in O)S.call(O,W)&&!P.hasOwnProperty(W)&&(re[W]=O[W]);if(_&&_.defaultProps)for(W in O=_.defaultProps,O)re[W]===void 0&&(re[W]=O[W]);return{$$typeof:p,type:_,key:ee,ref:ce,props:re,_owner:R.current}}return Kr.Fragment=m,Kr.jsx=Z,Kr.jsxs=Z,Kr}var Xc;function dm(){return Xc||(Xc=1,Gs.exports=cm()),Gs.exports}var a=dm(),U=ai();const sd=ld(U);var al={},Xs={exports:{}},pt={},Js={exports:{}},Zs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jc;function um(){return Jc||(Jc=1,(function(h){function p(k,I){var d=k.length;k.push(I);e:for(;0<d;){var o=d-1>>>1,v=k[o];if(0<R(v,I))k[o]=I,k[d]=v,d=o;else break e}}function m(k){return k.length===0?null:k[0]}function S(k){if(k.length===0)return null;var I=k[0],d=k.pop();if(d!==I){k[0]=d;e:for(var o=0,v=k.length,C=v>>>1;o<C;){var E=2*(o+1)-1,L=k[E],F=E+1,T=k[F];if(0>R(L,d))F<v&&0>R(T,L)?(k[o]=T,k[F]=d,o=F):(k[o]=L,k[E]=d,o=E);else if(F<v&&0>R(T,d))k[o]=T,k[F]=d,o=F;else break e}}return I}function R(k,I){var d=k.sortIndex-I.sortIndex;return d!==0?d:k.id-I.id}if(typeof performance=="object"&&typeof performance.now=="function"){var P=performance;h.unstable_now=function(){return P.now()}}else{var Z=Date,_=Z.now();h.unstable_now=function(){return Z.now()-_}}var O=[],G=[],W=1,re=null,ee=3,ce=!1,V=!1,A=!1,D=typeof setTimeout=="function"?setTimeout:null,Q=typeof clearTimeout=="function"?clearTimeout:null,oe=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function de(k){for(var I=m(G);I!==null;){if(I.callback===null)S(G);else if(I.startTime<=k)S(G),I.sortIndex=I.expirationTime,p(O,I);else break;I=m(G)}}function he(k){if(A=!1,de(k),!V)if(m(O)!==null)V=!0,Ae(M);else{var I=m(G);I!==null&&we(he,I.startTime-k)}}function M(k,I){V=!1,A&&(A=!1,Q(pe),pe=-1),ce=!0;var d=ee;try{for(de(I),re=m(O);re!==null&&(!(re.expirationTime>I)||k&&!K());){var o=re.callback;if(typeof o=="function"){re.callback=null,ee=re.priorityLevel;var v=o(re.expirationTime<=I);I=h.unstable_now(),typeof v=="function"?re.callback=v:re===m(O)&&S(O),de(I)}else S(O);re=m(O)}if(re!==null)var C=!0;else{var E=m(G);E!==null&&we(he,E.startTime-I),C=!1}return C}finally{re=null,ee=d,ce=!1}}var X=!1,je=null,pe=-1,Oe=5,We=-1;function K(){return!(h.unstable_now()-We<Oe)}function ve(){if(je!==null){var k=h.unstable_now();We=k;var I=!0;try{I=je(!0,k)}finally{I?ue():(X=!1,je=null)}}else X=!1}var ue;if(typeof oe=="function")ue=function(){oe(ve)};else if(typeof MessageChannel<"u"){var Ce=new MessageChannel,Ne=Ce.port2;Ce.port1.onmessage=ve,ue=function(){Ne.postMessage(null)}}else ue=function(){D(ve,0)};function Ae(k){je=k,X||(X=!0,ue())}function we(k,I){pe=D(function(){k(h.unstable_now())},I)}h.unstable_IdlePriority=5,h.unstable_ImmediatePriority=1,h.unstable_LowPriority=4,h.unstable_NormalPriority=3,h.unstable_Profiling=null,h.unstable_UserBlockingPriority=2,h.unstable_cancelCallback=function(k){k.callback=null},h.unstable_continueExecution=function(){V||ce||(V=!0,Ae(M))},h.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Oe=0<k?Math.floor(1e3/k):5},h.unstable_getCurrentPriorityLevel=function(){return ee},h.unstable_getFirstCallbackNode=function(){return m(O)},h.unstable_next=function(k){switch(ee){case 1:case 2:case 3:var I=3;break;default:I=ee}var d=ee;ee=I;try{return k()}finally{ee=d}},h.unstable_pauseExecution=function(){},h.unstable_requestPaint=function(){},h.unstable_runWithPriority=function(k,I){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var d=ee;ee=k;try{return I()}finally{ee=d}},h.unstable_scheduleCallback=function(k,I,d){var o=h.unstable_now();switch(typeof d=="object"&&d!==null?(d=d.delay,d=typeof d=="number"&&0<d?o+d:o):d=o,k){case 1:var v=-1;break;case 2:v=250;break;case 5:v=1073741823;break;case 4:v=1e4;break;default:v=5e3}return v=d+v,k={id:W++,callback:I,priorityLevel:k,startTime:d,expirationTime:v,sortIndex:-1},d>o?(k.sortIndex=d,p(G,k),m(O)===null&&k===m(G)&&(A?(Q(pe),pe=-1):A=!0,we(he,d-o))):(k.sortIndex=v,p(O,k),V||ce||(V=!0,Ae(M))),k},h.unstable_shouldYield=K,h.unstable_wrapCallback=function(k){var I=ee;return function(){var d=ee;ee=I;try{return k.apply(this,arguments)}finally{ee=d}}}})(Zs)),Zs}var Zc;function mm(){return Zc||(Zc=1,Js.exports=um()),Js.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ed;function pm(){if(ed)return pt;ed=1;var h=ai(),p=mm();function m(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var S=new Set,R={};function P(e,t){Z(e,t),Z(e+"Capture",t)}function Z(e,t){for(R[e]=t,e=0;e<t.length;e++)S.add(t[e])}var _=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),O=Object.prototype.hasOwnProperty,G=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,W={},re={};function ee(e){return O.call(re,e)?!0:O.call(W,e)?!1:G.test(e)?re[e]=!0:(W[e]=!0,!1)}function ce(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function V(e,t,n,r){if(t===null||typeof t>"u"||ce(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function A(e,t,n,r,l,s,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=i}var D={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){D[e]=new A(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];D[t]=new A(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){D[e]=new A(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){D[e]=new A(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){D[e]=new A(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){D[e]=new A(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){D[e]=new A(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){D[e]=new A(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){D[e]=new A(e,5,!1,e.toLowerCase(),null,!1,!1)});var Q=/[\-:]([a-z])/g;function oe(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Q,oe);D[t]=new A(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Q,oe);D[t]=new A(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Q,oe);D[t]=new A(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){D[e]=new A(e,1,!1,e.toLowerCase(),null,!1,!1)}),D.xlinkHref=new A("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){D[e]=new A(e,1,!1,e.toLowerCase(),null,!0,!0)});function de(e,t,n,r){var l=D.hasOwnProperty(t)?D[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(V(t,n,l,r)&&(n=null),r||l===null?ee(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var he=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,M=Symbol.for("react.element"),X=Symbol.for("react.portal"),je=Symbol.for("react.fragment"),pe=Symbol.for("react.strict_mode"),Oe=Symbol.for("react.profiler"),We=Symbol.for("react.provider"),K=Symbol.for("react.context"),ve=Symbol.for("react.forward_ref"),ue=Symbol.for("react.suspense"),Ce=Symbol.for("react.suspense_list"),Ne=Symbol.for("react.memo"),Ae=Symbol.for("react.lazy"),we=Symbol.for("react.offscreen"),k=Symbol.iterator;function I(e){return e===null||typeof e!="object"?null:(e=k&&e[k]||e["@@iterator"],typeof e=="function"?e:null)}var d=Object.assign,o;function v(e){if(o===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);o=t&&t[1]||""}return`
`+o+e}var C=!1;function E(e,t){if(!e||C)return"";C=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(x){var r=x}Reflect.construct(e,[],t)}else{try{t.call()}catch(x){r=x}e.call(t.prototype)}else{try{throw Error()}catch(x){r=x}e()}}catch(x){if(x&&r&&typeof x.stack=="string"){for(var l=x.stack.split(`
`),s=r.stack.split(`
`),i=l.length-1,c=s.length-1;1<=i&&0<=c&&l[i]!==s[c];)c--;for(;1<=i&&0<=c;i--,c--)if(l[i]!==s[c]){if(i!==1||c!==1)do if(i--,c--,0>c||l[i]!==s[c]){var u=`
`+l[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=c);break}}}finally{C=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?v(e):""}function L(e){switch(e.tag){case 5:return v(e.type);case 16:return v("Lazy");case 13:return v("Suspense");case 19:return v("SuspenseList");case 0:case 2:case 15:return e=E(e.type,!1),e;case 11:return e=E(e.type.render,!1),e;case 1:return e=E(e.type,!0),e;default:return""}}function F(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case je:return"Fragment";case X:return"Portal";case Oe:return"Profiler";case pe:return"StrictMode";case ue:return"Suspense";case Ce:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case K:return(e.displayName||"Context")+".Consumer";case We:return(e._context.displayName||"Context")+".Provider";case ve:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ne:return t=e.displayName||null,t!==null?t:F(e.type)||"Memo";case Ae:t=e._payload,e=e._init;try{return F(e(t))}catch{}}return null}function T(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return F(t);case 8:return t===pe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function B(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ne(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function me(e){var t=ne(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,s.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ye(e){e._valueTracker||(e._valueTracker=me(e))}function Se(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ne(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Me(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function w(e,t){var n=t.checked;return d({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function te(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=B(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ge(e,t){t=t.checked,t!=null&&de(e,"checked",t,!1)}function _e(e,t){ge(e,t);var n=B(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?it(e,t.type,n):t.hasOwnProperty("defaultValue")&&it(e,t.type,B(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function at(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function it(e,t,n){(t!=="number"||Me(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Qe=Array.isArray;function Ve(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+B(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function yt(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(m(91));return d({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ln(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(m(92));if(Qe(n)){if(1<n.length)throw Error(m(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:B(n)}}function Ct(e,t){var n=B(t.value),r=B(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function It(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function wn(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function On(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?wn(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Lt,dr=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Lt=Lt||document.createElement("div"),Lt.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Lt.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Jt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Bt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},sl=["Webkit","ms","Moz","O"];Object.keys(Bt).forEach(function(e){sl.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Bt[t]=Bt[e]})});function Yr(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Bt.hasOwnProperty(e)&&Bt[e]?(""+t).trim():t+"px"}function ci(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Yr(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var pd=d({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function il(e,t){if(t){if(pd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(m(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(m(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(m(61))}if(t.style!=null&&typeof t.style!="object")throw Error(m(62))}}function ol(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cl=null;function dl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ul=null,An=null,Fn=null;function di(e){if(e=Tr(e)){if(typeof ul!="function")throw Error(m(280));var t=e.stateNode;t&&(t=xa(t),ul(e.stateNode,e.type,t))}}function ui(e){An?Fn?Fn.push(e):Fn=[e]:An=e}function mi(){if(An){var e=An,t=Fn;if(Fn=An=null,di(e),t)for(e=0;e<t.length;e++)di(t[e])}}function pi(e,t){return e(t)}function fi(){}var ml=!1;function hi(e,t,n){if(ml)return e(t,n);ml=!0;try{return pi(e,t,n)}finally{ml=!1,(An!==null||Fn!==null)&&(fi(),mi())}}function ur(e,t){var n=e.stateNode;if(n===null)return null;var r=xa(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(m(231,t,typeof n));return n}var pl=!1;if(_)try{var mr={};Object.defineProperty(mr,"passive",{get:function(){pl=!0}}),window.addEventListener("test",mr,mr),window.removeEventListener("test",mr,mr)}catch{pl=!1}function fd(e,t,n,r,l,s,i,c,u){var x=Array.prototype.slice.call(arguments,3);try{t.apply(n,x)}catch(b){this.onError(b)}}var pr=!1,Xr=null,Jr=!1,fl=null,hd={onError:function(e){pr=!0,Xr=e}};function gd(e,t,n,r,l,s,i,c,u){pr=!1,Xr=null,fd.apply(hd,arguments)}function vd(e,t,n,r,l,s,i,c,u){if(gd.apply(this,arguments),pr){if(pr){var x=Xr;pr=!1,Xr=null}else throw Error(m(198));Jr||(Jr=!0,fl=x)}}function kn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function gi(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function vi(e){if(kn(e)!==e)throw Error(m(188))}function yd(e){var t=e.alternate;if(!t){if(t=kn(e),t===null)throw Error(m(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var s=l.alternate;if(s===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===s.child){for(s=l.child;s;){if(s===n)return vi(l),e;if(s===r)return vi(l),t;s=s.sibling}throw Error(m(188))}if(n.return!==r.return)n=l,r=s;else{for(var i=!1,c=l.child;c;){if(c===n){i=!0,n=l,r=s;break}if(c===r){i=!0,r=l,n=s;break}c=c.sibling}if(!i){for(c=s.child;c;){if(c===n){i=!0,n=s,r=l;break}if(c===r){i=!0,r=s,n=l;break}c=c.sibling}if(!i)throw Error(m(189))}}if(n.alternate!==r)throw Error(m(190))}if(n.tag!==3)throw Error(m(188));return n.stateNode.current===n?e:t}function yi(e){return e=yd(e),e!==null?xi(e):null}function xi(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=xi(e);if(t!==null)return t;e=e.sibling}return null}var wi=p.unstable_scheduleCallback,ki=p.unstable_cancelCallback,xd=p.unstable_shouldYield,wd=p.unstable_requestPaint,Be=p.unstable_now,kd=p.unstable_getCurrentPriorityLevel,hl=p.unstable_ImmediatePriority,ji=p.unstable_UserBlockingPriority,Zr=p.unstable_NormalPriority,jd=p.unstable_LowPriority,bi=p.unstable_IdlePriority,ea=null,Ot=null;function bd(e){if(Ot&&typeof Ot.onCommitFiberRoot=="function")try{Ot.onCommitFiberRoot(ea,e,void 0,(e.current.flags&128)===128)}catch{}}var zt=Math.clz32?Math.clz32:Cd,Nd=Math.log,Sd=Math.LN2;function Cd(e){return e>>>=0,e===0?32:31-(Nd(e)/Sd|0)|0}var ta=64,na=4194304;function fr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ra(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,s=e.pingedLanes,i=n&268435455;if(i!==0){var c=i&~l;c!==0?r=fr(c):(s&=i,s!==0&&(r=fr(s)))}else i=n&~l,i!==0?r=fr(i):s!==0&&(r=fr(s));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,s=t&-t,l>=s||l===16&&(s&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-zt(t),l=1<<n,r|=e[n],t&=~l;return r}function zd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Md(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,s=e.pendingLanes;0<s;){var i=31-zt(s),c=1<<i,u=l[i];u===-1?((c&n)===0||(c&r)!==0)&&(l[i]=zd(c,t)):u<=t&&(e.expiredLanes|=c),s&=~c}}function gl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ni(){var e=ta;return ta<<=1,(ta&4194240)===0&&(ta=64),e}function vl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function hr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-zt(t),e[t]=n}function Ed(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-zt(n),s=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~s}}function yl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-zt(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var be=0;function Si(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Ci,xl,zi,Mi,Ei,wl=!1,aa=[],Zt=null,en=null,tn=null,gr=new Map,vr=new Map,nn=[],Pd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Pi(e,t){switch(e){case"focusin":case"focusout":Zt=null;break;case"dragenter":case"dragleave":en=null;break;case"mouseover":case"mouseout":tn=null;break;case"pointerover":case"pointerout":gr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":vr.delete(t.pointerId)}}function yr(e,t,n,r,l,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[l]},t!==null&&(t=Tr(t),t!==null&&xl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function _d(e,t,n,r,l){switch(t){case"focusin":return Zt=yr(Zt,e,t,n,r,l),!0;case"dragenter":return en=yr(en,e,t,n,r,l),!0;case"mouseover":return tn=yr(tn,e,t,n,r,l),!0;case"pointerover":var s=l.pointerId;return gr.set(s,yr(gr.get(s)||null,e,t,n,r,l)),!0;case"gotpointercapture":return s=l.pointerId,vr.set(s,yr(vr.get(s)||null,e,t,n,r,l)),!0}return!1}function _i(e){var t=jn(e.target);if(t!==null){var n=kn(t);if(n!==null){if(t=n.tag,t===13){if(t=gi(n),t!==null){e.blockedOn=t,Ei(e.priority,function(){zi(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function la(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=jl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);cl=r,n.target.dispatchEvent(r),cl=null}else return t=Tr(n),t!==null&&xl(t),e.blockedOn=n,!1;t.shift()}return!0}function Ti(e,t,n){la(e)&&n.delete(t)}function Td(){wl=!1,Zt!==null&&la(Zt)&&(Zt=null),en!==null&&la(en)&&(en=null),tn!==null&&la(tn)&&(tn=null),gr.forEach(Ti),vr.forEach(Ti)}function xr(e,t){e.blockedOn===t&&(e.blockedOn=null,wl||(wl=!0,p.unstable_scheduleCallback(p.unstable_NormalPriority,Td)))}function wr(e){function t(l){return xr(l,e)}if(0<aa.length){xr(aa[0],e);for(var n=1;n<aa.length;n++){var r=aa[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Zt!==null&&xr(Zt,e),en!==null&&xr(en,e),tn!==null&&xr(tn,e),gr.forEach(t),vr.forEach(t),n=0;n<nn.length;n++)r=nn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<nn.length&&(n=nn[0],n.blockedOn===null);)_i(n),n.blockedOn===null&&nn.shift()}var Dn=he.ReactCurrentBatchConfig,sa=!0;function Rd(e,t,n,r){var l=be,s=Dn.transition;Dn.transition=null;try{be=1,kl(e,t,n,r)}finally{be=l,Dn.transition=s}}function Id(e,t,n,r){var l=be,s=Dn.transition;Dn.transition=null;try{be=4,kl(e,t,n,r)}finally{be=l,Dn.transition=s}}function kl(e,t,n,r){if(sa){var l=jl(e,t,n,r);if(l===null)Dl(e,t,r,ia,n),Pi(e,r);else if(_d(l,e,t,n,r))r.stopPropagation();else if(Pi(e,r),t&4&&-1<Pd.indexOf(e)){for(;l!==null;){var s=Tr(l);if(s!==null&&Ci(s),s=jl(e,t,n,r),s===null&&Dl(e,t,r,ia,n),s===l)break;l=s}l!==null&&r.stopPropagation()}else Dl(e,t,r,null,n)}}var ia=null;function jl(e,t,n,r){if(ia=null,e=dl(r),e=jn(e),e!==null)if(t=kn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=gi(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ia=e,null}function Ri(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(kd()){case hl:return 1;case ji:return 4;case Zr:case jd:return 16;case bi:return 536870912;default:return 16}default:return 16}}var rn=null,bl=null,oa=null;function Ii(){if(oa)return oa;var e,t=bl,n=t.length,r,l="value"in rn?rn.value:rn.textContent,s=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[s-r];r++);return oa=l.slice(e,1<r?1-r:void 0)}function ca(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function da(){return!0}function Li(){return!1}function ft(e){function t(n,r,l,s,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=s,this.target=i,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?da:Li,this.isPropagationStopped=Li,this}return d(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=da)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=da)},persist:function(){},isPersistent:da}),t}var $n={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Nl=ft($n),kr=d({},$n,{view:0,detail:0}),Ld=ft(kr),Sl,Cl,jr,ua=d({},kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ml,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==jr&&(jr&&e.type==="mousemove"?(Sl=e.screenX-jr.screenX,Cl=e.screenY-jr.screenY):Cl=Sl=0,jr=e),Sl)},movementY:function(e){return"movementY"in e?e.movementY:Cl}}),Oi=ft(ua),Od=d({},ua,{dataTransfer:0}),Ad=ft(Od),Fd=d({},kr,{relatedTarget:0}),zl=ft(Fd),Dd=d({},$n,{animationName:0,elapsedTime:0,pseudoElement:0}),$d=ft(Dd),Bd=d({},$n,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ud=ft(Bd),Wd=d({},$n,{data:0}),Ai=ft(Wd),Vd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Kd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Qd[e])?!!t[e]:!1}function Ml(){return Kd}var qd=d({},kr,{key:function(e){if(e.key){var t=Vd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ca(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ml,charCode:function(e){return e.type==="keypress"?ca(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ca(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Gd=ft(qd),Yd=d({},ua,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Fi=ft(Yd),Xd=d({},kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ml}),Jd=ft(Xd),Zd=d({},$n,{propertyName:0,elapsedTime:0,pseudoElement:0}),eu=ft(Zd),tu=d({},ua,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),nu=ft(tu),ru=[9,13,27,32],El=_&&"CompositionEvent"in window,br=null;_&&"documentMode"in document&&(br=document.documentMode);var au=_&&"TextEvent"in window&&!br,Di=_&&(!El||br&&8<br&&11>=br),$i=" ",Bi=!1;function Ui(e,t){switch(e){case"keyup":return ru.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wi(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Bn=!1;function lu(e,t){switch(e){case"compositionend":return Wi(t);case"keypress":return t.which!==32?null:(Bi=!0,$i);case"textInput":return e=t.data,e===$i&&Bi?null:e;default:return null}}function su(e,t){if(Bn)return e==="compositionend"||!El&&Ui(e,t)?(e=Ii(),oa=bl=rn=null,Bn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Di&&t.locale!=="ko"?null:t.data;default:return null}}var iu={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Vi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!iu[e.type]:t==="textarea"}function Hi(e,t,n,r){ui(r),t=ga(t,"onChange"),0<t.length&&(n=new Nl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Nr=null,Sr=null;function ou(e){co(e,0)}function ma(e){var t=Qn(e);if(Se(t))return e}function cu(e,t){if(e==="change")return t}var Qi=!1;if(_){var Pl;if(_){var _l="oninput"in document;if(!_l){var Ki=document.createElement("div");Ki.setAttribute("oninput","return;"),_l=typeof Ki.oninput=="function"}Pl=_l}else Pl=!1;Qi=Pl&&(!document.documentMode||9<document.documentMode)}function qi(){Nr&&(Nr.detachEvent("onpropertychange",Gi),Sr=Nr=null)}function Gi(e){if(e.propertyName==="value"&&ma(Sr)){var t=[];Hi(t,Sr,e,dl(e)),hi(ou,t)}}function du(e,t,n){e==="focusin"?(qi(),Nr=t,Sr=n,Nr.attachEvent("onpropertychange",Gi)):e==="focusout"&&qi()}function uu(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ma(Sr)}function mu(e,t){if(e==="click")return ma(t)}function pu(e,t){if(e==="input"||e==="change")return ma(t)}function fu(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Mt=typeof Object.is=="function"?Object.is:fu;function Cr(e,t){if(Mt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!O.call(t,l)||!Mt(e[l],t[l]))return!1}return!0}function Yi(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Xi(e,t){var n=Yi(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Yi(n)}}function Ji(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ji(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Zi(){for(var e=window,t=Me();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Me(e.document)}return t}function Tl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function hu(e){var t=Zi(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ji(n.ownerDocument.documentElement,n)){if(r!==null&&Tl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,s=Math.min(r.start,l);r=r.end===void 0?s:Math.min(r.end,l),!e.extend&&s>r&&(l=r,r=s,s=l),l=Xi(n,s);var i=Xi(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var gu=_&&"documentMode"in document&&11>=document.documentMode,Un=null,Rl=null,zr=null,Il=!1;function eo(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Il||Un==null||Un!==Me(r)||(r=Un,"selectionStart"in r&&Tl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zr&&Cr(zr,r)||(zr=r,r=ga(Rl,"onSelect"),0<r.length&&(t=new Nl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Un)))}function pa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Wn={animationend:pa("Animation","AnimationEnd"),animationiteration:pa("Animation","AnimationIteration"),animationstart:pa("Animation","AnimationStart"),transitionend:pa("Transition","TransitionEnd")},Ll={},to={};_&&(to=document.createElement("div").style,"AnimationEvent"in window||(delete Wn.animationend.animation,delete Wn.animationiteration.animation,delete Wn.animationstart.animation),"TransitionEvent"in window||delete Wn.transitionend.transition);function fa(e){if(Ll[e])return Ll[e];if(!Wn[e])return e;var t=Wn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in to)return Ll[e]=t[n];return e}var no=fa("animationend"),ro=fa("animationiteration"),ao=fa("animationstart"),lo=fa("transitionend"),so=new Map,io="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function an(e,t){so.set(e,t),P(t,[e])}for(var Ol=0;Ol<io.length;Ol++){var Al=io[Ol],vu=Al.toLowerCase(),yu=Al[0].toUpperCase()+Al.slice(1);an(vu,"on"+yu)}an(no,"onAnimationEnd"),an(ro,"onAnimationIteration"),an(ao,"onAnimationStart"),an("dblclick","onDoubleClick"),an("focusin","onFocus"),an("focusout","onBlur"),an(lo,"onTransitionEnd"),Z("onMouseEnter",["mouseout","mouseover"]),Z("onMouseLeave",["mouseout","mouseover"]),Z("onPointerEnter",["pointerout","pointerover"]),Z("onPointerLeave",["pointerout","pointerover"]),P("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),P("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),P("onBeforeInput",["compositionend","keypress","textInput","paste"]),P("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),P("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),P("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Mr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xu=new Set("cancel close invalid load scroll toggle".split(" ").concat(Mr));function oo(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,vd(r,t,void 0,e),e.currentTarget=null}function co(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var i=r.length-1;0<=i;i--){var c=r[i],u=c.instance,x=c.currentTarget;if(c=c.listener,u!==s&&l.isPropagationStopped())break e;oo(l,c,x),s=u}else for(i=0;i<r.length;i++){if(c=r[i],u=c.instance,x=c.currentTarget,c=c.listener,u!==s&&l.isPropagationStopped())break e;oo(l,c,x),s=u}}}if(Jr)throw e=fl,Jr=!1,fl=null,e}function Ee(e,t){var n=t[Hl];n===void 0&&(n=t[Hl]=new Set);var r=e+"__bubble";n.has(r)||(uo(t,e,2,!1),n.add(r))}function Fl(e,t,n){var r=0;t&&(r|=4),uo(n,e,r,t)}var ha="_reactListening"+Math.random().toString(36).slice(2);function Er(e){if(!e[ha]){e[ha]=!0,S.forEach(function(n){n!=="selectionchange"&&(xu.has(n)||Fl(n,!1,e),Fl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ha]||(t[ha]=!0,Fl("selectionchange",!1,t))}}function uo(e,t,n,r){switch(Ri(t)){case 1:var l=Rd;break;case 4:l=Id;break;default:l=kl}n=l.bind(null,t,n,e),l=void 0,!pl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Dl(e,t,n,r,l){var s=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var c=r.stateNode.containerInfo;if(c===l||c.nodeType===8&&c.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var u=i.tag;if((u===3||u===4)&&(u=i.stateNode.containerInfo,u===l||u.nodeType===8&&u.parentNode===l))return;i=i.return}for(;c!==null;){if(i=jn(c),i===null)return;if(u=i.tag,u===5||u===6){r=s=i;continue e}c=c.parentNode}}r=r.return}hi(function(){var x=s,b=dl(n),N=[];e:{var j=so.get(e);if(j!==void 0){var $=Nl,q=e;switch(e){case"keypress":if(ca(n)===0)break e;case"keydown":case"keyup":$=Gd;break;case"focusin":q="focus",$=zl;break;case"focusout":q="blur",$=zl;break;case"beforeblur":case"afterblur":$=zl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":$=Oi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":$=Ad;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":$=Jd;break;case no:case ro:case ao:$=$d;break;case lo:$=eu;break;case"scroll":$=Ld;break;case"wheel":$=nu;break;case"copy":case"cut":case"paste":$=Ud;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":$=Fi}var Y=(t&4)!==0,Ue=!Y&&e==="scroll",g=Y?j!==null?j+"Capture":null:j;Y=[];for(var f=x,y;f!==null;){y=f;var z=y.stateNode;if(y.tag===5&&z!==null&&(y=z,g!==null&&(z=ur(f,g),z!=null&&Y.push(Pr(f,z,y)))),Ue)break;f=f.return}0<Y.length&&(j=new $(j,q,null,n,b),N.push({event:j,listeners:Y}))}}if((t&7)===0){e:{if(j=e==="mouseover"||e==="pointerover",$=e==="mouseout"||e==="pointerout",j&&n!==cl&&(q=n.relatedTarget||n.fromElement)&&(jn(q)||q[Ut]))break e;if(($||j)&&(j=b.window===b?b:(j=b.ownerDocument)?j.defaultView||j.parentWindow:window,$?(q=n.relatedTarget||n.toElement,$=x,q=q?jn(q):null,q!==null&&(Ue=kn(q),q!==Ue||q.tag!==5&&q.tag!==6)&&(q=null)):($=null,q=x),$!==q)){if(Y=Oi,z="onMouseLeave",g="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(Y=Fi,z="onPointerLeave",g="onPointerEnter",f="pointer"),Ue=$==null?j:Qn($),y=q==null?j:Qn(q),j=new Y(z,f+"leave",$,n,b),j.target=Ue,j.relatedTarget=y,z=null,jn(b)===x&&(Y=new Y(g,f+"enter",q,n,b),Y.target=y,Y.relatedTarget=Ue,z=Y),Ue=z,$&&q)t:{for(Y=$,g=q,f=0,y=Y;y;y=Vn(y))f++;for(y=0,z=g;z;z=Vn(z))y++;for(;0<f-y;)Y=Vn(Y),f--;for(;0<y-f;)g=Vn(g),y--;for(;f--;){if(Y===g||g!==null&&Y===g.alternate)break t;Y=Vn(Y),g=Vn(g)}Y=null}else Y=null;$!==null&&mo(N,j,$,Y,!1),q!==null&&Ue!==null&&mo(N,Ue,q,Y,!0)}}e:{if(j=x?Qn(x):window,$=j.nodeName&&j.nodeName.toLowerCase(),$==="select"||$==="input"&&j.type==="file")var J=cu;else if(Vi(j))if(Qi)J=pu;else{J=uu;var ae=du}else($=j.nodeName)&&$.toLowerCase()==="input"&&(j.type==="checkbox"||j.type==="radio")&&(J=mu);if(J&&(J=J(e,x))){Hi(N,J,n,b);break e}ae&&ae(e,j,x),e==="focusout"&&(ae=j._wrapperState)&&ae.controlled&&j.type==="number"&&it(j,"number",j.value)}switch(ae=x?Qn(x):window,e){case"focusin":(Vi(ae)||ae.contentEditable==="true")&&(Un=ae,Rl=x,zr=null);break;case"focusout":zr=Rl=Un=null;break;case"mousedown":Il=!0;break;case"contextmenu":case"mouseup":case"dragend":Il=!1,eo(N,n,b);break;case"selectionchange":if(gu)break;case"keydown":case"keyup":eo(N,n,b)}var le;if(El)e:{switch(e){case"compositionstart":var se="onCompositionStart";break e;case"compositionend":se="onCompositionEnd";break e;case"compositionupdate":se="onCompositionUpdate";break e}se=void 0}else Bn?Ui(e,n)&&(se="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(se="onCompositionStart");se&&(Di&&n.locale!=="ko"&&(Bn||se!=="onCompositionStart"?se==="onCompositionEnd"&&Bn&&(le=Ii()):(rn=b,bl="value"in rn?rn.value:rn.textContent,Bn=!0)),ae=ga(x,se),0<ae.length&&(se=new Ai(se,e,null,n,b),N.push({event:se,listeners:ae}),le?se.data=le:(le=Wi(n),le!==null&&(se.data=le)))),(le=au?lu(e,n):su(e,n))&&(x=ga(x,"onBeforeInput"),0<x.length&&(b=new Ai("onBeforeInput","beforeinput",null,n,b),N.push({event:b,listeners:x}),b.data=le))}co(N,t)})}function Pr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ga(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,s=l.stateNode;l.tag===5&&s!==null&&(l=s,s=ur(e,n),s!=null&&r.unshift(Pr(e,s,l)),s=ur(e,t),s!=null&&r.push(Pr(e,s,l))),e=e.return}return r}function Vn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function mo(e,t,n,r,l){for(var s=t._reactName,i=[];n!==null&&n!==r;){var c=n,u=c.alternate,x=c.stateNode;if(u!==null&&u===r)break;c.tag===5&&x!==null&&(c=x,l?(u=ur(n,s),u!=null&&i.unshift(Pr(n,u,c))):l||(u=ur(n,s),u!=null&&i.push(Pr(n,u,c)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var wu=/\r\n?/g,ku=/\u0000|\uFFFD/g;function po(e){return(typeof e=="string"?e:""+e).replace(wu,`
`).replace(ku,"")}function va(e,t,n){if(t=po(t),po(e)!==t&&n)throw Error(m(425))}function ya(){}var $l=null,Bl=null;function Ul(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wl=typeof setTimeout=="function"?setTimeout:void 0,ju=typeof clearTimeout=="function"?clearTimeout:void 0,fo=typeof Promise=="function"?Promise:void 0,bu=typeof queueMicrotask=="function"?queueMicrotask:typeof fo<"u"?function(e){return fo.resolve(null).then(e).catch(Nu)}:Wl;function Nu(e){setTimeout(function(){throw e})}function Vl(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),wr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);wr(t)}function ln(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ho(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Hn=Math.random().toString(36).slice(2),At="__reactFiber$"+Hn,_r="__reactProps$"+Hn,Ut="__reactContainer$"+Hn,Hl="__reactEvents$"+Hn,Su="__reactListeners$"+Hn,Cu="__reactHandles$"+Hn;function jn(e){var t=e[At];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ut]||n[At]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ho(e);e!==null;){if(n=e[At])return n;e=ho(e)}return t}e=n,n=e.parentNode}return null}function Tr(e){return e=e[At]||e[Ut],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Qn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(m(33))}function xa(e){return e[_r]||null}var Ql=[],Kn=-1;function sn(e){return{current:e}}function Pe(e){0>Kn||(e.current=Ql[Kn],Ql[Kn]=null,Kn--)}function ze(e,t){Kn++,Ql[Kn]=e.current,e.current=t}var on={},et=sn(on),ot=sn(!1),bn=on;function qn(e,t){var n=e.type.contextTypes;if(!n)return on;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},s;for(s in n)l[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function ct(e){return e=e.childContextTypes,e!=null}function wa(){Pe(ot),Pe(et)}function go(e,t,n){if(et.current!==on)throw Error(m(168));ze(et,t),ze(ot,n)}function vo(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(m(108,T(e)||"Unknown",l));return d({},n,r)}function ka(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||on,bn=et.current,ze(et,e),ze(ot,ot.current),!0}function yo(e,t,n){var r=e.stateNode;if(!r)throw Error(m(169));n?(e=vo(e,t,bn),r.__reactInternalMemoizedMergedChildContext=e,Pe(ot),Pe(et),ze(et,e)):Pe(ot),ze(ot,n)}var Wt=null,ja=!1,Kl=!1;function xo(e){Wt===null?Wt=[e]:Wt.push(e)}function zu(e){ja=!0,xo(e)}function cn(){if(!Kl&&Wt!==null){Kl=!0;var e=0,t=be;try{var n=Wt;for(be=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Wt=null,ja=!1}catch(l){throw Wt!==null&&(Wt=Wt.slice(e+1)),wi(hl,cn),l}finally{be=t,Kl=!1}}return null}var Gn=[],Yn=0,ba=null,Na=0,xt=[],wt=0,Nn=null,Vt=1,Ht="";function Sn(e,t){Gn[Yn++]=Na,Gn[Yn++]=ba,ba=e,Na=t}function wo(e,t,n){xt[wt++]=Vt,xt[wt++]=Ht,xt[wt++]=Nn,Nn=e;var r=Vt;e=Ht;var l=32-zt(r)-1;r&=~(1<<l),n+=1;var s=32-zt(t)+l;if(30<s){var i=l-l%5;s=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Vt=1<<32-zt(t)+l|n<<l|r,Ht=s+e}else Vt=1<<s|n<<l|r,Ht=e}function ql(e){e.return!==null&&(Sn(e,1),wo(e,1,0))}function Gl(e){for(;e===ba;)ba=Gn[--Yn],Gn[Yn]=null,Na=Gn[--Yn],Gn[Yn]=null;for(;e===Nn;)Nn=xt[--wt],xt[wt]=null,Ht=xt[--wt],xt[wt]=null,Vt=xt[--wt],xt[wt]=null}var ht=null,gt=null,Te=!1,Et=null;function ko(e,t){var n=Nt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function jo(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ht=e,gt=ln(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ht=e,gt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Nn!==null?{id:Vt,overflow:Ht}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Nt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ht=e,gt=null,!0):!1;default:return!1}}function Yl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Xl(e){if(Te){var t=gt;if(t){var n=t;if(!jo(e,t)){if(Yl(e))throw Error(m(418));t=ln(n.nextSibling);var r=ht;t&&jo(e,t)?ko(r,n):(e.flags=e.flags&-4097|2,Te=!1,ht=e)}}else{if(Yl(e))throw Error(m(418));e.flags=e.flags&-4097|2,Te=!1,ht=e}}}function bo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ht=e}function Sa(e){if(e!==ht)return!1;if(!Te)return bo(e),Te=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ul(e.type,e.memoizedProps)),t&&(t=gt)){if(Yl(e))throw No(),Error(m(418));for(;t;)ko(e,t),t=ln(t.nextSibling)}if(bo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(m(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){gt=ln(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}gt=null}}else gt=ht?ln(e.stateNode.nextSibling):null;return!0}function No(){for(var e=gt;e;)e=ln(e.nextSibling)}function Xn(){gt=ht=null,Te=!1}function Jl(e){Et===null?Et=[e]:Et.push(e)}var Mu=he.ReactCurrentBatchConfig;function Rr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(m(309));var r=n.stateNode}if(!r)throw Error(m(147,e));var l=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(i){var c=l.refs;i===null?delete c[s]:c[s]=i},t._stringRef=s,t)}if(typeof e!="string")throw Error(m(284));if(!n._owner)throw Error(m(290,e))}return e}function Ca(e,t){throw e=Object.prototype.toString.call(t),Error(m(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function So(e){var t=e._init;return t(e._payload)}function Co(e){function t(g,f){if(e){var y=g.deletions;y===null?(g.deletions=[f],g.flags|=16):y.push(f)}}function n(g,f){if(!e)return null;for(;f!==null;)t(g,f),f=f.sibling;return null}function r(g,f){for(g=new Map;f!==null;)f.key!==null?g.set(f.key,f):g.set(f.index,f),f=f.sibling;return g}function l(g,f){return g=vn(g,f),g.index=0,g.sibling=null,g}function s(g,f,y){return g.index=y,e?(y=g.alternate,y!==null?(y=y.index,y<f?(g.flags|=2,f):y):(g.flags|=2,f)):(g.flags|=1048576,f)}function i(g){return e&&g.alternate===null&&(g.flags|=2),g}function c(g,f,y,z){return f===null||f.tag!==6?(f=Ws(y,g.mode,z),f.return=g,f):(f=l(f,y),f.return=g,f)}function u(g,f,y,z){var J=y.type;return J===je?b(g,f,y.props.children,z,y.key):f!==null&&(f.elementType===J||typeof J=="object"&&J!==null&&J.$$typeof===Ae&&So(J)===f.type)?(z=l(f,y.props),z.ref=Rr(g,f,y),z.return=g,z):(z=Ya(y.type,y.key,y.props,null,g.mode,z),z.ref=Rr(g,f,y),z.return=g,z)}function x(g,f,y,z){return f===null||f.tag!==4||f.stateNode.containerInfo!==y.containerInfo||f.stateNode.implementation!==y.implementation?(f=Vs(y,g.mode,z),f.return=g,f):(f=l(f,y.children||[]),f.return=g,f)}function b(g,f,y,z,J){return f===null||f.tag!==7?(f=Rn(y,g.mode,z,J),f.return=g,f):(f=l(f,y),f.return=g,f)}function N(g,f,y){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ws(""+f,g.mode,y),f.return=g,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case M:return y=Ya(f.type,f.key,f.props,null,g.mode,y),y.ref=Rr(g,null,f),y.return=g,y;case X:return f=Vs(f,g.mode,y),f.return=g,f;case Ae:var z=f._init;return N(g,z(f._payload),y)}if(Qe(f)||I(f))return f=Rn(f,g.mode,y,null),f.return=g,f;Ca(g,f)}return null}function j(g,f,y,z){var J=f!==null?f.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return J!==null?null:c(g,f,""+y,z);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case M:return y.key===J?u(g,f,y,z):null;case X:return y.key===J?x(g,f,y,z):null;case Ae:return J=y._init,j(g,f,J(y._payload),z)}if(Qe(y)||I(y))return J!==null?null:b(g,f,y,z,null);Ca(g,y)}return null}function $(g,f,y,z,J){if(typeof z=="string"&&z!==""||typeof z=="number")return g=g.get(y)||null,c(f,g,""+z,J);if(typeof z=="object"&&z!==null){switch(z.$$typeof){case M:return g=g.get(z.key===null?y:z.key)||null,u(f,g,z,J);case X:return g=g.get(z.key===null?y:z.key)||null,x(f,g,z,J);case Ae:var ae=z._init;return $(g,f,y,ae(z._payload),J)}if(Qe(z)||I(z))return g=g.get(y)||null,b(f,g,z,J,null);Ca(f,z)}return null}function q(g,f,y,z){for(var J=null,ae=null,le=f,se=f=0,Xe=null;le!==null&&se<y.length;se++){le.index>se?(Xe=le,le=null):Xe=le.sibling;var ke=j(g,le,y[se],z);if(ke===null){le===null&&(le=Xe);break}e&&le&&ke.alternate===null&&t(g,le),f=s(ke,f,se),ae===null?J=ke:ae.sibling=ke,ae=ke,le=Xe}if(se===y.length)return n(g,le),Te&&Sn(g,se),J;if(le===null){for(;se<y.length;se++)le=N(g,y[se],z),le!==null&&(f=s(le,f,se),ae===null?J=le:ae.sibling=le,ae=le);return Te&&Sn(g,se),J}for(le=r(g,le);se<y.length;se++)Xe=$(le,g,se,y[se],z),Xe!==null&&(e&&Xe.alternate!==null&&le.delete(Xe.key===null?se:Xe.key),f=s(Xe,f,se),ae===null?J=Xe:ae.sibling=Xe,ae=Xe);return e&&le.forEach(function(yn){return t(g,yn)}),Te&&Sn(g,se),J}function Y(g,f,y,z){var J=I(y);if(typeof J!="function")throw Error(m(150));if(y=J.call(y),y==null)throw Error(m(151));for(var ae=J=null,le=f,se=f=0,Xe=null,ke=y.next();le!==null&&!ke.done;se++,ke=y.next()){le.index>se?(Xe=le,le=null):Xe=le.sibling;var yn=j(g,le,ke.value,z);if(yn===null){le===null&&(le=Xe);break}e&&le&&yn.alternate===null&&t(g,le),f=s(yn,f,se),ae===null?J=yn:ae.sibling=yn,ae=yn,le=Xe}if(ke.done)return n(g,le),Te&&Sn(g,se),J;if(le===null){for(;!ke.done;se++,ke=y.next())ke=N(g,ke.value,z),ke!==null&&(f=s(ke,f,se),ae===null?J=ke:ae.sibling=ke,ae=ke);return Te&&Sn(g,se),J}for(le=r(g,le);!ke.done;se++,ke=y.next())ke=$(le,g,se,ke.value,z),ke!==null&&(e&&ke.alternate!==null&&le.delete(ke.key===null?se:ke.key),f=s(ke,f,se),ae===null?J=ke:ae.sibling=ke,ae=ke);return e&&le.forEach(function(im){return t(g,im)}),Te&&Sn(g,se),J}function Ue(g,f,y,z){if(typeof y=="object"&&y!==null&&y.type===je&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case M:e:{for(var J=y.key,ae=f;ae!==null;){if(ae.key===J){if(J=y.type,J===je){if(ae.tag===7){n(g,ae.sibling),f=l(ae,y.props.children),f.return=g,g=f;break e}}else if(ae.elementType===J||typeof J=="object"&&J!==null&&J.$$typeof===Ae&&So(J)===ae.type){n(g,ae.sibling),f=l(ae,y.props),f.ref=Rr(g,ae,y),f.return=g,g=f;break e}n(g,ae);break}else t(g,ae);ae=ae.sibling}y.type===je?(f=Rn(y.props.children,g.mode,z,y.key),f.return=g,g=f):(z=Ya(y.type,y.key,y.props,null,g.mode,z),z.ref=Rr(g,f,y),z.return=g,g=z)}return i(g);case X:e:{for(ae=y.key;f!==null;){if(f.key===ae)if(f.tag===4&&f.stateNode.containerInfo===y.containerInfo&&f.stateNode.implementation===y.implementation){n(g,f.sibling),f=l(f,y.children||[]),f.return=g,g=f;break e}else{n(g,f);break}else t(g,f);f=f.sibling}f=Vs(y,g.mode,z),f.return=g,g=f}return i(g);case Ae:return ae=y._init,Ue(g,f,ae(y._payload),z)}if(Qe(y))return q(g,f,y,z);if(I(y))return Y(g,f,y,z);Ca(g,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,f!==null&&f.tag===6?(n(g,f.sibling),f=l(f,y),f.return=g,g=f):(n(g,f),f=Ws(y,g.mode,z),f.return=g,g=f),i(g)):n(g,f)}return Ue}var Jn=Co(!0),zo=Co(!1),za=sn(null),Ma=null,Zn=null,Zl=null;function es(){Zl=Zn=Ma=null}function ts(e){var t=za.current;Pe(za),e._currentValue=t}function ns(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function er(e,t){Ma=e,Zl=Zn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(dt=!0),e.firstContext=null)}function kt(e){var t=e._currentValue;if(Zl!==e)if(e={context:e,memoizedValue:t,next:null},Zn===null){if(Ma===null)throw Error(m(308));Zn=e,Ma.dependencies={lanes:0,firstContext:e}}else Zn=Zn.next=e;return t}var Cn=null;function rs(e){Cn===null?Cn=[e]:Cn.push(e)}function Mo(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,rs(t)):(n.next=l.next,l.next=n),t.interleaved=n,Qt(e,r)}function Qt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var dn=!1;function as(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Eo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Kt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function un(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(xe&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,Qt(e,n)}return l=r.interleaved,l===null?(t.next=t,rs(r)):(t.next=l.next,l.next=t),r.interleaved=t,Qt(e,n)}function Ea(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yl(e,n)}}function Po(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?l=s=i:s=s.next=i,n=n.next}while(n!==null);s===null?l=s=t:s=s.next=t}else l=s=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Pa(e,t,n,r){var l=e.updateQueue;dn=!1;var s=l.firstBaseUpdate,i=l.lastBaseUpdate,c=l.shared.pending;if(c!==null){l.shared.pending=null;var u=c,x=u.next;u.next=null,i===null?s=x:i.next=x,i=u;var b=e.alternate;b!==null&&(b=b.updateQueue,c=b.lastBaseUpdate,c!==i&&(c===null?b.firstBaseUpdate=x:c.next=x,b.lastBaseUpdate=u))}if(s!==null){var N=l.baseState;i=0,b=x=u=null,c=s;do{var j=c.lane,$=c.eventTime;if((r&j)===j){b!==null&&(b=b.next={eventTime:$,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var q=e,Y=c;switch(j=t,$=n,Y.tag){case 1:if(q=Y.payload,typeof q=="function"){N=q.call($,N,j);break e}N=q;break e;case 3:q.flags=q.flags&-65537|128;case 0:if(q=Y.payload,j=typeof q=="function"?q.call($,N,j):q,j==null)break e;N=d({},N,j);break e;case 2:dn=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,j=l.effects,j===null?l.effects=[c]:j.push(c))}else $={eventTime:$,lane:j,tag:c.tag,payload:c.payload,callback:c.callback,next:null},b===null?(x=b=$,u=N):b=b.next=$,i|=j;if(c=c.next,c===null){if(c=l.shared.pending,c===null)break;j=c,c=j.next,j.next=null,l.lastBaseUpdate=j,l.shared.pending=null}}while(!0);if(b===null&&(u=N),l.baseState=u,l.firstBaseUpdate=x,l.lastBaseUpdate=b,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else s===null&&(l.shared.lanes=0);En|=i,e.lanes=i,e.memoizedState=N}}function _o(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(m(191,l));l.call(r)}}}var Ir={},Ft=sn(Ir),Lr=sn(Ir),Or=sn(Ir);function zn(e){if(e===Ir)throw Error(m(174));return e}function ls(e,t){switch(ze(Or,t),ze(Lr,e),ze(Ft,Ir),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:On(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=On(t,e)}Pe(Ft),ze(Ft,t)}function tr(){Pe(Ft),Pe(Lr),Pe(Or)}function To(e){zn(Or.current);var t=zn(Ft.current),n=On(t,e.type);t!==n&&(ze(Lr,e),ze(Ft,n))}function ss(e){Lr.current===e&&(Pe(Ft),Pe(Lr))}var Fe=sn(0);function _a(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var is=[];function os(){for(var e=0;e<is.length;e++)is[e]._workInProgressVersionPrimary=null;is.length=0}var Ta=he.ReactCurrentDispatcher,cs=he.ReactCurrentBatchConfig,Mn=0,De=null,Ke=null,Ge=null,Ra=!1,Ar=!1,Fr=0,Eu=0;function tt(){throw Error(m(321))}function ds(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Mt(e[n],t[n]))return!1;return!0}function us(e,t,n,r,l,s){if(Mn=s,De=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ta.current=e===null||e.memoizedState===null?Ru:Iu,e=n(r,l),Ar){s=0;do{if(Ar=!1,Fr=0,25<=s)throw Error(m(301));s+=1,Ge=Ke=null,t.updateQueue=null,Ta.current=Lu,e=n(r,l)}while(Ar)}if(Ta.current=Oa,t=Ke!==null&&Ke.next!==null,Mn=0,Ge=Ke=De=null,Ra=!1,t)throw Error(m(300));return e}function ms(){var e=Fr!==0;return Fr=0,e}function Dt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ge===null?De.memoizedState=Ge=e:Ge=Ge.next=e,Ge}function jt(){if(Ke===null){var e=De.alternate;e=e!==null?e.memoizedState:null}else e=Ke.next;var t=Ge===null?De.memoizedState:Ge.next;if(t!==null)Ge=t,Ke=e;else{if(e===null)throw Error(m(310));Ke=e,e={memoizedState:Ke.memoizedState,baseState:Ke.baseState,baseQueue:Ke.baseQueue,queue:Ke.queue,next:null},Ge===null?De.memoizedState=Ge=e:Ge=Ge.next=e}return Ge}function Dr(e,t){return typeof t=="function"?t(e):t}function ps(e){var t=jt(),n=t.queue;if(n===null)throw Error(m(311));n.lastRenderedReducer=e;var r=Ke,l=r.baseQueue,s=n.pending;if(s!==null){if(l!==null){var i=l.next;l.next=s.next,s.next=i}r.baseQueue=l=s,n.pending=null}if(l!==null){s=l.next,r=r.baseState;var c=i=null,u=null,x=s;do{var b=x.lane;if((Mn&b)===b)u!==null&&(u=u.next={lane:0,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),r=x.hasEagerState?x.eagerState:e(r,x.action);else{var N={lane:b,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null};u===null?(c=u=N,i=r):u=u.next=N,De.lanes|=b,En|=b}x=x.next}while(x!==null&&x!==s);u===null?i=r:u.next=c,Mt(r,t.memoizedState)||(dt=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do s=l.lane,De.lanes|=s,En|=s,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function fs(e){var t=jt(),n=t.queue;if(n===null)throw Error(m(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,s=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do s=e(s,i.action),i=i.next;while(i!==l);Mt(s,t.memoizedState)||(dt=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function Ro(){}function Io(e,t){var n=De,r=jt(),l=t(),s=!Mt(r.memoizedState,l);if(s&&(r.memoizedState=l,dt=!0),r=r.queue,hs(Ao.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||Ge!==null&&Ge.memoizedState.tag&1){if(n.flags|=2048,$r(9,Oo.bind(null,n,r,l,t),void 0,null),Ye===null)throw Error(m(349));(Mn&30)!==0||Lo(n,t,l)}return l}function Lo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=De.updateQueue,t===null?(t={lastEffect:null,stores:null},De.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Oo(e,t,n,r){t.value=n,t.getSnapshot=r,Fo(t)&&Do(e)}function Ao(e,t,n){return n(function(){Fo(t)&&Do(e)})}function Fo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Mt(e,n)}catch{return!0}}function Do(e){var t=Qt(e,1);t!==null&&Rt(t,e,1,-1)}function $o(e){var t=Dt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Dr,lastRenderedState:e},t.queue=e,e=e.dispatch=Tu.bind(null,De,e),[t.memoizedState,e]}function $r(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=De.updateQueue,t===null?(t={lastEffect:null,stores:null},De.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Bo(){return jt().memoizedState}function Ia(e,t,n,r){var l=Dt();De.flags|=e,l.memoizedState=$r(1|t,n,void 0,r===void 0?null:r)}function La(e,t,n,r){var l=jt();r=r===void 0?null:r;var s=void 0;if(Ke!==null){var i=Ke.memoizedState;if(s=i.destroy,r!==null&&ds(r,i.deps)){l.memoizedState=$r(t,n,s,r);return}}De.flags|=e,l.memoizedState=$r(1|t,n,s,r)}function Uo(e,t){return Ia(8390656,8,e,t)}function hs(e,t){return La(2048,8,e,t)}function Wo(e,t){return La(4,2,e,t)}function Vo(e,t){return La(4,4,e,t)}function Ho(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Qo(e,t,n){return n=n!=null?n.concat([e]):null,La(4,4,Ho.bind(null,t,e),n)}function gs(){}function Ko(e,t){var n=jt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ds(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qo(e,t){var n=jt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ds(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Go(e,t,n){return(Mn&21)===0?(e.baseState&&(e.baseState=!1,dt=!0),e.memoizedState=n):(Mt(n,t)||(n=Ni(),De.lanes|=n,En|=n,e.baseState=!0),t)}function Pu(e,t){var n=be;be=n!==0&&4>n?n:4,e(!0);var r=cs.transition;cs.transition={};try{e(!1),t()}finally{be=n,cs.transition=r}}function Yo(){return jt().memoizedState}function _u(e,t,n){var r=hn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Xo(e))Jo(t,n);else if(n=Mo(e,t,n,r),n!==null){var l=st();Rt(n,e,r,l),Zo(n,t,r)}}function Tu(e,t,n){var r=hn(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Xo(e))Jo(t,l);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var i=t.lastRenderedState,c=s(i,n);if(l.hasEagerState=!0,l.eagerState=c,Mt(c,i)){var u=t.interleaved;u===null?(l.next=l,rs(t)):(l.next=u.next,u.next=l),t.interleaved=l;return}}catch{}finally{}n=Mo(e,t,l,r),n!==null&&(l=st(),Rt(n,e,r,l),Zo(n,t,r))}}function Xo(e){var t=e.alternate;return e===De||t!==null&&t===De}function Jo(e,t){Ar=Ra=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Zo(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yl(e,n)}}var Oa={readContext:kt,useCallback:tt,useContext:tt,useEffect:tt,useImperativeHandle:tt,useInsertionEffect:tt,useLayoutEffect:tt,useMemo:tt,useReducer:tt,useRef:tt,useState:tt,useDebugValue:tt,useDeferredValue:tt,useTransition:tt,useMutableSource:tt,useSyncExternalStore:tt,useId:tt,unstable_isNewReconciler:!1},Ru={readContext:kt,useCallback:function(e,t){return Dt().memoizedState=[e,t===void 0?null:t],e},useContext:kt,useEffect:Uo,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ia(4194308,4,Ho.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ia(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ia(4,2,e,t)},useMemo:function(e,t){var n=Dt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Dt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=_u.bind(null,De,e),[r.memoizedState,e]},useRef:function(e){var t=Dt();return e={current:e},t.memoizedState=e},useState:$o,useDebugValue:gs,useDeferredValue:function(e){return Dt().memoizedState=e},useTransition:function(){var e=$o(!1),t=e[0];return e=Pu.bind(null,e[1]),Dt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=De,l=Dt();if(Te){if(n===void 0)throw Error(m(407));n=n()}else{if(n=t(),Ye===null)throw Error(m(349));(Mn&30)!==0||Lo(r,t,n)}l.memoizedState=n;var s={value:n,getSnapshot:t};return l.queue=s,Uo(Ao.bind(null,r,s,e),[e]),r.flags|=2048,$r(9,Oo.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=Dt(),t=Ye.identifierPrefix;if(Te){var n=Ht,r=Vt;n=(r&~(1<<32-zt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Fr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Eu++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Iu={readContext:kt,useCallback:Ko,useContext:kt,useEffect:hs,useImperativeHandle:Qo,useInsertionEffect:Wo,useLayoutEffect:Vo,useMemo:qo,useReducer:ps,useRef:Bo,useState:function(){return ps(Dr)},useDebugValue:gs,useDeferredValue:function(e){var t=jt();return Go(t,Ke.memoizedState,e)},useTransition:function(){var e=ps(Dr)[0],t=jt().memoizedState;return[e,t]},useMutableSource:Ro,useSyncExternalStore:Io,useId:Yo,unstable_isNewReconciler:!1},Lu={readContext:kt,useCallback:Ko,useContext:kt,useEffect:hs,useImperativeHandle:Qo,useInsertionEffect:Wo,useLayoutEffect:Vo,useMemo:qo,useReducer:fs,useRef:Bo,useState:function(){return fs(Dr)},useDebugValue:gs,useDeferredValue:function(e){var t=jt();return Ke===null?t.memoizedState=e:Go(t,Ke.memoizedState,e)},useTransition:function(){var e=fs(Dr)[0],t=jt().memoizedState;return[e,t]},useMutableSource:Ro,useSyncExternalStore:Io,useId:Yo,unstable_isNewReconciler:!1};function Pt(e,t){if(e&&e.defaultProps){t=d({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function vs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:d({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Aa={isMounted:function(e){return(e=e._reactInternals)?kn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=st(),l=hn(e),s=Kt(r,l);s.payload=t,n!=null&&(s.callback=n),t=un(e,s,l),t!==null&&(Rt(t,e,l,r),Ea(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=st(),l=hn(e),s=Kt(r,l);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=un(e,s,l),t!==null&&(Rt(t,e,l,r),Ea(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=st(),r=hn(e),l=Kt(n,r);l.tag=2,t!=null&&(l.callback=t),t=un(e,l,r),t!==null&&(Rt(t,e,r,n),Ea(t,e,r))}};function ec(e,t,n,r,l,s,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,i):t.prototype&&t.prototype.isPureReactComponent?!Cr(n,r)||!Cr(l,s):!0}function tc(e,t,n){var r=!1,l=on,s=t.contextType;return typeof s=="object"&&s!==null?s=kt(s):(l=ct(t)?bn:et.current,r=t.contextTypes,s=(r=r!=null)?qn(e,l):on),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Aa,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=s),t}function nc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Aa.enqueueReplaceState(t,t.state,null)}function ys(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},as(e);var s=t.contextType;typeof s=="object"&&s!==null?l.context=kt(s):(s=ct(t)?bn:et.current,l.context=qn(e,s)),l.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(vs(e,t,s,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Aa.enqueueReplaceState(l,l.state,null),Pa(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function nr(e,t){try{var n="",r=t;do n+=L(r),r=r.return;while(r);var l=n}catch(s){l=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:l,digest:null}}function xs(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ws(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Ou=typeof WeakMap=="function"?WeakMap:Map;function rc(e,t,n){n=Kt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Va||(Va=!0,Ls=r),ws(e,t)},n}function ac(e,t,n){n=Kt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){ws(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){ws(e,t),typeof r!="function"&&(pn===null?pn=new Set([this]):pn.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function lc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ou;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Yu.bind(null,e,t,n),t.then(e,e))}function sc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ic(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Kt(-1,1),t.tag=2,un(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Au=he.ReactCurrentOwner,dt=!1;function lt(e,t,n,r){t.child=e===null?zo(t,null,n,r):Jn(t,e.child,n,r)}function oc(e,t,n,r,l){n=n.render;var s=t.ref;return er(t,l),r=us(e,t,n,r,s,l),n=ms(),e!==null&&!dt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,qt(e,t,l)):(Te&&n&&ql(t),t.flags|=1,lt(e,t,r,l),t.child)}function cc(e,t,n,r,l){if(e===null){var s=n.type;return typeof s=="function"&&!Us(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,dc(e,t,s,r,l)):(e=Ya(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,(e.lanes&l)===0){var i=s.memoizedProps;if(n=n.compare,n=n!==null?n:Cr,n(i,r)&&e.ref===t.ref)return qt(e,t,l)}return t.flags|=1,e=vn(s,r),e.ref=t.ref,e.return=t,t.child=e}function dc(e,t,n,r,l){if(e!==null){var s=e.memoizedProps;if(Cr(s,r)&&e.ref===t.ref)if(dt=!1,t.pendingProps=r=s,(e.lanes&l)!==0)(e.flags&131072)!==0&&(dt=!0);else return t.lanes=e.lanes,qt(e,t,l)}return ks(e,t,n,r,l)}function uc(e,t,n){var r=t.pendingProps,l=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ze(ar,vt),vt|=n;else{if((n&1073741824)===0)return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ze(ar,vt),vt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ze(ar,vt),vt|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,ze(ar,vt),vt|=r;return lt(e,t,l,n),t.child}function mc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ks(e,t,n,r,l){var s=ct(n)?bn:et.current;return s=qn(t,s),er(t,l),n=us(e,t,n,r,s,l),r=ms(),e!==null&&!dt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,qt(e,t,l)):(Te&&r&&ql(t),t.flags|=1,lt(e,t,n,l),t.child)}function pc(e,t,n,r,l){if(ct(n)){var s=!0;ka(t)}else s=!1;if(er(t,l),t.stateNode===null)Da(e,t),tc(t,n,r),ys(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,c=t.memoizedProps;i.props=c;var u=i.context,x=n.contextType;typeof x=="object"&&x!==null?x=kt(x):(x=ct(n)?bn:et.current,x=qn(t,x));var b=n.getDerivedStateFromProps,N=typeof b=="function"||typeof i.getSnapshotBeforeUpdate=="function";N||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==r||u!==x)&&nc(t,i,r,x),dn=!1;var j=t.memoizedState;i.state=j,Pa(t,r,i,l),u=t.memoizedState,c!==r||j!==u||ot.current||dn?(typeof b=="function"&&(vs(t,n,b,r),u=t.memoizedState),(c=dn||ec(t,n,c,r,j,u,x))?(N||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),i.props=r,i.state=u,i.context=x,r=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,Eo(e,t),c=t.memoizedProps,x=t.type===t.elementType?c:Pt(t.type,c),i.props=x,N=t.pendingProps,j=i.context,u=n.contextType,typeof u=="object"&&u!==null?u=kt(u):(u=ct(n)?bn:et.current,u=qn(t,u));var $=n.getDerivedStateFromProps;(b=typeof $=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==N||j!==u)&&nc(t,i,r,u),dn=!1,j=t.memoizedState,i.state=j,Pa(t,r,i,l);var q=t.memoizedState;c!==N||j!==q||ot.current||dn?(typeof $=="function"&&(vs(t,n,$,r),q=t.memoizedState),(x=dn||ec(t,n,x,r,j,q,u)||!1)?(b||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,q,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,q,u)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=q),i.props=r,i.state=q,i.context=u,r=x):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),r=!1)}return js(e,t,n,r,s,l)}function js(e,t,n,r,l,s){mc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&yo(t,n,!1),qt(e,t,s);r=t.stateNode,Au.current=t;var c=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=Jn(t,e.child,null,s),t.child=Jn(t,null,c,s)):lt(e,t,c,s),t.memoizedState=r.state,l&&yo(t,n,!0),t.child}function fc(e){var t=e.stateNode;t.pendingContext?go(e,t.pendingContext,t.pendingContext!==t.context):t.context&&go(e,t.context,!1),ls(e,t.containerInfo)}function hc(e,t,n,r,l){return Xn(),Jl(l),t.flags|=256,lt(e,t,n,r),t.child}var bs={dehydrated:null,treeContext:null,retryLane:0};function Ns(e){return{baseLanes:e,cachePool:null,transitions:null}}function gc(e,t,n){var r=t.pendingProps,l=Fe.current,s=!1,i=(t.flags&128)!==0,c;if((c=i)||(c=e!==null&&e.memoizedState===null?!1:(l&2)!==0),c?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),ze(Fe,l&1),e===null)return Xl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,s?(r=t.mode,s=t.child,i={mode:"hidden",children:i},(r&1)===0&&s!==null?(s.childLanes=0,s.pendingProps=i):s=Xa(i,r,0,null),e=Rn(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Ns(n),t.memoizedState=bs,e):Ss(t,i));if(l=e.memoizedState,l!==null&&(c=l.dehydrated,c!==null))return Fu(e,t,i,r,c,l,n);if(s){s=r.fallback,i=t.mode,l=e.child,c=l.sibling;var u={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=vn(l,u),r.subtreeFlags=l.subtreeFlags&14680064),c!==null?s=vn(c,s):(s=Rn(s,i,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,i=e.child.memoizedState,i=i===null?Ns(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},s.memoizedState=i,s.childLanes=e.childLanes&~n,t.memoizedState=bs,r}return s=e.child,e=s.sibling,r=vn(s,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ss(e,t){return t=Xa({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Fa(e,t,n,r){return r!==null&&Jl(r),Jn(t,e.child,null,n),e=Ss(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Fu(e,t,n,r,l,s,i){if(n)return t.flags&256?(t.flags&=-257,r=xs(Error(m(422))),Fa(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,l=t.mode,r=Xa({mode:"visible",children:r.children},l,0,null),s=Rn(s,l,i,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,(t.mode&1)!==0&&Jn(t,e.child,null,i),t.child.memoizedState=Ns(i),t.memoizedState=bs,s);if((t.mode&1)===0)return Fa(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var c=r.dgst;return r=c,s=Error(m(419)),r=xs(s,r,void 0),Fa(e,t,i,r)}if(c=(i&e.childLanes)!==0,dt||c){if(r=Ye,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==s.retryLane&&(s.retryLane=l,Qt(e,l),Rt(r,e,l,-1))}return Bs(),r=xs(Error(m(421))),Fa(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Xu.bind(null,e),l._reactRetry=t,null):(e=s.treeContext,gt=ln(l.nextSibling),ht=t,Te=!0,Et=null,e!==null&&(xt[wt++]=Vt,xt[wt++]=Ht,xt[wt++]=Nn,Vt=e.id,Ht=e.overflow,Nn=t),t=Ss(t,r.children),t.flags|=4096,t)}function vc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ns(e.return,t,n)}function Cs(e,t,n,r,l){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=l)}function yc(e,t,n){var r=t.pendingProps,l=r.revealOrder,s=r.tail;if(lt(e,t,r.children,n),r=Fe.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&vc(e,n,t);else if(e.tag===19)vc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ze(Fe,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&_a(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Cs(t,!1,l,n,s);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&_a(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Cs(t,!0,n,null,s);break;case"together":Cs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Da(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function qt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),En|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(m(153));if(t.child!==null){for(e=t.child,n=vn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=vn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Du(e,t,n){switch(t.tag){case 3:fc(t),Xn();break;case 5:To(t);break;case 1:ct(t.type)&&ka(t);break;case 4:ls(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;ze(za,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ze(Fe,Fe.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?gc(e,t,n):(ze(Fe,Fe.current&1),e=qt(e,t,n),e!==null?e.sibling:null);ze(Fe,Fe.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return yc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),ze(Fe,Fe.current),r)break;return null;case 22:case 23:return t.lanes=0,uc(e,t,n)}return qt(e,t,n)}var xc,zs,wc,kc;xc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},zs=function(){},wc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,zn(Ft.current);var s=null;switch(n){case"input":l=w(e,l),r=w(e,r),s=[];break;case"select":l=d({},l,{value:void 0}),r=d({},r,{value:void 0}),s=[];break;case"textarea":l=yt(e,l),r=yt(e,r),s=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ya)}il(n,r);var i;n=null;for(x in l)if(!r.hasOwnProperty(x)&&l.hasOwnProperty(x)&&l[x]!=null)if(x==="style"){var c=l[x];for(i in c)c.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else x!=="dangerouslySetInnerHTML"&&x!=="children"&&x!=="suppressContentEditableWarning"&&x!=="suppressHydrationWarning"&&x!=="autoFocus"&&(R.hasOwnProperty(x)?s||(s=[]):(s=s||[]).push(x,null));for(x in r){var u=r[x];if(c=l!=null?l[x]:void 0,r.hasOwnProperty(x)&&u!==c&&(u!=null||c!=null))if(x==="style")if(c){for(i in c)!c.hasOwnProperty(i)||u&&u.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in u)u.hasOwnProperty(i)&&c[i]!==u[i]&&(n||(n={}),n[i]=u[i])}else n||(s||(s=[]),s.push(x,n)),n=u;else x==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,c=c?c.__html:void 0,u!=null&&c!==u&&(s=s||[]).push(x,u)):x==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(x,""+u):x!=="suppressContentEditableWarning"&&x!=="suppressHydrationWarning"&&(R.hasOwnProperty(x)?(u!=null&&x==="onScroll"&&Ee("scroll",e),s||c===u||(s=[])):(s=s||[]).push(x,u))}n&&(s=s||[]).push("style",n);var x=s;(t.updateQueue=x)&&(t.flags|=4)}},kc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Br(e,t){if(!Te)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function nt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function $u(e,t,n){var r=t.pendingProps;switch(Gl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return nt(t),null;case 1:return ct(t.type)&&wa(),nt(t),null;case 3:return r=t.stateNode,tr(),Pe(ot),Pe(et),os(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Sa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Et!==null&&(Fs(Et),Et=null))),zs(e,t),nt(t),null;case 5:ss(t);var l=zn(Or.current);if(n=t.type,e!==null&&t.stateNode!=null)wc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(m(166));return nt(t),null}if(e=zn(Ft.current),Sa(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[At]=t,r[_r]=s,e=(t.mode&1)!==0,n){case"dialog":Ee("cancel",r),Ee("close",r);break;case"iframe":case"object":case"embed":Ee("load",r);break;case"video":case"audio":for(l=0;l<Mr.length;l++)Ee(Mr[l],r);break;case"source":Ee("error",r);break;case"img":case"image":case"link":Ee("error",r),Ee("load",r);break;case"details":Ee("toggle",r);break;case"input":te(r,s),Ee("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Ee("invalid",r);break;case"textarea":Ln(r,s),Ee("invalid",r)}il(n,s),l=null;for(var i in s)if(s.hasOwnProperty(i)){var c=s[i];i==="children"?typeof c=="string"?r.textContent!==c&&(s.suppressHydrationWarning!==!0&&va(r.textContent,c,e),l=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(s.suppressHydrationWarning!==!0&&va(r.textContent,c,e),l=["children",""+c]):R.hasOwnProperty(i)&&c!=null&&i==="onScroll"&&Ee("scroll",r)}switch(n){case"input":ye(r),at(r,s,!0);break;case"textarea":ye(r),It(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=ya)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=wn(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[At]=t,e[_r]=r,xc(e,t,!1,!1),t.stateNode=e;e:{switch(i=ol(n,r),n){case"dialog":Ee("cancel",e),Ee("close",e),l=r;break;case"iframe":case"object":case"embed":Ee("load",e),l=r;break;case"video":case"audio":for(l=0;l<Mr.length;l++)Ee(Mr[l],e);l=r;break;case"source":Ee("error",e),l=r;break;case"img":case"image":case"link":Ee("error",e),Ee("load",e),l=r;break;case"details":Ee("toggle",e),l=r;break;case"input":te(e,r),l=w(e,r),Ee("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=d({},r,{value:void 0}),Ee("invalid",e);break;case"textarea":Ln(e,r),l=yt(e,r),Ee("invalid",e);break;default:l=r}il(n,l),c=l;for(s in c)if(c.hasOwnProperty(s)){var u=c[s];s==="style"?ci(e,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&dr(e,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Jt(e,u):typeof u=="number"&&Jt(e,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(R.hasOwnProperty(s)?u!=null&&s==="onScroll"&&Ee("scroll",e):u!=null&&de(e,s,u,i))}switch(n){case"input":ye(e),at(e,r,!1);break;case"textarea":ye(e),It(e);break;case"option":r.value!=null&&e.setAttribute("value",""+B(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Ve(e,!!r.multiple,s,!1):r.defaultValue!=null&&Ve(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=ya)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return nt(t),null;case 6:if(e&&t.stateNode!=null)kc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(m(166));if(n=zn(Or.current),zn(Ft.current),Sa(t)){if(r=t.stateNode,n=t.memoizedProps,r[At]=t,(s=r.nodeValue!==n)&&(e=ht,e!==null))switch(e.tag){case 3:va(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&va(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[At]=t,t.stateNode=r}return nt(t),null;case 13:if(Pe(Fe),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Te&&gt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)No(),Xn(),t.flags|=98560,s=!1;else if(s=Sa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(m(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(m(317));s[At]=t}else Xn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;nt(t),s=!1}else Et!==null&&(Fs(Et),Et=null),s=!0;if(!s)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Fe.current&1)!==0?qe===0&&(qe=3):Bs())),t.updateQueue!==null&&(t.flags|=4),nt(t),null);case 4:return tr(),zs(e,t),e===null&&Er(t.stateNode.containerInfo),nt(t),null;case 10:return ts(t.type._context),nt(t),null;case 17:return ct(t.type)&&wa(),nt(t),null;case 19:if(Pe(Fe),s=t.memoizedState,s===null)return nt(t),null;if(r=(t.flags&128)!==0,i=s.rendering,i===null)if(r)Br(s,!1);else{if(qe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=_a(e),i!==null){for(t.flags|=128,Br(s,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,i=s.alternate,i===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=i.childLanes,s.lanes=i.lanes,s.child=i.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=i.memoizedProps,s.memoizedState=i.memoizedState,s.updateQueue=i.updateQueue,s.type=i.type,e=i.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ze(Fe,Fe.current&1|2),t.child}e=e.sibling}s.tail!==null&&Be()>lr&&(t.flags|=128,r=!0,Br(s,!1),t.lanes=4194304)}else{if(!r)if(e=_a(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Br(s,!0),s.tail===null&&s.tailMode==="hidden"&&!i.alternate&&!Te)return nt(t),null}else 2*Be()-s.renderingStartTime>lr&&n!==1073741824&&(t.flags|=128,r=!0,Br(s,!1),t.lanes=4194304);s.isBackwards?(i.sibling=t.child,t.child=i):(n=s.last,n!==null?n.sibling=i:t.child=i,s.last=i)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Be(),t.sibling=null,n=Fe.current,ze(Fe,r?n&1|2:n&1),t):(nt(t),null);case 22:case 23:return $s(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(vt&1073741824)!==0&&(nt(t),t.subtreeFlags&6&&(t.flags|=8192)):nt(t),null;case 24:return null;case 25:return null}throw Error(m(156,t.tag))}function Bu(e,t){switch(Gl(t),t.tag){case 1:return ct(t.type)&&wa(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return tr(),Pe(ot),Pe(et),os(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return ss(t),null;case 13:if(Pe(Fe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(m(340));Xn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Pe(Fe),null;case 4:return tr(),null;case 10:return ts(t.type._context),null;case 22:case 23:return $s(),null;case 24:return null;default:return null}}var $a=!1,rt=!1,Uu=typeof WeakSet=="function"?WeakSet:Set,H=null;function rr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){$e(e,t,r)}else n.current=null}function Ms(e,t,n){try{n()}catch(r){$e(e,t,r)}}var jc=!1;function Wu(e,t){if($l=sa,e=Zi(),Tl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var i=0,c=-1,u=-1,x=0,b=0,N=e,j=null;t:for(;;){for(var $;N!==n||l!==0&&N.nodeType!==3||(c=i+l),N!==s||r!==0&&N.nodeType!==3||(u=i+r),N.nodeType===3&&(i+=N.nodeValue.length),($=N.firstChild)!==null;)j=N,N=$;for(;;){if(N===e)break t;if(j===n&&++x===l&&(c=i),j===s&&++b===r&&(u=i),($=N.nextSibling)!==null)break;N=j,j=N.parentNode}N=$}n=c===-1||u===-1?null:{start:c,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Bl={focusedElem:e,selectionRange:n},sa=!1,H=t;H!==null;)if(t=H,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,H=e;else for(;H!==null;){t=H;try{var q=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(q!==null){var Y=q.memoizedProps,Ue=q.memoizedState,g=t.stateNode,f=g.getSnapshotBeforeUpdate(t.elementType===t.type?Y:Pt(t.type,Y),Ue);g.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163))}}catch(z){$e(t,t.return,z)}if(e=t.sibling,e!==null){e.return=t.return,H=e;break}H=t.return}return q=jc,jc=!1,q}function Ur(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var s=l.destroy;l.destroy=void 0,s!==void 0&&Ms(t,n,s)}l=l.next}while(l!==r)}}function Ba(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Es(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function bc(e){var t=e.alternate;t!==null&&(e.alternate=null,bc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[At],delete t[_r],delete t[Hl],delete t[Su],delete t[Cu])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Nc(e){return e.tag===5||e.tag===3||e.tag===4}function Sc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Nc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ps(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ya));else if(r!==4&&(e=e.child,e!==null))for(Ps(e,t,n),e=e.sibling;e!==null;)Ps(e,t,n),e=e.sibling}function _s(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(_s(e,t,n),e=e.sibling;e!==null;)_s(e,t,n),e=e.sibling}var Je=null,_t=!1;function mn(e,t,n){for(n=n.child;n!==null;)Cc(e,t,n),n=n.sibling}function Cc(e,t,n){if(Ot&&typeof Ot.onCommitFiberUnmount=="function")try{Ot.onCommitFiberUnmount(ea,n)}catch{}switch(n.tag){case 5:rt||rr(n,t);case 6:var r=Je,l=_t;Je=null,mn(e,t,n),Je=r,_t=l,Je!==null&&(_t?(e=Je,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Je.removeChild(n.stateNode));break;case 18:Je!==null&&(_t?(e=Je,n=n.stateNode,e.nodeType===8?Vl(e.parentNode,n):e.nodeType===1&&Vl(e,n),wr(e)):Vl(Je,n.stateNode));break;case 4:r=Je,l=_t,Je=n.stateNode.containerInfo,_t=!0,mn(e,t,n),Je=r,_t=l;break;case 0:case 11:case 14:case 15:if(!rt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var s=l,i=s.destroy;s=s.tag,i!==void 0&&((s&2)!==0||(s&4)!==0)&&Ms(n,t,i),l=l.next}while(l!==r)}mn(e,t,n);break;case 1:if(!rt&&(rr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){$e(n,t,c)}mn(e,t,n);break;case 21:mn(e,t,n);break;case 22:n.mode&1?(rt=(r=rt)||n.memoizedState!==null,mn(e,t,n),rt=r):mn(e,t,n);break;default:mn(e,t,n)}}function zc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Uu),t.forEach(function(r){var l=Ju.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Tt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var s=e,i=t,c=i;e:for(;c!==null;){switch(c.tag){case 5:Je=c.stateNode,_t=!1;break e;case 3:Je=c.stateNode.containerInfo,_t=!0;break e;case 4:Je=c.stateNode.containerInfo,_t=!0;break e}c=c.return}if(Je===null)throw Error(m(160));Cc(s,i,l),Je=null,_t=!1;var u=l.alternate;u!==null&&(u.return=null),l.return=null}catch(x){$e(l,t,x)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Mc(t,e),t=t.sibling}function Mc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Tt(t,e),$t(e),r&4){try{Ur(3,e,e.return),Ba(3,e)}catch(Y){$e(e,e.return,Y)}try{Ur(5,e,e.return)}catch(Y){$e(e,e.return,Y)}}break;case 1:Tt(t,e),$t(e),r&512&&n!==null&&rr(n,n.return);break;case 5:if(Tt(t,e),$t(e),r&512&&n!==null&&rr(n,n.return),e.flags&32){var l=e.stateNode;try{Jt(l,"")}catch(Y){$e(e,e.return,Y)}}if(r&4&&(l=e.stateNode,l!=null)){var s=e.memoizedProps,i=n!==null?n.memoizedProps:s,c=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{c==="input"&&s.type==="radio"&&s.name!=null&&ge(l,s),ol(c,i);var x=ol(c,s);for(i=0;i<u.length;i+=2){var b=u[i],N=u[i+1];b==="style"?ci(l,N):b==="dangerouslySetInnerHTML"?dr(l,N):b==="children"?Jt(l,N):de(l,b,N,x)}switch(c){case"input":_e(l,s);break;case"textarea":Ct(l,s);break;case"select":var j=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!s.multiple;var $=s.value;$!=null?Ve(l,!!s.multiple,$,!1):j!==!!s.multiple&&(s.defaultValue!=null?Ve(l,!!s.multiple,s.defaultValue,!0):Ve(l,!!s.multiple,s.multiple?[]:"",!1))}l[_r]=s}catch(Y){$e(e,e.return,Y)}}break;case 6:if(Tt(t,e),$t(e),r&4){if(e.stateNode===null)throw Error(m(162));l=e.stateNode,s=e.memoizedProps;try{l.nodeValue=s}catch(Y){$e(e,e.return,Y)}}break;case 3:if(Tt(t,e),$t(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{wr(t.containerInfo)}catch(Y){$e(e,e.return,Y)}break;case 4:Tt(t,e),$t(e);break;case 13:Tt(t,e),$t(e),l=e.child,l.flags&8192&&(s=l.memoizedState!==null,l.stateNode.isHidden=s,!s||l.alternate!==null&&l.alternate.memoizedState!==null||(Is=Be())),r&4&&zc(e);break;case 22:if(b=n!==null&&n.memoizedState!==null,e.mode&1?(rt=(x=rt)||b,Tt(t,e),rt=x):Tt(t,e),$t(e),r&8192){if(x=e.memoizedState!==null,(e.stateNode.isHidden=x)&&!b&&(e.mode&1)!==0)for(H=e,b=e.child;b!==null;){for(N=H=b;H!==null;){switch(j=H,$=j.child,j.tag){case 0:case 11:case 14:case 15:Ur(4,j,j.return);break;case 1:rr(j,j.return);var q=j.stateNode;if(typeof q.componentWillUnmount=="function"){r=j,n=j.return;try{t=r,q.props=t.memoizedProps,q.state=t.memoizedState,q.componentWillUnmount()}catch(Y){$e(r,n,Y)}}break;case 5:rr(j,j.return);break;case 22:if(j.memoizedState!==null){_c(N);continue}}$!==null?($.return=j,H=$):_c(N)}b=b.sibling}e:for(b=null,N=e;;){if(N.tag===5){if(b===null){b=N;try{l=N.stateNode,x?(s=l.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(c=N.stateNode,u=N.memoizedProps.style,i=u!=null&&u.hasOwnProperty("display")?u.display:null,c.style.display=Yr("display",i))}catch(Y){$e(e,e.return,Y)}}}else if(N.tag===6){if(b===null)try{N.stateNode.nodeValue=x?"":N.memoizedProps}catch(Y){$e(e,e.return,Y)}}else if((N.tag!==22&&N.tag!==23||N.memoizedState===null||N===e)&&N.child!==null){N.child.return=N,N=N.child;continue}if(N===e)break e;for(;N.sibling===null;){if(N.return===null||N.return===e)break e;b===N&&(b=null),N=N.return}b===N&&(b=null),N.sibling.return=N.return,N=N.sibling}}break;case 19:Tt(t,e),$t(e),r&4&&zc(e);break;case 21:break;default:Tt(t,e),$t(e)}}function $t(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Nc(n)){var r=n;break e}n=n.return}throw Error(m(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Jt(l,""),r.flags&=-33);var s=Sc(e);_s(e,s,l);break;case 3:case 4:var i=r.stateNode.containerInfo,c=Sc(e);Ps(e,c,i);break;default:throw Error(m(161))}}catch(u){$e(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Vu(e,t,n){H=e,Ec(e)}function Ec(e,t,n){for(var r=(e.mode&1)!==0;H!==null;){var l=H,s=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||$a;if(!i){var c=l.alternate,u=c!==null&&c.memoizedState!==null||rt;c=$a;var x=rt;if($a=i,(rt=u)&&!x)for(H=l;H!==null;)i=H,u=i.child,i.tag===22&&i.memoizedState!==null?Tc(l):u!==null?(u.return=i,H=u):Tc(l);for(;s!==null;)H=s,Ec(s),s=s.sibling;H=l,$a=c,rt=x}Pc(e)}else(l.subtreeFlags&8772)!==0&&s!==null?(s.return=l,H=s):Pc(e)}}function Pc(e){for(;H!==null;){var t=H;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:rt||Ba(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!rt)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Pt(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&_o(t,s,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}_o(t,i,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var x=t.alternate;if(x!==null){var b=x.memoizedState;if(b!==null){var N=b.dehydrated;N!==null&&wr(N)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163))}rt||t.flags&512&&Es(t)}catch(j){$e(t,t.return,j)}}if(t===e){H=null;break}if(n=t.sibling,n!==null){n.return=t.return,H=n;break}H=t.return}}function _c(e){for(;H!==null;){var t=H;if(t===e){H=null;break}var n=t.sibling;if(n!==null){n.return=t.return,H=n;break}H=t.return}}function Tc(e){for(;H!==null;){var t=H;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ba(4,t)}catch(u){$e(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(u){$e(t,l,u)}}var s=t.return;try{Es(t)}catch(u){$e(t,s,u)}break;case 5:var i=t.return;try{Es(t)}catch(u){$e(t,i,u)}}}catch(u){$e(t,t.return,u)}if(t===e){H=null;break}var c=t.sibling;if(c!==null){c.return=t.return,H=c;break}H=t.return}}var Hu=Math.ceil,Ua=he.ReactCurrentDispatcher,Ts=he.ReactCurrentOwner,bt=he.ReactCurrentBatchConfig,xe=0,Ye=null,He=null,Ze=0,vt=0,ar=sn(0),qe=0,Wr=null,En=0,Wa=0,Rs=0,Vr=null,ut=null,Is=0,lr=1/0,Gt=null,Va=!1,Ls=null,pn=null,Ha=!1,fn=null,Qa=0,Hr=0,Os=null,Ka=-1,qa=0;function st(){return(xe&6)!==0?Be():Ka!==-1?Ka:Ka=Be()}function hn(e){return(e.mode&1)===0?1:(xe&2)!==0&&Ze!==0?Ze&-Ze:Mu.transition!==null?(qa===0&&(qa=Ni()),qa):(e=be,e!==0||(e=window.event,e=e===void 0?16:Ri(e.type)),e)}function Rt(e,t,n,r){if(50<Hr)throw Hr=0,Os=null,Error(m(185));hr(e,n,r),((xe&2)===0||e!==Ye)&&(e===Ye&&((xe&2)===0&&(Wa|=n),qe===4&&gn(e,Ze)),mt(e,r),n===1&&xe===0&&(t.mode&1)===0&&(lr=Be()+500,ja&&cn()))}function mt(e,t){var n=e.callbackNode;Md(e,t);var r=ra(e,e===Ye?Ze:0);if(r===0)n!==null&&ki(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ki(n),t===1)e.tag===0?zu(Ic.bind(null,e)):xo(Ic.bind(null,e)),bu(function(){(xe&6)===0&&cn()}),n=null;else{switch(Si(r)){case 1:n=hl;break;case 4:n=ji;break;case 16:n=Zr;break;case 536870912:n=bi;break;default:n=Zr}n=Uc(n,Rc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Rc(e,t){if(Ka=-1,qa=0,(xe&6)!==0)throw Error(m(327));var n=e.callbackNode;if(sr()&&e.callbackNode!==n)return null;var r=ra(e,e===Ye?Ze:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Ga(e,r);else{t=r;var l=xe;xe|=2;var s=Oc();(Ye!==e||Ze!==t)&&(Gt=null,lr=Be()+500,_n(e,t));do try{qu();break}catch(c){Lc(e,c)}while(!0);es(),Ua.current=s,xe=l,He!==null?t=0:(Ye=null,Ze=0,t=qe)}if(t!==0){if(t===2&&(l=gl(e),l!==0&&(r=l,t=As(e,l))),t===1)throw n=Wr,_n(e,0),gn(e,r),mt(e,Be()),n;if(t===6)gn(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Qu(l)&&(t=Ga(e,r),t===2&&(s=gl(e),s!==0&&(r=s,t=As(e,s))),t===1))throw n=Wr,_n(e,0),gn(e,r),mt(e,Be()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(m(345));case 2:Tn(e,ut,Gt);break;case 3:if(gn(e,r),(r&130023424)===r&&(t=Is+500-Be(),10<t)){if(ra(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){st(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Wl(Tn.bind(null,e,ut,Gt),t);break}Tn(e,ut,Gt);break;case 4:if(gn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-zt(r);s=1<<i,i=t[i],i>l&&(l=i),r&=~s}if(r=l,r=Be()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Hu(r/1960))-r,10<r){e.timeoutHandle=Wl(Tn.bind(null,e,ut,Gt),r);break}Tn(e,ut,Gt);break;case 5:Tn(e,ut,Gt);break;default:throw Error(m(329))}}}return mt(e,Be()),e.callbackNode===n?Rc.bind(null,e):null}function As(e,t){var n=Vr;return e.current.memoizedState.isDehydrated&&(_n(e,t).flags|=256),e=Ga(e,t),e!==2&&(t=ut,ut=n,t!==null&&Fs(t)),e}function Fs(e){ut===null?ut=e:ut.push.apply(ut,e)}function Qu(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],s=l.getSnapshot;l=l.value;try{if(!Mt(s(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function gn(e,t){for(t&=~Rs,t&=~Wa,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-zt(t),r=1<<n;e[n]=-1,t&=~r}}function Ic(e){if((xe&6)!==0)throw Error(m(327));sr();var t=ra(e,0);if((t&1)===0)return mt(e,Be()),null;var n=Ga(e,t);if(e.tag!==0&&n===2){var r=gl(e);r!==0&&(t=r,n=As(e,r))}if(n===1)throw n=Wr,_n(e,0),gn(e,t),mt(e,Be()),n;if(n===6)throw Error(m(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Tn(e,ut,Gt),mt(e,Be()),null}function Ds(e,t){var n=xe;xe|=1;try{return e(t)}finally{xe=n,xe===0&&(lr=Be()+500,ja&&cn())}}function Pn(e){fn!==null&&fn.tag===0&&(xe&6)===0&&sr();var t=xe;xe|=1;var n=bt.transition,r=be;try{if(bt.transition=null,be=1,e)return e()}finally{be=r,bt.transition=n,xe=t,(xe&6)===0&&cn()}}function $s(){vt=ar.current,Pe(ar)}function _n(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ju(n)),He!==null)for(n=He.return;n!==null;){var r=n;switch(Gl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&wa();break;case 3:tr(),Pe(ot),Pe(et),os();break;case 5:ss(r);break;case 4:tr();break;case 13:Pe(Fe);break;case 19:Pe(Fe);break;case 10:ts(r.type._context);break;case 22:case 23:$s()}n=n.return}if(Ye=e,He=e=vn(e.current,null),Ze=vt=t,qe=0,Wr=null,Rs=Wa=En=0,ut=Vr=null,Cn!==null){for(t=0;t<Cn.length;t++)if(n=Cn[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,s=n.pending;if(s!==null){var i=s.next;s.next=l,r.next=i}n.pending=r}Cn=null}return e}function Lc(e,t){do{var n=He;try{if(es(),Ta.current=Oa,Ra){for(var r=De.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}Ra=!1}if(Mn=0,Ge=Ke=De=null,Ar=!1,Fr=0,Ts.current=null,n===null||n.return===null){qe=1,Wr=t,He=null;break}e:{var s=e,i=n.return,c=n,u=t;if(t=Ze,c.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var x=u,b=c,N=b.tag;if((b.mode&1)===0&&(N===0||N===11||N===15)){var j=b.alternate;j?(b.updateQueue=j.updateQueue,b.memoizedState=j.memoizedState,b.lanes=j.lanes):(b.updateQueue=null,b.memoizedState=null)}var $=sc(i);if($!==null){$.flags&=-257,ic($,i,c,s,t),$.mode&1&&lc(s,x,t),t=$,u=x;var q=t.updateQueue;if(q===null){var Y=new Set;Y.add(u),t.updateQueue=Y}else q.add(u);break e}else{if((t&1)===0){lc(s,x,t),Bs();break e}u=Error(m(426))}}else if(Te&&c.mode&1){var Ue=sc(i);if(Ue!==null){(Ue.flags&65536)===0&&(Ue.flags|=256),ic(Ue,i,c,s,t),Jl(nr(u,c));break e}}s=u=nr(u,c),qe!==4&&(qe=2),Vr===null?Vr=[s]:Vr.push(s),s=i;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var g=rc(s,u,t);Po(s,g);break e;case 1:c=u;var f=s.type,y=s.stateNode;if((s.flags&128)===0&&(typeof f.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(pn===null||!pn.has(y)))){s.flags|=65536,t&=-t,s.lanes|=t;var z=ac(s,c,t);Po(s,z);break e}}s=s.return}while(s!==null)}Fc(n)}catch(J){t=J,He===n&&n!==null&&(He=n=n.return);continue}break}while(!0)}function Oc(){var e=Ua.current;return Ua.current=Oa,e===null?Oa:e}function Bs(){(qe===0||qe===3||qe===2)&&(qe=4),Ye===null||(En&268435455)===0&&(Wa&268435455)===0||gn(Ye,Ze)}function Ga(e,t){var n=xe;xe|=2;var r=Oc();(Ye!==e||Ze!==t)&&(Gt=null,_n(e,t));do try{Ku();break}catch(l){Lc(e,l)}while(!0);if(es(),xe=n,Ua.current=r,He!==null)throw Error(m(261));return Ye=null,Ze=0,qe}function Ku(){for(;He!==null;)Ac(He)}function qu(){for(;He!==null&&!xd();)Ac(He)}function Ac(e){var t=Bc(e.alternate,e,vt);e.memoizedProps=e.pendingProps,t===null?Fc(e):He=t,Ts.current=null}function Fc(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=$u(n,t,vt),n!==null){He=n;return}}else{if(n=Bu(n,t),n!==null){n.flags&=32767,He=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{qe=6,He=null;return}}if(t=t.sibling,t!==null){He=t;return}He=t=e}while(t!==null);qe===0&&(qe=5)}function Tn(e,t,n){var r=be,l=bt.transition;try{bt.transition=null,be=1,Gu(e,t,n,r)}finally{bt.transition=l,be=r}return null}function Gu(e,t,n,r){do sr();while(fn!==null);if((xe&6)!==0)throw Error(m(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(m(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(Ed(e,s),e===Ye&&(He=Ye=null,Ze=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Ha||(Ha=!0,Uc(Zr,function(){return sr(),null})),s=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||s){s=bt.transition,bt.transition=null;var i=be;be=1;var c=xe;xe|=4,Ts.current=null,Wu(e,n),Mc(n,e),hu(Bl),sa=!!$l,Bl=$l=null,e.current=n,Vu(n),wd(),xe=c,be=i,bt.transition=s}else e.current=n;if(Ha&&(Ha=!1,fn=e,Qa=l),s=e.pendingLanes,s===0&&(pn=null),bd(n.stateNode),mt(e,Be()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(Va)throw Va=!1,e=Ls,Ls=null,e;return(Qa&1)!==0&&e.tag!==0&&sr(),s=e.pendingLanes,(s&1)!==0?e===Os?Hr++:(Hr=0,Os=e):Hr=0,cn(),null}function sr(){if(fn!==null){var e=Si(Qa),t=bt.transition,n=be;try{if(bt.transition=null,be=16>e?16:e,fn===null)var r=!1;else{if(e=fn,fn=null,Qa=0,(xe&6)!==0)throw Error(m(331));var l=xe;for(xe|=4,H=e.current;H!==null;){var s=H,i=s.child;if((H.flags&16)!==0){var c=s.deletions;if(c!==null){for(var u=0;u<c.length;u++){var x=c[u];for(H=x;H!==null;){var b=H;switch(b.tag){case 0:case 11:case 15:Ur(8,b,s)}var N=b.child;if(N!==null)N.return=b,H=N;else for(;H!==null;){b=H;var j=b.sibling,$=b.return;if(bc(b),b===x){H=null;break}if(j!==null){j.return=$,H=j;break}H=$}}}var q=s.alternate;if(q!==null){var Y=q.child;if(Y!==null){q.child=null;do{var Ue=Y.sibling;Y.sibling=null,Y=Ue}while(Y!==null)}}H=s}}if((s.subtreeFlags&2064)!==0&&i!==null)i.return=s,H=i;else e:for(;H!==null;){if(s=H,(s.flags&2048)!==0)switch(s.tag){case 0:case 11:case 15:Ur(9,s,s.return)}var g=s.sibling;if(g!==null){g.return=s.return,H=g;break e}H=s.return}}var f=e.current;for(H=f;H!==null;){i=H;var y=i.child;if((i.subtreeFlags&2064)!==0&&y!==null)y.return=i,H=y;else e:for(i=f;H!==null;){if(c=H,(c.flags&2048)!==0)try{switch(c.tag){case 0:case 11:case 15:Ba(9,c)}}catch(J){$e(c,c.return,J)}if(c===i){H=null;break e}var z=c.sibling;if(z!==null){z.return=c.return,H=z;break e}H=c.return}}if(xe=l,cn(),Ot&&typeof Ot.onPostCommitFiberRoot=="function")try{Ot.onPostCommitFiberRoot(ea,e)}catch{}r=!0}return r}finally{be=n,bt.transition=t}}return!1}function Dc(e,t,n){t=nr(n,t),t=rc(e,t,1),e=un(e,t,1),t=st(),e!==null&&(hr(e,1,t),mt(e,t))}function $e(e,t,n){if(e.tag===3)Dc(e,e,n);else for(;t!==null;){if(t.tag===3){Dc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(pn===null||!pn.has(r))){e=nr(n,e),e=ac(t,e,1),t=un(t,e,1),e=st(),t!==null&&(hr(t,1,e),mt(t,e));break}}t=t.return}}function Yu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=st(),e.pingedLanes|=e.suspendedLanes&n,Ye===e&&(Ze&n)===n&&(qe===4||qe===3&&(Ze&130023424)===Ze&&500>Be()-Is?_n(e,0):Rs|=n),mt(e,t)}function $c(e,t){t===0&&((e.mode&1)===0?t=1:(t=na,na<<=1,(na&130023424)===0&&(na=4194304)));var n=st();e=Qt(e,t),e!==null&&(hr(e,t,n),mt(e,n))}function Xu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),$c(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(m(314))}r!==null&&r.delete(t),$c(e,n)}var Bc;Bc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ot.current)dt=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return dt=!1,Du(e,t,n);dt=(e.flags&131072)!==0}else dt=!1,Te&&(t.flags&1048576)!==0&&wo(t,Na,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Da(e,t),e=t.pendingProps;var l=qn(t,et.current);er(t,n),l=us(null,t,r,e,l,n);var s=ms();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ct(r)?(s=!0,ka(t)):s=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,as(t),l.updater=Aa,t.stateNode=l,l._reactInternals=t,ys(t,r,e,n),t=js(null,t,r,!0,s,n)):(t.tag=0,Te&&s&&ql(t),lt(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Da(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=em(r),e=Pt(r,e),l){case 0:t=ks(null,t,r,e,n);break e;case 1:t=pc(null,t,r,e,n);break e;case 11:t=oc(null,t,r,e,n);break e;case 14:t=cc(null,t,r,Pt(r.type,e),n);break e}throw Error(m(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Pt(r,l),ks(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Pt(r,l),pc(e,t,r,l,n);case 3:e:{if(fc(t),e===null)throw Error(m(387));r=t.pendingProps,s=t.memoizedState,l=s.element,Eo(e,t),Pa(t,r,null,n);var i=t.memoizedState;if(r=i.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){l=nr(Error(m(423)),t),t=hc(e,t,r,n,l);break e}else if(r!==l){l=nr(Error(m(424)),t),t=hc(e,t,r,n,l);break e}else for(gt=ln(t.stateNode.containerInfo.firstChild),ht=t,Te=!0,Et=null,n=zo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Xn(),r===l){t=qt(e,t,n);break e}lt(e,t,r,n)}t=t.child}return t;case 5:return To(t),e===null&&Xl(t),r=t.type,l=t.pendingProps,s=e!==null?e.memoizedProps:null,i=l.children,Ul(r,l)?i=null:s!==null&&Ul(r,s)&&(t.flags|=32),mc(e,t),lt(e,t,i,n),t.child;case 6:return e===null&&Xl(t),null;case 13:return gc(e,t,n);case 4:return ls(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Jn(t,null,r,n):lt(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Pt(r,l),oc(e,t,r,l,n);case 7:return lt(e,t,t.pendingProps,n),t.child;case 8:return lt(e,t,t.pendingProps.children,n),t.child;case 12:return lt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,s=t.memoizedProps,i=l.value,ze(za,r._currentValue),r._currentValue=i,s!==null)if(Mt(s.value,i)){if(s.children===l.children&&!ot.current){t=qt(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var c=s.dependencies;if(c!==null){i=s.child;for(var u=c.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Kt(-1,n&-n),u.tag=2;var x=s.updateQueue;if(x!==null){x=x.shared;var b=x.pending;b===null?u.next=u:(u.next=b.next,b.next=u),x.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),ns(s.return,n,t),c.lanes|=n;break}u=u.next}}else if(s.tag===10)i=s.type===t.type?null:s.child;else if(s.tag===18){if(i=s.return,i===null)throw Error(m(341));i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),ns(i,n,t),i=s.sibling}else i=s.child;if(i!==null)i.return=s;else for(i=s;i!==null;){if(i===t){i=null;break}if(s=i.sibling,s!==null){s.return=i.return,i=s;break}i=i.return}s=i}lt(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,er(t,n),l=kt(l),r=r(l),t.flags|=1,lt(e,t,r,n),t.child;case 14:return r=t.type,l=Pt(r,t.pendingProps),l=Pt(r.type,l),cc(e,t,r,l,n);case 15:return dc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Pt(r,l),Da(e,t),t.tag=1,ct(r)?(e=!0,ka(t)):e=!1,er(t,n),tc(t,r,l),ys(t,r,l,n),js(null,t,r,!0,e,n);case 19:return yc(e,t,n);case 22:return uc(e,t,n)}throw Error(m(156,t.tag))};function Uc(e,t){return wi(e,t)}function Zu(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nt(e,t,n,r){return new Zu(e,t,n,r)}function Us(e){return e=e.prototype,!(!e||!e.isReactComponent)}function em(e){if(typeof e=="function")return Us(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ve)return 11;if(e===Ne)return 14}return 2}function vn(e,t){var n=e.alternate;return n===null?(n=Nt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ya(e,t,n,r,l,s){var i=2;if(r=e,typeof e=="function")Us(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case je:return Rn(n.children,l,s,t);case pe:i=8,l|=8;break;case Oe:return e=Nt(12,n,t,l|2),e.elementType=Oe,e.lanes=s,e;case ue:return e=Nt(13,n,t,l),e.elementType=ue,e.lanes=s,e;case Ce:return e=Nt(19,n,t,l),e.elementType=Ce,e.lanes=s,e;case we:return Xa(n,l,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case We:i=10;break e;case K:i=9;break e;case ve:i=11;break e;case Ne:i=14;break e;case Ae:i=16,r=null;break e}throw Error(m(130,e==null?e:typeof e,""))}return t=Nt(i,n,t,l),t.elementType=e,t.type=r,t.lanes=s,t}function Rn(e,t,n,r){return e=Nt(7,e,r,t),e.lanes=n,e}function Xa(e,t,n,r){return e=Nt(22,e,r,t),e.elementType=we,e.lanes=n,e.stateNode={isHidden:!1},e}function Ws(e,t,n){return e=Nt(6,e,null,t),e.lanes=n,e}function Vs(e,t,n){return t=Nt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function tm(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=vl(0),this.expirationTimes=vl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Hs(e,t,n,r,l,s,i,c,u){return e=new tm(e,t,n,c,u),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Nt(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},as(s),e}function nm(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:X,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Wc(e){if(!e)return on;e=e._reactInternals;e:{if(kn(e)!==e||e.tag!==1)throw Error(m(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ct(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(m(171))}if(e.tag===1){var n=e.type;if(ct(n))return vo(e,n,t)}return t}function Vc(e,t,n,r,l,s,i,c,u){return e=Hs(n,r,!0,e,l,s,i,c,u),e.context=Wc(null),n=e.current,r=st(),l=hn(n),s=Kt(r,l),s.callback=t??null,un(n,s,l),e.current.lanes=l,hr(e,l,r),mt(e,r),e}function Ja(e,t,n,r){var l=t.current,s=st(),i=hn(l);return n=Wc(n),t.context===null?t.context=n:t.pendingContext=n,t=Kt(s,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=un(l,t,i),e!==null&&(Rt(e,l,i,s),Ea(e,l,i)),i}function Za(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Hc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Qs(e,t){Hc(e,t),(e=e.alternate)&&Hc(e,t)}function rm(){return null}var Qc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ks(e){this._internalRoot=e}el.prototype.render=Ks.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(m(409));Ja(e,t,null,null)},el.prototype.unmount=Ks.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Pn(function(){Ja(null,e,null,null)}),t[Ut]=null}};function el(e){this._internalRoot=e}el.prototype.unstable_scheduleHydration=function(e){if(e){var t=Mi();e={blockedOn:null,target:e,priority:t};for(var n=0;n<nn.length&&t!==0&&t<nn[n].priority;n++);nn.splice(n,0,e),n===0&&_i(e)}};function qs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function tl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Kc(){}function am(e,t,n,r,l){if(l){if(typeof r=="function"){var s=r;r=function(){var x=Za(i);s.call(x)}}var i=Vc(t,r,e,0,null,!1,!1,"",Kc);return e._reactRootContainer=i,e[Ut]=i.current,Er(e.nodeType===8?e.parentNode:e),Pn(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var c=r;r=function(){var x=Za(u);c.call(x)}}var u=Hs(e,0,!1,null,null,!1,!1,"",Kc);return e._reactRootContainer=u,e[Ut]=u.current,Er(e.nodeType===8?e.parentNode:e),Pn(function(){Ja(t,u,n,r)}),u}function nl(e,t,n,r,l){var s=n._reactRootContainer;if(s){var i=s;if(typeof l=="function"){var c=l;l=function(){var u=Za(i);c.call(u)}}Ja(t,i,e,l)}else i=am(n,t,e,l,r);return Za(i)}Ci=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=fr(t.pendingLanes);n!==0&&(yl(t,n|1),mt(t,Be()),(xe&6)===0&&(lr=Be()+500,cn()))}break;case 13:Pn(function(){var r=Qt(e,1);if(r!==null){var l=st();Rt(r,e,1,l)}}),Qs(e,1)}},xl=function(e){if(e.tag===13){var t=Qt(e,134217728);if(t!==null){var n=st();Rt(t,e,134217728,n)}Qs(e,134217728)}},zi=function(e){if(e.tag===13){var t=hn(e),n=Qt(e,t);if(n!==null){var r=st();Rt(n,e,t,r)}Qs(e,t)}},Mi=function(){return be},Ei=function(e,t){var n=be;try{return be=e,t()}finally{be=n}},ul=function(e,t,n){switch(t){case"input":if(_e(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=xa(r);if(!l)throw Error(m(90));Se(r),_e(r,l)}}}break;case"textarea":Ct(e,n);break;case"select":t=n.value,t!=null&&Ve(e,!!n.multiple,t,!1)}},pi=Ds,fi=Pn;var lm={usingClientEntryPoint:!1,Events:[Tr,Qn,xa,ui,mi,Ds]},Qr={findFiberByHostInstance:jn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},sm={bundleType:Qr.bundleType,version:Qr.version,rendererPackageName:Qr.rendererPackageName,rendererConfig:Qr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:he.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=yi(e),e===null?null:e.stateNode},findFiberByHostInstance:Qr.findFiberByHostInstance||rm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rl.isDisabled&&rl.supportsFiber)try{ea=rl.inject(sm),Ot=rl}catch{}}return pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lm,pt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!qs(t))throw Error(m(200));return nm(e,t,null,n)},pt.createRoot=function(e,t){if(!qs(e))throw Error(m(299));var n=!1,r="",l=Qc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Hs(e,1,!1,null,null,n,!1,r,l),e[Ut]=t.current,Er(e.nodeType===8?e.parentNode:e),new Ks(t)},pt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(m(188)):(e=Object.keys(e).join(","),Error(m(268,e)));return e=yi(t),e=e===null?null:e.stateNode,e},pt.flushSync=function(e){return Pn(e)},pt.hydrate=function(e,t,n){if(!tl(t))throw Error(m(200));return nl(null,e,t,!0,n)},pt.hydrateRoot=function(e,t,n){if(!qs(e))throw Error(m(405));var r=n!=null&&n.hydratedSources||null,l=!1,s="",i=Qc;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Vc(t,null,e,1,n??null,l,!1,s,i),e[Ut]=t.current,Er(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new el(t)},pt.render=function(e,t,n){if(!tl(t))throw Error(m(200));return nl(null,e,t,!1,n)},pt.unmountComponentAtNode=function(e){if(!tl(e))throw Error(m(40));return e._reactRootContainer?(Pn(function(){nl(null,null,e,!1,function(){e._reactRootContainer=null,e[Ut]=null})}),!0):!1},pt.unstable_batchedUpdates=Ds,pt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!tl(n))throw Error(m(200));if(e==null||e._reactInternals===void 0)throw Error(m(38));return nl(e,t,n,!1,r)},pt.version="18.3.1-next-f1338f8080-20240426",pt}var td;function fm(){if(td)return Xs.exports;td=1;function h(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h)}catch(p){console.error(p)}}return h(),Xs.exports=pm(),Xs.exports}var nd;function hm(){if(nd)return al;nd=1;var h=fm();return al.createRoot=h.createRoot,al.hydrateRoot=h.hydrateRoot,al}var gm=hm();const vm=ld(gm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const id=(...h)=>h.filter((p,m,S)=>!!p&&p.trim()!==""&&S.indexOf(p)===m).join(" ").trim();/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ym=h=>h.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xm=h=>h.replace(/^([A-Z])|[\s-_]+(\w)/g,(p,m,S)=>S?S.toUpperCase():m.toLowerCase());/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rd=h=>{const p=xm(h);return p.charAt(0).toUpperCase()+p.slice(1)};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ei={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wm=h=>{for(const p in h)if(p.startsWith("aria-")||p==="role"||p==="title")return!0;return!1},km=U.createContext({}),jm=()=>U.useContext(km),bm=U.forwardRef(({color:h,size:p,strokeWidth:m,absoluteStrokeWidth:S,className:R="",children:P,iconNode:Z,..._},O)=>{const{size:G=24,strokeWidth:W=2,absoluteStrokeWidth:re=!1,color:ee="currentColor",className:ce=""}=jm()??{},V=S??re?Number(m??W)*24/Number(p??G):m??W;return U.createElement("svg",{ref:O,...ei,width:p??G??ei.width,height:p??G??ei.height,stroke:h??ee,strokeWidth:V,className:id("lucide",ce,R),...!P&&!wm(_)&&{"aria-hidden":"true"},..._},[...Z.map(([A,D])=>U.createElement(A,D)),...Array.isArray(P)?P:[P]])});/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=(h,p)=>{const m=U.forwardRef(({className:S,...R},P)=>U.createElement(bm,{ref:P,iconNode:p,className:id(`lucide-${ym(rd(h))}`,`lucide-${h}`,S),...R}));return m.displayName=rd(h),m};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nm=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],ad=ie("activity",Nm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sm=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],In=ie("arrow-right",Sm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cm=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],ir=ie("award",Cm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zm=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],li=ie("bot",zm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mm=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],Gr=ie("brain-circuit",Mm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Em=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Pm=ie("chart-column",Em);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _m=[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]],Tm=ie("chart-no-axes-column",_m);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rm=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Yt=ie("check",Rm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Im=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Lm=ie("chevron-down",Im);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Om=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Am=ie("chevron-up",Om);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fm=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Dm=ie("circle-alert",Fm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],or=ie("circle-check",$m);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bm=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],od=ie("clock",Bm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Um=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],ni=ie("copy",Um);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wm=[["path",{d:"m15 10 5 5-5 5",key:"qqa56n"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]],Vm=ie("corner-down-right",Wm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hm=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],si=ie("cpu",Hm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qm=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],cd=ie("file-text",Qm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Km=[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]],cr=ie("git-branch",Km);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qm=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],Gm=ie("info",qm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ym=[["path",{d:"m2 21 9.6-9.6",key:"9l79m3"}],["path",{d:"m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19",key:"fw8biw"}],["circle",{cx:"15.5",cy:"7.5",r:"5.5",key:"4wxmhb"}]],Xm=ie("key",Ym);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jm=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],qr=ie("layers",Jm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zm=[["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"M3 10a2 2 0 0 0 2 2h3",key:"1npucw"}],["path",{d:"M3 5v12a2 2 0 0 0 2 2h3",key:"x1gjn2"}]],dd=ie("list-tree",Zm);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ep=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],ll=ie("loader-circle",ep);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tp=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],np=ie("message-square",tp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=[["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",key:"1miecu"}]],ap=ie("paperclip",rp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lp=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],sp=ie("pen-line",lp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ip=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],op=ie("plus",ip);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],dp=ie("refresh-cw",cp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],mp=ie("save",up);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pp=[["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"m19 8 3 8a5 5 0 0 1-6 0zV7",key:"zcdpyk"}],["path",{d:"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",key:"1yorad"}],["path",{d:"m5 8 3 8a5 5 0 0 1-6 0zV7",key:"eua70x"}],["path",{d:"M7 21h10",key:"1b0cd5"}]],Xt=ie("scale",pp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],ud=ie("search",fp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],gp=ie("send",hp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vp=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],yp=ie("settings",vp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xp=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],wp=ie("shield-check",xp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kp=[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],jp=ie("sliders-vertical",kp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bp=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],St=ie("sparkles",bp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Np=[["path",{d:"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",key:"2acyp4"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],md=ie("square-check-big",Np);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],Cp=ie("square",Sp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zp=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Mp=ie("target",zp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ep=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Pp=ie("trash-2",Ep);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _p=[["path",{d:"M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2",key:"pwuv1l"}],["path",{d:"M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2",key:"1y54w1"}],["path",{d:"M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3",key:"e30mpu"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3",key:"i0yafy"}]],ri=ie("trophy",_p);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tp=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],Rp=ie("wand-sparkles",Tp);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ip=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ii=ie("x",Ip);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lp=[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]],xn=ie("zap",Lp);function Op({activeView:h,setActiveView:p,onOpenSettings:m}){return a.jsxs("header",{className:"navbar-container",children:[a.jsxs("div",{className:"navbar-inner",children:[a.jsxs("div",{className:"brand-badge",onClick:()=>p("landing"),style:{cursor:"pointer"},children:[a.jsxs("div",{className:"logo-icon-wrap",children:[a.jsx(si,{className:"logo-icon",size:22}),a.jsx("div",{className:"logo-glow"})]}),a.jsxs("div",{className:"brand-text",children:[a.jsx("span",{className:"brand-name",children:"AI HIVE MIND"}),a.jsx("span",{className:"brand-tagline",children:"Multi-LLM Intelligence Layer"})]})]}),a.jsxs("nav",{className:"nav-links",children:[a.jsx("button",{className:`nav-btn ${h==="landing"?"active":""}`,onClick:()=>p("landing"),children:"Overview"}),a.jsxs("button",{className:`nav-btn ${h==="workspace"?"active":""}`,onClick:()=>p("workspace"),children:[a.jsx(St,{size:16}),"AI Workspace"]}),a.jsxs("button",{className:`nav-btn ${h==="benchmark"?"active":""}`,onClick:()=>p("benchmark"),children:[a.jsx(ir,{size:16}),"Benchmark Ranker"]}),a.jsxs("button",{className:`nav-btn ${h==="dashboard"?"active":""}`,onClick:()=>p("dashboard"),children:[a.jsx(Pm,{size:16}),"Telemetry & Stats"]}),a.jsxs("button",{className:`nav-btn ${h==="legal"?"active":""}`,onClick:()=>p("legal"),children:[a.jsx(Xt,{size:16}),"Doc Analyzer"]})]}),a.jsxs("div",{className:"nav-actions",children:[a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:m,title:"Configure API Keys & Model Profiles",children:[a.jsx(yp,{size:16}),a.jsx("span",{children:"Settings"})]}),a.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>p("workspace"),children:[a.jsx(St,{size:15}),a.jsx("span",{children:"Launch Workspace"})]})]})]}),a.jsx("style",{children:`
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
      `})]})}function Ap({onStartWorkspace:h,onSelectSamplePrompt:p}){const[m,S]=U.useState("flow"),R=[{title:"C Prime Number Checker",category:"Coding",prompt:"Write a C program to check whether a number is prime and explain the logic.",icon:"⚡"},{title:"Python Async Architecture",category:"Architecture",prompt:"Design a high-throughput async worker pool in Python with error handling.",icon:"🐍"},{title:"Quantum Key Distribution",category:"Reasoning",prompt:"Explain how BB84 protocol detects quantum eavesdropping step by step.",icon:"🔬"}];return a.jsxs("div",{className:"landing-container",children:[a.jsxs("section",{className:"hero-section",children:[a.jsx("div",{className:"hero-badge",children:a.jsxs("span",{className:"hero-badge-pill",children:[a.jsx(St,{size:13,className:"hero-sparkle"}),"Next-Gen Multi-LLM Orchestration Layer"]})}),a.jsxs("h1",{className:"hero-title",children:["One Question. ",a.jsx("span",{className:"shimmer-text",children:"Multiple Minds."}),a.jsx("br",{}),"One Better Answer."]}),a.jsxs("p",{className:"hero-subtitle",children:["AI Hive Mind analyzes your prompt, refines it with precision, recommends the optimal AI models, generates parallel responses, and evaluates them with a dedicated ",a.jsx("strong",{children:"Critic AI"}),"—putting you in complete control."]}),a.jsxs("div",{className:"hero-cta-group",children:[a.jsxs("button",{className:"btn btn-primary btn-lg",onClick:()=>h(),children:[a.jsx("span",{children:"Start AI Hive Mind"}),a.jsx(In,{size:18})]}),a.jsx("a",{href:"#pipeline-demo",className:"btn btn-secondary btn-lg",children:a.jsx("span",{children:"Explore Architecture"})})]}),a.jsxs("div",{className:"sample-prompts-bar",children:[a.jsx("span",{className:"sample-label",children:"Try primary benchmark:"}),R.map((P,Z)=>a.jsxs("button",{className:"sample-chip",onClick:()=>p(P.prompt),children:[a.jsx("span",{children:P.icon}),a.jsx("span",{children:P.title})]},Z))]})]}),a.jsxs("section",{id:"pipeline-demo",className:"pipeline-visual-section",children:[a.jsxs("div",{className:"section-header",children:[a.jsx("span",{className:"section-tag",children:"Interactive Architecture"}),a.jsx("h2",{className:"section-title",children:"The Multi-LLM Consensus Loop"}),a.jsx("p",{className:"section-desc",children:"How a single raw prompt gets transformed through our multi-agent consensus workflow"})]}),a.jsx("div",{className:"pipeline-graph-card glass-panel",children:a.jsxs("div",{className:"pipeline-nodes",children:[a.jsxs("div",{className:"pipeline-node user-node",children:[a.jsx("div",{className:"node-icon bg-indigo",children:a.jsx(St,{size:20})}),a.jsx("div",{className:"node-title",children:"1. User Prompt"}),a.jsx("div",{className:"node-desc",children:"Raw input entered"})]}),a.jsx("div",{className:"flow-arrow",children:a.jsx(In,{size:16})}),a.jsxs("div",{className:"pipeline-node engine-node",children:[a.jsx("div",{className:"node-icon bg-cyan",children:a.jsx(Gr,{size:20})}),a.jsx("div",{className:"node-title",children:"2. Analysis & Refinement"}),a.jsx("div",{className:"node-desc",children:"Intent %, breakdown & fit scoring"})]}),a.jsx("div",{className:"flow-arrow",children:a.jsx(In,{size:16})}),a.jsxs("div",{className:"pipeline-node fanout-node",children:[a.jsx("div",{className:"fanout-header",children:a.jsx("span",{className:"node-title",children:"3. Parallel Execution"})}),a.jsxs("div",{className:"model-pill-stack",children:[a.jsxs("div",{className:"model-chip",children:[a.jsx("span",{className:"dot",style:{background:"#10a37f"}})," GPT-4o"]}),a.jsxs("div",{className:"model-chip",children:[a.jsx("span",{className:"dot",style:{background:"#d97706"}})," Claude 3.5 Sonnet"]}),a.jsxs("div",{className:"model-chip",children:[a.jsx("span",{className:"dot",style:{background:"#3b82f6"}})," Gemini 2.0"]})]})]}),a.jsx("div",{className:"flow-arrow",children:a.jsx(In,{size:16})}),a.jsxs("div",{className:"pipeline-node critic-node",children:[a.jsx("div",{className:"node-icon bg-purple",children:a.jsx(Xt,{size:20})}),a.jsx("div",{className:"node-title",children:"4. Critic AI"}),a.jsx("div",{className:"node-desc",children:"Multi-criteria scoring & ranking"})]}),a.jsx("div",{className:"flow-arrow",children:a.jsx(In,{size:16})}),a.jsxs("div",{className:"pipeline-node memory-node",children:[a.jsx("div",{className:"node-icon bg-emerald",children:a.jsx(cr,{size:20})}),a.jsx("div",{className:"node-title",children:"5. Active Branch"}),a.jsx("div",{className:"node-desc",children:"Provider-neutral shared memory"})]})]})})]}),a.jsxs("section",{className:"features-section",children:[a.jsxs("div",{className:"section-header",children:[a.jsx("span",{className:"section-tag",children:"Core Capabilities"}),a.jsx("h2",{className:"section-title",children:"Built For Precision & Control"})]}),a.jsxs("div",{className:"feature-grid",children:[a.jsxs("div",{className:"feature-card glass-card",children:[a.jsx("div",{className:"feature-icon-wrap",style:{color:"#818cf8",background:"rgba(99, 102, 241, 0.12)"},children:a.jsx(St,{size:24})}),a.jsx("h3",{className:"feature-card-title",children:"Prompt Refinement & Breakdown"}),a.jsx("p",{className:"feature-card-text",children:"Automatically diagnoses prompt ambiguity, identifies task categories, extracts boundary constraints, and constructs a refined version without altering your true intent."})]}),a.jsxs("div",{className:"feature-card glass-card",children:[a.jsx("div",{className:"feature-icon-wrap",style:{color:"#06b6d4",background:"rgba(6, 182, 212, 0.12)"},children:a.jsx(li,{size:24})}),a.jsx("h3",{className:"feature-card-title",children:"Smart Model Recommendation"}),a.jsx("p",{className:"feature-card-text",children:"Dynamic matching engine pairs your prompt intent with configurable model capability profiles, providing transparent recommendation scores with explainable rationale."})]}),a.jsxs("div",{className:"feature-card glass-card",children:[a.jsx("div",{className:"feature-icon-wrap",style:{color:"#f59e0b",background:"rgba(245, 158, 11, 0.12)"},children:a.jsx(qr,{size:24})}),a.jsx("h3",{className:"feature-card-title",children:"Multi-Model Arena Comparison"}),a.jsx("p",{className:"feature-card-text",children:"Dispatch requests to multiple LLMs simultaneously (OpenAI, Claude, Gemini, Groq, Ollama) and view streaming answers in side-by-side comparison columns."})]}),a.jsxs("div",{className:"feature-card glass-card",children:[a.jsx("div",{className:"feature-icon-wrap",style:{color:"#a855f7",background:"rgba(168, 85, 247, 0.12)"},children:a.jsx(Xt,{size:24})}),a.jsx("h3",{className:"feature-card-title",children:"Critic AI Evaluation"}),a.jsx("p",{className:"feature-card-text",children:"An impartial evaluator grades generated responses across Correctness (35%), Relevance (20%), Completeness (20%), Clarity (15%), and Instruction Adherence (10%)."})]}),a.jsxs("div",{className:"feature-card glass-card",children:[a.jsx("div",{className:"feature-icon-wrap",style:{color:"#10b981",background:"rgba(16, 185, 129, 0.12)"},children:a.jsx(cr,{size:24})}),a.jsx("h3",{className:"feature-card-title",children:"Provider-Neutral Shared Memory"}),a.jsx("p",{className:"feature-card-text",children:"You choose which answer becomes the active conversation branch. Easily switch between AI models mid-conversation while preserving full conversational context."})]}),a.jsxs("div",{className:"feature-card glass-card",children:[a.jsx("div",{className:"feature-icon-wrap",style:{color:"#f43f5e",background:"rgba(244, 63, 94, 0.12)"},children:a.jsx(xn,{size:24})}),a.jsx("h3",{className:"feature-card-title",children:"Consensus Synthesis Engine"}),a.jsx("p",{className:"feature-card-text",children:'Merge the highest scoring algorithmic logic, clarity, and syntax from multiple candidate models into a single, unified "Best Combined Answer".'})]})]})]}),a.jsx("section",{className:"cta-banner-section",children:a.jsxs("div",{className:"cta-banner glass-panel",children:[a.jsxs("div",{className:"cta-content",children:[a.jsx("h2",{children:"Ready to experience the power of the Hive Mind?"}),a.jsx("p",{children:"Start a session, test prompt refinement, and see multi-model comparison in real-time."})]}),a.jsxs("button",{className:"btn btn-primary btn-lg",onClick:()=>h(),children:[a.jsx("span",{children:"Launch Workspace"}),a.jsx(In,{size:18})]})]})}),a.jsx("style",{children:`
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
      `})]})}const Re="/api";async function Ie(h){if(!h.ok){const p=await h.json().catch(()=>({}));throw new Error(p.error||`HTTP error ${h.status}: ${h.statusText}`)}return h.json()}const Le={async getModels(){const h=await fetch(`${Re}/models`);return Ie(h)},async updateModelSettings(h,p){const m=await fetch(`${Re}/models/update`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({models:h,weights:p})});return Ie(m)},async testModelConnection(h){const p=await fetch(`${Re}/models/test`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({modelId:h})});return Ie(p)},async getKeyStatus(){const h=await fetch(`${Re}/settings/keys/status`);return Ie(h)},async updateKeys(h){const p=await fetch(`${Re}/settings/keys`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)});return Ie(p)},async analyzePrompt(h){const p=await fetch(`${Re}/analyze-prompt`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h})});return Ie(p)},async refinePrompt(h,p){const m=await fetch(`${Re}/refine-prompt`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h,analysis:p})});return Ie(m)},async recommendModels(h,p){const m=await fetch(`${Re}/recommend-models`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h,analysis:p})});return Ie(m)},async preflightPrompt(h){const p=await fetch(`${Re}/preflight-prompt`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h})});return Ie(p)},async rankModelsByBenchmark(h){const p=await fetch(`${Re}/benchmark-ranker`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h})});return Ie(p)},async getBenchmarkCategories(){const h=await fetch(`${Re}/benchmark-categories`);return Ie(h)},async generateResponses({prompt:h,modelIds:p,conversationId:m,documentContext:S}){const R=await fetch(`${Re}/generate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:h,modelIds:p,conversationId:m,documentContext:S})});return Ie(R)},async criticEvaluate({originalPrompt:h,refinedPrompt:p,responses:m,weights:S}){const R=await fetch(`${Re}/critic-evaluate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({originalPrompt:h,refinedPrompt:p,responses:m,weights:S})});return Ie(R)},async synthesize({originalPrompt:h,refinedPrompt:p,responses:m,criticEvaluation:S}){const R=await fetch(`${Re}/synthesize`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({originalPrompt:h,refinedPrompt:p,responses:m,criticEvaluation:S})});return Ie(R)},async uploadDocument(h){const p=new FormData;p.append("file",h);const m=await fetch(`${Re}/upload`,{method:"POST",body:p});return Ie(m)},async getConversations(){const h=await fetch(`${Re}/conversations`);return Ie(h)},async createConversation(h){const p=await fetch(`${Re}/conversations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:h})});return Ie(p)},async getConversation(h){const p=await fetch(`${Re}/conversations/${h}`);return Ie(p)},async saveTurn(h,p){const m=await fetch(`${Re}/conversations/${h}/turn`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});return Ie(m)},async selectBranch(h,p,m){const S=await fetch(`${Re}/conversations/${h}/branch`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({turnId:p,selectedModelId:m})});return Ie(S)},async saveSynthesis(h,p,m){const S=await fetch(`${Re}/conversations/${h}/synthesis`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({turnId:p,synthesis:m})});return Ie(S)},async updateConversationTitle(h,p){const m=await fetch(`${Re}/conversations/${h}/title`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:p})});return Ie(m)},async deleteConversation(h){const p=await fetch(`${Re}/conversations/${h}`,{method:"DELETE"});return Ie(p)},async getStats(){const h=await fetch(`${Re}/stats`);return Ie(h)}};function Fp({currentStage:h,onStageClick:p}){const m=[{id:"prompt",label:"Prompt",icon:St},{id:"analyze",label:"Analyze",icon:ud},{id:"refine",label:"Refine",icon:Rp},{id:"breakdown",label:"Breakdown",icon:dd},{id:"recommend",label:"Recommend",icon:li},{id:"select_model",label:"Select",icon:md},{id:"generate",label:"Generate",icon:xn},{id:"compare",label:"Compare",icon:qr},{id:"critic",label:"Critic AI",icon:Xt},{id:"branch",label:"Active Branch",icon:cr}],R=m.map(P=>P.id).indexOf(h);return a.jsxs("div",{className:"pipeline-wrapper glass-panel",children:[a.jsx("div",{className:"pipeline-inner",children:m.map((P,Z)=>{const _=P.icon;let O="waiting";return Z<R?O="completed":Z===R&&(O="active"),a.jsxs(sd.Fragment,{children:[a.jsxs("div",{className:`stage-item ${O}`,onClick:()=>p&&p(P.id),title:`Stage: ${P.label} (${O})`,children:[a.jsx("div",{className:"stage-icon-wrap",children:O==="active"?a.jsx(ll,{size:14,className:"animate-spin active-spinner"}):O==="completed"?a.jsx(or,{size:14,className:"completed-check"}):a.jsx(_,{size:14})}),a.jsx("span",{className:"stage-label",children:P.label})]}),Z<m.length-1&&a.jsx("div",{className:`stage-connector ${Z<R?"completed":""}`})]},P.id)})}),a.jsx("style",{children:`
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
      `})]})}function Dp({analysis:h,refinement:p,recommendations:m,onUseRefined:S,onUseOriginal:R,onSelectRecommendedModels:P,onClose:Z}){var X,je,pe,Oe,We,K,ve,ue,Ce,Ne,Ae,we;const[_,O]=U.useState("refinement"),[G,W]=U.useState(!1),[re,ee]=U.useState(!1),[ce,V]=U.useState((p==null?void 0:p.refinedPrompt)||""),[A,D]=U.useState(null),[Q,oe]=U.useState(!1);U.useEffect(()=>{const k=(p==null?void 0:p.originalPrompt)||(p==null?void 0:p.refinedPrompt);k&&de(k)},[p==null?void 0:p.originalPrompt,p==null?void 0:p.refinedPrompt]);const de=async k=>{oe(!0);try{const I=await Le.rankModelsByBenchmark(k);D(I)}catch(I){console.error("Failed to load benchmark ranker data:",I)}finally{oe(!1)}},he=k=>{navigator.clipboard.writeText(k),W(!0),setTimeout(()=>W(!1),2e3)},M=()=>{S(ce),ee(!1)};return a.jsxs("div",{className:"analysis-panel glass-panel",children:[a.jsxs("div",{className:"panel-header",children:[a.jsxs("div",{className:"panel-title-wrap",children:[a.jsx(Gr,{size:18,className:"text-cyan"}),a.jsx("h3",{children:"Prompt Intelligence & Strategy"})]}),Z&&a.jsx("button",{className:"btn-icon",onClick:Z,children:a.jsx(ii,{size:16})})]}),a.jsxs("div",{className:"panel-tabs",children:[a.jsxs("button",{className:`panel-tab ${_==="refinement"?"active":""}`,onClick:()=>O("refinement"),children:[a.jsx(St,{size:14}),a.jsx("span",{children:"Refinement"})]}),a.jsxs("button",{className:`panel-tab ${_==="breakdown"?"active":""}`,onClick:()=>O("breakdown"),children:[a.jsx(dd,{size:14}),a.jsx("span",{children:"Breakdown"})]}),a.jsxs("button",{className:`panel-tab ${_==="recommendation"?"active":""}`,onClick:()=>O("recommendation"),children:[a.jsx(li,{size:14}),a.jsx("span",{children:"Models"})]}),a.jsxs("button",{className:`panel-tab ${_==="benchmark"?"active":""}`,onClick:()=>O("benchmark"),children:[a.jsx(ir,{size:14}),a.jsx("span",{children:"Benchmarks"})]})]}),(h==null?void 0:h.intentDistribution)&&a.jsxs("div",{className:"intent-bar-section",children:[a.jsxs("div",{className:"intent-header",children:[a.jsx("span",{className:"intent-title",children:"Intent Distribution (AI-Estimated)"}),a.jsx("span",{className:"intent-badge badge badge-indigo",children:h.primaryCategory})]}),a.jsx("div",{className:"intent-meter",children:h.intentDistribution.map((k,I)=>a.jsx("div",{className:"meter-segment",style:{width:`${k.percentage}%`,background:I===0?"#6366f1":I===1?"#06b6d4":I===2?"#10b981":"#a855f7"},title:`${k.category}: ${k.percentage}%`},I))}),a.jsx("div",{className:"intent-legend",children:h.intentDistribution.map((k,I)=>a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-dot",style:{background:I===0?"#6366f1":I===1?"#06b6d4":I===2?"#10b981":"#a855f7"}}),a.jsxs("span",{children:[k.category,": ",a.jsxs("strong",{children:[k.percentage,"%"]})]})]},I))})]}),_==="refinement"&&a.jsx("div",{className:"tab-body",children:a.jsxs("div",{className:"card-box glass-card",children:[a.jsxs("div",{className:"card-box-header",children:[a.jsxs("div",{className:"card-label",children:[a.jsx(St,{size:14,className:"text-cyan"}),a.jsx("span",{children:"Refined & Augmented Prompt"})]}),a.jsxs("div",{className:"card-actions",children:[a.jsx("button",{className:"btn-icon",onClick:()=>he((p==null?void 0:p.refinedPrompt)||""),title:"Copy",children:G?a.jsx(Yt,{size:14,className:"text-emerald"}):a.jsx(ni,{size:14})}),a.jsx("button",{className:"btn-icon",onClick:()=>{ee(!re),V((p==null?void 0:p.refinedPrompt)||"")},title:"Edit",children:a.jsx(sp,{size:14})})]})]}),re?a.jsxs("div",{className:"edit-wrap",children:[a.jsx("textarea",{className:"edit-textarea",value:ce,onChange:k=>V(k.target.value),rows:6}),a.jsxs("div",{className:"edit-btn-row",children:[a.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>ee(!1),children:"Cancel"}),a.jsx("button",{className:"btn btn-primary btn-sm",onClick:M,children:"Save & Apply"})]})]}):a.jsx("div",{className:"prompt-text-display",children:a.jsx("pre",{children:(p==null?void 0:p.refinedPrompt)||"Enter a prompt to see automated refinement..."})}),(p==null?void 0:p.improvements)&&p.improvements.length>0&&a.jsxs("div",{className:"improvements-list",children:[a.jsx("span",{className:"imp-title",children:"✨ Enhancements Applied:"}),a.jsx("ul",{children:p.improvements.map((k,I)=>a.jsxs("li",{children:[a.jsx(or,{size:13,className:"text-emerald"}),a.jsx("span",{children:k})]},I))})]}),a.jsxs("div",{className:"refinement-action-row",children:[a.jsxs("button",{className:"btn btn-cyan btn-sm flex-1",onClick:()=>S(p==null?void 0:p.refinedPrompt),children:[a.jsx(Yt,{size:14}),a.jsx("span",{children:"Use Refined Prompt"})]}),a.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>R(p==null?void 0:p.originalPrompt),children:a.jsx("span",{children:"Use Original"})})]})]})}),_==="breakdown"&&a.jsx("div",{className:"tab-body",children:a.jsxs("div",{className:"breakdown-grid",children:[a.jsxs("div",{className:"breakdown-item glass-card",children:[a.jsx("span",{className:"bd-label",children:"Goal & Purpose"}),a.jsx("span",{className:"bd-value",children:((X=p==null?void 0:p.breakdown)==null?void 0:X.goal)||"N/A"})]}),a.jsxs("div",{className:"breakdown-item glass-card",children:[a.jsx("span",{className:"bd-label",children:"Task Type"}),a.jsx("span",{className:"bd-value",children:((je=p==null?void 0:p.breakdown)==null?void 0:je.taskType)||"N/A"})]}),a.jsxs("div",{className:"breakdown-item glass-card",children:[a.jsx("span",{className:"bd-label",children:"Required Output Format"}),a.jsx("span",{className:"bd-value",children:((pe=p==null?void 0:p.breakdown)==null?void 0:pe.requiredOutput)||"N/A"})]}),a.jsxs("div",{className:"breakdown-item glass-card",children:[a.jsx("span",{className:"bd-label",children:"Detected Tech / Language"}),a.jsx("span",{className:"bd-value",children:((We=(Oe=p==null?void 0:p.breakdown)==null?void 0:Oe.technologies)==null?void 0:We.join(", "))||"None specified"})]}),a.jsxs("div",{className:"breakdown-item glass-card",children:[a.jsx("span",{className:"bd-label",children:"Expected Complexity"}),a.jsx("span",{className:"bd-value",children:((K=p==null?void 0:p.breakdown)==null?void 0:K.expectedComplexity)||"Standard"})]}),a.jsxs("div",{className:"breakdown-item glass-card",children:[a.jsx("span",{className:"bd-label",children:"Ambiguity / Assumptions"}),a.jsx("span",{className:"bd-value",children:((ue=(ve=p==null?void 0:p.breakdown)==null?void 0:ve.assumptions)==null?void 0:ue.join("; "))||"No ambiguity flagged"})]})]})}),_==="recommendation"&&a.jsx("div",{className:"tab-body",children:m!=null&&m.topRecommendation?a.jsxs("div",{className:"rec-wrap",children:[a.jsxs("div",{className:"top-rec-card glass-card",children:[a.jsxs("div",{className:"rec-badge-row",children:[a.jsxs("span",{className:"badge badge-emerald",children:[a.jsx(St,{size:12})," Top Recommendation (",m.topRecommendation.score,"%)"]}),a.jsx("span",{className:"rec-provider",children:m.topRecommendation.provider})]}),a.jsx("h4",{className:"rec-model-name",children:m.topRecommendation.modelName}),a.jsx("p",{className:"rec-reason",children:m.topRecommendation.reason}),a.jsxs("div",{className:"rec-actions",children:[a.jsx("button",{className:"btn btn-primary btn-sm flex-1",onClick:()=>P([m.topRecommendation.modelId]),children:a.jsxs("span",{children:["Select ",m.topRecommendation.modelName]})}),m.suggestedComparisonPair&&m.suggestedComparisonPair.length>1&&a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>P(m.suggestedComparisonPair),title:"Select top 2 models for multi-model comparison",children:[a.jsx(qr,{size:14}),a.jsx("span",{children:"Compare Top 2"})]})]})]}),a.jsxs("div",{className:"all-models-list",children:[a.jsx("span",{className:"list-title",children:"Model Suitability Rankings"}),(Ce=m.models)==null?void 0:Ce.map(k=>a.jsxs("div",{className:"model-score-row glass-card",children:[a.jsxs("div",{className:"model-left",children:[a.jsx("span",{className:"model-avatar",children:k.avatar}),a.jsxs("div",{children:[a.jsx("div",{className:"model-name-text",children:k.name}),a.jsx("div",{className:"model-rationale-text",children:k.recommendationRationale})]})]}),a.jsxs("div",{className:"model-right",children:[a.jsxs("span",{className:"score-num",children:[k.recommendationScore,"%"]}),a.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>P([k.id]),children:"Select"})]})]},k.id))]})]}):a.jsx("div",{className:"empty-state-text",children:"Enter a prompt to calculate dynamic model capability scores."})}),_==="benchmark"&&a.jsx("div",{className:"tab-body",children:Q?a.jsxs("div",{className:"empty-state-text",children:[a.jsx("div",{className:"spinner-sm",style:{margin:"0 auto 0.5rem auto"}}),"Classifying prompt and retrieving verified benchmark leaderboards..."]}):A?a.jsxs("div",{className:"rec-wrap",children:[a.jsxs("div",{className:"top-rec-card glass-card",style:{borderColor:"rgba(6, 182, 212, 0.4)"},children:[a.jsxs("div",{className:"rec-badge-row",children:[a.jsxs("span",{className:"badge badge-indigo",children:[A.categoryIcon," ",A.categoryName]}),a.jsxs("span",{className:"badge badge-emerald",children:[(Ne=A.classification)==null?void 0:Ne.confidence,"% Conf."]})]}),a.jsx("p",{className:"rec-reason",style:{marginTop:"0.4rem",fontSize:"0.75rem"},children:A.categoryDescription}),a.jsxs("div",{style:{marginTop:"0.6rem",padding:"0.5rem",background:"rgba(0,0,0,0.3)",borderRadius:"6px",fontSize:"0.72rem"},children:[a.jsx("div",{style:{fontWeight:700,color:"var(--text-muted)",marginBottom:"0.25rem",textTransform:"uppercase",letterSpacing:"0.03em"},children:"Active Benchmark Suite:"}),(Ae=A.primaryBenchmarks)==null?void 0:Ae.map((k,I)=>a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",color:"var(--text-secondary)",padding:"0.1rem 0"},children:[a.jsx("span",{children:k.name}),a.jsxs("strong",{style:{color:"var(--accent-cyan)"},children:[Math.round(k.weight*100),"%"]})]},I))]})]}),A.topRankedModel&&a.jsxs("div",{className:"top-rec-card glass-card",style:{borderColor:"rgba(245, 158, 11, 0.5)",background:"rgba(245, 158, 11, 0.05)"},children:[a.jsxs("div",{className:"rec-badge-row",children:[a.jsxs("span",{className:"badge badge-emerald",style:{background:"#f59e0b",color:"#000",fontWeight:800},children:[a.jsx(ri,{size:12})," #1 BENCHMARK WINNER"]}),a.jsx("span",{className:"rec-provider",children:A.topRankedModel.provider})]}),a.jsx("h4",{className:"rec-model-name",children:A.topRankedModel.name}),a.jsxs("div",{style:{fontSize:"1.2rem",fontWeight:900,color:"#fbbf24",margin:"0.2rem 0"},children:[A.topRankedModel.compositeScore,a.jsx("span",{style:{fontSize:"0.75rem",color:"var(--text-muted)"},children:"/100 Composite"})]}),a.jsx("p",{className:"rec-reason",children:A.topRankedModel.keyStrength}),a.jsxs("div",{className:"rec-actions",children:[a.jsxs("button",{className:"btn btn-primary btn-sm flex-1",onClick:()=>P([A.topRankedModel.modelId]),children:[a.jsx(xn,{size:13}),a.jsx("span",{children:"Select #1 Model"})]}),A.runnerUpModel&&a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>P([A.topRankedModel.modelId,A.runnerUpModel.modelId]),title:"Compare Top 2 Benchmark Performers",children:[a.jsx(qr,{size:13}),a.jsx("span",{children:"Compare Top 2"})]})]})]}),a.jsxs("div",{className:"all-models-list",children:[a.jsx("span",{className:"list-title",children:"Category Benchmark Leaderboard"}),(we=A.rankedModels)==null?void 0:we.map(k=>{var I,d,o,v,C,E;return a.jsxs("div",{className:"model-score-row glass-card",style:k.rank===1?{borderColor:"rgba(245, 158, 11, 0.4)"}:{},children:[a.jsxs("div",{className:"model-left",children:[a.jsx("span",{className:"model-avatar",style:{fontSize:"0.9rem",fontWeight:800},children:k.rank===1?"🥇":k.rank===2?"🥈":`#${k.rank}`}),a.jsxs("div",{children:[a.jsxs("div",{className:"model-name-text",children:[k.name," ",a.jsxs("span",{style:{fontSize:"0.7rem",color:"var(--text-muted)"},children:["(",k.provider,")"]})]}),a.jsxs("div",{className:"model-rationale-text",style:{fontSize:"0.7rem"},children:[(d=(I=k.benchmarkMetrics)==null?void 0:I[0])==null?void 0:d.name.split(" ")[0],": ",a.jsxs("strong",{children:[(v=(o=k.benchmarkMetrics)==null?void 0:o[0])==null?void 0:v.value,(E=(C=k.benchmarkMetrics)==null?void 0:C[0])==null?void 0:E.unit]})," | LMSYS: ",a.jsx("strong",{children:k.arenaElo})]})]})]}),a.jsxs("div",{className:"model-right",children:[a.jsx("span",{className:"score-num",style:k.rank===1?{color:"#fbbf24"}:{},children:k.compositeScore}),a.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>P([k.modelId]),children:"Select"})]})]},k.modelId)})]})]}):a.jsx("div",{className:"empty-state-text",children:"Enter a prompt to calculate verifiable benchmark leaderboards."})}),a.jsx("style",{children:`
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
      `})]})}var oi={};(function h(p,m,S,R){var P=!!(p.Worker&&p.Blob&&p.Promise&&p.OffscreenCanvas&&p.OffscreenCanvasRenderingContext2D&&p.HTMLCanvasElement&&p.HTMLCanvasElement.prototype.transferControlToOffscreen&&p.URL&&p.URL.createObjectURL),Z=typeof Path2D=="function"&&typeof DOMMatrix=="function",_=(function(){if(!p.OffscreenCanvas)return!1;try{var d=new OffscreenCanvas(1,1),o=d.getContext("2d");o.fillRect(0,0,1,1);var v=d.transferToImageBitmap();o.createPattern(v,"no-repeat")}catch{return!1}return!0})();function O(){}function G(d){var o=m.exports.Promise,v=o!==void 0?o:p.Promise;return typeof v=="function"?new v(d):(d(O,O),null)}var W=(function(d,o){return{transform:function(v){if(d)return v;if(o.has(v))return o.get(v);var C=new OffscreenCanvas(v.width,v.height),E=C.getContext("2d");return E.drawImage(v,0,0),o.set(v,C),C},clear:function(){o.clear()}}})(_,new Map),re=(function(){var d=Math.floor(16.666666666666668),o,v,C={},E=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(o=function(L){var F=Math.random();return C[F]=requestAnimationFrame(function T(B){E===B||E+d-1<B?(E=B,delete C[F],L()):C[F]=requestAnimationFrame(T)}),F},v=function(L){C[L]&&cancelAnimationFrame(C[L])}):(o=function(L){return setTimeout(L,d)},v=function(L){return clearTimeout(L)}),{frame:o,cancel:v}})(),ee=(function(){var d,o,v={};function C(E){function L(F,T){E.postMessage({options:F||{},callback:T})}E.init=function(T){var B=T.transferControlToOffscreen();E.postMessage({canvas:B},[B])},E.fire=function(T,B,ne){if(o)return L(T,null),o;var me=Math.random().toString(36).slice(2);return o=G(function(ye){function Se(Me){Me.data.callback===me&&(delete v[me],E.removeEventListener("message",Se),o=null,W.clear(),ne(),ye())}E.addEventListener("message",Se),L(T,me),v[me]=Se.bind(null,{data:{callback:me}})}),o},E.reset=function(){E.postMessage({reset:!0});for(var T in v)v[T](),delete v[T]}}return function(){if(d)return d;if(!S&&P){var E=["var CONFETTI, SIZE = {}, module = {};","("+h.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{d=new Worker(URL.createObjectURL(new Blob([E])))}catch(L){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",L),null}C(d)}return d}})(),ce={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function V(d,o){return o?o(d):d}function A(d){return d!=null}function D(d,o,v){return V(d&&A(d[o])?d[o]:ce[o],v)}function Q(d){return d<0?0:Math.floor(d)}function oe(d,o){return Math.floor(Math.random()*(o-d))+d}function de(d){return parseInt(d,16)}function he(d){return d.map(M)}function M(d){var o=String(d).replace(/[^0-9a-f]/gi,"");return o.length<6&&(o=o[0]+o[0]+o[1]+o[1]+o[2]+o[2]),{r:de(o.substring(0,2)),g:de(o.substring(2,4)),b:de(o.substring(4,6))}}function X(d){var o=D(d,"origin",Object);return o.x=D(o,"x",Number),o.y=D(o,"y",Number),o}function je(d){d.width=document.documentElement.clientWidth,d.height=document.documentElement.clientHeight}function pe(d){var o=d.getBoundingClientRect();d.width=o.width,d.height=o.height}function Oe(d){var o=document.createElement("canvas");return o.style.position="fixed",o.style.top="0px",o.style.left="0px",o.style.pointerEvents="none",o.style.zIndex=d,o}function We(d,o,v,C,E,L,F,T,B){d.save(),d.translate(o,v),d.rotate(L),d.scale(C,E),d.arc(0,0,1,F,T,B),d.restore()}function K(d){var o=d.angle*(Math.PI/180),v=d.spread*(Math.PI/180);return{x:d.x,y:d.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:d.startVelocity*.5+Math.random()*d.startVelocity,angle2D:-o+(.5*v-Math.random()*v),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:d.color,shape:d.shape,tick:0,totalTicks:d.ticks,decay:d.decay,drift:d.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:d.gravity*3,ovalScalar:.6,scalar:d.scalar,flat:d.flat}}function ve(d,o){o.x+=Math.cos(o.angle2D)*o.velocity+o.drift,o.y+=Math.sin(o.angle2D)*o.velocity+o.gravity,o.velocity*=o.decay,o.flat?(o.wobble=0,o.wobbleX=o.x+10*o.scalar,o.wobbleY=o.y+10*o.scalar,o.tiltSin=0,o.tiltCos=0,o.random=1):(o.wobble+=o.wobbleSpeed,o.wobbleX=o.x+10*o.scalar*Math.cos(o.wobble),o.wobbleY=o.y+10*o.scalar*Math.sin(o.wobble),o.tiltAngle+=.1,o.tiltSin=Math.sin(o.tiltAngle),o.tiltCos=Math.cos(o.tiltAngle),o.random=Math.random()+2);var v=o.tick++/o.totalTicks,C=o.x+o.random*o.tiltCos,E=o.y+o.random*o.tiltSin,L=o.wobbleX+o.random*o.tiltCos,F=o.wobbleY+o.random*o.tiltSin;if(d.fillStyle="rgba("+o.color.r+", "+o.color.g+", "+o.color.b+", "+(1-v)+")",d.beginPath(),Z&&o.shape.type==="path"&&typeof o.shape.path=="string"&&Array.isArray(o.shape.matrix))d.fill(we(o.shape.path,o.shape.matrix,o.x,o.y,Math.abs(L-C)*.1,Math.abs(F-E)*.1,Math.PI/10*o.wobble));else if(o.shape.type==="bitmap"){var T=Math.PI/10*o.wobble,B=Math.abs(L-C)*.1,ne=Math.abs(F-E)*.1,me=o.shape.bitmap.width*o.scalar,ye=o.shape.bitmap.height*o.scalar,Se=new DOMMatrix([Math.cos(T)*B,Math.sin(T)*B,-Math.sin(T)*ne,Math.cos(T)*ne,o.x,o.y]);Se.multiplySelf(new DOMMatrix(o.shape.matrix));var Me=d.createPattern(W.transform(o.shape.bitmap),"no-repeat");Me.setTransform(Se),d.globalAlpha=1-v,d.fillStyle=Me,d.fillRect(o.x-me/2,o.y-ye/2,me,ye),d.globalAlpha=1}else if(o.shape==="circle")d.ellipse?d.ellipse(o.x,o.y,Math.abs(L-C)*o.ovalScalar,Math.abs(F-E)*o.ovalScalar,Math.PI/10*o.wobble,0,2*Math.PI):We(d,o.x,o.y,Math.abs(L-C)*o.ovalScalar,Math.abs(F-E)*o.ovalScalar,Math.PI/10*o.wobble,0,2*Math.PI);else if(o.shape==="star")for(var w=Math.PI/2*3,te=4*o.scalar,ge=8*o.scalar,_e=o.x,at=o.y,it=5,Qe=Math.PI/it;it--;)_e=o.x+Math.cos(w)*ge,at=o.y+Math.sin(w)*ge,d.lineTo(_e,at),w+=Qe,_e=o.x+Math.cos(w)*te,at=o.y+Math.sin(w)*te,d.lineTo(_e,at),w+=Qe;else d.moveTo(Math.floor(o.x),Math.floor(o.y)),d.lineTo(Math.floor(o.wobbleX),Math.floor(E)),d.lineTo(Math.floor(L),Math.floor(F)),d.lineTo(Math.floor(C),Math.floor(o.wobbleY));return d.closePath(),d.fill(),o.tick<o.totalTicks}function ue(d,o,v,C,E){var L=o.slice(),F=d.getContext("2d"),T,B,ne=G(function(me){function ye(){T=B=null,F.clearRect(0,0,C.width,C.height),W.clear(),E(),me()}function Se(){S&&!(C.width===R.width&&C.height===R.height)&&(C.width=d.width=R.width,C.height=d.height=R.height),!C.width&&!C.height&&(v(d),C.width=d.width,C.height=d.height),F.clearRect(0,0,C.width,C.height),L=L.filter(function(Me){return ve(F,Me)}),L.length?T=re.frame(Se):ye()}T=re.frame(Se),B=ye});return{addFettis:function(me){return L=L.concat(me),ne},canvas:d,promise:ne,reset:function(){T&&re.cancel(T),B&&B()}}}function Ce(d,o){var v=!d,C=!!D(o||{},"resize"),E=!1,L=D(o,"disableForReducedMotion",Boolean),F=P&&!!D(o||{},"useWorker"),T=F?ee():null,B=v?je:pe,ne=d&&T?!!d.__confetti_initialized:!1,me=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,ye;function Se(w,te,ge){for(var _e=D(w,"particleCount",Q),at=D(w,"angle",Number),it=D(w,"spread",Number),Qe=D(w,"startVelocity",Number),Ve=D(w,"decay",Number),yt=D(w,"gravity",Number),Ln=D(w,"drift",Number),Ct=D(w,"colors",he),It=D(w,"ticks",Number),wn=D(w,"shapes"),On=D(w,"scalar"),Lt=!!D(w,"flat"),dr=X(w),Jt=_e,Bt=[],sl=d.width*dr.x,Yr=d.height*dr.y;Jt--;)Bt.push(K({x:sl,y:Yr,angle:at,spread:it,startVelocity:Qe,color:Ct[Jt%Ct.length],shape:wn[oe(0,wn.length)],ticks:It,decay:Ve,gravity:yt,drift:Ln,scalar:On,flat:Lt}));return ye?ye.addFettis(Bt):(ye=ue(d,Bt,B,te,ge),ye.promise)}function Me(w){var te=L||D(w,"disableForReducedMotion",Boolean),ge=D(w,"zIndex",Number);if(te&&me)return G(function(Qe){Qe()});v&&ye?d=ye.canvas:v&&!d&&(d=Oe(ge),document.body.appendChild(d)),C&&!ne&&B(d);var _e={width:d.width,height:d.height};T&&!ne&&T.init(d),ne=!0,T&&(d.__confetti_initialized=!0);function at(){if(T){var Qe={getBoundingClientRect:function(){if(!v)return d.getBoundingClientRect()}};B(Qe),T.postMessage({resize:{width:Qe.width,height:Qe.height}});return}_e.width=_e.height=null}function it(){ye=null,C&&(E=!1,p.removeEventListener("resize",at)),v&&d&&(document.body.contains(d)&&document.body.removeChild(d),d=null,ne=!1)}return C&&!E&&(E=!0,p.addEventListener("resize",at,!1)),T?T.fire(w,_e,it):Se(w,_e,it)}return Me.reset=function(){T&&T.reset(),ye&&ye.reset()},Me}var Ne;function Ae(){return Ne||(Ne=Ce(null,{useWorker:!0,resize:!0})),Ne}function we(d,o,v,C,E,L,F){var T=new Path2D(d),B=new Path2D;B.addPath(T,new DOMMatrix(o));var ne=new Path2D;return ne.addPath(B,new DOMMatrix([Math.cos(F)*E,Math.sin(F)*E,-Math.sin(F)*L,Math.cos(F)*L,v,C])),ne}function k(d){if(!Z)throw new Error("path confetti are not supported in this browser");var o,v;typeof d=="string"?o=d:(o=d.path,v=d.matrix);var C=new Path2D(o),E=document.createElement("canvas"),L=E.getContext("2d");if(!v){for(var F=1e3,T=F,B=F,ne=0,me=0,ye,Se,Me=0;Me<F;Me+=2)for(var w=0;w<F;w+=2)L.isPointInPath(C,Me,w,"nonzero")&&(T=Math.min(T,Me),B=Math.min(B,w),ne=Math.max(ne,Me),me=Math.max(me,w));ye=ne-T,Se=me-B;var te=10,ge=Math.min(te/ye,te/Se);v=[ge,0,0,ge,-Math.round(ye/2+T)*ge,-Math.round(Se/2+B)*ge]}return{type:"path",path:o,matrix:v}}function I(d){var o,v=1,C="#000000",E='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof d=="string"?o=d:(o=d.text,v="scalar"in d?d.scalar:v,E="fontFamily"in d?d.fontFamily:E,C="color"in d?d.color:C);var L=10*v,F=""+L+"px "+E,T=new OffscreenCanvas(L,L),B=T.getContext("2d");B.font=F;var ne=B.measureText(o),me=Math.ceil(ne.actualBoundingBoxRight+ne.actualBoundingBoxLeft),ye=Math.ceil(ne.actualBoundingBoxAscent+ne.actualBoundingBoxDescent),Se=2,Me=ne.actualBoundingBoxLeft+Se,w=ne.actualBoundingBoxAscent+Se;me+=Se+Se,ye+=Se+Se,T=new OffscreenCanvas(me,ye),B=T.getContext("2d"),B.font=F,B.fillStyle=C,B.fillText(o,Me,w);var te=1/v;return{type:"bitmap",bitmap:T.transferToImageBitmap(),matrix:[te,0,0,te,-me*te/2,-ye*te/2]}}m.exports=function(){return Ae().apply(this,arguments)},m.exports.reset=function(){Ae().reset()},m.exports.create=Ce,m.exports.shapeFromPath=k,m.exports.shapeFromText=I})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),oi,!1);const $p=oi.exports;oi.exports.create;function Bp({turnData:h,onSelectBranch:p,onSynthesize:m,isSynthesizing:S,activeSelectedModelId:R}){var V,A,D;const[P,Z]=U.useState(null),[_,O]=U.useState(!0);if(!h||!h.responses||h.responses.length===0)return null;const G=h.responses,W=h.criticEvaluation,re=G.length>1,ee=(Q,oe)=>{navigator.clipboard.writeText(oe),Z(Q),setTimeout(()=>Z(null),2e3)},ce=Q=>{try{$p({particleCount:50,spread:60,origin:{y:.8},colors:["#6366f1","#06b6d4","#10b981","#f59e0b"]})}catch{}p(Q)};return a.jsxs("div",{className:"comparison-arena-wrap",children:[re&&W&&a.jsxs("div",{className:"critic-evaluation-panel glass-panel",children:[a.jsxs("div",{className:"critic-header",onClick:()=>O(!_),children:[a.jsxs("div",{className:"critic-title-row",children:[a.jsxs("div",{className:"critic-badge",children:[a.jsx(Xt,{size:16,className:"text-purple"}),a.jsx("span",{children:"Critic AI Evaluation"})]}),W.winner&&a.jsxs("span",{className:"critic-winner-tag",children:[a.jsx(ir,{size:14,className:"text-amber"}),"Critic Pick: ",a.jsx("strong",{children:W.winner.modelName})," (",W.winner.score,"/100)"]})]}),a.jsx("button",{className:"btn-icon",children:_?a.jsx(Am,{size:16}):a.jsx(Lm,{size:16})})]}),_&&a.jsxs("div",{className:"critic-body",children:[W.recommendationReason&&a.jsxs("div",{className:"critic-rationale-box",children:[a.jsx("strong",{children:"💡 Evaluator Verdict:"})," ",W.recommendationReason]}),a.jsx("div",{className:"score-table-wrap",children:a.jsxs("table",{className:"score-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Candidate Model"}),a.jsx("th",{children:"Correctness (35%)"}),a.jsx("th",{children:"Relevance (20%)"}),a.jsx("th",{children:"Completeness (20%)"}),a.jsx("th",{children:"Clarity (15%)"}),a.jsx("th",{children:"Instruction Following (10%)"}),a.jsx("th",{children:"Overall Score"})]})}),a.jsx("tbody",{children:(V=W.evaluations)==null?void 0:V.map(Q=>{var de;const oe=Q.modelId===((de=W.winner)==null?void 0:de.modelId);return a.jsxs("tr",{className:oe?"winner-row":"",children:[a.jsxs("td",{className:"model-cell",children:[a.jsx("span",{className:"ev-avatar",children:Q.avatar}),a.jsx("strong",{children:Q.modelName}),oe&&a.jsx("span",{className:"winner-pill",children:"⭐ Recommended"})]}),a.jsx("td",{children:a.jsx("span",{className:"score-cell",children:Q.scores.correctness})}),a.jsx("td",{children:a.jsx("span",{className:"score-cell",children:Q.scores.relevance})}),a.jsx("td",{children:a.jsx("span",{className:"score-cell",children:Q.scores.completeness})}),a.jsx("td",{children:a.jsx("span",{className:"score-cell",children:Q.scores.clarity})}),a.jsx("td",{children:a.jsx("span",{className:"score-cell",children:Q.scores.instructionFollowing})}),a.jsx("td",{children:a.jsx("span",{className:`score-badge ${oe?"high-score":""}`,children:Q.scores.overall})})]},Q.modelId)})})]})}),a.jsx("div",{className:"critique-details-grid",children:(A=W.evaluations)==null?void 0:A.map(Q=>{var oe,de;return a.jsxs("div",{className:"critique-card glass-card",children:[a.jsx("div",{className:"critique-card-title",children:a.jsxs("span",{children:[Q.avatar," ",Q.modelName," Critique"]})}),a.jsxs("div",{className:"critique-points",children:[a.jsxs("div",{className:"strengths-col",children:[a.jsx("span",{className:"col-label text-emerald",children:"Key Strengths"}),a.jsx("ul",{children:(oe=Q.strengths)==null?void 0:oe.map((he,M)=>a.jsxs("li",{children:[a.jsx(or,{size:12,className:"text-emerald"})," ",he]},M))})]}),a.jsxs("div",{className:"weaknesses-col",children:[a.jsx("span",{className:"col-label text-amber",children:"Observations"}),a.jsx("ul",{children:(de=Q.weaknesses)==null?void 0:de.map((he,M)=>a.jsxs("li",{children:[a.jsx(Dm,{size:12,className:"text-amber"})," ",he]},M))})]})]})]},Q.modelId)})}),a.jsxs("div",{className:"critic-disclaimer",children:["ℹ️ ",W.disclaimer," You retain full authority to select whichever response fits your workflow."]})]})]}),re&&m&&a.jsxs("div",{className:"synthesis-action-bar",children:[a.jsxs("div",{className:"synthesis-text",children:[a.jsx(St,{size:16,className:"text-purple"}),a.jsx("span",{children:"Want the best of all models combined into one consolidated answer?"})]}),a.jsxs("button",{className:"btn btn-primary btn-sm",onClick:m,disabled:S,children:[S?a.jsx(xn,{size:14,className:"animate-spin"}):a.jsx(Gr,{size:14}),a.jsx("span",{children:S?"Synthesizing Answers...":"Create Best Combined Answer"})]})]}),h.synthesis&&a.jsxs("div",{className:"synthesis-response-card glass-panel",children:[a.jsxs("div",{className:"response-card-header",children:[a.jsxs("div",{className:"model-id-badge",children:[a.jsx("span",{className:"avatar",children:"🔮"}),a.jsxs("div",{children:[a.jsx("div",{className:"model-name",children:"Hive Mind Synthesis AI"}),a.jsxs("div",{className:"model-sub",children:["Consensus from ",(D=h.synthesis.sources)==null?void 0:D.map(Q=>Q.name).join(" & ")]})]})]}),a.jsxs("div",{className:"header-actions",children:[a.jsx("button",{className:"btn-icon",onClick:()=>ee("synthesis",h.synthesis.text),children:P==="synthesis"?a.jsx(Yt,{size:14,className:"text-emerald"}):a.jsx(ni,{size:14})}),a.jsxs("button",{className:`btn btn-sm ${R==="synthesis"?"btn-emerald":"btn-secondary"}`,onClick:()=>ce("synthesis"),children:[R==="synthesis"?a.jsx(Yt,{size:14}):null,a.jsx("span",{children:R==="synthesis"?"Active Continuation Branch":"Use Synthesized Branch"})]})]})]}),a.jsx("div",{className:"response-body markdown-body",children:a.jsx("pre",{style:{whiteSpace:"pre-wrap"},children:h.synthesis.text})})]}),a.jsx("div",{className:`response-columns-container ${G.length>1?"multi-col":"single-col"}`,children:G.map((Q,oe)=>{var M,X;const de=R===Q.modelId,he=((M=W==null?void 0:W.winner)==null?void 0:M.modelId)===Q.modelId;return a.jsxs("div",{className:`response-col-card glass-panel ${de?"selected-branch-card":""}`,children:[a.jsxs("div",{className:"response-card-header",children:[a.jsxs("div",{className:"model-id-badge",children:[a.jsx("span",{className:"avatar",children:Q.avatar||"🤖"}),a.jsxs("div",{children:[a.jsxs("div",{className:"model-name-wrap",children:[a.jsx("span",{className:"model-name",children:Q.modelName}),he&&a.jsx("span",{className:"badge badge-amber badge-xs",children:"Critic Top Pick"})]}),a.jsxs("div",{className:"telemetry-tags",children:[a.jsxs("span",{className:"telemetry-tag",children:[a.jsx(si,{size:10})," ",Q.provider]}),a.jsxs("span",{className:"telemetry-tag",children:[a.jsx(od,{size:10})," ",Q.latency,"ms"]}),((X=Q.tokenUsage)==null?void 0:X.totalTokens)>0&&a.jsxs("span",{className:"telemetry-tag",children:[Q.tokenUsage.totalTokens," tokens"]}),Q.isLive&&a.jsx("span",{className:"badge badge-emerald badge-xs",children:"Live API"})]})]})]}),a.jsxs("div",{className:"header-actions",children:[a.jsx("button",{className:"btn-icon",onClick:()=>ee(Q.modelId,Q.text),title:"Copy Answer",children:P===Q.modelId?a.jsx(Yt,{size:14,className:"text-emerald"}):a.jsx(ni,{size:14})}),a.jsxs("button",{className:`btn btn-sm ${de?"btn-emerald":"btn-secondary"}`,onClick:()=>ce(Q.modelId),children:[de?a.jsx(Yt,{size:14}):null,a.jsx("span",{children:de?"Active Branch":"Use this response"})]})]})]}),a.jsx("div",{className:"response-body markdown-body",children:a.jsx("pre",{style:{whiteSpace:"pre-wrap",background:"transparent !important"},children:Q.text})}),a.jsx("div",{className:"card-footer-branch",children:a.jsx("button",{className:`btn btn-sm w-full ${de?"btn-emerald":"btn-secondary"}`,onClick:()=>ce(Q.modelId),children:de?a.jsxs(a.Fragment,{children:[a.jsx(or,{size:15}),a.jsx("span",{children:"Currently Active Branch for Follow-ups"})]}):a.jsxs(a.Fragment,{children:[a.jsx(np,{size:14}),a.jsx("span",{children:"Select Response to Continue Conversation"})]})})})]},Q.modelId||oe)})}),a.jsx("style",{children:`
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
      `})]})}function Up({conversation:h,onSelectBranch:p}){return!h||!h.turns||h.turns.length===0?a.jsxs("div",{className:"branch-viewer-empty glass-panel",children:[a.jsx(cr,{size:32,className:"text-dim"}),a.jsx("p",{children:"No active conversation turns yet. Send a prompt to start building the branch tree."})]}):a.jsxs("div",{className:"branch-viewer-container glass-panel",children:[a.jsxs("div",{className:"branch-header",children:[a.jsxs("div",{className:"branch-title-wrap",children:[a.jsx(cr,{size:18,className:"text-emerald"}),a.jsx("h3",{children:"Provider-Neutral Shared Memory & Branch Tree"})]}),a.jsxs("span",{className:"badge badge-indigo",children:[h.turns.length," Turn(s)"]})]}),a.jsx("div",{className:"turns-timeline",children:h.turns.map((m,S)=>{var R;return a.jsxs("div",{className:"turn-branch-node",children:[a.jsxs("div",{className:"turn-prompt-badge",children:[a.jsxs("span",{className:"turn-num",children:["Turn ",S+1]}),a.jsx("span",{className:"turn-prompt-text",children:m.userPrompt})]}),a.jsxs("div",{className:"candidate-branches-row",children:[a.jsx(Vm,{size:16,className:"branch-arrow text-muted"}),a.jsxs("div",{className:"branch-chips-list",children:[(R=m.responses)==null?void 0:R.map(P=>{const Z=m.selectedModelId===P.modelId;return a.jsxs("button",{className:`branch-chip glass-card ${Z?"active-branch":""}`,onClick:()=>p(m.turnId,P.modelId),title:`Click to activate ${P.modelName} branch for downstream turns`,children:[a.jsx("span",{className:"chip-avatar",children:P.avatar}),a.jsx("span",{className:"chip-name",children:P.modelName}),Z?a.jsxs("span",{className:"active-tag",children:[a.jsx(Yt,{size:12})," Active"]}):a.jsx("span",{className:"switch-tag",children:"Switch"})]},P.modelId)}),m.synthesis&&a.jsxs("button",{className:`branch-chip glass-card ${m.selectedModelId==="synthesis"?"active-branch":""}`,onClick:()=>p(m.turnId,"synthesis"),children:[a.jsx("span",{className:"chip-avatar",children:"🔮"}),a.jsx("span",{className:"chip-name",children:"Synthesized Consensus"}),m.selectedModelId==="synthesis"&&a.jsxs("span",{className:"active-tag",children:[a.jsx(Yt,{size:12})," Active"]})]})]})]})]},m.turnId)})}),a.jsx("style",{children:`
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
      `})]})}function Wp({models:h=[],criticWeights:p,initialPrompt:m="",initialModelIds:S=null,onOpenSettings:R}){const[P,Z]=U.useState([]),[_,O]=U.useState(null),[G,W]=U.useState(null),[re,ee]=U.useState(""),[ce,V]=U.useState("compare"),[A,D]=U.useState(["gpt-4o","claude-3-5-sonnet"]),[Q,oe]=U.useState(m),[de,he]=U.useState(null),[M,X]=U.useState(!1),[je,pe]=U.useState("prompt"),[Oe,We]=U.useState(!0),[K,ve]=U.useState(!1),[ue,Ce]=U.useState(null),[Ne,Ae]=U.useState(!1),[we,k]=U.useState(!1),[I,d]=U.useState(!1),o=U.useRef(null),v=U.useRef(null);U.useEffect(()=>{C()},[]),U.useEffect(()=>{m&&(oe(m),T(m))},[m]),U.useEffect(()=>{S&&S.length>0&&(D(S),S.length===1?V("single"):V("compare"))},[S]);const C=async()=>{try{const w=await Le.getConversations();Z(w||[]),w&&w.length>0&&!_&&E(w[0].id)}catch(w){console.error("Failed to load conversations:",w)}},E=async w=>{try{const te=await Le.getConversation(w);W(te),O(w),pe("prompt")}catch(te){console.error("Failed to load conversation:",te)}},L=async()=>{try{const w=await Le.createConversation("New Hive Mind Chat");Z(te=>[w,...te]),W(w),O(w.id),oe(""),he(null),Ce(null),pe("prompt")}catch(w){console.error("Failed to create new chat:",w)}},F=async(w,te)=>{w.stopPropagation();try{await Le.deleteConversation(te);const ge=P.filter(_e=>_e.id!==te);Z(ge),_===te&&(ge.length>0?E(ge[0].id):L())}catch(ge){console.error("Failed to delete conversation:",ge)}},T=async w=>{var te;if(!(!w||w.trim().length<3)){Ae(!0),pe("analyze");try{const ge=await Le.preflightPrompt(w);Ce(ge),pe("refine"),ce==="auto"&&((te=ge.recommendations)!=null&&te.topRecommendation)&&D([ge.recommendations.topRecommendation.modelId])}catch(ge){console.error("Preflight analysis error:",ge)}finally{Ae(!1)}}},B=w=>{ce==="single"?D([w]):A.includes(w)?A.length>1&&D(A.filter(te=>te!==w)):D([...A,w])},ne=async w=>{var ge;const te=(ge=w.target.files)==null?void 0:ge[0];if(te){X(!0);try{const _e=await Le.uploadDocument(te);he(_e)}catch(_e){alert("File upload error: "+_e.message)}finally{X(!1)}}},me=async()=>{var te,ge,_e,at,it,Qe;const w=Q.trim();if(!(!w||we)){k(!0),pe("generate");try{let Ve=ue;Ve||(Ve=await Le.preflightPrompt(w),Ce(Ve));let yt=_;yt||(yt=(await Le.createConversation(w.substring(0,35))).id,O(yt));const Ln=A.length>0?A:["gpt-4o","claude-3-5-sonnet"],Ct=await Le.generateResponses({prompt:((te=Ve.refinement)==null?void 0:te.refinedPrompt)||w,modelIds:Ln,conversationId:yt,documentContext:de?de.fullText:""});pe("compare");let It=null;Ct.responses&&Ct.responses.length>1&&(pe("critic"),It=await Le.criticEvaluate({originalPrompt:w,refinedPrompt:((ge=Ve.refinement)==null?void 0:ge.refinedPrompt)||w,responses:Ct.responses,weights:p}));const wn=((_e=It==null?void 0:It.winner)==null?void 0:_e.modelId)||((at=Ct.responses[0])==null?void 0:at.modelId),On=await Le.saveTurn(yt,{userPrompt:w,refinedPrompt:((it=Ve.refinement)==null?void 0:it.refinedPrompt)||w,analysis:Ve.analysis,breakdown:(Qe=Ve.refinement)==null?void 0:Qe.breakdown,recommendations:Ve.recommendations,responses:Ct.responses,criticEvaluation:It,selectedModelId:wn});await E(yt),await C(),oe(""),he(null),pe("branch"),setTimeout(()=>{var Lt;(Lt=o.current)==null||Lt.scrollIntoView({behavior:"smooth"})},100)}catch(Ve){alert("Workflow execution error: "+Ve.message)}finally{k(!1)}}},ye=async(w,te)=>{if(_)try{await Le.selectBranch(_,w,te),await E(_)}catch(ge){console.error("Failed to select branch:",ge)}},Se=async w=>{if(!(!_||I)){d(!0);try{const te=await Le.synthesize({originalPrompt:w.userPrompt,refinedPrompt:w.refinedPrompt,responses:w.responses,criticEvaluation:w.criticEvaluation});await Le.saveSynthesis(_,w.turnId,te),await E(_)}catch(te){alert("Synthesis error: "+te.message)}finally{d(!1)}}},Me=P.filter(w=>{var te;return(te=w.title)==null?void 0:te.toLowerCase().includes(re.toLowerCase())});return a.jsxs("div",{className:"workspace-container",children:[a.jsxs("aside",{className:"workspace-sidebar glass-panel",children:[a.jsxs("div",{className:"sidebar-top",children:[a.jsxs("button",{className:"btn btn-primary btn-sm w-full",onClick:L,children:[a.jsx(op,{size:16}),a.jsx("span",{children:"New Hive Mind Chat"})]}),a.jsxs("div",{className:"search-box",children:[a.jsx(ud,{size:14,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search history...",value:re,onChange:w=>ee(w.target.value),className:"search-input"})]})]}),a.jsxs("div",{className:"conversations-list",children:[a.jsx("div",{className:"sidebar-section-title",children:"Past Sessions"}),Me.length===0?a.jsx("div",{className:"empty-history-text",children:"No matching sessions found"}):Me.map(w=>a.jsxs("div",{className:`conv-item ${w.id===_?"active":""}`,onClick:()=>E(w.id),children:[a.jsxs("div",{className:"conv-item-left",children:[a.jsx("span",{className:"conv-title",children:w.title}),a.jsxs("span",{className:"conv-turns-badge",children:[w.turnCount||0," turn(s)"]})]}),a.jsx("button",{className:"btn-icon delete-conv-btn",onClick:te=>F(te,w.id),title:"Delete Session",children:a.jsx(Pp,{size:13})})]},w.id))]}),a.jsx("div",{className:"sidebar-footer",children:a.jsxs("button",{className:`btn btn-secondary btn-sm w-full ${K?"active-tree-btn":""}`,onClick:()=>ve(!K),children:[a.jsx(cr,{size:15,className:"text-emerald"}),a.jsx("span",{children:K?"Hide Branch Tree":"View Memory Branches"})]})})]}),a.jsxs("main",{className:"workspace-main",children:[a.jsxs("div",{className:"main-chat-header glass-panel",children:[a.jsxs("div",{className:"header-left",children:[a.jsx("h2",{className:"current-chat-title",children:(G==null?void 0:G.title)||"New Hive Mind Chat"}),a.jsxs("div",{className:"mode-toggle-group",children:[a.jsx("span",{className:"mode-label",children:"Mode:"}),a.jsx("button",{className:`mode-chip ${ce==="auto"?"active":""}`,onClick:()=>V("auto"),title:"Auto analyzes prompt and picks optimal model",children:"Auto Recommend"}),a.jsx("button",{className:`mode-chip ${ce==="single"?"active":""}`,onClick:()=>{V("single"),A.length>1&&D([A[0]])},title:"Explicit single model execution",children:"Single Model"}),a.jsx("button",{className:`mode-chip ${ce==="compare"?"active":""}`,onClick:()=>V("compare"),title:"Parallel multi-model comparison with Critic AI",children:"Multi-Model Arena"})]})]}),a.jsx("div",{className:"header-right",children:a.jsxs("button",{className:`btn btn-secondary btn-sm ${Oe?"active-panel-btn":""}`,onClick:()=>We(!Oe),children:[a.jsx(Gr,{size:15,className:"text-cyan"}),a.jsx("span",{children:Oe?"Hide Intelligence Panel":"Show Intelligence Panel"})]})})]}),a.jsx(Fp,{currentStage:je,onStageClick:w=>{["analyze","refine","breakdown","recommend"].includes(w)&&We(!0)}}),K&&a.jsx(Up,{conversation:G,onSelectBranch:ye}),a.jsxs("div",{className:"chat-messages-container",children:[!(G!=null&&G.turns)||G.turns.length===0?a.jsxs("div",{className:"chat-welcome-box glass-panel",children:[a.jsx("div",{className:"welcome-avatar",children:"🧠"}),a.jsx("h3",{children:"Welcome to AI Hive Mind"}),a.jsxs("p",{children:["Enter a question or coding prompt below. The platform will analyze its intent, refine the specifications, dispatch it across your selected AI models concurrently, and provide a comprehensive ",a.jsx("strong",{children:"Critic AI evaluation"}),"."]}),a.jsxs("div",{className:"quick-benchmark-row",children:[a.jsx("span",{className:"quick-label",children:"Try primary benchmark:"}),a.jsx("button",{className:"quick-btn",onClick:()=>{const w="Write a C program to check whether a number is prime and explain the logic.";oe(w),T(w)},children:'⚡ "Write a C program to check whether a number is prime..."'})]})]}):G.turns.map((w,te)=>a.jsxs("div",{className:"conversation-turn-block",children:[a.jsxs("div",{className:"user-message-card glass-panel",children:[a.jsxs("div",{className:"msg-header",children:[a.jsx("span",{className:"msg-author",children:"You"}),a.jsx("span",{className:"msg-time",children:new Date(w.timestamp||Date.now()).toLocaleTimeString()})]}),a.jsx("div",{className:"msg-text",children:w.userPrompt}),w.refinedPrompt&&w.refinedPrompt!==w.userPrompt&&a.jsxs("div",{className:"refined-tag-box",children:[a.jsx(St,{size:12,className:"text-cyan"}),a.jsx("span",{children:"Executed via Refined Specifications"})]})]}),a.jsx(Bp,{turnData:w,onSelectBranch:ge=>ye(w.turnId,ge),onSynthesize:()=>Se(w),isSynthesizing:I,activeSelectedModelId:w.selectedModelId})]},w.turnId||te)),we&&a.jsxs("div",{className:"generating-indicator glass-panel",children:[a.jsx(ll,{size:20,className:"animate-spin text-cyan"}),a.jsxs("div",{children:[a.jsx("strong",{children:"Generating Parallel Model Responses & Running Critic AI..."}),a.jsxs("p",{children:["Calling ",A.join(", ")," simultaneously"]})]})]}),a.jsx("div",{ref:o})]}),a.jsxs("div",{className:"composer-container glass-panel",children:[a.jsxs("div",{className:"models-select-bar",children:[a.jsx("span",{className:"select-bar-label",children:"Active Models:"}),a.jsx("div",{className:"models-chips-scroll",children:h.map(w=>{const te=A.includes(w.id);return a.jsxs("button",{className:`model-pill ${te?"selected":""}`,onClick:()=>B(w.id),title:`${w.name} (${w.provider}) - ${w.description}`,children:[a.jsx("span",{className:"status-dot active"}),a.jsx("span",{className:"pill-avatar",children:w.avatar}),a.jsx("span",{className:"pill-name",children:w.name}),te?a.jsx(md,{size:13,className:"text-cyan"}):a.jsx(Cp,{size:13,className:"text-dim"})]},w.id)})})]}),de&&a.jsxs("div",{className:"attached-doc-chip",children:[a.jsx(cd,{size:14,className:"text-cyan"}),a.jsxs("span",{children:[de.filename," (",de.charCount," chars)"]}),a.jsx("button",{className:"btn-icon",onClick:()=>he(null),children:a.jsx(ii,{size:13})})]}),a.jsxs("div",{className:"composer-input-row",children:[a.jsx("input",{type:"file",ref:v,style:{display:"none"},accept:".txt,.pdf,.docx,.md,.json",onChange:ne}),a.jsx("button",{className:"btn-icon attach-btn",onClick:()=>{var w;return(w=v.current)==null?void 0:w.click()},disabled:M,title:"Attach Document (PDF, DOCX, TXT)",children:M?a.jsx(ll,{size:18,className:"animate-spin"}):a.jsx(ap,{size:18})}),a.jsx("textarea",{className:"composer-textarea",placeholder:"Enter your prompt... (e.g. 'Write a C program to check whether a number is prime and explain the logic.')",rows:2,value:Q,onChange:w=>{oe(w.target.value),w.target.value.length>5&&w.target.value.endsWith(" ")&&T(w.target.value)},onKeyDown:w=>{w.key==="Enter"&&!w.shiftKey&&(w.preventDefault(),me())}}),a.jsx("button",{className:"btn btn-secondary btn-icon preflight-btn",onClick:()=>T(Q),disabled:Ne||!Q.trim(),title:"Analyze & Refine Prompt",children:a.jsx(St,{size:17,className:Ne?"animate-spin text-cyan":"text-cyan"})}),a.jsxs("button",{className:"btn btn-primary send-btn",onClick:me,disabled:we||!Q.trim(),children:[we?a.jsx(ll,{size:16,className:"animate-spin"}):a.jsx(gp,{size:16}),a.jsx("span",{children:"Send"})]})]})]})]}),Oe&&a.jsx(Dp,{analysis:ue==null?void 0:ue.analysis,refinement:ue==null?void 0:ue.refinement,recommendations:ue==null?void 0:ue.recommendations,onUseRefined:w=>{w&&(oe(w),T(w))},onUseOriginal:w=>{w&&oe(w)},onSelectRecommendedModels:w=>{D(w)},onClose:()=>We(!1)}),a.jsx("style",{children:`
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
      `})]})}function Vp({models:h=[]}){const[p,m]=U.useState(null),[S,R]=U.useState(!0),P=async()=>{R(!0);try{const _=await Le.getStats();m(_)}catch(_){console.error("Failed to load stats:",_)}finally{R(!1)}};U.useEffect(()=>{P()},[]);const Z=p&&p.totalRequests>0;return a.jsxs("div",{className:"dashboard-container",children:[a.jsxs("div",{className:"dash-header",children:[a.jsxs("div",{children:[a.jsx("h1",{className:"dash-title",children:"Telemetry & Usage Analytics"}),a.jsx("p",{className:"dash-subtitle",children:"Real-time performance metrics and multi-model consensus statistics"})]}),a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:P,disabled:S,children:[a.jsx(dp,{size:14,className:S?"animate-spin":""}),a.jsx("span",{children:"Refresh Metrics"})]})]}),Z?a.jsxs("div",{className:"stats-layout",children:[a.jsxs("div",{className:"metric-cards-grid",children:[a.jsxs("div",{className:"metric-card glass-card",children:[a.jsx("div",{className:"metric-icon-wrap",style:{color:"#6366f1",background:"rgba(99,102,241,0.12)"},children:a.jsx(ad,{size:22})}),a.jsxs("div",{children:[a.jsx("span",{className:"metric-label",children:"Total Orchestrated Turns"}),a.jsx("span",{className:"metric-value",children:p.totalRequests})]})]}),a.jsxs("div",{className:"metric-card glass-card",children:[a.jsx("div",{className:"metric-icon-wrap",style:{color:"#06b6d4",background:"rgba(6,182,212,0.12)"},children:a.jsx(od,{size:22})}),a.jsxs("div",{children:[a.jsx("span",{className:"metric-label",children:"Connected Models"}),a.jsx("span",{className:"metric-value",children:h.length})]})]}),a.jsxs("div",{className:"metric-card glass-card",children:[a.jsx("div",{className:"metric-icon-wrap",style:{color:"#10b981",background:"rgba(16,185,129,0.12)"},children:a.jsx(ir,{size:22})}),a.jsxs("div",{children:[a.jsx("span",{className:"metric-label",children:"Critic Top Picks Logged"}),a.jsx("span",{className:"metric-value",children:Object.values(p.criticWins||{}).reduce((_,O)=>_+O,0)})]})]}),a.jsxs("div",{className:"metric-card glass-card",children:[a.jsx("div",{className:"metric-icon-wrap",style:{color:"#f59e0b",background:"rgba(245,158,11,0.12)"},children:a.jsx(xn,{size:22})}),a.jsxs("div",{children:[a.jsx("span",{className:"metric-label",children:"User Chosen Branches"}),a.jsx("span",{className:"metric-value",children:Object.values(p.userSelections||{}).reduce((_,O)=>_+O,0)})]})]})]}),a.jsxs("div",{className:"model-stats-card glass-panel",children:[a.jsx("h3",{className:"section-heading",children:"Model Performance & Usage Distribution"}),a.jsx("div",{className:"table-responsive",children:a.jsxs("table",{className:"stats-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Model Name"}),a.jsx("th",{children:"Provider"}),a.jsx("th",{children:"Requests Served"}),a.jsx("th",{children:"Average Latency"}),a.jsx("th",{children:"Critic Recommendation Wins"}),a.jsx("th",{children:"User Final Selections"})]})}),a.jsx("tbody",{children:h.map(_=>{var ee,ce,V,A;const O=((ee=p.modelUsage)==null?void 0:ee[_.id])||0,G=(ce=p.averageLatency)!=null&&ce[_.id]?`${p.averageLatency[_.id]} ms`:"—",W=((V=p.criticWins)==null?void 0:V[_.id])||0,re=((A=p.userSelections)==null?void 0:A[_.id])||0;return a.jsxs("tr",{children:[a.jsxs("td",{className:"model-name-cell",children:[a.jsx("span",{children:_.avatar}),a.jsx("strong",{children:_.name})]}),a.jsx("td",{children:a.jsx("span",{className:"badge badge-indigo",children:_.provider})}),a.jsx("td",{children:a.jsx("span",{className:"num-cell",children:O})}),a.jsx("td",{children:a.jsx("span",{className:"num-cell",children:G})}),a.jsx("td",{children:a.jsx("span",{className:"num-cell text-emerald",children:W})}),a.jsx("td",{children:a.jsx("span",{className:"num-cell text-cyan",children:re})})]},_.id)})})]})})]})]}):a.jsxs("div",{className:"empty-stats-card glass-panel",children:[a.jsx(ad,{size:48,className:"text-dim animate-pulse"}),a.jsx("h3",{children:"No Telemetry Data Recorded Yet"}),a.jsx("p",{children:"Real performance data, latency benchmarks, token usage, and Critic AI selections will appear here as you run prompts in the AI Workspace."})]}),a.jsx("style",{children:`
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
      `})]})}function Hp({onSendToWorkspace:h}){const[p,m]=U.useState(`SOFTWARE SERVICE AGREEMENT & LIABILITY CLAUSE
1. LIMITATION OF LIABILITY: Under no circumstances shall Provider's total aggregate liability exceed $50.00 USD, regardless of the cause of action, negligence, data loss, or breach of contract.
2. INTELLECTUAL PROPERTY: Customer grants Provider an irrevocable, perpetual, worldwide, royalty-free license to use, reproduce, modify, and distribute any Customer Data ingested into the System for training commercial AI models.
3. TERMINATION: Provider reserves the sole right to terminate access immediately without prior notice or refund.`),[S,R]=U.useState(!1),[P,Z]=U.useState(null),_=async()=>{R(!0);try{await new Promise(G=>setTimeout(G,1e3)),Z({riskScore:84,riskLevel:"HIGH RISK (Unfavorable to Customer)",flaggedClauses:[{clause:"Limitation of Liability ($50 USD cap)",risk:"Severe",finding:"Extremely disproportionate liability ceiling that leaves customer unprotected against severe outages, security breaches, or total data loss.",recommendation:"Negotiate liability cap to minimum 12 months of fees paid or $1,000,000 insurance coverage."},{clause:"Intellectual Property (Perpetual AI training license)",risk:"Critical",finding:"Permits the vendor to ingest proprietary trade secrets and confidential customer data into general AI models.",recommendation:"Strike out AI training rights and insist on complete enterprise data isolation."},{clause:"Unilateral Termination without Notice",risk:"Moderate",finding:"Allows immediate service discontinuation without transition period or pro-rated refund.",recommendation:"Require 30 days written notice with guaranteed data export window."}],modelConsensus:"GPT-4o, Claude 3.5 Sonnet, and Gemini consensus agree this agreement presents unacceptable exposure."})}catch(G){alert("Analysis failed: "+G.message)}finally{R(!1)}},O=()=>{const G=`Please draft an amended, redlined version of the following software service agreement to mitigate the critical risks identified (Liability cap, IP training rights, and Termination notice):

${p}`;h(G)};return a.jsxs("div",{className:"legal-container",children:[a.jsx("div",{className:"legal-header",children:a.jsxs("div",{children:[a.jsx("div",{className:"tag-row",children:a.jsx("span",{className:"badge badge-purple",children:"Academic Project Showcase"})}),a.jsx("h1",{className:"legal-title",children:"Legal Contract & Document Risk Analyzer"}),a.jsx("p",{className:"legal-subtitle",children:"Multi-LLM cross-examination of complex contracts, extraction of high-risk clauses, and Critic AI risk scoring."})]})}),a.jsxs("div",{className:"legal-grid",children:[a.jsxs("div",{className:"legal-input-card glass-panel",children:[a.jsx("div",{className:"card-top",children:a.jsxs("div",{className:"top-title",children:[a.jsx(cd,{size:18,className:"text-cyan"}),a.jsx("h3",{children:"Contract / Document Text"})]})}),a.jsx("textarea",{className:"legal-textarea",rows:14,value:p,onChange:G=>m(G.target.value),placeholder:"Paste contract terms or clauses here..."}),a.jsx("div",{className:"input-footer",children:a.jsxs("button",{className:"btn btn-primary btn-md w-full",onClick:_,disabled:S||!p.trim(),children:[S?a.jsx(xn,{size:16,className:"animate-spin"}):a.jsx(Xt,{size:16}),a.jsx("span",{children:S?"Auditing Clauses Across LLMs...":"Audit Document with Hive Mind"})]})})]}),a.jsxs("div",{className:"legal-results-card glass-panel",children:[a.jsxs("div",{className:"card-top",children:[a.jsxs("div",{className:"top-title",children:[a.jsx(Xt,{size:18,className:"text-purple"}),a.jsx("h3",{children:"Critic AI Risk Audit & Cross-Model Findings"})]}),P&&a.jsx("span",{className:"badge badge-amber",children:P.riskLevel})]}),P?a.jsxs("div",{className:"audit-content",children:[a.jsxs("div",{className:"risk-score-box glass-card",children:[a.jsxs("div",{className:"risk-score-header",children:[a.jsx("span",{children:"Calculated Contract Risk Level"}),a.jsxs("span",{className:"score-number text-rose",children:[P.riskScore,"/100"]})]}),a.jsx("div",{className:"risk-meter",children:a.jsx("div",{className:"meter-fill",style:{width:`${P.riskScore}%`}})}),a.jsxs("p",{className:"consensus-text",children:["🤖 ",P.modelConsensus]})]}),a.jsxs("div",{className:"flagged-clauses-list",children:[a.jsx("h4",{children:"⚠️ Identified Risk Flags & Suggested Counter-Terms"}),P.flaggedClauses.map((G,W)=>a.jsxs("div",{className:"clause-card glass-card",children:[a.jsxs("div",{className:"clause-header",children:[a.jsx("strong",{children:G.clause}),a.jsxs("span",{className:`badge ${G.risk==="Critical"?"badge-rose":G.risk==="Severe"?"badge-amber":"badge-indigo"}`,children:[G.risk," Risk"]})]}),a.jsxs("p",{className:"finding-text",children:[a.jsx("strong",{children:"Analysis:"})," ",G.finding]}),a.jsxs("div",{className:"rec-box",children:[a.jsx(or,{size:14,className:"text-emerald flex-shrink-0"}),a.jsxs("span",{children:[a.jsx("strong",{children:"Proposed Remedy:"})," ",G.recommendation]})]})]},W))]}),a.jsx("div",{className:"export-action-row",children:a.jsxs("button",{className:"btn btn-cyan btn-md w-full",onClick:O,children:[a.jsx("span",{children:"Send Redline Request to AI Workspace"}),a.jsx(In,{size:16})]})})]}):a.jsxs("div",{className:"empty-audit-state",children:[a.jsx(Xt,{size:40,className:"text-dim"}),a.jsx("p",{children:'Click "Audit Document with Hive Mind" to trigger parallel clause extraction and multi-LLM risk scoring.'})]})]})]}),a.jsx("style",{children:`
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
      `})]})}function Qp({isOpen:h,onClose:p,models:m,onSaveModels:S,criticWeights:R,onSaveCriticWeights:P}){const[Z,_]=U.useState("keys"),[O,G]=U.useState({}),[W,re]=U.useState({sarvam:"",openai:"",gemini:"",anthropic:"",groq:"",ollamaUrl:"http://127.0.0.1:11434"}),[ee,ce]=U.useState({}),[V,A]=U.useState(null),[D,Q]=U.useState(m||[]),[oe,de]=U.useState(R||{}),[he,M]=U.useState(!1);if(U.useEffect(()=>{h&&(Le.getKeyStatus().then(K=>{G(K||{}),K.ollamaUrl&&re(ve=>({...ve,ollamaUrl:K.ollamaUrl}))}).catch(console.error),Q(JSON.parse(JSON.stringify(m))),de({...R}))},[h,m,R]),!h)return null;const X=async K=>{A(K);try{const ve=await Le.testModelConnection(K);ce(ue=>({...ue,[K]:ve}))}catch(ve){ce(ue=>({...ue,[K]:{status:"error",message:ve.message}}))}finally{A(null)}},je=async()=>{try{await Le.updateKeys(W);const K=await Le.getKeyStatus();G(K),M(!0),setTimeout(()=>M(!1),2500)}catch(K){alert("Error saving keys: "+K.message)}},pe=(K,ve,ue)=>{Q(Ce=>Ce.map(Ne=>Ne.id===K?{...Ne,capabilities:{...Ne.capabilities,[ve]:parseInt(ue,10)}}:Ne))},Oe=(K,ve)=>{de(ue=>({...ue,[K]:parseFloat(ve)}))},We=async()=>{await je(),S(D),P(oe),await Le.updateModelSettings(D,oe),p()};return a.jsxs("div",{className:"modal-overlay",onClick:p,children:[a.jsxs("div",{className:"modal-content glass-panel",onClick:K=>K.stopPropagation(),children:[a.jsxs("div",{className:"settings-header",children:[a.jsxs("div",{className:"title-with-icon",children:[a.jsx(jp,{size:20,className:"text-indigo"}),a.jsx("h2",{children:"System Settings & Model Configuration"})]}),a.jsx("button",{className:"btn-icon",onClick:p,children:a.jsx(ii,{size:18})})]}),a.jsxs("div",{className:"settings-tabs",children:[a.jsxs("button",{className:`tab-btn ${Z==="keys"?"active":""}`,onClick:()=>_("keys"),children:[a.jsx(Xm,{size:15}),a.jsx("span",{children:"API Keys & Providers"})]}),a.jsxs("button",{className:`tab-btn ${Z==="capabilities"?"active":""}`,onClick:()=>_("capabilities"),children:[a.jsx(si,{size:15}),a.jsx("span",{children:"Model Profiles"})]}),a.jsxs("button",{className:`tab-btn ${Z==="critic"?"active":""}`,onClick:()=>_("critic"),children:[a.jsx(Xt,{size:15}),a.jsx("span",{children:"Critic AI Weights"})]})]}),a.jsxs("div",{className:"settings-body",children:[Z==="keys"&&a.jsxs("div",{className:"tab-section",children:[a.jsxs("div",{className:"info-banner",children:[a.jsx(wp,{size:18,className:"text-emerald"}),a.jsx("p",{children:"Keys are handled exclusively on the backend server. When an API key is absent, the platform safely runs via deterministic academic simulation."})]}),a.jsxs("div",{className:"keys-grid",children:[a.jsxs("div",{className:"key-row glass-card",children:[a.jsxs("div",{className:"key-info",children:[a.jsxs("div",{className:"key-title",children:[a.jsx("span",{children:"🇮🇳 Sarvam AI (105B Indic Model)"}),O.sarvam?a.jsx("span",{className:"badge badge-emerald",children:"Active & Configured"}):a.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),a.jsx("p",{className:"key-desc",children:"Powers Sarvam 105B multilingual and Indic domain intelligence."})]}),a.jsxs("div",{className:"key-input-row",children:[a.jsx("input",{type:"password",placeholder:O.sarvam?"••••••••••••••••":"Paste Sarvam API Key",className:"key-input",value:W.sarvam,onChange:K=>re({...W,sarvam:K.target.value})}),a.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>X("sarvam-105b"),disabled:V==="sarvam-105b",children:V==="sarvam-105b"?"Testing...":"Test"})]}),ee["sarvam-105b"]&&a.jsxs("div",{className:"test-feedback",children:["Status: ",ee["sarvam-105b"].message," (",ee["sarvam-105b"].latency,"ms)"]})]}),a.jsxs("div",{className:"key-row glass-card",children:[a.jsxs("div",{className:"key-info",children:[a.jsxs("div",{className:"key-title",children:[a.jsx("span",{children:"✨ Google Gemini API Key"}),O.gemini?a.jsx("span",{className:"badge badge-emerald",children:"Configured"}):a.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),a.jsx("p",{className:"key-desc",children:"Powers Gemini 2.0 Flash / Pro models."})]}),a.jsxs("div",{className:"key-input-row",children:[a.jsx("input",{type:"password",placeholder:O.gemini?"••••••••••••••••":"Paste AI Studio API Key",className:"key-input",value:W.gemini,onChange:K=>re({...W,gemini:K.target.value})}),a.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>X("gemini-2-0-flash"),disabled:V==="gemini-2-0-flash",children:V==="gemini-2-0-flash"?"Testing...":"Test"})]}),ee["gemini-2-0-flash"]&&a.jsxs("div",{className:"test-feedback",children:["Status: ",ee["gemini-2-0-flash"].message," (",ee["gemini-2-0-flash"].latency,"ms)"]})]}),a.jsxs("div",{className:"key-row glass-card",children:[a.jsxs("div",{className:"key-info",children:[a.jsxs("div",{className:"key-title",children:[a.jsx("span",{children:"🧠 OpenAI API Key"}),O.openai?a.jsx("span",{className:"badge badge-emerald",children:"Configured"}):a.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),a.jsx("p",{className:"key-desc",children:"Powers GPT-4o and OpenAI endpoints."})]}),a.jsxs("div",{className:"key-input-row",children:[a.jsx("input",{type:"password",placeholder:O.openai?"••••••••••••••••":"Paste OpenAI sk-...",className:"key-input",value:W.openai,onChange:K=>re({...W,openai:K.target.value})}),a.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>X("gpt-4o"),disabled:V==="gpt-4o",children:V==="gpt-4o"?"Testing...":"Test"})]}),ee["gpt-4o"]&&a.jsxs("div",{className:"test-feedback",children:["Status: ",ee["gpt-4o"].message," (",ee["gpt-4o"].latency,"ms)"]})]}),a.jsxs("div",{className:"key-row glass-card",children:[a.jsxs("div",{className:"key-info",children:[a.jsxs("div",{className:"key-title",children:[a.jsx("span",{children:"🎭 Anthropic Claude API Key"}),O.anthropic?a.jsx("span",{className:"badge badge-emerald",children:"Configured"}):a.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),a.jsx("p",{className:"key-desc",children:"Powers Claude 3.5 Sonnet."})]}),a.jsxs("div",{className:"key-input-row",children:[a.jsx("input",{type:"password",placeholder:O.anthropic?"••••••••••••••••":"Paste sk-ant-...",className:"key-input",value:W.anthropic,onChange:K=>re({...W,anthropic:K.target.value})}),a.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>X("claude-3-5-sonnet"),disabled:V==="claude-3-5-sonnet",children:V==="claude-3-5-sonnet"?"Testing...":"Test"})]})]}),a.jsxs("div",{className:"key-row glass-card",children:[a.jsxs("div",{className:"key-info",children:[a.jsxs("div",{className:"key-title",children:[a.jsx("span",{children:"⚡ Groq Cloud API Key"}),O.groq?a.jsx("span",{className:"badge badge-emerald",children:"Configured"}):a.jsx("span",{className:"badge badge-amber",children:"Offline / Fallback"})]}),a.jsx("p",{className:"key-desc",children:"Powers ultra-fast Llama 3.3 70B inference."})]}),a.jsxs("div",{className:"key-input-row",children:[a.jsx("input",{type:"password",placeholder:O.groq?"••••••••••••••••":"Paste gsk_...",className:"key-input",value:W.groq,onChange:K=>re({...W,groq:K.target.value})}),a.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>X("llama-3-3-70b"),disabled:V==="llama-3-3-70b",children:V==="llama-3-3-70b"?"Testing...":"Test"})]})]}),a.jsxs("div",{className:"key-row glass-card",children:[a.jsxs("div",{className:"key-info",children:[a.jsx("div",{className:"key-title",children:a.jsx("span",{children:"🦙 Ollama Local Host URL"})}),a.jsx("p",{className:"key-desc",children:"Private local model instance."})]}),a.jsxs("div",{className:"key-input-row",children:[a.jsx("input",{type:"text",placeholder:"http://127.0.0.1:11434",className:"key-input",value:W.ollamaUrl,onChange:K=>re({...W,ollamaUrl:K.target.value})}),a.jsx("button",{className:"btn btn-secondary btn-xs",onClick:()=>X("ollama-local"),disabled:V==="ollama-local",children:V==="ollama-local"?"Testing...":"Test"})]})]})]})]}),Z==="capabilities"&&a.jsxs("div",{className:"tab-section",children:[a.jsx("p",{className:"section-instruction",children:"Adjust capability profiles to customize how the Recommendation Engine calculates match percentages for different prompt types."}),a.jsx("div",{className:"capabilities-editor-list",children:D.map(K=>a.jsxs("div",{className:"model-cap-card glass-card",children:[a.jsxs("div",{className:"cap-card-header",children:[a.jsx("span",{className:"avatar",children:K.avatar}),a.jsxs("div",{children:[a.jsx("strong",{children:K.name}),a.jsxs("span",{className:"cap-provider-tag",children:[" (",K.provider,")"]})]})]}),a.jsx("div",{className:"sliders-grid",children:["coding","reasoning","creative","summarization","speed"].map(ve=>{var ue,Ce;return a.jsxs("div",{className:"slider-item",children:[a.jsxs("div",{className:"slider-label-row",children:[a.jsx("span",{className:"cap-name",children:ve}),a.jsxs("span",{className:"cap-val",children:[((ue=K.capabilities)==null?void 0:ue[ve])||85,"%"]})]}),a.jsx("input",{type:"range",min:"50",max:"99",value:((Ce=K.capabilities)==null?void 0:Ce[ve])||85,onChange:Ne=>pe(K.id,ve,Ne.target.value),className:"cap-range"})]},ve)})})]},K.id))})]}),Z==="critic"&&a.jsxs("div",{className:"tab-section",children:[a.jsx("p",{className:"section-instruction",children:"Customize the weighting formulas used by Critic AI to evaluate candidate responses."}),a.jsx("div",{className:"critic-weights-card glass-card",children:[{key:"correctness",label:"Correctness & Accuracy",default:35},{key:"relevance",label:"Relevance to Prompt",default:20},{key:"completeness",label:"Completeness & Depth",default:20},{key:"clarity",label:"Clarity & Formatting",default:15},{key:"instructionFollowing",label:"Instruction Following",default:10}].map(K=>a.jsxs("div",{className:"weight-slider-row",children:[a.jsxs("div",{className:"weight-info",children:[a.jsx("span",{className:"weight-title",children:K.label}),a.jsxs("span",{className:"weight-percent",children:[Math.round((oe[K.key]||K.default/100)*100),"%"]})]}),a.jsx("input",{type:"range",min:"0.05",max:"0.6",step:"0.05",value:oe[K.key]||K.default/100,onChange:ve=>Oe(K.key,ve.target.value),className:"cap-range"})]},K.key))})]})]}),a.jsxs("div",{className:"settings-footer",children:[he&&a.jsxs("span",{className:"save-toast text-emerald",children:[a.jsx(Yt,{size:16})," Saved!"]}),a.jsx("button",{className:"btn btn-secondary btn-sm",onClick:p,children:"Cancel"}),a.jsxs("button",{className:"btn btn-primary btn-sm",onClick:We,children:[a.jsx(mp,{size:15}),a.jsx("span",{children:"Apply & Save Configuration"})]})]})]}),a.jsx("style",{children:`
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
      `})]})}const ti=[{label:"Coding / Python",prompt:"Write a Python script to solve the 0/1 knapsack problem using dynamic programming and explain time complexity.",category:"coding"},{label:"Math / Logic",prompt:"Prove that the square root of 2 is irrational and solve the equation x^2 - 2 = 0 with step-by-step reasoning.",category:"reasoning"},{label:"Indic / Vernacular",prompt:"ಕನ್ನಡದಲ್ಲಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಬಗ್ಗೆ ಒಂದು ಸಣ್ಣ ಪ್ರಬಂಧ ಬರೆಯಿರಿ ಮತ್ತು ಅದರ ಮಹತ್ವವನ್ನು ತಿಳಿಸಿ.",category:"multilingual"},{label:"Summarization",prompt:"Summarize the quarterly cloud computing trends report, highlight gross margins, and extract 5 strategic risk factors.",category:"summarization"},{label:"Creative Prose",prompt:"Write an atmospheric neo-noir short story about an autonomous AI investigator solving a memory theft in Tokyo.",category:"creative"},{label:"Strict JSON",prompt:'Strictly return valid JSON only with keys "status", "data", "summary" without any introductory conversational text or markdown blocks.',category:"instruction"}];function Kp({onSendToWorkspace:h}){var D,Q,oe,de,he;const[p,m]=U.useState(""),[S,R]=U.useState(null),[P,Z]=U.useState(!1),[_,O]=U.useState([]),[G,W]=U.useState(null);U.useEffect(()=>{re(),ee(ti[0].prompt)},[]);const re=async()=>{try{const M=await Le.getBenchmarkCategories();M.categories&&O(M.categories)}catch(M){console.error("Failed to load benchmark categories:",M)}},ee=async(M=null)=>{var je;const X=M!==null?M:p;if(!(!X||!X.trim())){Z(!0);try{m(X);const pe=await Le.rankModelsByBenchmark(X);R(pe),W((je=pe.classification)==null?void 0:je.primaryCategory)}catch(pe){console.error("Failed to rank models by benchmark:",pe)}finally{Z(!1)}}},ce=M=>{W(M);const X=ti.find(je=>je.category===M);X&&ee(X.prompt)},V=M=>{h&&h(p,[M])},A=(M,X)=>{h&&h(p,[M,X])};return a.jsxs("div",{className:"benchmark-container",children:[a.jsxs("div",{className:"benchmark-hero",children:[a.jsxs("div",{className:"hero-badge",children:[a.jsx(ir,{size:14,className:"text-amber"}),a.jsx("span",{children:"Verifiable Academic & Industry LLM Benchmarks"})]}),a.jsxs("h1",{className:"hero-title",children:["Prompt Classification & ",a.jsx("span",{className:"text-gradient",children:"Benchmark Model Ranker"})]}),a.jsx("p",{className:"hero-subtitle",children:"Intelligently classifies any prompt into its task category, cross-references empirical benchmark datasets (HumanEval, GSM8K, IndicLLM, MMLU-Pro, LMSYS Elo), and ranks the best-performing models with verifiable accuracy."}),a.jsxs("div",{className:"prompt-input-card glass-panel",children:[a.jsxs("div",{className:"input-row",children:[a.jsx("textarea",{className:"benchmark-textarea",placeholder:"Type or paste any prompt (coding, math, Indic language, analysis, creative)...",value:p,onChange:M=>m(M.target.value),rows:3,onKeyDown:M=>{M.key==="Enter"&&(M.ctrlKey||M.metaKey)&&ee()}}),a.jsx("button",{className:"btn btn-primary rank-submit-btn",onClick:()=>ee(),disabled:P||!p.trim(),children:P?a.jsx("div",{className:"spinner-sm"}):a.jsxs(a.Fragment,{children:[a.jsx(xn,{size:16}),a.jsx("span",{children:"Classify & Rank"})]})})]}),a.jsxs("div",{className:"sample-pills-row",children:[a.jsx("span",{className:"sample-label",children:"Try test queries:"}),ti.map((M,X)=>a.jsx("button",{className:`sample-pill ${p===M.prompt?"active":""}`,onClick:()=>ee(M.prompt),children:a.jsx("span",{children:M.label})},X))]})]})]}),_.length>0&&a.jsx("div",{className:"category-tabs-bar",children:a.jsx("div",{className:"category-tabs-inner",children:_.map(M=>a.jsxs("button",{className:`cat-tab-btn ${G===M.id?"active":""}`,onClick:()=>ce(M.id),children:[a.jsx("span",{className:"cat-tab-icon",children:M.icon}),a.jsx("span",{className:"cat-tab-name",children:M.name}),M.topModel&&a.jsxs("span",{className:"cat-top-model-pill",children:["Top: ",M.topModel.name]})]},M.id))})}),S&&a.jsxs("div",{className:"benchmark-results-grid",children:[a.jsxs("div",{className:"benchmark-sidebar",children:[a.jsxs("div",{className:"glass-card result-panel-card",children:[a.jsxs("div",{className:"card-header-line",children:[a.jsx(Gr,{size:18,className:"text-cyan"}),a.jsx("h3",{children:"Prompt Category Classification"})]}),a.jsxs("div",{className:"category-spotlight",children:[a.jsx("div",{className:"category-icon-large",children:S.categoryIcon}),a.jsxs("div",{children:[a.jsx("h4",{className:"spotlight-title",children:S.categoryName}),a.jsx("p",{className:"spotlight-desc",children:S.categoryDescription})]})]}),a.jsxs("div",{className:"confidence-meter-block",children:[a.jsxs("div",{className:"meter-label-row",children:[a.jsx("span",{children:"Classification Confidence"}),a.jsxs("span",{className:"confidence-number",children:[S.classification.confidence,"%"]})]}),a.jsx("div",{className:"meter-bar-track",children:a.jsx("div",{className:"meter-bar-fill",style:{width:`${S.classification.confidence}%`}})})]}),a.jsxs("div",{className:"distribution-block",children:[a.jsx("span",{className:"sub-label",children:"Category Intent Distribution:"}),a.jsx("div",{className:"distribution-list",children:(D=S.classification.distribution)==null?void 0:D.map((M,X)=>a.jsxs("div",{className:"dist-row",children:[a.jsx("span",{className:"dist-name",children:M.name}),a.jsx("div",{className:"dist-bar-wrap",children:a.jsx("div",{className:"dist-bar-fill",style:{width:`${M.percentage}%`,background:X===0?"var(--accent-indigo)":X===1?"var(--accent-cyan)":"var(--accent-emerald)"}})}),a.jsxs("span",{className:"dist-pct",children:[M.percentage,"%"]})]},X))})]}),((Q=S.classification.detectedTraits)==null?void 0:Q.length)>0&&a.jsxs("div",{className:"traits-block",children:[a.jsx("span",{className:"sub-label",children:"Signals & Heuristics Detected:"}),a.jsx("div",{className:"trait-tags",children:S.classification.detectedTraits.map((M,X)=>a.jsxs("span",{className:"trait-tag",children:[a.jsx(or,{size:12,className:"text-emerald"}),M]},X))})]})]}),a.jsxs("div",{className:"glass-card result-panel-card",children:[a.jsxs("div",{className:"card-header-line",children:[a.jsx(Tm,{size:18,className:"text-indigo"}),a.jsx("h3",{children:"Official Benchmark Suite Evaluated"})]}),a.jsxs("p",{className:"suite-intro",children:["The benchmark composite score combines verified academic evaluations tailored to ",a.jsx("strong",{children:S.categoryName}),":"]}),a.jsx("div",{className:"suite-benchmarks-list",children:(oe=S.primaryBenchmarks)==null?void 0:oe.map((M,X)=>a.jsxs("div",{className:"suite-bm-item",children:[a.jsxs("div",{className:"suite-bm-top",children:[a.jsx("span",{className:"bm-name-highlight",children:M.name}),a.jsxs("span",{className:"bm-weight-badge",children:[Math.round(M.weight*100),"% Weight"]})]}),a.jsx("p",{className:"bm-desc-text",children:M.description})]},X))})]})]}),a.jsxs("div",{className:"benchmark-main-column",children:[S.topRankedModel&&a.jsxs("div",{className:"winner-spotlight-card glass-panel",children:[a.jsxs("div",{className:"winner-badge-header",children:[a.jsxs("div",{className:"crown-badge",children:[a.jsx(ri,{size:16}),a.jsx("span",{children:"#1 RECOMMENDED MODEL"})]}),a.jsx("span",{className:"standout-tag",children:S.topRankedModel.standoutBadge})]}),a.jsxs("div",{className:"winner-info-row",children:[a.jsxs("div",{className:"winner-title-group",children:[a.jsx("h2",{children:S.topRankedModel.name}),a.jsx("span",{className:"winner-provider",children:S.topRankedModel.provider})]}),a.jsxs("div",{className:"winner-score-box",children:[a.jsx("div",{className:"score-num-big",children:S.topRankedModel.compositeScore}),a.jsx("div",{className:"score-label-small",children:"Composite Score"})]})]}),a.jsxs("p",{className:"verdict-text-box",children:[a.jsx(Gm,{size:16,className:"text-cyan shrink-0"}),a.jsx("span",{children:S.verdictRationale})]}),a.jsxs("div",{className:"metrics-grid",children:[(de=S.topRankedModel.benchmarkMetrics)==null?void 0:de.map((M,X)=>a.jsxs("div",{className:"metric-pill-box glass-card",children:[a.jsx("span",{className:"metric-name-label",children:M.name}),a.jsxs("div",{className:"metric-score-display",children:[M.value,a.jsx("span",{className:"metric-unit-text",children:M.unit})]})]},X)),a.jsxs("div",{className:"metric-pill-box glass-card elo-box",children:[a.jsx("span",{className:"metric-name-label",children:"Chatbot Arena Elo"}),a.jsxs("div",{className:"metric-score-display text-amber",children:[S.topRankedModel.arenaElo,a.jsx("span",{className:"metric-unit-text",children:"Elo"})]})]})]}),a.jsxs("div",{className:"winner-cta-row",children:[a.jsxs("button",{className:"btn btn-primary",onClick:()=>V(S.topRankedModel.modelId),children:[a.jsx(xn,{size:16}),a.jsxs("span",{children:["Launch ",S.topRankedModel.name," in Arena"]})]}),S.runnerUpModel&&a.jsxs("button",{className:"btn btn-secondary",onClick:()=>A(S.topRankedModel.modelId,S.runnerUpModel.modelId),children:[a.jsx(qr,{size:16}),a.jsxs("span",{children:["Compare #1 vs #2 (",S.runnerUpModel.name,")"]})]})]})]}),a.jsxs("div",{className:"glass-card result-panel-card",children:[a.jsxs("div",{className:"card-header-line",children:[a.jsx(Mp,{size:18,className:"text-amber"}),a.jsxs("h3",{children:['Model Benchmark Leaderboard for "',S.categoryName,'"']})]}),a.jsx("div",{className:"leaderboard-table-wrap",children:a.jsxs("table",{className:"leaderboard-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Rank"}),a.jsx("th",{children:"Model & Provider"}),a.jsx("th",{children:"Key Strengths & Accolades"}),a.jsx("th",{children:"Primary Benchmark"}),a.jsx("th",{children:"LMSYS Elo"}),a.jsx("th",{children:"Composite Score"}),a.jsx("th",{children:"Action"})]})}),a.jsx("tbody",{children:(he=S.rankedModels)==null?void 0:he.map(M=>{var Oe;const X=M.rank===1,je=M.rank===2,pe=(Oe=M.benchmarkMetrics)==null?void 0:Oe[0];return a.jsxs("tr",{className:X?"row-winner":"",children:[a.jsx("td",{children:a.jsx("div",{className:"rank-badge-cell",children:X?a.jsxs("span",{className:"trophy-gold",children:[a.jsx(ri,{size:16})," #1"]}):je?a.jsxs("span",{className:"trophy-silver",children:[a.jsx(ir,{size:15})," #2"]}):a.jsxs("span",{className:"rank-num",children:["#",M.rank]})})}),a.jsx("td",{children:a.jsxs("div",{className:"model-cell-name",children:[a.jsx("span",{className:"model-bold",children:M.name}),a.jsx("span",{className:"provider-sub",children:M.provider})]})}),a.jsx("td",{children:a.jsx("span",{className:"strength-text",children:M.keyStrength})}),a.jsx("td",{children:pe&&a.jsxs("span",{className:"metric-chip",children:[pe.name.split(" ")[0],": ",a.jsxs("strong",{children:[pe.value,pe.unit]})]})}),a.jsx("td",{children:a.jsx("span",{className:"elo-chip",children:M.arenaElo})}),a.jsx("td",{children:a.jsxs("div",{className:"composite-cell",children:[a.jsx("span",{className:"comp-score-bold",children:M.compositeScore}),a.jsx("div",{className:"comp-score-bar",children:a.jsx("div",{className:"comp-bar-fill",style:{width:`${M.compositeScore}%`,background:X?"var(--accent-amber)":"var(--accent-indigo)"}})})]})}),a.jsx("td",{children:a.jsx("button",{className:`btn btn-xs ${X?"btn-primary":"btn-secondary"}`,onClick:()=>V(M.modelId),children:"Arena"})})]},M.modelId)})})]})})]})]})]}),a.jsx("style",{children:`
        .benchmark-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem 1.5rem;
          color: var(--text-primary);
        }
        .benchmark-hero {
          text-align: center;
          margin-bottom: 2rem;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #fbbf24;
          margin-bottom: 1rem;
        }
        .text-amber { color: #f59e0b; }
        .hero-title {
          font-size: 2.3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }
        .text-gradient {
          background: linear-gradient(135deg, #6366f1, #06b6d4, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          max-width: 820px;
          margin: 0 auto 1.75rem auto;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .prompt-input-card {
          max-width: 960px;
          margin: 0 auto;
          padding: 1.25rem;
          text-align: left;
        }
        .input-row {
          display: flex;
          gap: 0.75rem;
          align-items: stretch;
        }
        .benchmark-textarea {
          flex: 1;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          line-height: 1.5;
          resize: none;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .benchmark-textarea:focus {
          border-color: var(--accent-indigo);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        .rank-submit-btn {
          min-width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 700;
        }
        .sample-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.85rem;
          flex-wrap: wrap;
        }
        .sample-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .sample-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 0.3rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sample-pill:hover, .sample-pill.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--accent-indigo);
          color: #fff;
        }
        .category-tabs-bar {
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        .category-tabs-inner {
          display: flex;
          gap: 0.65rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cat-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.9rem;
          background: rgba(13, 18, 28, 0.7);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.82rem;
        }
        .cat-tab-btn:hover {
          border-color: var(--accent-cyan);
          color: #fff;
        }
        .cat-tab-btn.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--accent-indigo);
          color: #fff;
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
        }
        .cat-top-model-pill {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-size: 0.7rem;
          color: var(--accent-cyan);
        }
        .benchmark-results-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .benchmark-results-grid {
            grid-template-columns: 1fr;
          }
        }
        .benchmark-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .result-panel-card {
          padding: 1.25rem;
        }
        .card-header-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .card-header-line h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .category-spotlight {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }
        .category-icon-large {
          font-size: 2rem;
        }
        .spotlight-title {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .spotlight-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .confidence-meter-block {
          margin-bottom: 1.25rem;
        }
        .meter-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          margin-bottom: 0.35rem;
          color: var(--text-secondary);
        }
        .confidence-number {
          font-weight: 700;
          color: var(--accent-emerald);
        }
        .meter-bar-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          overflow: hidden;
        }
        .meter-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #10b981);
          border-radius: 9999px;
          transition: width 0.4s ease;
        }
        .distribution-block {
          margin-bottom: 1.25rem;
        }
        .sub-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.6rem;
        }
        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .dist-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.78rem;
        }
        .dist-name {
          width: 140px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-secondary);
        }
        .dist-bar-wrap {
          flex: 1;
          height: 5px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 9999px;
          overflow: hidden;
        }
        .dist-bar-fill {
          height: 100%;
          border-radius: 9999px;
        }
        .dist-pct {
          width: 32px;
          text-align: right;
          font-weight: 600;
          color: var(--text-muted);
        }
        .traits-block {
          margin-top: 1rem;
        }
        .trait-tags {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .trait-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.35rem 0.6rem;
          border-radius: 4px;
        }
        .suite-intro {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .suite-benchmarks-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .suite-bm-item {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-subtle);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
        }
        .suite-bm-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }
        .bm-name-highlight {
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
        }
        .bm-weight-badge {
          background: rgba(99, 102, 241, 0.2);
          color: var(--accent-indigo);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .bm-desc-text {
          font-size: 0.74rem;
          color: var(--text-muted);
          line-height: 1.3;
        }
        .benchmark-main-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .winner-spotlight-card {
          padding: 1.5rem;
          border: 1px solid rgba(245, 158, 11, 0.4);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(99, 102, 241, 0.06));
          box-shadow: 0 0 32px rgba(245, 158, 11, 0.12);
        }
        .winner-badge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .crown-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #000;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          letter-spacing: 0.03em;
        }
        .standout-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #fcd34d;
          background: rgba(245, 158, 11, 0.15);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }
        .winner-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .winner-title-group h2 {
          font-size: 1.7rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.2rem;
        }
        .winner-provider {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .winner-score-box {
          text-align: right;
        }
        .score-num-big {
          font-size: 2.2rem;
          font-weight: 900;
          color: #fbbf24;
          line-height: 1;
        }
        .score-label-small {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-top: 0.2rem;
        }
        .verdict-text-box {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          background: rgba(0, 0, 0, 0.35);
          border-left: 3px solid var(--accent-cyan);
          padding: 0.85rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.84rem;
          line-height: 1.5;
          color: #e2e8f0;
          margin-bottom: 1.25rem;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .metric-pill-box {
          padding: 0.75rem;
          text-align: center;
        }
        .metric-name-label {
          display: block;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .metric-score-display {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
        }
        .metric-unit-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-left: 0.15rem;
        }
        .winner-cta-row {
          display: flex;
          gap: 0.85rem;
        }
        .leaderboard-table-wrap {
          overflow-x: auto;
        }
        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
          text-align: left;
        }
        .leaderboard-table th {
          padding: 0.75rem 0.65rem;
          color: var(--text-muted);
          font-weight: 600;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          text-transform: uppercase;
        }
        .leaderboard-table td {
          padding: 0.85rem 0.65rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          vertical-align: middle;
        }
        .leaderboard-table tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .row-winner {
          background: rgba(245, 158, 11, 0.04) !important;
        }
        .rank-badge-cell {
          font-weight: 700;
        }
        .trophy-gold {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #fbbf24;
          font-weight: 800;
        }
        .trophy-silver {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #94a3b8;
          font-weight: 700;
        }
        .rank-num {
          color: var(--text-muted);
        }
        .model-cell-name {
          display: flex;
          flex-direction: column;
        }
        .model-bold {
          font-weight: 700;
          color: #fff;
        }
        .provider-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .strength-text {
          color: var(--text-secondary);
          font-size: 0.76rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 280px;
        }
        .metric-chip {
          background: rgba(6, 182, 212, 0.15);
          color: var(--accent-cyan);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.72rem;
          white-space: nowrap;
        }
        .elo-chip {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .composite-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 80px;
        }
        .comp-score-bold {
          font-weight: 800;
          color: #fff;
          font-size: 0.9rem;
        }
        .comp-score-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          overflow: hidden;
        }
        .comp-bar-fill {
          height: 100%;
          border-radius: 9999px;
        }
      `})]})}function qp(){const[h,p]=U.useState("landing"),[m,S]=U.useState([]),[R,P]=U.useState({}),[Z,_]=U.useState(!1),[O,G]=U.useState(""),[W,re]=U.useState(null);U.useEffect(()=>{ee()},[]);const ee=async()=>{try{const V=await Le.getModels();V.models&&S(V.models),V.criticWeights&&P(V.criticWeights)}catch(V){console.error("Failed to load models:",V)}},ce=(V="",A=null)=>{G(V),A&&Array.isArray(A)&&re(A),p("workspace")};return a.jsxs("div",{className:"app-container",children:[a.jsx(Op,{activeView:h,setActiveView:p,onOpenSettings:()=>_(!0)}),a.jsxs("div",{className:"main-content",children:[h==="landing"&&a.jsx(Ap,{onStartWorkspace:()=>ce(""),onSelectSamplePrompt:V=>ce(V)}),h==="workspace"&&a.jsx(Wp,{models:m,criticWeights:R,initialPrompt:O,initialModelIds:W,onOpenSettings:()=>_(!0)}),h==="benchmark"&&a.jsx(Kp,{onSendToWorkspace:(V,A)=>ce(V,A)}),h==="dashboard"&&a.jsx(Vp,{models:m}),h==="legal"&&a.jsx(Hp,{onSendToWorkspace:V=>ce(V)})]}),a.jsx(Qp,{isOpen:Z,onClose:()=>_(!1),models:m,onSaveModels:V=>S(V),criticWeights:R,onSaveCriticWeights:V=>P(V)})]})}vm.createRoot(document.getElementById("root")).render(a.jsx(sd.StrictMode,{children:a.jsx(qp,{})}));
