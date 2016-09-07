!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["xr.js"]=t():e["xr.js"]=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="/",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){return{status:e.status,response:e.response,data:t,xhr:e}}function u(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];for(var o in n)if({}.hasOwnProperty.call(n,o)){var u=n[o];if("object"===("undefined"==typeof u?"undefined":d(u)))for(var a in u)({}).hasOwnProperty.call(u,a)&&(e[a]=u[a])}return e}function a(e){T=u({},T,e)}function s(e,t){return(e&&e.promise?e.promise:T.promise||m.promise)(t)}function i(e){return s(e,function(t,n){var r=u({},m,T,e),a=r.xmlHttpRequest();a.withCredentials=r.withCredentials,r.abort&&e.abort(function(){n(o(a)),a.abort()}),a.open(r.method,r.params?r.url.split("?")[0]+"?"+(0,c["default"])(r.params):r.url,!0),a.addEventListener(l.LOAD,function(){if(a.status>=200&&a.status<300){var e=null;a.responseText&&(e=r.raw===!0?a.responseText:r.load(a.responseText)),t(o(a,e))}else n(o(a))}),a.addEventListener(l.ABORT,function(){return n(o(a))}),a.addEventListener(l.ERROR,function(){return n(o(a))}),a.addEventListener(l.TIMEOUT,function(){return n(o(a))});for(var s in r.headers)({}).hasOwnProperty.call(r.headers,s)&&a.setRequestHeader(s,r.headers[s]);for(var s in r.events)({}).hasOwnProperty.call(r.events,s)&&a.addEventListener(s,r.events[s].bind(null,a),!1);var i="object"!==d(r.data)||r.raw?r.data:r.dump(r.data);void 0!==i?a.send(i):a.send()})}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var f=n(2),c=r(f),p={GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE",PATCH:"PATCH",OPTIONS:"OPTIONS"},l={READY_STATE_CHANGE:"readystatechange",LOAD_START:"loadstart",PROGRESS:"progress",ABORT:"abort",ERROR:"error",LOAD:"load",TIMEOUT:"timeout",LOAD_END:"loadend"},m={method:p.GET,data:void 0,headers:{Accept:"application/json","Content-Type":"application/json"},dump:JSON.stringify,load:JSON.parse,xmlHttpRequest:function(){return new XMLHttpRequest},promise:function(e){return new Promise(e)},withCredentials:!1},T={};i.assign=u,i.encode=c["default"],i.configure=a,i.Methods=p,i.Events=l,i.defaults=m,i.get=function(e,t,n){return i(u({url:e,method:p.GET,params:t},n))},i.put=function(e,t,n){return i(u({url:e,method:p.PUT,data:t},n))},i.post=function(e,t,n){return i(u({url:e,method:p.POST,data:t},n))},i.patch=function(e,t,n){return i(u({url:e,method:p.PATCH,data:t},n))},i.del=function(e,t){return i(u({url:e,method:p.DELETE},t))},i.options=function(e,t){return i(u({url:e,method:p.OPTIONS},t))},t["default"]=i},function(e,t){"use strict";var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,o){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(o){var u=encodeURIComponent(n(o))+r;return Array.isArray(e[o])?e[o].map(function(e){return u+encodeURIComponent(n(e))}).join(t):u+encodeURIComponent(n(e[o]))}).join(t):o?encodeURIComponent(n(o))+r+encodeURIComponent(n(e)):""}}])});