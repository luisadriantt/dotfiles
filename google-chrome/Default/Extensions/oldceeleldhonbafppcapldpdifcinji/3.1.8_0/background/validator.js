/*! (C) Copyright 2020 LanguageTooler GmbH. All rights reserved. */
class Validator{static _constructor(){this._isInitialized||(this._checkForException=this._checkForException.bind(Validator),this._isInitialized=!0)}static getServerBaseUrl(e=!1,t=!0){const{hasPaidSubscription:r}=this._storageController.getUIState(),s=t&&(e?this._usePartialValidationFallbackServer:this._useValidationFallbackServer)&&!this._storageController.isUsedCustomServer();return this._storageController.isUsedCustomServer()?this._storageController.getCustomServerUrl():r?s?config.PREMIUM_FALLBACK_SERVER_URL:config.PREMIUM_SERVER_URL:s?config.MAIN_FALLBACK_SERVER_URL:config.MAIN_SERVER_URL}static _getServerFullUrl(e,t=!1,r=!1){let s=this.getServerBaseUrl(t);s+=s.endsWith("/")?"check":"/check",s+=`?instanceId=${encodeURIComponent(e.instanceId)}`,s+="&c=1",r&&(s+="&languageChanged=true");const{languageDetectionTest:i}=this._storageController.getTestFlags();i&&(s+=`&ld=${encodeURIComponent(i)}`);const a=EnvironmentAdapter.getVersion();return s+=`&v=${encodeURIComponent(a)}`}static _abortValidationRequest(e){this._validationAbortControllers[e]&&(this._validationAbortControllers[e].abort(),delete this._validationAbortControllers[e])}static _abortPartialValidationRequest(e){this._partialValidationAbortControllers[e]&&(this._partialValidationAbortControllers[e].abort(),delete this._partialValidationAbortControllers[e])}static _prepareText(e){return e.replace(this.ZWNJ_REGEXP,this.ZWS)}static _joinInChunks(e,t=config.PARTIAL_VALIDATION_CHUNK_LENGTH){(e=[...e]).sort((e,t)=>t.text.length-e.text.length);const r=[],s=[];for(const i of e){let e=-1;for(let a=0;a<r.length;a++)s[a]+i.text.length>t||(-1===e||s[e]<s[a])&&(e=a);-1!==e?(r[e].push(i),s[e]+=i.text.length):(r.push([i]),s.push(i.text.length))}return r}static _getRequestData(e,t,r,s){const i=new URLSearchParams,{username:a,password:E,token:n,motherTongue:o,enVariant:_,deVariant:l,ptVariant:u,caVariant:d}=this._storageController.getSettings(),{hasPaidSubscription:A}=this._storageController.getUIState(),R={text:e};(s.recipientInfo.address||s.recipientInfo.fullName)&&(R.metaData={EmailToAddress:s.recipientInfo.address,FullName:s.recipientInfo.fullName}),i.append("data",JSON.stringify(R)),A&&a&&E?(i.append("username",a),i.append("password",E)):A&&a&&n&&(i.append("username",a),i.append("tokenV2",n)),i.append("textSessionId",s.instanceId),A||i.append("enableHiddenRules","true"),o&&i.append("motherTongue",o),"normal"!==s.checkLevel&&i.append("level",s.checkLevel);if(t)i.append("language",t.code);else{i.append("language","auto"),i.append("noopLanguages",(r||[]).join(",")),i.append("preferredLanguages",(r||[]).join(","));const e=this._getPreferredVariants(_,l,u,d);e.length>0&&i.append("preferredVariants",e.toString())}return i.append("disabledRules","WHITESPACE_RULE"),i.append("useragent",BrowserDetector.getUserAgentIdentifier()),i}static _getPreferredVariants(e,t,r,s){const i=[];return e&&i.push(e),t&&i.push(t),r&&i.push(r),s&&i.push(s),i}static _getValidationRequestData(e,t,r,s){const i=this._getRequestData(e,t,r,s);return i.append("mode","textLevelOnly"),i}static _getPartialValidationRequestData(e,t,r,s,i){const a=this._getRequestData(e,t,r,s);return a.append("mode","allButTextLevelOnly"),a.append("allowIncompleteResults",i.toString()),a}static _sendRequest(e,t,r=config.VALIDATION_REQUEST_TIMEOUT){const s=fetch(e,t).catch(t=>{throw"AbortError"===t.name?{reason:"AbortError",status:0,message:"",response:t.message||""}:{reason:"ConnectionError",status:0,message:i18nManager.getMessage("connectionProblem",e.replace(/\?.*/,""))+" (#1, code="+t.status+")",response:t.message||""}}).then(this._checkForException).then(e=>e.json()),i=new Promise((t,s)=>{setTimeout(()=>{s({reason:"TimeoutError",status:0,message:i18nManager.getMessage("connectionProblem",e.replace(/\?.*/,""))+" (#1, timeout)",response:""})},r)});return Promise.race([s,i])}static _checkForException(e){return e.ok?e:e.text().catch(()=>"").then(t=>{const r=t.toLowerCase();if(r.includes("too many error"))throw{status:e.status,message:i18nManager.getMessage("tooManyErrors"),response:t};if(413===e.status||r.includes("your text exceeds the limit"))throw{status:e.status,message:i18nManager.getMessage("textTooLong"),response:t};if(t.toLowerCase().includes("checking took longer than"))throw{status:e.status,message:i18nManager.getMessage("timeoutError",[e.url?e.url.replace(/\?.*/,"?..."):"unknown"]),response:t};if(403===e.status){if(r.includes("client request size limit")||r.includes("client request limit")||r.includes("ip request limit")||r.includes("ip request size limit"))throw{status:e.status,message:i18nManager.getMessage("tooManyRequests"),response:t};if(r.includes("authexception"))throw{status:e.status,message:i18nManager.getMessage("invalidUsernameOrPassword"),response:t};throw{status:e.status,message:i18nManager.getMessage("accessDeniedError2"),response:t}}if(r.includes("checking took longer than"))throw{status:e.status,message:i18nManager.getMessage("timeoutError",[e.url?e.url.replace(/\?.*/,"?..."):"unknown"]),response:t};throw{status:e.status,message:i18nManager.getMessage("unknownError")+" ("+e.status+")",response:t}})}static _isConnectionOrServerIssue(e){return config.SWITCH_TO_FALLBACK_SERVER_ERRORS.includes(e.status)||["ConnectionError","TimeoutError"].includes(e.reason)}static _getGraphemesCount(e,t,r=0){for(let s=r;s<e.length;s++){if(t<=0)return s-r;t-=e[s].length}return e.length-r}static _getCodepointsCount(e,t,r=0){let s=0;for(let i=r;i<Math.min(e.length,r+t);i++)s+=e[i].length;return s}static _correctMatches(e,t,r){if(t!==r){const s=new GraphemeSplitter,i=s.splitGraphemes(t),a=s.splitGraphemes(r);for(const t of e){const e=Validator._getGraphemesCount(i,t.offset),r=Validator._getGraphemesCount(i,t.length,e);t.offset=Validator._getCodepointsCount(a,e),t.length=Validator._getCodepointsCount(a,r,e)}}return e}static _getLeftText(e,t,r,s=10){let i=Math.max(t-s,0);if(r){const r=e.lastIndexOf("\n",t);r>=i&&(i=r+1)}let a=e.substring(i,t);return 0===i||r&&"\n"===e[i-1]||(a="..."+a),a}static _getRightText(e,t,r,s=10){let i=Math.min(t+s,e.length);if(r){const r=e.indexOf("\n",t);-1!==r&&r<=i&&(i=r)}let a=e.substring(t,i);return i===e.length||r&&"\n"===e[i]||(a+="..."),a}static _transformMatches(e,t,r,s=!1){return e.map((e,i)=>{const a=this.SPELLING_RULES_ID.some(t=>e.rule.id.includes(t)),E=this.STYLE_ISSUE_TYPES.some(t=>e.rule.issueType===t),n="typographical"===e.rule.issueType&&"CASING"!==e.rule.category.id||"PUNCTUATION"===e.rule.category.id||"TYPOGRAPHY"===e.rule.category.id||e.rule.category.name.includes("KOMMA"),o=t.substr(e.offset,e.length),_=`${Validator._getLeftText(t,e.offset,s)}|${o}|${Validator._getRightText(t,e.offset+e.length,s)}`,l=e.replacements.map(e=>({value:e.value,prefix:e.prefix,suffix:e.suffix,type:e.type,shortDescription:e.shortDescription}));return{id:i+1,isPartialValidation:s,rule:e.rule,isSpellingError:a,isStyleError:E,isPunctuationError:n,contextForSureMatch:e.contextForSureMatch,language:{code:r.code,name:r.name},description:e.message,shortDescription:e.shortMessage,offset:e.offset,length:e.length,originalPhrase:o,contextPhrase:_,fixes:l}})}static _adjustErrors(e,t,r,s){const i=this._storageController.getValidationSettings(r,"unknown"),a=s.split(" ").filter(e=>e);return e.filter(e=>{if(!i.shouldCapitalizationBeChecked){if(e.fixes.some(t=>t.value.toLowerCase()===e.originalPhrase.toLowerCase()))return!1;if("UPPERCASE_SENTENCE_START"===e.rule.id)return!1}if(e.fixes=e.fixes.filter(t=>t.value!=="("+e.originalPhrase+")"&&"(suggestion limit reached)"!==t.value),e.language.code.startsWith("en")&&isAllUppercase(e.originalPhrase)&&e.fixes.forEach(t=>{t.value.toLowerCase()!==e.originalPhrase.toLowerCase()&&(t.value=t.value.toUpperCase())}),"PT_CLICHE_REPLACE"!==e.rule.id&&"PT_WORDINESS_REPLACE"!==e.rule.id||e.fixes.forEach(t=>{(t.value.startsWith("REFORMULAR")||t.value.startsWith("APAGAR")||t.value.startsWith("ESPECIFICAR"))&&(e.description=e.description.replace(/\sÉ preferível dizer.+(REFORMULAR|APAGAR|ESPECIFICAR).+$/,""),t.value="")}),this.EMAIL_SIGNATURE_SEPARATOR_REGEXP.test(e.originalPhrase))return!1;if(this.ZWS_REGEXP.test(e.originalPhrase))return!1;if(e.rule.id.endsWith("WORD_REPEAT_BEGINNING_RULE")&&this.ONLY_NUMBERS_REGEXP.test(e.originalPhrase))return!1;if("LEERZEICHEN_HINTER_DOPPELPUNKT"===e.rule.id&&this.COLON_WHITESPACE_REGEXP.test(e.originalPhrase))return!1;const r=t.substring(e.offset-25,e.offset),s=t.substring(e.offset+e.length,e.offset+e.length+25);if("DE_CASE"===e.rule.id&&this.BULLET_POINT_REGEXP.test(r))return!1;if("DE_CASE"===e.rule.id&&this.NUMBER_WITH_PARENTHESIS_AT_END_REGEXP.test(r))return!1;if("DE_CASE"===e.rule.id&&this.PIPE_AT_END_REGEXP.test(r))return!1;if("DE_CASE"===e.rule.id&&this.MARKDOWN_HEADLINE_REGEXP.test(r))return!1;if("DE_CASE"===e.rule.id&&this.EMOJI_SENTENCE_START_REGEXP.test(r))return!1;if("PUNKT_ENDE_DIREKTE_REDE"===e.rule.id&&!s.trim())return!1;if("LEERZEICHEN_HINTER_DOPPELPUNKT"===e.rule.id&&this.MARKDOWN_INLINE_FORMAT_AT_BEGINNING_REGEXP.test(s))return!1;if(e.rule.id.endsWith("UNPAIRED_BRACKETS")&&("!"===e.originalPhrase||"?"===e.originalPhrase)&&(r.endsWith("!")||r.endsWith("?")))return!1;if(e.rule.id.endsWith("UNPAIRED_BRACKETS")&&this.ONE_LETTER_AT_END_REGEXP.test(r))return!1;if(e.rule.id.endsWith("UNPAIRED_BRACKETS")&&this.NUMBER_WITH_DOT_AT_END_REGEXP.test(r))return!1;if("SENTENCE_WHITESPACE"===e.rule.id&&r.endsWith("{!"))return!1;if("SENTENCE_WHITESPACE"===e.rule.id&&this.SINGLE_UPPERCASE_LETTER_REGEXP.test(e.originalPhrase)&&this.ABBREVIATION_AT_END_REGEXP.test(r))return!1;if("SENTENCE_WHITESPACE"===e.rule.id&&"net"===e.originalPhrase.toLowerCase())return!1;if("COMMA_PARENTHESIS_WHITESPACE"===e.rule.id&&this.NET_AT_BEGINNING_REGEXP.test(s))return!1;if("COMMA_PARENTHESIS_WHITESPACE"===e.rule.id&&e.originalPhrase.endsWith(")")&&r.endsWith(this.ZWS))return!1;if("COMMA_PARENTHESIS_WHITESPACE"===e.rule.id&&e.originalPhrase.endsWith(".")&&this.FILE_TYPE_AT_BEGINNING_REGEXP.test(s))return!1;if("COMMA_PARENTHESIS_WHITESPACE"===e.rule.id&&r.endsWith("(")&&(",)"===e.originalPhrase||".)"===e.originalPhrase))return!1;if("COMMA_PARENTHESIS_WHITESPACE"===e.rule.id&&s.startsWith("/"))return!1;if("COMMA_PARENTHESIS_WHITESPACE"===e.rule.id&&e.originalPhrase.includes(this.ZWS))return!1;if("WORT1_BINDESTRICH_SPACE_WORT2"===e.rule.id&&e.originalPhrase.endsWith(this.ZWS))return!1;if("MULTIPLICATION_SIGN"===e.rule.id&&(this.AT_LEAST_TWO_LETTERS_AT_END_REGEXP.test(r)||!s||this.PUNCTUATION_AT_BEGINNING_REGEXP.test(s)))return!1;if("ZBEDNA_SPACJA_PRZED"===e.rule.id&&e.originalPhrase.includes(this.ZWS))return!1;if("UNLIKELY_OPENING_PUNCTUATION"===e.rule.id&&this.PUNCTUATION_SPACE_AT_END_REGEXP.test(r))return!1;if("WORD_CONTAINS_UNDERSCORE"===e.rule.id&&(!this.LOWERCASE_REGEXP.test(e.originalPhrase)||e.originalPhrase.includes("-")||e.originalPhrase.includes("__")||this.SLASH_AT_END_REGEXP.test(r)||this.SLASH_AT_BEGINNING_REGEXP.test(s)))return!1;if("WORD_CONTAINS_UNDERSCORE"===e.rule.id&&r.endsWith("[")&&s.startsWith("]"))return!1;if("WORD_CONTAINS_UNDERSCORE"===e.rule.id&&this.QUOTE_AT_END_REGEXP.test(r)&&this.QUOTE_AT_BEGINNING_REGEXP.test(s))return!1;if("WORD_CONTAINS_UNDERSCORE"===e.rule.id&&(r.endsWith("=")||r.endsWith("&")||r.endsWith("?")))return!1;if("PT_WEASELWORD_REPLACE"===e.rule.id&&(e.fixes.length=0),e.isSpellingError||"WORD_CONTAINS_UNDERSCORE"===e.rule.id){const t=e.originalPhrase.charAt(0),i=e.originalPhrase.toLowerCase();if(10084===e.originalPhrase.charCodeAt(0))return!1;if(s.startsWith("_")||r.endsWith("_"))return!1;if(e.originalPhrase.startsWith("$")&&s.startsWith("}")&&r.endsWith("{"))return!1;if(e.originalPhrase.startsWith("$")&&e.originalPhrase.endsWith("$"))return!1;if(this.HTML_ENTITIES.includes(e.originalPhrase)&&r.endsWith("&")||this.HTML_ENTITIES_WITH_AND.includes(e.originalPhrase)||this.HTML_ENTITIES_WITH_AND.includes("&"+e.originalPhrase))return!1;if(this.COMMON_TLDS.some((e,t)=>i.endsWith("."+e)||this.COMMON_TLD_WITH_DOT_REGEXPS[t].test(s)))return!1;if(this.DOT_WITH_PREFIX_REGEXP.test(r)&&this.COMMON_TLDS.includes(i))return!1;if(this.COMMON_FILE_TYPES.some((e,t)=>i.endsWith("."+e)||this.COMMON_FILE_TYPE_WITH_DOT_REGEXPS[t].test(s)))return!1;if(this.DOT_WITH_PREFIX_REGEXP.test(r)&&this.COMMON_FILE_TYPES.includes(i))return!1;const E="@"===t||this.MENTION_SYMBOL_AT_BEGINNING_REGEXP.test(r),n="#"===t||this.HASH_SYMBOL_AT_BEGINNING_REGEXP.test(r);if(E||n)return!1;if(a.some(t=>t.toLowerCase()===e.originalPhrase.toLowerCase()))return!1;if(this.WAVY_DASH_REGEXP.test(e.originalPhrase))return!1;for(const t of a)if(t.toLowerCase()===e.originalPhrase.toLowerCase()&&!e.fixes.some(e=>e.value===t)){e.fixes.unshift({value:t});break}}return!0})}static _processResponse(e,t,r,s,i=!1){e.matches=this._correctMatches(e.matches,t,r);let a=this._transformMatches(e.matches,r,e.language,i);a=this._adjustErrors(a,r,getDomain(s.url),s.recipientInfo.fullName);let E=[];const{hasPaidSubscription:n}=this._storageController.getUIState();return!n&&!this._storageController.isUsedCustomServer()&&e.language&&e.language.code.startsWith("fr")&&(a=a.filter(e=>!this.FR_PREMIUM_RULES.includes(e.rule.id)||(E.push(e),!1))),!n&&!this._storageController.isUsedCustomServer()&&e.language&&e.language.code.startsWith("nl")&&(a=a.filter(e=>!this.NL_PREMIUM_RULES.includes(e.rule.id)||(E.push(e),!1))),!n&&!this._storageController.isUsedCustomServer()&&e.language&&e.language.code.startsWith("pl")&&(a=a.filter(e=>!this.PL_PREMIUM_RULES.includes(e.rule.id)||(E.push(e),!1))),n&&a.forEach(e=>{this.FR_PREMIUM_RULES.includes(e.rule.id)&&(e.rule.isPremium=!0),this.NL_PREMIUM_RULES.includes(e.rule.id)&&(e.rule.isPremium=!0),this.PL_PREMIUM_RULES.includes(e.rule.id)&&(e.rule.isPremium=!0)}),e.hiddenMatches&&(E=E.concat(this._transformMatches(e.hiddenMatches,r,e.language,i))),{errors:a,hiddenErrors:E}}static _correctErrorOffsets(e,t){const r=[];let s=0;for(const i of e){const e=i.text.length;for(const a of t)if(a.offset>=s&&a.offset+a.length<=s+e){const e=Object.assign({},a);e.offset=e.offset-s+i.offset,r.push(e)}s+=e+2}return r}static validate(e,t,r,s,i=!1){if(!(e=this._prepareText(e)).trim()||/^( *\n)* *$/g.test(e))return Promise.resolve({language:t,errors:[],hiddenErrors:[]});this._abortValidationRequest(s.instanceId),this._validationAbortControllers[s.instanceId]=new AbortController,this._useValidationFallbackServer&&Date.now()-this._mainServerUnavailabilityTimeStamp>=config.MAIN_SERVER_RECHECK_INTERVAL&&(this._useValidationFallbackServer=!1);const a=e.normalize(),E=this._getServerFullUrl(s,!1,i),n={method:"post",mode:"cors",credentials:"omit",body:this._getValidationRequestData(a,t,r,s),signal:this._validationAbortControllers[s.instanceId].signal};return this._sendRequest(E,n).then(t=>{const{errors:r,hiddenErrors:i}=this._processResponse(t,a,e,s);return{language:{code:t.language.code,name:t.language.name},errors:r,hiddenErrors:i}}).catch(i=>{if(this._isConnectionOrServerIssue(i)){this._abortValidationRequest(s.instanceId);const a=this.getServerBaseUrl(!1,!1);if(i.message=i.message||i18nManager.getMessage("connectionProblem",a)+" (#1, code="+i.status+")",!this._storageController.isUsedCustomServer()&&!this._useValidationFallbackServer)return this._useValidationFallbackServer=!0,this._mainServerUnavailabilityTimeStamp=Date.now(),this.validate(e,t,r,s)}throw i})}static partialValidate(e,t,r,s,i=!1){if(e.forEach(e=>{e.text=this._prepareText(e.text)}),!e.some(e=>!!e.text.trim()))return Promise.resolve({language:t,errors:[],hiddenErrors:[],isIncompleteResult:!1});this._abortPartialValidationRequest(s.instanceId),this._partialValidationAbortControllers[s.instanceId]=new AbortController,this._usePartialValidationFallbackServer&&Date.now()-this._mainServerUnavailabilityTimeStamp>=config.MAIN_SERVER_RECHECK_INTERVAL&&(this._usePartialValidationFallbackServer=!1);const a=this._getServerFullUrl(s,!0),E=this._joinInChunks(e),n=[];for(const e of E){const E=e.map(e=>e.text).join("\n\n"),o=E.normalize(),_={method:"post",mode:"cors",credentials:"omit",body:this._getPartialValidationRequestData(o,t,r,s,i),signal:this._partialValidationAbortControllers[s.instanceId].signal},l=this._sendRequest(a,_).then(t=>{const{errors:r,hiddenErrors:i}=this._processResponse(t,o,E,s,!0),a=this._correctErrorOffsets(e,r),n=this._correctErrorOffsets(e,i);return{language:{code:t.language.code,name:t.language.name},errors:a,hiddenErrors:n,isIncompleteResult:!!t.warnings&&t.warnings.incompleteResults}});n.push(l)}return Promise.all(n).then(e=>{return{language:e[0].language,errors:Array.prototype.concat.apply([],e.map(e=>e.errors)),hiddenErrors:Array.prototype.concat.apply([],e.map(e=>e.hiddenErrors)),isIncompleteResult:e.some(e=>e.isIncompleteResult)}}).catch(a=>{if(this._isConnectionOrServerIssue(a)){this._abortPartialValidationRequest(s.instanceId);const E=this.getServerBaseUrl(!0,!1);if(a.message=i18nManager.getMessage("connectionProblem",E)+" (#2, code="+a.status+")",!this._storageController.isUsedCustomServer()&&!this._usePartialValidationFallbackServer)return this._usePartialValidationFallbackServer=!0,this._mainServerUnavailabilityTimeStamp=Date.now(),this.partialValidate(e,t,r,s,i)}throw a})}static checkForPaidSubscription(e,t,r){return new Promise((s,i)=>{this._storageController.onReady(()=>{let a=this._storageController.isUsedCustomServer()?this._storageController.getCustomServerUrl():config.PREMIUM_SERVER_URL;a+=a.endsWith("/")?"check":"/check";const E=new URLSearchParams;E.append("language","en-us"),E.append("data",JSON.stringify({text:"languagetool testrule 8634756"})),e&&t?(E.append("username",e),E.append("password",t)):e&&r&&(E.append("username",e),E.append("tokenV2",r));const n={method:"post",mode:"cors",credentials:"omit",body:E};this._sendRequest(a,n).then(e=>{const t=e.matches.some(e=>"PREMIUM_FAKE_RULE"===e.rule.id);s(t)}).catch(e=>{403!==e.status?i(e):s(!1)})})})}}Validator.FR_PREMIUM_RULES=["ADRESSES_FRANCE","AU_DELA","VACANCE","POSTULER_A","MON_NFS","SOI_DISANT","VOIRE_MEME","PAREIL_QUE","A_LE","NOM_MAL_EPELE","T_EUPHONIQUE","FORCEMENT","S_IL_TE_PLAIT","NUL_PART","D_AVANTAGE","COMMENCER_AVEC","FAIRE_PARTI","PARCE","NOTRE","ARRIVEE","ETRE_DANS_LE_MEME_BATEAU","RAPPELER_DE","PEUT_IMPORTE","EN_CAS_OU","CI-ATTACHE","kWh","NORD_SUD","AJOUTER_EN_PLUS","URL","COOKIE","GREEN","COMMUNITY","CRASH","TOKEN","COACHING"],Validator.NL_PREMIUM_RULES=["VAAG","FAAG_VAAG","OVERDRIJVING","TOO_LONG_SENTENCE","_2_LEESTEKENS","WEEKEND","CASU_QUO","MOMENTEEL","SLECHTS","LOSSE_LETTERS","LEENWOORDEN","KOMMA_HOOR","RELEVANT","ZAL_ZUL","HINTS","OR_EENH_GETAL","CHECKEN","ALLEEN_BE","MACHTE","ECHTER","COMMUNICEREN","DESIGN","SANDAAL_ZANDAAL","N","MIDDELS","INTEGREREN","PRIMAIR","OVERIGENS","BETREFFENDE","AGENDA","ERGO","TEN_BEHOEVE","KOMMA_AANH","TM","IE","TER_ZAKE","SIGNIFICANT","GELIEVE","BEHOREN","NAAR_AANLEIDING_VAN","VAN_PLAN_ZIJN","HEDEN","TEN_DODE","VREEMD_VRZ_HIJ","DES","IMPACT","IMMER","BOVENSTAAND","XXXYJE","DUTCH_WRONG_WORD_IN_CONTEXT","LANCEREN","MET_BEHULP_VAN","PRIORITEIT","UWENTWEGE","CATEGORIE","CRITERIUM","GEMOTIVEERD"],Validator.PL_PREMIUM_RULES=["BOWIEM_ZAS","ZE_Z_SPOL","SPACJA_ZNAK_ROWNOSCI","BRAK_PRZECINKA_GDY","PYTANIE_CO","BRAK_PRZECINKA_JESLI","PRZECINEK_ANI","SKROTOWCE_BEZ_DYWIZU","NIEZGODNOSC_PRZYPADKU_PO_LICZEBNIKU","PODMIOT_ORZECZENIE","ROWNIE_JAK","JAK_I","PRZECINEK_POROWNANIE","WOLACZ_BEZ_PRZECINKA","ODNOSNIE_DO","GENERALNIE","BOWIEM_ZAS_PRZECINEK","WYDAWAC_SIE_BYC","POSIADAC_MIEC","PL_GUILLEMET","ITP_ITD","SPACJA_PROCENT","PO","W_TEMACIE","PL_DWA_WYRAZY","W_NAWIAZANIU_DO","WE_W","POKI_CO","VS","DZIEN_DZISIEJSZY","WIELOKROTNE_WYSTPIENIE_TEGO_SAMEGO_WYRAENIA_PRZYIMKOWEGO","I_LUB","PELNIC_ROLE","OKRES_CZASU","UZNAC_JAKO","EFEKT_KONCOWY","DLATEGO_PONIEWAZ","NA_DZIEN_DZISIEJSZY","DODATKOWO_CO_WIECEJ","OWY_W","DZIEN_JUTRZEJSZY","ADRES_ZAMIESZKANIA","W_CHWILI_OBECNEJ","BYC_ZNAJDOWAC_SIE_W_POSIADANIU","DO_TERAZ","PROTOKOL_Z_CZEGO","PO_NAJMNIEJSZEJ_LINII","POTRAFIACY","zarowno_jak_rowniez","GRAC_FAIR_PLAY","DRUGI_NAJWIEKSZY","COFAC_SIE_DO_TYLU","DZIEN_WCZORAJSZY","NA_PRZESTRZENI","IDENTYCZNY_JAK","ZA_WYJATKIEM","MAPA_DROGOWA","W_PRZECIGU_TYGODNIA_W_CIGU","NAPOTKAC_NA","PRZERWA_KAWOWA","WYSOKA_FREKWENCJA","UBRAC_ZALOZYC","PRZY_UDZIALE","W_SLAD_ZA","WYRAZIC_POPARCIE","W_TYM_WZGLEDZIE","PO_PIERWSZE_PRIMO","DOMYSLEC_SIE","WARTY","IDENTYCZNY_DO","W_DRODZE_WYJATKU","PRZEDKLADAC_WNIOSEK","POD_RZAD","PRZYJAZNY_DLA_UZYTKOWNIKA","NA_WSKUTEK","SWIECIC_SUKCESY","W_WEGRZECH","KONDYCJA_FINANSOWA","RULE_NIEMNIEJ","FORMULA_KREMU","PODDAWAC_W_WATPLIWOSC","OPATRZEC_SIE","ODGRYWAC_ZNACZENIE","INFORMACJE_WRAZLIWE","DO_DZIS_DZIEN","CO_I_RAZ","OKRAGLY_ROK","SZERSZE_INFORMACJE","WYSOKA_FORMA","CZEKAC_ZA","BYNAJMNIEJ","WYWIERAC_PIETNO","DOPATRZEC_SIE","ZLA_RENOMA","W_PELNYM_TEGO","W_KAZDYM_BADZ","KOSZTOWAC_TANIEJ","DYGITALNY"],Validator.SPELLING_RULES_ID=["SPELLER_RULE","MORFOLOGIK_RULE","HUNSPELL","SPELLING_RULE"],Validator.STYLE_ISSUE_TYPES=["style","locale-violation","register"],Validator.EMAIL_SIGNATURE_SEPARATOR_REGEXP=/^[\‐|\-]{2,}|[\‐|\-]{2,}$/,Validator.ONLY_NUMBERS_REGEXP=/^[0-9]+$/,Validator.COLON_WHITESPACE_REGEXP=/^[;:]\s/,Validator.ONE_LETTER_AT_END_REGEXP=/\b[a-z]\s?$/i,Validator.NUMBER_WITH_DOT_AT_END_REGEXP=/\d\.?\s?$/,Validator.NUMBER_WITH_PARENTHESIS_AT_END_REGEXP=/\d\.?\)\s$/,Validator.BULLET_POINT_REGEXP=/(\u25b6\ufe0e|\u25BA|\*|-|–|\u2606|\u2605|\u25cf|\u2022|\u25e6|\u27A4|\u2714)\s+$/,Validator.LOWERCASE_REGEXP=/[a-z]/,Validator.DOT_WITH_PREFIX_REGEXP=/\w\.$/,Validator.SLASH_AT_END_REGEXP=/(\/|\\)$/,Validator.AT_LEAST_TWO_LETTERS_AT_END_REGEXP=/[a-z]{2}$/i,Validator.SLASH_AT_BEGINNING_REGEXP=/^(\/|\\)/,Validator.QUOTE_AT_END_REGEXP=/[\"\“\”\„]$/,Validator.QUOTE_AT_BEGINNING_REGEXP=/^[\"\“\”\„]/,Validator.PUNCTUATION_AT_BEGINNING_REGEXP=/^\s?[\.\!\?,:…]/,Validator.PUNCTUATION_SPACE_AT_END_REGEXP=/[\.…\?\!]\s+/,Validator.MARKDOWN_HEADLINE_REGEXP=/^#{1,6}\s/m,Validator.MARKDOWN_INLINE_FORMAT_AT_BEGINNING_REGEXP=/^[\*\~\_\^\+\%\@]/m,Validator.PIPE_AT_END_REGEXP=/\|\s+$/,Validator.MENTION_SYMBOL_AT_BEGINNING_REGEXP=/@[a-z\.\-]*$/i,Validator.HASH_SYMBOL_AT_BEGINNING_REGEXP=/#[a-z\.\-]*$/i,Validator.EMOJI_SENTENCE_START_REGEXP=/(\.|!|\?|^)\s?(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s+/,Validator.ABBREVIATION_AT_END_REGEXP=/(\s|\(|^)[A-Z]\.$/,Validator.NET_AT_BEGINNING_REGEXP=/^net\b/i,Validator.SINGLE_UPPERCASE_LETTER_REGEXP=/^[A-Z]$/,Validator.HTML_ENTITIES=["amp","nbsp","gt","lt","bull","euro","copy","laquo","raquo","hellip","middot"],Validator.HTML_ENTITIES_WITH_AND=Validator.HTML_ENTITIES.map(e=>`&${e}`),Validator.WAVY_DASH_REGEXP=/^\u3030+$/,Validator.ZWS_REGEXP=/^\uFEFF+$/,Validator.ZWNJ_REGEXP=/\u200B|\u200C/g,Validator.ZWS="\ufeff",Validator.COMMON_TLDS=["com","co","org","net","de","info","biz","es","fr","be","in","gov","nl","ca","com.br","br","at","us","au","ru","pl","ly","it","cat","edu","jp","ko","cn","se","no","mil","ch","dk","com.mx","mx","eu","co.uk","uk","ir","cz","ua","kr","gr","tw","nz","co.nz","za","ro","vn","io","tr","me","fi","tv","xyz","pt","ie","app"],Validator.COMMON_TLD_WITH_DOT_REGEXPS=Validator.COMMON_TLDS.map(e=>new RegExp(`^\\.${e.replace(".","\\.")}\\b`,"i")),Validator.COMMON_FILE_TYPES=["jpeg","jpg","gif","png","bmp","svg","ai","sketch","ico","ps","psd","tiff","tif","mp3","wav","midi","mid","aif","mpa","ogg","wma","wpl","cda","7z","arj","deb","pkg","plist","rar","rpm","tar.gz","tar","zip","bin","dmg","iso","toast","vcd","csv","dat","db","log","mdb","sav","sql","xml","apk","bat","bin","cgi","com","exe","gadget","jar","py","js","jsx","json","wsf","ts","tsx","fnt","fon","otf","ttf","woff","woff2","rb","java","php","html","asp","aspx","cer","cfm","cgi","pl","css","htm","jsp","part","rss","xhtml","key","odp","pps","ppt","pptx","class","cpp","cs","h","sh","swift","vb","ods","odt","xlr","xls","xlsx","xlt","xltx","bak","cab","cfg","cpl","cur","dll","dmp","msi","ini","tmp","3g2","3gp","avi","flv","h264","m4v","mkv","mov","mp4","mpg","mpeg","rm","swf","vob","wmv","doc","docx","dot","dotx","pdf","rtf","srx","text","tex","wks","wps","wpd","txt","yaml","yml","csl","md","adm"],Validator.COMMON_FILE_TYPE_WITH_DOT_REGEXPS=Validator.COMMON_FILE_TYPES.map(e=>new RegExp(`^[\\wáàâóòìíéèùúâôîêûäöüß\\-\\.\\(\\)]*?\\.${e}\\b`,"i")),Validator.FILE_TYPE_AT_BEGINNING_REGEXP=new RegExp(`(${Validator.COMMON_FILE_TYPES.join("|")})\b`,"i"),Validator._storageController=StorageController.create(),Validator._validationAbortControllers=new Map,Validator._partialValidationAbortControllers=new Map,Validator._useValidationFallbackServer=!1,Validator._usePartialValidationFallbackServer=!1,Validator._mainServerUnavailabilityTimeStamp=0,Validator._isInitialized=!1,Validator._constructor();