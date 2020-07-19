/*! (C) Copyright 2020 LanguageTooler GmbH. All rights reserved. */
class Synonyms{static load(t,e,r){return-1===config.SUPPORTED_SYNONYM_LANGUAGES.indexOf(e)?Promise.reject(new Error("Sorry, synonyms are not supported in this language.")):this._request(t,e,r)}static _request(t,e,r){const s=t.word,n=this._prepareWord(t.word),o=this._getFromCache(n,t.beforeText,t.afterText,e,r);if(o)return Promise.resolve(o);this._abortCurrentRequest(),clearTimeout(this._timeout),this._currentRequest=new AbortController;const i={method:"get",mode:"cors",signal:this._currentRequest.signal};this._timeout=window.setTimeout(()=>this._abortCurrentRequest,this.HTTP_TIMEOUT);let a=`https://synonyms.languagetool.org/synonyms/${e}/${encodeURIComponent(n)}`+`?before=${encodeURIComponent(t.beforeText)}&after=${encodeURIComponent(t.afterText)}`;return r&&(a+=`motherTongue=${r}`),fetch(a,i).then(t=>t.json()).then(o=>{if(!o||!o.synsets)throw new Error("Error loading synonyms.");const i=this._buildSynonymSets(n,s,o),a={dataSource:o.dataSource,synonymSets:i};return this._setInCache(n,t.beforeText,t.afterText,e,r,a),a}).finally(()=>{this._currentRequest=null,clearTimeout(this._timeout)})}static _prepareWord(t){return t=t.trim(),isAllUppercase(t)?t.charAt(0)+t.substr(1).toLowerCase():t}static _containsSynonymObj(t,e){return t.some(t=>t.word===e.word)}static _buildSynonymSets(t,e,r){const s=[],n=isAllUppercase(e)&&e.length>3;return r.synsets.forEach(r=>{if(!r.terms.length)return;let o="",i="";r.terms[0].term.match(this.IS_ONLY_HINT_REGEXP)?(o=`${e} ${r.terms[0].term}`,i=r.terms[0].term.replace(/[\(\)]/g,""),r.terms.shift()):o=r.terms[0].term;const a=[];if(r.terms.forEach(e=>{let r=e.term.match(this.HINT_REGEXP)||[];if((r=(r=r.map(t=>t.replace(this.TERM_REGEXP,"").trim())).filter(t=>!t.match(/similar/))).indexOf("(antonym)")>-1)return;let s=e.term.replace(this.HINT_REGEXP,"").trim();s.match(/[\!\?\.\,\:\;]/)||s.toLowerCase()!==t.toLowerCase()&&(n&&(s=s.toUpperCase()),a.push({word:s,hints:r}))}),!a.length)return;const h=s.find(t=>t.type===i&&t.title===o&&t.synonyms.find(t=>this._containsSynonymObj(a,t)));if(h)a.forEach(t=>{this._containsSynonymObj(h.synonyms,t)||h.synonyms.push(t)}),h.synonyms.sort((t,e)=>t.hints.length>e.hints.length?1:-1);else{if(i){if(s.filter(t=>t.type===i).length>=3)return}s.push({title:o,type:i,synonyms:a})}}),s}static _abortCurrentRequest(){this._currentRequest&&(this._currentRequest.abort(),this._currentRequest=null)}static _getFromCache(t,e,r,s,n){const o=this._cache.find(o=>o.word===t&&o.beforeText===e&&o.afterText===r&&o.language===s&&o.motherTongue===n);if(o)return o.result}static _setInCache(t,e,r,s,n,o){this._cache.unshift({word:t,beforeText:e,afterText:r,language:s,motherTongue:n,result:o}),this._cache.length=Math.min(this._cache.length,100)}}Synonyms.HTTP_TIMEOUT=5e3,Synonyms._currentRequest=null,Synonyms._cache=[],Synonyms.IS_ONLY_HINT_REGEXP=/^\([^\)]+\)$/,Synonyms.TERM_REGEXP=/\sterm/,Synonyms.HINT_REGEXP=/(\s|^)\((.+?)\)/g;