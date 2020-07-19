/*! (C) Copyright 2020 LanguageTooler GmbH. All rights reserved. */
function isCEElement(t){return t.isContentEditable||"BODY"===t.nodeName&&hasFirefoxDesignMode(t)}function isFormElement(t){return isTextArea(t)||isTextInput(t)}function isTextArea(t){return t instanceof HTMLTextAreaElement}function isTextInput(t){return t instanceof HTMLInputElement&&("text"===t.type||"search"===t.type)}function isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}function isTextNode(t){return t.nodeType===Node.TEXT_NODE}function wait(t=25,e=null){return new Promise(n=>setTimeout(()=>n(e),t))}function setAnimationFrameTimeout(t,e){let n=null,o=!1;const r=window.setTimeout(()=>{o||(n=window.requestAnimationFrame(()=>t()))},e);return{destroy:()=>{o=!0,window.clearTimeout(r),n&&window.cancelAnimationFrame(n)}}}function setAnimationFrameInterval(t,e){let n=null,o=!1;const r=()=>{n=setAnimationFrameTimeout(()=>{o||(t(),r())},e)};return r(),{destroy:()=>{o=!0,n&&(n.destroy(),n=null)}}}function isIntersect(t,e,n,o,r=!1){return r?t<=o&&e>=n:t<o&&e>n}function isRectsEqual(t,e){return t.top===e.top&&t.right===e.right&&t.bottom===e.bottom&&t.left===e.left}function isRectContainsRect(t,e){return t.left<=e.left&&t.right>=e.right&&t.top<=e.top&&t.bottom>=e.bottom}function isRectsIntersect(t,e){return!(t.left>e.right||t.right<e.left||t.top>e.bottom||t.bottom<e.top)}function isPointInsideRect(t,e,n){return void 0===n&&(n=e.y,e=e.x),t.left<=e&&e<=t.right&&t.top<=n&&n<=t.bottom}function contains(t,e){return"object"==typeof e?t!==e&&t.contains(e):t instanceof Element&&!!t.querySelector(e)}function closestElement(t,e){if(t.closest)return t.closest(e);{let n=t;for(;n;){if(n.matches(e))return n;n=n.parentElement}}return null}function getFrameElement(t){return t.frameElement}function isScrollable(t){const e=window.getComputedStyle(t);return"auto"===e.overflowY||"scroll"===e.overflowY}function hasFirefoxDesignMode(t){return Boolean(t.ownerDocument&&"on"===t.ownerDocument.designMode&&"read-write"===t.ownerDocument.defaultView.getComputedStyle(t)["-moz-user-modify"])}function hasFocus(t){return t.matches(":focus")||"BODY"===t.nodeName&&hasFirefoxDesignMode(t)&&t.ownerDocument.hasFocus()}const getVisibleTopAndBottom=(()=>{const t=(t,e,n,o)=>{const r=t.ownerDocument;let i=r.elementFromPoint(n,o);if(!i)return!1;if(t===i||t.contains(i))return!0;if(!e.length)return!1;const a=e.find(t=>t.contains(i));return a&&(i=r.elementsFromPoint(n,o).find(t=>!a.contains(t))||null),Boolean(i&&(t===i||t.contains(i)))};return(e,n,o,r)=>{const i=n.getPaddingBox(e,!1);if(i.bottom<0||i.top>o)return{top:0,bottom:i.height};let a=[];r&&(a=Array.from(e.ownerDocument.querySelectorAll(r)));let s=i.left+Math.round(i.width/100*33);const l=Math.max(i.top,0);let c=l;for(;;){if(t(e,a,s,c)){if(c===l)break;for(;c--;)if(!t(e,a,s,c)){c++;break}break}if(c===i.bottom)break;c=Math.min(i.bottom,c+6)}const u=Math.min(i.bottom,o);let f=u;for(;;){if(t(e,a,s,f-1)){if(f===u)break;for(;f++<u;)if(!t(e,a,s,f-1)){f--;break}break}if(f===c)break;f=Math.max(c,f-6)}return{top:Math.round(Math.max(0,c-i.top)),bottom:Math.round(Math.max(0,f-i.top))}}})();function isVisible(t){return(t.offsetWidth>0||t.offsetHeight>0)&&"hidden"!==new DomMeasurement(document).getStyle(t,"visibility")}function fadeOut(t,e){let n=1;const o=new DomMeasurement(t.ownerDocument),r=setAnimationFrameInterval(()=>{if((n-=.08)<=0)return r.destroy(),void(e&&e());o.setStyles(t,{opacity:n+" !important"})},16)}function fadeOutAndRemove(t,e){let n=1;const o=new DomMeasurement(t.ownerDocument),r=setAnimationFrameInterval(()=>{if((n-=.08)<=0)return t.remove(),r.destroy(),void(e&&e());o.setStyles(t,{opacity:n+" !important"})},16)}function dispatchCustomEvent(t,e,n={}){const o=new CustomEvent(e,{detail:n});t.dispatchEvent(o)}function addUseCaptureEvent(t,e,n){const o=t instanceof HTMLDocument?t:t.ownerDocument,r=e=>{if(!e.target)return;const o=e.target;(isElementNode(o)||isTextNode(o))&&t.contains(o)&&n(e)};return o.defaultView.addEventListener(e,r,!0),{destroy(){o.defaultView.removeEventListener(e,r,!0)}}}function observeScrollableAncestors(t,e){const n=new DomMeasurement(t.ownerDocument);const o=function(t){const e=[];let o=t.parentElement;for(;o&&o!==document.body&&o!==document.documentElement;){const t=n.getStyles(o,["overflow-x","overflow-y"]),r=t["overflow-x"],i=t["overflow-y"];"auto"!==i&&"scroll"!==i&&"auto"!==r&&"scroll"!==r||e.push(o),o=o.parentElement}return e}(t);let r=!1;const i=()=>{r||(r=!0,window.requestAnimationFrame(()=>{r=!1,e()}))};return o.forEach(t=>{t.addEventListener("scroll",i)}),{destroy(){o.forEach(t=>{t.removeEventListener("scroll",i)}),r=!0}}}const onElementDisabled=(()=>{let t;const e=[];return(n,o)=>{e.push({element:n,callback:o}),t=t||window.setInterval(()=>{const n=[];e.forEach(t=>{(t.element.readOnly||t.element.disabled||!isVisible(t.element))&&(n.push(t),t.callback(t.element))}),n.forEach(t=>{e.splice(e.indexOf(t),1)}),e.length||(clearInterval(t),t=null)},600)}})(),onElementRemoved=(()=>{let t;const e=[];return(n,o)=>{e.push({element:n,callback:o}),t||(t=new MutationObserver(n=>{const o=[];e.forEach(t=>{n.find(e=>Array.prototype.indexOf.call(e.removedNodes,t.element)>-1)&&(o.push(t),t.callback(t.element))}),o.forEach(t=>{e.splice(e.indexOf(t),1)}),e.length||(t.disconnect(),t=null)})).observe(document.documentElement,{childList:!0,subtree:!0})}})();function getTextsDiff(t,e){if(t===e)return null;let n=0;const o=Math.max(t.length,e.length);for(n=0;n<o&&t[n]===e[n];n++);let r=0;const i=Math.min(t.length,e.length);for(;n+r<i;){if(t[t.length-r-1]!==e[e.length-r-1])break;r++}return{from:n,oldFragment:t.substring(n,t.length-r),newFragment:e.substring(n,e.length-r)}}function isTextsCompletelyDifferent(t,e){const n=t.split("\n"),o=e.split("\n");for(const t of n)if(o.some(e=>e===t))return!1;return!0}function getParagraphsDiff(t,e){const n=[],o=t.split("\n"),r=e.split("\n");let i=0;const a=Math.max(o.length,r.length);for(i=0;i<a&&o[i]===r[i];i++);let s=0;const l=Math.min(o.length,r.length);for(;i+s<l;){if(o[o.length-s-1]!==r[r.length-s-1])break;s++}let c=0;for(let t=0;t<i;t++)c+=o[t].length+1;let u=c;for(let t=i;t<a-s;t++){const e=t<o.length-s?o[t]:null,i=t<r.length-s?r[t]:null;e===i&&c===u||n.push({oldText:e,newText:i,oldOffset:c,newOffset:u,textDiff:getTextsDiff(e||"",i||"")}),null!==e&&(c+=e.length+1),null!==i&&(u+=i.length+1)}if(c!==u)for(let t=s-1;t>=0;t--){const e=o[o.length-t-1],i=r[r.length-t-1];n.push({oldText:e,newText:i,oldOffset:c,newOffset:u,textDiff:null}),c+=e.length+1,u+=i.length+1}return n}function matchAll(t,e,n=0){const o=[];e.lastIndex=n;let r=e.exec(t);for(;r;)o.push(r),r=e.exec(t);return o}function includesWhiteSpace(t){return/\s/.test(t)}const isAllUppercase=function(){const t=/^[A-ZÈÉÊÁÀÂÓÒÔÚÙÛÍÌÎÄÜÖ]+[A-ZÈÉÊÁÀÂÓÒÔÚÙÛÍÌÎÄÜÖ\-!?#@=%().:;<>'’´`"”“*+,\s]+[A-ZÈÉÊÁÀÂÓÒÔÍÌÎÄÜÖ]$/;return function(e){return t.test(e)}}(),normalizeWhitespaces=function(){const t=/[\u0008\u0009\u0020\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200F\u3000]/g;return function(e){return e.replace(t," ")}}(),isZWC=function(){const t=/^[\u200B\u200C\u200D]+$/;return function(e){return t.test(e)}}(),removeZWC=function(){const t=/[\u200B\u200C\u200D]/g;return function(e){return e.replace(t,"")}}();function translateElement(t,e){"string"==typeof t&&(t=document.querySelector(t)),"string"==typeof e&&(e={key:e}),e.isHTML?t.innerHTML=i18nManager.getMessage(e.key,e.interpolations):e.attr?t[e.attr]=i18nManager.getMessage(e.key,e.interpolations):t.textContent=i18nManager.getMessage(e.key,e.interpolations)}function translateSection(t){Array.from(t.querySelectorAll("[data-t]")).forEach(t=>{translateElement(t,t.getAttribute("data-t"))}),Array.from(t.querySelectorAll("[data-t-placeholder]")).forEach(t=>{translateElement(t,{key:t.getAttribute("data-t-placeholder"),attr:"placeholder"})}),Array.from(t.querySelectorAll("[data-t-html]")).forEach(t=>{translateElement(t,{key:t.getAttribute("data-t-html"),isHTML:!0})}),Array.from(t.querySelectorAll("[data-t-title]")).forEach(t=>{translateElement(t,{key:t.getAttribute("data-t-title"),attr:"title"})})}function uniq(t){const e=[];return t.forEach(t=>{-1===e.indexOf(t)&&e.push(t)}),e}function isSameObjects(t,e){return t===e||JSON.stringify(t)===JSON.stringify(e)}function clone(t){if(null===t||"object"!=typeof t)return t;if(t instanceof Date)return new Date(t);if(t instanceof RegExp)return new RegExp(t);const e=Array.isArray(t)?[]:{};for(const n in t)e[n]=clone(t[n]);return e}function waitFor(t,e=400,n=15){return new Promise((o,r)=>{let i=0;const a=()=>{const e=t();null!==e&&void 0!==e&&(clearInterval(s),o(e)),++i>=n&&(clearInterval(s),r())},s=setInterval(a,e);a()})}function getRangeAtPoint(t){if(document.caretRangeFromPoint)return document.caretRangeFromPoint(t.x,t.y);if(document.caretPositionFromPoint){const e=document.caretPositionFromPoint(t.x,t.y);if(!e||!e.offsetNode)return null;try{const t=new Range;return t.setStart(e.offsetNode,e.offset),t.setEnd(e.offsetNode,e.offset),t}catch(t){return null}}return null}function isSameRange(t,e){return!(!t||!e||t.startContainer!==e.startContainer||t.startOffset!==e.startOffset||t.endOffset!==e.endOffset||t.endContainer!==e.endContainer)}function getSelectedText(){const t=document.activeElement,e=t?t.tagName.toLowerCase():null;return"textarea"===e||"input"===e&&/^(?:text|search|password|tel|url)$/i.test(t.type)&&"number"==typeof t.selectionStart?t.value.slice(t.selectionStart,t.selectionEnd):window.getSelection&&window.getSelection()?window.getSelection().toString():""}function loadHTML(t){const e=EnvironmentAdapter.getURL(t);return fetch(e).then(t=>t.text())}function loadStylesheet(t){const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.href=EnvironmentAdapter.getURL(t),(document.head||document.body).appendChild(e)}function generateStackTrace(t){if(!t.stack)return;let e=[];if(t.stack.split(/\n/).forEach(t=>{const n=t.match(/([\w_<>]+)\s+\(.+?([\w_\-]+\.(js|html))/);n&&e.push(`${n[2]}:${n[1]}`)}),!e.length){const n=t.stack.match(/([\w_\-]+\.(js|html))/);n&&e.push(n[1])}return e.join(",").substr(0,140)}function bindAndCatch(t,e=null){return function(){if(BrowserDetector.isFirefox())return t.apply(e,arguments);try{return t.apply(e,arguments)}catch(e){let n=t.name;const o=generateStackTrace(e);throw o&&(n+="|"+o),window.event&&window.event.type&&(n+="|"+window.event.type),Tracker.trackError("js",e.message,n),e}}}function isLTAvailable(t){try{return t.document.documentElement.hasAttribute("data-lt-installed")}catch(t){}return!1}function isCssContentScriptsLoaded(t){const e=t.document.createElement("div");e.className="lt-test-element",t.document.documentElement.appendChild(e);const n="absolute"===t.getComputedStyle(e).position;return e.remove(),n}function getCountdown(t){let e=t-Date.now();e<0&&(e=0);const n=Math.floor(e/1e3%60),o=Math.floor(e/1e3/60%60);return`${pad(Math.floor(e/1e3/60/60))}:${pad(o)}:${pad(n)}`}function pad(t){const e=t.toString();return 1===e.length?"0"+e:e}function goToManagedLogin(t,e){const n=window;let o=null,r=null;const i=function(t){const[n,o]=JSON.parse(t);n&&o&&(s(),e(n,o))},a=t=>{t.origin.match(/^chrome|moz/)&&i(t.data)},s=function(){o&&window.clearInterval(o),n.removeEventListener("message",a);try{localStorage.removeItem("managedLoginCredentials")}catch(t){}r&&r.close()};s(),o=window.setInterval(()=>{let t=null;try{t=localStorage.getItem("managedLoginCredentials")}catch(t){}t&&i(t)},300),n.addEventListener("message",a);const l=browser.runtime.getURL("/privacyConfirmationDialog/managedLoginRedirectUri.html"),c=t+(t.includes("?")?"&":"?")+"redirect_uri="+encodeURIComponent(l);r=window.open(c,"_blank","width=640,height=480,scrollbars=yes,resizable=yes")}function dataURItoBlob(t){const e=atob(t.split(",")[1]),n=t.split(",")[0].split(":")[1].split(";")[0],o=new ArrayBuffer(e.length),r=new Uint8Array(o);for(let t=0;t<e.length;t++)r[t]=e.charCodeAt(t);return new Blob([o],{type:n})}const getColorLuminosity=function(){const t=/ /g,e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i,n=/^#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})$/i,o=/^rgba?\(/i,r=/rgba?\((\d+),(\d+),(\d+)/i,i=/^hsla?\(/i,a=/hsla?\(\d+,\d+%,(\d+)%/i;function s(t,e,n){const o=Math.max(t,e,n)/255,r=Math.min(t,e,n)/255;return Math.round((o+r)/2*100)}return function(l){if("string"!=typeof l)return s(l[0],l[1],l[2]);if(l=l.replace(t,""),e.test(l)){const t=n.exec(l);if(t){return s(parseInt(2===t[1].length?t[1]:t[1]+t[1],16),parseInt(2===t[2].length?t[2]:t[2]+t[2],16),parseInt(2===t[3].length?t[3]:t[3]+t[3],16))}}else if(o.test(l)){const t=r.exec(l);if(t){return s(+t[1],+t[2],+t[3])}}else if(i.test(l)){const t=a.exec(l);if(t)return+t[1]}return 100}}();function isTinyMCE(t){return t.classList.contains("mce-content-body")||t.classList.contains("mceContentBody")}function isSlateEditor(t){return t.hasAttribute("data-slate-editor")}function isQuillEditor(t){return t.classList.contains("ql-editor")}function isProseMirror(t){return t.classList.contains("ProseMirror")}function isGutenberg(t){return t.classList.contains("editor-rich-text__editable")||t.classList.contains("block-editor-rich-text__editable")}function isTrixEditor(t){return"trix-editor"===t.nodeName.toLowerCase()}function isGoogleDocsEditor(t){return t.classList.contains("kix-page")}function getCurrentUrl(){if("about:blank"===location.href||"about:srcdoc"===location.href)try{return window.parent.location.href}catch(t){}return location.href}function getDomain(t,e=t){t&&!/^([a-z\-]+:\/\/)/i.test(t)&&(t="http://"+t);try{return new URL(t).hostname}catch(t){return e}}function getCurrentDomain(){const t=document.location||document.defaultView.location;if(t&&t.hostname)return t.hostname.replace(/^www\./,"");try{return window.parent.location.hostname.replace(/^www\./,"")}catch(t){}return""}function getMainPageDomain(){let t;return window.parent!==window&&document.referrer&&(t=getDomain(document.referrer)),t||(t=getCurrentDomain()),t}function getSubdomains(t){const e=[t];for(;t.split(".").length>2;){const n=t.indexOf(".");t=t.substr(n+1),e.push(t)}return e}function hasTextNodeChildWithContent(t){return Array.from(t.childNodes).some(t=>Boolean(t.nodeType==Node.TEXT_NODE&&t.nodeValue&&t.nodeValue.trim()))}"undefined"!=typeof module&&(module.exports.matchAll=matchAll,module.exports.getColorLuminosity=getColorLuminosity);