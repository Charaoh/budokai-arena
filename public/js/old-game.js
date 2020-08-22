var canvas;
var builder;
var ws;     
var queue;
var user;
var p1stats;
var gameTimer;
var moo;
var start;
var stage;
var stage2;
var createjs;
var h_load;
var endTurnImage;
var box;
var done;
var info;
var select;
var phealth1 = [0,0,0,0,0,0];
var phealth2 = [0,0,0,0,0,0];
var penergy1 = [0,0,0,0,0,0];
var penergy2 = [0,0,0,0,0,0];
var cancelbutton;
var statsInfo;
var connection;
var loaded = false;
var teambuilderinfo = [];
var server;
var loadingSettings = [];

(function(){function a(a){"use strict";var b={omitExtraWLInCodeBlocks:{defaultValue:!1,describe:"Omit the default extra whiteline added to code blocks",type:"boolean"},noHeaderId:{defaultValue:!1,describe:"Turn on/off generated header id",type:"boolean"},prefixHeaderId:{defaultValue:!1,describe:"Specify a prefix to generated header ids",type:"string"},ghCompatibleHeaderId:{defaultValue:!1,describe:"Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",type:"boolean"},headerLevelStart:{defaultValue:!1,describe:"The header blocks level start",type:"integer"},parseImgDimensions:{defaultValue:!1,describe:"Turn on/off image dimension parsing",type:"boolean"},simplifiedAutoLink:{defaultValue:!1,describe:"Turn on/off GFM autolink style",type:"boolean"},excludeTrailingPunctuationFromURLs:{defaultValue:!1,describe:"Excludes trailing punctuation from links generated with autoLinking",type:"boolean"},literalMidWordUnderscores:{defaultValue:!1,describe:"Parse midword underscores as literal underscores",type:"boolean"},strikethrough:{defaultValue:!1,describe:"Turn on/off strikethrough support",type:"boolean"},tables:{defaultValue:!1,describe:"Turn on/off tables support",type:"boolean"},tablesHeaderId:{defaultValue:!1,describe:"Add an id to table headers",type:"boolean"},ghCodeBlocks:{defaultValue:!0,describe:"Turn on/off GFM fenced code blocks support",type:"boolean"},tasklists:{defaultValue:!1,describe:"Turn on/off GFM tasklist support",type:"boolean"},smoothLivePreview:{defaultValue:!1,describe:"Prevents weird effects in live previews due to incomplete input",type:"boolean"},smartIndentationFix:{defaultValue:!1,description:"Tries to smartly fix indentation in es6 strings",type:"boolean"},disableForced4SpacesIndentedSublists:{defaultValue:!1,description:"Disables the requirement of indenting nested sublists by 4 spaces",type:"boolean"},simpleLineBreaks:{defaultValue:!1,description:"Parses simple line breaks as <br> (GFM Style)",type:"boolean"},requireSpaceBeforeHeadingText:{defaultValue:!1,description:"Makes adding a space between `#` and the header text mandatory (GFM Style)",type:"boolean"},ghMentions:{defaultValue:!1,description:"Enables github @mentions",type:"boolean"}};if(a===!1)return JSON.parse(JSON.stringify(b));var c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d].defaultValue);return c}function b(){"use strict";var b=a(!0),c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=!0);return c}function c(a,b){"use strict";var c=b?"Error in "+b+" extension->":"Error in unnamed extension",d={valid:!0,error:""};e.helper.isArray(a)||(a=[a]);for(var f=0;f<a.length;++f){var g=c+" sub-extension "+f+": ",h=a[f];if("object"!=typeof h)return d.valid=!1,d.error=g+"must be an object, but "+typeof h+" given",d;if(!e.helper.isString(h.type))return d.valid=!1,d.error=g+'property "type" must be a string, but '+typeof h.type+" given",d;var i=h.type=h.type.toLowerCase();if("language"===i&&(i=h.type="lang"),"html"===i&&(i=h.type="output"),"lang"!==i&&"output"!==i&&"listener"!==i)return d.valid=!1,d.error=g+"type "+i+' is not recognized. Valid values: "lang/language", "output/html" or "listener"',d;if("listener"===i){if(e.helper.isUndefined(h.listeners))return d.valid=!1,d.error=g+'. Extensions of type "listener" must have a property called "listeners"',d}else if(e.helper.isUndefined(h.filter)&&e.helper.isUndefined(h.regex))return d.valid=!1,d.error=g+i+' extensions must define either a "regex" property or a "filter" method',d;if(h.listeners){if("object"!=typeof h.listeners)return d.valid=!1,d.error=g+'"listeners" property must be an object but '+typeof h.listeners+" given",d;for(var j in h.listeners)if(h.listeners.hasOwnProperty(j)&&"function"!=typeof h.listeners[j])return d.valid=!1,d.error=g+'"listeners" property must be an hash of [event name]: [callback]. listeners.'+j+" must be a function but "+typeof h.listeners[j]+" given",d}if(h.filter){if("function"!=typeof h.filter)return d.valid=!1,d.error=g+'"filter" must be a function, but '+typeof h.filter+" given",d}else if(h.regex){if(e.helper.isString(h.regex)&&(h.regex=new RegExp(h.regex,"g")),!h.regex instanceof RegExp)return d.valid=!1,d.error=g+'"regex" property must either be a string or a RegExp object, but '+typeof h.regex+" given",d;if(e.helper.isUndefined(h.replace))return d.valid=!1,d.error=g+'"regex" extensions must implement a replace string or function',d}}return d}function d(a,b){"use strict";var c=b.charCodeAt(0);return"~E"+c+"E"}var e={},f={},g={},h=a(!0),i={github:{omitExtraWLInCodeBlocks:!0,prefixHeaderId:"user-content-",simplifiedAutoLink:!0,excludeTrailingPunctuationFromURLs:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0,disableForced4SpacesIndentedSublists:!0,simpleLineBreaks:!0,requireSpaceBeforeHeadingText:!0,ghCompatibleHeaderId:!0,ghMentions:!0},vanilla:a(!0),allOn:b()};e.helper={},e.extensions={},e.setOption=function(a,b){"use strict";return h[a]=b,this},e.getOption=function(a){"use strict";return h[a]},e.getOptions=function(){"use strict";return h},e.resetOptions=function(){"use strict";h=a(!0)},e.setFlavor=function(a){"use strict";if(i.hasOwnProperty(a)){var b=i[a];for(var c in b)b.hasOwnProperty(c)&&(h[c]=b[c])}},e.getDefaultOptions=function(b){"use strict";return a(b)},e.subParser=function(a,b){"use strict";if(e.helper.isString(a)){if("undefined"==typeof b){if(f.hasOwnProperty(a))return f[a];throw Error("SubParser named "+a+" not registered!")}f[a]=b}},e.extension=function(a,b){"use strict";if(!e.helper.isString(a))throw Error("Extension 'name' must be a string");if(a=e.helper.stdExtName(a),e.helper.isUndefined(b)){if(!g.hasOwnProperty(a))throw Error("Extension named "+a+" is not registered!");return g[a]}"function"==typeof b&&(b=b()),e.helper.isArray(b)||(b=[b]);var d=c(b,a);if(!d.valid)throw Error(d.error);g[a]=b},e.getAllExtensions=function(){"use strict";return g},e.removeExtension=function(a){"use strict";delete g[a]},e.resetExtensions=function(){"use strict";g={}},e.validateExtension=function(a){"use strict";var b=c(a,null);return b.valid?!0:(console.warn(b.error),!1)},e.hasOwnProperty("helper")||(e.helper={}),e.helper.isString=function(a){"use strict";return"string"==typeof a||a instanceof String},e.helper.isFunction=function(a){"use strict";var b={};return a&&"[object Function]"===b.toString.call(a)},e.helper.forEach=function(a,b){"use strict";if("function"==typeof a.forEach)a.forEach(b);else for(var c=0;c<a.length;c++)b(a[c],c,a)},e.helper.isArray=function(a){"use strict";return a.constructor===Array},e.helper.isUndefined=function(a){"use strict";return"undefined"==typeof a},e.helper.stdExtName=function(a){"use strict";return a.replace(/[_-]||\s/g,"").toLowerCase()},e.helper.escapeCharactersCallback=d,e.helper.escapeCharacters=function(a,b,c){"use strict";var e="(["+b.replace(/([\[\]\\])/g,"\\$1")+"])";c&&(e="\\\\"+e);var f=new RegExp(e,"g");return a=a.replace(f,d)};var j=function(a,b,c,d){"use strict";var e,f,g,h,i,j=d||"",k=j.indexOf("g")>-1,l=new RegExp(b+"|"+c,"g"+j.replace(/g/g,"")),m=new RegExp(b,j.replace(/g/g,"")),n=[];do for(e=0;g=l.exec(a);)if(m.test(g[0]))e++||(f=l.lastIndex,h=f-g[0].length);else if(e&&!--e){i=g.index+g[0].length;var o={left:{start:h,end:f},match:{start:f,end:g.index},right:{start:g.index,end:i},wholeMatch:{start:h,end:i}};if(n.push(o),!k)return n}while(e&&(l.lastIndex=f));return n};e.helper.matchRecursiveRegExp=function(a,b,c,d){"use strict";for(var e=j(a,b,c,d),f=[],g=0;g<e.length;++g)f.push([a.slice(e[g].wholeMatch.start,e[g].wholeMatch.end),a.slice(e[g].match.start,e[g].match.end),a.slice(e[g].left.start,e[g].left.end),a.slice(e[g].right.start,e[g].right.end)]);return f},e.helper.replaceRecursiveRegExp=function(a,b,c,d,f){"use strict";if(!e.helper.isFunction(b)){var g=b;b=function(){return g}}var h=j(a,c,d,f),i=a,k=h.length;if(k>0){var l=[];0!==h[0].wholeMatch.start&&l.push(a.slice(0,h[0].wholeMatch.start));for(var m=0;k>m;++m)l.push(b(a.slice(h[m].wholeMatch.start,h[m].wholeMatch.end),a.slice(h[m].match.start,h[m].match.end),a.slice(h[m].left.start,h[m].left.end),a.slice(h[m].right.start,h[m].right.end))),k-1>m&&l.push(a.slice(h[m].wholeMatch.end,h[m+1].wholeMatch.start));h[k-1].wholeMatch.end<a.length&&l.push(a.slice(h[k-1].wholeMatch.end)),i=l.join("")}return i},"undefined"==typeof console&&(console={warn:function(a){"use strict";alert(a)},log:function(a){"use strict";alert(a)},error:function(a){"use strict";throw a}}),e.Converter=function(a){"use strict";function b(){a=a||{};for(var b in h)h.hasOwnProperty(b)&&(l[b]=h[b]);if("object"!=typeof a)throw Error("Converter expects the passed parameter to be an object, but "+typeof a+" was passed instead.");for(var c in a)a.hasOwnProperty(c)&&(l[c]=a[c]);l.extensions&&e.helper.forEach(l.extensions,d)}function d(a,b){if(b=b||null,e.helper.isString(a)){if(a=e.helper.stdExtName(a),b=a,e.extensions[a])return console.warn("DEPRECATION WARNING: "+a+" is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),void f(e.extensions[a],a);if(e.helper.isUndefined(g[a]))throw Error('Extension "'+a+'" could not be loaded. It was either not found or is not a valid extension.');a=g[a]}"function"==typeof a&&(a=a()),e.helper.isArray(a)||(a=[a]);var d=c(a,b);if(!d.valid)throw Error(d.error);for(var h=0;h<a.length;++h){switch(a[h].type){case"lang":m.push(a[h]);break;case"output":n.push(a[h])}if(a[h].hasOwnProperty("listeners"))for(var i in a[h].listeners)a[h].listeners.hasOwnProperty(i)&&j(i,a[h].listeners[i])}}function f(a,b){"function"==typeof a&&(a=a(new e.Converter)),e.helper.isArray(a)||(a=[a]);var d=c(a,b);if(!d.valid)throw Error(d.error);for(var f=0;f<a.length;++f)switch(a[f].type){case"lang":m.push(a[f]);break;case"output":n.push(a[f]);break;default:throw Error("Extension loader error: Type unrecognized!!!")}}function j(a,b){if(!e.helper.isString(a))throw Error("Invalid argument in converter.listen() method: name must be a string, but "+typeof a+" given");if("function"!=typeof b)throw Error("Invalid argument in converter.listen() method: callback must be a function, but "+typeof b+" given");o.hasOwnProperty(a)||(o[a]=[]),o[a].push(b)}function k(a){var b=a.match(/^\s*/)[0].length,c=new RegExp("^\\s{0,"+b+"}","gm");return a.replace(c,"")}var l={},m=[],n=[],o={};b(),this._dispatch=function(a,b,c,d){if(o.hasOwnProperty(a))for(var e=0;e<o[a].length;++e){var f=o[a][e](a,b,this,c,d);f&&"undefined"!=typeof f&&(b=f)}return b},this.listen=function(a,b){return j(a,b),this},this.makeHtml=function(a){if(!a)return a;var b={gHtmlBlocks:[],gHtmlMdBlocks:[],gHtmlSpans:[],gUrls:{},gTitles:{},gDimensions:{},gListLevel:0,hashLinkCounts:{},langExtensions:m,outputModifiers:n,converter:this,ghCodeBlocks:[]};return a=a.replace(/~/g,"~T"),a=a.replace(/\$/g,"~D"),a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),a=a.replace(/\u00A0/g," "),l.smartIndentationFix&&(a=k(a)),a="\n\n"+a+"\n\n",a=e.subParser("detab")(a,l,b),a=e.subParser("stripBlankLines")(a,l,b),e.helper.forEach(m,function(c){a=e.subParser("runExtension")(c,a,l,b)}),a=e.subParser("hashPreCodeTags")(a,l,b),a=e.subParser("githubCodeBlocks")(a,l,b),a=e.subParser("hashHTMLBlocks")(a,l,b),a=e.subParser("hashHTMLSpans")(a,l,b),a=e.subParser("stripLinkDefinitions")(a,l,b),a=e.subParser("blockGamut")(a,l,b),a=e.subParser("unhashHTMLSpans")(a,l,b),a=e.subParser("unescapeSpecialChars")(a,l,b),a=a.replace(/~D/g,"$$"),a=a.replace(/~T/g,"~"),e.helper.forEach(n,function(c){a=e.subParser("runExtension")(c,a,l,b)}),a},this.setOption=function(a,b){l[a]=b},this.getOption=function(a){return l[a]},this.getOptions=function(){return l},this.addExtension=function(a,b){b=b||null,d(a,b)},this.useExtension=function(a){d(a)},this.setFlavor=function(a){if(i.hasOwnProperty(a)){var b=i[a];for(var c in b)b.hasOwnProperty(c)&&(l[c]=b[c])}},this.removeExtension=function(a){e.helper.isArray(a)||(a=[a]);for(var b=0;b<a.length;++b){for(var c=a[b],d=0;d<m.length;++d)m[d]===c&&m[d].splice(d,1);for(var f=0;f<n.length;++d)n[f]===c&&n[f].splice(d,1)}},this.getAllExtensions=function(){return{language:m,output:n}}},e.subParser("anchors",function(a,b,c){"use strict";a=c.converter._dispatch("anchors.before",a,b,c);var d=function(a,b,d,f,g,h,i,j){e.helper.isUndefined(j)&&(j=""),a=b;var k=d,l=f.toLowerCase(),m=g,n=j;if(!m)if(l||(l=k.toLowerCase().replace(/ ?\n/g," ")),m="#"+l,e.helper.isUndefined(c.gUrls[l])){if(!(a.search(/\(\s*\)$/m)>-1))return a;m=""}else m=c.gUrls[l],e.helper.isUndefined(c.gTitles[l])||(n=c.gTitles[l]);m=e.helper.escapeCharacters(m,"*_",!1);var o='<a href="'+m+'"';return""!==n&&null!==n&&(n=n.replace(/"/g,"&quot;"),n=e.helper.escapeCharacters(n,"*_",!1),o+=' title="'+n+'"'),o+=">"+k+"</a>"};return a=a.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g,d),a=a.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,d),a=a.replace(/(\[([^\[\]]+)])()()()()()/g,d),b.ghMentions&&(a=a.replace(/(^|\s)(@([a-z\d\-]+))(?=[.!?;,[\]()]|\s|$)/gim,'$1<a href="https://www.github.com/$3">$2</a>')),a=c.converter._dispatch("anchors.after",a,b,c)}),e.subParser("autoLinks",function(a,b,c){"use strict";function d(a,c,d,e,f){var g=c,h="";return/^www\./i.test(c)&&(c=c.replace(/^www\./i,"http://www.")),b.excludeTrailingPunctuationFromURLs&&f&&(h=f),'<a href="'+c+'">'+g+"</a>"+h}function f(a,b){var c=e.subParser("unescapeSpecialChars")(b);return e.subParser("encodeEmailAddress")(c)}a=c.converter._dispatch("autoLinks.before",a,b,c);var g=/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)()(?=\s|$)(?!["<>])/gi,h=/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?()]?)(?=\s|$)(?!["<>])/gi,i=/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,j=/(?:^|\s)([A-Za-z0-9!#$%&'*+-\/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|\s)/gi,k=/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;return a=a.replace(i,d),a=a.replace(k,f),b.simplifiedAutoLink&&(a=b.excludeTrailingPunctuationFromURLs?a.replace(h,d):a.replace(g,d),a=a.replace(j,f)),a=c.converter._dispatch("autoLinks.after",a,b,c)}),e.subParser("blockGamut",function(a,b,c){"use strict";a=c.converter._dispatch("blockGamut.before",a,b,c),a=e.subParser("blockQuotes")(a,b,c),a=e.subParser("headers")(a,b,c);var d=e.subParser("hashBlock")("<hr />",b,c);return a=a.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm,d),a=a.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm,d),a=a.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm,d),a=e.subParser("lists")(a,b,c),a=e.subParser("codeBlocks")(a,b,c),a=e.subParser("tables")(a,b,c),a=e.subParser("hashHTMLBlocks")(a,b,c),a=e.subParser("paragraphs")(a,b,c),a=c.converter._dispatch("blockGamut.after",a,b,c)}),e.subParser("blockQuotes",function(a,b,c){"use strict";return a=c.converter._dispatch("blockQuotes.before",a,b,c),a=a.replace(/((^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,d){var f=d;return f=f.replace(/^[ \t]*>[ \t]?/gm,"~0"),f=f.replace(/~0/g,""),f=f.replace(/^[ \t]+$/gm,""),f=e.subParser("githubCodeBlocks")(f,b,c),f=e.subParser("blockGamut")(f,b,c),f=f.replace(/(^|\n)/g,"$1  "),f=f.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,b){var c=b;return c=c.replace(/^  /gm,"~0"),c=c.replace(/~0/g,"")}),e.subParser("hashBlock")("<blockquote>\n"+f+"\n</blockquote>",b,c)}),a=c.converter._dispatch("blockQuotes.after",a,b,c)}),e.subParser("codeBlocks",function(a,b,c){"use strict";a=c.converter._dispatch("codeBlocks.before",a,b,c),a+="~0";var d=/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;return a=a.replace(d,function(a,d,f){var g=d,h=f,i="\n";return g=e.subParser("outdent")(g),g=e.subParser("encodeCode")(g),g=e.subParser("detab")(g),g=g.replace(/^\n+/g,""),g=g.replace(/\n+$/g,""),b.omitExtraWLInCodeBlocks&&(i=""),g="<pre><code>"+g+i+"</code></pre>",e.subParser("hashBlock")(g,b,c)+h}),a=a.replace(/~0/,""),a=c.converter._dispatch("codeBlocks.after",a,b,c)}),e.subParser("codeSpans",function(a,b,c){"use strict";return a=c.converter._dispatch("codeSpans.before",a,b,c),"undefined"==typeof a&&(a=""),a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,b,c,d){var f=d;return f=f.replace(/^([ \t]*)/g,""),f=f.replace(/[ \t]*$/g,""),f=e.subParser("encodeCode")(f),b+"<code>"+f+"</code>"}),a=c.converter._dispatch("codeSpans.after",a,b,c)}),e.subParser("detab",function(a){"use strict";return a=a.replace(/\t(?=\t)/g,"    "),a=a.replace(/\t/g,"~A~B"),a=a.replace(/~B(.+?)~A/g,function(a,b){for(var c=b,d=4-c.length%4,e=0;d>e;e++)c+=" ";return c}),a=a.replace(/~A/g,"    "),a=a.replace(/~B/g,"")}),e.subParser("encodeAmpsAndAngles",function(a){"use strict";return a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;")}),e.subParser("encodeBackslashEscapes",function(a){"use strict";return a=a.replace(/\\(\\)/g,e.helper.escapeCharactersCallback),a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,e.helper.escapeCharactersCallback)}),e.subParser("encodeCode",function(a){"use strict";return a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=e.helper.escapeCharacters(a,"*_{}[]\\",!1)}),e.subParser("encodeEmailAddress",function(a){"use strict";var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+a.charCodeAt(0).toString(16)+";"},function(a){return a}];return a="mailto:"+a,a=a.replace(/./g,function(a){if("@"===a)a=b[Math.floor(2*Math.random())](a);else if(":"!==a){var c=Math.random();a=c>.9?b[2](a):c>.45?b[1](a):b[0](a)}return a}),a='<a href="'+a+'">'+a+"</a>",a=a.replace(/">.+:/g,'">')}),e.subParser("escapeSpecialCharsWithinTagAttributes",function(a){"use strict";var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return a=a.replace(b,function(a){var b=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return b=e.helper.escapeCharacters(b,"\\`*_",!1)})}),e.subParser("githubCodeBlocks",function(a,b,c){"use strict";return b.ghCodeBlocks?(a=c.converter._dispatch("githubCodeBlocks.before",a,b,c),a+="~0",a=a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(a,d,f){var g=b.omitExtraWLInCodeBlocks?"":"\n";return f=e.subParser("encodeCode")(f),f=e.subParser("detab")(f),f=f.replace(/^\n+/g,""),f=f.replace(/\n+$/g,""),f="<pre><code"+(d?' class="'+d+" language-"+d+'"':"")+">"+f+g+"</code></pre>",f=e.subParser("hashBlock")(f,b,c),"\n\n~G"+(c.ghCodeBlocks.push({text:a,codeblock:f})-1)+"G\n\n"}),a=a.replace(/~0/,""),c.converter._dispatch("githubCodeBlocks.after",a,b,c)):a}),e.subParser("hashBlock",function(a,b,c){"use strict";return a=a.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(c.gHtmlBlocks.push(a)-1)+"K\n\n"}),e.subParser("hashElement",function(a,b,c){"use strict";return function(a,b){var d=b;return d=d.replace(/\n\n/g,"\n"),d=d.replace(/^\n/,""),d=d.replace(/\n+$/g,""),d="\n\n~K"+(c.gHtmlBlocks.push(d)-1)+"K\n\n"}}),e.subParser("hashHTMLBlocks",function(a,b,c){"use strict";for(var d=["pre","div","h1","h2","h3","h4","h5","h6","blockquote","table","dl","ol","ul","script","noscript","form","fieldset","iframe","math","style","section","header","footer","nav","article","aside","address","audio","canvas","figure","hgroup","output","video","p"],f=function(a,b,d,e){var f=a;return-1!==d.search(/\bmarkdown\b/)&&(f=d+c.converter.makeHtml(b)+e),"\n\n~K"+(c.gHtmlBlocks.push(f)-1)+"K\n\n"},g=0;g<d.length;++g)a=e.helper.replaceRecursiveRegExp(a,f,"^ {0,3}<"+d[g]+"\\b[^>]*>","</"+d[g]+">","gim");return a=a.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,e.subParser("hashElement")(a,b,c)),a=e.helper.replaceRecursiveRegExp(a,function(a){return"\n\n~K"+(c.gHtmlBlocks.push(a)-1)+"K\n\n"},"^ {0,3}<!--","-->","gm"),a=a.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,e.subParser("hashElement")(a,b,c))}),e.subParser("hashHTMLSpans",function(a,b,c){"use strict";for(var d=e.helper.matchRecursiveRegExp(a,"<code\\b[^>]*>","</code>","gi"),f=0;f<d.length;++f)a=a.replace(d[f][0],"~C"+(c.gHtmlSpans.push(d[f][0])-1)+"C");return a}),e.subParser("unhashHTMLSpans",function(a,b,c){"use strict";for(var d=0;d<c.gHtmlSpans.length;++d)a=a.replace("~C"+d+"C",c.gHtmlSpans[d]);return a}),e.subParser("hashPreCodeTags",function(a,b,c){"use strict";var d=function(a,b,d,f){var g=d+e.subParser("encodeCode")(b)+f;return"\n\n~G"+(c.ghCodeBlocks.push({text:a,codeblock:g})-1)+"G\n\n"};return a=e.helper.replaceRecursiveRegExp(a,d,"^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>","^ {0,3}</code>\\s*</pre>","gim")}),e.subParser("headers",function(a,b,c){"use strict";function d(a){var b,d;return d=h?a.replace(/ /g,"-").replace(/&amp;/g,"").replace(/~T/g,"").replace(/~D/g,"").replace(/[&+$,\/:;=?@"#{}|^~\[\]`\\*)(%.!'<>]/g,"").toLowerCase():a.replace(/[^\w]/g,"").toLowerCase(),c.hashLinkCounts[d]?b=d+"-"+c.hashLinkCounts[d]++:(b=d,c.hashLinkCounts[d]=1),f===!0&&(f="section"),e.helper.isString(f)?f+b:b}a=c.converter._dispatch("headers.before",a,b,c);var f=b.prefixHeaderId,g=isNaN(parseInt(b.headerLevelStart))?1:parseInt(b.headerLevelStart),h=b.ghCompatibleHeaderId,i=b.smoothLivePreview?/^(.+)[ \t]*\n={2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n=+[ \t]*\n+/gm,j=b.smoothLivePreview?/^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n-+[ \t]*\n+/gm;a=a.replace(i,function(a,f){var h=e.subParser("spanGamut")(f,b,c),i=b.noHeaderId?"":' id="'+d(f)+'"',j=g,k="<h"+j+i+">"+h+"</h"+j+">";return e.subParser("hashBlock")(k,b,c)}),a=a.replace(j,function(a,f){var h=e.subParser("spanGamut")(f,b,c),i=b.noHeaderId?"":' id="'+d(f)+'"',j=g+1,k="<h"+j+i+">"+h+"</h"+j+">";return e.subParser("hashBlock")(k,b,c)});var k=b.requireSpaceBeforeHeadingText?/^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm:/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;return a=a.replace(k,function(a,f,h){var i=e.subParser("spanGamut")(h,b,c),j=b.noHeaderId?"":' id="'+d(h)+'"',k=g-1+f.length,l="<h"+k+j+">"+i+"</h"+k+">";return e.subParser("hashBlock")(l,b,c)}),a=c.converter._dispatch("headers.after",a,b,c)}),e.subParser("images",function(a,b,c){"use strict";function d(a,b,d,f,g,h,i,j){var k=c.gUrls,l=c.gTitles,m=c.gDimensions;if(d=d.toLowerCase(),j||(j=""),""===f||null===f){if((""===d||null===d)&&(d=b.toLowerCase().replace(/ ?\n/g," ")),f="#"+d,e.helper.isUndefined(k[d]))return a;f=k[d],e.helper.isUndefined(l[d])||(j=l[d]),e.helper.isUndefined(m[d])||(g=m[d].width,h=m[d].height)}b=b.replace(/"/g,"&quot;"),b=e.helper.escapeCharacters(b,"*_",!1),f=e.helper.escapeCharacters(f,"*_",!1);var n='<img src="'+f+'" alt="'+b+'"';return j&&(j=j.replace(/"/g,"&quot;"),j=e.helper.escapeCharacters(j,"*_",!1),n+=' title="'+j+'"'),g&&h&&(g="*"===g?"auto":g,h="*"===h?"auto":h,n+=' width="'+g+'"',n+=' height="'+h+'"'),n+=" />"}a=c.converter._dispatch("images.before",a,b,c);var f=/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,g=/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;return a=a.replace(g,d),a=a.replace(f,d),a=c.converter._dispatch("images.after",a,b,c)}),e.subParser("italicsAndBold",function(a,b,c){"use strict";return a=c.converter._dispatch("italicsAndBold.before",a,b,c),b.literalMidWordUnderscores?(a=a.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm,"$1<strong>$2</strong>"),a=a.replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm,"$1<em>$2</em>"),a=a.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")):(a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")),a=c.converter._dispatch("italicsAndBold.after",a,b,c)}),e.subParser("lists",function(a,b,c){"use strict";function d(a,d){c.gListLevel++,a=a.replace(/\n{2,}$/,"\n"),a+="~0";var f=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,g=/\n[ \t]*\n(?!~0)/.test(a);return b.disableForced4SpacesIndentedSublists&&(f=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm),a=a.replace(f,function(a,d,f,h,i,j,k){k=k&&""!==k.trim();var l=e.subParser("outdent")(i,b,c),m="";return j&&b.tasklists&&(m=' class="task-list-item" style="list-style-type: none;"',l=l.replace(/^[ \t]*\[(x|X| )?]/m,function(){var a='<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';return k&&(a+=" checked"),a+=">"})),l=l.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g,function(a){return"~A"+a}),d||l.search(/\n{2,}/)>-1?(l=e.subParser("githubCodeBlocks")(l,b,c),l=e.subParser("blockGamut")(l,b,c)):(l=e.subParser("lists")(l,b,c),l=l.replace(/\n$/,""),l=e.subParser("hashHTMLBlocks")(l,b,c),l=l.replace(/\n\n+/g,"\n\n"),l=l.replace(/\n\n/g,"~B"),l=g?e.subParser("paragraphs")(l,b,c):e.subParser("spanGamut")(l,b,c),l=l.replace(/~B/g,"\n\n")),l=l.replace("~A",""),l="<li"+m+">"+l+"</li>\n"}),a=a.replace(/~0/g,""),c.gListLevel--,d&&(a=a.replace(/\s+$/,"")),a}function f(a,c,e){var f=b.disableForced4SpacesIndentedSublists?/^ ?\d+\.[ \t]/gm:/^ {0,3}\d+\.[ \t]/gm,g=b.disableForced4SpacesIndentedSublists?/^ ?[*+-][ \t]/gm:/^ {0,3}[*+-][ \t]/gm,h="ul"===c?f:g,i="";return-1!==a.search(h)?!function j(a){var b=a.search(h);-1!==b?(i+="\n<"+c+">\n"+d(a.slice(0,b),!!e)+"</"+c+">\n",c="ul"===c?"ol":"ul",h="ul"===c?f:g,j(a.slice(b))):i+="\n<"+c+">\n"+d(a,!!e)+"</"+c+">\n"}(a):i="\n<"+c+">\n"+d(a,!!e)+"</"+c+">\n",i}return a=c.converter._dispatch("lists.before",a,b,c),a+="~0",a=c.gListLevel?a.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,function(a,b,c){var d=c.search(/[*+-]/g)>-1?"ul":"ol";return f(b,d,!0)}):a.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,function(a,b,c,d){var e=d.search(/[*+-]/g)>-1?"ul":"ol";return f(c,e,!1)}),a=a.replace(/~0/,""),a=c.converter._dispatch("lists.after",a,b,c)}),e.subParser("outdent",function(a){"use strict";return a=a.replace(/^(\t|[ ]{1,4})/gm,"~0"),a=a.replace(/~0/g,"")}),e.subParser("paragraphs",function(a,b,c){"use strict";a=c.converter._dispatch("paragraphs.before",a,b,c),a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,"");for(var d=a.split(/\n{2,}/g),f=[],g=d.length,h=0;g>h;h++){var i=d[h];i.search(/~(K|G)(\d+)\1/g)>=0?f.push(i):(i=e.subParser("spanGamut")(i,b,c),i=i.replace(/^([ \t]*)/g,"<p>"),i+="</p>",f.push(i))}for(g=f.length,h=0;g>h;h++){for(var j="",k=f[h],l=!1;k.search(/~(K|G)(\d+)\1/)>=0;){var m=RegExp.$1,n=RegExp.$2;j="K"===m?c.gHtmlBlocks[n]:l?e.subParser("encodeCode")(c.ghCodeBlocks[n].text):c.ghCodeBlocks[n].codeblock,j=j.replace(/\$/g,"$$$$"),k=k.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/,j),/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(k)&&(l=!0)}f[h]=k}return a=f.join("\n"),a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,""),c.converter._dispatch("paragraphs.after",a,b,c)}),e.subParser("runExtension",function(a,b,c,d){"use strict";if(a.filter)b=a.filter(b,d.converter,c);else if(a.regex){var e=a.regex;!e instanceof RegExp&&(e=new RegExp(e,"g")),b=b.replace(e,a.replace)}return b}),e.subParser("spanGamut",function(a,b,c){"use strict";return a=c.converter._dispatch("spanGamut.before",a,b,c),a=e.subParser("codeSpans")(a,b,c),a=e.subParser("escapeSpecialCharsWithinTagAttributes")(a,b,c),a=e.subParser("encodeBackslashEscapes")(a,b,c),a=e.subParser("images")(a,b,c),a=e.subParser("anchors")(a,b,c),a=e.subParser("autoLinks")(a,b,c),a=e.subParser("encodeAmpsAndAngles")(a,b,c),a=e.subParser("italicsAndBold")(a,b,c),a=e.subParser("strikethrough")(a,b,c),a=b.simpleLineBreaks?a.replace(/\n/g,"<br />\n"):a.replace(/  +\n/g,"<br />\n"),a=c.converter._dispatch("spanGamut.after",a,b,c)}),e.subParser("strikethrough",function(a,b,c){"use strict";return b.strikethrough&&(a=c.converter._dispatch("strikethrough.before",a,b,c),a=a.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g,"<del>$1</del>"),a=c.converter._dispatch("strikethrough.after",a,b,c)),a}),e.subParser("stripBlankLines",function(a){"use strict";return a.replace(/^[ \t]+$/gm,"")}),e.subParser("stripLinkDefinitions",function(a,b,c){"use strict";var d=/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;return a+="~0",a=a.replace(d,function(a,d,f,g,h,i,j){return d=d.toLowerCase(),c.gUrls[d]=e.subParser("encodeAmpsAndAngles")(f),i?i+j:(j&&(c.gTitles[d]=j.replace(/"|'/g,"&quot;")),b.parseImgDimensions&&g&&h&&(c.gDimensions[d]={width:g,height:h}),"")}),a=a.replace(/~0/,"")}),e.subParser("tables",function(a,b,c){"use strict";function d(a){return/^:[ \t]*--*$/.test(a)?' style="text-align:left;"':/^--*[ \t]*:[ \t]*$/.test(a)?' style="text-align:right;"':/^:[ \t]*--*[ \t]*:$/.test(a)?' style="text-align:center;"':""}function f(a,d){var f="";return a=a.trim(),b.tableHeaderId&&(f=' id="'+a.replace(/ /g,"_").toLowerCase()+'"'),a=e.subParser("spanGamut")(a,b,c),"<th"+f+d+">"+a+"</th>\n"}function g(a,d){var f=e.subParser("spanGamut")(a,b,c);return"<td"+d+">"+f+"</td>\n"}function h(a,b){for(var c="<table>\n<thead>\n<tr>\n",d=a.length,e=0;d>e;++e)c+=a[e];for(c+="</tr>\n</thead>\n<tbody>\n",e=0;e<b.length;++e){c+="<tr>\n";for(var f=0;d>f;++f)c+=b[e][f];c+="</tr>\n"}return c+="</tbody>\n</table>\n"}if(!b.tables)return a;var i=/^ {0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;return a=c.converter._dispatch("tables.before",a,b,c),a=a.replace(i,function(a){var b,c=a.split("\n");for(b=0;b<c.length;++b)/^ {0,3}\|/.test(c[b])&&(c[b]=c[b].replace(/^ {0,3}\|/,"")),/\|[ \t]*$/.test(c[b])&&(c[b]=c[b].replace(/\|[ \t]*$/,""));var i=c[0].split("|").map(function(a){return a.trim()}),j=c[1].split("|").map(function(a){return a.trim()}),k=[],l=[],m=[],n=[];for(c.shift(),c.shift(),b=0;b<c.length;++b)""!==c[b].trim()&&k.push(c[b].split("|").map(function(a){return a.trim()}));if(i.length<j.length)return a;for(b=0;b<j.length;++b)m.push(d(j[b]));for(b=0;b<i.length;++b)e.helper.isUndefined(m[b])&&(m[b]=""),l.push(f(i[b],m[b]));for(b=0;b<k.length;++b){for(var o=[],p=0;p<l.length;++p)e.helper.isUndefined(k[b][p]),o.push(g(k[b][p],m[p]));n.push(o)}return h(l,n)}),a=c.converter._dispatch("tables.after",a,b,c)}),e.subParser("unescapeSpecialChars",function(a){"use strict";return a=a.replace(/~E(\d+)E/g,function(a,b){var c=parseInt(b);return String.fromCharCode(c)})});var k=this;"undefined"!=typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd?define(function(){"use strict";return e}):k.showdown=e}).call(this);
//# sourceMappingURL=showdown.min.js.map

var converter = new showdown.Converter();



window.onload = function()
{
    
       
    canvas = document.getElementById('myCanvas');
    canvas.width = 1200;
    canvas.height = 720;
 
 //622
   
    stage = new createjs.Stage("myCanvas");
    stage.textBaseline = "alphabetic";
    createjs.Touch.enable(stage);
    stage.enableMouseOver();
      
    
      createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    
       
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    
    loading(1);
    
    queue.on("progress", updateLoading);
    createjs.Sound.alternateExtensions = ["ogg"];
    
    //Main Queue For Game:
       
    queue.loadManifest([
		{id: 'mainMenu', src: 'assets/Mainmenu.png'},
		{id: 'mainGoku', src: 'assets/maingoku.png'},
		{id: 'select1', src: 'assets/select1.png'},
		{id: 'select2', src: 'assets/select2.png'},
		{id: 'select3', src: 'assets/select3.png'},
		{id: 'select4', src: 'assets/select4.png'},
		{id: 'select5', src: 'assets/select5.png'},
		{id: 'select6', src: 'assets/select6.png'},
		{id: 'button1', src: 'assets/button1.png'},
		{id: 'button2', src: 'assets/button2.png'},
		{id: 'button3', src: 'assets/button3.png'},
		{id: 'button4', src: 'assets/button4.png'},	
		{id: 'button5', src: 'assets/button5.png'},
		{id: 'button6', src: 'assets/button6.png'},
		{id: 'button7', src: 'assets/button7.png'},
		{id: 'button8', src: 'assets/button8.png'},	
	    {id: 'select', src: 'assets/scouter.mp3'},
        {id: 0, src: 'ava/box.png'},
        {id: 'zGu', src: 'skills/zGu.png'}, //Face Stuff
        {id: 'zKG', src: 'skills/zKG.png'},
        {id: 'bKG', src: 'skills/bKG.png'},
        {id: 'zKn', src: 'skills/zKn.png'},
        {id: 'zNa', src: 'skills/zNa.png'}, //Face Stuff
        {id: 'zPo', src: 'skills/zPo.png'}, 
        {id: 'zRz', src: 'skills/zRz.png'},
        {id: 'zSn', src: 'skills/zSn.png'},
        {id: 'zSV', src: 'skills/zSV.png'},
        {id: 'zTn', src: 'skills/zTn.png'},
        {id: 'zYe', src: 'skills/zYe.png'},
        {id: 'zYa', src: 'skills/zYa.png'},
        {id: 'zCu', src: 'skills/zCu.png'}, 
        {id: 'zCi', src: 'skills/zCi.png'}, 
        {id: 'zKk', src: 'skills/zKk.png'}, 
        {id: 'zKk', src: 'skills/zKk.png'}, 
        {id: 'zRe', src: 'skills/zRe.png'}, 
        {id: 'zBr', src: 'skills/zBr.png'}, 
        {id: 'zJe', src: 'skills/zJe.png'},
        {id: 'zGy', src: 'skills/zGy.png'},
        {id: 'zRi', src: 'skills/zRi.png'},
        {id: 'zGo', src: 'skills/zGo.png'},
        {id: 'zNl', src: 'skills/zNl.png'}, //Face Stuff
        {id: 'zGJ', src: 'skills/zGJ.png'},
        {id: 'zDa', src: 'skills/zDa.png'},
        {id: 'zCr', src: 'skills/zCr.png'},
        {id: 'sBl', src: 'skills/sBl.png'},
        {id: 'zZn', src: 'skills/zZn.png'},
        {id: 'zFa', src: 'skills/zFa.png'},
        {id: 'zCl', src: 'skills/zCl.png'},
        {id: 'zNy', src: 'skills/zNy.png'},
        {id: 'zGr', src: 'skills/zGr.png'},
        {id: 'zSo', src: 'skills/zSo.png'},
        {id: 'zMa', src: 'skills/zMa.png'},
        {id: 'sBo', src: 'skills/sBo.png'},
        {id: "1", src: 'skills/1.png'},
        {id: "2", src: 'skills/2.png'},
        {id: "3", src: 'skills/3.png'},
        {id: "4", src: 'skills/4.png'},
        {id: "5", src: 'skills/5.png'},
        {id: "6", src: 'skills/6.png'},
        {id: "7", src: 'skills/7.png'},
        {id: "8", src: 'skills/8.png'},
        {id: "9", src: 'skills/9.png'},
        {id: '30', src: 'skills/30.png'},//Moves Pics
        {id: '31', src: 'skills/31.png'},//Moves Pics
        {id: '32', src: 'skills/32.png'},
        {id: '33', src: 'skills/33.png'},
        {id: '34', src: 'skills/34.png'},
        {id: '35', src: 'skills/35.png'},
        {id: '36', src: 'skills/36.png'},//Moves Pics
        {id: '37', src: 'skills/37.png'},
        {id: '38', src: 'skills/38.png'},
        {id: '39', src: 'skills/39.png'},//Moves Pics
        {id: '40', src: 'skills/40.png'},
        {id: '41', src: 'skills/41.png'},//Moves Pics
        {id: '42', src: 'skills/42.png'},
        {id: '43', src: 'skills/43.png'},
        {id: '44', src: 'skills/44.png'},
        {id: '45', src: 'skills/45.png'},
        {id: '46', src: 'skills/46.png'},//Moves Pics
        {id: '47', src: 'skills/47.png'},
        {id: '48', src: 'skills/48.png'},
        {id: '49', src: 'skills/49.png'},
        {id: '50', src: 'skills/50.png'},
        {id: '51', src: 'skills/51.png'},
        {id: '52', src: 'skills/52.png'},//Moves Pics
        {id: '53', src: 'skills/53.png'},
        {id: '54', src: 'skills/54.png'},
        {id: '55', src: 'skills/55.png'},
        {id: '56', src: 'skills/56.png'},
        {id: '57', src: 'skills/57.png'},
        {id: '58', src: 'skills/58.png'},
        {id: '59', src: 'skills/59.png'},
        {id: '60', src: 'skills/60.png'},
        {id: '61', src: 'skills/61.png'},
        {id: '62', src: 'skills/62.png'},
        {id: '63', src: 'skills/63.png'},
        {id: '64', src: 'skills/64.png'},
        {id: '65', src: 'skills/65.png'},
        {id: '66', src: 'skills/66.png'},
        {id: '67', src: 'skills/67.png'},
        {id: '68', src: 'skills/68.png'},
        {id: '69', src: 'skills/69.png'},
        {id: '70', src: 'skills/70.png'},
        {id: '71', src: 'skills/71.png'},
        {id: '72', src: 'skills/72.png'},
        {id: '73', src: 'skills/73.png'},
        {id: '74', src: 'skills/74.png'},
        {id: '75', src: 'skills/75.png'},
        {id: '76', src: 'skills/76.png'},
        {id: '77', src: 'skills/77.png'},
        {id: '78', src: 'skills/78.png'},
        {id: '79', src: 'skills/79.png'},
        {id: '80', src: 'skills/80.png'},
        {id: '81', src: 'skills/81.png'},
        {id: '82', src: 'skills/82.png'},
        {id: '83', src: 'skills/83.png'},
        {id: '84', src: 'skills/84.png'},
        {id: '85', src: 'skills/85.png'},
        {id: '86', src: 'skills/86.png'},
        {id: '87', src: 'skills/87.png'},
        {id: '88', src: 'skills/88.png'},
        {id: '89', src: 'skills/89.png'},
        {id: '90', src: 'skills/90.png'},
        {id: '91', src: 'skills/91.png'},
        {id: '92', src: 'skills/92.png'},
        {id: '93', src: 'skills/93.png'},
        {id: '94', src: 'skills/94.png'},
        {id: '95', src: 'skills/95.png'},
        {id: '96', src: 'skills/96.png'},
        {id: '97', src: 'skills/97.png'},
        {id: '98', src: 'skills/98.png'},
        {id: '99', src: 'skills/99.png'},
        {id: '100', src: 'skills/100.png'},
        {id: '101', src: 'skills/101.png'},
        {id: '102', src: 'skills/102.png'},
        {id: '103', src: 'skills/103.png'},
        {id: '104', src: 'skills/104.png'},
        {id: '105', src: 'skills/105.png'},
        {id: '106', src: 'skills/106.png'},
        {id: '107', src: 'skills/107.png'},
        {id: '108', src: 'skills/108.png'},
        {id: '109', src: 'skills/109.png'},
        {id: '110', src: 'skills/110.png'},
        {id: '111', src: 'skills/111.png'},
        {id: '112', src: 'skills/112.png'},
        {id: '113', src: 'skills/113.png'},
        {id: '114', src: 'skills/114.png'},
        {id: '115', src: 'skills/115.png'},
        {id: '116', src: 'skills/116.png'},
        {id: '117', src: 'skills/117.png'},
        {id: '118', src: 'skills/118.png'},
        {id: '119', src: 'skills/119.png'},
        {id: '120', src: 'skills/120.png'},
        {id: '121', src: 'skills/121.png'},
        {id: '122', src: 'skills/122.png'},
        {id: '123', src: 'skills/123.png'},
        {id: '124', src: 'skills/124.png'},
        {id: '125', src: 'skills/125.png'},
        {id: '126', src: 'skills/126.png'},
        {id: '127', src: 'skills/127.png'},
        {id: '128', src: 'skills/128.png'},
        {id: '129', src: 'skills/129.png'},
        {id: '130', src: 'skills/130.png'},
        {id: '131', src: 'skills/131.png'},
        {id: '132', src: 'skills/132.png'},
        {id: '133', src: 'skills/133.png'},
        {id: '134', src: 'skills/134.png'},
        {id: '135', src: 'skills/135.png'},
        {id: '136', src: 'skills/136.png'},
        {id: '137', src: 'skills/137.png'},
        {id: '138', src: 'skills/138.png'},
        {id: '139', src: 'skills/139.png'},
        {id: '140', src: 'skills/140.png'},
        {id: '141', src: 'skills/141.png'},
        {id: '142', src: 'skills/142.png'},
        {id: '143', src: 'skills/143.png'},
        {id: '144', src: 'skills/144.png'},
        {id: '145', src: 'skills/145.png'},
        {id: '146', src: 'skills/146.png'},
        {id: '147', src: 'skills/147.png'},
        {id: '148', src: 'skills/148.png'},
        {id: '149', src: 'skills/149.png'},
        {id: '150', src: 'skills/150.png'},
        {id: '151', src: 'skills/151.png'},
        {id: '152', src: 'skills/152.png'},
        {id: '153', src: 'skills/153.png'},
        {id: '154', src: 'skills/154.png'},
        {id: '155', src: 'skills/155.png'},
        {id: '156', src: 'skills/156.png'},
        {id: '157', src: 'skills/157.png'},
        {id: '158', src: 'skills/158.png'},
        {id: '159', src: 'skills/159.png'},
        {id: '160', src: 'skills/160.png'},
        {id: '161', src: 'skills/161.png'},
        {id: '162', src: 'skills/162.png'},
        {id: '163', src: 'skills/163.png'},
        {id: '164', src: 'skills/164.png'},
        {id: '165', src: 'skills/165.png'},
        {id: 'wzCl-t1', src: 'skills/wzCl-t1.png'},
        {id: 'yzCl-t2', src: 'skills/yzCl-t2.png'},
        {id: 'yzCl-t3', src: 'skills/yzCl-t3.png'},
        {id: 'wzNy-t1', src: 'skills/wzNy-t1.png'},
        {id: 'wzGr-t1', src: 'skills/wzGr-t1.png'},
        {id: 'wzSo-t1', src: 'skills/wzSo-t1.png'},
        {id: 'wzZn-t1', src: 'skills/wzZn-t1.png'},
        {id: 'rzGu-t1', src: 'skills/rzGu-t1.png'},
        {id: 'wzKG-t1', src: 'skills/wzKG-t1.png'},
        {id: 'bbKG-t1', src: 'skills/bbKG-t1.png'},
        {id: 'zPo-t1', src: 'skills/zPo-t1.png'},
        {id: 'bzKG-t2', src: 'skills/bzKG-t2.png'},
        {id: 'bzSV-t1', src: 'skills/bzSV-t1.png'},
        {id: 'wzKn-t1', src: 'skills/wzKn-t1.png'},
        {id: 'yzNa-t1', src: 'skills/yzNa-t1.png'},
        {id: 'wzSn-t1', src: 'skills/wzSn-t1.png'},
        {id: 'zGy-t1', src: 'skills/zGy-t1.png'},
        {id: 'wzRi-t1', src: 'skills/wzRi-t1.png'},
        {id: 'wzGJ-t1', src: 'skills/wzGJ-t1.png'},
        {id: 'wzCr-t1', src: 'skills/wzCr-t1.png'},
        {id: 'bzMe-t1', src: 'skills/bzMe-t1.png'},
        {id: 'rsBo-t1', src: 'skills/rsBo-t1.png'},
        {id: 'FF', src: 'skills/feral.png'},
        {id: 'G', src: 'skills/G.png'},
        {id: 'bge-t', src: 'skills/bge-t.png'},
        {id: 'ko', src: 'assets/Ko.png'},
        {id: 'green', src: 'assets/gold_capsule.png'},
        {id: "?", src: '/ava/box.png'},
        {id: "load", src: '/assets/loadingscreen2.png'},
        
        
    ]);
     
    queue.load();

    /*
     *      Create a timer that updates once per second
     *
     */
    
};

function updateLoading() {
	 var a = queue.progress * 100 | 0;
     loadingSettings[4].x = 364 + a * 1.7;
     loadingSettings[2].w = a / 100 * 182;
   
     
}

function nothing ()
{
    
}

function buy (num)
{
   var file = { action: "shop", c: num};
ws.send(JSON.stringify(file));  
}

function itemChoice()
{
    var a = $("#itemlist").val();
     var file = { action: "item", c: a};
ws.send(JSON.stringify(file));  
}



function getSkill(a)
{
var b;
var c;
//mo3
if (!isNaN(a.got))
    {
    
       a.got = Number(a.got);
    }

b = skillList(a.got,[0]);
if(a.rare === 3)
{
    c = "#e74c3c";
    
}
else if (a.rare === 2)
{
    c = "#d35400";
}
else if (a.rare === 1)
{
    c = "#2980b9";
}
else
{
    c = "black";
}

 setTimeout(function(){
   $(".random").attr("src",b[0])
  $(".random").fadeIn( 1000 );
$("#skilldescription").text(b[5]).css('color', c);
}, 3000);

}



function getItem(a)
{
    var b,c;
    
    if(a.rare === 3)
{
    c = "#e74c3c";
    
}
else if (a.rare === 2)
{
    c = "#d35400";
}
else if (a.rare === 1)
{
    c = "#2980b9";
}
else
{
    c = "black";
}
  
  b = itemList(a.got);
 setTimeout(function(){
   $(".random").attr("src","")
  $(".random").fadeIn( 2000 );
  $("#skilldescription").text(b[0]).css('color', c);
  $("#iteminfo").text(b[1]);
}, 3000); 
}

function getCharacter(a)
{
    var c;
    if(a.rare === 3)
{
    c = "#e74c3c";
    
}
else if (a.rare === 2)
{
    c = "#d35400";
}
else if (a.rare === 1)
{
    c = "#2980b9";
}
else
{
    c = "black";
}

  var b = characterList(a.got);
 setTimeout(function(){
   $(".random").attr("src",b[1])
    $(".random").fadeIn( 2000 );
  $("#skilldescription").text(b[2]).css('color', c);
}, 3000);
}

function getSpecial(a)
{
       var c;
    if(a.rare === 3)
{
    c = "#e74c3c";
    
}
else if (a.rare === 2)
{
    c = "#d35400";
}
else if (a.rare === 1)
{
    c = "#2980b9";
}
else
{
    c = "black";
}

  var b = extraList(a.got);
  
 setTimeout(function(){
     if (b[2] !== "none")
  {
      $(".random").attr("src",b[2])
        $(".random").fadeIn( 2000 );
  }
  
  
   $("#iteminfo").text(b[1]);
  $("#skilldescription").text(b[0]).css('color', c);
}, 3000);
}



function skillList(a,c)
{
if (!isNaN(a))
    {
        a = Number(a);
    }
    var b = [];
    
    var d = [];
    if (c[0] === 0)
    {
        d[0] = "none";
    }
    else
    {
        if (c[1] !== "bge-t"){d = [c[1]];} else{d[0] = "none" }
        
    }
    
    console.log(a);    switch (a)
{

// Generic Skill Sets    
case 1:
b.push( "/skills/1.png"); //Image
b.push( 1); //BP Cost
b.push( 2); // Cooldown
b.push( "Increases the characters Speed by 3.");  //Description
b.push( 20); //Energy
b.push( "Afterimage"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 2:
b.push( "/skills/2.png"); //Image
b.push( 1); //BP Cost
b.push( 3); //Cooldown
b.push( "The target becomes Ki Immune to the first enemy skill used on them for one turn.");
b.push( 20); //Energy
b.push( "Energy Deflect"); //Name of skill
b.push( "Defensive"); //Type
b.push( "Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 4:
b.push( "/skills/4.png"); //Image
b.push( 1); //BP Cost
b.push( 3); //Cooldown
b.push("The target gains full immunity to all enemy skills for 1 turn.");
b.push(20); //Energy
b.push( "Sonic Sway"); //Name of skill
b.push( "Defensive"); //Type
b.push( "Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 5:
b.push( "/skills/5.png"); //Image
b.push( 2); //BP Cost
b.push( 2); //Cooldown
b.push( "Decreases the targets Strength and Defense by 5 for two turns.");
b.push( 20); //Energy
b.push( "Solar Flare"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 6:
b.push( "/skills/6.png"); //Image
b.push( 1); //BP Cost                                                                       
b.push( 1); //Cooldown
b.push( "Deals 10 damage to one enemy.");
b.push( 20); //Energy
b.push("Punch"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 7:
b.push( "/skills/7.png"); //Image
b.push( 1); //BP Cost
b.push( 3); //Cooldown
b.push( "The target becomes Strength Immune to the first enemy skill used on them for one turn.");
b.push( 20); //Energy
b.push( "Strength Block"); //Name of skill
b.push( "Defensive"); //Type
b.push("Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 8:
b.push("/skills/8.png"); //Image
b.push( 1); //BP Cost
b.push( 1); //Cooldown
b.push( "Deals 10 damage to one enemy.");
b.push( 20); //Energy
b.push( "Ki Blast"); //Name of skill
b.push( "Ki"); //Type
b.push("Enemy"); //Focus
b.push(["None"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Goku Z
case 31:
if (d[0] === "none")
{
b.push("/skills/31.png"); //Image
b.push(1); //BP Cost
b.push(2); //Cooldown
b.push("One enemy takes 10 strength damage and has their Ki reduced by 2."); //Description
b.push(20);
b.push("Punishing Blow"); //Name of skill
b.push("Strength"); //Type
b.push("Enemy"); //Focus
b.push(["rzGu-t1"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
}
else if (d[0] === "rzGu-t1")
{
b.push("/skills/31.png"); //Image
b.push(1); //BP Cost
b.push(2); //Cooldown
b.push("One enemy takes 10 strength damage and has their Strength and Ki reduced by 2."); //Description
b.push(20); //Energy
b.push("Punishing Blow"); //Name of skill
b.push("Strength"); //Type
b.push("Enemy"); //Focus
b.push([31]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
}
break;

case 32:
b.push("/skills/32.png"); //Image
b.push(2); //BP Cost
b.push(3); //Cooldown
b.push("This skill charges for 2 turns, dealing 20 piercing ki damage on the third turn. If Goku is ki/full stunned during its duration, this skill will end and deal 5 less damage to the enemy. When sucessfully used on a character they will ignore future immunity skills.");
b.push(30); //Energy
b.push("Spirit Bomb"); //Name of skill
b.push("Ki"); //Type
b.push("Enemy"); //Focus
b.push([33]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 33:
b.push("/skills/33.png"); //Image
b.push(2); //BP Cost
b.push(3); //Cooldown
b.push( "This skill charges for 3 turns, dealing 40 piercing ki damage on the fourth turn. If Goku is ki/full stunned during its duration, this skill will end and deal 10 less damage to the enemy. When sucessfully used on a character they will ignore future immunity skills.");
b.push(40); //Energy
b.push("Large Spirit Bomb"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push([32]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 34:
b.push("/skills/34.png"); //Image
b.push( 1); //BP Cost
b.push( 0); //Cooldown
b.push( "This skill has a clash effect. One enemy takes 15 ki damage and if Goku's Ki is higher than the enemy's, this skill's damage becomes piercing.");
b.push( 20); //Energy
b.push( "Kamehameha"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push([35]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 35:
b.push( "/skills/35.png"); //Image
b.push( 2); //BP Cost
b.push( 0); // Cooldown
b.push( "This skill has a clash effect. One enemy takes 20 ki damage and if Goku's Ki is higher than the enemy's, this skill's damage becomes piercing.");  //Description
b.push( 20); //Energy
b.push( "Kaioken Kamehameha"); //Name of skill
b.push( "Ki"); //Focus
b.push( "Enemy"); //Type
b.push([34]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Kid Gohan
case 36:
console.log(d[0] + " info");
if (d[0] === "none")
{
b.push("/skills/36.png"); //Image
b.push( 0); //BP Cost
b.push( 2); //Cooldown
b.push( "Kid Gohan increases his BP gain by 1 for 1 turn.");
b.push( 30); //Energy
b.push( "Hidden Power"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Self"); //Focus
b.push( ["wzKG-t1"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
}
else if (d[0] === "wzKG-t1")
{
b.push("/skills/36.png");
b.push( 0);
b.push( 2);
b.push( "Kid Gohan increases his BP gain by 1 for 2 turns.");
b.push( 20);
b.push( "Hidden Power");
b.push( "Power-Up");
b.push( "Self");
b.push([39]);  
b.push(3);
b.push("C");
}
break;

case 37:
console.log(d[0] + " info");
if (d[0] === "none")
{
b.push("/skills/37.png"); //Image
b.push( 2); //BP Cost
b.push( 0); //Cooldown
b.push( "One enemy takes 20 ki damage. This skill deals 5 more ki damage if used consecutively on the same target the following turn.");
b.push( 30); //Energy
b.push( "Masenko"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( ["wzKG-t1"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
}
else if (d[0] === "wzKG-t1") {
b.push("/skills/37.png");
b.push( 2);
b.push( 0);
b.push( "One enemy takes 25 ki damage. This skill deals 10 more ki damage if used consecutively on the same target the following turn.");
b.push( 30);
b.push( "Masenko");
b.push( "Ki");
b.push( "Enemy");
b.push([40]);
b.push(1);  
b.push("C");
}
break;

case 38:
if (d[0] === "none")
{
b.push("/skills/38.png"); //Image
b.push( 1); //BP Cost
b.push( 1); //Cooldown
b.push( "Ignoring Speed, Gohan attacks dealing 15 strength damage to one enemy.");
b.push( 20); //Energy  
b.push( "Rushing Assualt"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(["wzKG-t1"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
}
else if (d[0] === "wzKG-t1") {
b.push("/skills/38.png");
b.push( 1);
b.push( 1);
b.push( "Ignoring Speed, Gohan attacks dealing 20 strength damage to one enemy.");
b.push( 20);
b.push( "Rushing Assualt");
b.push( "Strength");
b.push( "Enemy");
b.push(["41"]);
b.push(1);
b.push("C");
}
break;

case 39:
b.push( "/skills/39.png"); //Image
b.push( 2); //BP Cost
b.push( 2); // Cooldown
b.push( "Kid Gohan's Strength and Ki permanently increases by 5");  //Description
b.push( 10); //Energy
b.push( "Howl"); //Name of skill
b.push( "Power-Up"); //Focus
b.push( "Self"); //Type
b.push([36]); //Alternate
b.push(3); //Target: 1=enemy | 2=multiPle-Enemies | 3=self | 4=ally | 5=Multiple-AlliEs | 6=Any-Ally
b.push("C"); //Rarity
break;

case 40:
b.push( "/skills/40.png"); //Image
b.push( 2); //BP Cost
b.push( 0); // Cooldown
b.push( "One enemy takes 25 ki damage. This skill deals 10 more ki damage if used consecutively on the same target the following turn.");  //Description
b.push( 30); //Energy
b.push( "Mouth Blast"); //Name of skill
b.push( "Ki"); //Focus
b.push( "Enemy"); //Type
b.push([37]); //Alternate
b.push(1); //Target: 1=enemy | 2=multiPle-Enemies | 3=self | 4=ally | 5=Multiple-AlliEs | 6=Any-Ally
b.push("C"); //Rarity
break;

case 41:
b.push( "/skills/41.png"); //Image
b.push( 2); //BP Cost
b.push( 1); // Cooldown
b.push( "One enemy takes 20 strength damage and has their Speed permanently lowered by 3.");  //Description
b.push( 10); //Energy
b.push( "Oozaru Assualt"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push([38]); //Alternate
b.push(1); //Target: 1=enemy | 2=multiPle-Enemies | 3=self | 4=ally | 5=Multiple-AlliEs | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Krillin Z
case 42:
if (d[0] === "none")
{
b.push("/skills/42.png"); //Image
b.push(2); //BP Cost
b.push(2); //Cooldown
b.push( "Targets one enemy, countering the first skill that enemy uses for 1 turn.");
b.push(20); //Energy
b.push("High Velocity Kick"); //Name of skill
b.push("Strength"); //Type
b.push("Enemy"); //Focus
b.push(["wzKn-t1"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
}
else if (d[0] === "wzKn-t1")
{
b.push("/skills/42.png");
b.push(2);
b.push(1);
b.push( "Targets one enemy, countering the first skill that enemy uses for 1 turn. This skill is invisible.");
b.push(20);
b.push("High Velocity Kick");
b.push("Strength");
b.push("Enemy");
b.push([42]);
b.push(1);  
b.push("C");
}
break;

case 43:
b.push("/skills/43.png"); //Image
b.push( 1); //BP Cost
b.push( 1); //Cooldown
b.push( "Krillin throws an energy discus dealing 10 piercing ki damage to one enemy.");
b.push( 20); //Energy
b.push( "Destructo Disk"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push(["wzKn-t1"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 44:
b.push("/skills/44.png"); //Image
b.push( 2); //BP Cost
b.push( 1); //Cooldown
b.push( "Krillin throws multiple Destructo Disk's dealing 15 piercing ki damage to one enemy for 2 turns.");
b.push( 20); //Energy
b.push( "Destructo Disk Barrage"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push([43]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 45:
if (d[0] === "none")
{
b.push("/skills/45.png"); //Image
b.push( 2); //BP Cost
b.push( 1); //Cooldown
b.push( "All enemies take 10 ki damage.");
b.push( 30); //Energy
b.push( "Scattering Bullets"); //Name of skill
b.push( "Ki"); //Type
b.push( "Multiple-Enemies"); //Focus
b.push(["wzKn-t1"]); //Alternate
b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
}
else if (d[0] === "wzKn-t1")
{
b.push("/skills/45.png");
b.push( 2);
b.push(1);
b.push( "All enemies take 15 ki damage.");
b.push( 30);
b.push( "Scattering Bullets");
b.push( "Ki");
b.push( "Multiple-Enemies");
b.push([45]);
b.push(2);
b.push("C");
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Piccolo Z
case 46:
b.push("/skills/46.png"); //Image
b.push(1); //BP Cost
b.push(2); //Cooldown
b.push( "Piccolo gains 25 HP and his Defense is permanently increased by 5.");
b.push(20); //Energy
b.push("Regeneration"); //Name of skill
b.push("Power-Up"); //Type
b.push("Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 47:
b.push("/skills/47.png"); //Image
b.push(1); //BP Cost
b.push(2); //Cooldown
b.push("One enemy takes 15 ki damage. If that enemy is ki/full stunned they will instead take 30 ki damage. The following turn that enemy will have one random skill's cooldown increased by 2.");
b.push(30);// Energy
b.push("Special Beam Cannon"); //Name of skill
b.push("Ki"); //Type
b.push("Enemy"); //Focus
b.push(["None"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 48:
b.push("/skills/48.png"); //Image
b.push( 1); //BP Cost
b.push( 2); //Cooldown
b.push( "All enemy skills used on one ally will be reflected to Piccolo for 1 turn. This skill is invisible.");
b.push( 20); //Energy
b.push( "Sacrifice"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Support"); //Focus
b.push(["None"]); //Alternate
b.push(4); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Raditz Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 49:
b.push("/skills/49.png"); //Image
b.push( 1); //BP Cost
b.push( 1); //Cooldown
b.push( "One enemy takes 15 strength damage and if the target uses a skill they will have their Ki permanently reduced by 2. This skill's effects are doubled if the enemy is affected by Double Sunday.");
b.push( 30); //Energy
b.push( "Tuesday Assault"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 50:
b.push("/skills/50.png");
b.push( 2);
b.push( 2);
b.push( "Deals 10 piercing damage to one enemy for two turns. If the enemy was affected by Tuesday Assault the previous turn it will last one additional turn.");
b.push( 40);
b.push( "Double Sunday");
b.push( "Ki");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("R");
break;

case 51:
b.push("/skills/51.png");
b.push( 1);
b.push( 2);
b.push( "Enemy counter skills will be removed on all allies.");
b.push( 20);
b.push( "Scouter Analysis");
b.push( "Defensive");
b.push( "Multiple-Allies");
b.push(["None"]);
b.push(5);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Yamcha Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 52:
b.push("/skills/52.png");
b.push( 2);
b.push( 2);
b.push( "Deals 15 damage to one enemy for two turns. This lowers the enemy defense by 3.");
b.push( 30);
b.push( "Wolf Fang Fist");
b.push( "Strength");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 53:
b.push("/skills/53.png");
b.push( 1);
b.push( 2);
b.push( "This skill ki stuns one enemy. If Wolf Fang Fist or Spirit Ball is used the next turn on this character it will last one additional turn.");
b.push( 20);
b.push( "Suprise Attack");
b.push( "Strength");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 54:
b.push("/skills/54.png");
b.push( 2);
b.push( 3);
b.push( "Deals 15 damage to one enemy for two turns. This lowers the enemy's speed is reduced by 2.");
b.push( 30);
b.push( "Spirit Ball");
b.push( "Ki");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Saibamen Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 55:
if (d[0] === "none") {    
b.push("/skills/55.png");
b.push( 1);
b.push( 1);
b.push( "This skill targets one enemy and all damage Saibaman takes will be shared with that target for 1 turn.If that target uses a skill the cooldown on that skill will be increased by 2.");
b.push( 30);
b.push( "Saibamen Grab");
b.push( "Strength");
b.push( "Enemy");
b.push(["wzSn-t1"]);
b.push(1);
b.push("C");
}
else if (d[0] === "wzSn-t1")
{
b.push("/skills/55.png");
b.push( 2);
b.push( 2);
b.push( "This skill targets one enemy and all damage Saibaman takes will be shared with that target for 2 turns.If that target uses a skill the cooldown on that skill will be increased by 2.");
b.push( 30);
b.push( "Saibamen Grab");
b.push( "Strength");
b.push( "Enemy");
b.push([55]);
b.push(1); 
b.push("C");
}
break;

case 56:
if (d[0] === "none") {    
b.push("/skills/56.png");
b.push( 0);
b.push( 1);
b.push( "This skill lowers enemy's defense by 2 and does 3 Affliction damage.");
b.push( 30);
b.push( "Acid");
b.push( "Affliction");
b.push( "Enemy");
b.push(["wzSn-t1"]);
b.push(1);
b.push("C");
}
else if (d[0] === "wzSn-t1") {    
b.push("/skills/56.png");
b.push( 1);
b.push( 0);
b.push( "This skill lowers the enemy's defense by 2 and deals 3 Affliction damage permanentally.This skill stacks.");
b.push( 30);
b.push( "Acid");
b.push( "Affliction");
b.push( "Enemy");
b.push(56);
b.push(2);
b.push("C");
}
break;

case 57:
if (d[0] === "none") {  
b.push("/skills/57.png");
b.push( 2);
b.push( 3);
b.push( "Targets one enemy and if Saibaman dies the target will lose 25% of their health based on there current health. This skill last permanentally, is invisible, and can stack.");
b.push( 40);
b.push( "Self Destruct");
b.push( "Affliction");
b.push( "Enemy");
b.push(["wzSn-t1"]);
b.push(1);
b.push("C");
}
else if (d[0] === "wzSn-t1") {    
b.push("/skills/57.png");
b.push( 2);
b.push( 3);
b.push( "Targets one enemy and if Sabiaman dies the target will lose 50% of their health based on there current health. This skill last permanentally, is invisible, and can stack.");
b.push( 40);
b.push( "Self Destruct");
b.push( "Affliction");
b.push( "Enemy");
b.push(57);
b.push(1);
b.push("C");
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Tien Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 58:
b.push("/skills/58.png"); //Image
b.push( 3); //BP Cost
b.push( 2); // Cooldown
b.push( "Deals 40 affliction damage to one enemy and 10 affliction damage to Tien for each Neo Tri-Beam Charge affecting the target.This skill deals 15 more affliction damage for each Tri-Beam Charge on the enemy.");
b.push( 40); //Energy
b.push( "Neo Tri-Beam"); //Name of skill
b.push( "Afflication"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]); //Alternate
b.push(1); 
b.push("C"); //Rarity
break;

case 59:
b.push("/skills/59.png");
b.push(2);
b.push(1);
b.push( "Deals 20 piercing damage to one enemy and 5 affliction damage to Tien. This skill deals 5 more piercing damage for each Tri-Beam Charge on the enemy.");
b.push( 35);
b.push( "Tri-Beam");
b.push( "Ki");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 60:
b.push("/skills/60.png");
b.push( 1);
b.push( 1);
b.push( "Targets one enemy permanently marking them with Tri-Beam Charge. This skill friendly stuns and gains immunity to friendly skills for 1 turn.Each charge increases Tri-Beam and Neo Tri-Beams effects. This skill stacks.");
b.push( 30);
b.push( "Tri Beam Charge");
b.push( "Power-Down");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Chiaotzu Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 61:
b.push("/skills/61.png");
b.push( 1);
b.push( 2);
b.push( "One enemy has all stats lowered by 3 and has their friendly skills stunned for two turns.");
b.push( 20);
b.push( "Psychokinesis - Grab");
b.push( "Power-Down");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 62:
b.push("/skills/62.png");
b.push( 1);
b.push( 1);
b.push( "One enemy has their Defense lowered by 5, their Strength skills stunned for one turn, and 1 BP removed.");
b.push( 30);
b.push( "Psychokinesis - Control");
b.push( "Power-Down");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 63:
b.push("/skills/63.png");
b.push( 3);
b.push( 4);
b.push( "For two turns if the enemy uses a new skill, it will be reflected to one random enemy's ally. This skill is invisible.");
b.push( 50);
b.push( "Psychokinesis - Revoke");
b.push( "Power-Down");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Yajirobe Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 64:
b.push("/skills/64.png");
b.push( 1);
b.push( 0);
b.push( "This skill does 15 damage and lowers the enemy's defense by 2.");
b.push( 30);
b.push( "Miracle Ka-Blam Slash");
b.push( "Strength");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 65:
b.push("/skills/65.png");
b.push( 2);
b.push( 2);
b.push( "Yajirobe and one ally gain immunity to ki skills for 1 turn.");
b.push( 30);
b.push( "Yajirobe Flees");
b.push( "Defensive");
b.push( "Ally/Self");
b.push(["None"]);
b.push(4);
b.push("C");
break;

case 66:
var count = 0;
var length;
if (c[0] === 1)
{
var effects = c[2];
length = effects.length;
for (var i = 0; i < length; i++) {if (effects[i] === "66"){count += 1;} }
}
b.push("/skills/66.png");
b.push( 2);
b.push(0 + count);
b.push( "This skill can be used on one ally or yourself. This will recover 25% of the target health and energy. Each time this skill is used the cooldown will increase by 1.");
b.push( 40);
b.push( "Senzu Supply");
b.push( "Power-Up");
b.push( "Ally/Self");
b.push(["None"]);
b.push(6);
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// King Kai Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 67:
b.push("/skills/67.png");
b.push( 1);
b.push( 1);
b.push( "This skill increases strength and defense by 20%. This skill removes all counters.");
b.push( 30);
b.push( "King Kai's Training");
b.push( "Power-Up");
b.push( "Ally/Self");
b.push(["None"]);
b.push(6);
b.push("C");
break;

case 68:
b.push("/skills/68.png");
b.push( 1);
b.push( 1);
b.push( "This skill increases ki and speed by 20%. All stuns on this character are removed.");
b.push( 30);
b.push( "Bubbles's Training");
b.push( "Power-Up");
b.push( "Ally/Self");
b.push(["None"]);
b.push(6);
b.push("C");
break;

case 69:
b.push("/skills/69.png");
b.push( 2);
b.push( 2);
b.push( "The targeted enemy loses one bp.For one turn if an enemy uses a ki skill it will be countered. If the enemy uses a skill there ki and strength is reduced by 20%. This is invisible.");
b.push( 30);
b.push( "Telepathy");
b.push( "Power-Down");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nappa Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 70:
b.push("/skills/70.png");
b.push( 2);
b.push( 2);
b.push( "Deals 30 Affliction damage to one enemy.Bomber DX will fully stun a character for 1 turn if marked by Exploding Wave.");
b.push( 35);
b.push( "Bomber DX");
b.push( "Affliction");
b.push( "Enemy");
b.push( "None");
b.push(1);
b.push("C");
break;

case 71:
b.push("/skills/71.png");
b.push( 1);
b.push( 2);
b.push( "This skill puts a mark on all enemies for 1 turn. All enemies take 10 Affliction damage.");
b.push( 30);
b.push( "Exploding Wave");
b.push( "Affliction");
b.push( "Multiple-Enemies");
b.push( "None");
b.push(2);
b.push("R");
break;

case 72:
b.push("/skills/72.png");
b.push( 1);
b.push( 1);
b.push( "Deals 15 damage to one enemy and is permanently marked by Surging Assault, receiving 3 Affliction damage. Surging Assault will will stun friendly skills if enemy is marked by Exploding Wave.This Affliction stacks.");
b.push( 30);
b.push( "Surging Assault");
b.push( "Strength");
b.push( "Enemy");
b.push( "None");
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Scouter Vegeta Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 73:
b.push("/skills/73.png"); //Image
b.push( 2); //Bp Cost
b.push( 0); //Cooldown
b.push( "This skill deals 15 damage and has a clash effect. If Vegeta Scouter's Ki is higher than target this skill, it deals double damage.");
b.push( 25);
b.push( "Galick-Gun"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push([76]);
b.push(1);
b.push("R");
break;

case 74:
b.push("/skills/74.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push( "This skill blocks friendly skills on the enemy and stuns friendly skills for 1 turn."); //Description
b.push( 20); //Energy
b.push( "Scouter Analysis"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push([77]);
b.push(1);
b.push("R");
break;

case 75:
b.push("/skills/75.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "Vegeta Scouter deals 15 damage to one enemy and permanently increases his Speed by 3."); //Description
b.push( 25); //Energy
b.push( "Aerial Smash"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push([78]);
b.push(1);
b.push("C");
break;

case 76:
b.push("/skills/76.png"); //Image
b.push( 2); //Bp Cost
b.push( 0); //Cooldown
b.push( "This skill deals 20 damage and has a clash effect. If Vegeta Scouter's Ki is higher than the target this skill, it's damage is doubled."); //Description
b.push( 30); //Energy
b.push( "Mouth Blast"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push([73]);
b.push(1);
b.push("R");
break;

case 77:
b.push("/skills/77.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "This skill increases Vegeta Scouter's Ki and Strength by 10. The effects of this skill lasts until Great Ape ends"); //Description
b.push( 15); //Energy
b.push( "Howl"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Self"); //Focus
b.push([74]);
b.push(3);
b.push("R");
break;

case 78:
b.push("/skills/78.png"); //Image
b.push( 2); //Bp Cost
b.push( 0); //Cooldown
b.push( "Great Ape Vegeta smashes through an enemy dealing 20 damage."); //Description
b.push( 20); //Energy
b.push( "Great Ape Smash"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push([75]);
b.push(1);
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nail Z 
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 79:
b.push("/skills/79.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push( "Nail deals 10 damage and lowers the target's Strength by 2."); //Description
b.push( 30); //Energy
b.push( "Neck Chop"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 80:
b.push("/skills/80.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push( "Nail deals 15 damage to one enemy. The following turn, if that enemy uses a harmful skill it will be reflected to Nail."); //Description
b.push( 30); //Energy
b.push( "Mystic Flasher"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("S");
break;

case 81:
b.push("/skills/81.png"); //Image
b.push( 2); //Bp Cost
b.push( 3); //Cooldown
b.push( "Nail heals 30 HP (Scales with ki), increasing his Defense by 5 but reducing his Strength and Ki by 2."); //Description
b.push( 30); //Energy
b.push( "Regeneration"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Ally"); //Focus
b.push(["None"]);
b.push(3);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Guldo Z 
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 82:
b.push("/skills/82.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push( "All enemies lose 10 EP and defenses are lowered by 3. Each character that is effected by paralysis will have their energy lowered by 20."); //Description
b.push( 30); //Energy
b.push( "Time-Freezing"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Multiple-Enemies"); //Focus
b.push(["None"]);
b.push(2);
b.push("C");
break;

case 83:
b.push("/skills/83.png"); //Image
b.push( 3); //Bp Cost
b.push( 2); //Cooldown
b.push( "This skill does 20 damage to all enemies. If the enemy is effected by time-freezing this skill will lower their energy by 20. If the enemy is effected by paralysis this will also be a Full Stun to all enemies."); //Description
b.push( 40); //Energy
b.push( "Guldo's Special"); //Name of skill
b.push( "Strength"); //Type
b.push( "Multiple-Enemies"); //Focus
b.push(["None"]);
b.push(2);
b.push("C");
break;

case 84:
b.push("/skills/84.png"); //Image
b.push( 2); //Bp Cost
b.push( 1); //Cooldown
b.push( "All enemies friendly skills are stunned for 1 turn. If the enemy is affected by time-freeze this will also stun Ki based skills."); //Description
b.push( 30); //Energy
b.push( "Paralysis"); //Name of skill
b.push( "Ki"); //Type
b.push( "Multiple-Enemies"); //Focus
b.push(["None"]);
b.push(2);
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Recoome Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 85:
b.push("/skills/85.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "Recoome smashes an enemy to the ground dealing 15 damage and stunning their strength skills for one turn."); //Description
b.push( 30); //Energy
b.push( "Recoome Punch"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 86:
b.push("/skills/86.png"); //Image
b.push( 2); //Bp Cost
b.push( 4); //Cooldown
b.push( "Reccoome catches the enemy during their attack countering all skills used on him for one turn. The countered enemy will take double damage from Recoome Boom or Eraser Gun the following turn. This skill is invisible."); //Description
b.push( 30); //Energy
b.push( "Reccoome Grapple"); //Name of skill
b.push( "Defensive"); //Type
b.push( "Self"); //Focus
b.push(["None"]);
b.push(3);
b.push("R");
break;

case 87:
var count = 0;
var length;
if (c[0] === 1)
{
var effects = c[2];

length = effects.length;for (var i = 0; i < length; i++) {if (effects[i] === "87"){count += 1;} }

}
b.push("/skills/87.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push( "Reccoome fires Eraser Gun at the enemy dealing 15 damage. This skill increases Reccoome's Ki by 5 and 5 energy every time it is used.");
b.push(30 + count * 5); //Energy
b.push( "Eraser Gun"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Jeice Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 88:
b.push("/skills/88.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "Jeice moves swiftly increasing his Speed and Ki by 3. If used with Blue Hurricane Crasher this skill will last 2 turns instead and any counters or reflects used on jeice will be removed.");
b.push(20); //Energy
b.push( "Red Magma Crasher"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "All Allies"); //Focus
b.push(["None"]);
b.push(5);
b.push("C");
break;

case 89:
b.push("/skills/89.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "This skill has a clash effect. Aiming his crusher ball at an enemy, Jeice hits one enemy dealing 10 damage and if Jeice's speed is higher than the enemy this skill will go be before all skills. If used during Red Magama Crasher this skill this will give him immunity to strength skills for one turn. If the enemy has G-force on him they will lose 10 energy.If this skill is used in combination with Mach Punch the target will recieve 1 G-Force Mark."); 
b.push(30); //Energy
b.push( "Crusher Ball"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("R");
break;

case 90:
b.push("/skills/90.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push( "Burter and Jeice combine to attack the enemy team. This skill does 10 damage to all enemies and an additional 5 damage if the enemy has a G-force mark.If Red Magma Crasher is on this character all allies gain 3 ki.");
b.push(40); //Energy
b.push( "Purple Spiral Flash"); //Name of skill
b.push( "Ki"); //Type
b.push( "Multiple-Enemies"); //Focus
b.push(["None"]);
b.push(2);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Burter Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 91:
b.push("/skills/91.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "Burter moves at high speed increasing his Speed and strength by 3. If used with Red Magma Crasher this skill last 2 turns instead and stuns will be removed on Burter.");
b.push(20); //Energy
b.push( "Blue Hurricane Crasher"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Multiple-Allies"); //Focus
b.push(["None"]);
b.push(5);
b.push("C");
break;

case 92:
b.push("/skills/92.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "This skill has a clash effect. Burter punches an enemy at high speed dealing 20 damage to one enemy and if Burters speed is higher than his opponent, this skill deals piercing. If Blue Hurricane Crasher is in effect this skill will stun friendly skills for 1 turn. This skill will do an additional 10 damage to an enemy affected by G-force. If this skill is used in combination with Crusher Ball the target will recieve 1 G-Force Mark.");
b.push(30); //Energy
b.push( "Mach Punch"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("R");
break;

case 93:
b.push("/skills/93.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push( "If used on enemy, that enemy takes 15 damage and their speed is decreased by 3. If Blue Hurricane Crasher is in effect, Burter's team gains 3 strength. If G-force is on the enemy this will lower all stats by 5 and deals 35 damage.");
b.push(40); //Energy
b.push( "Purple Comet Crush"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ginyu Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 94:
b.push("/skills/94.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push( "This causes Ginyu to lose 20% of his health. Ginyu gains immunity to ki skills and cannot die for one turn. The targeted character will have immunity to friendly skills from him for two turns.");
b.push(30); //Energy
b.push( "Self Harm"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 95:
b.push("/skills/95.png"); //Image
b.push( 2); //Bp Cost
b.push( 3); //Cooldown
b.push( "You can use this skill on an ally or yourself. If the selected character is attacked by a skill then the enemy will be strength stunned for two turns.This skill lasts on an ally or yourself for one turn.");
b.push(30); //Energy
b.push( "Tornado Kick"); //Name of skill
b.push( "Defensive"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(6);
b.push("C");
break;

case 96:
b.push("/skills/96.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push( "Ginyu deals 10 damage and removes 10 energy from the enemy. This skills effects are doubled if used consecutively  This doesn't stack.");
b.push(30); //Energy
b.push( "Milky Cannon"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Cui Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 97:
b.push("/skills/97.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "This skill removes all current defense on one enemy during the battle phase and will be friendly blocked for 1 turn.");
b.push(30); //Energy
b.push( "Explosion Punch"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 98:
b.push("/skills/98.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push( "This skill puts the target in a dazed state for 1 turn and Cui's ki increases by 5.");
b.push(30); //Energy
b.push( "Ah! Lord Frieza!"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("S");
break;

case 99:
b.push("/skills/99.png"); //Image
b.push( 2); //Bp Cost
b.push( 0); //Cooldown
b.push( "This has a clash effect.If Cui's ki is higher than the enemy's defense this skill does 25 damage and lowers enemy's defense by 5.If less this skill does 15 damage and lowers enemy's defense by 3.");
b.push(30); //Energy
b.push( "Energy Bullet"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]);
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Roshi Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 100:
b.push("/skills/100.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "Roshi releases his highly practiced Kamehameha which dealing 15 damage to one enemy and reducing their Ki by 3.");
b.push(35); //Energy
b.push( "Kamehameha"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push([103]);
b.push(1);
b.push("C");
break;

case 101:
b.push("/skills/101.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push( "Roshi uses a technique which consists of a series of slow hand movements to lay his opponent to sleep, fully stunning them for 1 turn.");
b.push(30); //Energy
b.push( "Sleepy Boy Technique"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push([104]);
b.push(1);
b.push("C");
break;

case 102:
b.push("/skills/102.png"); //Image
b.push( 2); //Bp Cost
b.push( 1); //Cooldown
b.push( "If Roshi's target is in a transformation state, they are reverted back to their normal state. Roshi loses 5 Health each turn and cannot use his transformation state while this skill is active. If this skill was used on a target affected by Sleepy Boy Technique, Roshi's Defense will increase by 5 and they will lose 15 EP each turn. Re-use of this skill while active has no costs and will remove its current effects.");
b.push(30); //Energy
b.push( "Evil Containment Wave"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push([105]);
b.push(1);
b.push("R");
break;

case 103:
b.push("/skills/103.png"); //Image
b.push( 3); //Bp Cost
b.push( 3); //Cooldown
b.push( "Roshi fires his Kamehameha at maximum power dealing 30 piercing damage to one enemy. After this skill is used, Roshi's Transformation state ends and Roshi cannot use his Kamehameha for 1 turn.");
b.push(50); //Energy
b.push( "Max Kamehameha"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push([100]); //Focus
b.push(1);
b.push("C");
break;

case 104:
b.push("/skills/104.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( "Roshi directly punches an enemy with an immensely strong blow to the body dealing 10 damage and stunning the targets friendly skills for 1 turn.");
b.push(20); //Energy
b.push( "Max Punch"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push([101]);
b.push(1);
b.push("C");
break;

case 105:
b.push("/skills/105.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push( "Roshi deals 15 damage to one enemy and dazes them for 1 turn. This skill can only be used 2 times within a match as Roshi's stick breaks upon multiple uses.");
b.push(25); //Energy
b.push( "Roshi's Stick"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push([102]);
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Garlic Jr.
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 106:
b.push("/skills/106.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push( "This skill causes one enemy to become dazed and friendly stunned for 1 stun. The targeted character also gains  for 1 turn 10 ki and strength");
b.push(20); //Energy
b.push( "Mind Break"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push([117]);// Alternate skill, if any
b.push(1);
b.push("C");
break;

case 107:
b.push("/skills/107.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push( "This targets one enemy and for 2 turns the target is friendly blocked.");
b.push(25); //Energy
b.push( "Sealed Light Beam"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push( [118]);// Alternate skill, if any
b.push(1);
b.push("C");
break;

case 108:
b.push("/skills/108.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push( ": This skill does 15 damage to one enemy. If this enemy uses a skill next turn enemy will permentally take 5 afflication damage and will be strength stunned for one turn. This skill does afflication damage ends if Garlic Jr dies.  ");
b.push(25); //Energy
b.push( "Death Impact"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( [116]);// Alternate skill, if any
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Kid Goku 
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 109:
b.push("/skills/109.png"); 
b.push(2);
b.push(3);
b.push("This skill is marks all allies for 1 turn. If that ally uses a skill that ally's defense is increased by 3 and they will heal 15 health. Any reflects affecting your allies are removed.");
b.push(30);
b.push("Teamwork");
b.push("Power-Up");
b.push( "Multiple-Allies"); //Focus
b.push([112]);
b.push(5);
b.push("C");
break;

case 110:
b.push("/skills/110.png"); 
b.push(1);
b.push(3);
b.push("This skill targets one ally and places a full counter on them for the rest of the battle phase. Any enemy that targets this ally will be ki stunned for 2 turns.");
b.push(30);
b.push("Power Pole");
b.push("Defensive");
b.push( "Ally"); //Focus
b.push([113]);
b.push(4);
b.push("C");
break;

case 111:
b.push("/skills/111.png"); 
b.push(1);
b.push(1);
b.push("This skill has a clash effect. If Kid Goku has higher ki than the enemy, the enemy will take 15 piercing damage and their strength and speed will be lowered by 3. If Kid Goku's ki is lower this skill does 15 damage and increases Kid Goku's ki by 3.");
b.push(30);
b.push("Amature Kamehameha");
b.push("Ki");
b.push( "Enemy"); //Focus
b.push([114]);
b.push(1);
b.push("C");
break;

case 112:
b.push("/skills/112.png"); 
b.push(2);
b.push(2);
b.push("This increases your team strength by 5. This skill removes all stuns and dazed conditions on all allies . All of Kid Goku Oozaaru skills next turn have there alternative effects.");
b.push(25);
b.push("Oozaru's Lick");
b.push("Power-Up");
b.push( "Multiple-Allies"); //Focus
b.push([109]);
b.push(5);
b.push("C");
break;

case 113:
b.push("/skills/113.png"); 
b.push(2);
b.push(2);
b.push("This skill targets one enemy and counters their strength skills for 1 turn. If the enemy uses any skill they will take 25 damage. If Oozaru Roar was used the previous turn this skill will deal 35 damage instead.");
b.push(30);
b.push("Oozaru's Destruction");
b.push("Strength");
b.push( "Enemy"); //Focus
b.push([110]);
b.push(1);
b.push("C");
break;

case 114:
b.push("/skills/114.png"); 
b.push(3);
b.push(1);
b.push("This skill does 30 damage while also lowering ki and speed by 15%.If Oozaru Roar was used the previous turn this skill will deal 40 damage and lowers ki and speed by 20%.");
b.push(40);
b.push("Mouth Blast");
b.push("Ki");
b.push( "Enemy"); //Focus
b.push([111]);
b.push(1);
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Garlic Jr. Cont.
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 115:
if (d[0] === "none") {    
b.push("/skills/115.png"); //Image
b.push( 3); //Bp Cost
b.push( 0); //Cooldown
b.push("This skill increases the minimum amount of damage it takes for for Garlic Jr to die by 5. If this character is about to be killed and amount required is higher than the damage than Garlic Jr lives and removes two Immortality stack. This skill stacks.This a passive ability once used. This can only be used once.");
b.push(25);
b.push( "Immortality"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Self"); //Focus
b.push( ["wzGJ-t1"]);// Alternate skill, if any
b.push(3);
b.push("S");
}
else if (d[0] === "wzGJ-t1") {    
b.push("/skills/115.png"); //Image
b.push( 3); //Bp Cost
b.push( 0); //Cooldown
b.push("This skill increases the minimum amount of damage it takes for for Garlic Jr to die by 5. If this character is about to be killed and amount required is higher than the damage than Garlic Jr lives and removes two Immortality stack. This skill stacks.This a passive ability once used. This can only be used once.");
b.push(20);
b.push( "Immortality"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Self"); //Focus
b.push( [115]);// Alternate skill, if any
b.push(3);
b.push("S");
}

break;

case 116:
b.push("/skills/116.png"); //Image
b.push( 4); //Bp Cost
b.push( 0); //Cooldown
b.push("This skill removes all immortality stacks. During this time Garlic Jr is permanentally friendly stunned. All enemies are  instantly killed in 5 turns. Deadzone can't be blocked when used on enemies successfully effected. This skill can only be used once and ends if Garlic Jr dies.");
b.push(50);
b.push( "Dead Zone"); //Name of skill
b.push( "Ki"); //Type
b.push( "All Enemies"); //Focus
b.push( [106]);// Alternate skill, if any
b.push(2); //Target
b.push("S");
break;

case 117:
b.push("/skills/117.png"); //Image
b.push( 2); //Bp Cost
b.push( 1); //Cooldown
b.push("This skill does 20 damage to one enemy. If this enemy uses a skill next turn enemy will permentally take 5 afflication damage and will be strength stunned for one turn. This skill does afflication damage ends if Garlic Jr dies. ");
b.push(25);
b.push( "Death Impact"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( [108]);// Alternate skill, if any
b.push(1);
b.push("C");
break;

case 118:
b.push("/skills/118.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push("This skill targets one enemy and counters there strength skills for 1 turn. If the enemy is countered the enemy will take 15 damage and Super Garlic Jr gains immunity to strength skills for 1 turn.");
b.push(25);
b.push( "Darkness Illusion"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( [107]);// Alternate skill, if any
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Dodoria Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 119:
b.push("/skills/119.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push("This skill has a clash effect: Dodoria charges at one enemy headfirst stunning their strength skills for one turn and doing 15 damage. This skill has a clash effect. If the enemy's defense is lower than Dodorias speed, they will take 25 damage instead.");
b.push(30);
b.push( "Full Force Headbutt"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( "None");// Alternate skill, if any
b.push(1);
b.push("R");
break;


case 120:
b.push("/skills/120.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push("Dodoria counters all skills used on him during the battle phase. The following battle phase, any enemy who attacked Dodoria will take 10 more damage from Dodoria's skills for 1 turn. If a skill was successfully countered, Dodoria's speed is increased by 3.");
b.push(30);
b.push( "Tri-Form Afterimage"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Self"); //Focus
b.push( "None");// Alternate skill, if any
b.push(3);
b.push("R");
break;

case 121:
var checkHealth,a = 1;
if (c[0] === 1)
{

if (c[3].current === 1 && c[3].player )
{
    checkHealth = phealth1[0];

}

else if (c[3].current === 2 && c[3].player )
{
     checkHealth = phealth1[1];
}

else  if (c[3].current === 3 && c[3].player )
{
     checkHealth = phealth1[2];
}

else if (c[3].current === 1 && !c[3].player )
{
    checkHealth = phealth2[0];

}

else if (c[3].current === 2 && !c[3].player )
{
     checkHealth = phealth2[1];
}

else  if (c[3].current === 3 && !c[3].player )
{
     checkHealth = phealth2[2];
}


console.log("checkHealth: " + checkHealth);
console.log(c[3]);
if (checkHealth >= 120)
{
   a = 1;
}
else if (checkHealth >= 71)
{
   a = 2;
}
else if (checkHealth >= 21)
{
    a = 3;
}

else if (checkHealth <= 20)
{
    a = 4;
}
 
}
b.push("/skills/121.png"); //Image
b.push( a); //Bp Cost
b.push( 0); //Cooldown
b.push("Dodoria targets one enemy dealing 15 damage to them. This skill's damage increases by 10 and it's BP by 1 for every 50 HP Dodoria has lost.");
b.push(30);
b.push( "Laser Mouth Beam"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( "None");// Alternate skill, if any
b.push(1);
b.push("R");
break;

case 122:
b.push("/skills/122.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push("If one enemy's HP is 25 or less, they will be Executed.");
b.push(30);
b.push( "Neck Breaker"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( "None");// Alternate skill, if any
b.push(1);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Cooler
case 123:
b.push("/skills/123.png"); //Image
b.push( 0); //Bp Cost
b.push( 2); //Cooldown
b.push("Cooler rushes through the battlefield with a veil, increasing his ki by 3. The following turn, if Cooler is targeted by an enemy skill he gains 1 BP. ");
b.push(30);
b.push( "Nova Chariot"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Self"); //Focus
b.push( "None");// Alternate skill, if any
b.push(3);
b.push("R");
break;

case 124:
b.push("/skills/124.png"); //Image
b.push( 2); //Bp Cost
b.push( 1); //Cooldown
b.push("Cooler uses his own variation of death beam dealing 20 damage to one enemy. If that enemy's HP is 15 or less they will be Executed.");
b.push(30);
b.push( "Death Laser"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( "None");// Alternate skill, if any
b.push(1);
b.push("R");
break;

case 125:
b.push("/skills/125.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push("Cooler sets up his supernova by distracting the enemy with particle bomb. This skill deals 10 damage to one enemy and allows Supernova to be used for 2 turns. If Particle Bomb is used during this time, it deals 5 additional damage.");
b.push(30);
b.push( "Particle Bomb"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( "None");// Alternate skill, if any
b.push(1);
b.push("R");
break;

case 126:
b.push("/skills/126.png"); //Image
b.push( 3); //Bp Cost
b.push( 2); //Cooldown
b.push("Cooler fires a supernova dealing 20 damage to all enemies.");
b.push(40);
b.push( "Supernova"); //Name of skill
b.push( "Ki"); //Type
b.push( "All Enemies"); //Focus
b.push( "None"); // Alternate skill, if any
b.push(2);
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// No Char
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 127:
b.push("/skills/127.png"); //Image
b.push( 0); //Bp Cost
b.push( 0); //Cooldown
b.push("");
b.push( 0);
b.push( ""); //Name of skill
b.push( ""); //type
b.push( ""); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1) // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
break;

case 128:
b.push("/skills/128.png"); //Image
b.push( 0); //Bp Cost
b.push( 0); //Cooldown
b.push("");
b.push( 0);
b.push( ""); //Name of skill
b.push( ""); //type
b.push( ""); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1) // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
break;

case 129:
b.push("/skills/129.png"); //Image
b.push( 0); //Bp Cost
b.push( 0); //Cooldown
b.push("");
b.push( 0);
b.push( ""); //Name of skill
b.push( ""); //type
b.push( ""); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1) // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Zarbon Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 130:
b.push("/skills/130.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push("Zarbon kicks an enemy at full force dealing 10 damage and doing 3 additional damage with each consecutive use. If Zarbon becomes immune or is stunned this effect resets.");
b.push(30);
b.push( "Ruthless Blow"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( "Piledriver"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("R");
break;

case 131:
b.push("/skills/131.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push("Zarbon relentlessly pummels an enemy for 2 turns. This skill drops the enemy's defense by 2 then deals 10 damage each turn.");
b.push(30);
b.push( "Bloody Dance"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( "Monster Break"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("R");
break;

case 132:
b.push("/skills/132.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push("Zarbon fires his signature one handed ki blast at one enemy. The following turn that enemy takes 20 damage. If Zarbon is full/ki stunned before the damage applies, that enemy will take 10 damage instead.");
b.push(30);
b.push( "Elegant Blaster!"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( "Possibility Cannon"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Monster Zarbon Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 133:
b.push("/skills/133.png"); //Image
b.push( 2); //Bp Cost
b.push( 1); //Cooldown
b.push("Monster Zarbon blasts an enemy with an empowered elegant blaster, dealing 20 damage and reducing their strength by 2.");
b.push(30);
b.push( "Possibility Cannon!"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push(130); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("R");
break;

case 134:
b.push("/skills/134.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push("Monster Zarbon rushes one enemy dealing 25 damage and reducing their defense by 3.");
b.push(30);
b.push( "Monster Break"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push(131); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("R");
break;

case 135:
b.push("/skills/135.png"); //Image
b.push( 3); //Bp Cost
b.push( 3); //Cooldown
b.push("Monster Zarbon uses his most powerful skill, grabbing an enemy and fully stunning them for 1 turn. The following turn Zarbon piledrives the enemy, dealing 30 piercing damage to them. Zarbon cannot use other skills while this skill is active.");
b.push(35);
b.push( "Piledriver"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( 132); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("R");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Sansho Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 136:
if (d[0] === "wzSo-t1")
{
b.push("/skills/136.png"); //Image
b.push( 1); //Bp Cost
b.push( 3); //Cooldown
b.push("Sansho deals 5 piercing damage to one enemy for 1 turn. While affected is this enemy uses a new damaging skill during their battle phase, they will be stunned for 1 turn.");
b.push(20);
b.push( "Shoulder Ram"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
}
else
{
b.push("/skills/136.png"); //Image
b.push( 1); //Bp Cost
b.push( 3); //Cooldown
b.push("Sansho deals 5 piercing damage to one enemy for 1 turn. While affected is this enemy uses a new damaging skill during their battle phase, they will be stunned for 1 turn.");
b.push(30);
b.push( "Shoulder Ram"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");  
}
break;

case 137:
if (d[0] === "wzSo-t1")
{
b.push("/skills/137.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push("This skill has a clash effect. If Sansho’s Speed is higher than the targets, that enemy will have their cooldowns increased by 2 for 1 turn. If Sansho’s speed is lower, this skill taunts the enemy for 1 turn.");
b.push(20);
b.push( "Spinning Vortex"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
}
else
{
b.push("/skills/137.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push("This skill has a clash effect. If Sansho’s Speed Stat is higher than the enemy, the target will have their cooldowns increased by 2 for 1 turn. If Sansho’s speed is Lower, this skill taunts the enemy for 1 turn.");
b.push(30);
b.push( "Spinning Vortex"); //Name of skill
b.push( "Power-Down"); //Type
b.push( "Enemy"); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C"); 
}
break;

case 138:
if (d[0] === "wzSo-t1")
{
b.push("/skills/138.png"); //Image
b.push( 2); //Bp Cost
b.push( 3); //Cooldown
b.push("One enemy takes 10 piercing damage for 2 turns. During this time that enemy's base stats are temporary reduced by 5. This skill lasts 1 additional turn if the target is effected by Spinning Vortex.");
b.push(25);
b.push( "Una Zhu Fire"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
}
else
{
b.push("/skills/138.png"); //Image
b.push( 2); //Bp Cost
b.push( 3); //Cooldown
b.push("One enemy takes 10 piercing damage for 2 turns. During this time that enemy's base stats are reduced by 5. This skill lasts 1 additional turn if the target is effected by Spinning Vortex.");
b.push(35);
b.push( "Una Zhu Fire"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( "None"); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");  
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nicky Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 139:
b.push("/skills/139.png"); //Image
b.push( 2); //Bp Cost
b.push( 0); //Cooldown
b.push("One enemy will take 10 damage.  Depending on how many Lozenges Charge are on Nicky will make this skill last turns equal to the amount of stacks on him.The amount of stacks on this character will equal its cooldown for the skill plus 1.");
b.push(35);
b.push( "Katana Kogeki"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
break;

case 140:
b.push("/skills/140.png"); //Image
b.push( 0); //Bp Cost
b.push( 0); //Cooldown
b.push("Nicky charges his ki, gaining 1 Lozenges Charge stack. Lozenges Blast gains 5 additional damage for each Lozenges Charge stack on Nicky.At the end of the battle phase this skill will remove all stuns effecting him.");
b.push(20);
b.push( "Lozenges Charge"); //Name of skill
b.push( "Power-Up"); //Type
b.push( "Self"); //Focus
b.push( ""); // Alternate skill, if any
b.push(3); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
break;

case 141:
b.push("/skills/141.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push("One enemy takes 15 piercing damage.If this target is currently affected by Nicky’s Katana Kōgeki, this skill will stun ki skills for 2 turn. Upon use, this skill resets all stacks on Lozenges Blast to 0.");
b.push(35);
b.push( "Lozenges Blast"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ginger Z
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case 142:
if (d[0] === "wzSo-t1")
{
b.push("/skills/142.png"); //Image
b.push( 1); //Bp Cost
b.push( 1); //Cooldown
b.push("One enemy takes 15 damage and gains immunity to friendly skills for 1 turn. If the target is affected by Ginger Buster, this skill's damage becomes piercing and it ignores immunity.");
b.push(35);
b.push( "Katana Kogeki"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
}
else

{
b.push("/skills/142.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push("One enemy takes 15 damage and gains immunity to friendly skills for 1 turn. If the target is affected by Ginger Buster, this skill's damage becomes piercing and it ignores immunity.");
b.push(35);
b.push( "Katana Kogeki"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
}
break;

case 143:
if (d[0] === "wzSo-t1")
{
b.push("/skills/143.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push("One enemy has the costs of their skills increased by 15 EP for 1 turn. If the target is affected by Ginger Buster, that enemy's speed is reduced by 2.");
b.push(30);
b.push( "Spinning Vortex"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
}
else
{
    b.push("/skills/143.png"); //Image
b.push( 1); //Bp Cost
b.push( 3); //Cooldown
b.push("One enemy has the costs of their skills increased by 15 EP for 1 turn. If the target is affected by Ginger Buster, that enemy's speed is reduced by 2.");
b.push(30);
b.push( "Spinning Vortex"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate skill, if any
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C");
}
break;

case 144:
if (d[0] === "wzSo-t1")
{
b.push("/skills/144.png"); //Image
b.push( 2); //Bp Cost
b.push( 2); //Cooldown
b.push("This skill targets one enemy for 2 turns. During this time if the target doesn't use a skill, they will take 10 piercing damage. If the target performs a skill, Ginger's strength is permanently increased by 3.");
b.push(40);
b.push( "Ginger Buster"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C"); //Rarity
}
else
{
   b.push("/skills/144.png"); //Image
b.push( 2); //Bp Cost
b.push( 3); //Cooldown
b.push("This skill targets one enemy for 2 turns. During this time if the target doesn't use a skill, they will take 10 piercing damage. If the target performs a skill, Ginger's strength is permanently increased by 3.");
b.push(40);
b.push( "Ginger Buster"); //Name of skill
b.push( "Ki"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate
b.push(1); // 1 is enemy. 2 is all enemies. 3 is self. 4 is ally. 5 is all allies. 6 is one ally.
b.push("C"); //Rarity 
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Madematcha
case 162:
b.push("/skills/162.png"); //Image
b.push( 1); //Bp Cost
b.push( 3); //Cooldown
b.push("All enemies take 5 damage. The following turn if the affected enemies use any skill, they will have 1 Meda Stack applied on them." );
b.push(30); //Energy
b.push( "Evil Comet"); //Name of skill
b.push( "Ki"); //Type
b.push( "Multiple-Enemies"); //Focus
b.push( ""); // Alternate
b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 163:
b.push("/skills/163.png"); //Image
b.push( 0); //BP Cost
b.push( 0); //Cooldown
b.push("Using his clones Medamatcha applies 1 permanent Meda Stack to each enemy.");
b.push(15); //Energy
b.push( "Parasitic Meda Clones "); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 164:
b.push("/skills/164.png"); //Image
b.push( 1); //Bp Cost
b.push( 2); //Cooldown
b.push("Medamatcha uses his clones to absorb his enemy’s energy. This skill removes all Meda Stacks on one enemy. Medamatcha steals 10 EP from this energy per stack removed this way. ");
b.push(35); //Energy
b.push( "Meda Clone Consumption "); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate skill, if any
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;

case 165:
b.push("/skills/165.png"); //Image
b.push( 3); //Bp Cost
b.push( 3); //Cooldown
b.push("Medamatcha re-absorbs his clones into his body, removing all stacks of Parasitic Meda Clones on the enemy team. Medamatcha recovers 10 health per stack removed this way. ");
b.push(40);
b.push( "Revitalization"); //Name of skill
b.push( "Strength"); //Type
b.push( "Enemy"); //Focus
b.push( ""); // Alternate skill, if any
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C");
break;

case "wzSo-t1":
b.push("/skills/wzSo-t1.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push("PERMANENTLY SANSHO’S KI AND DEFENSE STAT ARE RAISED BY 50% AND HIS SKILLS COST 10 LESS EP. During this time Sansho takes 5 affliction damage.  RE USE OF THIS SKILL, OR ENERGY HITTING 0 WILL END THIS SKILL AND IT's EFFECTS.");
b.push(15); //Energy
b.push( "Super Sansho"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]);
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S");
break;

case "wzNy-t1":
b.push("/skills/wzNy-t1.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push("Permanently Nicky’s Ki and Speed, and stat are raised by 50%. While active Nicky takes 5 affliction damage and loses 15 EP . Re-use of this skill or energy hitting zero while active will remove its current effects. During this time Lozenges Blast will not reset Lozenges Charge to 0. ");
b.push(15); //Energy
b.push( "Super Nicky"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]);
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S");
break;

case "wzGr-t1":
b.push("/skills/wzGr-t1.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push("Permanently Ginger's, Defense, and Strength stat are raised by 50%. While active Nicky takes 5 affliction damage and loses 15 EP each turn. Re-use of this skill or energy hitting zero while active will remove its current effects. During this time Ginger's unique skills have their cool-downs reduced by 1.  ");
b.push(15); //Energy
b.push( "Super Ginger"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]);
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S");
break;

case "wzZn-t1":
b.push("/skills/wzZn-t1.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push("Zarbon transforms into his less aesthetic but very powerful monster form changing all his skills and increasing zarbons ki, strength, and defense by 8 When Zarbon runs out of energy or reuses this skill, these effects are reverted.Zarbon loses 15 EP each turn this is active.");
b.push(15); //Energy
b.push( "Monster Zarbon"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]);
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S");
break;

case "wzGJ-t1":
b.push("/skills/wzGJ-t1.png"); //Image
b.push( 1); //Bp Cost
b.push( 0); //Cooldown
b.push("Increases Garlic Jr's stats by 30% but decreases his energy by 10 each turn. This skill can't be canceled by Re-use or energy hitting zero. This skill can be stopped by moves that remove transformations and  will remove its current effects. If this used is used after in transformation state this skill will do nothing");
b.push(10); //Energy
b.push( "Super Garlic Jr"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]);
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S");
break;

case "bbKG-t1":
b.push("/skills/bbKG-t1.png"); 
b.push(2);
b.push(0);
b.push("Increases Kid Goku's Strength, Ki, and Defense by 50% but decreases his energy by 15 each turn. Re-use of this skill while active or energy hitting zero will remove its current effects.");
b.push(15);
b.push("Oozaru Goku");
b.push("Transformation");
b.push( "Self"); //Focus
b.push(["None"]);
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C");
break;

case "wzCr-t1":
b.push("/skills/wzCr-t1.png"); //Image
b.push(1); //BP Cost
b.push(0); //Cooldown
b.push("Cooler transforms increasing his power significantly gaining 50% to all stats but decreases his energy by 15 each turn. Re-use of this skill while active or energy hitting zero will remove its current effects.");
b.push(15); //Energy
b.push("Final Form Cooler"); //Name of skill
b.push("Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Goku Transformation
case "rzGu-t1":
b.push("/skills/rzGu-t1.png"); //Image
b.push( 1); //BP Cost
b.push( 0); //Cooldown
b.push( "Goku's Strength, Ki, and Speed increases by 4 each turn but his Defense decreases by 1. During this time Goku loses 15 energy. Re-use of this skill or energy hitting zero while active will remove its current effects.");
b.push( 15); //Energy
b.push( "Kaio-ken"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ginyu Force Stack
case "G":
b = ["/skills/G.png",0,0,0,0,"G-Force",0,0]; //
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Kid Gohan Transformation
case "wzKG-t1":
b.push( "/skills/wzKG-t1.png"); //Image
b.push( 1); //BP Cost
b.push( 0); //Cooldown
b.push( "Kid Gohan increases his stats by 60% but reduces his EP by 15 each turn. Re-use of this skill while active or energy hitting zero will remove its current effects.");
b.push( 15); //Energy
b.push( "Empowered Kid Gohan"); //Name of skill
b.push( "Transformation"); //Type
b.push("Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Kid Gohan Transformation
case "bzKG-t2":
b.push( "skills/bzKG-t2.png"); //Image
b.push(2); //BP Cost
b.push(0); //Cooldown
b.push("Kid Gohan's Strength, Ki, and Defense increases by 60% but his EP is reduced by 15 each turn. Re-use of this skill while active or energy hitting zero will remove its current effects.");
b.push(15); //Energy
b.push("Oozaru Kid Gohan"); //Name of skill
b.push("Transformation"); //Type
b.push("Self"); //Target
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Krillin Transformation
case "wzKn-t1":
b.push( "/skills/wzKn-t1.png"); //Image
b.push( 1); //BP Cost
b.push( 0); //Cooldown
b.push("Increases Krillin's stats by 50% but decreases his energy by 15 each turn. Re-use of this skill while active or energy hitting zero will remove its current effects.");
b.push( 15); //Energy
b.push("Empowered Krillin"); //Name of skill
b.push("Transformation"); //Type
b.push("Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nappa Transformation
case "yzNa-t1":
b.push( "/skills/yzNa-t1.png"); //Image
b.push( 2); //BP Cost
b.push( 0); //Cooldown
b.push("Nappa increases his stats by 30% but reduces his energy by 15 each turn. During this time any enemy who uses a new skill on Nappa will be permanently marked by Surging Assault. This effect stacks and re-use of this skill while active or energy hitting 0 will remove its current effects.");
b.push( 15); //Energy
b.push("Power Amp"); //Name of skill
b.push("Transformation"); //Type
b.push("Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Scouter Vegeta Transformation
case "bzSV-t1":
b.push( "/skills/bzSV-t1.png"); //Image
b.push( 2); //BP Cost
b.push( 0); //Cooldown
b.push("Vegeta Scouter's Strength, Ki, and Defense increases by 60% but his EP is reduced by 15 each turn. Re-use of this skill while active or energy hitting 0 will remove its current effects.");
b.push( 20); //Energy
b.push("Oozaru Vegeta"); //Name of skill
b.push("Transformation"); //Type
b.push("Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nail Transformation
case "zPo-t1":
b.push( "/skills/zPo-t1.png"); //Image
b.push( 2); //BP Cost
b.push( 1); //Cooldown
b.push("If Nail or Piccolo dies while Piccolo is an ally, Piccolo will gain 100 HP, 50 EP, and each of his stats permanently increases by 20. This skill is invisible and lasts until triggered.");
b.push(40); //Energy
b.push("Fuse with Nail"); //Name of skill
b.push("Transformation"); //Type
b.push("Ally"); //Focus
b.push(["None"]); //Alternate
b.push(4); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Generic Transformation
case "bge-t":
b.push("/skills/bge-t.png"); //Image
b.push(1); //BP Cost
b.push(0); //Cooldown
b.push( "Increases all stats by 25% but reduces the users EP by 10 each turn. Re-use of this skill while active or energy hitting 0 will remove its current effects.");
b.push( 10); //Energy
b.push( "Power-Up"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("C"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Saibaman Z Transformation
case "wzSn-t1":
b.push( "/skills/wzSn-t1.png"); //Image
b.push( 2); //BP Cost
b.push( 2); //Cooldown
b.push("This skill targets one ally, granting them 1 Defense each turn. Saibamen gains 5 HP for every Plant Seed on an ally. This skill is only removed if it is not targeting any allies.");
b.push( 40); //Energy
b.push("Plant Seed"); //Name of skill
b.push("Transformation"); //Type
b.push("Self"); //Focus
b.push(["None"]); //Alternate
b.push(4); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ginyu Z Transformation
case "zGy-t1":
b.push("/skills/zGy-t1.png"); //Image
b.push( 4); //BP Cost
b.push( 3); //Cooldown
b.push( "Ginyu swaps bodies with one character on the enemy team. Skills, stats, HP, EP, cooldowns, and the character are swapped. These effects are offensive.");
b.push(50); //Energy
b.push( "Body Change"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Enemy"); //Focus
b.push(["None"]); //Alternate
b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Roshi Transformation
case "wzRi-t1":
b.push("/skills/wzRi-t1.png"); //Image
b.push( 1); //BP Cost
b.push( 2); //Cooldown
b.push("Roshi's Strength, Ki and Defense is increased by 10 but his EP is reduced by 15 each turn. This skill cannot be used while Evil Containment Wave is active. Re-use of this skill while active or energy hitting 0 will remove its current effects.");
b.push(15); //Energy
b.push( "Max Power"); //Name of skill
b.push( "Transformation"); //Type
b.push( "Self"); //Focus
b.push(["None"]); //Alternate
b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
b.push("S"); //Rarity
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

default:
b.push( "/ava/box.png");
b.push(0);
b.push( 0);
b.push("Description");
b.push( 0);
b.push();
b.push( "none");
b.push( "none");
}//end switch
return b;
}

function characterList(a,c)
{
    var d = [];
    if (c[0] === 0)
    {
        d[0] = "none";
    }
    else
    {
        if (c[1] !== "bge-t"){d = [c[1]];} else{d[0] = "none" }
    }
    var b = [];
     switch (a)
{

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Chiaotzu
case "zCu":
if (d[0] === "none")
{
b.push("A fellow member of the Z warriors who shares a strong bond with Tien."); //description
b.push("/skills/zCu.png"); //Image
b.push("Chiaotzu (Z)"); //Name 
b.push("Hero,Human"); // Tags
b.push("C"); //Rarity
b.push([7, 9, 8, 10, 130, 100]); //Stats
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Cui Z
case "zCi":
if (d[0] === "none")
{
b.push("Cui, a soldier for Frieza. Cui is more or less a coward and thus he uses trickery in order to combat enemies that tend to be stronger than him.");
b.push("/skills/zCi.png");
b.push("Cui (Z)");
b.push("Villain,Frieza's Army");
b.push("C");
b.push([10, 10, 10, 10, 150, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Goku Z
case "zGu":
if (d[0] === "none")
{
b.push("Goku may seem human but he is actually a Saiyan. Though born into the Saiyan race, he has never once tried to destroy earth. Data says he seems to possess incredible power.");
b.push("/skills/zGu.png");
b.push("Goku (Z)");
b.push("Hero,Saiyan");
b.push("C");
b.push([13, 10, 10, 9, 170, 100]);  
}
else if (c[1] === "rzGu-t1")
{
b.push("It's Goku's Kaio-ken! He gains a massive upsurge of energy. Everything is heightened: power, speed, even hearing.However, it seems to take a toll on his body.");
b.push("/skills/zGu.png");
b.push("Kaio-ken Goku (Z)");
b.push("Hero,Saiyan");
b.push("C");
b.push([13, 10, 10, 9, 170, 100]);  
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Kid Gohan
case "zKG":
if (d[0] === "none")
{
b.push("Gohan is the son of Goku. Gohan has shown amazing potential at such a young age. Analysis of scouter data indicated untapped potential not yet revealed.");
b.push("/skills/zKG.png");
b.push("Kid Gohan (Z)");
b.push("Hero,Saiyan,Human");
b.push("C");
b.push([10, 10, 9, 8, 150, 100]);
}
else if (c[1] === "wzKG-t1")
{
b.push("Gohan powers has been unlocked. Analysis of scouter data shows overall power has increased by a great margin. It seems he is getting serious now!");
b.push("/skills/zKG.png");
b.push("Empowered Kid Gohan (Z)");
b.push("Hero,Saiyan,Human");
b.push("C");
b.push([13, 10, 10, 9, 150, 100]);  
}
else if (c[1] === "bzKG-t2")
{
b.push("Gohan has turn into a giant great ape and is on a rampage. Power level has increased greatly and seems only focus on destroying.");
b.push("/skills/zKG.png");
b.push("Oozaru Kid Gohan (Z)");
b.push("Hero,Saiyan,Human");
b.push("S");
b.push([13, 10, 10, 9, 150, 100]);  
}
else
{
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Krillin
case "zKn": 
if (d[0] === "none")
{
b.push("Krillin is a powerful earthling who also happens to be one of Goku's best friends.Krillin prefers to use long distance skills to attack his enemies and attack enemies in their blind spots.");
b.push("/skills/zKn.png");
b.push("Krillin (Z)");
b.push("Hero,Human");
b.push("C");
b.push([10, 12, 9, 9, 160, 100]);
}
else if (c[1] === "wzKn-t1")
{
b.push("Krillin powers have been unlocked. Analysis of scouter data determines that power has jumped quite a bit. Is this really the same Krillin?");
b.push("/skills/zKn.png");
b.push("Empowered Krillin (Z)");
b.push("Hero,Human");
b.push("C");
b.push([10, 12, 9, 9, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nappa
case "zNa":
if (d[0] === "none")
{
b.push("Nappa is an elite Saiyan warrior from Planet Vegeta, and Vegeta's partner in combat. Nappa is destructive and cocky which makes him fight in a powerhouse style of fighting.");
b.push("/skills/zNa.png");
b.push("Nappa (Z)");
b.push("Villain,Saiyan");
b.push("R");
b.push([11, 11, 12, 8, 170, 100]);
}
else if (c[1] === "yzNa-t1")
{
b.push("Nappa has a huge Power-Up and becomes dangerous to attack. It seems attacking him now will lead to your own death.");
b.push("/skills/zNa.png");
b.push("Power Amp Nappa (Z)");
b.push("Villain,Saiyan");
b.push("R");
b.push([11, 11, 12, 8, 170, 100]); 
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Piccolo Z
case "zPo":
if (d[0] === "none")
{
b.push("Piccolo is a wise strategist who was originally a ruthless enemy of Goku. He later becomes a permanent member of the Z Fighters during Dragon Ball Z."); //Description
b.push("/skills/zPo.png"); 
b.push("Piccolo (Z)"); 
b.push("Hero,Namekian"); 
b.push("C");
b.push([8, 8, 15, 10, 190, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Recoome
case "zRe":
if (d[0] === "none")
{
b.push("Recoome is a ruthless member of the Ginyu Force. He specializes in countering enemy attacks and finishing them off with devastating attacks."); 
b.push("/skills/zRe.png"); 
b.push("Recoome"); 
b.push("Villain,Frieza's Army"); 
b.push("C");
b.push([10, 11, 10, 9, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Jeice
case "zJe":
if (d[0] === "none")
{
b.push("A member of the infamous mercenary squad known as the Ginyu force. Burter is often partnered with Jeice and they combine their powers to perform deadly signature attacks."); 
b.push("/skills/zJe.png"); 
b.push("Jeice"); 
b.push("Villain,Frieza's Army"); 
b.push("R");
b.push([10, 11, 10, 9, 170, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Burter
case "zBr":
if (d[0] === "none")
{
b.push("A member of the infamous mercenary squad known as the Ginyu force. Burter is often partnered with Jeice and they combine their powers to perform deadly signature attacks.Nicknamed the blue hurricane, he was once known as the fastest person in the universe next to Frieza."); 
b.push("/skills/zBr.png"); 
b.push("Burter"); 
b.push("Villain,Frieza's Army"); 
b.push("R");
b.push([11, 7, 10, 12, 170, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ginyu
case "zGy":
if (d[0] === "none")
{    
b.push("Ginyu is the Captain of The Ginyu Force and one of Frieza's right-hand men. Ginyu is frightfully powerful, able to fight with overpowering strength and when things get too hot, changes bodies."); 
b.push("/skills/zGy.png"); 
b.push("Ginyu"); 
b.push("Villain,Frieza's Army"); 
b.push("S");
b.push([11, 7, 10, 12, 170, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nail
case "zNl":
if (d[0] === "none")
{
b.push("Nail is the most powerful Namekian and bodyguard of Grand Elder Guru. He is adept in most Namekian techniques, being able to regenerate instantly and fuse with other fighters to increase their power significantly.");
b.push("/skills/zNl.png");
b.push("Nail");
b.push("Hero,Namekian");
b.push("S");
b.push([8, 8, 15, 10, 190, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Raditz
case "zRz":
if (d[0] === "none")
{
b.push("Raditz is the brother of Goku, but with completely different personalities. He's heartless and mocks weak enemies,He has a strong build and dangerous energy beams to destroy his opponents.");
b.push("/skills/zRz.png");
b.push("Raditz (Z)");
b.push("Villain,Saiyan");
b.push("R");
b.push([10 ,10, 11, 11, 170]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Saibamen
case "zSn":
if (d[0] === "none")
{
b.push("A Saibaman is a green, humanoid creatures that grow from a planted seed placed in the ground. Saibaman possess only enough intelligence to understand orders and will do whatever it takes to kill there target.");
b.push("/skills/zSn.png");
b.push("Saibaman (Z)");
b.push("Villain,Creature");
b.push("C");
b.push([5, 5, 5, 10, 130, 100]);
}
else if (c[1] === "wzSn-t1")
{
b.push("Saibamen are on the field from planted seeds. With numbers these creatures become more dangerous and effective. ");
b.push("/skills/zSn.png");
b.push("Saibamen (Z)");
b.push("Villain,Creature");
b.push("C");
b.push([5, 5, 5, 10, 130, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Scouter Vegeta
case "zSV":
if (d[0] === "none")
{
b.push("Vegeta is the son of King Vegeta and a ruthless Saiyan, slaying even those who are loyal to him. He later has a change of heart and assists Goku and friends against the threats that target planet earth.");
b.push("/skills/zSV.png");
b.push("Scouter Vegeta (Z)");
b.push("Villain,Saiyan");
b.push("S");
b.push([12, 13, 9, 9, 170, 100]);
}
else if (c[1] === "bzSV-t1")
{
b.push("Vegeta turns into a great ape and gains tremendous power. Watch out for his mouth blast as it may be the last thing you see.");
b.push("/skills/zSV.png");
b.push("Oozaru Vegeta (Z)");
b.push("Villain,Saiyan");
b.push("S");
b.push([12, 13, 9, 9, 170, 100]);  
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Tien Z
case "zTn":
if (d[0] === "none")
{
b.push("Tien is one of the strongest humans in the Z universe and a close friend of Chiaotzu. He is proficient in ki and uses martial arts to his advantage.");
b.push("/skills/zTn.png");
b.push("Tien (Z)");
b.push("Hero,Human");
b.push("C");
b.push([10, 13, 10, 9, 150, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Yajirobe
case "zYe":
if (d[0] === "none")
{    
b.push("Yajirobe is a gallant warrior who trains mostly at Korin's Tower. Though not the strongest warrior, his swordsmanship and supportive capabilities aids the Z warriors through some of their toughest experiences.");
b.push("/skills/zYe.png");
b.push("Yajirobe (Z)");
b.push("Hero,Human");
b.push("C");
b.push([10, 7, 12, 7, 150, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Yamcha
case "zYa":
if (d[0] === "none")
{
b.push("Yamcha is a human on planet Earth and a Z fighter who aids Goku and his friends in upcoming battles. He is cocky and arrogant but has ferocious abilities.");
b.push("/skills/zYa.png");
b.push("Yamcha (Z)");
b.push("Hero,Human");
b.push("C");
b.push([10, 10, 10, 11, 150, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// King Kai
case "zKk":
if (d[0] === "none")
{    
b.push("King Kai is a humorous kai that possesses great intelligence and knowledge about the universe and specializes in universal telepathic links. King Kai uses his range of knowledge to teach others to become stronger.Scouter Data indicates that he is willing to train warriors if they tell a good joke.");
b.push("/skills/zKk.png");
b.push("King Kai");
b.push("Hero,God");
b.push("C");
b.push([8, 10, 11, 9, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Guldo
case "zGo":
if (d[0] === "none")
{    
b.push("Guldo is a member of the Ginyu Force and is considered the weakest in the group. Guldo uses a combination of psychic powers and time-like powers to overpower those who appose the Ginyu Force.");
b.push("/skills/zGo.png");
b.push("Guldo");
b.push("Villain,Frieza's Army");
b.push("C");
b.push([8, 10, 11, 9, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Roshi
case "zRi":
if (d[0] === "none")
{    
b.push("Roshi is a legendary martial artist. Along with being an expert martial artist, he was also the teacher of Goku and Krillin.");
b.push("/skills/zRi.png");
b.push("Roshi");
b.push("Hero,Human");
b.push("C");
b.push([6, 12, 9, 9, 160, 100]);
}
else if (c[1] === "wzRi-t1")
{
b.push("Roshi using his full power becomes not only powerful but has new tricks to use. It seems this form kamahamaha was about to destroy mountains.");
b.push("/skills/zRi.png");
b.push("Max Power Roshi");
b.push("Hero,Human");
b.push("S");
b.push([6, 12, 9, 9, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Kid Goku 
case "bKG":
if (d[0] === "none")
{    
b.push("A young boy who trains under a lengendary martial artist named Roshi. He is powerful fighter who will do whatever it takes to protect his friends.");
b.push("/skills/bKG.png");
b.push("Kid Goku");
b.push("Hero,Saiyan");
b.push("S");
b.push([6, 12, 9, 9, 160, 100]);
}

else if (c[1] === "bbKG-t1")
{    
b.push("Goku has transformed into a great ape and has become focused on nothing more than destruction. Goku powers seems to have greatly increased and threat to his enemies.");
b.push("/skills/bKG.png");
b.push("Oozaru Kid Goku");
b.push("Hero,Saiyan");
b.push("S");
b.push([6, 12, 9, 9, 160, 100]);
}
break;

case "zGJ":
if (d[0] === "none")
{    
b.push("This is a test character");
b.push("/skills/zGJ.png");
b.push("Garlic Jr");
b.push("Villain");
b.push("R");
b.push([9, 9, 9, 9, 160, 100]);
}
else if (c[1] === "wzGJ-t1")
{    
b.push("Garlic Jr releases his full power.");
b.push("/skills/bKG.png");
b.push("Super Garlic Jr");
b.push("Villain");
b.push("S");
b.push([9, 9, 9, 9, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Cooler
case "zCr":
if (d[0] === "none")
{    
b.push("Cooler is the older brother of Frieza. He is the more arrogant of the two believing his power tops anyone else in their particular universe.");
b.push("/skills/zCr.png");
b.push("Cooler");
b.push("Villain");
b.push("R");
b.push([9, 10, 9, 9, 170, 100]);
}
else if (c[1] === "wzCr-t1")
{    
b.push("Cooler releases his full power and transforms into his final form.");
b.push("/skills/zCr.png");
b.push("Final Form Cooler");
b.push("Villain");
b.push("S");
b.push([9, 10, 9, 9, 170, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Dodoria
case "zDa":
if (d[0] === "none")
{    
b.push("Dodoria is a ruthless warrior that serves as Friezas henchmen alongside Zarbon. While Dodoria and Zarbon are both tyrants Dodoria is a lot more brash.");
b.push("/skills/zDa.png");
b.push("Dodoria");
b.push("Villain,Frieza's Army");
b.push("C");
b.push([8, 10, 9, 9, 170, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Zarbon
case "zZn":
if (d[0] === "none")
{
b.push("Zarbon description goes here.");
b.push("/skills/zZn.png");
b.push("Zarbon (Z)");
b.push("Villain,Frieza's Army");
b.push("R");
b.push([8 ,10, 9, 11, 160, 100]);
}
else if (c[1] === "wzZn-t1")
{    
b.push("Zarbons Big Daddy form.");
b.push("/skills/wzZn-t1.png");
b.push("Monster Zarbon");
b.push("Villain,Frieza's Army");
b.push("S");
b.push([8, 10, 9, 11, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Sansho
case "zSo":
if (d[0] === "none")
{
b.push("Sansho is first seen when he attacks Piccolo with Ginger and Nicky. Later, Sansho and Ginger find and bring the last Dragon Balls to Garlic Jr. who summons Shenron and wishes for immortality.");
b.push("/skills/zSo.png");
b.push("Sansho (Z)");
b.push("Villain,Henchmen");
b.push("C");
b.push([9, 10, 10, 9, 170, 100]);
}
else if (c[1] === "wzSo-t1")
{    
b.push("Sansho gains a brief buff in his stats.");
b.push("/skills/wzSo-t1.png");
b.push("Super Sansho");
b.push("Villain,Henchmen");
b.push("S");
b.push([9, 10, 10, 9, 170, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ginger
case "zGr":
if (d[0] === "none")
{
b.push("Ginger is one of Garlic Jr.'s original trio of henchmen in Dragon Ball Z: Dead Zone.");
b.push("/skills/zGr.png");
b.push("Ginger (Z)");
b.push("Villain,Henchmen");
b.push("C");
b.push([9, 9, 9, 9, 160, 100]);
}
else if (c[1] === "wzGr-t1")
{    
b.push("Ginger gains a brief buff in his stats.");
b.push("/skills/wzGr-t1.png");
b.push("Super Ginger");
b.push("Villain,Henchmen");
b.push("S");
b.push([9, 9, 9, 9, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nicky
case "zNy":
if (d[0] === "none")
{
b.push("Nicky is a tall, white-haired, blue-skinned henchman of Garlic Jr. from the movie Dragon Ball Z: Dead Zone. Nicky also appears to have a fondness for fruit, as shown when he and the others kidnapped Gohan, he was seen plucking several pears into his mouth.");
b.push("/skills/zNy.png");
b.push("Nicky (Z)");
b.push("Villain,Henchmen");
b.push("C");
b.push([11, 11, 9, 9, 160, 100]);
}
else if (c[1] === "wzNy-t1")
{    
b.push("Nicky gains a brief buff in his stats.");
b.push("/skills/wzNy-t1.png");
b.push("Super Nicky");
b.push("Villain,Henchmen");
b.push("S");
b.push([11, 11, 9, 9, 160, 100]);
}
break;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Medamatcha
case "zMa":
if (d[0] === "none")
{
b.push("Upon arriving on Earth, Medamatcha locates the Dragon Balls for Lord Slug along with Angila, Wings, and three other soldiers in less than one hour, finding the One-Star Ball in a nest.");
b.push("/skills/zMa.png");
b.push("Medamatcha (Z)");
b.push("Villain,Demon");
b.push("C");
b.push([8, 9, 9, 6, 170, 100]);
}
break;

default:
b.push("Description");
b.push( "/ava/box.png");
b.push( "none");
}//end switch



return b;
} //switch end

function itemList(a)
{
    var b = [];
     switch (a)
{
    case "c1":
    b.push("Tempura Bowl");
    b.push("Heals one character by 20 HP.");
    b.push(1);
    b.push(0);
    b.push("Power-Up");
    b.push("Support");
    b.push(6);
    break;
    
    case "c2":
    b.push("Fried Pork Bowl");
    b.push("Heals one character by 30 HP.");
    b.push(2);
    b.push(1);  
    b.push("Power-Up");
    b.push("Support");
    b.push(6);
    break;
    
    case "c3":
    b.push("Chicken & Egg Bowl");
    b.push("Heals one character by 40 HP.");
    b.push(3);
    b.push(1); 
    b.push("Power-Up");
    b.push("Support");
    b.push(5);
    break;
    
    case "c4":
    b.push("Chilled Drink");
    b.push("Recovers 20 EP on one character.");
    b.push(1);
    b.push(0);
    b.push("Power-Up");
    b.push("Support");
    b.push(5);
    break;
    
    case "c5":
    b.push("Well Chilled Drink");
    b.push("Recovers 30 EP on one character.");
    b.push(1);
    b.push(0); 
    b.push("Power-Up");
    b.push("Support");
    b.push(6);
    break;
    
    case "c6":
    b.push("Extremely Chilled Drink");
    b.push("Recovers 40 EP on one character.");
    b.push(1);
    b.push(2); 
    b.push("Power-Up");
    b.push("Support");
    b.push(6);
    break;
    
    case "c7":
    b.push("King Kai’s Water");
    b.push("The highest cooldown on one character is reduced by 1.");
    b.push(1);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    b.push(6);
    break;
    
    case "c8":
    b.push("Super Holy Water Drop");
    b.push("Increases one character's Strength by 4.");
    b.push(1);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "c9":
    b.push("Hercule Drink");
    b.push("Increases one character's Defense by 5.");
    b.push(1);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "c10":
    b.push("Super Kami Water Drop");
    b.push("Increases one character's Ki by 4 for one turn.");
    b.push(1);
    b.push(1); 
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "c11":
    b.push("Magic Pot");
    b.push("The target ally will have one random effect applied to them.");
    b.push(2);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    b.push(7);
    break;
  
    case "c12":
    b.push("Pills");
    b.push("Increases BP by 1 for one turn.");
    b.push(0);
    b.push(2);
    b.push("Power-Up");
    b.push("Support");
    b.push(4);
    break;
    
    case "o1":
    b.push("Senzu Bean: Fourth");
    b.push("Recovers a fourth of one character's HP and EP.");
    b.push(2);
    b.push(3);
    b.push("Power-Up");
    b.push("Support");
    b.push(4);
    break;
    
    case "o2":
    b.push("Senzu Bean:Third");
    b.push("Recovers a third of one character's HP and EP.");
    b.push(3);
    b.push(3);
    b.push("Power-Up");
    b.push("Support");
    b.push(3);
    break;
    
    case "o3":
    b.push("Supreme Kai’s Water");
    b.push("The highest cooldown on one character is reduced by 2.");
    b.push(1);
    b.push(3);
    b.push("Power-Up");
    b.push("Support");
    b.push(3);
    break;
    
    case "o4":
    b.push("Super Holy Water Bottle");
    b.push("Increases one character's Strength by 8.");
    b.push(2);
    b.push(2);
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "o5":
    b.push("Hercule Drink DX");
    b.push("Increases one character's Defense by 10.");
    b.push(2);
    b.push(2);
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "o6":
    b.push("Super Kami Water Bottle");
    b.push("Increases one character's Ki by 8.");
    b.push(2);
    b.push(2);
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "o7":
    b.push("Baba's Pot");
    b.push("The target ally will have two random effects applied to them.");
    b.push(3);
    b.push(1);    
    b.push("Power-Up");
    b.push("Support");
    b.push(7);
    break;
    
    case "o8":
    b.push("Vaccine");
    b.push("Removes all current counters, dazed effects, and reflects on an ally.");
    b.push(2);
    b.push(0);
    b.push("Power-Up");
    b.push("Support");
    b.push(3);
    break;
    
    case "o9":
    b.push("Lord Slug's Pills");
    b.push("Increases bp by 1 for two turns.");
    b.push(3);
    b.push(0);
    b.push("Power-Up");
    b.push("Support");
    b.push(3);
    break;
    
    case "r1":
    b.push("Senzu Bean: Half");
    b.push("Recovers half of one character's HP and EP.");
    b.push(5);
    b.push(5); 
    b.push("Power-Up");
    b.push("Support");
    b.push(2);
    break;
    
    case "r2":
    b.push("Senzu Bean");
    b.push("Fully restores one character's HP and EP.");
    b.push(7);
    b.push(7);
    b.push("Power-Up");
    b.push("Support");
    b.push(1);
    break;
    
    case "r3":
    b.push("Grand Supreme Kai’s Water");
    b.push("All cooldowns on one character are reduced to 0.");
    b.push(3);
    b.push(3);  
    b.push("Power-Up");
    b.push("Support");
    b.push(4);
    break;
    
    case "r4":
    b.push("Super Holy Water");
    b.push("Increases one character's Strength by 12 for one turn.");
    b.push(3);
    b.push(3);  
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "r5":
    b.push("Hercule Drink SP");
    b.push("Increases one character's Defense by 15 for one turn.");
    b.push(3);
    b.push(3);   
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "r6":
    b.push("Super Kami Water");
    b.push("Increases one character's Ki by 12 for one turn.");
    b.push(3);
    b.push(3); 
    b.push("Power-Up");
    b.push("Support");
    b.push(9);
    break;
    
    case "r7":
    b.push("Bibidi’s Pot");
    b.push("The target ally will have three random effects applied to them.");
    b.push(2);
    b.push(2); 
    b.push("Power-Up");
    b.push("Support");
    b.push(3);
    break;
    
    default:
    b.push();
    b.push();
    b.push(0);
    b.push(0);    
    
}
return b;

}


function extraList(a)
{
    b = [];
    
    switch (a)
    {
        case "c1":
        b.push("Planet Creator");
        b.push("You may now create your own race!");
        b.push();
        break;
        
        case "c2":
        b.push("Custom Settings");
        b.push("You may now customize your In-game.");
        b.push();
        break;
        
        case "c3":
        b.push("Tournament Ticket");
        b.push("You may now enter a touranment.");
        b.push();
        break;

        case "o1":
        b.push("Trade");
        b.push("You may now trade.");
        b.push();
        break;
        
        case "o2":
        b.push("Item Fusion");
        b.push("You may now fuse items.");
        b.push();
        break;
        
        case "o3":
        b.push("Custom Colors");
        b.push("You may now choose a custom color for your in-game character borders.");
        b.push();
        break;
    
        case "d1":
        b.push("Dragon Ball Star #1");
        b.push("You obtained a Dragon Ball. Collect all 7 and get a wish!");
        b.push("/assets/dragonball1.png");
        break;
        
        case "d2":
        b.push("Dragon Ball Star #2");
        b.push("You obtained a Dragon Ball. Collect all 7 and get a wish!");
        b.push("/assets/dragonball2.png");
        break;
        
        case "d3":
        b.push("Dragon Ball Star #3");
        b.push("You obtained a Dragon Ball. Collect all 7 and get a wish!");
        b.push("/assets/dragonball3.png");
        break;
        
        case "d4":
        b.push("Dragon Ball Star #4");
        b.push("You obtained a Dragon Ball. Collect all 7 and get a wish!");
        b.push("/assets/dragonball4.png");
        break;
        
        case "d5":
        b.push("Dragon Ball Star #5");
        b.push("You obtained a Dragon Ball. Collect all 7 and get a wish!");
        b.push("/assets/dragonball5.png");
        break;
        
        case "d6":
        b.push("Dragon Ball Star #6");
        b.push("You obtained a Dragon Ball. Collect all 7 and get a wish!");
        b.push("/assets/dragonball6.png");
        break;
        
        case "d7":
        b.push("Dragon Ball Star #7");
        b.push("You obtained a Dragon Ball. Collect all 7 and get a wish!");
        b.push("/assets/dragonball7.png");
        break;
    }
    return b;
}


function queueLoaded(event)
{
    
 if (loaded === false)
 {
websocketGo(); 
loaded = true;
 }
 
 else
 {
      stage.removeAllChildren();
         stage.removeAllEventListeners();
     switch(loadingSettings[5])
     {
         case 2:
         Team();
         break;
         
         case 3:
         shopOpen();
         break;
         
         case 4:
         inventoryOpen();
         break;
         
         case 5:
         loadLadder("society",loadingSettings[6]);
         break;
         
         case 6:
         loadLadder("private",loadingSettings[6]);
         break;
         
         case 7:
         dragonverseOpen();
         break;
         
         case 8:
         loadLadder("society",loadingSettings[6]);
         break;
     }
 }
}



function websocketGo ()
{
     ws = new WebSocket('wss://game-ninetailschris.c9users.io/arena');
     ws.onopen    = function(m)  { console.log('websocket opened ');};
     ws.onclose   = function()  { console.log('websocket closed'); alert("Connection Ended f5"); mainMenu(); };
     ws.onerror = function(ev) { console.log('Error: '+ ev.data);};
     ws.onmessage = function(m) 
     { 
         
     console.log('websocket message: ' +  m.data); 
    //Server Messaging Actions
     server = JSON.parse(m.data);
     //console.log(server.msg);
     switch(server.msg)
     {
         case "user_info":
        
          stage.removeAllChildren();
         stage.removeAllEventListeners();
         dragonverseOpen();
              clearInterval(connection);
         
         clearInterval(gameTimer);
         stage.enableMouseOver(10);
         $("#nav-menu").fadeIn(1000);
         $("#music").fadeOut(2000).addClass("hidden");
         $("#Online").fadeIn(1000);
         $("#play")[0].pause();
     
         user = server;
         
         user.team = JSON.parse(user.team);
         user.stats = JSON.parse(user.stats);
         $("#urank").text('Lv ' + user.rank);
         $(".g").text('Username: ' + user.username+' \n Streak: ' + user.streak+' \n Wins/Losses: ' + user.wins+ "-" + user.losses+"\nZennie:" + user.money +' \n Planet: ' + user.clan+'');
         var a = user.stats[user.team[0]];
         var b = user.stats[user.team[1]];
         var c = user.stats[user.team[2]];
         var teamc = user.team;
         var uc = JSON.parse(user.uc);
         var us = JSON.parse(user.us);
         var s = user.stats;
         var d = user.skill;
         d = JSON.parse(d);
         var skill1 = d.s1;
         var skill2 = d.s2;
         var skill3 = d.s3;
         
         if (user.victory)
         {
             createjs.Sound.play("victory", {loop: 0});    
         }
         else
         {
             createjs.Sound.play("death", {loop: 0});    
         }
         setTimeout(function() {
              if (user.victory)
         {
              teambuilderinfo[4] = new createjs.Bitmap(queue.getResult("Win"));
         teambuilderinfo[4].x = 300;
         teambuilderinfo[4].y = 0;
         stage.addChild(teambuilderinfo[4]);
         
         teambuilderinfo[5] = new createjs.Bitmap(queue.getResult(user.team[0]));
         teambuilderinfo[5].x = 347;
         teambuilderinfo[5].y = 117;
         teambuilderinfo[5].scaleX = teambuilderinfo[5].scaleY = 0.90;
         stage.addChild(teambuilderinfo[5]);
         
          teambuilderinfo[6] = new createjs.Bitmap(queue.getResult(user.team[1]));
         teambuilderinfo[6].x = 347;
         teambuilderinfo[6].y = 228;
         teambuilderinfo[6].scaleX = teambuilderinfo[6].scaleY = 0.90;
         stage.addChild(teambuilderinfo[6]);
         
          teambuilderinfo[7] = new createjs.Bitmap(queue.getResult(user.team[2]));
         teambuilderinfo[7].x = 347;
         teambuilderinfo[7].y = 339;
         teambuilderinfo[7].scaleX = teambuilderinfo[7].scaleY = 0.90;
         stage.addChild(teambuilderinfo[7]);
         
         
         teambuilderinfo[8] = new createjs.Bitmap(user.avater);
         teambuilderinfo[8].x = 360;
         teambuilderinfo[8].y = 460;
          stage.addChild(teambuilderinfo[8]);
         user.new = JSON.parse(user.new);
    
         
         teambuilderinfo[9] = new createjs.Text("To Next Rank: " + user.new[0][3] + "                    " + user.new[0][0],"30px OB", "white");
       teambuilderinfo[9].x = 450;
       teambuilderinfo[9].y = 180;
       teambuilderinfo[9].textBaseline = "alphabetic";
       teambuilderinfo[9].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", 2, 2, 5);
       stage.addChild(teambuilderinfo[9]);
       
        teambuilderinfo[10] = new createjs.Text("To Next Rank: " + user.new[1][3]+ "                    " + user.new[1][0],"30px OB", "white");
       teambuilderinfo[10].x = 450;
       teambuilderinfo[10].y = 289;
       teambuilderinfo[10].textBaseline = "alphabetic";
       teambuilderinfo[10].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", 2, 2, 5);
       stage.addChild(teambuilderinfo[10]);
       
       teambuilderinfo[11] = new createjs.Text("To Next Rank: " + user.new[2][3]+ "                    " + user.new[2][0],"30px OB", "white");
       teambuilderinfo[11].x = 450;
       teambuilderinfo[11].y = 402;
       teambuilderinfo[11].textBaseline = "alphabetic";
       teambuilderinfo[11].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", 2, 2, 5);
       stage.addChild(teambuilderinfo[11]);
       
       teambuilderinfo[12] = new createjs.Text("To Next Rank: " + user.newuser[4]+ "                    " + user.newuser[0],"30px OB", "white");
       teambuilderinfo[12].x = 490;
       teambuilderinfo[12].y = 519;
       teambuilderinfo[12].textBaseline = "alphabetic";
       teambuilderinfo[12].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", 2, 2, 5);
       stage.addChild(teambuilderinfo[12]);
       
       var playAgain = new createjs.Shape();
       playAgain.graphics.beginFill("black").drawRect(350,590, 160, 50);
       playAgain.alpha = 0.01;
       playAgain.cursor = "pointer";
       playAgain.addEventListener("click",function(){loadLadder("society",loadingSettings[6]);});
        stage.addChild(playAgain);
        
       var mainMenu = new createjs.Shape();
       mainMenu.graphics.beginFill("black").drawRect(520,590, 160, 50);
       mainMenu.alpha = 0.01;
       mainMenu.cursor = "pointer";
        stage.addChild(mainMenu);
        
       var changeTeam = new createjs.Shape();
       changeTeam.graphics.beginFill("black").drawRect(690,590, 160, 50);
       changeTeam.alpha = 0.01;
        changeTeam.cursor = "pointer";
        changeTeam.addEventListener("click",function(){loading(2);});
     stage.addChild(changeTeam);
     
        
         console.log("Working Yes? " + user.newuser);
         }
         else
         {
              teambuilderinfo[4] = new createjs.Bitmap(queue.getResult("Lose"));
         teambuilderinfo[4].x = 300;
         teambuilderinfo[4].y = 0;
         teambuilderinfo[4].cursor = "default";
         stage.addChild(teambuilderinfo[4]);
         }
             
             
             
         }, 1000);
        
        
         var quest = JSON.parse(user.quest);
         p1stats = {c1:teamc[0],c2:teamc[1],c3:teamc[2], a:true,cS1:skill1,cS2:skill2,cS3:skill3,current:0,hold:[null,null,false],stats:s,statshold:[false],uc: uc, us: us, quest: quest};
         
         //function 
         break;
         
         case "Searching":
         teambuilderinfo[0] = "Find";
         break;
         
         case "buy":
         user.us = server.unlockedskills;
         user.uc = server.unlockedcharacters;
         user.money = server.money;
         user.items = server.items;
         user.stats = JSON.parse(server.stats);
         $("#itemList").modal("hide");
         break;
         
         case "inventory":
         user.us = server.unlockedskills;
         user.uc = server.unlockedcharacters;
         user.money = server.money;
         user.items = server.items;
         user.stats = JSON.parse(server.stats);
         user.kili = server.kili;
         break;
         
         case "checkQuest":
         server.report
         var dailyTitle = [];
         var dailyMoney = [];
         var dailyDescription = [];
         var dailyAmount = [];
         var fight;
         var endTurnImage,dailyMenu,dailyMenuQuest1,dailyMenuQuest2,dailyMenuQuest3,X;
        
       endTurnImage = new createjs.Shape();
       endTurnImage.graphics.beginFill("black").drawRect(0,0, 1200, 720);
       endTurnImage.alpha = 0.7;
       endTurnImage.cursor = "default";
       endTurnImage.addEventListener("click",nothing);
       stage.addChild(endTurnImage); 
    
       dailyMenu = new createjs.Bitmap(queue.getResult("dailyQuestMenu"));
       dailyMenu.x = 390;
       dailyMenu.y = 20;
       stage.addChild(dailyMenu);
       
       X = new createjs.Bitmap(queue.getResult("x"));
       X.x =800;
       X.y = 0;
       X.cursor = "pointer";
       X.addEventListener('click', function(){removeQuest();});
       stage.addChild(X);
       
       server.quest = JSON.parse(server.quest);
       
       var title,description,amount;
      
       if(server.quest['current'][0] === true)
       {
       if (server.quest.conditions[0][0] === "Victory")
       {
        
          description = 'Win  '+server.quest['conditions'][0][2]+  ' games with any team.'
          title = "VICTORY";
          amount = server.quest.conditions[0][1]+'/'+server.quest.conditions[0][2];
       }
       
       else if (server.quest.conditions[0][0] === "Row")
       {
         
          description = 'Win  '+server.quest['conditions'][0][2]+  ' games in a row with any team.'
          title = "UNSTOPPABLE";
          amount = server.quest.conditions[0][1]+'/'+server.quest.conditions[0][2];
       }
       
       else if (server.quest.conditions[0][0] === "Damage")
       {
        
          description = 'Deal  '+server.quest['conditions'][0][2]+  ' damage over time.'
          title = "PUNISHMENT";
          amount = server.quest.conditions[0][1]+'/'+server.quest.conditions[0][2];
       }
       
        else if (server.quest.conditions[0][0] === "Character")
       {
          fight = characterList(server.quest['conditions'][0][4],[0]);
          description = 'Win  '+server.quest['conditions'][0][2]+  ' games with '+ fight[2] +'.';
          title = "FIGHTER";
          amount = server.quest.conditions[0][1]+'/'+server.quest.conditions[0][2];
       }
       
       
       dailyTitle[0] = new createjs.Text(title, "22px OB", "white");
       dailyTitle[0].x = 660;
       dailyTitle[0].y = 160;
       dailyTitle[0].textAlign = "center";
       dailyTitle[0].textBaseline = "alphabetic";
       dailyTitle[0].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", 2, 2, 5);
       stage.addChild(dailyTitle[0]);
       
       dailyMoney[0] = new createjs.Text(server.quest.conditions[0][3] + " Zennie", "16px Aero", "white");
       dailyMoney[0].x = 650;
       dailyMoney[0].y = 268;
       dailyMoney[0].shadow = new createjs.Shadow("rgba(0,0,0,1)", 2, 2, 1);
       dailyMoney[0].textBaseline = "alphabetic";
       stage.addChild(dailyMoney[0]);
       
       dailyDescription[0] = new createjs.Text(description, "14px Aero", "white");
       dailyDescription[0].x = 460;
       dailyDescription[0].y = 195;
       dailyDescription[0].lineWidth = 300;
       dailyDescription[0].lineHeight = 20;
       dailyDescription[0].textBaseline = "alphabetic";
       stage.addChild(dailyDescription[0]);
    
       dailyAmount[0] = new createjs.Text(amount, "14px Aero", "white");
       dailyAmount[0].x = 530;
       dailyAmount[0].y = 268;
       dailyAmount[0].shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 2, 1);
       dailyAmount[0].textBaseline = "alphabetic";
       dailyAmount[0].textAlign = "center";
       stage.addChild(dailyAmount[0]);
       }
       
        if(server.quest.current[1] === true)
        {
       //-------------
       if (server.quest.conditions[1][0] === "Victory")
       {
         
          description = 'Win  '+server.quest['conditions'][1][2] +  ' games with any team.'
          title = "VICTORY";
          amount = server.quest.conditions[1][1]+'/'+server.quest.conditions[1][2];
       }
        else if (server.quest.conditions[1][0] === "Row")
       {
         
          description = 'Win  '+server.quest['conditions'][1][2] +  ' games in a row with any team.'
          title = "UNSTOPPABLE";
          amount = server.quest.conditions[1][1]+'/'+server.quest.conditions[1][2];
       }
       
       else if (server.quest.conditions[1][0] === "Damage")
       {
         
          description = 'Deal  '+server.quest['conditions'][1][2] +  ' damage over time.'
          title = "PUNISHMENT";
          amount = server.quest.conditions[1][1]+'/'+server.quest.conditions[1][2];
       }
       
        else if (server.quest.conditions[1][0] === "Character")
       {
          
          fight = characterList(server.quest['conditions'][1][4],[0]);
          description = 'Win  '+server.quest['conditions'][1][2] +  ' games with ' + fight[2]+ '.';
          title = "FIGHTER";
          amount = server.quest.conditions[1][1]+'/'+server.quest.conditions[1][2];
       }
       
       
       dailyTitle[1] = new createjs.Text(title, "22px Aero", "white");
       dailyTitle[1].x = 660;
       dailyTitle[1].y = 340;
       dailyTitle[1].textBaseline = "alphabetic";
       dailyTitle[1].textAlign = "center";
       dailyTitle[1].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", 2, 2, 5);
       stage.addChild(dailyTitle[1]);
       
       dailyMoney[1] = new createjs.Text(server.quest.conditions[1][3] + " Zennie", "14px Aero", "white");
       dailyMoney[1].x = 650;
       dailyMoney[1].y = 452;
       dailyMoney[1].shadow = new createjs.Shadow("rgba(1,1,1,1)", 2, 2, 1);
       dailyMoney[1].textBaseline = "alphabetic";
       stage.addChild(dailyMoney[1]);
       
       dailyDescription[1] = new createjs.Text(description, "14px Aero", "white");
       dailyDescription[1].x = 460;
       dailyDescription[1].y = 375;
       dailyDescription[1].lineWidth = 300;
       dailyDescription[1].lineHeight = 20;
       dailyDescription[1].textBaseline = "alphabetic";
       stage.addChild(dailyDescription[1]);
    
       dailyAmount[1] = new createjs.Text(amount, "14px Aero", "white");
       dailyAmount[1].x = 530;
       dailyAmount[1].y = 452;
       dailyAmount[1].shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 2, 1);
       dailyAmount[1].textAlign = "center";
       dailyAmount[1].textBaseline = "alphabetic";
       stage.addChild(dailyAmount[1]);
        }
        if(server.quest['current'][2] === true)
        {
       //-------------
       if (server.quest.conditions[2][0] === "Victory")
       {
          
          description = 'Win  '+server.quest['conditions'][2][2]+  ' games with any team.'
          title = "VICTORY";
          amount = server.quest.conditions[2][1]+'/'+server.quest.conditions[2][2];
       }
        else if (server.quest.conditions[2][0] === "Row")
       {
         
          description = 'Win  '+server.quest['conditions'][2][2]+  ' games in a row with any team.'
          title = "UNSTOPPABLE";
          amount = server.quest.conditions[2][1]+'/'+server.quest.conditions[2][2];
       }
       
       else if (server.quest.conditions[2][0] === "Damage")
       {
          
          description = 'Deal  '+server.quest['conditions'][2][2]+  ' damage over time.'
          title = "PUNISHMENT";
          amount = server.quest.conditions[2][1]+'/'+server.quest.conditions[2][2];
       }
       
        else if (server.quest.conditions[2][0] === "Character")
       {
          fight = characterList(server.quest['conditions'][2][4],[0]);
          description = 'Win  '+server.quest['conditions'][2][2]+  ' games with '+fight[2]+'.';
          title = "FIGHTER";
          amount = server.quest.conditions[2][1]+'/'+server.quest.conditions[2][2];
       }
       
      
       
       dailyTitle[2] = new createjs.Text(title, "22px Aero", "white");
       dailyTitle[2].x = 660;
       dailyTitle[2].y = 525;
       dailyTitle[2].textBaseline = "alphabetic";
       dailyTitle[2].textAlign = "center";
       dailyTitle[2].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", 2, 2, 5);
       stage.addChild(dailyTitle[2]);
       
       dailyMoney[2] = new createjs.Text(server.quest.conditions[2][3] + " Zennie", "14px Aero", "white");
       dailyMoney[2].x = 650;
       dailyMoney[2].y = 637;
       dailyMoney[2].shadow = new createjs.Shadow("rgba(1,1,1,1)", 2, 2, 1);
       dailyMoney[2].textBaseline = "alphabetic";
       stage.addChild(dailyMoney[2]);
       
       dailyDescription[2] = new createjs.Text(description, "14px Aero", "white");
       dailyDescription[2].x = 460;
       dailyDescription[2].y = 560;
       dailyDescription[2].lineWidth = 300;
       dailyDescription[2].lineHeight = 20;
       dailyDescription[2].textBaseline = "alphabetic";
       stage.addChild(dailyDescription[2]);
    
       dailyAmount[2] = new createjs.Text(amount, "14px Aero", "white");
       dailyAmount[2].x = 530;
       dailyAmount[2].y = 637;
       dailyAmount[2].shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 2, 1);
       dailyAmount[2].textBaseline = "alphabetic";
       dailyAmount[2].textAlign = "center";
       stage.addChild(dailyAmount[2]);
        }
       
       
        break;
        
        function removeQuest()
        {
             createjs.Sound.play("select", {loop: 0,volume:0.1});
            stage.removeChild(endTurnImage); 
            stage.removeChild(dailyMenu);
            stage.removeChild(dailyMenuQuest1); 
            stage.removeChild(dailyMenuQuest2);
            stage.removeChild(dailyMenuQuest3);
            stage.removeChild(X);
            stage.removeChild(dailyTitle[0]);
            stage.removeChild(dailyMoney[0]);
            stage.removeChild(dailyDescription[0]);
            stage.removeChild(dailyAmount[0]);
            stage.removeChild(dailyTitle[1]);
            stage.removeChild(dailyMoney[1]);
            stage.removeChild(dailyDescription[1]);
            stage.removeChild(dailyAmount[1]);
            stage.removeChild(dailyTitle[2]);
            stage.removeChild(dailyMoney[2]);
            stage.removeChild(dailyDescription[2]);
            stage.removeChild(dailyAmount[2]);
            
        }
         break;
         
         case "planetMenu":
         user.position = server.position;
         teambuilderinfo = [];
         if (server.report !== false)
         {
            teambuilderinfo[0] = JSON.parse(server.report); 
         }
         else
         {
             teambuilderinfo[1] = [];
         }
         if (server.request !== false)
         {
            teambuilderinfo[3] = JSON.parse(server.request); 
         }
         else
         {
             teambuilderinfo[3] = [];
         }
         
         if (server.members !== false)
         {
             var a  = JSON.parse(server.members);
         }
         else
         {
             var a = [];
         }
         
         
         var length = a.length;
         var check = "Commander";
         var counter = 0;
         teambuilderinfo[1] = [];
         var search = teambuilderinfo[0].owner;
         for (var x=0; length>x;x++)
         {
             if (a[x].username === search)
             {   a[x].position = "Owner";
          
                 teambuilderinfo[1].push(a[x]);
                 a.splice(x,1)
                 x = 3000;
                 length -= 1;
                
             }
         }
    
        for(var x=0;length>x;)a[x].position===check?(teambuilderinfo[1].push(a[x]),a.splice(x,1),length-=1):x++,length<=x+1&&("Commander"===check?(check="Captain",x=0):"Captain"===check?(check="Officer",x=0):"Officer"===check&&(check="Elite",x=0));
   
         break;
         
         case "joinPlanet":
    $("#invite").modal("show");
    $("#planetInfo").empty().append('<button class="button2 btn-block">Advance Search </button> <br><div class="scrollList" id="societyJoin"> </div><button class="button2 btn-block " id="join" onclick="joinSociety();">Join Society </button>');
   var length = server.clan.length;
   for (var x = 0; length > x;x++)
    {
    $("#societyJoin").append('<a href="#" onclick="selected(this); return false;" id="" id2="'+server.clan[x].id+'"><div class="panel-body aero shadow"><div class="col-sm-2 aero "><img src="'+ server.clan[x].avater + '" class="img-avater" > </div> <div class="col-sm-4 aero">'+ server.clan[x].name+ ' <br><small>'+ server.clan[x].invite + '</small> </div><div class="col-sm-4 aero">Members: '+ server.clan[x].members_count+'/'+ server.clan[x].members_limit+' </div><div class="col-sm-3 aero ">Rep: '+ server.clan[x].reputation+' </div> </div>'); 
    }
    
    $("#planetRequest").modal("show");
         break;
         
         case "planetControls":
         switch(server.type )
         {
             case 1:
             user.clan = server.clan;
             dragonverseOpen();  
             $("#planetMenu").modal("hide");
             break;
             
             case 2:
             $('#planetInfoError').text(server.report);
             break;

             case 3:
           
             a = server.report;
              $("#request").modal("show");
             $("#inviteList").empty();
             
              $("#inviteList").append('<div class="img-check scrollList4"><div class="panel-body OB center shadow2">'+ server.members +' </div><div class="col-sm-12 " id="planetPanelShow"></div></div>'); 
                $("#inviteList").append('<a onclick="selected(this);"  id="" id2=""  ><div class="panel-body aero shadow white"><div class="col-sm-1 aero "><img src="'+ a.avater+' " class="img-avater img-circle" > </div> <div class="col-sm-4 aero">Name:'+ a.username+' <br> </div><div class="col-lg-3 aero">Average:'+ a.average+'%</div><div class="col-sm-4 aero">Streak:'+ a.streak+'  </div><div class="col-sm-4 aero ">Power-Level:'+ a.power_level+'  </div><div class="col-lg-3 aero">W-L:'+ a.wins+"/"+a.losses+'</div><div class="col-sm-3 aero ">Rank:'+ a.rank+'  </div></div></a>');
        
        
        
         
             
             
             //$("#planetInvite").removeClass("scrollList4").addClass("scrollList3");
             hideScroll(1);
             break;
             
             case 4:
            console.log("I'm Inviting")
             $("#request").modal("show");
             $("#inviteList").empty();
           
              a =server.report;
              
              $("#inviteList").append('<div class="panel-body aero shadow" id="planetInfo">'+ server.members+ ' </div>' );
             if (a !== "")
             {
                  a = JSON.parse(a);
                  var length = a.length;
         for (var x = 0; length > x;x++)
             {
             $("#inviteList").append('<a href="#"  id="" id2=""  onclick="selected(this);" ><div class="panel-body aero shadow white"><div class="col-sm-1 aero "><img src="'+ a[x].avater+' " class="img-avater img-circle" > </div> <div class="col-sm-4 aero">Name:'+ a[x].username+' <br> </div><div class="col-lg-3 aero">Average:'+ a[x].average+'%</div><div class="col-sm-4 aero">Streak:'+ a[x].streak+'  </div><div class="col-sm-4 aero ">Power-Level:'+ a[x].power_level+'  </div><div class="col-lg-3 aero">W-L:'+ a[x].wins+"/"+a[x].losses+'</div><div class="col-sm-3 aero ">Rank:'+ a[x].rank+'  </div></div></a>');
             } 
             $("#inviteList").append('<button class="btn-block button1" onclick="planetControls(2);">Send Invite</button>');
             }
             
             else
             {
    
             }
             $("#planetInfoError").text(server.members);
             $("#planetInfoError").append('<button class="btn-block button1 " onclick="planetControls(2);">Send Invite</button>');
             
             hideScroll(1);
             break; 
             
             case 6:
             user.clan = server.clan;
             dragonverseOpen(); 
             $("#request").modal("hide");
             break;
             
             case 7:
             $("#request").modal("hide");
             break;
             
             case 8:
                 console.log("I'm in 8");
             $("#invite").modal("hide");
             teambuilderinfo[0].description = server.report;
             $('#planetDescError').text("You successfuly changed your profile bio.");
             break;
             
             case 9:
                    if (server.members !== false)
         {
             var a  = JSON.parse(server.members);
         }
         else
         {
             var a = [];
         }
      
         var length = a.length;
         var check = "Commander";
         var counter = 0;
         teambuilderinfo[1] = [];
         var search = teambuilderinfo[0].owner;
         for (var x=0; length>x;x++)
         {
             if (a[x].username === search)
             {   a[x].position = "Owner";
             
                 teambuilderinfo[1].push(a[x]);
                 a.splice(x,1)
                 x = 3000;
                 length -= 1;
             
             }
         }
        
        for(var x=0;length>x;)a[x].position===check?(teambuilderinfo[1].push(a[x]),a.splice(x,1),length-=1):x++,length<=x+1&&("Commander"===check?(check="Captain",x=0):"Captain"===check?(check="Officer",x=0):"Officer"===check&&(check="Elite",x=0));
        
    
       
        a = teambuilderinfo[1];
        length = a.length;
        
       
        $("#planetPanelShow").empty();
        for (var x = 0; length > x;x++)
    {

        $("#planetPanelShow").append('<a href="/user/'+ a[x].username+'" target="_blank"  ><div class="panel-body aero shadow"><div class="col-sm-1 aero "><img src="'+ a[x].avater+' " class="img-avater img-circle" > </div> <div class="col-sm-4 aero">Name:'+ a[x].username+' <br> </div><div class="col-lg-3 aero">Average:'+ a[x].average+'%</div><div class="col-sm-4 aero">Streak:'+ a[x].streak+'  </div><div class="col-sm-4 aero ">Power-Level:'+ a[x].power_level+'  </div><div class="col-lg-3 aero">W-L:'+ a[x].wins+"/"+a[x].losses+'</div><div class="col-sm-3 aero ">Position:'+ a[x].position+'  </div></div></a>');
    }
             $("#planetError").text(server.report[0]);
             var id = "#"+server.report[1];
            
             $(id).remove();
             
             break;
             
             case 10:
             $("#planetError").text(server.report);
            //moo
              if (server.members !== false)
         {
             var a  = JSON.parse(server.members);
         }
         else
         {
             var a = [];
         }
         
         var length = a.length;
         var check = "Commander";
         var counter = 0;
         teambuilderinfo[1] = [];
         var search = teambuilderinfo[0].owner;
         for (var x=0; length>x;x++)
         {
             if (a[x].username === search)
             {   a[x].position = "Owner";
           
                 teambuilderinfo[1].push(a[x]);
                 a.splice(x,1)
                 x = 3000;
                 length -= 1;
             
             }
         }
       
        for(var x=0;length>x;)a[x].position===check?(teambuilderinfo[1].push(a[x]),a.splice(x,1),length-=1):x++,length<=x+1&&("Commander"===check?(check="Captain",x=0):"Captain"===check?(check="Officer",x=0):"Officer"===check&&(check="Elite",x=0));
        
    
       
        a = teambuilderinfo[1];
        length = a.length;
        
        console
        $("#planetPanelShow").empty();
        for (var x = 0; length > x;x++)
    {

        $("#planetPanelShow").append('<a href="/user/'+ a[x].username+'" target="_blank"  ><div class="panel-body aero shadow"><div class="col-sm-1 aero "><img src="'+ a[x].avater+' " class="img-avater img-circle" > </div> <div class="col-sm-4 aero">Name:'+ a[x].username+' <br> </div><div class="col-lg-3 aero">Average:'+ a[x].average+'%</div><div class="col-sm-4 aero">Streak:'+ a[x].streak+'  </div><div class="col-sm-4 aero ">Power-Level:'+ a[x].power_level+'  </div><div class="col-lg-3 aero">W-L:'+ a[x].wins+"/"+a[x].losses+'</div><div class="col-sm-3 aero ">Position:'+ a[x].position+'  </div></div></a>');
    }
             break;
             
             case 11:
             $("#planetInfoError").text(server.report);
             
             break;
             
             case 12:
             $("#planetInfo").empty();
              a = server.report;
             var length = a.length;
             if (length > 0)
             {
             var display = [];
              for (var x = 0; length > x;x++){$("#planetInfo").append('<a href="/user/'+ a[x].username+'" target="_blank"  ><div class="panel-body aero shadow"><div class="col-sm-1 aero "><img src="'+ a[x].avater+' " class="img-avater img-circle" > </div> <div class="col-sm-4 aero">Name:'+ a[x].username+' <br> </div><div class="col-lg-3 aero">Average:'+ a[x].average+'%</div><div class="col-sm-4 aero">Streak:'+ a[x].streak+'  </div><div class="col-sm-4 aero ">Power-Level:'+ a[x].power_level+'  </div><div class="col-lg-3 aero">W-L:'+ a[x].wins+"/"+a[x].losses+'</div><div class="col-sm-3 aero ">Position:'+ a[x].position+'  </div></div></a>');}
             }
             else
             {
                $("#planetInfo").append('<div class="panel-body TW shadow ">Currently you have no friends online right now.</div>'); 
             }
             $("#invite").modal("show");
             break;
             
             case 13:
             
             var a = server.report;
        
             var length = a.length;
             $("#searchPlanet").empty();
             if (length > 0)
             {
             for (var x = 0; length > x;x++){
             $("#searchPlanet").append('<a href="#" onclick="selected(this);planetControls(21);" id="" id2="'+a[x].main_planet+'" id3="'+a[x].name+'">  <div class="panel-body TW shadow "> <div class="col-lg-2"> <img class="img-avater img-circle" src="'+a[x].avater +'"> </div><div class="col-lg-7">Name: '+a[x].name+'</div><div class="col-lg-3">Rep:'+a[x].reputation+'</div><div class="col-lg-3">HP:'+a[x].max_health+'/'+a[x].health+' </div><div class="col-lg-4">Members:'+a[x].members_count+'/'+a[x].members_limit+' </div><div class="col-lg-3">Rank:'+a[x].rank+'  </div></div></a>');
             }
             }
             else
             
             {
                $("#searchPlanet").append('<div class="panel-body TW shadow2 "> There is no societies that meet these requirements.</div>'); 
             }
             break;
             
             case 14:
                 //fix this
             b = server.report;
    
           
             var a = JSON.parse(server.members);
            
             var display = [];
             var check = "Commander";
         var counter = 0;
         var length = a.length;
        
         var search = b.owner;
         for (var x=0; length>x;x++)
         {
             if (a[x].username === search)
             {   a[x].position = "Owner";
                 display.push(a[x]);
                 a.splice(x,1)
                 x = 3000;
                 length -= 1;

                 
             }
         }
           
             for(var x=0;length>x;)a[x].position===check?(display.push(a[x]),a.splice(x,1),length-=1):x++,length<=x+1&&("Commander"===check?(check="Captain",x=0):"Captain"===check?(check="Officer",x=0):"Officer"===check&&(check="Elite",x=0));
   
    a = display;
    length = a.length;
    var send = [b,a];
    planetPanelShow(send);
    $("#invite").modal("hide");
   
    // var a = converter.makeHtml(teambuilderinfo[0].description);
     //    var length = teambuilderinfo[1].length;
     break;
         
         case 15:
         user.clan = server.clan;
         dragonverseOpen();  
         break;
         
         case 16:
         teambuilderinfo[3] = JSON.parse(server.report);
         var invitePlanet;
         if (teambuilderinfo[3].length !== 0)
{
    var Sepia = new createjs.ColorMatrixFilter([
    1, 1, 0, 0, 0, // red component
    1, 0, 0, 0, 0, // green component
    1, 0, 0, 0, 0, // blue component
    0, 0, 0, 1, 0  // alpha
]);
invitePlanet = new createjs.Bitmap(queue.getResult("invites"));
invitePlanet.x = 1000;
invitePlanet.y = 25;
invitePlanet.cursor = "pointer";
invitePlanet.addEventListener('click', function(){planetControls(5);});
invitePlanet.filters = [Sepia];
invitePlanet.cache(0,0, 130, 52);
stage.addChild(invitePlanet );
}
else
{
   invitePlanet = new createjs.Bitmap(queue.getResult("invites"));
invitePlanet.x = 1000;
invitePlanet.y = 25;
invitePlanet.cursor = "pointer";
invitePlanet.addEventListener('click', function(){planetControls(5);});
stage.addChild(invitePlanet ); 
}

         break;
         
         case 17:
        
         dragonverseOpen();
         $("#invite").modal("show");
         $("#planetInfo").empty().append('<div class="panel-body shadow2"> Nobody is defending this society at the moment. It seems attacking now would be pointless.</div>');
         break;
             
         }
         break;
         
         case "planetCheck":
         teambuilderinfo[2] = server.report;
         var a = teambuilderinfo[2];
         var length = teambuilderinfo[2].length;
         $("#planetCheck").empty();
         for (var x = 0; length > x;x++)
         {$("#planetCheck").append('<a href="#" onclick="selected(this);" id="" id2="'+a[x].main_planet+'" id3="'+a[x].name+'">  <div class="panel-body TW shadow " > <div class="col-lg-2"> <img class="img-avater img-circle" src="'+ a[x].avater+'"> </div><div class="col-lg-7">Name:'+a[x].name+ '</div><div class="col-lg-3">Rep:'+a[x].reputation+ '</div><div class="col-lg-3">HP:'+a[x].health+ '/'+a[x].max_health+ ' </div><div class="col-lg-4">Money:'+a[x].money+' </div><div class="col-lg-3"> Defending </div></div></a>');}
         $("#checkingPlanet").modal("show");
  
         
         if (length === 0)
         {
             $("#planetAction").hide();
         }
         else if (teambuilderinfo[0].main_planet === a[0].main_planet)
         {
             $("#planetAction").text("Defend");
             $("#planetAction").show();
            
             $('#planetAction').attr("onclick",'battlePlanet("Defend");');
             
         }
         else
         {
             var b = teambuilderinfo[0].main_planet;
             if (b === "Cold" || b === "Magin" || b === "Saiyan" && teambuilderinfo[0].main_planet !== a[0].main_planet)
             {
                 $("#planetAction").show();
                 $("#planetAction").text("Attack");
                 $('#planetAction').attr("onclick",'battlePlanet("Attack");');
             }
             else
             {
                 $("#planetAction").hide();
             }
             
             
         }
         if (server.planet === "Human")
             {
               $("#planetBanner").attr("src","/assets/earthBanner.png");  
             }
             else if (server.planet === "Cold")
             {
               $("#planetBanner").attr("src","/assets/coldBanner.png");  
             }
         break;
         
         case "item":
         $("#items").modal('hide');
         break;
             
         case "battle":
         user.game_id = server.game_id;
         stage.removeChild(info);
         foundMatch();
         var a,b,c;
         var currentTime = new Date();
         var hour = currentTime.getHours();
         var min  = currentTime.getMinutes();
         var sec  = currentTime.getSeconds();
         var mid;
         if(hour==0){ //At 00 hours we need to show 12 am
    hour=12;
    mid = "AM";
    }
    else if(hour>12)
    {
    hour=hour%12;
    mid='PM';
    }
    else
    {
        mid="AM";
    }
    if (min < 10)
    {
        min = "0" + min;
    }
    if (sec < 10)
    {
        sec = "0" + sec;
    }
         c = currentTime.toDateString() + " at  " + hour + ":" + min + ":" + sec +" " + mid;
         $("#chatTime").text(c);
         $("#chatroom").removeClass("hidden").fadeIn(1000);
         
         
         break;
         case "createPlanet":
         user.clan = server.clan;
         if(server.success === true)
         {
             dragonverseOpen();
         }
         else
         {
             $("#societyError").text(server.report);
         }
         
         case "chat":

         var a,b,c;
         var currentTime = new Date();
         var hour = currentTime.getHours();
         var min  = currentTime.getMinutes();
         var sec  = currentTime.getSeconds();
         var mid;
         if(hour==0){ //At 00 hours we need to show 12 am
    hour=12;
    mid = "AM";
    }
    else if(hour>12)
    {
    hour=hour%12;
    mid='PM';
    }
    else
    {
        mid="AM";
    }
    if (min < 10)
    {
        min = "0" + min;
    }
    if (sec < 10)
    {
        sec = "0" + sec;
    }
         c = + hour + ":" + min + ":" + sec +" " + mid;
          
         a = server.avatar;
         b = server.username;
         
         $("#insertchat").append( ' <div class="panel-body aero shadow"><div class="col-lg-12"><h4 class="media-heading">'+ b + '</h4><p>'+server.message +'</div> </div>');
         break;
         
         
    
             
         
         case "game_info":
         createjs.Sound.play("turnEnd", {loop: 0});    
         start = server;
         clearInterval(connection);
         clearInterval(gameTimer);
         check = false;
         setTimeout(gameLoop,3000);
         break;
         
         case "start":
         user = server;
         user.team = JSON.parse(user.team);
         user.stats = JSON.parse(user.stats);
         mainMenu();
         break;
         
         case "opponent_info":
         moo = server;
         moo.team = JSON.parse(moo.team);
         break;
         
         case "menu":
         moo = "moo";
         break;
         
         case "reconnect": 
        
         var previous_action = $(".previous").attr("id");
         var end = { action: "reconnect", previous: previous_action};
         ws.send(JSON.stringify(end));
         break;
         
         case "save":
         $("#report").text(server.report);
         user.team = JSON.parse(server.team);
         user.skill = server.skill;
         break;
         
         case "upgrade":
         user = server;
         user.stats = JSON.parse(user.stats);
         user.team = JSON.parse(user.team);
         statsCharacter(user.character);
         break;
         
         
        
     }
         
         
         
     }; 
     ws.error   = function()  {  console.log('websocket error'); };
     
     //ws.send("Hello");
         //setInterval(show, 10000);
}




function change(n)
{
    if($(n).hasClass( "fa-minus-square" ))
    {
         $(n).removeClass("fa-minus-square").addClass("fa-plus-square");
    }
  
   else
    {
         $(n).removeClass("fa-plus-square").addClass("fa-minus-square");
    }
    
}

function avater()
{
    $(".csa").removeClass( "blinkchange1" );
}



function showCharacter(num,num2)
{
    var b;
    var a;
    
    
     p1stats.hold = [0,0,0];



    if (num2)
    {
        var tags;
var length = Object.keys(p1stats.uc).length;
var uc = p1stats.uc;


$(".tagsort-tags-container").empty();
$(".selection").empty();


for ( property in uc) { 
 tags = characterList(property,[0]); 
 
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="'+ tags[3] +'"><a href="#" data-character="'+ property + '" onclick="showCharacter(this,false);return false;" ><img class=" img-responsive "  src="/skills/'+ property +'.png" ></a><div class="desc" >Lv '+p1stats.stats[property][0] + ' </div></div>');
}

$('div.tagsort-tags-container').tagSort({
  selector: '.item-to-tag',

});
        p1stats.current = num;
         $("#newimage").attr('src', "/ava/box.png");
$("#newdescription").text("");
$("#skillname").text("-Skill Name");
$("#newinfo").text("");
$("#newlevel").text("");
$("#newTitle").text("");
$("#currentlevel").show();
$("#newlevel").hide();
$("#savebutton").empty().append('<button type="button" class="button1 btn-block" onclick="clearSkills('+num+');" >Change Character</button>');
        switch(num)
     {
         case 1:
        a = p1stats.c1;
         break;
         
          case 2:
             a = p1stats.c2;
         break;
         
          case 3:
          a = p1stats.c3;
         break;
     }
     var us = p1stats.stats[a];
    
$("#teamtitle").text("Character Selection");
$("#currentimage").attr('src', "/ava/box.png");
$("#currentdescription").text("");
$("#skillname").text("-Skill Name");
$("#currentinfo").text("");
$("#currentstats").text("");

b = characterList(a,[0]);
      $("#currentdescription").text(b[0]);
      $("#currentimage").attr('src', b[1]);
    $("#currentTitle").text(b[2]);
$("#currentinfo").text("Stats: Strength:"+b[5][0] + " Ki:" + b[5][1] + " Defense:" + b[5][2] + " Speed:" + b[5][3]);
$("#currentlevel").text("Lv " +  us[0]);

 $("#showteam").modal("show");
    }
    
    else
    {
        
         a = $(num).attr('data-character');
     p1stats.ch = a;   
$("#currentimage").attr('src', "/ava/box.png");
$("#currentdescription").text("");
$("#skillname").text("-Skill Name");
$("#currentinfo").text("");
$("#currentstats").text("");
$("#currentlevel").show();

b = characterList(a,[0]);
 var us = p1stats.stats[a];

   $("#currentdescription").text(b[0]);
      $("#currentimage").attr('src', b[1]);
    $("#currentTitle").text(b[2]);
    $("#currentinfo").text("Stats: Strength:"+b[5][0] + " Ki:" + b[5][1] + " Defense:" + b[5][2] + " Speed:" + b[5][3]);
     $("#showteam").modal("show");
     $("#currentlevel").text("Lv " +  us[0]);
    }
    
  
    
     
   
    //$(skill).hide().fadeIn(1000);
   
//clearSkills();

//currentSkills(f);
 createjs.Sound.play("select", {loop: 0,volume:0.1});

  
  
}

function clearSkills(num)
{
    num = parseInt(num);
     createjs.Sound.play("select", {loop: 0,volume:0.1});
    var fake;
    var a;
   
   
   if (num === 1)
{
    fake = p1stats.c1;
p1stats.c1 = p1stats.ch;
 p1stats.cS1 = ["1","8","6","4","bge-t"];
 a = user.stats[p1stats.c1];
 teambuilderinfo[0].image = queue.getResult(p1stats.c1); 
 //$(".lv1").text("Lv " + a[4]); 
 
    switch(p1stats.c1)
    {
        case p1stats.c2:
        p1stats.c2 = fake;
    p1stats.cS2 = ["1","8","6","4","bge-t"];
    a = user.stats[p1stats.c2];
    teambuilderinfo[1].image = queue.getResult(p1stats.c2); 
   // $(".lv2").text("Lv " + a[4]);
        break;
        
        case p1stats.c3:
      p1stats.c3 = fake;
    p1stats.cS3 = ["1","8","6","4","bge-t"];
    a = user.stats[p1stats.c3]
    teambuilderinfo[2].image = queue.getResult(p1stats.c3); 
   // $(".lv3").text("Lv " + a[4]);
        break;
    }
}

else if (num === 2 && p1stats.c2 !== p1stats.hold[0])
{
     fake = p1stats.c2;
p1stats.c2 = p1stats.ch;
p1stats.cS2 = ["1","8","6","4","bge-t"];
 a = user.stats[p1stats.c2];
 teambuilderinfo[1].image = queue.getResult(p1stats.c2); 
 //$(".lv2").text("Lv " + a[4]);     
 //moo
     switch(p1stats.c2)
    {
        case p1stats.c1:
    
        p1stats.c1 = fake;
    p1stats.cS1 = ["1","8","6","4","bge-t"];
     a = user.stats[p1stats.c1];
     teambuilderinfo[0].image = queue.getResult(p1stats.c1); 
 //$(".lv1").text("Lv " + a[4]); 
        break;
        
        case p1stats.c3:
    
      p1stats.c3 = fake;
    p1stats.cS3 = ["1","8","6","4","bge-t"];
    a = user.stats[p1stats.c3];
   // $(".lv3").text("Lv " + a[4]); 
   teambuilderinfo[2].image = queue.getResult(p1stats.c3); 
        break;
    }
}

else if (num === 3 && p1stats.c3 !== p1stats.hold[0])
{
   fake = p1stats.c3;
p1stats.c3 = p1stats.ch;
    p1stats.cS3 = ["1","8","6","4","bge-t"];
     a =user.stats[p1stats.c3];
 teambuilderinfo[2].image = queue.getResult(p1stats.c3); 
     switch(p1stats.c3)
    {
      case p1stats.c1:
   p1stats.c1 = fake;
    p1stats.cS1 = ["1","8","6","4","bge-t"];
     a = user.stats[p1stats.c1];
 //$(".lv1").text("Lv " + a[4]); 
 teambuilderinfo[0].image = queue.getResult(p1stats.c1); 
        break;
        
        case p1stats.c2:
        p1stats.c2 = fake;
    p1stats.cS2 = ["1","8","6","4","bge-t"];
     a = user.stats[p1stats.c2];
 //$(".lv2").text("Lv " + a[4]); 
 teambuilderinfo[1].image = queue.getResult(p1stats.c2); 
        break;
        
    }
}

else
{
   
   
}



teambuilderinfo[3].image = queue.getResult("1"); 
        teambuilderinfo[4].image = queue.getResult("8"); 
        teambuilderinfo[5].image = queue.getResult("6"); 
        teambuilderinfo[6].image = queue.getResult("4"); 
        teambuilderinfo[7].image = queue.getResult("bge-t"); 


    $("#showteam").modal("hide");
    
}



function showSkills(name){
  var a, b,c;

    switch (name)
    
{

case "zGu":
genericSkills(1);
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="31" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/31.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="32" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/32.png" ></a> </div>');  
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="34" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/34.png" ></a> </div>');  
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="rzGu-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/zGu-t1.png" ></a> </div>');  
break;


case "zKG":
genericSkills(1);
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="36" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/36.png" ></a> </div>');    
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="37" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/37.png" ></a> </div>');  
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="38" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/38.png" ></a> </div>');   
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzKG-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzKG-t1.png" ></a> </div>');  
if (p1stats.us.hasOwnProperty("bzKG-t2") === true )
{$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="bzKG-t2" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/bzKG-t2.png" ></a> </div>');  }
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" ><img class="notunlocked img responsive  "  src="/skills/bzKG-t2.png" ></a> </div>');    
}
break;



case "zPo":
genericSkills(1);
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="46" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/46.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="47" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/47.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="48" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/48.png" ></a> </div>');  
break;

case "zRi":
genericSkills(1);
if (p1stats.us.hasOwnProperty("100") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="100" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/100.png" ></a> </div>'); 
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" ><img class="notunlocked img responsive  "  src="/skills/100.png" ></a> </div>'); 
   
}
if (p1stats.us.hasOwnProperty("101") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="101" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/101.png" ></a> </div>'); 
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  ><img class="notunlocked img responsive  "  src="/skills/101.png" ></a> </div>'); 
   
}

if (p1stats.us.hasOwnProperty("102") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="102" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/102.png" ></a> </div>');  
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  ><img class="notunlocked img responsive  "  src="/skills/102.png" ></a> </div>'); 
   
}
if (p1stats.us.hasOwnProperty("wzRi-t1") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzRi-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzRi-t1.png" ></a> </div>');    
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzRi-t1" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzRi-t1.png" ></a> </div>');    
}

break;

case "zNy":
genericSkills(1);
if (p1stats.us.hasOwnProperty("139") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="139" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/139.png" ></a> </div>'); 
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" ><img class="notunlocked img responsive  "  src="/skills/139.png" ></a> </div>'); 
   
}
if (p1stats.us.hasOwnProperty("140") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="140" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/140.png" ></a> </div>'); 
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  ><img class="notunlocked img responsive  "  src="/skills/140.png" ></a> </div>'); 
   
}

if (p1stats.us.hasOwnProperty("141") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="141" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/141.png" ></a> </div>');  
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  ><img class="notunlocked img responsive  "  src="/skills/141.png" ></a> </div>'); 
   
}
if (p1stats.us.hasOwnProperty("wzNy-t1") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzNy-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzNy-t1.png" ></a> </div>');    
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzNy-t1" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzNy-t1.png" ></a> </div>');    
}

break;

case "zMa":
genericSkills(1);
if (p1stats.us.hasOwnProperty("162") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="162" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/162.png" ></a> </div>'); 
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" ><img class="notunlocked img responsive  "  src="/skills/162.png" ></a> </div>'); 
   
}
if (p1stats.us.hasOwnProperty("163") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="163" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/163.png" ></a> </div>'); 
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  ><img class="notunlocked img responsive  "  src="/skills/163.png" ></a> </div>'); 
   
}

if (p1stats.us.hasOwnProperty("164") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="164" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/164.png" ></a> </div>');  
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  ><img class="notunlocked img responsive  "  src="/skills/164.png" ></a> </div>'); 
   
}
if (p1stats.us.hasOwnProperty("165") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="165" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/165.png" ></a> </div>');    
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="165" data-type="S" ><img class="notunlocked img responsive  "  src="/skills/165.png" ></a> </div>');    
}

break;

case "zGJ":
genericSkills(1);
if (p1stats.us.hasOwnProperty("106") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="106" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/106.png" ></a> </div>'); 
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="106" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/106.png" ></a> </div>');       
}
if (p1stats.us.hasOwnProperty("107") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="107" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/107.png" ></a> </div>'); 
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="107" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/107.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("108") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="108" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/108.png" ></a> </div>');  
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="108" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/108.png" ></a> </div>');   
}

if (p1stats.us.hasOwnProperty("115") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="115" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/115.png" ></a> </div>');  
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="115" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/115.png" ></a> </div>');   
}

if (p1stats.us.hasOwnProperty("wzGJ-t1") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzGJ-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzGJ-t1.png" ></a> </div>');    
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzGJ-t1" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzGJ-t1.png" ></a> </div>');    
}
break;

case "zCr":
genericSkills(1);
if (p1stats.us.hasOwnProperty("123") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="123" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/123.png" ></a> </div>'); 
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="123" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/123.png" ></a> </div>');       
}
if (p1stats.us.hasOwnProperty("124") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="124" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/124.png" ></a> </div>'); 
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="124" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/124.png" ></a> </div>');       
}
if (p1stats.us.hasOwnProperty("125") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="125" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/125.png" ></a> </div>'); 
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="125" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/125.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("126") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="126" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/126.png" ></a> </div>');  
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="126" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/126.png" ></a> </div>');   
}

if (p1stats.us.hasOwnProperty("wzCr-t1") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzCr-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzCr-t1.png" ></a> </div>');    
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzCr-t1" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzCr-t1.png" ></a> </div>');    
}
break;


case "sBo":
genericSkills(1);

$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="127" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/127.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="128" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/128.png" ></a> </div>');   
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="129" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/129.png" ></a> </div>');   
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="rsBo-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/rsBo-t1.png" ></a> </div>');    
break;

case "zZn":
genericSkills(1);
if (p1stats.us.hasOwnProperty("130") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="130" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/130.png" ></a> </div>'); 
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="130" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/130.png" ></a> </div>');  
}

if (p1stats.us.hasOwnProperty("131") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="131" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/131.png" ></a> </div>'); 
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="131" ><img class="notunlocked img responsive  "  src="/skills/131.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("132") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="132" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/132.png" ></a> </div>');  
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="132" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/132.png" ></a> </div>');  
}

if (p1stats.us.hasOwnProperty("wzZn-t1") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzZn-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzZn-t1.png" ></a> </div>');  
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzZn-t1" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzZn-t1.png" ></a> </div>');  
}
break;

case "bKG":
genericSkills(1);
if (p1stats.us.hasOwnProperty("109") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="109" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/109.png" ></a> </div>'); 
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="107" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/107.png" ></a> </div>');  
}

if (p1stats.us.hasOwnProperty("110") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="110" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/110.png" ></a> </div>'); 
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="110" ><img class="notunlocked img responsive  "  src="/skills/110.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("111") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="111" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/111.png" ></a> </div>');  
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="111" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/111.png" ></a> </div>');  
}

if (p1stats.us.hasOwnProperty("bbKG-t1") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="bbKG-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/bbKG-t1.png" ></a> </div>');  
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="bbKG-t1" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/bbKG-t1.png" ></a> </div>');  
}
break;

case "zNl":
genericSkills(1);
if (p1stats.us.hasOwnProperty("79") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="79" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/79.png" ></a> </div>');   
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="79" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/79.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("80") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="80" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/80.png" ></a> </div>');   
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/80.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("81") === true )
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="81" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/81.png" ></a> </div>');     
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/81.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("zPo-t1") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="zPo-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/zPo-t1.png" ></a> </div>');      
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/zPo-t1.png" ></a> </div>');  
}
break;

case "zYa":
genericSkills(1);
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="52" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/52.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="53" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/53.png" ></a> </div>');
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="54" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/54.png" ></a> </div>');  
break;

case "zKn":
genericSkills(1);
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="42" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/42.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="43" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/43.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="45" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/45.png" ></a> </div>');
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzKn-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzKn-t1.png" ></a> </div>');

break;

case "zRz":
genericSkills(1);
if (p1stats.us.hasOwnProperty("49") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="49" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/49.png" ></a> </div>'); 
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/49.png" ></a> </div>');      
}
if (p1stats.us.hasOwnProperty("50") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="50" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/50.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/50.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("51") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="51" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/51.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/51.png" ></a> </div>');    
}
break;

case "zDa":
genericSkills(1);
if (p1stats.us.hasOwnProperty("119") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="119" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/119.png" ></a> </div>'); 
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/119.png" ></a> </div>');      
}
if (p1stats.us.hasOwnProperty("120") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="120" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/120.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/120.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("121") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="121" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/121.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/121.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("122") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="122" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/122.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/122.png" ></a> </div>');    
}
break;

case "zNy":
genericSkills(1);
if (p1stats.us.hasOwnProperty("139") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="139" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/139.png" ></a> </div>'); 
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/139.png" ></a> </div>');      
}
if (p1stats.us.hasOwnProperty("140") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="140" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/140.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/140.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("141") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="141" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/141.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/141.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("wzNy-t1") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzNy-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzNy-t1.png" ></a> </div>');      
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzNy-t1.png" ></a> </div>');  
}
break;

case "zGr":
genericSkills(1);
if (p1stats.us.hasOwnProperty("142") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="142" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/142.png" ></a> </div>'); 
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/142.png" ></a> </div>');      
}
if (p1stats.us.hasOwnProperty("143") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="143" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/143.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/143.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("144") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="144" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/144.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/144.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("wzGr-t1") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzGr-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzGr-t1.png" ></a> </div>');      
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzGr-t1.png" ></a> </div>');  
}
break;

case "zSo":
genericSkills(1);
if (p1stats.us.hasOwnProperty("136") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="136" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/136.png" ></a> </div>'); 
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/136.png" ></a> </div>');      
}
if (p1stats.us.hasOwnProperty("137") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="137" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/137.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/137.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("138") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="138" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/138.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/138.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("wzSo-t1") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzSo-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzSo-t1.png" ></a> </div>');      
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzSo-t1.png" ></a> </div>');  
}
break;


case "zSn":
genericSkills(1);
if (p1stats.us.hasOwnProperty("55") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="55" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/55.png" ></a> </div>'); 
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/55.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("56") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="56" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/56.png" ></a> </div>');   
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/56.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("57") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="57" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/57.png" ></a> </div>');   
}
else
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/57.png" ></a> </div>');     
}
if (p1stats.us.hasOwnProperty("wzSn-t1") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzSn-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzSn-t1.png" ></a> </div>');
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/58.png" ></a> </div>');    
}

break;

case "zGy":
genericSkills(1);
if (p1stats.us.hasOwnProperty("94") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="94" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/94.png" ></a> </div>'); 
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/94.png" ></a> </div>');      
}
if (p1stats.us.hasOwnProperty("95") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="95" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/95.png" ></a> </div>');   
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/95.png" ></a> </div>');     
}
if (p1stats.us.hasOwnProperty("96") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="96" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/96.png" ></a> </div>');   
}
else
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/96.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("zGy-t1") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="zGy-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/zGy-t1.png" ></a> </div>');
}
else
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/zGy-t1.png" ></a> </div>');    
}
break;

case "zTn":
genericSkills(1);

$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="58" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/58.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="59" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/59.png" ></a> </div>');   
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="60" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/60.png" ></a> </div>');   
break;

case "zCu":
genericSkills(1);

$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="61" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/61.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="62" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/62.png" ></a> </div>');   
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="63" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/63.png" ></a> </div>');   
break;

case "zKk":
genericSkills(1);

$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="67" data-type="S"  onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/67.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="68" data-type="S"  onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/68.png" ></a> </div>');   
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="69" data-type="S"  onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/69.png" ></a> </div>');   
break;

case "zGo":
genericSkills(1);

$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="82" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/82.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="83" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/83.png" ></a> </div>');   
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="84" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/84.png" ></a> </div>');   
break;

case "zYe":
genericSkills(1);

$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="64" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/64.png" ></a> </div>'); 
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="65" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/65.png" ></a> </div>');   
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="66" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/66.png" ></a> </div>');   

break;

case "zNa":
genericSkills(1);
if (p1stats.us.hasOwnProperty("70") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="70" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/70.png" ></a> </div>'); 
}
else
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/70.png" ></a> </div>');       
}
if (p1stats.us.hasOwnProperty("71") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="71" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/71.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/71.png" ></a> </div>');     
}
if (p1stats.us.hasOwnProperty("72") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="72" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/72.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/72.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("yzNa-t1") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="yzNa-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/yzNa-t1.png" ></a> </div>');
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/yzNa-t1.png" ></a> </div>');
}
break;

case "zSV":
genericSkills(1);
if (p1stats.us.hasOwnProperty("73") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="73" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/73.png" ></a> </div>'); 
}
else
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/73.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("74") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="74" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/74.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/74.png" ></a> </div>');     
}
if (p1stats.us.hasOwnProperty("75") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="75" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/75.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/75.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("bzSV-t1") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="bzSV-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/bzSV-t1.png" ></a> </div>');
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/bzSV-t1.png" ></a> </div>');    
}
break;

case "zRe":
genericSkills(1);
if (p1stats.us.hasOwnProperty("85") === true )
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="85" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/85.png" ></a> </div>');    
}
else
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/85.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("86") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="86" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/86.png" ></a> </div>');  
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/86.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("87") === true )
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="87" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/87.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/87.png" ></a> </div>'); 
}
break;

case "zJe":
genericSkills(1);
if (p1stats.us.hasOwnProperty("88") === true )
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="88" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/88.png" ></a> </div>');    
}
else
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/88.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("89") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="89" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/89.png" ></a> </div>');  
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/89.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("90") === true )
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="90" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/90.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/90.png" ></a> </div>'); 
}

break;

case "zBr":
genericSkills(1);
if (p1stats.us.hasOwnProperty("91") === true )
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="91" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/91.png" ></a> </div>');    
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/91.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("92") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="92" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/92.png" ></a> </div>');  
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/92.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("93") === true )
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="93" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/93.png" ></a> </div>');   
}
else
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/93.png" ></a> </div>');   
}
break;

case "zCi":
genericSkills(1);
if (p1stats.us.hasOwnProperty("97") === true )
{
 $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="97" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/97.png" ></a> </div>');    
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/97.png" ></a> </div>'); 
}
if (p1stats.us.hasOwnProperty("98") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="98" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  S"  src="/skills/98.png" ></a> </div>');  
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/98.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("99") === true)
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="99" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/99.png" ></a> </div>');   
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/99.png" ></a> </div>');    
}
break;

case "zRz":
genericSkills(1);
if (p1stats.us.hasOwnProperty("49") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="49" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/49.png" ></a> </div>'); 
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/49.png" ></a> </div>');      
}
if (p1stats.us.hasOwnProperty("50") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="50" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/50.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/50.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("51") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="51" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/51.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/51.png" ></a> </div>');    
}
break;

case "zATweT":
genericSkills(1);
if (p1stats.us.hasOwnProperty("145") === true )
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="145" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/145.png" ></a> </div>'); 
}
else
{
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/49.png" ></a> </div>');      
}
if (p1stats.us.hasOwnProperty("146") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="146" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/146.png" ></a> </div>');   
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/50.png" ></a> </div>');   
}
if (p1stats.us.hasOwnProperty("147") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="147" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/147.png" ></a> </div>');   
}
else
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/51.png" ></a> </div>');    
}
break;


case "zCl":
genericSkills(1);
if (p1stats.us.hasOwnProperty("148") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="148" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/148.png" ></a> </div>'); 
}
else
{
   $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="148" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/148.png" ></a> </div>');       
}
if (p1stats.us.hasOwnProperty("149") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="149" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/149.png" ></a> </div>'); 
}
else
{
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="149" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/149.png" ></a> </div>');  
}
if (p1stats.us.hasOwnProperty("150") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="150" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/150.png" ></a> </div>');  
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="150" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/150.png" ></a> </div>');   
}

if (p1stats.us.hasOwnProperty("151") === true )
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="151" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/151.png" ></a> </div>');  
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="151" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/151.png" ></a> </div>');   
}

if (p1stats.us.hasOwnProperty("wzCl-t1") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzCl-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/wzCl-t1.png" ></a> </div>');    
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="wzCl-t1" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/wzCl-t1.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("yzCl-t2") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="yzCl-t2" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/yzCl-t2.png" ></a> </div>');    
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="yzCl-t2" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/yzCl-t2.png" ></a> </div>');    
}
if (p1stats.us.hasOwnProperty("yzCl-t3") === true )
{
  $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="yzCl-t3" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/yzCl-t3.png" ></a> </div>');    
}
else
{
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="yzCl-t3" data-type="T" ><img class="notunlocked img responsive  "  src="/skills/yzCl-t3.png" ></a> </div>');    
}
break;
} //switch end

function genericSkills(n){
 
        $(".select").hide().fadeIn(1000);
        
        $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic"><a href="#" data-move=1 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/1.png" ></a> </div>');  
        if (p1stats.us.hasOwnProperty("2") === true )
        {
         $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic"><a href="#" data-move=2 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/2.png" ></a> </div>');    
        }
        else
        {
    $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/2.png" ></a> </div>');
        }
        if (p1stats.us.hasOwnProperty("3") === true )
        {
           $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img"  data-item-tags="generic"><a href="#" data-move=3 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  R"  src="/skills/3.png" ></a> </div>');   
        } 
         else
        {
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/3.png" ></a> </div>');
        }
        $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic"><a href="#" data-move=4 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/4.png" ></a> </div>');  
        if (p1stats.us.hasOwnProperty("5") === true )
        {
          $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic"><a href="#" data-move=5 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/5.png" ></a> </div>');   
        } 
         else
        {
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/5.png" ></a> </div>');
        }
        $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic"><a href="#" data-move=6 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/6.png" ></a> </div>');  
        if (p1stats.us.hasOwnProperty("7") === true )
        {
          $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic"><a href="#" data-move=7 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/7.png" ></a> </div>');    
        }
         else
        {
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/7.png" ></a> </div>');
        }
        $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic"><a href="#" data-move=8 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/8.png" ></a> </div>');  
        if (p1stats.us.hasOwnProperty("9") === true)
        {
          $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic" ><a href="#" data-move=9 data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/9.png" ></a> </div>');   
        } 
         else
        {
     $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  data-type="T" ><img class="notunlocked img responsive  "  src="/skills/9.png" ></a> </div>');
        }
        $(".select").append('<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="generic"><a href="#" data-move="bge-t" data-type="T"  onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/bge-t.png" ></a> </div>');  
}

    
}



function skillD(n,t)

{
    
    var a;
    var b;
    var c;
    if (t)
    {
        
        $(".tagsort-tags-container").empty();
$(".selection").empty();
$("#savebutton").empty()
$("#currentdescription").text("");
      $("#currentimage").attr('src', "/ava/box.png");
    $("#currentTitle").text("");
$("#currentinfo").text("");
$("#currentstats").text("");

        switch(p1stats.current)
        {
            case 1:
            a = p1stats.cS1[n];
            c = p1stats.c1;
            break;
            
            case 2:
            a = p1stats.cS2[n];
            c = p1stats.c2;
            break;
            
            case 3:
            a = p1stats.cS3[n];
            c = p1stats.c3;
            break;
        }
        
         
    
      p1stats.hold = [n,false,false];

        
        $("#teamtitle").text("Skill Selection");
$("#currentimage").attr('src', "/ava/box.png");
$("#currentdescription").text("");
$("#currentTitle").text("");
$("#currentlevel").hide();
$("#currentstats").text("");
$("#currentinfo").text("");

b = skillList(a,[0]);

      $("#currentdescription").text(b[3]);
      $("#currentimage").attr('src', b[0]);
    $("#currentTitle").text(b[5]);
$("#currentstats").text("EP:"+ b[4] + " CD:" + b[2] + " BP:" + b[1] + " Focus:" + b[7] + " Type:" + b[6]);
showSkills(c);
$('div.tagsort-tags-container').tagSort({
  selector: '.item-to-tag',

});
 $("#showteam").modal("show");
    }
    
    else
    {  
         
        a = $(n).attr("data-move");
        p1stats.hold[2] = a;
        b = skillList(a,[0]);
         $("#currentdescription").text(b[3]);
      $("#currentimage").attr('src', b[0]);
    $("#currentTitle").text(b[5]);
$("#currentstats").text("EP:"+ b[4] + " CD:" + b[2] + " BP:" + b[1] + " Focus:" + b[7] + " Type:" + b[6]);
a = a.toString();
$("#savebutton").empty().append('<button type="button" class="button1 btn-block" onclick="updateSkills();" >Change Skill</button>');
    }
   
   
//$("#skillname").text("- " + b[5]);



}



function updateSkills()
{
    
   
    var n;
    var check; 
    var num = p1stats.hold[2];
   
    if (isNaN(num))
    {
     p1stats.hold[1] = true;
     check = true;
    }
    else if(p1stats.hold[0] === 4)
    {
        p1stats.hold[1] = true;
        check = false;
    }
    
    else
    {
     p1stats.hold[1] = false;
    }
    
    
    n = p1stats.hold[0];
    
    var newArray;
   
    

    if(p1stats.hold[1])
    {
        
        if (check)
        {
        switch(p1stats.current)
        {
            case 1:
            p1stats.cS1[4] = num;
            teambuilderinfo[7].image = queue.getResult(num);
            break;
            
            case 2:
            p1stats.cS2[4] = num;
            teambuilderinfo[7].image = queue.getResult(num);
            break;
            
            case 3:
            p1stats.cS3[4] = num;
            teambuilderinfo[7].image = queue.getResult(num);
            break;
        }
        }
    }
    else{
        
      
         num = num.toString();

switch(p1stats.current){
    
    
    case 1:
    switch(p1stats.cS1.indexOf(num))
    {
        case -1:
        p1stats.cS1[n] = num; newArray = p1stats.cS1;
        break;
        
        case 0:
        p1stats.cS1[0] = p1stats.cS1[n];
        p1stats.cS1[n] = num;
        newArray = p1stats.cS1;    
        break;
        
        case 1:
        p1stats.cS1[1] = p1stats.cS1[n];
        p1stats.cS1[n] = num;
        newArray = p1stats.cS1;       
        break;
        
        case 2:
        p1stats.cS1[2] = p1stats.cS1[n];
        p1stats.cS1[n] = num;
        newArray = p1stats.cS1;       
        break;
        case 3:
        p1stats.cS1[3] = p1stats.cS1[n];
        p1stats.cS1[n] = num;
        newArray = p1stats.cS1;       
        break;
       
    }
   
teambuilderinfo[3].image = queue.getResult(p1stats.cS1[0]);
teambuilderinfo[4].image = queue.getResult(p1stats.cS1[1]);    
teambuilderinfo[5].image = queue.getResult(p1stats.cS1[2]);
teambuilderinfo[6].image = queue.getResult(p1stats.cS1[3]);
teambuilderinfo[7].image = queue.getResult(p1stats.cS1[4]);
    break;
    //moo
    case 2:
    switch(p1stats.cS2.indexOf(p1stats.hold[0]))
    {
        case -1:
        p1stats.cS2[n] = num;newArray = p1stats.cS2;
        break;
        
        case 0:
        p1stats.cS2[0] = p1stats.cS2[n-1];
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;    
        break;
        
        case 1:
        p1stats.cS2[1] = p1stats.cS2[n-1];
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;       
        break;
        
        case 2:
        p1stats.cS2[2] = p1stats.cS2[n-1];
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;       
        break;
        case 3:
        p1stats.cS2[3] = p1stats.cS2[n-1];
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;       
        break;
    
    }
   teambuilderinfo[3].image = queue.getResult(p1stats.cS2[0]);
teambuilderinfo[4].image = queue.getResult(p1stats.cS2[1]);    
teambuilderinfo[5].image = queue.getResult(p1stats.cS2[2]);
teambuilderinfo[6].image = queue.getResult(p1stats.cS2[3]);
teambuilderinfo[7].image = queue.getResult(p1stats.cS2[4]);


    break;
    
    case 3:
     switch(p1stats.cS3.indexOf(p1stats.hold[0]))
    {
         case -1:
        p1stats.cS3[n] = num;newArray = p1stats.cS3;
        break;
        
        case 0:
        p1stats.cS3[0] = p1stats.cS3[n-1];
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;    
        break;
        
        case 1:
        p1stats.cS3[1] = p1stats.cS3[n-1];
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;       
        break;
        
        case 2:
        p1stats.cS3[2] = p1stats.cS3[n-1];
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;       
        break;
        case 3:
        p1stats.cS3[3] = p1stats.cS3[n-1];
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;       
        break;
       
    }
   teambuilderinfo[3].image = queue.getResult(p1stats.cS3[0]);
teambuilderinfo[4].image = queue.getResult(p1stats.cS3[1]);    
teambuilderinfo[5].image = queue.getResult(p1stats.cS3[2]);
teambuilderinfo[6].image = queue.getResult(p1stats.cS3[3]);
teambuilderinfo[7].image = queue.getResult(p1stats.cS3[4]);

    break;

}
}

$("#showteam").modal("hide");
  
}

function cancel2(num1)
{
    if (num1 == 1)
    {
  stage.removeChild(endTurnImage); 
stage.removeChild(box); 

stage.removeChild(done);   
}

else 
{
 
  stage.removeChild(done);  
}
}



function foundMatch()
{

//$("#music").fadeIn(2000).removeClass("hidden");
$("#Online").fadeOut(1000);
$("#play")[0].volume = 0.2;
//$("#play")[0].play();

   var data = {
    images: [queue.getResult('found')],
    frames: {width:320, height:179},
    animations: {
        run:[1,23],
    }
};

// Run variable for matchmaking.
var spriteSheet1 = new createjs.SpriteSheet(data);
var animation1 = new createjs.Sprite(spriteSheet1, "run");
 animation1.x = 440;
 animation1.y = 173;
 stage.addChild(animation1);

stage.removeChild(cancelbutton); 
stage.setChildIndex( h_load, stage.getNumChildren()-1);
this.info = new createjs.Text("Match Found!", "30px Aero", "white");
    info.x = 495;
    info.y = 140;
    info.textBaseline = "alphabetic";
    stage.addChild(info);


cancel2(2);



}

var audio = document.getElementById("pause");
audio.onpause = function() {
    $("#musicstatus").text("Paused...");
};
audio.onplay = function() {
    $("#musicstatus").text("Now Playing...");
};

audio.onended = function()
{
    //swap(4);
}
function swap(num)
{
   
    switch(num)
    {
        case 1:
        $("#current_audio").attr("src", "/assets/music1.mp3");
        $("#musictitle").text("Friedrich Habetler - Challengers (DBZ Budokai)");
        $("#musicstatus").text("Now Playing...");
        break;
        
        case 2:
        $("#current_audio").attr("src", "/assets/music2.mp3");
         $("#musictitle").text("94stones - Gogeta Theme");
        $("#musicstatus").text("Now Playing...");
        break;
        
        case 3:
        $("#current_audio").attr("src", "/assets/music3.mp3");
         $("#musictitle").text("94stones - Heroic Trunks");
        $("#musicstatus").text("Now Playing...");
        break;
        
        case 4:
        if ($("#current_audio").attr("src")  === "/assets/music1.mp3")
        {
            $("#current_audio").attr("src", "/assets/music2.mp3");
            $("#musictitle").text("94stones - Gogeta Theme");
        $("#musicstatus").text("Now Playing...");
        }
        else if ($("#current_audio").attr("src")  === "/assets/music2.mp3")
        {
            $("#current_audio").attr("src", "/assets/music3.mp3");
            $("#musictitle").text("94stones - Heroic Trunks");
        $("#musicstatus").text("Now Playing...");
        }
        
        else
        {
            $("#current_audio").attr("src", "/assets/music1.mp3");
            $("#musictitle").text("Friedrich Habetler - Challengers (DBZ Budokai)");
        $("#musicstatus").text("Now Playing...");
        }
        
        break;
        
        case 5:
        if ($("#current_audio").attr("src")  === "/assets/music1.mp3")
        {
            $("#current_audio").attr("src", "/assets/music3.mp3");
            $("#musictitle").text("94stones - Heroic Trunks");
        $("#musicstatus").text("Now Playing...");
              
        }
        else if ($("#current_audio").attr("src")  === "/assets/music2.mp3")
        {
            $("#current_audio").attr("src", "/assets/music1.mp3");
            $("#musictitle").text("Friedrich Habetler - Challengers (DBZ Budokai)");
        $("#musicstatus").text("Now Playing...");
        }
        
        else
        {
            $("#current_audio").attr("src", "/assets/music2.mp3");
            $("#musictitle").text("94stones - Gogeta Theme");
       $("#musicstatus").text("Now Playing...");
        }
        break;
    }
   var a = $("#play");
   
    /****************/
   
    a[0].pause();
    a[0].load();
    a[0].play();
}

function checkConnection()
{
    var end = { action: "end_turn", game_id: user.game_id};
        ws.send(JSON.stringify(end));
      
}

function mainMenu()
{ 

stage.removeAllChildren();
         stage.removeAllEventListeners();
         
var teamc = user.team;


var uc = JSON.parse(user.uc);
var us = JSON.parse(user.us);

var s = user.stats;



//'"skill1": \"[\"g1\",\"g2\",\"g3\",\"g4\",\"ge-t\"]\"'
var c = user.skill;
c = JSON.parse(c);
var skill1 = c.s1;
var skill2 = c.s2;
var skill3 = c.s3;
var skill4 = c.item;
var quest = JSON.parse(user.quest);


p1stats = {c1:teamc[0],c2:teamc[1],c3:teamc[2], a:true,cS1:skill1,cS2:skill2,cS3:skill3,current:0,hold:[null,null,false],stats:s,statshold:[false],uc: uc, us: us, quest: quest};

var hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,260,140))

var teamc = user.team;


var uc = JSON.parse(user.uc);

var us = JSON.parse(user.us);

var s = user.stats;



//'"skill1": \"[\"g1\",\"g2\",\"g3\",\"g4\",\"ge-t\"]\"'
var c = user.skill;
c = JSON.parse(c);
var skill1 = c.s1;
var skill2 = c.s2;
var skill3 = c.s3;
var skill4 = c.item;
var quest = JSON.parse(user.quest);

var option;

stage.removeAllChildren();
         stage.removeAllEventListeners();
var hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,260,140))

var backgroundImage1 = new createjs.Bitmap(queue.getResult("mainMenu"));
backgroundImage1.x = 0;
backgroundImage1.y = 0;
stage.addChild(backgroundImage1);

//dragonverse.addEventListener("click",function(){loading(7);});
//team.addEventListener("click",function(){loading(2);});

//shop.addEventListener("click",function(){loading(3);});
//rank.addEventListener("click",quickmatch);


var dragonverse = new createjs.Shape();
dragonverse.graphics.beginFill("#000").rect(175, 235, 180, 180);
dragonverse.alpha = 0.01;
dragonverse.cursor = "pointer";
stage.addChild(dragonverse);
dragonverse.addEventListener("click",function(){loading(7);});

var rank = new createjs.Shape();
rank.graphics.beginFill("#000").rect(400, 235, 180, 180);
rank.alpha = 0.01;
rank.cursor = "pointer";
stage.addChild(rank);
rank.addEventListener("click",quickmatch);

var inventory = new createjs.Shape();
inventory.graphics.beginFill("#000").rect(625, 235, 180, 180);
inventory.alpha = 0.01;
inventory.cursor = "pointer";
stage.addChild(inventory);
inventory.addEventListener("click",function(){loading(4);});

var teambuilder = new createjs.Shape();
teambuilder.graphics.beginFill("#000").rect(850, 235, 180, 180);
teambuilder.alpha = 0.01;
teambuilder.cursor = "pointer";
stage.addChild(teambuilder);
teambuilder.addEventListener("click",function(){loading(2);});

var capsuleCorp = new createjs.Shape();
capsuleCorp.graphics.beginFill("#000").rect(175, 458, 180, 180);
capsuleCorp.alpha = 0.01;
capsuleCorp.cursor = "pointer";
stage.addChild(capsuleCorp);
capsuleCorp.addEventListener("click",function(){loading(3);});

var hallOfFrame = new createjs.Shape();
hallOfFrame.graphics.beginFill("#000").rect(400, 458, 180, 180);
hallOfFrame.alpha = 0.01;
hallOfFrame.cursor = "pointer";
stage.addChild(hallOfFrame);

var profile = new createjs.Shape();
profile.graphics.beginFill("#000").rect(625, 458, 180, 180);
profile.alpha = 0.01;
profile.cursor = "pointer";
stage.addChild(profile);

var shenron = new createjs.Shape();
shenron.graphics.beginFill("#000").rect(850, 458, 180, 180);
shenron.alpha = 0.01;
shenron.cursor = "pointer";
stage.addChild(shenron);
//hallOfFrame.addEventListener("click",function(){loading(3);});

//
//
var desiredW3 = 75;
var useravater = new createjs.Bitmap(user.avater);
useravater.x = 740;
useravater.y = 43;
useravater.scaleX = useravater.scaleY = desiredW3/ 100;
stage.addChild(useravater);

var avatarborder = new createjs.Bitmap(queue.getResult("avatarborder"));
avatarborder.x = 740;
avatarborder.y = 43;
stage.addChild(avatarborder);


var character1 = new createjs.Bitmap(queue.getResult(p1stats.c1));
character1.x = 820;
character1.y = 40;
stage.addChild(character1);

var character2 = new createjs.Bitmap(queue.getResult(p1stats.c2));
character2.x = 900;
character2.y = 40;
stage.addChild(character2);

var character3 = new createjs.Bitmap(queue.getResult(p1stats.c3));
character3.x = 980;
character3.y = 40;
stage.addChild(character3);




var zennie = new createjs.Text(user.money, "36px OB", "white");
    zennie.x = 570;
    zennie.y = 95;
    zennie.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    zennie.textBaseline = "alphabetic";
    stage.addChild(zennie);

var state;

if (ws.readyState === 3)
{
    state = "Disconnected";
    var cc = new createjs.Text(state, "36px OB", "red");
    cc.x = 240;
    cc.y = 95;
    cc.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    cc.textBaseline = "alphabetic";
    stage.addChild(cc);
    
}
else
{
     state = "Connected";
     var cc = new createjs.Text(state, "36px OB", "white");
    cc.x = 240;
    cc.y = 95;
    cc.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    cc.textBaseline = "alphabetic";
    stage.addChild(cc);
}


var radarChartData = {
		labels: ["", "", "",""],
		datasets: [
		
			{
				label: "Stats",
				fillColor: "rgba(252,97,34,0.4)",
				strokeColor: "rgba(255,255,255,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "rgba(255,255,255,1)",
				pointHighlightFill: "rgba(255,255,255,1)",
				pointLabelFontColor : "rgba(255,255,255,1)",
				pointHighlightStroke: "rgba(255,255,255,1)",
				showTooltip: true,
				data: [10,5,6,7]
			}
		]
	};

var ctx = document.getElementById("info").getContext("2d");
ctx.canvas.height = 150;
            ctx.canvas.width = 300;


	var stats= document.getElementById("info").getContext("2d");
	
	var animationComplete = function () {
    var self = this;
    var nx = 0;
    var ny = -80;
    var loop = 1;
    var name = "Strength:";
    //["Strength", "Ki", "Defense","Speed"], data: [10,5,6,7]
            


    Chart.helpers.each(self.datasets[0].points, function (point, index) {
        Chart.helpers.each(self.datasets, function (dataset) {
            new Chart.Tooltip({
                x: 150 + nx,
                y: 75 + ny,
                xPadding: self.options.tooltipXPadding,
                yPadding: self.options.tooltipYPadding,
                fillColor: self.options.tooltipFillColor,
                textColor: dataset.strokeColor,
                fontFamily: self.options.tooltipFontFamily,
                fontStyle: self.options.tooltipFontStyle,
                fontSize: self.options.tooltipFontSize,
                caretHeight: self.options.tooltipCaretSize,
                cornerRadius: self.options.tooltipCornerRadius,
                text: name + dataset.points[index].value,
                chart: self.chart,
                custom: self.options.customTooltips
            }).draw()
            
            if (loop === 2)
            {
                nx = 0;
                ny = 80;
                name = "Defense:";
            }
            
            else if (loop === 3)
            {
               nx = -60;
                ny = 10; 
                name = "Speed:";
                
            }
            
            else
            {
                nx = 55;
                ny = 10;
                name = "Ki:";
            }          
loop += 1;
        });

        self.chart.ctx.font = Chart.helpers.fontString(self.fontSize, self.fontStyle, self.fontFamily)
        self.chart.ctx.textAlign = 'center';
        self.chart.ctx.textBaseline = "middle";
        self.chart.ctx.fillStyle = "#666";
        self.chart.ctx.fillText(point.label, point.x, self.scale.startPoint - 12);
    });
};

    statsInfo = new Chart(stats).Radar(radarChartData,{
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 30,
    pointLabelFontColor : "rgba(255,255,255,1)",
    angleLineColor : "rgba(255,255,255,1)",
    scaleLineColor: 'rgba(255,255,255,1)',
    scaleStartValue: 0,
    showTooltip: true,
    tooltipTemplate: "<%= value %>",
    tooltipFillColor: "rgba(0,0,0,0.6)",
    tooltipEvents: [],
    tooltipCaretSize: 2,
    onAnimationComplete: function () {
        animationComplete.apply(this);
    },
   
    
});

statsInfo.update();

}

function loading(num)
{
  stage.removeAllChildren();
         stage.removeAllEventListeners();
         
  
  
    loadingSettings[0] = new createjs.Bitmap('/assets/loadingscreen.png');
        loadingSettings[0].x = 0;
        loadingSettings[0].y = 0;
        stage.addChild(loadingSettings[0]);
        
  
    
        loadingSettings[1] = new createjs.Bitmap('/assets/bar.png');
        loadingSettings[1].x = 364;
        loadingSettings[1].y = 500;
        stage.addChild(loadingSettings[1]);
    
        
        var shape = new createjs.Shape();
        loadingSettings[2] = shape.graphics.beginFill("orange").drawRect(373, 507,1, 26).command;
        stage.addChild(shape);
        
        loadingSettings[3] = new createjs.Text("Loading Game", "30px OB", "white");
    loadingSettings[3].x = 460;
    loadingSettings[3].y = 480;
    loadingSettings[3].textAlign = "center";
    loadingSettings[3].shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    loadingSettings[3].textBaseline = "alphabetic";
    stage.addChild(loadingSettings[3]);
        
        loadingSettings[4] = new createjs.Bitmap('/assets/dbload.png');
        loadingSettings[4].x = 370;
        loadingSettings[4].y = 500;
        stage.addChild(loadingSettings[4]);
        
        loadingSettings[5] = num;
          if (num === 5 ||  num === 6 || num === 8)
        {
            num = 5;
        }
        
    switch(num)
    {
        case 1:
      
        break;
        
        case 2:
        queue.loadManifest([ {id: 'teambuilder', src: 'assets/teambuilder.png'},
        ])	
        
        break;
        
        case 3:
        queue.loadManifest([
		{id: 'shop', src: 'assets/shop.png'},
		{id: 'shopbanner1', src: 'assets/shopbanner1.png'},
		{id: 'shopbanner2', src: 'assets/shopbanner2.png'},
		{id: 'resultsound', src: 'assets/strongpunch.mp3'},
		{id: 'reward', src: 'assets/reward.png'},
		{id: 'results', src: 'assets/results.png'},
		{id: 'cloud', src: 'assets/cloud.png'},
		{id: 'frame', src: 'assets/frame.png'},
		{id: 'scan', src: 'assets/scan.mp3'},
        ])
        break;
        
        case 4:
        queue.loadManifest([
		{id: 'inventory', src: 'assets/inventory.png'},
		{id: 'tagscrafting', src: 'assets/tagscrafting.png'},
		{id: 'tagsconvert', src: 'assets/tagsconvert.png'},
		{id: 'craft', src: 'assets/craft.png'},
		{id: 'convert', src: 'assets/convert.png'},
        {id: 'amount', src: 'assets/amount.png'},
        {id: 'inventorypopup', src: 'assets/inventorypopup.png'},
        ])
        break;
        
        case 5:
            
        queue.loadManifest([
		{id: 'searchBackground', src: 'assets/actionbar.png'}, // Searching BG
		{id: 'contentsBackground', src: 'assets/leftholder-grey.png'}, // Main Content
		{id: 'avatarHold', src: 'assets/avatarhold.png'},
		{id: 'actionsBackground', src: 'assets/rightholder-grey.png'},  // Current Effects
		{id: 'skillsBackground', src: 'assets/skillholder.png'},   // SKill
		{id: 'mainBackground', src: 'assets/background.png'},// Ingame BG
		{id: 'battlescreen', src: 'assets/battlescreen.png'},// 
		{id: 'itemboxBackground', src: 'assets/itembox.png'}, // Items Box
		{id: 'statusBackground', src: 'assets/phasebutton.png'}, // BP/Timer Box
		{id: 'endturnHold', src: 'assets/actionbar.png'}, // End turn / Surrender Box
		{id: 'blinkingeffect', src: 'assets/blinkingimage-red.png'},// 
		{id: 'cooldownbox', src: 'assets/cooldownbox-white.png'},// 
		{id: 'player2hold', src: 'assets/testing.png'}, // Player 2
		{id: 'surrenderHolder', src: 'assets/actionbar.png'}, // Player 2
		{id: 'healthbarhold', src: 'assets/hpbar.png'}, // Player 2
		{id: 'energybarhold', src: 'assets/epbar.png'}, // Player 2
		{id: 'search', src: 'assets/Hover.png'},
        {id: 'victory', src: 'assets/victory.mp3'},
        {id: 'turnEnd', src: 'assets/turnEnd.mp3'},
        {id: 'death', src: 'assets/death1.mp3'},
        {id: 'aura', src: 'assets/aura.mp3'},
        {id: 'aura1', src: 'assets/aura.png'},
        {id: 'aura2', src: 'assets/aura3.png'},
        {id: 'aura3', src: 'assets/aura4.png'},
        {id: 'aura4', src: 'assets/aura5.png'},
        {id: 'done', src: 'assets/confirm.png'},
        {id: 'surrenderpic', src: 'assets/gohan.png'},
        {id: 'endturnpic', src: 'assets/endturnpic.png'},
        {id: 'find', src: 'assets/sprite2.png'},
        {id: 'found', src: 'assets/sprite1.png'},
        {id: 'cancelLoad', src: 'assets/cancel.png'},
        {id: 'chat', src: 'assets/chat.png'},
        {id: 'endturn', src: 'assets/endturn.png'},
        {id: 'forfeit', src: 'assets/forfeit.png'},
        {id: 'Win', src: 'assets/Win.png'},
        {id: 'Lose', src: 'assets/Lose.png'},
        {id: 'frame', src: 'assets/frame.png'},
        {id: 'hits', src: 'assets/hits.png'},
        {id: 'strengthanimation', src: 'assets/strength.png'},
        {id: 'kianimation', src: 'assets/ki.png'},
        {id: 'powerDownanimation', src: 'assets/power-down.png'},
        {id: 'powerUpanimation', src: 'assets/power-up.png'},
        {id: 'defenseanimation', src: 'assets/defense.png'},
        {id: 'counteranimation', src: 'assets/counter.png'},
        {id: 'Afflictionanimation', src: 'assets/Affliction.png'},
        {id: 'stunnedanimation', src: 'assets/stunned.png'},
        {id: 'strengthsound', src: 'assets/strength.mp3'},
        {id: 'kisound', src: 'assets/ki.mp3'},
        {id: 'powerdownsound', src: 'assets/powerdown.mp3'},
        {id: 'Afflictionsound', src: 'assets/Affliction.mp3'},
        {id: 'powerupsound', src: 'assets/powerup.mp3'},
        {id: 'defensesound', src: 'assets/defense.mp3'},
        {id: 'stunnedsound', src: 'assets/stunned.mp3'},
            ])
        
        break;
        
        case 7:
         queue.loadManifest([{id: 'dragonverse', src: 'assets/dragonverse.png'},
          {id: 'planet1', src: 'assets/planet1.png'},
          {id: 'planet2', src: 'assets/planet2.png'},
          {id: 'planet3', src: 'assets/planet3.png'},
          {id: 'planet4', src: 'assets/planet4.png'},
          {id: 'planet5', src: 'assets/planet5.png'},
          {id: 'planet6', src: 'assets/planet6.png'},
          {id: 'planet6', src: 'assets/planet6.png'},
          {id: 'planet3text', src: 'assets/planet3text.png'},
          {id: 'planetType1', src: 'assets/planetType1.png'},
          {id: 'planetType2', src: 'assets/planetType2.png'},
          {id: 'planetType3', src: 'assets/planetType3.png'},
          {id: 'planetType4', src: 'assets/planetType4.png'},
          {id: 'planetType5', src: 'assets/planetType5.png'},
          {id: 'planetType6', src: 'assets/planetType6.png'},
           {id: 'planetMenu', src: 'assets/planetMenu.png'},
          {id: 'bc1', src: 'assets/bc1.png'},
          {id: 'bc2', src: 'assets/bc2.png'},
          {id: 'bc3', src: 'assets/bc3.png'},
          {id: 'invites', src: 'assets/Invites.png'},
          {id: 'menubutton', src: 'assets/menubutton.png'},
          {id: 'pcexit', src: 'assets/pcexit.png'},
          {id: 'pcconfirm', src: 'assets/pcconfirm.png'},
          {id: 'planetconfirm', src: 'assets/planetconfirm.png'},
          {id: 'dragonversepanel', src: 'assets/dragonversepanel.png'},
          {id: 'dailyQuestMenu', src: 'assets/dailyQuestMenu.png'},
          {id: 'x', src: 'assets/X.png'},
          {id: 'mainPhase', src: 'assets/mainPhase.png'},
          {id: 'AssetsButton', src: 'assets/AssetsButton.png'},
          {id: 'BioButton', src: 'assets/BioButton.png'},
          {id: 'commanderButton', src: 'assets/commanderButton.png'},
          {id: 'quitButton', src: 'assets/quitButton.png'},
          {id: 'managementButton', src: 'assets/managementButton.png'},
          {id: 'defendButton', src: 'assets/defendButton.png'},
          ])
        break;
        
        
    }
}

function dragonverseOpen()
{
     stage.removeAllChildren();
         stage.removeAllEventListeners();
        

if(user.clan === "none")
{
    var file = { action: "planetControls", type:16};
ws.send(JSON.stringify(file));  


var Sepia = new createjs.ColorMatrixFilter([
    0.39, 0.77, 0.19, 0, 0, // red component
    0.35, 0.68, 0.17, 0, 0, // green component
    0.27, 0.53, 0.13, 0, 0, // blue component
    0, 0, 0, 1, 0  // alpha
]);

var planetMenu = new createjs.Bitmap(queue.getResult("planetMenu"));
planetMenu.x = 0;
planetMenu.y = 0;
stage.addChild(planetMenu);


var planetType1 = new createjs.Bitmap(queue.getResult("planetType1"));
planetType1.x = 210;
planetType1.y = 260;
//planetType1.cursor = "pointer";
//planetType1.addEventListener('click', function(){confirmPlanet(1);});
planetType1.filters = [Sepia];
planetType1.cache(0,0, 200, 200);
stage.addChild(planetType1);

var planetType2 = new createjs.Bitmap(queue.getResult("planetType2"));
planetType2.x = 480;
planetType2.y = 453;
//planetType2.cursor = "pointer";
//planetType2.addEventListener('click', function(){confirmPlanet(5);});
planetType2.filters = [Sepia];
planetType2.cache(0,0, 200, 200);
stage.addChild(planetType2);

var planetType3 = new createjs.Bitmap(queue.getResult("planetType3"));
planetType3.x = 750;
planetType3.y = 260;
planetType3.addEventListener('click', function(){confirmPlanet(3);});
planetType3.cursor = "pointer";
stage.addChild(planetType3);

var planetType4 = new createjs.Bitmap(queue.getResult("planetType4"));
planetType4.x = 210;
planetType4.y = 453;
//planetType4.addEventListener('click', function(){confirmPlanet(4);});
//planetType4.cursor = "pointer";
planetType4.filters = [Sepia];
planetType4.cache(0,0, 200, 200);
stage.addChild(planetType4);

var planetType5 = new createjs.Bitmap(queue.getResult("planetType5"));
planetType5.x = 480;
planetType5.y = 260;
//planetType5.cursor = "pointer";
//planetType5.addEventListener('click', function(){confirmPlanet(2);});
planetType5.filters = [Sepia];
planetType5.cache(0,0, 200, 200);
stage.addChild(planetType5);

var planetType6 = new createjs.Bitmap(queue.getResult("planetType6"));
planetType6.x = 750;
planetType6.y = 453;
planetType6.cursor = "pointer";
planetType6.addEventListener('click', function(){confirmPlanet(6);});
stage.addChild(planetType6);

var planetconfirm,confirmAvater,confirmText,pcexit,pcconfirm,endTurnImage,bc1,bc2,bc3,choose1,choose2,planet,planetType2,ptext,scrollText,invitebutton,background;
planetconfirm = new createjs.Bitmap(queue.getResult("planetconfirm"));
planetconfirm.x = 200;
planetconfirm.y = 153;
planetconfirm.alpha = 0;


var Menubutton = new createjs.Bitmap(queue.getResult("menubutton"));
Menubutton.x = 60;
Menubutton.y = 25;
Menubutton.cursor = "pointer";
Menubutton.addEventListener('click', mainMenu);
stage.addChild(Menubutton);



scrollText = new createjs.Text("Select A Race", "15px OB", "black");
scrollText.textBaseline = "alphabetic";
scrollText.x = 730;
scrollText.y = 218;
scrollText.alpha = 0;
stage.addChild(scrollText);

createjs.Tween.get(scrollText, {loop: true})
.to({ x:435,alpha:1}, 5000, createjs.Ease.linear)
.to({ x:350,alpha:0}, 3000, createjs.Ease.linear);


confirmText = new createjs.Text("", "16px OB", "black");
confirmText.textBaseline = "alphabetic";
confirmText.lineWidth = 640;
confirmText.lineHeight = 20;
confirmText.alpha = 0;
confirmText.x = 240;
confirmText.y = 390;


pcexit = new createjs.Bitmap(queue.getResult("pcexit"));
pcexit.x = 655;
pcexit.y = 250;
pcexit.alpha = 0;
pcexit.addEventListener('click', function(){planetButton(2);});
pcexit.cursor = "pointer";


pcconfirm= new createjs.Bitmap(queue.getResult("pcconfirm"));
pcconfirm.x = 270;
pcconfirm.y = 250;
pcconfirm.alpha = 0;
pcconfirm.addEventListener('click', function(){planetButton(1);});
pcconfirm.cursor = "pointer";


}

else
{
var file = { action: "planetMenu"};
ws.send(JSON.stringify(file));  

var backgroundImage1 = new createjs.Bitmap(queue.getResult("dragonverse"));
backgroundImage1.x = 0;
backgroundImage1.y = 0;
stage.addChild(backgroundImage1);

$("#invite").modal("hide");

var planet1 = new createjs.Bitmap(queue.getResult("planet3"));
planet1.x = 450;
planet1.y = 200;

createjs.Tween.get(planet1, {loop: true})
          .to({ y:203}, 1000, createjs.Ease.linear)//10
          .to({ y:197}, 1000, createjs.Ease.linear)//10
           .to({ y:200}, 1000, createjs.Ease.linear)//10
//planet1.cursor = "pointer";
stage.addChild(planet1);

//planet1.addEventListener('click', function(){checkingPlanet(1);});





var planetrequest = new createjs.Shape();
planetrequest.graphics.beginFill("#000").rect(45, 346, 100, 30);
planetrequest.alpha = 0.01;
planetrequest.cursor = "pointer";
stage.addChild(planetrequest);
planetrequest.addEventListener('click', function(){planetControls(5);});

var searchbutton = new createjs.Shape();
searchbutton.graphics.beginFill("#000").rect(45, 316, 100, 30);
searchbutton.cursor = "pointer";
searchbutton.alpha = 0.01;
stage.addChild(searchbutton);
searchbutton.addEventListener('click', function(){planetControls(19)});

var planetpanel = new createjs.Shape();
planetpanel.graphics.beginFill("#000").rect(70, 283, 50, 30);
planetpanel.alpha = 0.01;
planetpanel.cursor = "pointer";
stage.addChild(planetpanel);
planetpanel.addEventListener('click', function(){planetPanelShow(teambuilderinfo)});


var button2 = new createjs.Shape();
button2.graphics.beginFill("#000").rect(230, 53, 740, 40);
button2.alpha = 0.01;
button2.cursor = "pointer";
stage.addChild(button2);
button2.addEventListener("click",quickmatch);

var button1 = new createjs.Shape();
button1.graphics.beginFill("#000").rect(163, 110, 170, 40);
button1.alpha =0.01;
button1.cursor = "pointer";
stage.addChild(button1);
button1.addEventListener("click",mainMenu);


var button3 = new createjs.Shape();
button3.graphics.beginFill("#000").rect(371, 110, 180, 40);
button3.alpha =0.01;
button3.cursor = "pointer";
stage.addChild(button3);
button3.addEventListener('click', function(){loading(2)});

var button4 = new createjs.Shape();
button4.graphics.beginFill("#000").rect(590, 110, 200, 40);
button4.alpha =0.01;
button4.cursor = "pointer";
stage.addChild(button4);
button4.addEventListener('click', function(){loading(3)});

var button5 = new createjs.Shape();
button5.graphics.beginFill("#000").rect(830, 110, 190, 40);
button5.alpha =0.01;
button5.cursor = "pointer";
stage.addChild(button5);
button5.addEventListener('click', function(){planetControls(25)});


var dragonlink = new createjs.Bitmap(queue.getResult("dragonlink"));
dragonlink.x = 370;
dragonlink.y = 616;
stage.addChild(dragonlink);

var currentPlanet = new createjs.Bitmap(queue.getResult("planet3text"));
    currentPlanet.x = 295;
    currentPlanet.y = 578;
    stage.addChild(currentPlanet);

createjs.Tween.get(currentPlanet, {loop: true})
          .to({ y:581}, 1000, createjs.Ease.linear)//10
          .to({ y:575}, 1000, createjs.Ease.linear)//10
           .to({ y:578}, 1000, createjs.Ease.linear)//10

var friendbutton = new createjs.Bitmap(queue.getResult("friendbutton"));
friendbutton.x = 850;
friendbutton.y = 100;
friendbutton.cursor = "pointer";
stage.addChild(friendbutton);
friendbutton.addEventListener('click', function(){planetControls(17)});


var chatbutton = new createjs.Bitmap(queue.getResult("chatbutton"));
chatbutton.x = 850;
chatbutton.y = 200;
chatbutton.cursor = "pointer";
stage.addChild(chatbutton);
chatbutton.addEventListener('click', function(){planetControls(23)});



//dragonText5.addEventListener('click', function(){loading(2)});



function checkingPlanet(num)
{
   
    
     var file = { action: "planetCheck", clan:num};
     ws.send(JSON.stringify(file));  
    
}

}

var wait = 0;

function confirmPlanet(num)
{
  console.log(num);
    switch(num)
    {
        case 1:
   
        confirmAvater = new createjs.Bitmap(queue.getResult("planetType1"));
        confirmText.text = 'Sayian race are heros only means of direct attack besides hitman. Saiyans can be used to help allied heros in combat.';
        choose1 = "planetType1";
        choose2 = "planet1";
        teambuilderinfo[0] = "Saiyan";
        break;
        
        case 5:
        confirmAvater = new createjs.Bitmap(queue.getResult("planetType2"));
        confirmText.text = 'Hitman this group is for sole fighters looking for pay by attacking planets.Hitman are neutual group that only cares about getting paid. This has the highest risk and requires player be at atleast level 5.';
        choose1 = "planetType2";
        choose2 = "planet5";
        teambuilderinfo[0] = "Hitman";
        break;
        
        case 3:
        confirmAvater = new createjs.Bitmap(queue.getResult("planetType3"));
        confirmText.text = 'Human race job is to protect other hero ally planets and raise funding for allies.This group plays a more of a support role.';
        choose1 = "planetType3";
        choose2 = "planet3";
        teambuilderinfo[0] = "Human";
        break;
        
        case 4:
        confirmAvater = new createjs.Bitmap(queue.getResult("planetType4"));
        confirmText.text = 'Majin race is focused on stealing from other races. There both offensive and defensive. Majins are considered evil therefor work alone.';
        choose1 = "planetType4";
        choose2 = "planet4";
        teambuilderinfo[0] = "Magin";
        break;
        
        case 2:
        confirmAvater = new createjs.Bitmap(queue.getResult("planetType5"));
        confirmText.text = 'Namekians are the hero traders of the universe. They job is to sell to other heros and transfer money.Namekians are defensive race.';
        choose1 = "planetType5";
        choose2 = "planet2";
        teambuilderinfo[0] = "Namekian";
        break;
        
        case 6:
        confirmAvater = new createjs.Bitmap(queue.getResult("planetType6"));
        confirmText.text = 'Cold Race are the galactic empire of the universe. They are the most powerful and aggressive race.The only weakness of this race is there little care of there own defenses.There main goal is to just destroy planets.';
        choose1 = "planetType6";
        choose2 = "planet6";
        teambuilderinfo[0] = "Cold";
        break;
    }
    endTurnImage = new createjs.Shape();
    endTurnImage.graphics.beginFill("black").drawRect(0,0, 1200, 720);
    endTurnImage.alpha = .4;
    endTurnImage.addEventListener("click",nothing);
    stage.addChild(endTurnImage); 
    
    
    stage.addChild(planetconfirm);
         createjs.Tween.get(planetconfirm, {loop: false})
          .to({ alpha: 1}, 1000, createjs.Ease.linear);//10
          
          
       
          
confirmAvater.x = 460;
confirmAvater.y = 170;
//confirmAvater.scaleX = 0.7;
//confirmAvater.scaleY = 0.7;
confirmAvater.alpha = 0;
stage.addChild(confirmAvater);



createjs.Tween.get(confirmAvater, {loop: false})
          .wait(1000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);//10
confirmText.alpha = 0;
pcconfirm.alpha = 0;
pcexit.alpha = 0;
createjs.Tween.get(confirmText, {loop: false})
          .wait(1000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);//10
          
createjs.Tween.get(pcconfirm, {loop: false})
          .wait(1000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);//10

createjs.Tween.get(pcexit, {loop: false})
          .wait(1000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);//10
          
stage.addChild(pcconfirm);
stage.addChild(pcexit);          
stage.addChild(confirmText);
}



function planetButton(num)
{
   
    
    if (num === 1)
    {
        
        stage.removeChild(confirmAvater);
        stage.removeChild(pcconfirm);
stage.removeChild(pcexit);          
stage.removeChild(confirmText);
stage.removeChild(endTurnImage); 
    stage.removeChild(planetconfirm);
    planetconfirm.alpha = 0;
    scrollText.text = "Select A Button";
    
    createjs.Tween.get(planetType1, {loop: false})
          .wait(1000)
          .to({ alpha:0}, 1000, createjs.Ease.linear);//10
          
 createjs.Tween.get(planetType2, {loop: false})
          .wait(1000)
          .to({ alpha:0}, 1000, createjs.Ease.linear);//10

 createjs.Tween.get(planetType3, {loop: false})
          .wait(1000)
          .to({ alpha:0}, 1000, createjs.Ease.linear);//10
          
         createjs.Tween.get(planetType4, {loop: false})
          .wait(1000)
          .to({ alpha:0}, 1000, createjs.Ease.linear);//10
          
          createjs.Tween.get(planetType5, {loop: false})
          .wait(1000)
          .to({ alpha:0}, 1000, createjs.Ease.linear);//10
          
         createjs.Tween.get(planetType6, {loop: false})
          .wait(1000)
          .to({ alpha:0}, 1000, createjs.Ease.linear);//10
          
          
        
bc1 = new createjs.Bitmap(queue.getResult("bc1"));
bc1.x = 60;
bc1.y = 300;
bc1.alpha = 0;
bc1.addEventListener('click', function(){planet2Button(1);});
bc1.cursor = "pointer";
stage.addChild(bc1); 

bc2 = new createjs.Bitmap(queue.getResult("bc2"));
bc2.x = 430;
bc2.y = 300;
bc2.alpha = 0;
bc2.addEventListener('click', function(){planet2Button(2);});
bc2.cursor = "pointer";
stage.addChild(bc2); 

bc3 = new createjs.Bitmap(queue.getResult("bc3"));
bc3.x = 800;
bc3.y = 300;
bc3.alpha = 0;
bc3.addEventListener('click', function(){planet2Button(3);});
bc3.cursor = "pointer";
stage.addChild(bc3); 

ptext = new createjs.Bitmap(queue.getResult("ptext"));

stage.addChild(ptext); 

background = new createjs.Shape();
background.graphics.beginStroke('#e9e8e4').setStrokeStyle(4).beginFill("rgba(255, 255, 255, 0.9)").rect(200, 493, 800, 117);
background.alpha = 0;
stage.addChild(background); 

planet = new createjs.Bitmap(queue.getResult(choose2));
planet.x = 840;
planet.y = 410;
planet.alpha = 0;
stage.addChild(planet); 

planetType = new createjs.Bitmap(queue.getResult(choose1));
planetType.x = 50;
planetType.y = 450;
planetType.alpha = 0;
stage.addChild(planetType); 


confirmText.x = 230;
confirmText.y = 515;
//confirmText.lineWidth = 250;
confirmText.alpha = 0;
stage.addChild(confirmText); 


createjs.Tween.get(bc1, {loop: false})
          .wait(2000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);//10
          
          createjs.Tween.get(bc2, {loop: false})
          .wait(2000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);//10
          
         createjs.Tween.get(bc3, {loop: false})
          .wait(2000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);
          
          
          createjs.Tween.get(planetType, {loop: false})
          .wait(2000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);
          
          createjs.Tween.get(planet, {loop: false})
          .wait(2000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);
          
             createjs.Tween.get(ptext, {loop: false})
          .wait(2000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);
          
            createjs.Tween.get(confirmText, {loop: false})
          .wait(2000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);
          
          createjs.Tween.get(background, {loop: false})
          .wait(2000)
          .to({ alpha:1}, 1000, createjs.Ease.linear);
    }
    
    else
    {
        
        stage.removeChild(confirmAvater);
        stage.removeChild(pcconfirm);
        stage.removeChild(background);
stage.removeChild(pcexit);          
stage.removeChild(confirmText);
stage.removeChild(endTurnImage); 
    stage.removeChild(planetconfirm);
    planetconfirm.alpha = 0;
    }
}
}


function planet2Button(num)
{

switch(num)
{
    case 1:
    //$("#planetChoice").empty();
    
      var file = { action: "joinPlanet", info:teambuilderinfo[0],type:1};
  ws.send(JSON.stringify(file));  
  setTimeout(function(){ planet2Button(5); }, 2000);
    
    break;
    
    case 2:
    dragonverseOpen();
    break;
    
    case 3:
    $("#planetInfo").empty().append('<div class="panel-body shadow2" ><div class="form-group " id="formName"> <div>Society Name:</div> <input class="form-control" type="text" id="societyname" placeholder="Name of Society"> </div><div class="form-group"> <div>Society Type:</div> <select id="inviteChoose" class="form-control"> <option value="Public">Public: Any can join if they met requirements without invitation.</option> <option value="Invite-Only">Invite Only: Members have to be invited to join.</option> <option value="Private">Private: You are not recruiting and will not show up in search results.</option></select></div><div class="form-group" > <div>Select Langauge:</div><select class="form-control" id="societylangauge"><option value="English">English</option><option value="Español">Español</option><option value="Português">Português</option> </select> </div><div class="form-group" id="formDescription"> <div>Society Description:</div> <textarea class="form-control" type="text" id="societydescription" rows="6"> </textarea> <button class="button2 btn-block" id="join" onclick="planet2Button(4);" >Create Planet </button></div></div><div id="societyError" class="panel-body shadow2"> </div>');
    $("#invite").modal("show");
    break;
    
    case 4:
    var a = [];
    a[0] = $("#societyname").val();
    a[1] = 0;
    a[2] = $("#societydescription").val();
    a[3] = teambuilderinfo[0];
    a[4] = $("#societylangauge").val();
    a[5] = $("#inviteChoose").val();
    
    console.log("invite: " + a[5]);
    if (a[0].length >= 2 && a[0].length <= 18 && a[2].length <= 2500)
    {
      var file = { action: "createPlanet", info:a};
  ws.send(JSON.stringify(file));    
    }
    else if (a[0].length <= 2 || a[0].length >= 18)
    {
        $(".has-error").removeClass("has-error");
        $("#formName").addClass("has-error");
        $("#societyError").text("Society name has to range from 2 to 18 characters.")
    }
    else 
    {
        $(".has-error").removeClass("has-error");
        $("#formDescription").addClass("has-error");
        $("#societyError").text("Description can't exceed 2500 characters.")
    }
    
    
    break;
    
    case 5:
    
    break;
    
    case 6:
    var length = server.clan.length;
    for (var x = 0; length > x;x++)
    {
    $("#societyJoin").append('<a href="#" onclick="selected(this); return false;" id="" id2="'+server.clan[x].id+'"><div class="panel-body aero shadow"><div class="col-sm-2 aero "><img src="'+ server.clan[x].avater + '" class="img-avater" > </div> <div class="col-sm-4 aero">'+ server.clan[x].name+ ' <br><small>'+ server.clan[x].invite + '</small> </div><div class="col-sm-4 aero">Members: '+ server.clan[x].members_count+'/'+ server.clan[x].members_limit+' </div><div class="col-sm-3 aero ">Rep: '+ server.clan[x].reputation+' </div> </div>'); 
    }
    break;
    
    
 
}
}

function selected(n)
{  
    $("#select").attr("id","");
    var t = $(n).find('div')[0];
    if ($(t).hasClass('shadow'))
    {   
        
        
        $(".shadow2").removeClass('shadow2').addClass('shadow');
        $(t).removeClass('shadow').addClass('shadow2');
    }
    $(n).attr("id","select");
    
}

function planetControls(num)
{
  
     createjs.Sound.play("select", {loop: 0,volume:0.1});
    switch(num)
    {
        case 1:
        var bye = { action: "planetControls", type:1};    
        ws.send(JSON.stringify(bye));
        break;
        
        case 2:
        var a = $("#select").attr("id2");
        if (a === undefined || a === ""){}else{var bye = { action: "planetControls", type:2, user: a};ws.send(JSON.stringify(bye));}
        break;
        
        case 3:
        //LoveDog
        var a = $("#invite_name").val();
        $("#planetInvite").show();
        $("#actionButton").show();
         if (a.length > 0)
        {
            var bye = { action: "planetControls", type:3, user: a};    
        ws.send(JSON.stringify(bye));
        }
        break;
        
        case 4:
        var a = $("#invite_rank").val();
        var b = $("#invite_streak").val();
        var c = $("#invite_average").val();
        var bye = { action: "planetControls", type:4, rank: a,streak: b, average: c};    
        ws.send(JSON.stringify(bye));
        break;
        
        case 5:
        var a = teambuilderinfo[3];
        var length = a.length;
        $("#request").modal("show");
        $("#inviteList").empty();
        
        if (length > 0)
        {
             for (var x = 0; length > x;x++)
             {
             $("#inviteList").append('  <div class="panel-body TW shadow " > <div class="col-lg-2"> <img class="img-avater img-circle" src="'+a[x].avater+'"> </div><a href="#" onclick="selected(this)" id="" id2="'+a[x].main_planet+'" id3="'+a[x].name+'"><div class="col-lg-4">Name:'+a[x].name+ '</div></a><div class="col-lg-4">Rep:'+a[x].reputation+ '</div><button class="button1 col-lg-2 btn-sm" onclick="selected(this);planetControls(6);" id2="'+a[x].id+'">Join</button><div class="col-lg-4">Members:'+a[x].members_count+ '/'+a[x].members_limit+ ' </div><div class="col-lg-4">Invite:'+a[x].invite+'</div><button class="button1 col-lg-2 btn-sm" id2="'+a[x].id+'" onclick="selected(this);planetControls(7);">Reject</button></div>')
             }
             
             $("#inviteList").append('<button class="button2 btn-block" id="actionButton" onclick="planetControls(6);">Send Invite</button>');
             
          
        }
        
        else
        {
            $("#inviteList").append('<div class="panel-body TW shadow ">Currently you have no invites right now.</div>'); 
           
        }
            
        break;
        
        case 6:
        var id = $("#select").attr("id2");
        var bye = { action: "planetControls", type:6, id:id};    
        ws.send(JSON.stringify(bye));
        break;
        
        case 7:
        var id = $("#select").attr("id2");
        var bye = { action: "planetControls", type:7, id:id};    
        ws.send(JSON.stringify(bye));
        break;
        
        case 8:
        $("#planetInfo").empty().append('');
       // $("#planetInvite").hide();
        $("#actionButton").hide();
        $("#invite").modal("show");
        hideScroll(2);
        break;
        
        case 9:
        $("#textUpdate").val(teambuilderinfo[0].description);
        $("#Commander").modal("show");
       
        break;
        
        case 10:
          
   var formData = new FormData();
   formData.append( 'file', $( '#file' )[0].files[0] );
 
  $.ajax({
        url: '/arena/avater',
        type: 'POST',
        data: formData,
        cache: false,
        enctype: 'multipart/form-data',
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                $("#planetDescError").text(data.report);
                
             
            }
            else
            {
                // Handle errors here
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            
            // STOP LOADING SPINNER
        }
    });
    
       return false;
        break;
        
        case 11:
        var id = $("#textUpdate").val();
        if (id.length <= 2500)
        {
        var bye = { action: "planetControls", type:8, body:id}; 
        ws.send(JSON.stringify(bye));
        }
        else
        {
            $('#descriptionError').addClass('has-error');
            $('#planetDescError').text("The length of characters can't exceed 2500.")
            
        }
        
        break;
        
        case 12:
        var a = teambuilderinfo[1];
        var length = a.length;
        $("#manage").empty();
        for (var x = 0; length > x;x++)
        {
            
        $("#manage").append('<div class="panel-body aero shadow white" id="'+ a[x].id+'"><div class="row" ><div class="col-sm-2 aero "><img src="'+ a[x].avater+' " class="img-avater img-circle" > </div><a href="/user/'+ a[x].username+'"  target="_blank" class="col-lg-4 "><button class="button2 btn-block white" >'+ a[x].username+' <br> </button></a><div class="col-lg-3"> <button class="button2 btn-block white"" id2="'+a[x].username +'" onclick="selected(this); planetControls(13);">Kick Out</button></div><div class="col-lg-3"> <button class="button2 btn-block white"" onclick="selected(this); planetControls(14);" id2="'+a[x].username +'">Change Role</button></div><br><br><br><br><div class="col-lg-12 white""><select id="'+ a[x].username+'" class="form-control '+ a[x].position+'"> <option value="Owner">Owner: Head Leader of the society. Only this role can disband society. Only one per society.</option><option value="Commander">Commander: The Leader of the society with no limitations in power.</option> <option value="Captain">Captain: Has more power than an Officer but less than a Commander.</option> <option value="Officer">Officer: Has more power than a Elite, but less than a Captain or Commander.</option><option value="Elite">Elite: Default role with no power.</option></select></div></div></div>');
        }
       
        $(".Commander").val("Commander");
        $(".Captain").val("Captain");
        $(".Officer").val("Officer");
        $(".Elite").val("Elite");
        $("#management").modal("show");
        break;
        
        case 13:
        var user = $("#select").attr("id2");
        var bye = { action: "planetControls", type:9, user:user};    
        ws.send(JSON.stringify(bye));
        break;
        
        case 14:
        var user = $("#select").attr("id2");
        var role = $('#'+user).val();
        var bye = { action: "planetControls", type:10, user:user, role: role};    
        ws.send(JSON.stringify(bye));
        break;
        
        case 15:
        var a = converter.makeHtml(teambuilderinfo[2][0].description);
         var length = teambuilderinfo[2][1].length;

     
        $("#planetInfo").empty().append('<div class="img-check scrollList4"><div class="panel-body OB center">'+ a +' </div><div class="col-sm-12 " id="planetPanelShow"></div></div>');   
        
         
      var a = teambuilderinfo[2][1];
        for (var x = 0; length > x;x++)
    {

    $("#planetPanelShow").append('<a href="/user/'+ a[x].username+'" target="_blank"  ><div class="panel-body aero shadow white"><div class="col-sm-1 aero "><img src="'+ a[x].avater+' " class="img-avater img-circle" > </div> <div class="col-sm-4 aero">Name:'+ a[x].username+' <br> </div><div class="col-lg-3 aero">Average:'+ a[x].average+'%</div><div class="col-sm-4 aero">Streak:'+ a[x].streak+'  </div><div class="col-sm-4 aero ">Power-Level:'+ a[x].power_level+'  </div><div class="col-lg-3 aero">W-L:'+ a[x].wins+"/"+a[x].losses+'</div><div class="col-sm-3 aero ">Position:'+ a[x].position+'  </div></div></a>');
    }
        $("#invite").modal("show");
        break;
        
        case 16:
        var a,b,c;
        a = Number($("#setting_rank").val());
        b = Number($("#setting_streak").val());
        c = Number($("#setting_average").val());
        d = $("#invitePlanet").val();
        
        if (Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c))
        {
            var bye = { action: "planetControls", type:11 , rank: a, streak: b, average: c, invite: d};  
             ws.send(JSON.stringify(bye));
        }
        else if (!Number.isInteger(a))
        {
            $("#planetInfoError").text("Rank isn't a number.");
        }
        
        else if (!Number.isInteger(b))
        {
            $("#planetInfoError").text("Streak isn't a number.");
        }
        
        else if (!Number.isInteger(c))
        {
            $("#planetInfoError").text("Average isn't a number.");
        }
       
        break;
        
        case 17:
       var bye = { action: "planetControls", type:12};    
        ws.send(JSON.stringify(bye));
       break;
        
        
        case 18:
        var a,b,c,d;
        a = $("#planet").val();
        b = $("#search_rank").val();
        c = $("#search_langauge").val();
        var bye = { action: "planetControls", type:13, planet:a, rank: b, langauge: c, id:1};    
        ws.send(JSON.stringify(bye)); 
        break;
        
        case 19:
        $("#planetInfo").empty().append('<div class="scrollList4 "> <div class="panel-body aero cb"><div>Name Of Planet</div> <input class="form-control" type="text" id="searchUser" placeholder="Name of Planet"><button onclick="planetControls(20);" class="button2 btn-block">  Simple Search</button></div><div class="panel-body cb"><div class="form-group "><div>Planet</div><select class="form-control" id="planet"><option value="Human">Human</option><option value="Namekian">Namekian</option><option value="Saiyan">Saiyan</option><option value="Majin">Majin</option><option value="Hitman">Hitman</option><option value="Cold" >Cold</option></select><div> Rank:</div><input class="form-control" value="0" id="search_rank" type="text"><div>Select Langauge:</div><select class="form-control" id="search_langauge"><option value="English">English</option><option value="Español">Español</option><option value="Português">Português</option> </select> <button class="button2 btn-block" onclick="planetControls(18);"> Advance Search </button> </div> </div><div class="panel-body cb" id="searchPlanet" ></div></div></div>');
        $('#invite').modal("show");
        break;
       
        case 20:
        var a = $("#searchUser").val();
        var bye = { action: "planetControls", type:13 ,user:a,  id:2};    
        ws.send(JSON.stringify(bye));
        break;
        
        case 21:
        var a = $("#select").attr("id3");
        var bye = { action: "planetControls", type:14 ,name:a};    
        ws.send(JSON.stringify(bye));
        break;
        
        case 22:
        var a = converter.makeHtml(server.report.description);
        $("#planetInfo").empty().append('<div class="img-check scrollList4"><div class="panel-body aero shadow2">'+ a +' </div></div>');   
        $("#invite").modal("show");
        break;
        
        case 23:
        $('#chat').modal("show");
        break;
        
        case 24:
        var a = $("#chatroomtext").val();
      
        if (a.length <= 101)
        {
        var bye = { action: "chat", message:a};    
        ws.send(JSON.stringify(bye));      
        }
        else
        {
     $("#insertchat").append( ' <div class="panel-body aero shadow2">Text must not exceed over 100 characters. </div>');
        }
        
        break;
        
        case 25:
        
        var bye = { action: "quest"};    
        ws.send(JSON.stringify(bye)); 
        
        break;
        
        case 26:
        
        var bye = { action: "planetControls", type:15};    
        ws.send(JSON.stringify(bye)); 
        $("#planetMenu").modal("hide");
        break;
        
    }
    
}

function hideScroll(num)
{
    if (num === 1)
    {
        $("#planetInvite").show();
        $("#actionButton").show();
    }
    else
    {
        $("#planetInvite").hide();
        $("#actionButton").hide();
    }
}

function previewShow()
{
    var a = $("#textUpdate").val();
    var b = converter.makeHtml(a);
   
    $("#planetPreview").empty().append(b);
}

function joinSociety()
{
  var a = $("#select").attr("id2");
  if (a == null) {
     
  }
  else
  
  {
      var file = { action: "joinPlanet", info:a,type:2};
  ws.send(JSON.stringify(file));  
  $("#planetRequest").modal("hide");
  }
  
 
}

function battlePlanet(action)
{
    
     createjs.Sound.play("select", {loop: 0,volume:0.1});
  var a = $("#select").attr("id2");
  var b = $("#select").attr("id3");
  loadingSettings[6] = a;
  loadingSettings[7] = b;
  

  c = action;
  
  if (a === undefined)
  {
     
  }
  else if (c === "Defend")
  {
  if (user.clan === loadingSettings[7])
  {
      loading(8);
      $("#checkingPlanet").modal("hide");
  }
  
  }
  else
  {
      if (user.clan === loadingSettings[7])
  {
  
  }
  else
  {
      loading(8);
      $("#checkingPlanet").modal("hide");
  }
  }
  
  $("#planetMenu").modal("hide");
  
  
}

function planetPanelShow(info)
{
    
    var background = new createjs.Shape();
background.graphics.beginFill("#000").rect(0, 0, 1200, 1100);
background.alpha = 0.5;
background.cursor = "default";
stage.addChild(background);

 var dragonversepanel= new createjs.Bitmap(queue.getResult("dragonversepanel"));
dragonversepanel.x = 174;
dragonversepanel.y = 40;
dragonversepanel.cursor = "default";
stage.addChild(dragonversepanel);

teambuilderinfo[2] = info;



var length = info[1].length;

    var a = info[1];
    var b = info[0];

var dragonverseavatar= new createjs.Bitmap(b.avater);
dragonverseavatar.x = 552;
dragonverseavatar.y = 95;
stage.addChild(dragonverseavatar);

var planet1 = new createjs.Bitmap(queue.getResult("planet3"));
planet1.x = 270;
planet1.y = 230;
//planet1.cursor = "pointer";
stage.addChild(planet1);

var member = false;

var X = new createjs.Bitmap(queue.getResult("x"));
X.x = 960;
X.y = 30;
X.cursor = "pointer";
X.addEventListener("click",cancel);
stage.addChild(X);

console.log(info);

for (var i = 0; i < length; i++) {
    if (a[i]['username'] === user.username)
    {
        member = true;
    }
}
var dragonversePanelTextTitle = new createjs.Text(b.name, "25px Aero", "white");
    dragonversePanelTextTitle.x = 615;
    dragonversePanelTextTitle.y = 260;
    dragonversePanelTextTitle.textAlign = "center";
    dragonversePanelTextTitle.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dragonversePanelTextTitle.textBaseline = "alphabetic";
stage.addChild(dragonversePanelTextTitle);

var dragonversePanelTextName = new createjs.Text(b.main_planet, "25px Aero", "white");
    dragonversePanelTextName.x = 740;
    dragonversePanelTextName.y = 330;
    dragonversePanelTextName.textAlign = "center";
    dragonversePanelTextName.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dragonversePanelTextName.textBaseline = "alphabetic";
stage.addChild(dragonversePanelTextName);


var dragonversePanelTextMoney = new createjs.Text(b.money, "25px Aero", "white");
    dragonversePanelTextMoney.x = 740;
    dragonversePanelTextMoney.y = 420;
    dragonversePanelTextMoney.textAlign = "center";
    dragonversePanelTextMoney.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dragonversePanelTextMoney.textBaseline = "alphabetic";
stage.addChild(dragonversePanelTextMoney);


var dPTextReputation = new createjs.Text("Reputation:"  +   b.reputation, "18px OB", "white");
    dPTextReputation.x = 310;
    dPTextReputation.y = 550;
    dPTextReputation.lineWidth = 150;
    dPTextReputation.lineHeight = 20;
    dPTextReputation.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dPTextReputation.textBaseline = "alphabetic";
stage.addChild(dPTextReputation);

var dPTextRecord = new createjs.Text("Wins/Losses:"  +   b.wins+"/" + b.losses  + "\nAverage:" + b.average + "%", "18px OB", "white");
    dPTextRecord.x = 530;
    dPTextRecord.y = 550;
    dPTextRecord.lineWidth = 170;
    dPTextRecord.lineHeight = 20;
    dPTextRecord.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dPTextRecord.textBaseline = "alphabetic";
stage.addChild(dPTextRecord);

var dPTextMembers = new createjs.Text("Members:"  + b.members_count +  "/" + b.members_limit, "18px OB", "white");
    dPTextMembers.x = 740;
    dPTextMembers.y = 550;
    dPTextMembers.lineWidth = 160;
    dPTextMembers.lineHeight = 20;
    dPTextMembers.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dPTextMembers.textBaseline = "alphabetic";
stage.addChild(dPTextMembers);
//coww


var dPTextInvitation = new createjs.Text("Invitation:"  +   b.invite, "18px OB", "white");
    dPTextInvitation.x = 310;
    dPTextInvitation.y = 610;
    dPTextInvitation.lineWidth = 150;
    dPTextInvitation.lineHeight = 20;
    dPTextInvitation.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dPTextInvitation.textBaseline = "alphabetic";
stage.addChild(dPTextInvitation);

var dPTextHealth = new createjs.Text("Health:"  + b.health+'/'+ b.max_health, "18px OB", "white");
    dPTextHealth.x = 530;
    dPTextHealth.y = 610;
    dPTextHealth.lineWidth = 150;
    dPTextHealth.lineHeight = 20;
    dPTextHealth.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dPTextHealth.textBaseline = "alphabetic";
stage.addChild(dPTextHealth);

var dPTextOwner = new createjs.Text("Owner:"  + b.owner , "18px OB", "white");
    dPTextOwner.x = 740;
    dPTextOwner.y = 610;
    dPTextOwner.lineWidth = 150;
    dPTextOwner.lineHeight = 20;
    dPTextOwner.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    dPTextOwner.textBaseline = "alphabetic";
stage.addChild(dPTextOwner);

if (!member)
{
    var bioButton = new createjs.Bitmap(queue.getResult("BioButton"));
bioButton.x = 682;
bioButton.y = 168;
bioButton.cursor = "pointer";
stage.addChild(bioButton);
bioButton.addEventListener("click",function(){planetControls(15);})  
}
else if (user.position === "Elite")
    {
       var bioButton = new createjs.Bitmap(queue.getResult("BioButton"));
bioButton.x = 682;
bioButton.y = 168;
bioButton.cursor = "pointer";
stage.addChild(bioButton);
bioButton.addEventListener("click",function(){planetControls(15);})

var quitButton = new createjs.Bitmap(queue.getResult("quitButton"));
quitButton.x = 682;
quitButton.y = 118;
quitButton.cursor = "pointer";
stage.addChild(quitButton);
quitButton.addEventListener("click",function(){planetControls(1);})

var defendButton = new createjs.Bitmap(queue.getResult("defendButton"));
defendButton.x = 682;
defendButton.y = 68;
defendButton.cursor = "pointer";
stage.addChild(defendButton);
defendButton.addEventListener("click",function(){planetControls(8);})

    }
    
    else if (user.position === "Officer")
    {
           var bioButton = new createjs.Bitmap(queue.getResult("BioButton"));
bioButton.x = 682;
bioButton.y = 168;
bioButton.cursor = "pointer";
stage.addChild(bioButton);
bioButton.addEventListener("click",function(){planetControls(15);})

var quitButton = new createjs.Bitmap(queue.getResult("quitButton"));
quitButton.x = 682;
quitButton.y = 118;
quitButton.cursor = "pointer";
stage.addChild(quitButton);
quitButton.addEventListener("click",function(){planetControls(1);})

var defendButton = new createjs.Bitmap(queue.getResult("defendButton"));
defendButton.x = 682;
defendButton.y = 68;
defendButton.cursor = "pointer";
stage.addChild(defendButton);
defendButton.addEventListener("click",function(){planetControls(8);})

var managementButton = new createjs.Bitmap(queue.getResult("managementButton"));
managementButton.x = 272;
managementButton.y = 118;
managementButton.cursor = "pointer";
stage.addChild(managementButton);
managementButton.addEventListener("click",function(){planetControls(12);})
    }
    
     else if (user.position === "Captain")
    {
         var bioButton = new createjs.Bitmap(queue.getResult("BioButton"));
bioButton.x = 682;
bioButton.y = 168;
bioButton.cursor = "pointer";
stage.addChild(bioButton);
bioButton.addEventListener("click",function(){planetControls(15);})

var quitButton = new createjs.Bitmap(queue.getResult("quitButton"));
quitButton.x = 682;
quitButton.y = 118;
quitButton.cursor = "pointer";
stage.addChild(quitButton);
quitButton.addEventListener("click",function(){planetControls(1);})

var defendButton = new createjs.Bitmap(queue.getResult("defendButton"));
defendButton.x = 682;
defendButton.y = 68;
defendButton.cursor = "pointer";
stage.addChild(defendButton);
defendButton.addEventListener("click",function(){planetControls(8);})

var AssetsButton = new createjs.Bitmap(queue.getResult("AssetsButton"));
AssetsButton.x = 272;
AssetsButton.y = 168;
AssetsButton.cursor = "pointer";
stage.addChild(AssetsButton);

var managementButton = new createjs.Bitmap(queue.getResult("managementButton"));
managementButton.x = 272;
managementButton.y = 118;
managementButton.cursor = "pointer";
stage.addChild(managementButton);
managementButton.addEventListener("click",function(){planetControls(12);})

    }
  
    else if (user.position === "Commander")
    {
       var bioButton = new createjs.Bitmap(queue.getResult("BioButton"));
bioButton.x = 682;
bioButton.y = 168;
bioButton.cursor = "pointer";
stage.addChild(bioButton);
bioButton.addEventListener("click",function(){planetControls(15);})

var quitButton = new createjs.Bitmap(queue.getResult("quitButton"));
quitButton.x = 682;
quitButton.y = 118;
quitButton.cursor = "pointer";
stage.addChild(quitButton);
quitButton.addEventListener("click",function(){planetControls(1);})

var defendButton = new createjs.Bitmap(queue.getResult("defendButton"));
defendButton.x = 682;
defendButton.y = 68;
defendButton.cursor = "pointer";
stage.addChild(defendButton);
defendButton.addEventListener("click",function(){planetControls(8);})

var AssetsButton = new createjs.Bitmap(queue.getResult("AssetsButton"));
AssetsButton.x = 282;
AssetsButton.y = 168;
AssetsButton.cursor = "pointer";
stage.addChild(AssetsButton);

var managementButton = new createjs.Bitmap(queue.getResult("managementButton"));
managementButton.x = 282;
managementButton.y = 118;
managementButton.cursor = "pointer";
stage.addChild(managementButton);
managementButton.addEventListener("click",function(){planetControls(12);})

var commanderButton = new createjs.Bitmap(queue.getResult("commanderButton"));
commanderButton.x = 282;
commanderButton.y = 68;
commanderButton.cursor = "pointer";
stage.addChild(commanderButton);
commanderButton.addEventListener("click",function(){planetControls(9);})
    }
    
 //b.main_planet
 
 function cancel()
 {
     stage.removeChild(bioButton);
     stage.removeChild(quitButton);
     stage.removeChild(defendButton);
     stage.removeChild(AssetsButton);
     stage.removeChild(managementButton);
     stage.removeChild(commanderButton);
     stage.removeChild(dragonversepanel);
     stage.removeChild(dragonversePanelTextName);
stage.removeChild(dragonversePanelTextMoney);
stage.removeChild(dragonverseavatar);
stage.removeChild(planet1);
stage.removeChild(X);
stage.removeChild(dragonversePanelTextTitle);
stage.removeChild(dPTextReputation);
stage.removeChild(dPTextRecord);
stage.removeChild(dPTextMembers);
stage.removeChild(dPTextInvitation);
stage.removeChild(dPTextHealth);
stage.removeChild(dPTextOwner);
stage.removeChild(background);
 createjs.Sound.play("select", {loop: 0,volume:0.1});
 }
  
}

function changeText(t) {
     var a = $(t).attr("id");
     a = Number(a);
     var b = $(t).attr("id2");
     b = Number(b);
     
     
     
    switch(a)
    {
    case 1:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + ' **Your_Text**');
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() + ' **Your_Text**');
        }
    break;
    
    case 2:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + ' *Your_Text*');
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() + ' *Your_Text*');
        }
    break;
    
    case 3:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + ">Name \n >>Quote\n\n ");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  ">Name \n >>Quote\n\n ");
        }
      
    break;
    
    case 4:
         if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "[Words](linkhere)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "[Words](linkhere)");
        }
       
    break;
    
    case 5:
      if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "~~Yourword~~");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "~~Yourword~~");
        }   
    
    break;
    
    case 6:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Title](/path/to/img.jpg)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Title](/path/to/img.jpg)");
        }   
   
    break;
    
    case 7:
         if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "#Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " #Text");
        }   
      
    break;
    
    case 8:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " ##Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " ##Text");
        }        
    break;
    
    case 9:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " ###Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " ###Text");
        }      
    break;
    
    case 10:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " ####Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " ####Text");
        }       
    break;
    
    case 11:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " #####Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " #####Text");
        }         
    break;
    
    case 12:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " #####Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " #####Text");
        }   
    break;
    
    case 13:
         if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "[![Title][2]][1]\n[1]: https://link/to/site\n[2]: https://link/to/image");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "[![Title][2]][1]\n[1]: https://link/to/site\n[2]: https://link/to/image");
        }   
       
    break;
    
    

  
  

    
    }
    
   
}

function Team()
{
  
 stage.removeAllChildren();
         stage.removeAllEventListeners();

console.log(user);
var teamc = user.team;
var uc = JSON.parse(user.uc);
var us = JSON.parse(user.us);
var s = user.stats;

//'"skill1": \"[\"g1\",\"g2\",\"g3\",\"g4\",\"ge-t\"]\"'
var c = user.skill;
c = JSON.parse(c);
var skill1 = c.s1;
var skill2 = c.s2;
var skill3 = c.s3;
var quest = JSON.parse(user.quest);
var items = JSON.parse(user.items);

p1stats = {c1:teamc[0],c2:teamc[1],c3:teamc[2], a:true,cS1:skill1,cS2:skill2,cS3:skill3,current:0,hold:[null,null,false],stats:s,statshold:[false],uc: uc, us: us, quest: quest};
var a = s[p1stats.c1];
var b = s[p1stats.c2];
 c = s[p1stats.c3];
var ctx = document.getElementById("info").getContext("2d");
ctx.canvas.height = 250;
ctx.canvas.width = 325;
var option;            
            
if( $('#itemlist').has('option').length === 0 ) 
{
for ( property in items) { 

   
   if (property !== "item")
   {
       b = itemList(property);
   option += '<option value="'+ property + '">' + b[0] + '</option>';
   }
}
}

$('#itemlist').append(option);


var f = itemList(Object.keys(items)[0]);
    $("#itemDescription").text(f[1]);
    $("#itemInfo").text("Cooldown:" + f[2] + " BP:" + f[3] + " Amount:" + items[Object.keys(items)[0]] + " Limit:" + f[6]);

    
$('#itemlist').change(function() {
    
    var fake = itemList($(this).val());
    var name = $(this).val();
    $("#itemDescription").text(fake[1]);
     $("#itemInfo").text("Cooldown:" + fake[2] + " BP:" + fake[3] + " Amount:" + items[name]+ " Limit:" + f[6]);
    
   

});


$('#itemlist').val(items["item"]);


var radarChartData = {
		labels: ["", "", "",""],
		datasets: [
		
			{
				label: "Stats",
				fillColor: "rgba(252,97,34,0.4)",
				strokeColor: "rgba(255,255,255,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "rgba(255,255,255,1)",
				pointHighlightFill: "rgba(255,255,255,1)",
				pointLabelFontColor : "rgba(255,255,255,1)",
				pointHighlightStroke: "rgba(255,255,255,1)",
				showTooltip: true,
				data: [10,5,6,7]
			}
		]
	};
	var stats= document.getElementById("info").getContext("2d");
	
	var animationComplete = function () {
    var self = this;
    var nx = 10;
    var ny = -70;
    var loop = 1;
    var name = "STR:";
  

    Chart.helpers.each(self.datasets[0].points, function (point, index) {
        Chart.helpers.each(self.datasets, function (dataset) {
            new Chart.Tooltip({
                x: 150 + nx,
                y: 75 + ny,
                xPadding: self.options.tooltipXPadding,
                yPadding: self.options.tooltipYPadding,
                fillColor: self.options.tooltipFillColor,
                textColor: dataset.strokeColor,
                fontFamily: self.options.tooltipFontFamily,
                fontStyle: self.options.tooltipFontStyle,
                fontSize: self.options.tooltipFontSize,
                caretHeight: self.options.tooltipCaretSize,
                cornerRadius: self.options.tooltipCornerRadius,
                text: name + dataset.points[index].value,
                chart: self.chart,
                custom: self.options.customTooltips
            }).draw()
            
            if (loop === 2)
            {
                nx = 10;
                ny = 163;
                name = "DEF:";
            }
            
            else if (loop === 3)
            {
               nx = -90;
                ny = 55; 
                name = "SPD:";
                
            }
            
            else
            {
                nx = 120;
                ny = 55;
                name = "Ki:";
            }          
loop += 1;
        });

        self.chart.ctx.font = Chart.helpers.fontString(self.fontSize, self.fontStyle, self.fontFamily)
        self.chart.ctx.textAlign = 'center';
        self.chart.ctx.textBaseline = "middle";
        self.chart.ctx.fillStyle = "#666";
        self.chart.ctx.fillText(point.label, point.x, self.scale.startPoint - 12);
    });
};

    statsInfo = new Chart(stats).Radar(radarChartData,{
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 30,
    pointLabelFontColor : "rgba(255,255,255,1)",
    angleLineColor : "rgba(255,255,255,1)",
    scaleLineColor: 'rgba(255,255,255,1)',
    scaleStartValue: 0,
    showTooltip: true,
    tooltipTemplate: "<%= value %>",
    tooltipFillColor: "rgba(0,0,0,0.6)",
    tooltipEvents: [],
   // tooltipCaretSize: -5,
    onAnimationComplete: function () {
        animationComplete.apply(this);
    },
   
    
});

statsInfo.datasets[0].points[0].value = 0;
       statsInfo.datasets[0].points[1].value = 0;
       statsInfo.datasets[0].points[2].value = 0;
       statsInfo.datasets[0].points[3].value = 0;
       statsInfo.update();


var backgroundImage1 = new createjs.Bitmap(queue.getResult("teambuilder"));
backgroundImage1.x = 0;
backgroundImage1.y = 0;
stage.addChild(backgroundImage1);


//button1.cursor = "pointer";
//button1.addEventListener('click', mainMenu);
//stage.addChild(button1);


var button1 = new createjs.Shape();
button1.graphics.beginFill("#000").rect(200, 35, 125, 40);
button1.alpha = 0.01;
button1.cursor = "pointer";
stage.addChild(button1);
button1.addEventListener("click",mainMenu);

var button2 = new createjs.Shape();
button2.graphics.beginFill("#000").rect(340, 35, 145, 40);
button2.alpha = 0.01;
button2.cursor = "pointer";
stage.addChild(button2);
button2.addEventListener('click', function(){loading(2)});

var button3 = new createjs.Shape();
button3.graphics.beginFill("#000").rect(495, 35, 155, 40);
button3.alpha = 0.01;
button3.cursor = "pointer";
stage.addChild(button3);
button3.addEventListener('click', function(){loading(3)});

var button4 = new createjs.Shape();
button4.graphics.beginFill("#000").rect(660, 35, 115, 40);
button4.alpha = 0.01;
button4.cursor = "pointer";
stage.addChild(button4);
button4.addEventListener('click', function(){loading(4)});

var button5 = new createjs.Shape();
button5.graphics.beginFill("#000").rect(790, 35, 150, 40);
button5.alpha = 0.01;
button5.cursor = "pointer";
stage.addChild(button5);
button5.addEventListener('click', function(){loading(7)});

var desiredW3 = 75;
var useravater = new createjs.Bitmap(user.avater);
useravater.scaleX = useravater.scaleY = desiredW3 / 100;
useravater.x = 751;
useravater.y = 280;

stage.addChild(useravater);

var avatarborder = new createjs.Bitmap(queue.getResult("avatarborder"));
avatarborder.x = 751;
avatarborder.y = 280;
stage.addChild(avatarborder);

var hitArea1 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(-150,-50,315,60));  

teambuilderinfo[0] = new createjs.Bitmap(queue.getResult(p1stats.c1));
teambuilderinfo[0].x = 840;
teambuilderinfo[0].y = 277;
stage.addChild(teambuilderinfo[0]);
teambuilderinfo[0].addEventListener('click', function() {showCharacter(1,true); });
teambuilderinfo[0].addEventListener('mouseover', function() {hovercharacter(1); });
teambuilderinfo[0].cursor = "pointer";

teambuilderinfo[1] = new createjs.Bitmap(queue.getResult(p1stats.c2));
teambuilderinfo[1].x = 929;
teambuilderinfo[1].y = 277;
stage.addChild(teambuilderinfo[1]);
teambuilderinfo[1].addEventListener('click', function() {showCharacter(2,true);});
teambuilderinfo[1].addEventListener('mouseover', function() {hovercharacter(2); });
teambuilderinfo[1].cursor = "pointer";


teambuilderinfo[2] = new createjs.Bitmap(queue.getResult(p1stats.c3));
teambuilderinfo[2].x = 1018;
teambuilderinfo[2].y = 277;

stage.addChild(teambuilderinfo[2]);
teambuilderinfo[2].addEventListener('click', function() {showCharacter(3,true);});
teambuilderinfo[2].addEventListener('mouseover', function() {hovercharacter(3); });
teambuilderinfo[2].cursor = "pointer";


teambuilderinfo[3] = new createjs.Bitmap(queue.getResult("?"));
teambuilderinfo[3].x = 662;
teambuilderinfo[3].y = 420;
teambuilderinfo[3].cursor = "pointer";
stage.addChild(teambuilderinfo[3]);
teambuilderinfo[3].addEventListener('click', function() {skillD(0,true);});

teambuilderinfo[4] = new createjs.Bitmap(queue.getResult("?"));
teambuilderinfo[4].x = 751;
teambuilderinfo[4].y = 420;
teambuilderinfo[4].cursor = "pointer";
stage.addChild(teambuilderinfo[4]);
teambuilderinfo[4].addEventListener('click', function() {skillD(1,true);});

teambuilderinfo[5] = new createjs.Bitmap(queue.getResult("?"));
teambuilderinfo[5].x = 840;
teambuilderinfo[5].y = 420;
teambuilderinfo[5].cursor = "pointer";
stage.addChild(teambuilderinfo[5]);
teambuilderinfo[5].addEventListener('click', function() {skillD(2,true);});

teambuilderinfo[6] = new createjs.Bitmap(queue.getResult("?"));
teambuilderinfo[6].x = 929;
teambuilderinfo[6].y = 420;
teambuilderinfo[6].cursor = "pointer";
stage.addChild(teambuilderinfo[6]);
teambuilderinfo[6].addEventListener('click', function() {skillD(3,true);});

teambuilderinfo[7] = new createjs.Bitmap(queue.getResult("?"));
teambuilderinfo[7].x = 1018;
teambuilderinfo[7].y = 420;
teambuilderinfo[7].cursor = "pointer";
stage.addChild(teambuilderinfo[7]);
teambuilderinfo[7].addEventListener('click', function() {skillD(4,true);});



    teambuilderinfo[8] = new createjs.Text("", "25px OB", "white");
    teambuilderinfo[8].x = 255;
    teambuilderinfo[8].y = 305;
    teambuilderinfo[8].textAlign = "center";
    teambuilderinfo[8].shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    teambuilderinfo[8].textBaseline = "alphabetic";
    stage.addChild(teambuilderinfo[8]);

//mooo
var item = new createjs.Shape();
item.graphics.beginFill("#000").rect(490, 508, 180, 150);
item.alpha = 0.01;
item.cursor = "pointer";
item.addEventListener('click', itemShow);
stage.addChild(item);

var save = new createjs.Shape();
save.graphics.beginFill("#000").rect(490, 100, 180, 150);
save.alpha = 0.01;
save.cursor = "pointer";
save.addEventListener('click', saveteam);
stage.addChild(save);

function hovercharacter(num)
{

     if (num !== 4)
     {
         p1stats.current = num;
     }
     
     var a;
     var stats;
    switch(num)
    {
        case 1:
        teambuilderinfo[3].image = queue.getResult(p1stats.cS1[0]); 
        teambuilderinfo[4].image = queue.getResult(p1stats.cS1[1]); 
        teambuilderinfo[5].image = queue.getResult(p1stats.cS1[2]); 
        teambuilderinfo[6].image = queue.getResult(p1stats.cS1[3]); 
        teambuilderinfo[7].image = queue.getResult(p1stats.cS1[4]); 
        a = p1stats.c1;
        break;
        
        case 2:
        teambuilderinfo[3].image = queue.getResult(p1stats.cS2[0]); 
        teambuilderinfo[4].image = queue.getResult(p1stats.cS2[1]); 
        teambuilderinfo[5].image = queue.getResult(p1stats.cS2[2]); 
        teambuilderinfo[6].image = queue.getResult(p1stats.cS2[3]); 
        teambuilderinfo[7].image = queue.getResult(p1stats.cS2[4]); 
        a = p1stats.c2;
        break;
        
        case 3:
        teambuilderinfo[3].image = queue.getResult(p1stats.cS3[0]); 
        teambuilderinfo[4].image = queue.getResult(p1stats.cS3[1]); 
        teambuilderinfo[5].image = queue.getResult(p1stats.cS3[2]); 
        teambuilderinfo[6].image = queue.getResult(p1stats.cS3[3]); 
        teambuilderinfo[7].image = queue.getResult(p1stats.cS3[4]); 
        a = p1stats.c3;
        break;
        
        case 4:
        teambuilderinfo[8].text = "Click Avatar To Save";
        statsInfo.datasets[0].points[0].value = 0;
       statsInfo.datasets[0].points[1].value = 0;
       statsInfo.datasets[0].points[2].value = 0;
       statsInfo.datasets[0].points[3].value = 0;
       statsInfo.update();
       return 0;
        break;
    }
    stats = p1stats.stats[a];
    a = characterList(a,[0]);
     teambuilderinfo[8].text = " " + a[2] + " Lv " + stats[0];
    statsInfo.datasets[0].points[0].value = a[5][0];
       statsInfo.datasets[0].points[1].value = a[5][1];
       statsInfo.datasets[0].points[2].value = a[5][2];
       statsInfo.datasets[0].points[3].value = a[5][3];
       statsInfo.update();
}




}


function inventoryOpen()
{
    stage.removeAllChildren();
         stage.removeAllEventListeners();
         var backgroundImage1 = new createjs.Bitmap(queue.getResult("inventory"));
backgroundImage1.x = 0;
backgroundImage1.y = 0;
stage.addChild(backgroundImage1);

var uc = JSON.parse(user.uc);
var us = JSON.parse(user.us);
var item = JSON.parse(user.items);
var s = user.stats;

var button1 = new createjs.Shape();
button1.graphics.beginFill("#000").rect(200, 85, 125, 40);
button1.alpha = 0.01;
button1.cursor = "pointer";
stage.addChild(button1);
button1.addEventListener("click",mainMenu);

var button2 = new createjs.Shape();
button2.graphics.beginFill("#000").rect(340, 85, 145, 40);
button2.alpha = 0.01;
button2.cursor = "pointer";
stage.addChild(button2);
button2.addEventListener('click', function(){loading(2)});

var button3 = new createjs.Shape();
button3.graphics.beginFill("#000").rect(495, 85, 155, 40);
button3.alpha = 0.01;
button3.cursor = "pointer";
stage.addChild(button3);
button3.addEventListener('click', function(){loading(3)});

var button4 = new createjs.Shape();
button4.graphics.beginFill("#000").rect(660, 85, 115, 40);
button4.alpha = 0.01;
button4.cursor = "pointer";
stage.addChild(button4);
button4.addEventListener('click', function(){loading(4)});

var button5 = new createjs.Shape();
button5.graphics.beginFill("#000").rect(790, 85, 150, 40);
button5.alpha = 0.01;
button5.cursor = "pointer";
stage.addChild(button5);
button5.addEventListener('click', function(){loading(7)});

var charactertags = new createjs.Shape();
charactertags.graphics.beginFill("#000").rect(92, 170, 130, 40);
charactertags.alpha = 0.01;
charactertags.cursor = "pointer";
stage.addChild(charactertags);
charactertags.addEventListener('click', function(){inventoryTags(1);});

var skillstags = new createjs.Shape();
skillstags.graphics.beginFill("#000").rect(240, 170, 130, 40);
skillstags.alpha = 0.01;
skillstags.cursor = "pointer";
stage.addChild(skillstags);
skillstags.addEventListener('click', function(){inventoryTags(2);});

var itemstags = new createjs.Shape();
itemstags.graphics.beginFill("#000").rect(385, 170, 130, 40);
itemstags.alpha = 0.01;
itemstags.cursor = "pointer";
stage.addChild(itemstags);
itemstags.addEventListener('click', function(){inventoryTags(3);});

var extratags = new createjs.Shape();
extratags.graphics.beginFill("#000").rect(530, 170, 130, 40);
extratags.alpha = 0.01;
extratags.cursor = "pointer";
stage.addChild(extratags);
extratags.addEventListener('click', function(){inventoryTags(4);});

var leftButton = new createjs.Shape();
leftButton.graphics.beginFill("#000").rect(140, 620, 180, 50);
leftButton.alpha = 0.01;
leftButton.cursor = "pointer";
stage.addChild(leftButton);
leftButton.addEventListener('click', function(){nextInventory(-1);});

var rightButton = new createjs.Shape();
rightButton.graphics.beginFill("#000").rect(440, 620, 180, 50);
rightButton.alpha = 0.01;
rightButton.cursor = "pointer";
stage.addChild(rightButton);
rightButton.addEventListener('click', function(){nextInventory(1);});

var crafting= new createjs.Shape();
crafting.graphics.beginFill("#000").rect(1000, 30, 180, 50);
crafting.alpha = 0.01;
crafting.cursor = "pointer";
stage.addChild(crafting);
crafting.addEventListener("click",function(){changeInventory(1);});


var convert = new createjs.Shape();
convert.graphics.beginFill("#000").rect(29, 30, 180, 50);
convert.alpha = 0.01;
convert.cursor = "pointer";
stage.addChild(convert);
convert.addEventListener("click",function(){changeInventory(2);});

var tags = new createjs.Bitmap(queue.getResult("tagsconvert"));
tags.x = 73;
tags.y = 160;
stage.addChild(tags);


var loopImages = [];
var inventorySlot = 0;
var inventoryLastNumber = 0;
var inventoryText =  new createjs.Text("0/0", "20px OB", "white");
    inventoryText.x = 360;
    inventoryText.y = 652;
    inventoryText.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    inventoryText.textBaseline = "alphabetic";
    stage.addChild(inventoryText);
    

var inventoryKili =  new createjs.Text(user.kili, "18px OB", "white");
    inventoryKili.x = 855;
    inventoryKili.y = 247;
    inventoryKili.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    inventoryKili.textBaseline = "alphabetic";
    stage.addChild(inventoryKili);
    
var inventoryOn = 0;


var previewTitle;
previewTitle = new createjs.Text("", "32px OB", "white");
previewTitle.x = 720;
    previewTitle.y = 352;
    previewTitle.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    previewTitle.textBaseline = "alphabetic";
    
    
var previewDescription;
previewDescription = new createjs.Text("", "16px OB", "white");
previewDescription.x = 720;
    previewDescription.y = 422;
    previewDescription.lineWidth = 366;
    previewDescription.lineHeight = 25;
    previewDescription.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    previewDescription.textBaseline = "alphabetic";
    
    
var previewConditions;
previewConditions = new createjs.Text("", "16px OB", "white");
previewConditions.x = 720;
    previewConditions.y = 640;
    previewConditions.lineWidth = 366;
    previewConditions.lineHeight =220;
    previewConditions.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    previewConditions.textBaseline = "alphabetic";

var previewImage = new createjs.Bitmap(queue.getResult("zGu"));
previewImage.x = 707;
previewImage.y = 174;

var amount = new createjs.Bitmap(queue.getResult("amount"));
amount.x = 757; 
amount.y = 145;

var previewText = new createjs.Text("", "14px OB", "white");
previewText.x = 790;
previewText.y = 161;
previewText.textAlign = "center";




var ctc = new createjs.Bitmap(queue.getResult("convert"));
ctc.x = 980;
ctc.y = 140;
ctc.cursor = "pointer";
ctc.addEventListener("click",inventorypop);


var coverback= new createjs.Shape();
coverback.graphics.beginFill("#000").rect(0, 0, 1200, 720);
coverback.alpha = 0.01;
coverback.cursor = "no-drop";

var accept = new createjs.Shape();
accept.graphics.beginFill("#000").rect(230, 440, 150, 50);
accept.alpha = 0.01;
accept.cursor = "pointer";
accept.addEventListener("click", function(){inventoryPopUpOptions(1)});

var decline = new createjs.Shape();
decline.graphics.beginFill("#000").rect(400, 440, 150, 50);
decline.alpha = 0.01;
decline.cursor = "pointer";
decline.addEventListener("click",inventorypop);
decline.addEventListener("click", function(){inventoryPopUpOptions(2)});

var inventorypopup = new createjs.Bitmap(queue.getResult("inventorypopup"));
inventorypopup.x = 200; 
inventorypopup.y = 200;


var inventorypreviewImage = new createjs.Bitmap();
inventorypreviewImage.x = 242.5;
inventorypreviewImage.y = 248;


var inventoryConvert = new createjs.Bitmap(queue.getResult("convert"));
inventoryConvert.x = 418;
inventoryConvert.y = 213;


var inventoryTextPop = new createjs.Text("12000", "26px aero", "white");
inventoryTextPop.x = 430;
inventoryTextPop.y = 375;
inventoryTextPop.textAlign = "center";


var tagnumber = 1;

  stage.addChild(previewDescription);
    stage.addChild(previewTitle);
    stage.addChild(previewConditions); 
    
    function bindClick(i,ii) {
    return function(){
        console.log("Skill used: " + i);
             inventoryPreview(i,ii);
           };
}

function inventoryPopUpOptions(num)
{
    console.log("remove");
    var cost;
  
    if (num === 1)
    {
        console.log("Num: 1");
        if (tagnumber === 1)
        {
            
            
       if (previewImage.id === 1 && uc[previewImage.name] != 0)
       {
           console.log("There are this many of the character: " + uc[previewImage.name]);
            var file = { action: "inventory", choice: previewImage.name, tag: tagnumber, type: previewImage.id};
  ws.send(JSON.stringify(file));   
       }
       else if (previewImage.id === 2 && us[previewImage.name] != 0)
       {
            var file = { action: "inventory", choice: previewImage.name, tag: tagnumber, type: previewImage.id};
  ws.send(JSON.stringify(file));   
       }
      
        }

else if (tagnumber === 2)
        {
            console.log("Num: 2");
              if (previewImage.id === 1)
    {
         var character = characterList(previewImage.name,[0]);
       if (character[4] === "S")
{
    cost = 16000;
}

else if (character[4] === "R")
{
    cost = 10000;
}

else
{
    cost = 4000;
}
    }
    else if (previewImage.id === 2)
    {
       
         var skill = skillList(previewImage.name,[0]);
        if (skill[10] === "S")
{
    cost = 2000;
}

else if (skill[10] === "R")
{
    cost = 1250;
}

else
{
    cost = 250;
}
    }
    if ( cost <= user.kili)
    {
         var file = { action: "inventory", choice: previewImage.name, tag: tagnumber, type: previewImage.id};
  ws.send(JSON.stringify(file));    
    }
         
        }
    }
    else
    {
        stage.removeChild(accept);
        stage.removeChild(decline);
        stage.removeChild(inventorypopup);
        stage.removeChild(inventorypreviewImage);
        stage.removeChild(inventoryConvert);
        stage.removeChild(inventoryTextPop);
        stage.removeChild(coverback);
    }
}

function inventorypop()
{
    
stage.addChild(coverback);


if (tagnumber === 1)
{

if (previewImage.id === 1 )
{
    var character = characterList(previewImage.name,[0]);

console.log("Rarity : " + character[4] + "  Image: " + previewImage.name);
if (character[4] === "S")
{
    inventoryTextPop.text = 4000;
}

else if (character[4] === "R")
{
    inventoryTextPop.text = 2000;
}

else
{
    inventoryTextPop.text = 400;
}
}
else if (previewImage.id === 2)
{
    

var skill = skillList(previewImage.name,[0]);

console.log("Rarity : " + skill[8] + "  Image: " + previewImage.name);
if (skill[10] === "S")
{
    inventoryTextPop.text = 1000;
}

else if (skill[10] === "R")
{
    inventoryTextPop.text = 500;
}

else
{
    inventoryTextPop.text = 100;
}
}
inventorypreviewImage.image = queue.getResult(previewImage.name);
inventoryConvert.image = queue.getResult("convert");
stage.addChild(inventorypopup);
stage.addChild(inventorypreviewImage);
stage.addChild(inventoryConvert);
stage.addChild(inventoryTextPop); 

stage.addChild(accept);
stage.addChild(decline); 
}

else
{

if (previewImage.id === 1 )
{
    var character = characterList(previewImage.name,[0]);

console.log("Rarity : " + character[4] + "  Image: " + previewImage.name);
if (character[4] === "S")
{
    inventoryTextPop.text = 2000;
}

else if (character[4] === "R")
{
    inventoryTextPop.text = 1000;
}

else
{
    inventoryTextPop.text = 400;
}
}
else if (previewImage.id === 2)
{
    

var skill = skillList(previewImage.name,[0]);
//killme
console.log("Rarity : " + skill[8] + "  Image: " + previewImage.name);
if (skill[10] === "S")
{
    inventoryTextPop.text = 500;
}

else if (skill[10] === "R")
{
    inventoryTextPop.text = 250;
}

else
{
    inventoryTextPop.text = 100;
}
}
inventorypreviewImage.image = queue.getResult(previewImage.name);
inventoryConvert.image = queue.getResult("craft");
stage.addChild(inventorypopup);
stage.addChild(inventorypreviewImage);
stage.addChild(inventoryConvert);
stage.addChild(inventoryTextPop);

stage.addChild(accept);
stage.addChild(decline); 
}



    
}
function changeInventory(num)
{
     stage.removeChild(ctc);
    inventoryOn = 0;
    inventorySlot = 0;
    inventoryLastNumber = 0;
    inventoryText.text = "0/0";
     for (var i = 0; i < 24; i++)
    {
        stage.removeChild(loopImages[i]);
    }
    stage.removeChild(previewImage);
    if (num === 1)
    {
     tags.image = queue.getResult("tagscrafting");
     ctc.image = queue.getResult("craft");
     tagnumber = 2;
    }
    else
    {
         tags.image = queue.getResult("tagsconvert");  
         ctc.image = queue.getResult("convert");
         tagnumber = 1;
    }
   
}
    

function inventoryPreview(num,num2)
{
    var a;
   
   console.log("Hello: " + num2);
   
    if (num2 === 1)
    {
        a = characterList(num,[0]);
        previewDescription.text = a[0];
        previewTitle.text = a[2];
        
        previewConditions.text = "";
        previewImage.image = queue.getResult(num);
        previewImage.id = num2;
        stage.addChild(previewImage);
        stage.addChild(amount);
        previewImage.name = num;
        previewText.text = uc[num];
        stage.addChild(previewText);
    
    }
    else if (num2 === 2)
    {
        a = skillList(num,[0]);
        console.log(a);
        previewDescription.text = a[3];
        previewTitle.text = a[5];
        previewImage.id = num2;
        previewConditions.text = "Bp: " + a[1] + "     Cooldown: " + a[2] + "     Energy: " + a[4] + "     Type: " + a[6] + "     Focus: " + a[7];
        previewImage.image = queue.getResult(num);
        stage.addChild(previewImage);
        stage.addChild(amount);
        previewText.text = us[num];
        previewImage.name = num;
        stage.addChild(previewText);
    }
    
    else if (num2 === 3)
    {
        a = itemList(num);
    }
     stage.removeChild(ctc);
    stage.addChild(ctc);
    
 console.log("Inventory Preview");
}

function nextInventory(num)
{
    stage.removeChild(ctc);
    console.log("Next Inventory: ");
    var length;
    var x = 105;
    var y = 140;
    var arrayKeys;
    var arrayValues;
    var arrayKeys2;
    var remove;
    var run = true;
    
      createjs.Sound.play("select", {loop: 0,volume:0.01});
      

    if (tagnumber === 1)
    {
   
    if (inventoryLastNumber === inventorySlot && num === 1 )
    {
        run = false;
        console.log("Can't Move right");
    }
    else if (1 === inventorySlot && num === -1)
    {
        run = false;
                console.log("Can't Move left");
    }
    
    if (run)
    {
   
    for (var i = 0; i < 24; i++)
    {
        stage.removeChild(loopImages[i]);
    }
    stage.removeChild(previewImage);
    
    if (inventoryOn === 1)
    {
      arrayKeys2 = allInfo(3);
      arrayKeys = Object.keys(uc)
       arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
       length = arrayKeys.length /24;
   arrayValues = Object.values(uc);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));
    }
    }
    
    else if (inventoryOn === 2)
    {
       
       
      arrayKeys2 = allInfo(4);
      arrayKeys = Object.keys(us)
     
       arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
      length = arrayKeys.length /24;
   arrayValues = Object.values(us);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));
console.log("Next Turn: ");
           
//inventoryPreview(arrayKeys[i],2);
//inventoryPreview(arrayKeys[i],2);

     }   
    }
    
    else if (inventoryOn === 3)
    {
       length = Object.keys(items).length / 24;
      arrayKeys = Object.keys(items);
     
      
   arrayValues = Object.values(us);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));  
    }
    
    
    }
    }
    else
    {
        console.log("Hello: Think");
         if (inventoryLastNumber === inventorySlot && num === 1 )
    {
        run = false;
        console.log("Can't Move right");
    }
    else if (1 === inventorySlot && num === -1)
    {
        run = false;
                console.log("Can't Move left");
    }
    
    if (run)
    {
   
    for (var i = 0; i < 24; i++)
    {
        stage.removeChild(loopImages[i]);
    }
    stage.removeChild(previewImage);
    
    if (inventoryOn === 1)
    {
     
        arrayKeys = allInfo(3);
      arrayKeys2 = Object.keys(uc)
      console.log(arrayKeys);
      console.log(arrayKeys2);
      arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
      length = arrayValues.length /24;
      
   arrayValues = Object.values(uc);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));
    }
    }
    
    else if (inventoryOn === 2)
    {
       
       
       arrayKeys = allInfo(4);
      arrayKeys2 = Object.keys(us)
       console.log(arrayKeys);
      console.log(arrayKeys2);
     arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
      
      length = arrayValues.length /24;
   arrayValues = Object.values(us);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));
console.log("Next Turn: ");
           
//inventoryPreview(arrayKeys[i],2);
//inventoryPreview(arrayKeys[i],2);

     }   
    }
    
    else if (inventoryOn === 3)
    {
       length = Object.keys(items).length / 24;
      arrayKeys = Object.keys(items);
     
      
   arrayValues = Object.values(us);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));  
    }
    
    
    }
    }
   
    }
    
}
 else
    {
        console.log("Tag Number 2");
         if (inventoryLastNumber === inventorySlot && num === 1 )
    {
        run = false;
        console.log("Can't Move right");
    }
    else if (1 === inventorySlot && num === -1)
    {
        run = false;
                console.log("Can't Move left");
    }
    
  console.log("Inventory: " + inventorySlot );
     console.log("inventoryOn : " + inventoryOn  );
    if (run)
    {
   
    for (var i = 0; i < 24; i++)
    {
        stage.removeChild(loopImages[i]);
    }
    stage.removeChild(previewImage);
    
    if (inventoryOn === 1)
    {
        length = Object.keys(uc).length /24;
      arrayKeys2 = Object.keys(uc)
     arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
      
   arrayValues = Object.values(uc);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));
    }
    }
    
    else if (inventoryOn === 2)
    {  
       
       arrayKeys2 = allInfo(2);
       arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
   
   length = arrayKeys.length / 24;
   inventoryLastNumber = Math.ceil(length);
   
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
     
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));
console.log("Next Turn: ");
           
//inventoryPreview(arrayKeys[i],2);
//inventoryPreview(arrayKeys[i],2);

     }   
    }
    
    else if (inventoryOn === 3)
    {
       length = Object.keys(items).length / 24;
      arrayKeys = Object.keys(items);
     
      
   arrayValues = Object.values(us);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));  
    }
    
    
    }
    }
    else
    {
        console.log("Hello: Think");
         if (inventoryLastNumber === inventorySlot && num === 1 )
    {
        run = false;
        console.log("Can't Move right");
    }
    else if (1 === inventorySlot && num === -1)
    {
        run = false;
                console.log("Can't Move left");
    }
    
    if (run)
    {
   
    for (var i = 0; i < 24; i++)
    {
        stage.removeChild(loopImages[i]);
    }
    stage.removeChild(previewImage);
    
    if (inventoryOn === 1)
    {
        length = Object.keys(uc).length /24;
      arrayKeys = Object.keys(uc)
     arrayKeys2 = Object.keys(uc);
     arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));
    }
    }
    
    else if (inventoryOn === 2)
    {
        console.log("inventory 2");
       arrayKeys = allinfo(2);
       length = arrayKeys.length /24;
       arrayKeys2 = Object.keys(us);
     arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
     
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));
console.log("Next Turn: ");
           
//inventoryPreview(arrayKeys[i],2);
//inventoryPreview(arrayKeys[i],2);

     }   
    }
    
    else if (inventoryOn === 3)
    {
       length = Object.keys(items).length / 24;
      arrayKeys = Object.keys(items);
     
      
   arrayValues = Object.values(us);
    
   inventoryLastNumber = Math.ceil(length);
     if (num === -1)
     {
        remove = 24 * (inventorySlot - 2); 
     }
     else
     {
        remove = 24 * inventorySlot; 
     }
       
       console.log("Remove: " + remove);
      arrayKeys.splice(0,remove);
      inventorySlot += num;
      inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
      
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
 loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].addEventListener('click', bindClick(arrayKeys[i],2));  
    }
    
    
    }
    }
   
    }
    }
}

function inventoryTags(num,num2)
{
     stage.removeChild(ctc);
    var length;
    var x = 105;
    var y = 140;
    var arrayKeys;
    var arrayKeys2;
    var arrayValues;
     createjs.Sound.play("select", {loop: 0,volume:0.01});
  console.log("Tag Number : " + tagnumber);
    
if (tagnumber === 1)
{
    for (var i = 0; i < 24; i++)
    {
        stage.removeChild(loopImages[i]);
    }
    
  if (num === 1)
  {
   inventoryOn = 1;
   
   inventorySlot = 1
   
     arrayKeys2 = allInfo(3);
    arrayKeys = Object.keys(uc)
   arrayValues = Object.values(uc);

console.log(arrayKeys);
console.log(arrayKeys2);
     arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
 length = arrayKeys.length / 24;
 inventoryLastNumber = Math.ceil(length);
     inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
     for (var i = 0; i < 24; i++) {
        
 

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
        loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].name = arrayKeys[i];
console.log(arrayKeys[i]);
loopImages[i].addEventListener('click',  bindClick(arrayKeys[i],1));
     } 
  }
  else if (num === 2)
  {
      inventoryOn = 2;
      length = Object.keys(us).length /24;
      arrayKeys = Object.keys(us)
      arrayKeys2 = allInfo(4);
   arrayValues = Object.values(us);
     inventorySlot = 1;
  
     
        
        arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
length = arrayKeys.length / 24;
 inventoryLastNumber = Math.ceil(length);
     inventoryText.text = inventorySlot + "/" + inventoryLastNumber;
     
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].name = arrayKeys[i];
console.log(arrayKeys[i]);
loopImages[i].addEventListener('click',  bindClick(arrayKeys[i],2));
}
}
}
else
{
    console.log("working");
     for (var i = 0; i < 24; i++)
    {
        stage.removeChild(loopImages[i]);
    }
    
  if (num === 1)
  {
   
   arrayKeys  = allInfo(1);
      console.log(arrayKeys);
      length = arrayKeys.length / 24;
     inventorySlot = 1;
     inventoryOn = 1;
     arrayKeys2 = Object.keys(uc);
     arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
   inventoryLastNumber = Math.ceil(length);
     inventoryText.text = inventorySlot + "/" + inventoryLastNumber
 
     for (var i = 0; i < 24; i++) {
        
 

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}
        loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].name = arrayKeys[i];
console.log(arrayKeys[i]);
loopImages[i].addEventListener('click',  bindClick(arrayKeys[i],1));
     } 
  }
  else if (num === 2)
  {
      inventoryOn = 2;
      arrayKeys  = allInfo(2);
      arrayKeys2 = Object.keys(us);
      arrayKeys = arrayKeys.filter(function(val) {
  return arrayKeys2.indexOf(val) == -1;
});
      console.log(arrayKeys);
      length = arrayKeys.length / 24;
     inventorySlot = 1;
   inventoryLastNumber = Math.ceil(length);
     inventoryText.text = inventorySlot + "/" + inventoryLastNumber
     
     for (var i = 0; i < 24; i++) {
       

if (0 === i % 6 )
{
    x = 105;
    y += 90;
    
}
else
{
  x+= 90;  
  
}

loopImages[i] = new createjs.Bitmap(queue.getResult(arrayKeys[i]));
loopImages[i].x = x;
loopImages[i].y = y;
loopImages[i].cursor = "pointer";
stage.addChild(loopImages[i]);
loopImages[i].name = arrayKeys[i];
console.log(arrayKeys[i]);
loopImages[i].addEventListener('click',  bindClick(arrayKeys[i],2));

} 

}

else
{
 console.log("Home: Tag Numbers");
}
}
}



}

function allInfo(num)
{
    
 var a;
 if (num === 1)
 {
     a = ["zGo","zGy","zSn","zRz", "zNl","zNa","zSV", "zCi", "zRe", "zJe","zBr","zRi" ,"bKG"];
 }
 
 else if (num === 2)
 {
     a = ["49","50","51","56","57","58","59","70","71","72","73","74","75","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","106","107","108","109","110","111","bge-t","wzKn-t1","rzGu-t1","wzKG-t1","yzNa-t1","zGy-t1","bzKG-t2","bzSV-t1","wzRi-t1","bbKG-t1","wzSn-t1","zPo-t1"];
 }
 
 else if (num === 3)
 {
     a = ["zGu","zPo", "zKG", "zYa", "zKn", "zCu", "zTn", "zYe", "zKk"];
 }
 
 else if (num === 4)
 {
     a = ["1","2","3","4","5","6","7","8","9","31","32","34","36","37","38","42","43","45","46","47","48","52","53","54","58","59","60","61","62","63","64","65","66","67","68","69","rzGu-t1","wzKG-t1","wzKn-t1","bge-t"];
 }
 
 
    return a;
}
function shopOpen()
{

    stage.removeAllChildren();
         stage.removeAllEventListeners();
         var backgroundImage1 = new createjs.Bitmap(queue.getResult("shop"));
backgroundImage1.x = 0;
backgroundImage1.y = 0;
stage.addChild(backgroundImage1);


var currentbanner = new createjs.Bitmap(queue.getResult("shopbanner1"));
currentbanner.x = 225;
currentbanner.y = 150;
stage.addChild(currentbanner);

var shop_money = new createjs.Text(user.money, "48px OB", "white");
    shop_money.x = 515;
    shop_money.y = 175;
    shop_money.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 4, 3);
    shop_money.textBaseline = "alphabetic";
    stage.addChild(shop_money);


var button1 = new createjs.Shape();
button1.graphics.beginFill("#000").rect(230, 35, 125, 40);
button1.alpha = 0.01;
button1.cursor = "pointer";
stage.addChild(button1);
button1.addEventListener("click",mainMenu);

var button2 = new createjs.Shape();
button2.graphics.beginFill("#000").rect(370, 35, 145, 40);
button2.alpha = 0.01;
button2.cursor = "pointer";
stage.addChild(button2);
button2.addEventListener('click', function(){loading(2)});

var button3 = new createjs.Shape();
button3.graphics.beginFill("#000").rect(525, 35, 155, 40);
button3.alpha = 0.01;
button3.cursor = "pointer";
stage.addChild(button3);
button3.addEventListener('click', function(){loading(3)});

var button4 = new createjs.Shape();
button4.graphics.beginFill("#000").rect(690, 35, 115, 40);
button4.alpha = 0.01;
button4.cursor = "pointer";
stage.addChild(button4);
button4.addEventListener('click', function(){loading(4)});

var button5 = new createjs.Shape();
button5.graphics.beginFill("#000").rect(820, 35, 150, 40);
button5.alpha = 0.01;
button5.cursor = "pointer";
stage.addChild(button5);
button5.addEventListener('click', function(){loading(7)});

var itemHold = new createjs.Shape();
itemHold.graphics.beginFill("#000").rect(220, 100, 85, 85);
itemHold.alpha = 0.01;
itemHold.cursor = "pointer";
stage.addChild(itemHold);
itemHold.addEventListener("click",shopItems);


var shop_roll1 = new createjs.Shape();
shop_roll1.graphics.beginFill("#000").rect(320, 530, 240, 58);
shop_roll1.alpha = 0.01;
shop_roll1.cursor = "pointer";
shop_roll1.addEventListener("click",function(){shopconfirm(1);});
stage.addChild(shop_roll1);

var shop_roll2 = new createjs.Shape();
shop_roll2.graphics.beginFill("#000").rect(320, 600, 240, 58);
shop_roll2.alpha = 0.01;
shop_roll2.cursor = "pointer";
shop_roll2.addEventListener("click",function(){shopconfirm(2);});
stage.addChild(shop_roll2);

var shop_roll3 = new createjs.Shape();
shop_roll3.graphics.beginFill("#000").rect(620, 530, 240, 58);
shop_roll3.alpha = 0.01;
shop_roll3.cursor = "pointer";
shop_roll3.addEventListener("click",function(){shopconfirm(3);});
stage.addChild(shop_roll3);

var shop_roll4 = new createjs.Shape();
shop_roll4.graphics.beginFill("#000").rect(620, 600, 240, 58);
shop_roll4.alpha = 0.01;
shop_roll4.cursor = "pointer";
shop_roll4.addEventListener("click",function(){shopconfirm(4);});
stage.addChild(shop_roll4);

var arrowleft = new createjs.Shape();
arrowleft.graphics.beginFill("#000").rect(140, 320, 100, 110);
arrowleft.alpha = 0.01;
arrowleft.cursor = "pointer";
arrowleft.addEventListener('click', function(){arrowButton(1)});
stage.addChild(arrowleft);

var arrowright = new createjs.Shape();
arrowright.graphics.beginFill("#000").rect(950, 320, 100, 100);
arrowright.alpha = 0.01;
arrowright.cursor = "pointer";
arrowright.addEventListener('click', function(){arrowButton(2)});
stage.addChild(arrowright);

var backgroundcover = new createjs.Shape();
backgroundcover.graphics.beginFill("white").rect(0, 0, 1200, 720);
backgroundcover.alpha = 0.01;
backgroundcover.cursor = "no-drop"


var result1,result2,result3,result4,result5;

var result1 = new createjs.Bitmap("");
result1.x = 345;
result1.y = 325;

var result2 = new createjs.Bitmap("");
result2.x = 445;
result2.y = 325;

var result3 = new createjs.Bitmap("");
result3.x = 545;
result3.y = 325;

var result4 = new createjs.Bitmap("");
result4.x = 645;
result4.y = 325;

var result5 = new createjs.Bitmap("");
result5.x = 745;
result5.y = 325;

 var data = {
    images: [queue.getResult('cloud')],
    frames: {width:356, height:200},

    animations: {
       run:[1,33,false],
       //run:[1,33],
        speed: 0.1,
        
    }
};
 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
  animation.x = 0;
 animation.y = 0;
 animation.scaleX = 3.6;
 animation.scaleY = 3.6;
 

var frame = new createjs.Bitmap(queue.getResult("frame"));
frame.x = 0;
frame.y = 0;
stage.addChild(frame);


var results = new createjs.Bitmap(queue.getResult("results"));
results.x = 280;
results.y = 205;

var reward = new createjs.Bitmap(queue.getResult("reward"));
reward.x = 480;
reward.y = 420;
reward.cursor = "pointer";
reward.addEventListener('click', getReward);

var shopcontrols = [1,1,0];

     
    
function arrowButton(num)
{
     createjs.Sound.play("select", {loop: 0,volume:0.1});
    var bannername = "shopbanner";
   
     if (num === 1)
    {
      
      if(shopcontrols[0] === 0)
      {
          shopcontrols[0] += 1
      }
      else if (shopcontrols[0] === 1)
      {
          shopcontrols[0] = 0;
      }
      else
      {
          shopcontrols[0] += 1
      }
      
    }
    
    else 
    {
         if(shopcontrols[0] === 0)
      {
          shopcontrols[0] = 1
      }
      else if (shopcontrols[0] === 1)
      {
          shopcontrols[0] = 0;
      }
      else
      {
          shopcontrols[0] -= 1
      }
        
        
    }
    
  
    
   bannername = bannername + "" + shopcontrols[0];
   currentbanner.image = queue.getResult(bannername);
}

function getReward()
{
    createjs.Sound.play("select", {loop: 0,volume:0.1});
    stage.removeChild(results);
    stage.removeChild(animation);
    stage.removeChild(backgroundcover);
    stage.removeChild(result1);
    stage.removeChild(result2);
    stage.removeChild(result3);
    stage.removeChild(result4);
    stage.removeChild(result5);
    stage.removeChild(reward);
}

function shopItems()
{
    $("#itemList").modal("show");
}


function shopconfirm(a)
{
    stage.removeChild(backgroundcover);
    stage.removeChild(animation);
    stage.removeChild(results);
  if (user.money >= 3000 && a === 1)
  {
    stage.addChild(backgroundcover);
  animation = new createjs.Sprite(spriteSheet, "run");
  animation.x = 0;
 animation.y = 0;
 animation.scaleX = 3.6;
 animation.scaleY = 3.6;
  stage.addChild(animation);
  
  setTimeout(function() {backgroundcover.alpha = 1
  createjs.Tween.get(backgroundcover, {loop: false})    
  .to({ alpha: 0.01}, 1000, createjs.Ease.linear)
  
  
  
  stage.addChild(results);
  user.money = server.money;
  shop_money.text = user.money;
  result1.image = queue.getResult(server.got);
  result1.alpha = 0;
  reward.alpha = 0;
  stage.addChild(result1);
  stage.addChild(reward);
  
  createjs.Tween.get(result1, {loop: false})    
  .to({ scaleX: 4,scaleY:4,alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 500, createjs.Ease.quadOut)
   
    
   createjs.Tween.get(reward, {loop: false})    
  .to({ scaleX: 4,scaleY:4,}, 1, createjs.Ease.linear)
  .wait(600)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
   
  }, 2100);
  
  
  var file = { action: "shop", type: shopcontrols[0], id: a};
  ws.send(JSON.stringify(file));   
  }
  else if (user.money >= 12000 && a === 2)
  {
      stage.addChild(backgroundcover);
      animation = new createjs.Sprite(spriteSheet, "run");
  animation.x = 0;
 animation.y = 0;
 animation.scaleX = 3.6;
 animation.scaleY = 3.6;
   stage.addChild(animation);  
   setTimeout(function() {backgroundcover.alpha = 1
  
  createjs.Tween.get(backgroundcover, {loop: false})    
  .to({ alpha: 0.01}, 1000, createjs.Ease.linear)
  
  stage.addChild(results);
  user.money = server.money;
  shop_money.text = user.money;
  server.got = JSON.parse(server.got);

  result1.image = queue.getResult(server.got[0]);
  result2.image = queue.getResult(server.got[1]);
  result3.image = queue.getResult(server.got[2]);
  result4.image = queue.getResult(server.got[3]);
  result5.image = queue.getResult(server.got[4]);
  
  result1.alpha = 0;
  result2.alpha = 0;
  result3.alpha = 0;
  result4.alpha = 0;
  result5.alpha = 0;
  reward.alpha = 0;
  
   createjs.Tween.get(result1, {loop: false})    
  .to({ scaleX: 4,scaleY:4,alpha:1}, 1, createjs.Ease.linear)
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
    createjs.Tween.get(result2, {loop: false})    
  .to({ scaleX: 4,scaleY:4}, 1, createjs.Ease.linear)
  .wait(600)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
    createjs.Tween.get(result3, {loop: false})    
  .to({ scaleX: 4,scaleY:4}, 1, createjs.Ease.linear)
  .wait(1200)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
   createjs.Tween.get(result4, {loop: false})    
  .to({ scaleX: 4,scaleY:4}, 1, createjs.Ease.linear)
  .wait(1800)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
   createjs.Tween.get(result5, {loop: false})    
  .to({ scaleX: 4,scaleY:4,}, 1, createjs.Ease.linear)
  .wait(2400)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   .call(function(){stage.addChild(reward);})
   
    createjs.Tween.get(reward, {loop: false})    
  .to({ scaleX: 4,scaleY:4,}, 1, createjs.Ease.linear)
  .wait(3000)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
   

   
  stage.addChild(result1);
  stage.addChild(result2);
  stage.addChild(result3);
  stage.addChild(result4);
  stage.addChild(result5);
  
  
  
  console.log("result5.image  : " + result5.image);
  console.log("User.money " + user.money);
  }, 2100);
       var file = { action: "shop", type: shopcontrols[0], id: a};
  ws.send(JSON.stringify(file));   
  }
  else if (user.money >= 4000 && a === 3)
  {
       stage.addChild(backgroundcover);
  animation = new createjs.Sprite(spriteSheet, "run");
  animation.x = 0;
 animation.y = 0;
 animation.scaleX = 3.6;
 animation.scaleY = 3.6;
  stage.addChild(animation);
  
  setTimeout(function() {backgroundcover.alpha = 1
  createjs.Tween.get(backgroundcover, {loop: false})    
  .to({ alpha: 0.01,}, 1000, createjs.Ease.linear)
  

  
  
  
  stage.addChild(results);
  user.money = server.money;
  shop_money.text = user.money;
  result1.image = queue.getResult(server.got);
  
  result1.alpha = 0;
  reward.alpha = 0;
  stage.addChild(result1);
  
  createjs.Tween.get(result1, {loop: false})    
  .to({ scaleX: 4,scaleY:4,alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 500, createjs.Ease.linear)
    .call(function(){stage.addChild(reward);})
    
      createjs.Tween.get(reward, {loop: false})    
  .to({ scaleX: 4,scaleY:4,}, 1, createjs.Ease.linear)
  .wait(600)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
  
  
  console.log("User.money " + user.money);
  }, 2100);
  var file = { action: "shop", type: shopcontrols[0], id: a};
  ws.send(JSON.stringify(file));  
  }
  
  else if (user.money >= 16000 && a === 4)
  {
        stage.addChild(backgroundcover);
      animation = new createjs.Sprite(spriteSheet, "run");
  animation.x = 0;
 animation.y = 0;
 animation.scaleX = 3.6;
 animation.scaleY = 3.6;
   stage.addChild(animation);  
   setTimeout(function() {backgroundcover.alpha = 1
  
  createjs.Tween.get(backgroundcover, {loop: false})    
  .to({ alpha: 0.01,
  }, 1000, createjs.Ease.linear)
  
  stage.addChild(results);
  user.money = server.money;
  shop_money.text = user.money;
  server.got = JSON.parse(server.got);
  console.log("server got" + server.got[0]);
  result1.image = queue.getResult(server.got[0]);
  result2.image = queue.getResult(server.got[1]);
  result3.image = queue.getResult(server.got[2]);
  result4.image = queue.getResult(server.got[3]);
  result5.image = queue.getResult(server.got[4]);
  result1.alpha = 0;
  result2.alpha = 0;
  result3.alpha = 0;
  result4.alpha = 0;
  result5.alpha = 0;
  reward.alpha = 0;
  
    createjs.Tween.get(result1, {loop: false})    
  .to({ scaleX: 4,scaleY:4,alpha:1}, 1, createjs.Ease.linear)
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
    createjs.Tween.get(result2, {loop: false})    
  .to({ scaleX: 4,scaleY:4}, 1, createjs.Ease.linear)
  .wait(600)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
    createjs.Tween.get(result3, {loop: false})    
  .to({ scaleX: 4,scaleY:4}, 1, createjs.Ease.linear)
  .wait(1200)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
   createjs.Tween.get(result4, {loop: false})    
  .to({ scaleX: 4,scaleY:4}, 1, createjs.Ease.linear)
  .wait(1800)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
   createjs.Tween.get(result5, {loop: false})    
  .to({ scaleX: 4,scaleY:4,}, 1, createjs.Ease.linear)
  .wait(2400)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
    .call(function(){stage.addChild(reward);})
    
     createjs.Tween.get(reward, {loop: false})    
  .to({ scaleX: 4,scaleY:4,}, 1, createjs.Ease.linear)
  .wait(3000)
  .to({ alpha:1}, 1, createjs.Ease.linear)
  .call(function(){createjs.Sound.play("resultsound", {loop: 0,volume:0.1}); })
   .to({ scaleX: 1,scaleY:1}, 600, createjs.Ease.quadOut)
   
  stage.addChild(result1);
  stage.addChild(result2);
  stage.addChild(result3);
  stage.addChild(result4);
  stage.addChild(result5);
  
  console.log("result5.image  : " + result5.image);
  console.log("User.money " + user.money);
  }, 2100);
  var file = { action: "shop", type: shopcontrols[0], id: a};
  ws.send(JSON.stringify(file));   
  }
  
  stage.setChildIndex( frame, stage.getNumChildren()-1);

  
}

}






function saveteam()
{
     var t_save = '["'+p1stats.c1+'","'+p1stats.c2+'","'+p1stats.c3+'"]';
        var m_save1 = p1stats.cS1;
        var m_save2 = p1stats.cS2;
        var m_save3 = p1stats.cS3;
      var send  = { action: "characters", team:t_save, m1: m_save1 ,m2: m_save2,m3: m_save3};

      ws.send(JSON.stringify(send)); 
      $("#save").modal("show");
}

function itemShow()
{
   $("#items").modal('show');
}

function upgrade()
{
    
    var total = p1stats.statshold[0] + p1stats.statshold[1] + p1stats.statshold[2] + p1stats.statshold[3];
    var length = p1stats.stats.length;
    if (total >= 1 && length < 6)
    {
        var file = { action: "upgrade", c: p1stats.stats, s: p1stats.statshold};
ws.send(JSON.stringify(file)); 
    }
    
}
//Function is for the main game
 function gameLoop() //num
{
 clearInterval(connection);
stage.removeAllChildren();
stage.removeAllEventListeners();


var c = start.y_c_characters;
moo.team = start.o_c_characters;
var p1effects1 = JSON.parse(start.y_c1_effect);
var p1effects2 = JSON.parse(start.y_c2_effect);
var p1effects3 = JSON.parse(start.y_c3_effect);
var p2effects1 = JSON.parse(start.o_c1_effect);
var p2effects2 = JSON.parse(start.o_c2_effect);
var p2effects3 = JSON.parse(start.o_c3_effect);
var skill1 = start.y_c1_skillhold;
var skill2 = start.y_c2_skillhold;
var skill3 = start.y_c3_skillhold;

var p1 = {attacked: false,cooldown: 0, targeted:-1};


var p1character1 = {c: c[0],moveUsed:0, attacked:false, cooldown:start.y_c1_cooldown,skills:skill1, active:false, targeted:-1, order:-1, stunned:start.y_c1_stunned, box: -1, block: start.y_c1_block, effects: p1effects1, current:1,player:true,conditions: start.y_c1_conditions};
var p1character2 ={c: c[1],moveUsed:0, attacked:false, cooldown:start.y_c2_cooldown, skills:skill2, active:false, targeted:-1, order:-1, stunned:start.y_c2_stunned, box: -1,block: start.y_c2_block, effects: p1effects2, current:2,player:true,conditions: start.y_c2_conditions};
var p1character3 ={c: c[2],moveUsed:0, attacked:false, cooldown:start.y_c3_cooldown, skills:skill3, active:false, targeted:-1, order:-1, stunned:start.y_c3_stunned, box: -1,block: start.y_c3_block, effects: p1effects3, current:3,player:true, conditions:start.y_c3_conditions};
var p2character1 = {stunned: start.o_c1_stunned, box: -1, block: start.o_c1_block,effects: p2effects1,conditions: start.o_c1_conditions,current:1,player:false};
var p2character2 ={ stunned: start.o_c2_stunned, box: -1, block: start.o_c2_block,effects: p2effects2,conditions: start.o_c2_conditions,current:2,player:false};
var p2character3 ={ stunned:start.o_c3_stunned, box: -1, block: start.o_c3_block,effects: p2effects3,conditions: start.o_c3_conditions,current:3,player:false};
    var doneNow;
    var desiredW3 = 18;
    
    var shipdata = {
    images: [queue.getResult('ship')],
    frames: {width:200, height:141},
    animations: {
        sit: 0,
        stand:1,
        speed: 0.1,
    }
};




//function turnRight(){animation2.gotoAndStop("stand");}
//function turnLeft(){animation2.gotoAndStop("sit");}


var backgroundImage1 = new createjs.Bitmap(queue.getResult("mainBackground"));
backgroundImage1.x = 0;
backgroundImage1.y = 0;
createjs.Tween.get(backgroundImage1, {loop: true})
          .to({ x: -400, scaleX: 0.8, scaleY:0.8 }, 5000, createjs.Ease.linear) //5
          .to({ x: 0,y:-20}, 5000, createjs.Ease.linear)//10
          .to({ x: -500,y:-50, scaleX: 1.2, scaleY:1.2}, 5000, createjs.Ease.linear)//15
	      .to({ x: -200,y:-120 }, 6000, createjs.Ease.linear)//20
	      .to({ x: -300}, 5000, createjs.Ease.linear)//25
          .to({ x: -450, scaleX: 1.1, scaleY:1.1}, 2000, createjs.Ease.linear) //27
          .to({ x: -250}, 2000, createjs.Ease.linear) //30
          .to({ x: -30,y:-10}, 2000, createjs.Ease.linear)//35
          .to({ x: -500 ,y:-90}, 3000, createjs.Ease.linear)//35
          .to({ x: -10, scaleX: 1.0, scaleY:1.0  }, 4000, createjs.Ease.linear)//40
	      .to({ x: -400  }, 3000, createjs.Ease.linear)//40
	      .to({ x: 0,y:-70}, 5000, createjs.Ease.linear)
	      .to({ x: -300 ,y:-60}, 5000, createjs.Ease.linear)
          .to({ x: -500, scaleX: 1.2, scaleY:1.2}, 5000, createjs.Ease.linear)
          .to({ x: 0 ,y:-100}, 5000, createjs.Ease.linear)
	      .to({ x: 0, scaleX: 0.8, scaleY:0.8  }, 5000, createjs.Ease.linear);
	      
    stage.addChild(backgroundImage1);
    var movey = 300;
    


   var hits = {
    images: [queue.getResult('hits')],
    frames: {width:216, height:169},
    animations: {
        run:[0,27],
        speed:0.01,
      
    }
};

console.log("Fail");
 var hitanimation = new createjs.SpriteSheet(hits);
 var fighting = new createjs.Sprite(hitanimation, "run");
 fighting.x = 20;
 fighting.y= 400;

   stage.addChild(fighting);
   createjs.Tween.get(fighting, {loop: true})
          .to({ x: 20,y:250, scaleX: 2.8, scaleY:2.8 }, 1500, createjs.Ease.linear) //5
          .to({ x: 670,y:20}, 1, createjs.Ease.linear)//10
          .wait(2000)
          .to({ x: 110 ,y:230, scaleX: 2.2, scaleY:2.2}, 1, createjs.Ease.linear)//15
          .wait(2000)
          .to({ x: 650 ,y:150, scaleX: 2.8, scaleY:2.8}, 1, createjs.Ease.linear)//15
          .wait(2400)
          .to({ x: 50 ,y:30, scaleX: 2.6, scaleY:2.8}, 1, createjs.Ease.linear)//15
          .wait(2200)
          .to({ x: 30 ,y:230, scaleX: 2.8, scaleY:2.8}, 1, createjs.Ease.linear)//15
          //.to({ x: 280 ,y:250, scaleX: 2.6, scaleY:2.6}, 2000, createjs.Ease.linear)//15
	     

var secondBackground = new createjs.Bitmap(queue.getResult("battlescreen"));
secondBackground.x = 0;
secondBackground.y = 0;
stage.addChild(secondBackground );

var player1hold = new createjs.Bitmap(queue.getResult("player2hold"));
player1hold.x = 0;
player1hold.y = 500;
stage.addChild(player1hold);

var player2hold = new createjs.Bitmap(queue.getResult("player2hold"));
player2hold.x = 0;
player2hold.y = 70;
stage.addChild(player2hold);

// User avatars.
var player1avater = new createjs.Bitmap(user.avater);
    player1avater.x = 548;
    player1avater.y = 335;
    player1avater.hitArea = hitArea6;
    player1avater.cursor = "pointer";
    stage.addChild(player1avater);
    player1avater.addEventListener("click",function() {avatershow(1); });
     
var player1avaterHold = new createjs.Bitmap(queue.getResult("avatarHold"));
    player1avaterHold.x = 548;
    player1avaterHold.y = 335;
    stage.addChild(player1avaterHold);
    
var player2avater = new createjs.Bitmap(moo.avater);
    player2avater.x = 548;
    player2avater.y = 191;
    player2avater.hitArea = hitArea6;
    player2avater.cursor = "pointer";
    stage.addChild(player2avater); 
    player2avater.addEventListener("click",function() {avatershow(2); });
    
var player2avaterHold = new createjs.Bitmap(queue.getResult("avatarHold"));
    player2avaterHold.x = 548;
    player2avaterHold.y = 191;
    stage.addChild(player2avaterHold);
     
// Text for character/item descriptions.
var descriptionText1 = new createjs.Text("", "15px OB", "white");
descriptionText1.shadow = new createjs.Shadow("black", 1, 1, 2);
descriptionText1.textBaseline = "alphabetic";
descriptionText1.x = 52;
descriptionText1.y = 206;
descriptionText1.lineWidth = 465;
descriptionText1.lineHeight = 23;

// Text for characters/items/skills.
var nameText = new createjs.Text("", "22px Aero", "#FFFFFF");
nameText.shadow = new createjs.Shadow("black", 1, 1, 2);
nameText.textBaseline = "alphabetic";
nameText.x = 310;
nameText.y = 355;
nameText.lineWidth = 175;
nameText.lineHeight = 20;

// Text for current effects on a character in the right holder.
var effect_text = new createjs.Text("", "14px Aero", "white");
effect_text.x = 680;
effect_text.y = 320;
effect_text.shadow = new createjs.Shadow("rgba(0,0,0,1)", 1, 1, 2);
effect_text.lineWidth = 390;
effect_text.lineHeight = 20;

// Bp, Energy, Cooldown, Focus and Type descriptions.
var characterInfo;
characterInfo = new createjs.Text("", "15px Aero", "white");
characterInfo.x = 155;
characterInfo.y = 365;
characterInfo.shadow = new createjs.Shadow("rgba(0,0,0,1)", 1, 1, 2);
characterInfo.textBaseline = "alphabetic";

// Character levels.
var p1leveltext1 = new createjs.Text("", "22px Aero", "white");
    p1leveltext1.x = 484;
    p1leveltext1.y = 411;
    p1leveltext1.textBaseline = "alphabetic";

// This area is for all skills/items cooldown holder.
var cooldown1 = new createjs.Bitmap(queue.getResult("cooldownbox"));
cooldown1.x = 45;
cooldown1.y = 474;

var cooldown2 = new createjs.Bitmap(queue.getResult("cooldownbox"));
cooldown2.x = 127;
cooldown2.y = 473;   

var cooldown3 = new createjs.Bitmap(queue.getResult("cooldownbox"));
cooldown3.x = 209.5;
cooldown3.y = 473;   

var cooldown4 = new createjs.Bitmap(queue.getResult("cooldownbox"));
cooldown4.x = 293;
cooldown4.y = 473; 

var cooldown5 = new createjs.Bitmap(queue.getResult("cooldownbox"));
cooldown5.x = 376;
cooldown5.y = 473;  

// Texts for all character cooldowns inside the cooldown holder.
var cooldown1text = new createjs.Text("", "60px Aero", "black");
cooldown1text.x = 65;
cooldown1text.y = 478;

var cooldown2text = new createjs.Text("", "60px Aero", "black");
cooldown2text.x = 148;
cooldown2text.y = 478;

var cooldown3text = new createjs.Text("", "60px Aero", "black");
cooldown3text.x = 236;
cooldown3text.y = 478;

var cooldown4text = new createjs.Text("", "60px Aero", "black");
cooldown4text.x = 312;
cooldown4text.y = 478;

var cooldown5text = new createjs.Text("", "60px Aero", "black");
cooldown5text.x = 401;
cooldown5text.y = 478;

// This is the skill/character/item box that displays on the leftholder.
var effect_box = new createjs.Bitmap();
effect_box.x = 68;
effect_box.y = 352;

var p1C1BoxUsed = [-1,-1,-1,-1,-1];
var p1C2BoxUsed = [-1,-1,-1,-1,-1];
var p1C3BoxUsed = [-1,-1,-1,-1,-1];
var p2C1BoxUsed = [-1,-1,-1,-1,-1];
var p2C2BoxUsed = [-1,-1,-1,-1,-1];
var p2C3BoxUsed = [-1,-1,-1,-1,-1];


//Use this for hitboxes for character and moves
var hitArea6 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,77,77));  
var hitArea7 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,26,26));   
var hitArea8 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,75,75)); 
//Player Two character boxes!

var p1Ch1e = [];
var p1Ch2e = [];
var p1Ch3e = [];
var p2Ch1e = [];
var p2Ch2e = [];
var p2Ch3e = [];

//Player Two character 
//Kill DOg

    
//------------------------------------------------------

//------------------------------------------------

// Player 1 action box.



var player1y = 595; // Changes height of player 1 character avatars.
var player2y = 58; // Changes height of player 2 character avatars.

var y1 = player1y + 3; 
var y2 = y1 + 25;
var y3 = y1 + 50;

// Player 2 action box.
var ty1 = player2y + 3; // Reducing the number moves the images higher. Increase the number moves the image lower.
var ty2 = ty1 + 25;
var ty3 = ty1 + 50;
var count = 1;

var countText = [];


//80
//x  50   y 23
//x +120   y -18
var x = 170;
var y = player1y - 1;
var last;
p1effects1.sort();
p1effects2.sort();
p1effects3.sort();
p2effects1.sort();
p2effects2.sort();
p2effects3.sort();

for (var i = 0, len = p1effects1.length; i < len; i++) {

if (p1effects1[i] === p1effects1[i+1])
{
    count += 1;
}

else if (count > 1) {

p1Ch1e[i] = new createjs.Bitmap(queue.getResult(p1effects1[i]));
p1Ch1e[i].x = x;
p1Ch1e[i].y = y;
p1Ch1e[i].scaleX = p1Ch1e[i].scaleY = desiredW3 / 75;
p1Ch1e[i].hitArea = hitArea8;
stage.addChild(p1Ch1e[i]);


last = countText.length;
countText[last] = new createjs.Text(count, "18px IMPACT", "black");
countText[last].x = x + 5;
countText[last].y = player1y + 15;
countText[last].textBaseline = "alphabetic";
stage.addChild(countText[last]);

x += 25; 
count = 1; 

}
else
{
p1Ch1e[i] = new createjs.Bitmap(queue.getResult(p1effects1[i]));
p1Ch1e[i].x = x;
p1Ch1e[i].y = y;
p1Ch1e[i].scaleX = p1Ch1e[i].scaleY = desiredW3 / 75;
p1Ch1e[i].hitArea = hitArea8;
stage.addChild(p1Ch1e[i]);

x += 25; 
count = 1;
}

}
x = 538;

y = player1y - 1;

for ( i = 0, len = p1effects2.length; i < len; i++) {
 if (p1effects2[i] === p1effects2[i+1])
{
    count += 1;
  
}
else if (count > 1) {
p1Ch2e[i] = new createjs.Bitmap(queue.getResult(p1effects2[i]));
p1Ch2e[i].x = x;
p1Ch2e[i].y = y;
p1Ch2e[i].scaleX = p1Ch2e[i].scaleY = desiredW3 / 75;
p1Ch2e[i].hitArea = hitArea8;
stage.addChild(p1Ch2e[i]);

last = countText.length;
countText[last] = new createjs.Text(count, "18px IMPACT", "black");
countText[last].x = x + 5;
countText[last].y = player1y + 15;
countText[last].textBaseline = "alphabetic";
stage.addChild(countText[last]);


x += 25; 
count = 1; 

}
else
{
p1Ch2e[i] = new createjs.Bitmap(queue.getResult(p1effects2[i]));
p1Ch2e[i].x = x;
p1Ch2e[i].y = y;
p1Ch2e[i].scaleX = p1Ch2e[i].scaleY = desiredW3 / 75;
p1Ch2e[i].hitArea = hitArea8;
stage.addChild(p1Ch2e[i]);

x += 25; 
count = 1;
}

}
x = 906;

y = player1y - 1;

for (i = 0, len = p1effects3.length; i < len; i++) {

if (p1effects3[i] === p1effects3[i+1])
{
    count += 1;
}
else if (count > 1) {
p1Ch3e[i] = new createjs.Bitmap(queue.getResult(p1effects3[i]));
p1Ch3e[i].x = x;
p1Ch3e[i].y = y;
p1Ch3e[i].scaleX = p1Ch3e[i].scaleY = desiredW3 / 75;
p1Ch3e[i].hitArea = hitArea8;
stage.addChild(p1Ch3e[i]);

last = countText.length;
countText[last] = new createjs.Text(count, "18px IMPACT", "black");
countText[last].x = x + 5;
countText[last].y = player1y + 15;
countText[last].textBaseline = "alphabetic";
stage.addChild(countText[last]);


x += 25; 
count = 1;   

}
else
{
p1Ch3e[i] = new createjs.Bitmap(queue.getResult(p1effects3[i]));
p1Ch3e[i].x = x;
p1Ch3e[i].y = y;
p1Ch3e[i].scaleX = p1Ch3e[i].scaleY = desiredW3 / 75;
p1Ch3e[i].hitArea = hitArea8;
stage.addChild(p1Ch3e[i]);

x += 25; 
count = 1;
}

}
x = 170;
y = player2y - 1;


for (var i = 0, len = p2effects1.length; i < len; i++) {
if (p2effects1[i] === p2effects1[i+1])
{
    count += 1;
 
}
else if (count > 1) {
p2Ch1e[i] = new createjs.Bitmap(queue.getResult(p2effects1[i]));
p2Ch1e[i].x = x;
p2Ch1e[i].y = y;
p2Ch1e[i].scaleX = p2Ch1e[i].scaleY = desiredW3 / 75;
p2Ch1e[i].hitArea = hitArea8;
stage.addChild(p2Ch1e[i]);

countText[last] = new createjs.Text(count, "18px IMPACT", "black");
countText[last].x = x + 5;
countText[last].y = player2y + 15;
countText[last].textBaseline = "alphabetic";
stage.addChild(countText[last]);

x += 25; 
count = 1;    
}
else
{
p2Ch1e[i] = new createjs.Bitmap(queue.getResult(p2effects1[i]));
p2Ch1e[i].x = x;
p2Ch1e[i].y = y;
p2Ch1e[i].scaleX = p2Ch1e[i].scaleY = desiredW3 / 75;
p2Ch1e[i].hitArea = hitArea8;
stage.addChild(p2Ch1e[i]);

x += 25; 
count = 1;
}

}
x =538;
y = player2y - 1;


for (i = 0, len = p2effects2.length; i < len; i++) {
 if (p2effects2[i] === p2effects2[i+1])
{
    count += 1;
  
}
else if (count > 0) {
p2Ch2e[i] = new createjs.Bitmap(queue.getResult(p2effects2[i]));
p2Ch2e[i].x = x;
p2Ch2e[i].y = y;
p2Ch2e[i].scaleX = p2Ch2e[i].scaleY = desiredW3 / 75;
p2Ch2e[i].hitArea = hitArea8;
stage.addChild(p2Ch2e[i]);

countText[last] = new createjs.Text(count, "18px IMPACT", "black");
countText[last].x = x + 5;
countText[last].y = player2y + 15;
countText[last].textBaseline = "alphabetic";
stage.addChild(countText[last]);


x += 25; 
count = 1;    
}
else
{
p2Ch2e[i] = new createjs.Bitmap(queue.getResult(p2effects2[i]));
p2Ch2e[i].x = x;
p2Ch2e[i].y = y;
p2Ch2e[i].scaleX = p2Ch2e[i].scaleY = desiredW3 / 75;
p2Ch2e[i].hitArea = hitArea8;
stage.addChild(p2Ch2e[i]);

x += 25; 
count = 0;
}

}
x =906;
y = player2y - 1;


for (i = 0, len = p2effects3.length; i < len; i++) {
if (p2effects3[i] === p2effects3[i+1])
{
    count += 1;
}
else if (count > 0) {
p2Ch3e[i] = new createjs.Bitmap(queue.getResult(p2effects3[i]));
p2Ch3e[i].x = x;
p2Ch3e[i].y = y;
p2Ch3e[i].scaleX = p2Ch3e[i].scaleY = desiredW3 / 75;
p2Ch3e[i].hitArea = hitArea8;
stage.addChild(p2Ch3e[i]);

countText[last] = new createjs.Text(count, "18px IMPACT", "black");
countText[last].x = x + 5;
countText[last].y = player2y + 15;
countText[last].textBaseline = "alphabetic";
stage.addChild(countText[last]);

x += 25; 
count = 1;    
}
else
{
p2Ch3e[i] = new createjs.Bitmap(queue.getResult(p2effects3[i]));
p2Ch3e[i].x = x;
p2Ch3e[i].y = y;
p2Ch3e[i].scaleX = p2Ch3e[i].scaleY = desiredW3 / 75;
p2Ch3e[i].hitArea = hitArea8;
stage.addChild(p2Ch3e[i]);

x += 25; 
count = 0;
}
}

var in_endhold = new createjs.Bitmap(queue.getResult("endturnHold"));
in_endhold.x = 305;
in_endhold.y = 190;

var box = new createjs.Bitmap(queue.getResult("endturnpic"));
box.x = 385;
box.y = 132;

//Player 2 boxes 3

//Yolo
var sortSkill1;          
var sortSkill2;  
var sortSkill3;

var cD;


var p1c1,p1c2,p1c3,p2c1,p2c2,p2c3;

p1c1 = p1character1.c;
p1c2 = p1character2.c;
p1c3 = p1character3.c;


var box1 = player1y + 50;
var box2 = player2y + 50;

//Character Boxes ^

//Moves Boxes
var skills1 = new createjs.Bitmap();
    skills1.x = 44;
    skills1.y = 473;
    skills1.hitArea = hitArea6;
    skills1.cursor = "pointer";
    stage.addChild(skills1);

var  skills2 = new createjs.Bitmap();
    skills2.x = 127;
    skills2.y = 473;
    skills2.hitArea = hitArea6;
    skills2.cursor = "pointer";
    stage.addChild(skills2);  

var skills3 = new createjs.Bitmap();
    skills3.x = 210;
    skills3.y = 473;
    skills3.hitArea = hitArea6;
    skills3.cursor = "pointer";
    stage.addChild(skills3);   


var skills4 = new createjs.Bitmap();
    skills4.x = 293;
    skills4.y = 473;
    skills4.hitArea = hitArea6;
    skills4.cursor = "pointer";
    stage.addChild(skills4);   
    
var skills5 = new createjs.Bitmap();
    skills5.x = 376;
    skills5.y = 473;
    skills5.hitArea = hitArea6;
    skills5.cursor = "pointer";
    stage.addChild(skills5);   

//Skill selected variables Cost
    var bpNow = 1;
    var cooldownNow;
    var energy;
    var focus;
    var target;
    var stype;

//Time Stuff

var gameTime = 2000;
var timerText;


//Name of moves
    var name;

//Current Move
    var moveNow = 0;

    //HealthBar
    var player1HP = [];
    var player1MP = [];
    var player2HP = [];
    var player2MP = [];
    
var p1Ch1boxes = [];
var p1Ch2boxes = [];
var p1Ch3boxes = [];
var p2Ch1boxes = [];
var p2Ch2boxes = [];
var p2Ch3boxes = [];

//Player Two character 
//p1effects1

desiredW3 = 25;

p1Ch1boxes[0] = new createjs.Bitmap();
p1Ch1boxes[0].x = 36;
p1Ch1boxes[0].y = y1;
p1Ch1boxes[0].scaleX = p1Ch1boxes[0].scaleY = desiredW3 / 75;
p1Ch1boxes[0].hitArea = hitArea6;
p1Ch1boxes[0].cursor= "pointer";

p1Ch1boxes[1] = new createjs.Bitmap();
p1Ch1boxes[1].x = 36;
p1Ch1boxes[1].y = y2;
p1Ch1boxes[1].scaleX = p1Ch1boxes[1].scaleY = desiredW3 / 75;
p1Ch1boxes[1].hitArea = hitArea6;
p1Ch1boxes[1].cursor= "pointer";

p1Ch1boxes[2] = new createjs.Bitmap();
p1Ch1boxes[2].x = 36;
p1Ch1boxes[2].y = y3;
p1Ch1boxes[2].scaleX = p1Ch1boxes[2].scaleY = desiredW3 / 75;
p1Ch1boxes[2].hitArea = hitArea6;
p1Ch1boxes[2].cursor= "pointer";
    
p1Ch2boxes[0] = new createjs.Bitmap();
p1Ch2boxes[0].x = 404;
p1Ch2boxes[0].y = y1;
p1Ch2boxes[0].scaleX = p1Ch2boxes[0].scaleY = desiredW3 / 75;
p1Ch2boxes[0].hitArea = hitArea6;
p1Ch2boxes[0].cursor= "pointer";

p1Ch2boxes[1] = new createjs.Bitmap();
p1Ch2boxes[1].x = 404;
p1Ch2boxes[1].y = y2;
p1Ch2boxes[1].scaleX = p1Ch2boxes[1].scaleY = desiredW3 / 75;
p1Ch2boxes[1].hitArea = hitArea6;
p1Ch2boxes[1].cursor= "pointer";

p1Ch2boxes[2] = new createjs.Bitmap();
p1Ch2boxes[2].x = 404;
p1Ch2boxes[2].y = y3;
p1Ch2boxes[2].scaleX = p1Ch2boxes[2].scaleY = desiredW3 / 75;
p1Ch2boxes[2].hitArea = hitArea6;
p1Ch2boxes[2].cursor= "pointer";

p1Ch3boxes[0] = new createjs.Bitmap();
p1Ch3boxes[0].x = 773.5;
p1Ch3boxes[0].y = y1;
p1Ch3boxes[0].scaleX = p1Ch3boxes[0].scaleY = desiredW3 / 75;
p1Ch3boxes[0].hitArea = hitArea6;
p1Ch3boxes[0].cursor= "pointer";

p1Ch3boxes[1] = new createjs.Bitmap();
p1Ch3boxes[1].x = 773.5;
p1Ch3boxes[1].y = y2;
p1Ch3boxes[1].scaleX = p1Ch3boxes[1].scaleY = desiredW3 / 75;
p1Ch3boxes[1].hitArea = hitArea6;
p1Ch3boxes[1].cursor= "pointer";

p1Ch3boxes[2] = new createjs.Bitmap();
p1Ch3boxes[2].x = 773.5;
p1Ch3boxes[2].y = y3;
p1Ch3boxes[2].scaleX = p1Ch3boxes[2].scaleY = desiredW3 / 75;
p1Ch3boxes[2].hitArea = hitArea6;
p1Ch3boxes[2].cursor= "pointer";

p2Ch1boxes[0] = new createjs.Bitmap();
p2Ch1boxes[0].x = 36;
p2Ch1boxes[0].y = ty1;
p2Ch1boxes[0].scaleX = p2Ch1boxes[0].scaleY = desiredW3 / 75;
p2Ch1boxes[0].hitArea = hitArea6;
p2Ch1boxes[0].cursor= "pointer";

p2Ch1boxes[1] = new createjs.Bitmap();
p2Ch1boxes[1].x = 36;
p2Ch1boxes[1].y = ty2;
p2Ch1boxes[1].scaleX = p2Ch1boxes[1].scaleY = desiredW3 /75;
p2Ch1boxes[1].hitArea = hitArea6;
p2Ch1boxes[1].cursor= "pointer";

p2Ch1boxes[2] = new createjs.Bitmap();
p2Ch1boxes[2].x = 36;
p2Ch1boxes[2].y = ty3;
p2Ch1boxes[2].scaleX = p2Ch1boxes[2].scaleY = desiredW3 / 75;
p2Ch1boxes[2].hitArea = hitArea6;
p2Ch1boxes[2].cursor= "pointer";

p2Ch2boxes[0] = new createjs.Bitmap();
p2Ch2boxes[0].x = 404;
p2Ch2boxes[0].y = ty1;
p2Ch2boxes[0].scaleX = p2Ch2boxes[0].scaleY = desiredW3 / 75;
p2Ch2boxes[0].hitArea = hitArea6;
p2Ch2boxes[0].cursor= "pointer";

p2Ch2boxes[1] = new createjs.Bitmap();
p2Ch2boxes[1].x = 404;
p2Ch2boxes[1].y = ty2;
p2Ch2boxes[1].scaleX = p2Ch2boxes[1].scaleY = desiredW3 / 75;
p2Ch2boxes[1].hitArea = hitArea6;
p2Ch2boxes[1].cursor= "pointer";

p2Ch2boxes[2] = new createjs.Bitmap();
p2Ch2boxes[2].x = 404;
p2Ch2boxes[2].y = ty3;
p2Ch2boxes[2].scaleX = p2Ch2boxes[2].scaleY = desiredW3 / 75;
p2Ch2boxes[2].hitArea = hitArea6;
p2Ch2boxes[2].cursor= "pointer";

p2Ch3boxes[0] = new createjs.Bitmap();
p2Ch3boxes[0].x = 773.5;
p2Ch3boxes[0].y = ty1;
p2Ch3boxes[0].scaleX = p2Ch3boxes[0].scaleY = desiredW3 / 75;
p2Ch3boxes[0].hitArea = hitArea6;
p2Ch3boxes[0].cursor= "pointer";

p2Ch3boxes[1] = new createjs.Bitmap();
p2Ch3boxes[1].x = 773.5;
p2Ch3boxes[1].y = ty2;
p2Ch3boxes[1].scaleX = p2Ch3boxes[1].scaleY = desiredW3 / 75;
p2Ch3boxes[1].hitArea = hitArea6;
p2Ch3boxes[1].cursor= "pointer";

p2Ch3boxes[2] = new createjs.Bitmap();
p2Ch3boxes[2].x = 773.5;
p2Ch3boxes[2].y = ty3;
p2Ch3boxes[2].scaleX = p2Ch3boxes[2].scaleY = desiredW3 / 75;
p2Ch3boxes[2].hitArea = hitArea6;
p2Ch3boxes[2].cursor= "pointer";

p1boxes = new createjs.Bitmap(queue.getResult("green"));
p1boxes.x = 725;
p1boxes.y = y3;
p1boxes.scaleX = p1boxes.scaleY = 40 / 75;
p1boxes.hitArea = hitArea6;
p1boxes.cursor= "pointer";
p1boxes.addEventListener("click",itemCancel);


    
    var h1 = player1y;
    var h2 = player2y;
    var background;
    var player1bar = [];
    
    //HealthBar
    player1HP[0] = new createjs.Bitmap(queue.getResult("healthbarhold"));
    player1HP[0].x = 167;
    player1HP[0].y = 613;
    stage.addChild(player1HP[0]);

    player1HP[1] = new createjs.Bitmap(queue.getResult("healthbarhold"));
    player1HP[1].x = 535;
    player1HP[1].y = 613;
    stage.addChild(player1HP[1]);
    
    
    player1HP[2] = new createjs.Bitmap(queue.getResult("healthbarhold"));
    player1HP[2].x = 903;
    player1HP[2].y = 613;
    stage.addChild(player1HP[2]);
    
    
    player1HP[3] = new createjs.Shape();
    player1bar[0] = player1HP[3].graphics.beginLinearGradientFill(["#7CD680","#10A800"], [0, 1],0, 20, 0, 120).drawRoundRect(197.2, h1+23,phealth1[0]/start.y_c1_max[0]*181, 13.5,3.85).command;
    stage.addChild(player1HP[3]);
   

    player1HP[4] = new createjs.Shape();
    stage.addChild(player1HP[4]);
    player1bar[1] = player1HP[4].graphics.beginLinearGradientFill(["#7CD680","#10A800"], [0, 1], 0, 20, 0, 120).drawRoundRect(565.2, h1+23, phealth1[1]/start.y_c2_max[0]*181, 13.5,3.85).command;
    

    
    player1HP[5] = new createjs.Shape();
    stage.addChild(player1HP[5]);
    player1bar[2] = player1HP[5].graphics.beginLinearGradientFill(["#7CD680","#10A800"], [0, 1], 0, 20, 0, 120).drawRoundRect(933, h1+23, phealth1[2]/start.y_c3_max[0]*181, 13.5,3.85).command;
   


    var m1 = player1y + 40;
    var m2 = player2y + 40;
    
    //EnergyBar
    player1MP[0] = new createjs.Bitmap(queue.getResult("energybarhold"));
    player1MP[0].x = 168;
    player1MP[0].y = 639;
    stage.addChild(player1MP[0]);
    
    player1MP[1] = new createjs.Bitmap(queue.getResult("energybarhold"));
    player1MP[1].x = 536;
    player1MP[1].y = 639;
    stage.addChild(player1MP[1]);
    
    player1MP[2] = new createjs.Bitmap(queue.getResult("energybarhold"));
    player1MP[2].x = 904;
    player1MP[2].y = 639;
    stage.addChild(player1MP[2]);
  

    player1MP[3] = new createjs.Shape();
    stage.addChild(player1MP[3]);
    player1bar[3] = player1MP[3].graphics.beginLinearGradientFill(["#258CD1","#29b8e5"], [0, 1], 122.2, 22.9, 122.2, 3.9).drawRoundRect(197.2, m1+8.5,penergy1[0]/start.y_c1_max[1]*181, 13.5,3.85).command;
    createjs.Tween.get(player1bar[3], {loop: false})
          .wait(1000)
	      .to({w:start.y_c1_energy/start.y_c1_max[1]*181}, 2000);


    player1MP[4] = new createjs.Shape();
    stage.addChild(player1MP[4]);
    player1bar[4] = player1MP[4].graphics.beginLinearGradientFill(["#258CD1","#29b8e5"], [0, 1], 122.2, 22.9, 122.2, 3.9).drawRoundRect(565, m1+8.5,penergy1[1]/start.y_c2_max[1]*181, 13.5,3.85).command;
    createjs.Tween.get(player1bar[4], {loop: false})
          .wait(1000)
	      .to({w:start.y_c2_energy/start.y_c2_max[1]*181}, 2000);
    
    
    player1MP[5] = new createjs.Shape();
    stage.addChild(player1MP[5]);
    player1bar[5] = player1MP[5].graphics.beginLinearGradientFill(["#258CD1","#29b8e5"], [0, 1], 122.2, 22.9, 122.2, 3.9).drawRoundRect(932.8, m1+8.5,penergy1[2]/start.y_c3_max[1]*181, 13.5,3.85).command;
    createjs.Tween.get(player1bar[5], {loop: false})
          .wait(1000)
	      .to({w:start.y_c3_energy/start.y_c3_max[1]*181}, 2000);
    

     //HealthBar  (150, 49, 20, 20);
    var player2bar = [];
    
    player2HP[0] = new createjs.Bitmap(queue.getResult("healthbarhold"));
    player2HP[0].x = 168;
    player2HP[0].y = 76;
    stage.addChild(player2HP[0]);

    player2HP[1] = new createjs.Bitmap(queue.getResult("healthbarhold"));
    player2HP[1].x = 536;
    player2HP[1].y = 76;
    stage.addChild(player2HP[1]);
    
    
    player2HP[2] = new createjs.Bitmap(queue.getResult("healthbarhold"));
    player2HP[2].x = 904;
    player2HP[2].y = 76;
    stage.addChild(player2HP[2]);
    
    //HealthBar  (150, 49, 20, 20);
    player2HP[3] = new createjs.Shape();
    stage.addChild(player2HP[3]);
    player2bar[0] = player2HP[3].graphics.beginLinearGradientFill(["#7CD680","#10A800"], [0, 1], 0, 20, 0, 120).drawRoundRect(197.9, h2+23,phealth2[0]/start.o_c1_max[0]*181, 13.5,3.85).command;
    
    
    player2HP[4] = new createjs.Shape();
    stage.addChild(player2HP[4]);
    player2bar[1] = player2HP[4].graphics.beginLinearGradientFill(["#7CD680","#10A800"], [0, 1], 0, 20, 0, 120).drawRoundRect(565.8, h2+23, phealth2[1]/start.o_c2_max[0]*181, 13.5,3.85).command;
    
   
    player2HP[5] = new createjs.Shape();
    stage.addChild(player2HP[5]);
    player2bar[2] = player2HP[5].graphics.beginLinearGradientFill(["#7CD680","#10A800"], [0, 1], 0, 20, 0, 120).drawRoundRect(933.7, h2+23, phealth2[2]/start.o_c3_max[0]*181, 13.5,3.85).command;
   
    
    
    //start.o_c3_health*.68
     //EnergyBar

    player2MP[0] = new createjs.Bitmap(queue.getResult("energybarhold"));
    player2MP[0].x = 168;
    player2MP[0].y = 102;
    stage.addChild(player2MP[0]);
    
    player2MP[1] = new createjs.Bitmap(queue.getResult("energybarhold"));
    player2MP[1].x = 536;
    player2MP[1].y = 102;
    stage.addChild(player2MP[1]);
    
    player2MP[2] = new createjs.Bitmap(queue.getResult("energybarhold"));
    player2MP[2].x = 904;
    player2MP[2].y = 102;
    stage.addChild(player2MP[2]);
    
         //EnergyBar
    player2MP[3] = new createjs.Shape();
    stage.addChild(player2MP[3]);
    player2bar[3] = player2MP[3].graphics.beginLinearGradientFill(["#258CD1","#29b8e5"], [0, 1], 122.2, 22.9, 122.2, 3.9).drawRoundRect(197.5, m2+9,penergy2[0]/start.o_c1_max[1]*181, 13.5,3.85).command;
    createjs.Tween.get(player2bar[3], {loop: false})
          .wait(1000)
	      .to({w:start.o_c1_energy/start.o_c1_max[1]*181}, 2000);

    
    player2MP[4] = new createjs.Shape();
    stage.addChild(player2MP[4]);
    player2bar[4] = player2MP[4].graphics.beginLinearGradientFill(["#258CD1","#29b8e5"], [0, 1], 122.2, 22.9, 122.2, 3.9).drawRoundRect(565.3,m2+9,penergy2[1]/start.o_c2_max[1]*181, 13.5,3.85).command;
    createjs.Tween.get(player2bar[4], {loop: false})
          .wait(1000)
	      .to({w:start.o_c2_energy/start.o_c2_max[1]*181}, 2000);
    
    
    player2MP[5] = new createjs.Shape();
    stage.addChild(player2MP[5]);
    player2bar[5] = player2MP[5].graphics.beginLinearGradientFill(["#258CD1","#29b8e5"], [0, 1], 122.2, 22.9, 122.2, 3.9).drawRoundRect(933.1, m2+9,penergy2[2]/start.o_c3_max[1]*181, 13.5,3.85).command;
   createjs.Tween.get(player2bar[5], {loop: false})
       .wait(1000)
	   .to({w:start.o_c3_energy/start.o_c3_max[1]*181}, 2000);
    
    var p1t = player1y + 34;
    var p2t = player2y + 34;
    var p1t2 = player1y + 60;
    var p2t2 = player2y + 60;
    //Player 1 HealthBar HP1 Text
    //+ 
var Player1TextHealth1 = new createjs.Text(start.y_c1_health + "/"+start.y_c1_max[0], "12px Aero", "white");
    Player1TextHealth1.x = 265;
    Player1TextHealth1.y = p1t;
    Player1TextHealth1.shadow = new createjs.Shadow("rgba(0,0,0,1), 2, 2, 1");
    Player1TextHealth1.textBaseline = "alphabetic";
    stage.addChild(Player1TextHealth1);

    //Player 1 HealthBar HP2 Text
  var  Player1TextHealth2 = new createjs.Text( start.y_c2_health + "/"+start.y_c2_max[0], "12px Aero", "white");
    Player1TextHealth2.x = 634;
    Player1TextHealth2.y = p1t;
    Player1TextHealth2.textBaseline = "alphabetic";
    Player1TextHealth2.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player1TextHealth2);
    //+2
    
    
    //Player 1 HealthBar HP3 Text
  var  Player1TextHealth3 = new createjs.Text( start.y_c3_health + "/"+start.y_c3_max[0], "12px Aero", "white");
    Player1TextHealth3.x = 1003;
    Player1TextHealth3.y = p1t;
    Player1TextHealth3.textBaseline = "alphabetic";
    Player1TextHealth3.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player1TextHealth3);
    
    //Player 1  Energy  Text
  var  Player1TextEnergy1 = new createjs.Text(start.y_c1_energy + "/"+start.y_c1_max[1], "12px Aero", "white");
    Player1TextEnergy1.x = 265;
    Player1TextEnergy1.y = p1t2;
    Player1TextEnergy1.textBaseline = "alphabetic";
    Player1TextEnergy1.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player1TextEnergy1);

    //Player 1  Energy Text
  var  Player1TextEnergy2 = new createjs.Text(start.y_c2_energy + "/"+start.y_c2_max[1], "12px Aero", "white");
    Player1TextEnergy2.x = 634;
    Player1TextEnergy2.y = p1t2;
    Player1TextEnergy2.textBaseline = "alphabetic";
    Player1TextEnergy2.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player1TextEnergy2);
    
    
    //Player 1 Energy  Text
  var  Player1TextEnergy3 = new createjs.Text(start.y_c3_energy + "/"+start.y_c3_max[1], "12px Aero", "white");
    Player1TextEnergy3.x = 1003;
    Player1TextEnergy3.y = p1t2;
    Player1TextEnergy3.textBaseline = "alphabetic";
    Player1TextEnergy3.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player1TextEnergy3);


  // Player 2 HealthBar HP1 Text
   var Player2TextHealth1 = new createjs.Text( start.o_c1_health + "/"+start.o_c1_max[0], "12px Aero", "white");
    Player2TextHealth1.x = 265;
    Player2TextHealth1.y = p2t;
    Player2TextHealth1.textBaseline = "alphabetic";
    Player2TextHealth1.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player2TextHealth1);

    //Player 2 HealthBar HP2 Text
  var  Player2TextHealth2 = new createjs.Text( start.o_c2_health + "/"+start.o_c2_max[0], "12px Aero", "white");
    Player2TextHealth2.x = 634
    Player2TextHealth2.y = p2t;
    Player2TextHealth2.textBaseline = "alphabetic";
    Player2TextHealth2.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player2TextHealth2);
    
    
    //Player 2 HealthBar HP3 Text
  var  Player2TextHealth3 = new createjs.Text( start.o_c3_health + "/"+start.o_c3_max[0], "12px Aero", "white");
    Player2TextHealth3.x = 1003;
    Player2TextHealth3.y = p2t;
    Player2TextHealth3.textBaseline = "alphabetic";
    Player2TextHealth3.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player2TextHealth3);
    
    //Player 1 HealthBar HP1 Text
  var  Player2TextEnergy1 = new createjs.Text(start.o_c1_energy + "/"+start.o_c1_max[1], "12px Aero", "white");
    Player2TextEnergy1.x = 265;
    Player2TextEnergy1.y = p2t2;
    Player2TextEnergy1.textBaseline = "alphabetic";
    Player2TextEnergy1.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player2TextEnergy1);

    //Player 1 HealthBar HP2 Text
  var  Player2TextEnergy2 = new createjs.Text(start.o_c2_energy + "/"+start.o_c2_max[1], "12px Aero", "white");
    Player2TextEnergy2.x = 634;
    Player2TextEnergy2.y = p2t2;
    Player2TextEnergy2.textBaseline = "alphabetic";
    Player2TextEnergy2.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player2TextEnergy2);
    
    
    //Player 1 HealthBar HP3 Text
  var  Player2TextEnergy3 = new createjs.Text(start.o_c3_energy + "/"+start.o_c3_max[1], "12px Aero", "white");
    Player2TextEnergy3.x = 1003;
    Player2TextEnergy3.y = p2t2;
    Player2TextEnergy3.textBaseline = "alphabetic";
    Player2TextEnergy3.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    stage.addChild(Player2TextEnergy3);
  
//var in_statushold = new createjs.Bitmap(queue.getResult("statusBackground"));
//in_statushold.x = 40;
//in_statushold.y = 15;
//stage.addChild(in_statushold); 

    //Ad Timer
    timerText = new createjs.Text("", "15.42px Aero", "#383838");
    timerText.x = 888;
    timerText.y = 525;
    timerText.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    timerText.textBaseline = "alphabetic";
    stage.addChild(timerText);
    
var BPText = new createjs.Text(start.bp, "15.42px Aero", "#383838");
    BPText.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    BPText.x = 770;
    BPText.y = 525;
    BPText.textBaseline = "alphabetic";
    stage.addChild(BPText);
    
var turnText = new createjs.Text(start.turns, "15.42px Aero", "#383838");
    turnText.shadow = new createjs.Shadow("rgba(0,0,0,0.8), 2, 2, 1");
    turnText.x = 1032;
    turnText.y = 525;
    turnText.textBaseline = "alphabetic";
    stage.addChild(turnText);


    var P1BlinkingBox1;
    var P1BlinkingBox2;
    var P1BlinkingBox3;
    var P2BlinkingBox1;
    var P2BlinkingBox2;
    var P2BlinkingBox3;
    var P1triangle1;
    var P1triangle2;
    var P1triangle3;
    var P2triangle1;
    var P2triangle2;
    var P2triangle3;
    
var player1CharacterSlot1 = new createjs.Bitmap(queue.getResult(p1character1.c));
     player1CharacterSlot1.x = 86;
     player1CharacterSlot1.y = player1y;
     player1CharacterSlot1.hitArea = hitArea6;
     player1CharacterSlot1.cursor = "pointer";
     stage.addChild(player1CharacterSlot1);
     
var player1CharacterSlot2 = new createjs.Bitmap(queue.getResult(p1character2.c));
    player1CharacterSlot2.x = 457;
    player1CharacterSlot2.y = player1y;
    player1CharacterSlot2.hitArea = hitArea6;
    player1CharacterSlot2.cursor = "pointer";
    stage.addChild(player1CharacterSlot2);

var player1CharacterSlot3 = new createjs.Bitmap(queue.getResult(p1character3.c));
    player1CharacterSlot3.x = 823;
    player1CharacterSlot3.y = player1y;
    player1CharacterSlot3.hitArea = hitArea6;
    player1CharacterSlot3.cursor = "pointer";
    stage.addChild(player1CharacterSlot3);

//25
var player2CharacterSlot1 = new createjs.Bitmap(queue.getResult(moo.team[0]));
    player2CharacterSlot1.x = 88;
    player2CharacterSlot1.y = player2y;
    player2CharacterSlot1.hitArea = hitArea6;
    player2CharacterSlot1.cursor = "pointer";
    stage.addChild(player2CharacterSlot1);

var player2CharacterSlot2 = new createjs.Bitmap(queue.getResult(moo.team[1]));
    player2CharacterSlot2.x = 456;
    player2CharacterSlot2.y = player2y;
    player2CharacterSlot2.hitArea = hitArea6;
    player2CharacterSlot2.cursor = "pointer";
    stage.addChild(player2CharacterSlot2);
    
var player2CharacterSlot3 = new createjs.Bitmap(queue.getResult(moo.team[2]));
    player2CharacterSlot3.x = 824;
    player2CharacterSlot3.y = player2y;
    player2CharacterSlot3.hitArea = hitArea6;
    player2CharacterSlot3.cursor = "pointer";
    stage.addChild(player2CharacterSlot3); 
    
        // Player 1 Blinking Boxes    
 P1BlinkingBox1 = new createjs.Bitmap(queue.getResult("blinkingeffect"));
 P1BlinkingBox1.x = 87;
  P1BlinkingBox1.y = 597;
 P1BlinkingBox1.alpha= 0.5;
 P1BlinkingBox1.cursor= "pointer";
  P1BlinkingBox1.visible= false;
 createjs.Tween.get(P1BlinkingBox1, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);         
 stage.addChild(P1BlinkingBox1);

 P1BlinkingBox2 = new createjs.Bitmap(queue.getResult("blinkingeffect"));
 P1BlinkingBox2.x = 458;
  P1BlinkingBox2.y = 597;
 P1BlinkingBox2.alpha= 0.5;
 P1BlinkingBox2.cursor= "pointer";
 P1BlinkingBox2.visible= false;
 createjs.Tween.get(P1BlinkingBox2, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);          
 stage.addChild(P1BlinkingBox2);

 P1BlinkingBox3 = new createjs.Bitmap(queue.getResult("blinkingeffect"));
 P1BlinkingBox3.x = 824;
 P1BlinkingBox3.y = 597;
 P1BlinkingBox3.alpha= 0.5;
 P1BlinkingBox3.visible= false;
 P1BlinkingBox3.cursor= "pointer";
 createjs.Tween.get(P1BlinkingBox3, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);         
 stage.addChild(P1BlinkingBox3);

// Player 2 Blinking Boxes    
 P2BlinkingBox1 = new createjs.Bitmap(queue.getResult("blinkingeffect"));
 P2BlinkingBox1.x = 89;
  P2BlinkingBox1.y = 60;
 P2BlinkingBox1.alpha= 0.5;
 P2BlinkingBox1.visible= false;
  P2BlinkingBox1.cursor= "pointer";
 createjs.Tween.get(P2BlinkingBox1, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);         
 stage.addChild(P2BlinkingBox1);

 P2BlinkingBox2 = new createjs.Bitmap(queue.getResult("blinkingeffect"));
 P2BlinkingBox2.x = 457;
  P2BlinkingBox2.y = 60;
 P2BlinkingBox2.alpha= 0.5;
 P2BlinkingBox2.visible= false;
 P2BlinkingBox2.cursor= "pointer";
 createjs.Tween.get(P2BlinkingBox2, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);        
 stage.addChild(P2BlinkingBox2);

 P2BlinkingBox3 = new createjs.Bitmap(queue.getResult("blinkingeffect"));
 P2BlinkingBox3.x = 825;
  P2BlinkingBox3.y = 60;
 P2BlinkingBox3.visible= false;
  P2BlinkingBox3.cursor= "pointer";
  P2BlinkingBox3.alpha= 0.5;
 createjs.Tween.get(P2BlinkingBox3, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);          
 stage.addChild(P2BlinkingBox3);
 

    
var s1hold,s2hold,s3hold;


 P1triangle1 = new createjs.Bitmap(queue.getResult("search"));
 P1triangle2 = new createjs.Bitmap(queue.getResult("search"));
 P1triangle3 = new createjs.Bitmap(queue.getResult("search"));
 P2triangle1 = new createjs.Bitmap(queue.getResult("search"));
 P2triangle2 = new createjs.Bitmap(queue.getResult("search"));
 P2triangle3 = new createjs.Bitmap(queue.getResult("search"));
 
 
 var trianglex = 68;
 var triangley = 580;
 

    P1triangle1.x = trianglex;
    P1triangle1.y = triangley;
    P1triangle1.visible= false;
   createjs.Tween.get(P1triangle1, {loop: true})
   .to({y:triangley}, 200,createjs.Ease.getPowInOut(2))
         .to({y:triangley+15,x:trianglex+10}, 200)
          .to({y:triangley+25,x:trianglex,scaleX:0.7,scaleY:0.7}, 200,createjs.Ease.getPowInOut(1))
          .to({y:triangley+20,x:trianglex+20}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex}, 200,createjs.Ease.getPowInOut(3))
          .to({y:triangley-10,x:trianglex+10,scaleX:0.8,scaleY:0.8}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex,scaleX:1,scaleY:1}, 200,createjs.Ease.getPowInOut(1))
          .wait(300);
    stage.addChild(P1triangle1);
    
 
    trianglex = 438;
    triangley = 580;
  
    P1triangle2.x = trianglex;
    P1triangle2.y = triangley;
    P1triangle2.visible= false;
    createjs.Tween.get(P1triangle2, {loop: true})
          .to({y:triangley+15}, 200,createjs.Ease.getPowInOut(2))
         .to({y:triangley+25,x:trianglex+10}, 200)
          .to({y:triangley+20,x:trianglex,scaleX:0.7,scaleY:0.7}, 200,createjs.Ease.getPowInOut(1))
          .to({y:triangley+15,x:trianglex+20}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex}, 200,createjs.Ease.getPowInOut(3))
          .to({y:triangley-10,x:trianglex+10,scaleX:0.8,scaleY:0.8}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex,scaleX:1,scaleY:1}, 200,createjs.Ease.getPowInOut(1))
          .wait(300);
    stage.addChild(P1triangle2);
    

    trianglex = 806;
    triangley = 580;
    
    P1triangle3.x = trianglex;
    P1triangle3.y = triangley;
    P1triangle3.visible= false;
    createjs.Tween.get(P1triangle3, {loop: true})
        .to({y:triangley+15}, 200,createjs.Ease.getPowInOut(2))
         .to({y:triangley+25,x:trianglex+10}, 200)
          .to({y:triangley+20,x:trianglex,scaleX:0.7,scaleY:0.7}, 200,createjs.Ease.getPowInOut(1))
          .to({y:triangley+15,x:trianglex+20}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex}, 200,createjs.Ease.getPowInOut(3))
          .to({y:triangley-10,x:trianglex+10,scaleX:0.8,scaleY:0.8}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex,scaleX:1,scaleY:1}, 200,createjs.Ease.getPowInOut(1))
          .wait(300);
    stage.addChild(P1triangle3);
    
    
     trianglex = 70;
    triangley = 40;
    
    P2triangle1.x = trianglex;
    P2triangle1.y = triangley;
    P2triangle1.visible= false;
    createjs.Tween.get(P2triangle1, {loop: true})
     .to({y:triangley+15}, 200,createjs.Ease.getPowInOut(2))
         .to({y:triangley+25,x:trianglex+10}, 200)
          .to({y:triangley+20,x:trianglex,scaleX:0.7,scaleY:0.7}, 200,createjs.Ease.getPowInOut(1))
          .to({y:triangley+15,x:trianglex+20}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex}, 200,createjs.Ease.getPowInOut(3))
          .to({y:triangley-10,x:trianglex+10,scaleX:0.8,scaleY:0.8}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex,scaleX:1,scaleY:1}, 200,createjs.Ease.getPowInOut(1))
          .wait(300);
    stage.addChild(P2triangle1);

 trianglex = 438;
    triangley = 40;
    
    P2triangle2.x = trianglex;
    P2triangle2.y = triangley;
    P2triangle2.visible= false;
    createjs.Tween.get(P2triangle2, {loop: true})
        .to({y:triangley+15}, 200,createjs.Ease.getPowInOut(2))
         .to({y:triangley+25,x:trianglex+10}, 200)
          .to({y:triangley+20,x:trianglex,scaleX:0.7,scaleY:0.7}, 200,createjs.Ease.getPowInOut(1))
          .to({y:triangley+15,x:trianglex+20}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex}, 200,createjs.Ease.getPowInOut(3))
          .to({y:triangley-10,x:trianglex+10,scaleX:0.8,scaleY:0.8}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex,scaleX:1,scaleY:1}, 200,createjs.Ease.getPowInOut(1))
          .wait(300);
    stage.addChild(P2triangle2);
    
     trianglex = 806;
    triangley = 40;
    
    P2triangle3.x = trianglex;
    P2triangle3.y = triangley;
    P2triangle3.visible= false;
    createjs.Tween.get(P2triangle3, {loop: true})
       .to({y:triangley+15}, 200,createjs.Ease.getPowInOut(2))
         .to({y:triangley+25,x:trianglex+10}, 200)
          .to({y:triangley+20,x:trianglex,scaleX:0.7,scaleY:0.7}, 200,createjs.Ease.getPowInOut(1))
          .to({y:triangley+15,x:trianglex+20}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex}, 200,createjs.Ease.getPowInOut(3))
          .to({y:triangley-10,x:trianglex+10,scaleX:0.8,scaleY:0.8}, 200,createjs.Ease.getPowInOut(2))
          .to({y:triangley,x:trianglex,scaleX:1,scaleY:1}, 200,createjs.Ease.getPowInOut(1))
          .wait(300);
    stage.addChild(P2triangle3);

var changeBox1;
var changeBox2;
var changeBox3;

//Display
    var display;
    done = new createjs.Shape();
    var exitMenu = new createjs.Shape(); 
    var doneText;
    var exitMenuText;

//----------------------------------------



var hitArea5 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,120,30));
    //End Turn

//var in_buttonhold= new createjs.Shape();
//in_buttonhold.graphics.beginFill('#FC6122');
//in_buttonhold.graphics.drawRoundRect(650,100,270,30,15);
//stage.addChild(in_buttonhold);   

var chat_button = new createjs.Bitmap(queue.getResult("chat"));
chat_button.x = 720;
chat_button.y = 460;
chat_button.hitArea = hitArea5;
chat_button.cursor = "pointer";
stage.addChild(chat_button);

var endTurn_button = new createjs.Bitmap(queue.getResult("endturn"));
endTurn_button.x = 848;
endTurn_button.y = 460;
endTurn_button.hitArea = hitArea5;
endTurn_button.cursor = "pointer";
stage.addChild(endTurn_button); 

var surrender_button = new createjs.Bitmap(queue.getResult("forfeit"));
surrender_button.x = 983;
surrender_button.y = 460;
surrender_button.hitArea = hitArea5;
surrender_button.cursor = "pointer";
stage.addChild(surrender_button);



var frame = new createjs.Bitmap(queue.getResult("frame"));
stage.addChild(frame); 


var block1,block2,block3,stun;

var trans = "";
 
//y = 200 height = 300    
var in_gamehold = new createjs.Bitmap(queue.getResult("contentsBackground"));
in_gamehold.x = 26;
in_gamehold.y = 176;

var in_userhold = new createjs.Bitmap(queue.getResult("userboxBackground"));
in_userhold.x = -5;
in_userhold.y = 211;

var in_skillshold = new createjs.Bitmap(queue.getResult("skillsBackground"));
in_skillshold.x = 27;
in_skillshold.y = 459;

var in_effectshold = new createjs.Bitmap(queue.getResult("actionsBackground"));
in_effectshold.x = 659;
in_effectshold.y = 177;

clearInterval(connection);
function check()
{

}

//chartshow.x = -630;
//chartshow.y = 145;




phealth1 = [start.y_c1_health,start.y_c2_health,start.y_c3_health];
phealth2 = [start.o_c1_health,start.o_c2_health,start.o_c3_health];
penergy1 = [start.y_c1_energy,start.y_c2_energy,start.y_c3_energy];
penergy2 = [start.o_c1_energy,start.o_c2_energy,start.o_c3_energy];


var user_item = new createjs.Bitmap(queue.getResult("green"));
    user_item.x = 485;
    user_item.y = 477;
    user_item.hitArea = hitArea6;
    user_item.cursor = "pointer";
    
var stats = [];
var statsStrength,statsKi,statsSpeed,statsDefense;
    stats[0] = new createjs.Shape();
    statsStrength = stats[0].graphics.beginLinearGradientFill(["#febf01","#febf04"], [0, 1],0, 20, 0, 120).drawRoundRect(775, 210,0, 15,1).command;


    stats[1] = new createjs.Shape();
    statsKi = stats[1].graphics.beginLinearGradientFill(["#febf01","#febf04"], [0, 1],0, 20, 0, 120).drawRoundRect(775, 246,0, 15,1).command;


    stats[2] = new createjs.Shape();
    statsSpeed = stats[2].graphics.beginLinearGradientFill(["#febf01","#febf04"], [0, 1],0, 20, 0, 120).drawRoundRect(775, 228,0, 15,1).command;


    stats[3] = new createjs.Shape();
    statsDefense = stats[3].graphics.beginLinearGradientFill(["#febf01","#febf04"], [0, 1],0, 20, 0, 120).drawRoundRect(775, 264,0, 15,1).command;


var statsText = new createjs.Text("", "16px Aero", "white");
statsText.x = 980;
statsText.y = 223;
statsText.lineHeight = 20;
statsText.shadow = new createjs.Shadow("rgba(0,0,0,1)", 2, 2, 1);
statsText.textBaseline = "alphabetic";

  /*   
var mainPhase= new createjs.Bitmap(queue.getResult("mainPhase"));
    mainPhase.x = 650;
    mainPhase.y = 205;
 createjs.Tween.get(mainPhase, {loop: false})
          .to({ x: -400}, 7000, createjs.Ease.linear)//10
           .to({ x: 650}, 1, createjs.Ease.linear)//10
          .to({ x: -400}, 7000, createjs.Ease.linear)//10
        
    stage.addChild(mainPhase);
    
*/

function itemCancel()
{
    stage.removeChild(p1boxes);
    p1.targeted = -1;
    p1.attacked = false;
    createjs.Sound.play("select", {loop: 0, volume:0.01});
}
function turnAnimation()
{
     
  


      if (battlelogs[z] === 0)
      {
          skill = skillList(battlelogs[z+1],[0]);
    
           showActions.image = queue.getResult(battlelogs[z+1]);
      
            showActions.x = 300;
    showActions.y = 400;
    showActions.scaleX = 1;
    showActions.scaleY = 1;
    showActions.alpha = 1;
            createjs.Tween.get(showActions, {loop: false})
 .to({ scaleX:3 ,scaleY:3,y:200, x:300 }, 800, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(function(){effectAnimation(0,true)})
 stage.addChild(showActions);
        
         //success,skill,damage,vs,user,target,reflect
         //Number 0 ,Skill Number 1, Damage Number 2, Which Player 3, Order Number 4,reflect 5
         //success 0:Success 1.Immunity 2.Stunned 3.Countered 4.Fail
      }
      
      else if (battlelogs[z] === 1)
      {
       
            skill = skillList(battlelogs[z+1],[0]);
    
           showActions.image = queue.getResult(battlelogs[z+1]);
      
            showActions.x = 300;
    showActions.y = 400;
    showActions.scaleX = 1;
    showActions.scaleY = 1;
    showActions.alpha = 1;
            createjs.Tween.get(showActions, {loop: false})
 .to({ scaleX:3 ,scaleY:3,y:200, x:300 }, 800, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(function(){effectAnimation(1,false)})

 stage.addChild(showActions);
      }
      else if (battlelogs[z] === 2)
      {
          skill = skillList(battlelogs[z+1],[0]);
    
           showActions.image = queue.getResult(battlelogs[z+1]);
      
            showActions.x = 300;
    showActions.y = 400;
    showActions.scaleX = 1;
    showActions.scaleY = 1;
    showActions.alpha = 1;
            createjs.Tween.get(showActions, {loop: false})
 .to({ scaleX:3 ,scaleY:3,y:200, x:300 }, 800, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 
 .call(function(){effectAnimation(2,false)})
  stage.addChild(showActions); 
 
      }
      
      else if (battlelogs[z] === 3)
      {
           skill = skillList(battlelogs[z+1],[0]);
    
           showActions.image = queue.getResult(battlelogs[z+1]);
      
            showActions.x = 300;
    showActions.y = 400;
    showActions.scaleX = 1;
    showActions.scaleY = 1;
    showActions.alpha = 1;
            createjs.Tween.get(showActions, {loop: false})
 .to({ scaleX:3 ,scaleY:3,y:200, x:300 }, 800, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 
 .call(function(){effectAnimation(3,false)})
 .wait(200)
 .call(function(){effectAnimation(0,false)})
 stage.addChild(showActions); 

      }
      
      else if (battlelogs[z] === 4)
      {
         skill = skillList(battlelogs[z+1],[0]);
    
           showActions.image = queue.getResult(battlelogs[z+1]);
      
            showActions.x = 300;
    showActions.y = 400;
    showActions.scaleX = 1;
    showActions.scaleY = 1;
    showActions.alpha = 1;
            createjs.Tween.get(showActions, {loop: false})
 .to({ scaleX:3 ,scaleY:3,y:200, x:300 }, 800, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(function(){effectAnimation(4,true)})
 stage.addChild(showActions);
        
      }
      
}
//{Turn Number = [[success,skill,damage,user,target,reflect]]}
//0,85,0,2,0,0
//success 0:Success 1.Immunity 2.Stunned 3.Countered 4.Fail

var a,b,c;
//Enemy 1.55x 80y   2.247x  3.414x
//You are 1.55x 525y  267x
function effectAnimation(num,success)
{
 
          aN = z + 1;
          var display;
          var stunned = true;
         
          
 
    

 if (num === 0) 
 {
     a = battlelogs[z+5];
     display = skill[6];
 }
 else if (num === 1 )
 {
     
     a = battlelogs[z+3][1];
     
     if (battlelogs[z+3][0] === start.player )
     {
         stunned = false;
           success = false;
     }
     else
     {
         battlelogs[z+3][0] = start.player;
     }
     
  
 }
 
 else if (num === 2)
 {
a = battlelogs[z+5];
    stunned = false;
   
 }
 
 else if (num === 3)
 {
a = battlelogs[z+5];
console.log("A:  " + a);
 }
 
 else if (num === 4)
 {
     a = battlelogs[z+5];
     display = skill[6];
    
     if (battlelogs[z+4][3] === "Stunned")
     {
     
       animationChoice(display,a,2);  
       console.l
       z += 6;  
     }
     else
     {
       for (var i = 0; i < 3; i++) 
     {
        console.log("I: " + i);
        animationChoice(display,a,i);  
     }
     z += 6;  
     }
     
     setTimeout(nextTurnAnimation, 1500);
 }
 else
 {
     display = "Defensive";
 }

if (num < 4)

{
 
 if (battlelogs[z+2] < 0 )
 {
     battlelogs[z+2] = 0;
 }
 if (battlelogs[z+3][0] === start.player && battlelogs[z+4][0] === "Enemy" && stunned)   
 {

   
       
     if(a === 0 )
     {
         b = 75;
         c = 50;
          console.log("I'm in 0");
         if (success)
         {
           createjs.Tween.get(player2bar[0], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.o_c1_max[0]*181}, 2000);
         }
     }
     else if(a === 1 )
     {
         b = 447;
         c = 50;
          console.log("I'm in 1");
          if (success)
         {
         createjs.Tween.get(player2bar[1], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.o_c2_max[0]*181}, 2000);
         }
     
     }
     else if(a === 2 )
     {
         b = 814;
         c = 50;
         
         console.log("I'm in 2");
          if (success)
         {
         createjs.Tween.get(player2bar[2], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.o_c3_max[0]*181}, 2000);
         }
     }
     
     
    
     
  
 }
 
 else if (battlelogs[z+3][0] !== start.player && battlelogs[z+4][0] === "Self" && stunned)
 {
     
     if(a === 0 )
     {
         b = 75;
         c = 50;
         console.log("I'm in 3");
          if (success)
         {
createjs.Tween.get(player2bar[0], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.o_c1_max[0]*181}, 2000);
         }
     
     }
     else if(a === 1 )
     {
         b = 447;
         c = 50;
         console.log("I'm in 4");
          if (success)
         {
         createjs.Tween.get(player2bar[1], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.o_c2_max[0]*181}, 2000);
         }
     
     }
     else if(a === 2 )
     {
         b = 814;
         c = 50;
         console.log("I'm in 5");
          if (success)
         {
         createjs.Tween.get(player2bar[2], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.o_c3_max[0]*181}, 2000);
         }
     }
    
 }
 
 else if (battlelogs[z+3][0] === start.player && battlelogs[z+4][0] === "Enemy" && stunned === false)   
 {
     
   
     if(battlelogs[z+3][1] === 0 )
     {
         b =75;
         c = 585;
     
     }
     else if(battlelogs[z+3][1] === 1 )
     {
         b = 447;
         c = 585;
     
     }
     else if(battlelogs[z+3][1] === 2 )
     {
         b = 814;
         c = 585;
     }
     
 }

 
  else if (battlelogs[z+3][0] !== start.player && battlelogs[z+4][0] === "Enemy" && stunned )
 {
  
     if(a === 0 )
     {
         b =75;
         c = 585;
         console.log("This skill was successful: " + success);
          if (success)
         {
         createjs.Tween.get(player1bar[0], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.y_c1_max[0]*181}, 2000);
         }
     }
     else if(a === 1 )
     {
         b = 447;
         c = 585;
         console.log("This skill was successful: " + success);
          if (success)
         {
         createjs.Tween.get(player1bar[1], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.y_c2_max[0]*181}, 2000);
         }
     }
     else if(a === 2 )
     {
         b = 814;
         c = 585;
         
         console.log("This skill was successful: " + success);
          if (success)
         {
          createjs.Tween.get(player1bar[2], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.y_c3_max[0]*181}, 2000);
         }
     }
    
 }
 
 else if (battlelogs[z+3][0] !== start.player && battlelogs[z+4][0] === "Enemy" && stunned === false)
 {
     if(battlelogs[z+3][1] === 0 )
     {
         b =75;
         c = 50;
     
     }
     else if(battlelogs[z+3][1] === 1 )
     {
         b = 447;
         c = 50;
     
     }
     else if(battlelogs[z+3][1] === 2 )
     {
         b = 814;
         c = 50;
     }

 }
 
 else
 {
     
     if(a === 0 )
     {
         b =75;
         c = 585;
         
          if (success)
         {
         createjs.Tween.get(player1bar[0], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.y_c1_max[0]*181}, 2000);
         }
     }
     
     else if(a === 1 )
     {
         b = 447;
         c = 585;
         
          if (success)
         {
         createjs.Tween.get(player1bar[1], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.y_c2_max[0]*181}, 2000);
         }
     }
     else if(a === 2 )
     {
         b = 814;
         c = 585;
         
          if (success)
         {
          createjs.Tween.get(player1bar[2], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2]/start.y_c3_max[0]*181}, 2000);
         }
     }
 }

}
     
     
 
   if (num === 0) 
 {
     
  
     switch(display)
     {
         case "Strength":
             
         var data = {
    images: [queue.getResult('strengthanimation')],
    frames: {width:100, height:100},

    animations: {
        run:[1,4],
        speed: 0.1,
        
    }
};
spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b;
 animation.y = c;
createjs.Tween.get(animation, {loop: false})
.to({ x: b-23,y: c-15}, 300, createjs.Ease.linear) //5
          .to({ x: b-43,y: c-35}, 300, createjs.Ease.linear)//10
          .to({ x: b-38,y: c+5}, 300, createjs.Ease.linear)//10
          .to({ x: b-23,y: c-10}, 300, createjs.Ease.linear)//10
          .to({ x: b-6,y: c+ 5}, 300, createjs.Ease.linear)//10
          .to({ alpha:0 }, 200, createjs.Ease.linear) //5
          .call(nextTurnAnimation)
          
           createjs.Sound.play("strengthsound", {loop: 1,volume: 0.01});
         break;
         
         case "Ki":
         var data = {
    images: [queue.getResult('kianimation')],
    frames: {width:100, height:100},

    animations: {
       run:[1,37],
       //run:[1,33],
        speed: 0.1,
        
    }
};
 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
  animation.x = b;
 animation.y = c;
createjs.Tween.get(animation, {loop: false})
.to({ x: b-12,y: c-20 }, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(nextTurnAnimation)

  createjs.Sound.play("kisound", {loop: 0, volume: 0.01});    
         break;
         case "Power-Up":
         var data = {
    images: [queue.getResult('powerUpanimation')],
    frames: {width:102, height:102},

    animations: {
       run:[1,17],
       //run:[1,33],
        speed: 0.1,
        
    }
};
spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b-6;
 animation.y = c;
 createjs.Tween.get(animation, {loop: false})
 .to({ x: b-6,y: c }, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(nextTurnAnimation)
  createjs.Sound.play("powerdownsound", {loop: 1,volume: 0.01});    
         break;
         
         case "Power-Down":
         var data = {
    images: [queue.getResult('powerDownanimation')],
    
    frames: {width:95, height:95},

    animations: {
       run:[1,16],
       //run:[1,33],
        speed: 0.1,
        
    }
};

 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b+5;
 animation.y = c;
 createjs.Tween.get(animation, {loop: false})
 .to({ x: b+5,y: c+20 }, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(nextTurnAnimation)
 
  createjs.Sound.play("powerdownsound", {loop: 1,volume: 0.01});    
         break;
         
case "Affliction":
         var data = {
    images: [queue.getResult('Afflictionanimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,12],
       //run:[1,33],
        speed: 0.1,
        
        
    }

}

 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b+2;
 animation.y = c-5;
 createjs.Tween.get(animation, {loop: false})
 .to({ x: b,y: c-5 }, 1400, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(nextTurnAnimation)

createjs.Sound.play("Afflictionsound", {loop: 1,volume: 0.01});    
         break;
         
          case "Defensive":
         var data = {
    images: [queue.getResult('defenseanimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,16],
       //run:[1,33],
        speed: 0.1,
        
        
    }

}

 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b+2;
 animation.y = c-5;
 createjs.Tween.get(animation, {loop: false})
 .to({ x: b,y: c-5 }, 1100, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(nextTurnAnimation)

createjs.Sound.play("defensesound", {loop: 0,volume: 0.01});    
         break;
         
         case "Transformation":
         var img1 = {
    images: [queue.getResult('aura1')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};
var img2 = {
    images: [queue.getResult('aura2')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};

var img3 = {
    images: [queue.getResult('aura3')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};


var img4 = {
    images: [queue.getResult('aura4')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};


    switch (battlelogs[z+1][0])
    {
        case "b":
        sheet = new createjs.SpriteSheet(img2);
 p1pu1 = new createjs.Sprite(sheet, "run");
 p1pu1.x = b-70;
 p1pu1.y = c-120;
 stage.addChild(p1pu1);    
        break;
        
        case "y":
        sheet = new createjs.SpriteSheet(img1);
p1pu1 = new createjs.Sprite(sheet, "run");
 p1pu1.x = b-70;
 p1pu1.y = c-120;
 stage.addChild(p1pu1);      
        break;
        
        case "r":
        sheet = new createjs.SpriteSheet(img3);
p1pu1 = new createjs.Sprite(sheet, "run");
 p1pu1.x = b-70;
 p1pu1.y = c-120;
 stage.addChild(p1pu1);      
        break;
        
        case "w":
        sheet = new createjs.SpriteSheet(img4);
p1pu1 = new createjs.Sprite(sheet, "run");
 p1pu1.x = b-70;
 p1pu1.y = c-120;
 stage.addChild(p1pu1);      
        break;
    }
     if ( b === 35 && c === 100)
     {
         notTransformed[3] = false;
     }
    else if (b === 247 && c === 100)
    {
        notTransformed[4] = false;
    }
    
    else if (b === 464 && c === 100)
    {
       notTransformed[5] = false; 
    }
    
    else if (b === 35 && c === 525)
    {
        notTransformed[0] = false;
    }
    
    else if (b === 247 && c === 525)
    {
        notTransformed[1] = false;
    }
    
    else 
    {
        notTransformed[2] = false;
    }
    
    
    setTimeout(nextTurnAnimation, 500);
    break;
        

        
         default:
             
         break;
         
     }
      createjs.Sound.play("aura", {loop: 0,volume: 0.01});
         
     z+= 6;
     stage.addChild(animation);
 }
 
if (num === 1)
 {
    var data = {
    images: [queue.getResult('stunnedanimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,39],
       //run:[1,33],
        speed: 0.1,
        
        
    }

}
   
 spriteSheet = new createjs.SpriteSheet(data);
 animationDefense = new createjs.Sprite(spriteSheet, "run");
 animationDefense.x = b;
 animationDefense.y = c-5;
 createjs.Tween.get(animationDefense, {loop: false})
 .to({ x: b,y: c-5}, 1100, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
  .call(nextTurnAnimation)
 

createjs.Sound.play("stunnedsound", {loop: 1,volume: 0.01});  
stage.addChild(animationDefense);  
z+= 6
 }
else if (num === 2)
{

          var data = {
    images: [queue.getResult('counteranimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,16],
       //run:[1,33],
        speed: 0.1,
        
        
    }

          }
          
              spriteSheet = new createjs.SpriteSheet(data);
 animationDefense = new createjs.Sprite(spriteSheet, "run");
 animationDefense.x = b;
 animationDefense.y = c-5;
 createjs.Tween.get(animationDefense, {loop: false})
 .to({ x: b,y: c-5}, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 .call(nextTurnAnimation)
 

createjs.Sound.play("defensesound", {loop: 0,volume: 0.01});  
stage.addChild(animationDefense);
z+= 6
}
else if (num === 3)
{
          var data = {
    images: [queue.getResult('defenseanimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,17],
       //run:[1,33],
        speed: 0.1,
        
        
    }
}

 spriteSheet = new createjs.SpriteSheet(data);
 animationDefense = new createjs.Sprite(spriteSheet, "run");
 animationDefense.x = b;
 animationDefense.y = c-5;
 createjs.Tween.get(animationDefense, {loop: false})
 .to({ x: b,y: c-5}, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 
 

createjs.Sound.play("defensesound", {loop: 0,volume: 0.01});  
stage.addChild(animationDefense);
}


         /*   
var mainPhase= new createjs.Bitmap(queue.getResult("mainPhase"));
    mainPhase.x = 650;
    mainPhase.y = 205;
 createjs.Tween.get(mainPhase, {loop: false})
          .to({ x: -400}, 7000, createjs.Ease.linear)//10
           .to({ x: 650}, 1, createjs.Ease.linear)//10
          .to({ x: -400}, 7000, createjs.Ease.linear)//10
        
    stage.addChild(mainPhase);
    
*/




}



function nextTurnAnimation()
{
  
    if (z < len)
    {
          stage.removeChild(animation);
      stage.removeChild(showActions);
     turnAnimation();
   
    }
     
     else
     {
  
    
          var img1 = {
    images: [queue.getResult('aura1')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};
var img2 = {
    images: [queue.getResult('aura2')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};

var img3 = {
    images: [queue.getResult('aura3')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};


var img4 = {
    images: [queue.getResult('aura4')],
    frames: {width:208, height:228},
    animations: {
        run:[0,3],
    }
};

 
     if(start.o_c1_transformation !== "none" && notTransformed[3])
     {
         b =75;
         c = 50;
         transformationEffect(start.o_c1_transformation[0]);
     }
     if(start.o_c2_transformation !== "none" && notTransformed[4] )
     {
         b = 447;
         c = 50;
         transformationEffect(start.o_c2_transformation[0]);
     }
     if(start.o_c3_transformation !== "none" && notTransformed[5] )
     {
         b = 814;
         c = 50;
         transformationEffect(start.o_c3_transformation[0]);
     } 
    
 
    
     if(start.y_c1_transformation !== "none"  && notTransformed[0])
     {
         b =75;
         c = 585;
         transformationEffect(start.y_c1_transformation[0]);
     }
     if(start.y_c2_transformation !== "none"  && notTransformed[1])
     {
         b = 447;
         c = 585;
         transformationEffect(start.y_c2_transformation[0]);
     }
     if(start.y_c3_transformation !== "none" && notTransformed[2] )
     {
         b = 814;
         c = 585;
         transformationEffect(start.y_c3_transformation[0]);
     }
    
  
    
         //createjs.Sound.play("aura", {loop: 0});
         
         
          setTimeout(battlelog, 200);
       
     }
     
       
    
}


 
 
 var showActions = new createjs.Bitmap(queue.getResult("45"));
    showActions.x = 300;
    showActions.y = 400;

showActions2 = new createjs.Text("Reccome Punch", "12px TW", "white");
showActions2.x = 380;
showActions2.y = 200;
showActions2.textBaseline = "alphabetic";
   // stage.addChild(showActions);


//Enemy 1.55x 80y   2.247x  3.414x
//You are 1.55x 525y  267x
//Event Listeners for menu
surrender_button.addEventListener("click",surrenderNow);
endTurn_button.addEventListener("click",sorting);
chat_button.addEventListener("click",showchat);

//Player 1 Character Event Listners
var battlelogs = JSON.parse(start.battlelog);
len = battlelogs.length;


if (len === 0)
{
           var img1 = {
    images: [queue.getResult('aura1')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};
var img2 = {
    images: [queue.getResult('aura2')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};

var img3 = {
    images: [queue.getResult('aura3')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};


var img4 = {
    images: [queue.getResult('aura4')],
    frames: {width:208, height:228},
    animations: {
        run:[0,3],
    }
};

 
     if(start.o_c1_transformation !== "none" )
     {
         b =75;
         c = 50;
         transformationEffect(start.o_c1_transformation[0]);
         //createjs.Sound.play("aura", {loop: 0});
     }
     if(start.o_c2_transformation !== "none"  )
     {
         b = 447;
         c = 50;
         transformationEffect(start.o_c2_transformation[0]);
         //createjs.Sound.play("aura", {loop: 0});
     }
     if(start.o_c3_transformation !== "none" )
     {
         b = 814;
         c = 50;
         transformationEffect(start.o_c3_transformation[0]);
         //createjs.Sound.play("aura", {loop: 0});
     } 
    
 
 
    
     if(start.y_c1_transformation !== "none" )
     {
         b =75;
         c = 585;
         transformationEffect(start.y_c1_transformation[0]);
         //createjs.Sound.play("aura", {loop: 0});
     }
     if(start.y_c2_transformation !== "none")
     {
         b = 447;
         c = 585;
         transformationEffect(start.y_c2_transformation[0]);
         //createjs.Sound.play("aura", {loop: 0});
     }
     if(start.y_c3_transformation !== "none" )
     {
         b = 814;
         c = 585;
         transformationEffect(start.y_c3_transformation[0]);
         //createjs.Sound.play("aura", {loop: 0});
     }
    
 
    setTimeout(battlelog, 200);
   
}
else
{
var i=1,z=0,len,n=0,turn,current,skill,aN,spriteSheet,animation,animationDefense,zHold,notTransformed = [true,true,true,true,true,true];
    turn = battlelogs.turn - 1;

setTimeout(function() {turnAnimation();}, 200);

}


if (start.y_c1_transformation !== "none" && start.y_c1_transformation !== "bge-t")
{
    player1CharacterSlot1.image = queue.getResult(start.y_c1_transformation);
}

if (start.y_c2_transformation !== "none" && start.y_c2_transformation !== "bge-t")
{
    player1CharacterSlot2.image = queue.getResult(start.y_c2_transformation);
}
if (start.y_c3_transformation !== "none" && start.y_c3_transformation !== "bge-t")
{
    player1CharacterSlot3.image = queue.getResult(start.y_c3_transformation);
}
if (start.o_c1_transformation !== "none" && start.o_c1_transformation !== "bge-t")
{
    player2CharacterSlot1.image = queue.getResult(start.o_c1_transformation);
}

if (start.o_c2_transformation !== "none" &&  start.o_c2_transformation !== "bge-t")
{
    player2CharacterSlot2.image = queue.getResult(start.o_c2_transformation);
}
if (start.o_c3_transformation !== "none" && start.o_c3_transformation !== "bge-t")
{
    player2CharacterSlot3.image = queue.getResult(start.o_c3_transformation);
}


    
    if (start.y_c1_health === 0)
     {
         var KO1 = new createjs.Bitmap(queue.getResult("ko"));
     KO1.x = 86;
     KO1.y = player1y;
     KO1.hitArea = hitArea6;
     stage.addChild(KO1);
     }
     
     if (start.y_c2_health === 0)
     {
         var KO2 = new createjs.Bitmap(queue.getResult("ko"));
     KO2.x = 457;
     KO2.y = player1y;
     KO2.hitArea = hitArea6;
     stage.addChild(KO2);
     }
     
     if (start.y_c3_health === 0)
     {
         var KO3 = new createjs.Bitmap(queue.getResult("ko"));
     KO3.x = 823;
     KO3.y = player1y;
     KO3.hitArea = hitArea6;
     stage.addChild(KO3);
     }
     
     if (start.o_c1_health === 0)
     {
         var KO4 = new createjs.Bitmap(queue.getResult("ko"));
     KO4.x = 86;
     KO4.y = player2y;
     KO4.hitArea = hitArea6;
     stage.addChild(KO4);
     }
     
     if (start.o_c2_health === 0)
     {
         var KO5 = new createjs.Bitmap(queue.getResult("ko"));
     KO5.x = 457;
     KO5.y = player2y;
     KO5.hitArea = hitArea6;
     stage.addChild(KO5);
     }
     
     if (start.o_c3_health === 0)
     {
         var KO6 = new createjs.Bitmap(queue.getResult("ko"));
     KO6.x = 823;
     KO6.y = player2y;
     KO6.hitArea = hitArea6;
     stage.addChild(KO6);
     }
 
  
function transformationEffect(l)
{
    
        var img1 = {
    images: [queue.getResult('aura1')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};
var img2 = {
    images: [queue.getResult('aura2')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};

var img3 = {
    images: [queue.getResult('aura3')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};


var img4 = {
    images: [queue.getResult('aura4')],
    frames: {width:204, height:228},
    animations: {
        run:[0,3],
    }
};

    switch (l)
    {
        case "b":
        sheet = new createjs.SpriteSheet(img2);
 p1pu1 = new createjs.Sprite(sheet, "run");
 p1pu1.x = b-70;
 p1pu1.y = c-120;
 stage.addChild(p1pu1);    
        break;
        
        case "y":
        sheet = new createjs.SpriteSheet(img1);
p1pu1 = new createjs.Sprite(sheet, "run");
 p1pu1.x = b-70;
 p1pu1.y = c-120;
 stage.addChild(p1pu1);      
        break;
        
        case "r":
        sheet = new createjs.SpriteSheet(img3);
p1pu1 = new createjs.Sprite(sheet, "run");
 p1pu1.x = b-70;
 p1pu1.y = c-120;
 stage.addChild(p1pu1);      
        break;
        
        case "w":
        sheet = new createjs.SpriteSheet(img4);
p1pu1 = new createjs.Sprite(sheet, "run");
 p1pu1.x = b-70;
 p1pu1.y = c-120;
 stage.addChild(p1pu1);      
        break;
        
    }
}
function battlelog()
{
    
    var file = { action: "removeDone"};
    ws.send(JSON.stringify(file)); 
    
    
    console.log("I'm in battlelog. Check me out");
     createjs.Tween.get(player1bar[0], {loop: false})
	      .to({w:start.y_c1_health/start.y_c1_max[0]*181}, 2000);
    
    createjs.Tween.get(player1bar[1], {loop: false})
	      .to({w:start.y_c2_health/start.y_c2_max[0]*181}, 2000);
    
 createjs.Tween.get(player1bar[2], {loop: false})
	      .to({w:start.y_c3_health/start.y_c3_max[0]*181}, 2000);

createjs.Tween.get(player2bar[0], {loop: false})
	      .to({w:start.o_c1_health/start.o_c1_max[0]*181}, 2000);

createjs.Tween.get(player2bar[1], {loop: false})
	      .to({w:start.o_c2_health/start.o_c2_max[0]*181}, 2000);
 createjs.Tween.get(player2bar[2], {loop: false})
	      .to({w:start.o_c3_health/start.o_c3_max[0]*181}, 2000);
	      
player1CharacterSlot1.addEventListener("click",function() {p1CharacterSelected(1,p1character1.c); });
player1CharacterSlot2.addEventListener("click",function() {p1CharacterSelected(2,p1character2.c); });
player1CharacterSlot3.addEventListener("click",function() {p1CharacterSelected(3,p1character3.c); }); 
	     
player2CharacterSlot1.addEventListener("click",function() {p2CharacterSelected(1,moo.team[0]); });
player2CharacterSlot2.addEventListener("click",function() {p2CharacterSelected(2,moo.team[1]); });
player2CharacterSlot3.addEventListener("click",function() {p2CharacterSelected(3,moo.team[2]); }); 

//Display 


//Links
P1BlinkingBox1.addEventListener("click",function() {blinkingEffect(1); });
P1BlinkingBox2.addEventListener("click",function() {blinkingEffect(2); });
P1BlinkingBox3.addEventListener("click",function() {blinkingEffect(3); });
P2BlinkingBox1.addEventListener("click",function() {blinkingEffect(4); });
P2BlinkingBox2.addEventListener("click",function() {blinkingEffect(5); });
P2BlinkingBox3.addEventListener("click",function() {blinkingEffect(6); });
gameTimer = setInterval(updateTime, 1000);
}

function animationChoice(display,a,i)
{
    
    var stunned = true;
    var success = true

console.log("I'm in animationChoice");


   
   if (battlelogs[z+4][i+3] === "Stunned" || battlelogs[z+4][i+3] === "Counter" )
   {
      console.log("Counter?");
      stunned = false;
      success = false;
      
      if (battlelogs[z+2][i] < 0 )
      {
          battlelogs[z+2][i] = 0;
      }
      
      if (battlelogs[z+3][0] !== start.player)
      {
      if(battlelogs[z+3][1] === 0 )
     {
         b =75;
         c = 50;
     
     }
     else if(battlelogs[z+3][1] === 1 )
     {
         b = 447;
         c = 50;
     
     }
     else if(battlelogs[z+3][1] === 2 )
     {
         b = 814;
         c = 50;
     }
      }
      
      else if(battlelogs[z+3][0] === start.player)
      {
     if(battlelogs[z+3][1] === 0 )
     {
         b =75;
         c = 585;
     
     }
     else if(battlelogs[z+3][1] === 1 )
     {
         b = 447;
         c = 585;
     
     }
     else if(battlelogs[z+3][1] === 2 )
     {
         b = 814;
         c = 585;
     }
      }
   }
   
     
    else if (battlelogs[z+3][0] === start.player && battlelogs[z+4][i] === "Enemy" && stunned)   
 {
     console.log("Hey this skill is 0;");
     
       if(a[i] === 0 )
     {
         b =75;
         c = 50;
    if (success)
    {
         createjs.Tween.get(player2bar[0], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.o_c1_max[0]*181}, 2000); 
    }
         
 
     }
     else if(a[i] === 1 )
     {
         b = 447;
         c = 50;
    if (success)
    {
         createjs.Tween.get(player2bar[1], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.o_c2_max[0]*181}, 2000);
    }
   
     }
     else if(a[i] === 2 )
     {
         b = 814;
         c = 50;
          if (success)
    {
         createjs.Tween.get(player2bar[2], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.o_c3_max[0]*181}, 2000);
    }
        
     }
     
     
 }
 
  else if (battlelogs[z+3][0] === start.player && battlelogs[z+4][i] === "Enemy" && stunned === false)   
 {
     
   console.log("Hey this skill is 1;");
     if(battlelogs[z+3][1] === 0 )
     {
         b =75;
         c = 585;
     
     }
     else if(battlelogs[z+3][1] === 1 )
     {
         b = 447;
         c = 585;
     
     }
     else if(battlelogs[z+3][1] === 2 )
     {
         b = 814;
         c = 585;
     }
     
 }
 
 
 else if (battlelogs[z+3][0] !== start.player && battlelogs[z+4][i] === "Self")
 {
     console.log("Hey this skill is 2;");
       if(a[i] === 0 )
     {
         b =75;
         c = 50;
createjs.Tween.get(player2bar[0], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.o_c1_max[0]*181}, 2000);
     
     }
     else if(a[i] === 1 )
     {
         b = 447;
         c = 50;
         createjs.Tween.get(player2bar[1], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.o_c2_max[0]*181}, 2000);
     
     }
     else if(a[i] === 2 )
     {
         b = 814;
         c = 50;
         createjs.Tween.get(player2bar[2], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.o_c3_max[0]*181}, 2000);
     }
    
 }
 

 
  else if (battlelogs[z+3][0] !== start.player && battlelogs[z+4][i] === "Enemy" && stunned)
 {
  console.log("Hey this skill is 3;");
  if (battlelogs[z+4][i+3] === "Block")
  {
      success = false;
  }
     if(a[i] === 0 )
     {
         b =75;
         c = 585;
    if (success)
    {
         createjs.Tween.get(player1bar[0], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.y_c1_max[0]*181}, 2000);
    }
     }
     else if(a[i] === 1 )
     {
         b = 447;
         c = 585;
        if (success)
    {
         createjs.Tween.get(player1bar[1], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.y_c2_max[0]*181}, 2000);
    }
     }
     else if(a[i] === 2 )
     {
         b = 814;
         c = 585;
        if (success)
    {
          createjs.Tween.get(player1bar[2], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.y_c3_max[0]*181}, 2000);
    }
     }
    
 }
 
 else if (battlelogs[z+3][0] !== start.player && battlelogs[z+4][i] === "Enemy" && stunned === false)
 {
     console.log("Hey this skill is 4;");
     if(battlelogs[z+3][1] === 0 )
     {
         b =75;
         c = 50;
     
     }
     else if(battlelogs[z+3][1] === 1 )
     {
         b = 447;
         c = 50;
     
     }
     else if(battlelogs[z+3][1] === 2 )
     {
         b = 814;
         c = 50;
     }
     success = false;
 }
 
 else
 {
     console.log("Hey this skill is 5;");
   if (battlelogs[z+4][i+3] === "Block")
  {
      success = false;
  }
  
      if(a[i] === 0 )
     {
         b =75;
         c = 585;
    if (success)
    {
       createjs.Tween.get(player1bar[0], {loop: false})
       .wait(100)
	   .to({w:battlelogs[z+2][i]/start.y_c1_max[0]*181}, 2000); 
    }
         
     }
     else if(a[i] === 1 )
     {
    
         b = 447;
         c = 585;
    if (success)
    {
         createjs.Tween.get(player1bar[1], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.y_c2_max[0]*181}, 2000);
    }
     }
     else if(a[i] === 2 )
     {
         b = 814;
         c = 585;
         if (success)
    {
          createjs.Tween.get(player1bar[2], {loop: false})
          .wait(100)
	      .to({w:battlelogs[z+2][i]/start.y_c3_max[0]*181}, 2000);
    }
     }
 }
 
 if (success)
 {
      switch(display)
     {
         case "Strength":
             
         var data = {
    images: [queue.getResult('strengthanimation')],
    frames: {width:100, height:100},

    animations: {
        run:[1,4],
        speed: 0.1,
        
    }
};
spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b;
 animation.y = c;
createjs.Tween.get(animation, {loop: false})
.to({ x: b-23,y: c-15}, 300, createjs.Ease.linear) //5
          .to({ x: b-43,y: c-35}, 300, createjs.Ease.linear)//10
          .to({ x: b-38,y: c+5}, 300, createjs.Ease.linear)//10
          .to({ x: b-23,y: c-10}, 300, createjs.Ease.linear)//10
          .to({ x: b-6,y: c+ 5}, 300, createjs.Ease.linear)//10
          .to({ alpha:0 }, 200, createjs.Ease.linear) //5
          
          
           createjs.Sound.play("strengthsound", {loop: 1,volume: 0.01});
         break;
         
         case "Ki":
         var data = {
    images: [queue.getResult('kianimation')],
    frames: {width:100, height:100},

    animations: {
       run:[1,37],
       //run:[1,33],
        speed: 0.1,
        
    }
};
 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
  animation.x = b;
 animation.y = c;
createjs.Tween.get(animation, {loop: false})
.to({ x: b-12,y: c-20 }, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5


  createjs.Sound.play("kisound", {loop: 0,volume: 0.01});    
         break;
         case "Power-Up":
         var data = {
    images: [queue.getResult('powerUpanimation')],
    frames: {width:102, height:102},

    animations: {
       run:[1,17],
       //run:[1,33],
        speed: 0.1,
        
    }
};
spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b-6;
 animation.y = c;
 createjs.Tween.get(animation, {loop: false})
 .to({ x: b-6,y: c }, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5

  createjs.Sound.play("powerdownsound", {loop: 1,volume: 0.01});    
         break;
         
         case "Power-Down":
         var data = {
    images: [queue.getResult('powerDownanimation')],
    
    frames: {width:95, height:95},

    animations: {
       run:[1,16],
       //run:[1,33],
        speed: 0.1,
        
    }
};

 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b+5;
 animation.y = c;
 createjs.Tween.get(animation, {loop: false})
 .to({ x: b+5,y: c+20 }, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5

 
  createjs.Sound.play("powerdownsound", {loop: 1,volume: 0.01});    
         break;
         
         case "Affliction":
         var data = {
    images: [queue.getResult('Afflictionanimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,12],
       //run:[1,33],
        speed: 0.1,
        
        
    }

}

 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b+2;
 animation.y = c-5;
 createjs.Tween.get(animation, {loop: false})
 .to({ x: b,y: c-5 }, 1400, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 

createjs.Sound.play("Afflictionsound", {loop: 1,volume: 0.01});    
         break;
         
          case "Defensive":
             
         var data = {
    images: [queue.getResult('defenseanimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,16],
       //run:[1,33],
        speed: 0.1,
        
        
    }

}

 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = b+2;
 animation.y = c-5;
 createjs.Tween.get(animation, {loop: false})
 .to({ x: b,y: c-5 }, 1100, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 

createjs.Sound.play("defensesound", {loop: 0});    
         break;
         
         default:
             
         break;
         
     }
}
     if (battlelogs[z+4][i+3] === "Stunned")
     
 {
    
    var data = {
    images: [queue.getResult('stunnedanimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,39],
       //run:[1,33],
        speed: 0.1,
        
        
    }

}

 spriteSheet = new createjs.SpriteSheet(data);
 animationDefense = new createjs.Sprite(spriteSheet, "run");
 animationDefense.x = b;
 animationDefense.y = c-5;
 createjs.Tween.get(animationDefense, {loop: false})
 .to({ x: b,y: c-5}, 1100, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 

createjs.Sound.play("stunnedsound", {loop: 1});  
stage.addChild(animationDefense);  

 }
else if (battlelogs[z+4][i+3] === "Counter")
{
          var data = {
    images: [queue.getResult('counteranimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,16],
       //run:[1,33],
        speed: 0.1,
        
        
    }

}



 spriteSheet = new createjs.SpriteSheet(data);
 animationDefense = new createjs.Sprite(spriteSheet, "run");
 animationDefense.x = b;
 animationDefense.y = c-5;
 createjs.Tween.get(animationDefense, {loop: false})
 .to({ x: b,y: c-5}, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 

createjs.Sound.play("defensesound", {loop: 0});  
stage.addChild(animationDefense);
}

else if (battlelogs[z+4][i+3] === "Block")
{
          var data = {
    images: [queue.getResult('defenseanimation')],
    frames: {width:95, height:95},

    animations: {
       run:[1,17],
       //run:[1,33],
        speed: 0.1,
        
        
    }

}



 spriteSheet = new createjs.SpriteSheet(data);
 animationDefense = new createjs.Sprite(spriteSheet, "run");
 animationDefense.x = b;
 animationDefense.y = c-5;
 createjs.Tween.get(animationDefense, {loop: false})
 .to({ x: b,y: c-5}, 1500, createjs.Ease.linear) //5
 .to({ alpha:0 }, 200, createjs.Ease.linear) //5
 

createjs.Sound.play("defensesound", {loop: 0});  
stage.addChild(animationDefense);
}
     
       stage.addChild(animation);
 }



 
 
function itemSelected(num)
{
     createjs.Sound.play("select", {loop: 0,volume:0.1});
  
  console.log("Item Selected");
 if (start.y_u_cooldown > 0 && num === 1)
     {
         return 0;
     }
 else if (num === 1)
 {
     skillSelected(4,0,start.y_u_item,false);
     
 }
 else
 {
     skillSelected(5,0,start.y_u_item,false);
 }
 

 
}

function avatershow(num)
{
     createjs.Sound.play("select", {loop: 0,volume:0.1});
   stage.removeChild(descriptionText1); 

   
    stage.removeChild(in_gamehold);
    stage.removeChild(in_userhold);
    stage.removeChild(in_skillshold);
 
 stage.removeChild(in_effectshold);
stage.removeChild(effect_text);
stage.removeChild(effect_box);

  
 
  stage.removeChild(skills1);  
 stage.removeChild(skills2);  
 stage.removeChild(skills3);   
 stage.removeChild(skills4);   
 stage.removeChild(skills5); 
skills1.removeAllEventListeners();
 skills2.removeAllEventListeners();
 skills3.removeAllEventListeners();
 skills4.removeAllEventListeners();
 skills5.removeAllEventListeners();
 
 stage.removeChild(cooldown1text);
 stage.removeChild(cooldown2text);
 stage.removeChild(cooldown3text);
 stage.removeChild(cooldown4text);
  stage.removeChild(cooldown5text);
 stage.removeChild(cooldown1);
 stage.removeChild(cooldown2);
 stage.removeChild(cooldown3);
 stage.removeChild(cooldown4);
  stage.removeChild(cooldown5);
 stage.removeChild(characterInfo);
  stage.removeChild(descriptionText1);
  stage.removeChild(user_item);
stage.removeChild(statsText);
stage.removeChild(p1leveltext1);


    stage.removeChild(stats[0]);
    stage.removeChild(stats[1]);
    stage.removeChild(stats[2]);
    stage.removeChild(stats[3]);
 
 
 
  P1triangle1.visible= false;
 P1triangle2.visible= false;
 P1triangle3.visible= false;
 P2triangle1.visible= false;
 P2triangle2.visible= false;
 P2triangle3.visible= false;
 
 P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;
 
 p1character1.active = false;
 p1character2.active = false;
 p1character3.active = false;
 var a,b,c;


  switch(num)
{
    case 1:
     a = user.avater;
     b = user.username;
     c = "Rank: " + user.rank + "\n\nWins: " + user.wins + "\n\nLosses:" + user.losses + "\n\nStreak:  " + user.streak + "\n\nPlanet:  " + user.clan;
p1leveltext1.text = user.rank;
    break;
    
    case 2:
     a = moo.avater;
     b = moo.username;
     c = "Rank: " + moo.rank + "\n\nWins: " + moo.wins + "\n\nLosses: " + moo.losses + "\n\nStreak:  " + moo.streak + "\n\nPlanet:  " + moo.clan;
     p1leveltext1.text = moo.rank;
    break;
}
 Number(start.y_u_cooldown);

nameText.text = b;  


//Updates Description


descriptionText1.text = c;



stage.addChild(in_gamehold);
stage.addChild(p1leveltext1);
stage.addChild(descriptionText1); 
stage.addChild(nameText);

}

//This is for player 1 characters selected

function p1CharacterSelected(num1,num2)
{
     createjs.Sound.play("select", {loop: 0,volume:0.1});
   stage.removeChild(descriptionText1); 

 
   
    stage.removeChild(in_gamehold);
    stage.removeChild(in_skillshold);
    stage.removeChild(in_userhold);
 
   
   stage.removeChild(characterInfo);
 
  stage.removeChild(skills1);  
 stage.removeChild(skills2);  
 stage.removeChild(skills3);   
 stage.removeChild(skills4);   
 stage.removeChild(skills5); 

 
 stage.removeChild(cooldown1text);
 stage.removeChild(cooldown2text);
 stage.removeChild(cooldown3text);
 stage.removeChild(cooldown4text);
 stage.removeChild(cooldown5text);
 stage.removeChild(cooldown1);
 stage.removeChild(cooldown2);
 stage.removeChild(cooldown3);
 stage.removeChild(cooldown4);
 stage.removeChild(cooldown5);
 stage.removeChild(in_effectshold);
stage.removeChild(effect_text);
stage.removeChild(effect_box);
 stage.removeChild(p1leveltext1);
  stage.removeChild(user_item);
stage.removeChild(statsText);


    stage.removeChild(stats[0]);
    stage.removeChild(stats[1]);
    stage.removeChild(stats[2]);
    stage.removeChild(stats[3]);
 
 
 
  P1triangle1.visible= false;
 P1triangle2.visible= false;
 P1triangle3.visible= false;
 P2triangle1.visible= false;
 P2triangle2.visible= false;
 P2triangle3.visible= false;

var level;
switch(num1)
{
    case 1:
    p1character1.active = true;
    p1character2.active = false;
    p1character3.active = false;
    trans = start.y_c1_transformation;
   
    break;
    
    case 2:

    p1character1.active = false;
    p1character2.active = true;
    p1character3.active = false;
    trans = start.y_c2_transformation;
    
    break;
    
    case 3:
 
    p1character1.active = false;
    p1character2.active = false;
    p1character3.active = true;
    trans = start.y_c3_transformation;
    
    break;
}



//num1= Which box was selected
//num2= Character Code
//num3 = Is this Player 1(true) or Player 2 (false)
//num4 = Is this a character? Yes(true) No(false)
//zzz
    num2 = characterList(num2,[1,trans]);
    name = num2[2];
    cD = num2[0];
var effects_current = "";
var dummy;

  switch(num1)
  {
      case 1:
        createjs.Tween.get(statsStrength, {loop: false})
	      .to({w:start.y_c1_strength/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsSpeed, {loop: false})
	      .to({w:start.y_c1_speed/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsKi, {loop: false})
	      .to({w:start.y_c1_ki /150 * 200}, 1000);
	      
	          createjs.Tween.get(statsDefense, {loop: false})
	      .to({w:start.y_c1_defense /150 * 200}, 1000);
    

    statsText.text = "+" + start.y_c1_strength + "\n+" + start.y_c1_speed+ "\n+" + start.y_c1_ki + "\n+" + start.y_c1_defense;
 
      nameText.text =  name;
      dummy = p1character1;
       level = start.y_c1_experience;
      if (trans === "none" || trans === "bge-t"){num2 = p1character1.c;} else {num2 = trans;}
      break;
      
      case 2:
        
    createjs.Tween.get(statsStrength, {loop: false})
      
	      .to({w:start.y_c2_strength/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsSpeed, {loop: false})
	      .to({w:start.y_c2_speed/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsKi, {loop: false})
	      .to({w:start.y_c2_ki /150 * 200}, 1000);
	      
	          createjs.Tween.get(statsDefense, {loop: false})
	      .to({w:start.y_c2_defense /150 * 200}, 1000);
    
     statsText.text = "+" + start.y_c2_strength + "\n+" + start.y_c2_speed + "\n+" + start.y_c2_ki + "\n+" + start.y_c2_defense;
     
       dummy = p1character2;
     nameText.text =  name;
      if (trans === "none" || trans === "bge-t"){num2 = p1character2.c;} else {num2 = trans;}
      level = start.y_c2_experience;
      break;
      
      case 3:
     createjs.Tween.get(statsStrength, {loop: false})
      
	      .to({w:start.y_c3_strength/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsSpeed, {loop: false})
	      .to({w:start.y_c3_speed/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsKi, {loop: false})
	      .to({w:start.y_c3_ki /150 * 200}, 1000);
	      
	          createjs.Tween.get(statsDefense, {loop: false})
	      .to({w:start.y_c3_defense /150 * 200}, 1000);
    
  
   statsText.text = "+" + start.y_c3_strength   + "\n+" + start.y_c3_speed + "\n+" + start.y_c3_ki + "\n+" + start.y_c3_defense;
   
       dummy = p1character3;
       nameText.text =  name;
        if (trans === "none" || trans === "bge-t"){num2 = p1character3.c;} else {num2 = trans;}
        level = start.y_c3_experience;
       break;
      
      default:
     
  }
  

  if(dummy.stunned[0] != 0)
      {
          effects_current = effects_current + "This character is Fully stunned for " + dummy.stunned[0] + " turn(s).\n";
      }
      if(dummy.stunned[1] != 0)
      {
          effects_current = effects_current + "This character Ki skills stunned for " + dummy.stunned[1] + " turn(s).\n";
      }
      if(dummy.stunned[2] != 0)
      {
          effects_current = effects_current + "This character Strength skills stunned for " + dummy.stunned[2] + " turn(s).\n";
      }
      if(dummy.stunned[3] != 0)
      {
          effects_current = effects_current + "This character Friendly skills stunned for " + dummy.stunned[3] + " turn(s).\n";
      }
      if(dummy.block[0] != 0)
      {
          effects_current = effects_current + "This character has a Full block for " + dummy.block[0] + " turn(s).\n";
      }
      if(dummy.block[1] != 0)
      {
          effects_current = effects_current + "This character has a Ki block for " + dummy.block[1] + " turn(s).\n";
      }
      if(dummy.block[2] != 0)
      {
          effects_current = effects_current + "This character has a Strength block for " + dummy.block[2] + " turn(s).\n";
      }
      if(dummy.block[3] != 0)
      {
          effects_current = effects_current + "This character ignores friendly skills for " + dummy.block[3] + " turn(s).\n";
      }
      if(dummy.block[4] != 0)
      {
          effects_current = effects_current + "This character ignores friendly skills for " + dummy.block[4] + " turn(s).\n";
      }
      if(dummy.conditions[0] != 0)
      {
          effects_current = effects_current + "This character is Dazed for " + dummy.conditions[0] + " turn(s).\n";
      }
      if (dummy.effects.length > 0)
      {
          var len = dummy.effects.length;
          var e;
          
          count = 1;
          for (var i = 0; i < len; i++) {
              
              if (dummy.effects[i] === dummy.effects[i+1])
              {
                  count += 1;
              }
              else if( count > 1)
              {
               
                  e = skillList(dummy.effects[i],[0]);
              effects_current = effects_current + "Effected by: " + e[5] + ". Stacks:" + count + "\n"; 
                 count = 1;
              }
              else
              {
              count = 1;
              e = skillList(dummy.effects[i],[0]);
              effects_current = effects_current + "Effected by: " + e[5] + ".\n"; 
              
              
              }
              
              
          }
         
      }

   
  
  stage.addChild(in_gamehold);
  stage.addChild(in_skillshold);
  


//Updates Description


descriptionText1.text = cD;
stage.addChild(descriptionText1); 


effect_text.text = effects_current.toString();
effect_box.image = queue.getResult(num2); 

stage.addChild(in_effectshold);
stage.addChild(effect_box);
stage.addChild(effect_text);
stage.addChild(nameText);
p1leveltext1.text = level;
 stage.addChild(p1leveltext1);
 stage.addChild(stats[0]);
    stage.addChild(stats[1]);
    stage.addChild(stats[2]);
    stage.addChild(stats[3]);
    stage.addChild(statsText);
   
 
 stage.addChild(user_item);
  user_item.removeAllEventListeners();
    user_item.addEventListener("click",function() {itemSelected(1); });


if (num1 === 1 && start.y_c1_health != 0)
{
updateMoves(1);
}

else if (num1 === 2 && start.y_c2_health != 0)
{
updateMoves(2);
}

else if (num1 === 3 && start.y_c3_health != 0 )
{
updateMoves(3);
}


}

function p2CharacterSelected(num1,num2)
{
     createjs.Sound.play("select", {loop: 0,volume:0.1});
   stage.removeChild(descriptionText1); 

  //stage.removeChild(skillinfo);
 
 
   
 stage.removeChild(skills1);  
 stage.removeChild(skills2);  
 stage.removeChild(skills3);   
 stage.removeChild(skills4);   
 stage.removeChild(skills5); 
 
 stage.removeChild(cooldown1text);
 stage.removeChild(cooldown2text);
 stage.removeChild(cooldown3text);
 stage.removeChild(cooldown4text);
 stage.removeChild(cooldown5text);
 stage.removeChild(cooldown1);
 stage.removeChild(cooldown2);
 stage.removeChild(cooldown3);
 stage.removeChild(cooldown4);
 stage.removeChild(cooldown5);


 
 stage.removeChild(in_gamehold);
 stage.removeChild(in_userhold);
 stage.removeChild(in_skillshold);
 

 
  
stage.removeChild(characterInfo);
 stage.removeChild(in_effectshold);
stage.removeChild(effect_text);
stage.removeChild(effect_box);
 stage.removeChild(p1leveltext1);
stage.removeChild(user_item);

stage.removeChild(stats[0]);
    stage.removeChild(stats[1]);
    stage.removeChild(stats[2]);
    stage.removeChild(stats[3]);
stage.removeChild(statsText);


//num1= Which box was selected
//num2= Character Code
//num3 = Is this Player 1(true) or Player 2 (false)
//num4 = Is this a character? Yes(true) No(false)

 P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;
  P1triangle1.visible= false;
 P1triangle2.visible= false;
 P1triangle3.visible= false;
 P2triangle1.visible= false;
 P2triangle2.visible= false;
 P2triangle3.visible= false;
 
 var level;
 switch(num1)
{
    case 1:

    trans = start.o_c1_transformation;
    level = start.o_c1_experience;
    break;
    
    case 2:
    trans = start.o_c2_transformation;
    level = start.o_c2_experience;
    break;
    
    case 3:
   
    trans = start.o_c3_transformation;
    level = start.o_c3_experience;
    break;
}
var fake = num2;
num2 = characterList(num2,[1,trans]);

  name = num2[2];
    cD = num2[0];
var effects_current = "";
var dummy;

switch(num1)
  {
      case 1:
         createjs.Tween.get(statsStrength, {loop: false})
	      .to({w:start.o_c1_strength/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsSpeed, {loop: false})
	      .to({w:start.o_c1_speed/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsKi, {loop: false})
	      .to({w:start.o_c1_ki /150 * 200}, 1000);
	      
	          createjs.Tween.get(statsDefense, {loop: false})
	      .to({w:start.o_c1_defense /150 * 200}, 1000);
	      
	 statsText.text = "+" + start.o_c1_strength + "\n+" + start.o_c1_speed + "\n+" + start.o_c1_ki + "\n+" + start.o_c1_defense ;
       nameText.text =  name;
       if (trans === "none" || trans === "bge-t"){num2 = fake;} else {num2 = trans;}
       dummy = p2character1;
      break;
      
      case 2:
        createjs.Tween.get(statsStrength, {loop: false})
	      .to({w:start.o_c2_strength/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsSpeed, {loop: false})
	      .to({w:start.o_c2_speed/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsKi, {loop: false})
	      .to({w:start.o_c2_ki /150 * 200}, 1000);
	      
	          createjs.Tween.get(statsDefense, {loop: false})
	      .to({w:start.o_c2_defense /150 * 200}, 1000);
	      
	       statsText.text = "+" + start.o_c2_strength + "\n+" + start.o_c2_speed + "\n+" + start.o_c2_ki + "\n+" + start.o_c2_defense;
	      
      nameText.text =  name;
      dummy = p2character2;
      if (trans === "none" || trans === "bge-t"){num2 = fake;} else {num2 = trans;}
      break;
      
      case 3:
       createjs.Tween.get(statsStrength, {loop: false})
	      .to({w:start.o_c3_strength/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsSpeed, {loop: false})
	      .to({w:start.o_c3_speed/150 * 200}, 1000);
	      
	          createjs.Tween.get(statsKi, {loop: false})
	      .to({w:start.o_c3_ki /150 * 200}, 1000);
	      
	          createjs.Tween.get(statsDefense, {loop: false})
	      .to({w:start.o_c3_defense /150 * 200}, 1000);
	      
	      
       statsText.text = "+" + start.o_c3_strength + "\n+" + start.o_c3_speed +  "\n+" + start.o_c3_ki + "\n+" + start.o_c3_defense;
     nameText.text =  name;
     dummy = p2character3;
     if (trans === "none" || trans === "bge-t"){num2 = fake;} else {num2 = trans;}
      break;
      
      default:
     
  }

  stage.addChild(in_gamehold);
  stage.addChild(in_skillshold);
  

  
  
  if (num1 === 1)
{
updateMoves(4);
}

else if (num1 === 2)
{
updateMoves(5);
}

else if (num1 === 3)
{
updateMoves(6);
}

if(dummy.stunned[0] != 0)
      {
          effects_current = effects_current + "This character is Fully stunned for " + dummy.stunned[0] + " turn(s).\n";
      }
      if(dummy.stunned[1] != 0)
      {
          effects_current = effects_current + "This character Ki skills stunned for " + dummy.stunned[1] + " turn(s).\n";
      }
      if(dummy.stunned[2] != 0)
      {
          effects_current = effects_current + "This character Strength skills stunned for " + dummy.stunned[2] + " turn(s).\n";
      }
      if(dummy.stunned[3] != 0)
      {
          effects_current = effects_current + "This character Friendly skills stunned for " + dummy.stunned[3] + " turn(s).\n";
      }
      if(dummy.block[0] != 0)
      {
          effects_current = effects_current + "This character has a Full block for " + dummy.block[0] + " turn(s).\n";
      }
      if(dummy.block[1] != 0)
      {
          effects_current = effects_current + "This character has a Ki block for " + dummy.block[1] + " turn(s).\n";
      }
      if(dummy.block[2] != 0)
      {
          effects_current = effects_current + "This character has a Strength block for " + dummy.block[2] + " turn(s).\n";
      }
      if(dummy.block[3] != 0)
      {
          effects_current = effects_current + "This character has a Power-Down block for " + dummy.block[3] + " turn(s).\n";
      }
      if(dummy.block[4] != 0)
      {
          effects_current = effects_current + "This character ignores friendly skills for " + dummy.block[4] + " turn(s).\n";
      }
      if(dummy.conditions[0] != 0)
      {
          effects_current = effects_current + "This character is Dazed for " + dummy.conditions[0] + " turn(s).\n";
      }
      if (dummy.effects.length > 0)
      {
          var len = dummy.effects.length;
          var e;
          count = 1;
          current = 0;
          for (var i = 0; i < len; i++) {
              if (dummy.effects[i] === dummy.effects[i+1])
              {
                  count += 1;
              }
              else if( count > 1)
              {
                  
                  e = skillList(dummy.effects[i],[0]);
              effects_current = effects_current + "Effected by: " + e[5] + ". Stacks:" + count + "\n"; 
              count = 1;
              }
              else
              {
              count = 1;
              e = skillList(dummy.effects[i],[0]);
              effects_current = effects_current + "Effected by: " + e[5] + ".\n"; 
              
              
              }
              
          }
          
          
      }
  
  //stage.addChild(characterInfo);


  
//Updates Description


descriptionText1.text = cD;
stage.addChild(descriptionText1); 

effect_text.text = effects_current;
effect_box.image = queue.getResult(num2); 

stage.addChild(in_effectshold);
stage.addChild(effect_box);
stage.addChild(effect_text);
stage.addChild(nameText);
p1leveltext1.text = level;
 stage.addChild(p1leveltext1);
 stage.addChild(user_item);

 stage.addChild(stats[0]);
    stage.addChild(stats[1]);
    stage.addChild(stats[2]);
    stage.addChild(stats[3]);
      stage.addChild(statsText);
moveNow = 0;
}

//This for skill selected
function skillSelected(num1,num2,num3,num4)
{
 createjs.Sound.play("select", {loop: 0,volume:0.1});

 P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;
 P1triangle1.visible= false;
 P1triangle2.visible= false;
 P1triangle3.visible= false;
 P2triangle1.visible= false;
 P2triangle2.visible= false;
 P2triangle3.visible= false;
 

stage.removeChild(in_gamehold);

stage.removeChild(in_userhold);

stage.addChild(in_gamehold);
//num1 = Character
//num2 = Box Number
//num3 = Skill Code

//num1= Which box was selected
//num3 = Skill Code
//num3 = Is this Player 1(true) or Player 2 (false)
//num4 = Is this a character? Yes(true) No(false)


var d;
var e = false;
var info;



if(num1 === 1 && p1character1.attacked === false && num4)
{
info = skillList(num3,[1,trans,p1effects1,p1character1]);
cD = info[3];bpNow = info[1];name = info[5];cooldownNow = info[2];energy = info[4];focus = info[9];target = info[7];stype = info[6];
if (start.y_c1_energy >= energy)
{
  info = skillUpdate(num1,num3);  
}
p1character1.box = num2 - 1;
characterInfo.text = "BP:" + bpNow + "\nEnergy:" + energy + "\nCooldown:" + cooldownNow + "\nFocus:" + target + "\nType:" + stype;
e = true;
}

else if(num1 === 2 && p1character2.attacked === false && num4)
{
info = skillList(num3,[1,trans,p1effects2,p1character2]);
cD = info[3];bpNow = info[1];name = info[5];cooldownNow = info[2];energy = info[4];focus = info[9];target = info[7];stype = info[6];
    if (start.y_c2_energy >= energy)
{
  skillUpdate(num1,num3);  
}

    p1character2.box = num2 - 1;
 characterInfo.text = "BP:" + bpNow + "\nEnergy:" + energy + "\nCooldown:" + cooldownNow + "\nFocus:" + target + "\nType:" + stype;
 e = true;
}

else if(num1 === 3 && p1character3.attacked === false && num4)
{
info = skillList(num3,[1,trans,p1effects3,p1character3]);
cD = info[3];bpNow = info[1];name = info[5];cooldownNow = info[2];energy = info[4];focus = info[9];target = info[7];stype = info[6];
    if (start.y_c3_energy >= energy)
{
  skillUpdate(num1,num3);  
}
    p1character3.box = num2 - 1;
 characterInfo.text = "BP:" + bpNow + "\nEnergy:" + energy + "\nCooldown:" + cooldownNow + "\nFocus:" + target + "\nType:" + stype;
 e = true;
}

else if(num1 === 4)
{
     d = itemList(start.y_u_item);
     cD = d[1];
     bpNow = d[3];
     cooldownNow = d[2];
     name = d[0];
     target = d[5];
     stype = d[4];
     num3 = "green";
 characterInfo.text = "BP:" + bpNow + "\nCooldown:" + cooldownNow + "\nFocus:" + target + "\nType:" + stype + "\nAmount:" + start.y_u_amount;
 if (p1.attacked === false)
 {
     console.log("Hello, Friend");
     p1character1.active = false;
p1character2.active = false;
p1character3.active = false;
     itemUpdate();
   
 }
}

else if (num1 === 5)
{
     d = itemList(start.o_u_item);
     cD = d[1];
     bpNow = d[3];
     cooldownNow = d[2];
     name = d[0];
     target = d[5];
     stype = d[4];
     num3 = "green";
 characterInfo.text = "BP:" + bpNow + "\nCooldown:" + cooldownNow + "\nFocus:" + target + "\nType:" + stype + "\nAmount:" + start.o_u_amount;
 
}

else
{
    
if (num1 === 1)
{
    info =  skillList(num3,[1,trans,p2effects1,p2character1]);
}
else if (num1 === 2)
{
        info =  skillList(num3,[1,trans,p2effects2,p2character2])
}

else
{
    console.log("I'M Character 3");
    console.log(p2character3);
    info =  skillList(num3,[1,trans,p2effects3,p2character3])
}
   
cD = info[3];bpNow = info[1];name = info[5];cooldownNow = info[2];energy = info[4];focus = info[9];target = info[7];stype = info[6];
 characterInfo.text = "BP:" + bpNow + "\nEnergy:" + energy + "\nCooldown:" + cooldownNow + "\nFocus:" + target + "\nType:" + stype;
 e = true;
}
//moo5


//Don't Touch
nameText.text = name;  

stage.addChild(nameText);
stage.removeChild(descriptionText1); 


//Updates Description

descriptionText1.text = cD;
stage.addChild(descriptionText1); 

//Updates pic

effect_box.image = queue.getResult(num3); 


stage.addChild(characterInfo);
stage.setChildIndex(effect_box, stage.getNumChildren()-1);


 stage.addChild(user_item);
 user_item.removeAllEventListeners();
    user_item.addEventListener("click",function() {itemSelected(2); });

}

function skillUpdate(num1,num3)
{
//Blinking Boxes and Determine BP
block1 = false;
block2 = false;
block3 = false;
stun = false;



 switch (stype)
{
    
    
    
    
    case "Strength":
    if (start.o_c1_block[2] === 0 && start.o_c1_block[0] === 0)  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.o_c2_block[2] === 0 && start.o_c2_block[0] === 0)  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.o_c3_block[2] === 0 && start.o_c3_block[0] === 0)  
    {block3 = false;}
    else
    {block3 = true;}
    
    if(num1 === 1 &&  p1character1.stunned[0] === 0 && p1character1.stunned[2] === 0 )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0 && p1character2.stunned[2] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 && p1character3.stunned[2] === 0)
    {
        stun = false;
    }
    else
    {
        stun = true;
    }
    break;
    
    
    case "Ki":
    if (start.o_c1_block[0] === 0 && start.o_c1_block[1] === 0)  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.o_c2_block[0] === 0 && start.o_c2_block[1] === 0)  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.o_c3_block[0] === 0 && start.o_c3_block[1] === 0)  
    {block3 = false;}
    else
    {block3 = true;}
 
    if(num1 === 1 &&  p1character1.stunned[0] === 0 && p1character1.stunned[1] === 0  )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0 && p1character2.stunned[1] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 && p1character3.stunned[1] === 0 )
    {
        stun = false;
    }
    else
    {
        stun = true;
    }
    break;
    
    case "Defensive":
    if (start.y_c1_block[4] === 0)  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.y_c2_block[4] === 0  )  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.y_c3_block[4] === 0 )  
    {block3 = false;}
    else
    {block3 = true;}
    if(num1 === 1 && p1character1.stunned[0] === 0 && p1character1.stunned[3] === 0 )
    {
     stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0 && p1character2.stunned[3] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 && p1character3.stunned[3] === 0 )
    {
        stun = false;
    }
     else
    {
        stun = true;
    }
    break;
    
    case "Power-Up":
    if (start.y_c1_block[4] === 0)  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.y_c2_block[4] === 0  )  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.y_c3_block[4] === 0 )  
    {block3 = false;}
    else
    {block3 = true;}
    if(num1 === 1 && p1character1.stunned[0] === 0 && p1character1.stunned[3] === 0 )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0 && p1character2.stunned[3] === 0)
    {
        stun = false;
       
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 && p1character3.stunned[3] === 0)
    {
        stun = false;
    }
     else
    {
        stun = true;
    }
    break;
    
    case "Restoration":
    if (start.y_c1_block[4] === 0)  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.y_c2_block[4] === 0  )  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.y_c3_block[4] === 0 )  
    {block3 = false;}
    else
    {block3 = true;}
    if(num1 === 1 && p1character1.stunned[0] === 0 && p1character1.stunned[3] === 0 && !block1)
    {
      
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0 && p1character2.stunned[3] === 0 && !block2)
    {
        stun = false;
       
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 && p1character3.stunned[3] === 0 && !block3)
    {
        stun = false;
     
    }
     else
    {
        stun = true;
      
    }
    break;
    
    case "Power-Down":
     if(num1 === 1 && p1character1.stunned[0] === 0 )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 )
    {
        stun = false;

    }
     else
    {
        stun = true;
    }
    break;
    
    case "Affliction":
        if (start.o_c1_block[0] === 0)  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.o_c2_block[0] === 0  )  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.o_c3_block[0] === 0 )  
    {block3 = false;}
    else
    {block3 = true;}
     if(num1 === 1 && p1character1.stunned[0] === 0  )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0   )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 )
    {
        stun = false;

    }
     else
    {
        stun = true;
    }
    break;
    
      case "Transformation":
         if (start.y_c1_block[4] === 0)  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.y_c2_block[4] === 0  )  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.y_c3_block[4] === 0 )  
    {block3 = false;}
    else
    {block3 = true;}
    if(num1 === 1 && p1character1.stunned[0] === 0 && p1character1.stunned[3] === 0 )
    {
      
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0 && p1character2.stunned[3] === 0 )
    {
        stun = false;
       
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 && p1character3.stunned[3] === 0 )
    {
        stun = false;
    }
     else
    {
        stun = true;
    }
}


//start.o_c1_block === 0 
//Type = Single Enemy ,All Enemies ,Self,One Ally

if (focus === 1  && bpNow <= start.bp && !stun )
{
 if (start.o_c1_health > 0  && !block1 )  
 {
 P2BlinkingBox1.visible = true;
 P2triangle1.visible= true;
 }
 if (start.o_c2_health > 0 && !block2)
 {
 P2BlinkingBox2.visible = true;
 P2triangle2.visible= true;
 }
 if (start.o_c3_health > 0 && !block3)
 {
 P2BlinkingBox3.visible = true;
 P2triangle3.visible= true;
 }
} 

else if  (focus === 2  && bpNow <= start.bp && !stun)
{
 if (start.o_c1_health > 0 && !block1)  
 {
 P2BlinkingBox1.visible = true;
 P2triangle1.visible= true;
 }
 if (start.o_c2_health > 0 && !block2)
 {
 P2BlinkingBox2.visible = true;
 P2triangle2.visible= true;
 }
 if (start.o_c3_health > 0 && !block3)
 {
 P2BlinkingBox3.visible = true;
 P2triangle3.visible= true;
 }
}    

else if (focus === 3 && bpNow <= start.bp && !stun)
{
   switch(num1) 
   {
   case 1:
   P1BlinkingBox1.visible = true;  
   P1triangle1.visible= true;
   break;

    case 2:
    P1BlinkingBox2.visible = true;
    P1triangle2.visible= true;
    break;
     
    case 3:
    P1BlinkingBox3.visible = true;  
    P1triangle3.visible= true;
    break;
   }
}

else if (focus === 4  && bpNow <= start.bp && !stun)
{
     switch(num1) 
   {
   case 1:
   if (start.y_c2_health !== 0 && !block2)
   {
   P1BlinkingBox2.visible = true;
   P1triangle2.visible= true;
   }
   if (start.y_c3_health !== 0 && !block3)
   {
   P1BlinkingBox3.visible = true;
   P1triangle3.visible= true;
   }
   break;

    case 2:
    if (start.y_c1_health !== 0 && !block1)
   {
   P1BlinkingBox1.visible = true;
   P1triangle1.visible= true;
   }
   if (start.y_c3_health !== 0 && !block3)
   {
   P1BlinkingBox3.visible = true;
   P1triangle3.visible= true;
   }
    break;
    
    case 3:
     if (start.y_c1_health !== 0 && !block1)
   {
   P1BlinkingBox1.visible = true;
   P1triangle1.visible= true;
   }
   if (start.y_c2_health !== 0 && !block2)
   {
   P1BlinkingBox2.visible = true;
   P1triangle2.visible= true;
   }
    break;
   }
}

else if (focus === 5  && bpNow <= start.bp && !stun)
{
     if (start.y_c1_health !==  0 && !block1)  //
 {
 P1BlinkingBox1.visible = true;
 P1triangle1.visible= true;
 }
 if (start.y_c2_health !==  0 && !block2)
 {
 P1BlinkingBox2.visible = true;
 P1triangle2.visible= true;
 }
 if (start.o_c3_health !==  0 && !block3)
 {
 P1BlinkingBox3.visible = true;
 P1triangle3.visible= true;
 }
}
else if (focus === 6 && bpNow <= start.bp && !stun)
{

   if (start.y_c1_health !== 0 && !block1)
   {
   P1BlinkingBox1.visible = true;
   P1triangle1.visible= true;
   }
   if (start.y_c2_health !== 0 && !block2)
   {
   P1BlinkingBox2.visible = true;
   P1triangle2.visible= true;
   }
   if (start.y_c3_health !== 0 && !block3)
   {
   P1BlinkingBox3.visible = true;
   P1triangle3.visible= true;
   }
}
else
{
    
}

//Current Info
if (!stun)
{
   moveNow = num3;  
  
}
 


}

function itemUpdate()
{
if (bpNow <= start.bp)
{
    

    if (start.y_c1_health !==  0 && p1character1.block[4] === 0 )  //
 {
 P1BlinkingBox1.visible = true;
 P1triangle1.visible= true;
 }
 if (start.y_c2_health !==  0 && p1character2.block[4] === 0)
 {
 P1BlinkingBox2.visible = true;
 P1triangle2.visible= true;
 }
 if (start.y_c3_health !==  0 && p1character3.block[4] === 0)
 {
 P1BlinkingBox3.visible = true;
 P1triangle3.visible= true;
 }
}
}

function blinkingEffect(num1)
{
   createjs.Sound.play("select", {loop: 0,volume:0.1});
  P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;   
  P1triangle1.visible= false;
 P1triangle2.visible= false;
 P1triangle3.visible= false;
 P2triangle1.visible= false;
 P2triangle2.visible= false;
 P2triangle3.visible= false;
 
 var gain = bpNow;



var c;

if (p1character1.active)
{
    c = 1;
}
else if (p1character2.active)
{
    c = 2;
}

else if (p1character3.active)
{
    c = 3;
}

else
{
    c = 4;
}

//Type = Single Enemy ,All Enemies ,Self,One Ally, All Allies
if (focus === 2)
{
    var send = [-1,-1,-1];
 if (start.o_c1_health > 0 && !block1)  
 {
switch(c)
    {
        case 1:
         p2C1BoxUsed[0] = moveNow; 
p2Ch1boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[0]);
  send[0] = 0;
  
        break;
        
        case 2:
         p2C1BoxUsed[1] = moveNow; 
 p2Ch1boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[1]);
 send[0] = 1;
        break;
        
        case 3:
        p2C1BoxUsed[2] = moveNow;
p2Ch1boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[2]);
 send[0] = 2;
        break;
        
        case 4:
        
        break;
    }
 }
 
 if (start.o_c2_health > 0 && !block2)
 {
 switch(c)
    {
    case 1:
    p2C2BoxUsed[0] = moveNow; 
p2Ch2boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[0]);
 send[1] = 0;
    break;
    
    case 2:
         p2C2BoxUsed[1] = moveNow; 
    p2Ch2boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[1]);
 send[1] = 1;
    break;
    
    case 3:
         p2C2BoxUsed[2] = moveNow; 
   p2Ch2boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[2]);
 send[1] = 2;
    break;

}
 }
 if (start.o_c3_health > 0 && !block3)
 {
 switch(c)
{
    case 1:
    p2C3BoxUsed[0] = moveNow; 
 p2Ch3boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[0]);
send[2] = 0;
    break;
    
    case 2:
    p2C3BoxUsed[1] = moveNow;
p2Ch3boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[1]);
 send[2] = 1;
    break;
    
    case 3:
    p2C3BoxUsed[2] = moveNow;
p2Ch3boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[2]);
 send[2] = 2;
    break;
}
 }
 
 if (send[0] > -1)
 {
     p2Ch1boxes[send[0]].addEventListener("click",function() {cancel(7,send,c,gain); });
  
 }
  if (send[1] > -1)
 {
     p2Ch2boxes[send[1]].addEventListener("click",function() {cancel(7,send,c,gain); });
  
 }
  if (send[2] > -1)
 {
     p2Ch3boxes[send[2]].addEventListener("click",function() {cancel(7,send,c,gain); });
   
 }
 
}    

else if (focus === 5)
{
   
    var send = [-1,-1,-1];
    
 if (start.y_c1_health > 0 && !block1)  
 {
switch(c)
    {
        case 1:
         p1C1BoxUsed[0] = moveNow; 
p1Ch1boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[0]);
  send[0] = 0;

        break;
        
        case 2:
         p1C1BoxUsed[1] = moveNow; 
 p1Ch1boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[1]);
 send[0] = 1;

        break;
        
        case 3:
        p1C1BoxUsed[2] = moveNow;
p1Ch1boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[2]);
 send[0] = 2;

        break;
        
        case 4:
        
        break;
    }
 }
 
 if (start.y_c2_health > 0 && !block2)
 {
 switch(c)
    {
    case 1:
    p1C2BoxUsed[0] = moveNow; 
p1Ch2boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[0]);
 send[1] = 0;
    break;
    
    case 2:
         p1C2BoxUsed[1] = moveNow; 
    p1Ch2boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[1]);
 send[1] = 1;
    break;
    
    case 3:
         p1C2BoxUsed[2] = moveNow; 
   p1Ch2boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[2]);
 send[1] = 2;
    break;

}
 }
 if (start.y_c3_health > 0 && !block3)
 {
 switch(c)
{
    case 1:
    p1C3BoxUsed[0] = moveNow; 
 p1Ch3boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[0]);
send[2] = 0;
    break;
    
    case 2:
    p1C3BoxUsed[1] = moveNow;
p1Ch3boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[1]);
 send[2] = 1;
    break;
    
    case 3:
    p1C3BoxUsed[2] = moveNow;
p1Ch3boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[2]);
 send[2] = 2;
    break;
}
 }
 
 if (send[0] > -1)
 {
     p1Ch1boxes[send[0]].addEventListener("click",function() {cancel(8,send,c,gain); });
 }
  if (send[1] > -1)
 {
     p1Ch2boxes[send[1]].addEventListener("click",function() {cancel(8,send,c,gain); });
 }
  if (send[2] > -1)
 {
     p1Ch3boxes[send[2]].addEventListener("click",function() {cancel(8,send,c,gain); });
 }
 
//STop here
}

else
{
   if(moveNow !== 0 && num1 === 1)
{
 

switch(c)
{
 case 1:
 p1C1BoxUsed[0] = moveNow; 
 p1Ch1boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[0]);
 p1Ch1boxes[0].addEventListener("click",function() {cancel(num1,0,c,gain); }); 
 break;
 
 case 2:
 p1C1BoxUsed[1] = moveNow; 
 p1Ch1boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[1]); 
 p1Ch1boxes[1].addEventListener("click",function() {cancel(num1,1,c,gain); });
 break;
 
 case 3:
   p1C1BoxUsed[2] = moveNow; 
  p1Ch1boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[2]);
 p1Ch1boxes[2].addEventListener("click",function() {cancel(num1,2,c,gain); });
 break;
 
 
}
}

else if(moveNow !== 0 && num1 === 2)
{

    switch(c)
    {
        case 1:
        p1C2BoxUsed[0] = moveNow;
  p1Ch2boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[0]);
 p1Ch2boxes[0].addEventListener("click",function() {cancel(num1,0,c,gain); });
        break;
        
        case 2:
        p1C2BoxUsed[1] = moveNow;
  p1Ch2boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[1]);
 p1Ch2boxes[1].addEventListener("click",function() {cancel(num1,1,c,gain); });
        break;
        
        case 3:
        p1C2BoxUsed[2] = moveNow;
  p1Ch2boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[2]);
 p1Ch2boxes[2].addEventListener("click",function() {cancel(num1,2,c,gain); });
        break;
    }

}

else if (moveNow !== 0 && num1 === 3)
{
    
    switch(c)
    {
        case 1:
        p1C3BoxUsed[0] = moveNow;
 p1Ch3boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[0]);
 p1Ch3boxes[0].addEventListener("click",function() {cancel(num1,0,c,gain); });
        break;
        
        case 2:
         p1C3BoxUsed[1] = moveNow;
 p1Ch3boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[1]);
 p1Ch3boxes[1].addEventListener("click",function() {cancel(num1,1,c,gain); });
        break;
        
        case 3:
         p1C3BoxUsed[2] = moveNow;
 p1Ch3boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[2]);
 p1Ch3boxes[2].addEventListener("click",function() {cancel(num1,2,c,gain); });
        break;
    }

}
else if (moveNow !== 0 && num1 === 4)
{
    
    switch(c)
    {
        case 1:
         p2C1BoxUsed[0] = moveNow; 
p2Ch1boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[0]);
 p2Ch1boxes[0].addEventListener("click",function() {cancel(num1,0,c,gain); });
        break;
        
        case 2:
         p2C1BoxUsed[1] = moveNow; 
 p2Ch1boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[1]);
 p2Ch1boxes[1].addEventListener("click",function() {cancel(num1,1,c,gain); });
        break;
        
        case 3:
        p2C1BoxUsed[2] = moveNow;
p2Ch1boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[2]);
 p2Ch1boxes[2].addEventListener("click",function() {cancel(num1,2,c,gain); }); 
        break;
    }

}

else if (moveNow !== 0 && num1 === 5)
{
   
    switch(c)
    {
    case 1:
    p2C2BoxUsed[0] = moveNow; 
p2Ch2boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[0]);
 p2Ch2boxes[0].addEventListener("click",function() {cancel(num1,0,c,gain); });
    break;
    
    case 2:
         p2C2BoxUsed[1] = moveNow; 
    p2Ch2boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[1]);
 p2Ch2boxes[1].addEventListener("click",function() {cancel(num1,1,c,gain); });
    break;
    
    case 3:
         p2C2BoxUsed[2] = moveNow; 
   p2Ch2boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[2]);
 p2Ch2boxes[2].addEventListener("click",function() {cancel(num1,2,c,gain); });
    break;

}

}

else if (moveNow !== 0 && num1 === 6)
{
    
switch(c)
{
    case 1:
    p2C3BoxUsed[0] = moveNow; 
 p2Ch3boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[0]);
 p2Ch3boxes[0].addEventListener("click",function() {cancel(num1,0,c,gain); });
    break;
    
    case 2:
    p2C3BoxUsed[1] = moveNow;
p2Ch3boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[1]);
 p2Ch3boxes[1].addEventListener("click",function() {cancel(num1,1,c,gain); });
    break;
    
    case 3:
    p2C3BoxUsed[2] = moveNow;
p2Ch3boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[2]);
 p2Ch3boxes[2].addEventListener("click",function() {cancel(num1,2,c,gain); });
    break;
}
}



}

//Character Stop Attacking
if (p1character1.active)
{
   p1character1.moveUsed = moveNow;
   p1character1.attacked = true;
   if(focus === 2)
   {
       p1character1.targeted = 7;
   }
   else if (focus === 5)
   {
       p1character1.targeted = 8;
   }
   else
   {
       p1character1.targeted = num1;
   }
   
  
}

else if (p1character2.active)
{
    p1character2.moveUsed = moveNow;
    p1character2.attacked = true;
    if(focus === 2)
   {
       p1character2.targeted = 7;
   }
    else if (focus === 5)
   {
       p1character2.targeted = 8;
   }
   else
   {
       p1character2.targeted = num1;
   }
}

else if (p1character3.active)
{
    
     p1character3.moveUsed = moveNow;
     p1character3.attacked = true;
   if(focus === 2)
   {
       p1character3.targeted = 7;
   }
    else if (focus === 5)
   {
       p1character3.targeted = 8;
   }
   else
   {
       p1character3.targeted = num1;
       
      
   }
}
   
  else
  {
      
      
      p1.attacked = true;
    p1.targeted = num1;
     if (num1 === 1)
       {
           p1boxes.x = 70;
           p1boxes.y = 600;
       }
       
       else if (num1 === 2)
       {
           p1boxes.x = 439;
           p1boxes.y = 600;
       }
       
       else if (num1 === 3)
       {
           p1boxes.x = 805;
           p1boxes.y = 600;
       }
       
       else if (num1 === 4)
       {
          p1boxes.x = 70;
           p1boxes.y = 600; 
       }
       
       else if (num1 === 5)
       {
           p1boxes.x = 70;
           p1boxes.y = 600;
       }
       
       else
       {
           p1boxes.x = 70;
           p1boxes.y = 600;
       }
       stage.addChild(p1boxes);
      
  }
     


//Type = Single Enemy ,All Enemies ,Self,One Ally



bpUsage(0,bpNow);
moveNow = 0;


}

function bpUsage(num,num1)
{
//This is to take 



if(num === 0)
{
start.bp -= num1;
}

else
{
    start.bp += num1;
}

BPText.text = start.bp;
}

function cancel(num1,num2,num3,num4)
{
 createjs.Sound.play("select", {loop: 0,volume:0.1});
var end = true;


if(num1 === 1)
{
stage.removeChild(p1Ch1boxes[num2]);    
p1Ch1boxes[num2].removeAllEventListeners();
p1C1BoxUsed[num2] = -1;
if(end)
{bpUsage(1,num4);}
end = false;
    
}

else if(num1 === 2)
{
stage.removeChild(p1Ch2boxes[num2]);    
p1Ch2boxes[num2].removeAllEventListeners();
p1C2BoxUsed[num2] = -1;
if(end)
{bpUsage(1,num4);}
end = false;


}
else if(num1 === 3)
{
stage.removeChild(p1Ch3boxes[num2]);    
p1Ch3boxes[num2].removeAllEventListeners();
p1C3BoxUsed[num2] = -1;
if(end)
{bpUsage(1,num4);}
end = false;


}

else if(num1 === 4)
{
stage.removeChild(p2Ch1boxes[num2]);    
p2Ch1boxes[num2].removeAllEventListeners();
p2C1BoxUsed[num2] = -1;
if(end)
{bpUsage(1,num4);}
end = false;

}

else if(num1 === 5)
{
stage.removeChild(p2Ch2boxes[num2]);    
p2Ch2boxes[num2].removeAllEventListeners();
p2C2BoxUsed[num2] = -1;
if(end)
{bpUsage(1,num4);}
end = false;
}

else if (num1 === 6)
{
    
    stage.removeChild(p2Ch3boxes[num2]);    
p2Ch3boxes[num2].removeAllEventListeners();
p2C3BoxUsed[num2] = -1;
if(end)
{bpUsage(1,num4);}
end = false;

}

else if (num1 === 8)
{
    if (num2[0] > -1 )
{
    stage.removeChild(p1Ch1boxes[num2[0]]);    
p1Ch1boxes[num2[0]].removeAllEventListeners();
p1C1BoxUsed[num2[0]] = -1;
if(end)
{bpUsage(1,num4);}
end = false;
}

if (num2[1] > -1 )
{
 stage.removeChild(p1Ch2boxes[num2[1]]);    
p1Ch2boxes[num2[1]].removeAllEventListeners();
p1C2BoxUsed[num2[1]] = -1;  
if(end)
{bpUsage(1,num4);}
end = false;
}

if (num2[2] > -1 )
{
stage.removeChild(p1Ch3boxes[num2[2]]);    
p1Ch3boxes[num2[2]].removeAllEventListeners();
p1C3BoxUsed[num2[2]] = -1;
if(end)
{bpUsage(1,num4);}
end = false;
}
}


else
{

if (num2[0] > -1 )
{
    stage.removeChild(p2Ch1boxes[num2[0]]);    
p2Ch1boxes[num2[0]].removeAllEventListeners();
p2C1BoxUsed[num2[0]] = -1;
if(end)
{bpUsage(1,num4);}
end = false;
}

if (num2[1] > -1 )
{
 stage.removeChild(p2Ch2boxes[num2[1]]);    
p2Ch2boxes[num2[1]].removeAllEventListeners();
p2C2BoxUsed[num2[1]] = -1;  
if(end)
{bpUsage(1,num4);}
end = false;
}

if (num2[2] > -1 )
{
stage.removeChild(p2Ch3boxes[num2[2]]);    
p2Ch3boxes[num2[2]].removeAllEventListeners();
p2C3BoxUsed[num2[2]] = -1;
if(end)
{bpUsage(1,num4);}
end = false;
}

}




switch(num3){
    
    case 1:
    p1character1.attacked = false;
    p1character1.moveUsed = 0;
    p1character1.targeted = 0;  
   
    break;
    
    case 2:
    p1character2.attacked = false;
    p1character2.moveUsed = 0;
    p1character2.targeted = 0;
  
    break;
    
    case 3:
    p1character3.attacked = false;
    p1character3.moveUsed = 0;
    p1character3.targeted = 0;
   
    break;
    
    case 4:
    p1.attacked = false;
    p1.targeted = -1;
    break;
    
    
}


}

function updateMoves(num)
{
 P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;

 stage.removeChild(skills1);  
 stage.removeChild(skills2);  
 stage.removeChild(skills3);   
 stage.removeChild(skills4);   
 stage.removeChild(skills5);
 skills1.removeAllEventListeners();
 skills2.removeAllEventListeners();
 skills3.removeAllEventListeners();
 skills4.removeAllEventListeners();
 skills5.removeAllEventListeners();
 stage.removeChild(cooldown1text);
 stage.removeChild(cooldown2text);
 stage.removeChild(cooldown3text);
 stage.removeChild(cooldown4text);
 stage.removeChild(cooldown5text);
 stage.removeChild(cooldown1);
 stage.removeChild(cooldown2);
 stage.removeChild(cooldown3);
 stage.removeChild(cooldown4);
 stage.removeChild(cooldown5);

if (num === 1)
{
  skills1.image = queue.getResult(p1character1.skills[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(p1character1.skills[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(p1character1.skills[2]);
  stage.addChild(skills3);

 skills4.image = queue.getResult(p1character1.skills[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(p1character1.skills[4]);
  stage.addChild(skills5);  
  
  

  
  switch (p1character1.cooldown[0])
  {
      case 0:
   
      skills1.addEventListener("click",function() {skillSelected(1,1,p1character1.skills[0],true); });
      break;
      
      default:
      
      stage.addChild(cooldown1);
      cooldown1text.text = p1character1.cooldown[0];
      stage.addChild(cooldown1text);
      break;
      
  }
  

  switch (p1character1.cooldown[1])
  {
      case 0:
      
      skills2.addEventListener("click",function() {skillSelected(1,2,p1character1.skills[1],true); });
      break;
      
      default:
      
      stage.addChild(cooldown2);
      cooldown2text.text = p1character1.cooldown[1];
      stage.addChild(cooldown2text);
      break;
      
  }
  

  switch (p1character1.cooldown[2])
  {
      case 0:
      skills3.addEventListener("click",function() {skillSelected(1,3,p1character1.skills[2],true); }); 
      break;
      
      default:
      stage.addChild(cooldown3);
      cooldown3text.text = p1character1.cooldown[2];
      stage.addChild(cooldown3text);
      break;
  }
  

  switch (p1character1.cooldown[3])
  {
      case 0:
      skills4.addEventListener("click",function() {skillSelected(1,4,p1character1.skills[3],true); });
      break;
      
      default:
      stage.removeChild(cooldown4);
      stage.addChild(cooldown4);
      cooldown4text.text = p1character1.cooldown[3];
      stage.addChild(cooldown4text);
      break;
      
     
  }
  
  switch (p1character1.cooldown[4])
  {
      case 0:
      skills5.addEventListener("click",function() {skillSelected(1,5,p1character1.skills[4],true); });
      break;
      
      default:
      stage.addChild(cooldown5);
      cooldown5text.text = p1character1.cooldown[4];
      stage.addChild(cooldown5text);
      break;
      
     
  }
  
}

else if (num === 2)
{
  skills1.image = queue.getResult(p1character2.skills[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(p1character2.skills[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(p1character2.skills[2]);
  stage.addChild(skills3);


 skills4.image = queue.getResult(p1character2.skills[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(p1character2.skills[4]);
  stage.addChild(skills5);   
  
  switch (p1character2.cooldown[0])
  {
      case 0:
     
      skills1.addEventListener("click",function() {skillSelected(2,1,p1character2.skills[0],true); });
      break;
      
      default:
      stage.addChild(cooldown1);
      cooldown1text.text = p1character2.cooldown[0];
      stage.addChild(cooldown1text);
      break;
      
  }
  

  switch (p1character2.cooldown[1])
  {
      case 0:
      
      skills2.addEventListener("click",function() {skillSelected(2,2,p1character2.skills[1],true); });
      break;
      
      default:

      stage.addChild(cooldown2);
      cooldown2text.text = p1character2.cooldown[1];
      stage.addChild(cooldown2text);
      break;
     
  }
  

  switch (p1character2.cooldown[2])
  {
      case 0:
      skills3.addEventListener("click",function() {skillSelected(2,3,p1character2.skills[2],true); }); 
      break;
      
      default:
      stage.addChild(cooldown3);
      cooldown3text.text = p1character2.cooldown[2];
      stage.addChild(cooldown3text);
      break;
      
  }
  

  switch (p1character2.cooldown[3])
  {
      case 0:
      skills4.addEventListener("click",function() {skillSelected(2,4,p1character2.skills[3],true); });
      break;
      
      default:
      stage.addChild(cooldown4);
      cooldown4text.text = p1character2.cooldown[3];
      stage.addChild(cooldown4text);
      break;
      
  }
  
  switch (p1character2.cooldown[4])
  {
      case 0:
      skills5.addEventListener("click",function() {skillSelected(2,5,p1character2.skills[4],true); });
      break;
      
      default:
      stage.addChild(cooldown5);
      cooldown5text.text = p1character2.cooldown[4];
      stage.addChild(cooldown5text);
      break;
      
  }
 
}

else if (num === 3)
{
  skills1.image = queue.getResult(p1character3.skills[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(p1character3.skills[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(p1character3.skills[2]);
  stage.addChild(skills3);

 skills4.image = queue.getResult(p1character3.skills[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(p1character3.skills[4]);
  stage.addChild(skills5);  
  
    switch (p1character3.cooldown[0])
  {
      case 0:
      skills1.addEventListener("click",function() {skillSelected(3,1,p1character3.skills[0],true); });
      break;
      
      default:
      stage.addChild(cooldown1);
      cooldown1text.text = p1character3.cooldown[0];
      stage.addChild(cooldown1text);
      break;
  }
  

  switch (p1character3.cooldown[1])
  {
      case 0:
      skills2.addEventListener("click",function() {skillSelected(3,2,p1character3.skills[1],true); });
      break;
      
      default:
      stage.addChild(cooldown2);
      cooldown2text.text = p1character3.cooldown[1];
      stage.addChild(cooldown2text);
      break;
      
  }
  

  switch (p1character3.cooldown[2])
  {
      case 0:
      skills3.addEventListener("click",function() {skillSelected(3,3,p1character3.skills[2],true); }); 
      break;
      
      default:
      stage.addChild(cooldown3);
      cooldown3text.text = p1character3.cooldown[2];
      stage.addChild(cooldown3text);
      break;
     
  }
  

  switch (p1character3.cooldown[3])
  {
      case 0:
      skills4.addEventListener("click",function() {skillSelected(3,4,p1character3.skills[3],true); });
      break;
      
      default:
      stage.addChild(cooldown4);
      cooldown4text.text = p1character3.cooldown[3];
      stage.addChild(cooldown4text);
      break;
      
  }
  
  switch (p1character3.cooldown[4])
  {
      case 0:
      skills5.addEventListener("click",function() {skillSelected(3,5,p1character3.skills[4],true); });
      break;
      
      default:
      stage.addChild(cooldown5);
      cooldown5text.text = p1character3.cooldown[4];
      stage.addChild(cooldown5text);
      break;
      
  }
  
}

else if (num === 4)
{

    
  skills1.image = queue.getResult(start.o_c1_skillhold[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(start.o_c1_skillhold[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(start.o_c1_skillhold[2]);
  stage.addChild(skills3);

 skills4.image = queue.getResult(start.o_c1_skillhold[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(start.o_c1_skillhold[4]);
  stage.addChild(skills5); 
  
  skills1.addEventListener("click",function() {skillSelected(1,1,start.o_c1_skillhold[0],false); });
  skills2.addEventListener("click",function() {skillSelected(1,2,start.o_c1_skillhold[1],false); });
  skills3.addEventListener("click",function() {skillSelected(1,3,start.o_c1_skillhold[2],false); });
  skills4.addEventListener("click",function() {skillSelected(1,4,start.o_c1_skillhold[3],false); });
  skills5.addEventListener("click",function() {skillSelected(1,5,start.o_c1_skillhold[4],false); });
  
  
  
}

else if (num === 5)
{
    skills1.image = queue.getResult(start.o_c2_skillhold[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(start.o_c2_skillhold[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(start.o_c2_skillhold[2]);
  stage.addChild(skills3);

 skills4.image = queue.getResult(start.o_c2_skillhold[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(start.o_c2_skillhold[4]);
  stage.addChild(skills5); 
  
  skills1.addEventListener("click",function() {skillSelected(2,1,start.o_c2_skillhold[0],false); });
  skills2.addEventListener("click",function() {skillSelected(2,2,start.o_c2_skillhold[1],false); });
  skills3.addEventListener("click",function() {skillSelected(2,3,start.o_c2_skillhold[2],false); });
  skills4.addEventListener("click",function() {skillSelected(2,4,start.o_c2_skillhold[3],false); });
  skills5.addEventListener("click",function() {skillSelected(2,5,start.o_c2_skillhold[4],false); });
}

else
{
    skills1.image = queue.getResult(start.o_c3_skillhold[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(start.o_c3_skillhold[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(start.o_c3_skillhold[2]);
  stage.addChild(skills3);

 skills4.image = queue.getResult(start.o_c3_skillhold[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(start.o_c3_skillhold[4]);
  stage.addChild(skills5); 
  
  skills1.addEventListener("click",function() {skillSelected(3,1,start.o_c3_skillhold[0],false); });
  skills2.addEventListener("click",function() {skillSelected(3,2,start.o_c3_skillhold[1],false); });
  skills3.addEventListener("click",function() {skillSelected(3,3,start.o_c3_skillhold[2],false); });
  skills4.addEventListener("click",function() {skillSelected(3,4,start.o_c3_skillhold[3],false); });
  skills5.addEventListener("click",function() {skillSelected(3,5,start.o_c3_skillhold[4],false); });
}
// Selectable Moves Event 




}

function surrenderNow()
{



var in_surrenderhold = new createjs.Bitmap(queue.getResult("surrenderHolder"));
in_surrenderhold.x =305
in_surrenderhold.y = 190;
stage.addChild(in_surrenderhold);


var box = new createjs.Bitmap(queue.getResult("surrenderpic"));
box.x = 420;
box.y = 132;
stage.addChild(box); 

//var surrenderHold = new createjs.Shape();
//surrenderHold.graphics.beginStroke('#AC1302').setStrokeStyle(6).drawRoundRect(300, 110, 300, 212,5);
//stage.addChild(surrenderHold); 

    //Surrender
var surrenderText = new createjs.Text("Do you want to surrender this game?", "20px Aero", "white");
    surrenderText.shadow = new createjs.Shadow("rgba(0,0,0,0.9), 2, 2, 1");
    surrenderText.x = 410;
    surrenderText.y = 515;
    surrenderText.hitArea = hitArea5;
    surrenderText.textBaseline = "alphabetic";
    stage.addChild(surrenderText);




var cancel = new createjs.Bitmap(queue.getResult("cancelLoad"));
cancel.x = 603;
cancel.y = 455;
cancel.cursor = "pointer";
stage.addChild(cancel);
cancel.addEventListener("click",cancel4); 

var done = new createjs.Bitmap(queue.getResult("done"));
done.x = 473;
done.y = 455;
done.cursor = "pointer";
stage.addChild(done); 
done.addEventListener("click",confirm_lost);


function cancel4()
{
    
 createjs.Sound.play("select", {loop: 0,volume:0.1});    
  stage.removeChild(endTurnImage); 
stage.removeChild(box); 
stage.removeChild(cancel); 
stage.removeChild(done);  
stage.removeChild(in_surrenderhold); 
stage.removeChild(in_endhold); 
stage.removeChild(box); 
stage.removeChild(surrenderText);
stage.removeChild(surrenderHold);

} 

function confirm_lost()
{
     createjs.Sound.play("select", {loop: 0,volume:0.1});
  clearInterval(gameTimer);    
var find = { action: "surrender", game_id: user.game_id};
ws.send(JSON.stringify(find));  
}
   


}



function sorting()
{ 
    //var hitAreatest = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,350,300)); 

stage.removeChild(done);

stage.addEventListener("click",nothing);

stage.addChild(in_endhold); 
stage.addChild(box); 

doneNow = new createjs.Bitmap(queue.getResult("done"));
doneNow.x = 475;
doneNow.y = 478;
doneNow.cursor = "pointer";
stage.addChild(doneNow); 

doneNow.addEventListener("click",battleEnd);

exitMenu = new createjs.Bitmap(queue.getResult("cancelLoad"));
exitMenu.x = 605;
exitMenu.y = 478;
exitMenu.cursor = "pointer";
stage.addChild(exitMenu); 
exitMenu.addEventListener("click",function() {displayActions(1);});

    sortSkill1 = new createjs.Bitmap(queue.getResult(p1character1.moveUsed));
    sortSkill1.x = 469;
    sortSkill1.y = 353;
    sortSkill1.hitArea = hitArea6;
    stage.addChild(sortSkill1);
    

    sortSkill2 = new createjs.Bitmap(queue.getResult(p1character2.moveUsed));
    sortSkill2.x = 560;
    sortSkill2.y = 353;
    sortSkill2.hitArea = hitArea6;
    stage.addChild(sortSkill2);  
    

    sortSkill3 = new createjs.Bitmap(queue.getResult(p1character3.moveUsed));
    sortSkill3.x = 653;
    sortSkill3.y = 353;
    sortSkill3.hitArea = hitArea6;
    stage.addChild(sortSkill3);  
    
    
}


function displayActions(num)
{

 createjs.Sound.play("select", {loop: 0,volume:0.1});
   
stage.removeChild(display);
stage.removeChild(doneNow); 
stage.removeChild(exitMenu); 
stage.removeChild(doneText); 
stage.removeChild(exitMenuText); 
stage.removeChild(sortSkill1);
stage.removeChild(sortSkill2);
stage.removeChild(sortSkill3);
stage.removeChild(in_endhold); 
stage.removeChild(changeBox1);
stage.removeChild(box);
stage.removeChild(changeBox2);
stage.removeChild(changeBox3);
stage.removeChild(s1hold);
stage.removeChild(s2hold);
stage.removeChild(s3hold);
}



function battleEnd()
{
 createjs.Sound.play("select", {loop: 0,volume:0.1});

p1character1.mu = p1character1.box;
p1character2.mu = p1character2.box;
p1character3.mu = p1character3.box;



if (!isNaN(p1character1.moveUsed))
    {
       p1character1.moveUsed = Number(p1character1.moveUsed);
    }
if (!isNaN(p1character2.moveUsed))
    {
       p1character2.moveUsed = Number(p1character2.moveUsed);
    }
if (!isNaN(p1character3.moveUsed))
    {
       p1character3.moveUsed = Number(p1character3.moveUsed);
    }


if (p1character1.moveUsed == 0)
{
    p1character1.targeted = -1;
    p1character1.moveUsed = -1;
    p1character1.mu = -1;
}

if (p1character2.moveUsed == 0)
{
    p1character2.targeted = -1;
    p1character2.moveUsed = -1;
    p1character2.mu = -1;
}

if (p1character3.moveUsed == 0)
{
    p1character3.targeted = -1;
    p1character3.moveUsed = -1;
    p1character3.mu = -1;
}

var file = { action: "attack", m1: p1character1.moveUsed, m2: p1character2.moveUsed, m3: p1character3.moveUsed, target1: p1character1.targeted, target2: p1character2.targeted, target3: p1character3.targeted, target4: p1.targeted, ms1: p1character1.mu,ms2: p1character2.mu,ms3: p1character3.mu, mu:p1.attacked,game_id: user.game_id};
ws.send(JSON.stringify(file)); 

p1character1.active = true;
 p1character2.active = true;
 p1character3.active = true;

clearInterval(connection);
connection = setInterval(checkConnection, 10000);  
stage.removeChild(surrender_button);
  stage.removeChild(endTurn_button); 

check = true;
displayActions(1);


this.info = new createjs.Text("Waiting For Other Player Actions...", "20px Aero", "white");
    info.x = 725;
    info.y = 555;
    stage.addChild(info);


function black()
{

}
}



//Timer Function
function updateTime()
{
    gameTime -= 1;

       
     
       timerText.text = gameTime;

//Restarts the bar.
if (gameTime === 0 )
    {
        
        //Change the nCount to change time
        //gameTime = clockCounter;
       stage.removeChild(endTurnImage);   
  stage.removeChild(box);  
  stage.removeChild(done);
  stage.removeChild(h_load);
  //done.removeEventListener("click",cancel);
  stage.removeEventListener("click",nothing);
  stage.removeChild(animation);
  stage.removeChild(info);
  stage.removeChild(surrender_button);
  stage.removeChild(endTurn_button); 
       
       p1character1.active = true;
 p1character2.active = true;
 p1character3.active = true;
       
        var end = { action: "end_turn", game_id: user.game_id};
        ws.send(JSON.stringify(end));
        clearInterval(gameTimer);
        clearInterval(connection);
        connection = setInterval(checkConnection, 10000);  
        function black(){}
 

this.info = new createjs.Text("Waiting For Other Player Actions...", "20px Aero", "white");
    info.x = 725;
    info.y = 555;
    stage.addChild(info);

   

        
       
      
    }
   

}



} //GameLoop ends


//This is for testing



function loadLadder(type,target)
{



var  load = new createjs.Bitmap(queue.getResult("load"));
     load.x = 0;
    loadingSettings[0].y = 0;
        stage.addChild(load);
        
// createjs.Sound.play("select", {loop: 0,volume:0.1});  


var data = {
    images: [queue.getResult('find')],
    frames: {width:320, height:179},
    animations: {
        run:[1,14],
        speed: 0.5,
    }
};

 spriteSheet = new createjs.SpriteSheet(data);
 animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = 440;
 animation.y = 173;
stage.addChild(animation);

h_load = new createjs.Bitmap(queue.getResult("searchBackground"));
h_load.x = 305;
h_load.y=90;
stage.addChild(h_load); 

this.info = new createjs.Text("Finding Match...", "30px Aero", "white");
    info.x = 495;
    info.y = 140;
    info.textBaseline = "alphabetic";
    stage.addChild(info);
  

if (type === "private")
{
    cancelbutton = new createjs.Bitmap(queue.getResult("cancelLoad"));
cancelbutton.x = 545;
cancelbutton.y = 362;
stage.addChild(cancelbutton); 
cancelbutton.addEventListener("click",cancelPrivate); 
}
else if (type === "society")
{
  cancelbutton = new createjs.Bitmap(queue.getResult("cancelLoad"));
cancelbutton.x = 545;
cancelbutton.y = 362;
stage.addChild(cancelbutton); 
cancelbutton.addEventListener("click",cancelSociety);   
}


function cancel()    
{
  // createjs.Sound.play("select", {loop: 0,volume:0.1});
  if (teambuilderinfo[0] === "Find")
  {
     $("#nav-menu").fadeIn(1000);
  stage.removeChild(endTurnImage);   
  stage.removeChild(box);  
  stage.removeChild(done);
  stage.removeChild(h_load);
  stage.removeChild(cancelbutton);
  //done.removeEventListener("click",cancel);
  stage.removeEventListener("click",nothing);
  stage.removeChild(animation);
  stage.removeChild(info);
 var bye = { action: "cancel_ladder"};    
ws.send(JSON.stringify(bye));
mainMenu(); 
  }
  

}

function cancelPrivate()    
{
  // createjs.Sound.play("select", {loop: 0,volume:0.1});
  if (teambuilderinfo[0] === "Find")
  {
  $("#nav-menu").fadeIn(1000);
  stage.removeChild(endTurnImage);   
  stage.removeChild(box);  
  stage.removeChild(done);
  stage.removeChild(h_load);
  //done.removeEventListener("click",cancel);
  stage.removeEventListener("click",nothing);
  stage.removeChild(animation);
  stage.removeChild(info);
 var bye = { action: "cancel_private"};    
ws.send(JSON.stringify(bye));
mainMenu();
}
}

function cancelSociety()    
{
  // createjs.Sound.play("select", {loop: 0,volume:0.1});
  if (teambuilderinfo[0] === "Find")
  {
  $("#nav-menu").fadeIn(1000);
  stage.removeChild(endTurnImage);   
  stage.removeChild(box);  
  stage.removeChild(done);
  stage.removeChild(h_load);
  //done.removeEventListener("click",cancel);
  stage.removeEventListener("click",nothing);
  stage.removeChild(animation);
  stage.removeChild(info);
 var bye = { action: "cancel_society"};    
ws.send(JSON.stringify(bye));
dragonverseOpen();
}
}


function match()
{
    
 var find = { action: type, target:target,society:loadingSettings[7]};    
 ws.send(JSON.stringify(find));   
}

setTimeout(match,3000);

}

function buyItem(num)
{
    
    createjs.Sound.play("select", {loop: 0,volume:0.1});
    var amount;
    var name;
    var run = true;
    var money;
    var math;
    
    if (num === 1)
    {
       amount = $("#commonAmount").val();
       name = $("#itemcommon").val();
       math = amount * 250;
       if (user.money <= math)
       {
           run = false;
       }
    }
    
    else if (num === 2)
    {
        amount = $("#rareAmount").val()
        name = $("#itemrare").val();
        math = amount * 500;
        if (user.money <= math)
       {
          run = false; 
       }
    }
    
    else if (num === 3)
    {
        amount = $("#superrareAmount").val()
        name = $("#itemsuperrare").val();
        math = amount * 750;
        if (user.money <= math)
       {
           run = false;
       }
    }
    
    else
    {
        run = false;
    }
    
    if (run)
    {
        var send  = { action: "shopItems", name: name, amount: amount};
    ws.send(JSON.stringify(send)); 
    }
}

function costItem(num,num2)
{
   
   var number;
   var math;
   number = $(num).val();
    if (num2 === 1)
   {
       math = number * 250;
       $("#itemButtonCommon").text("Buy: " + math);
   }
   
   else if  (num2 === 2)
   {
       math = number * 500;
       $("#itemButtonRare").text("Buy: " + math);
   }
   
    else if  (num2 === 3)
   {
       math = number * 750;
       $("#itemButtonSuperrare").text("Buy: " + math);
   }
}

function newItem(num)
{
   var skill = $(num).val();
   console.log("SKill: " + skill);
   var f = itemList(skill);
   $("#itemNameShop").text(f[0]);
   $("#itemDescriptionShop").text(f[1]);
   $("#itemConditionShop").text("Cooldown:" + f[2] + " BP:" + f[3] + " Type:" + f[4]);
   if (skill[0] === "c")
   {
       $("#shopItemImage").attr("src" , "/assets/blue_capsule.png");
   }
   
   else if  (skill[0] === "o")
   {
       $("#shopItemImage").attr("src" , "/assets/purple_capsule.png");
   }
   
    else if  (skill[0] === "r")
   {
       $("#shopItemImage").attr("src" , "/assets/gold_capsule.png");
   }

}
function  quickmatch()
{
    var a = $("#laddertypes").val();
       
    
    if (a === "Private")
    {
       $("#hiddenusername").show();
    }
    
    else
    {
        $("#hiddenusername").hide();
    }
       $("#Ladder").modal("show");
}


function ladderChoice()
{
    var a = $("#laddertypes").val();
    
    if (a === "Ranked")
    {
        $("#Ladder").modal("hide");
        loading(5);
    }
    else if (a === "Private")
    {
        var b = $("#enemy_username").val();

        if (b.length > 3)
        {
         $("#Ladder").modal("hide");
         loadingSettings[6] = b;
        loading(6);
        }
        
    }
    
    else
    {
     
    }
}

function showchat()
{
    $('#chat').draggable(); 
    $('#chat').resizable();
}

function chat()
{
    var m = $("#chatroomtext").val();
    $("#chatroomtext").val("");
  
    if (m.length < 200)
    {
        var send  = { action: "chat", game_id: user.game_id, message: m};
    ws.send(JSON.stringify(send)); 
    }
    else
    {
        alert("To much text! The limit is 200");
    }
    
    
  
}



$(function() {
    $("#chatroomtext").keypress(function (e) {
        if(e.which == 13) {
            //submit form via ajax, this is not JS but server side scripting so not showing here
            chat();
        }
    });
});

 $('.modal-dialog').draggable({
            handle: ".modal-header"
        });


function ladderType()
{
    console.log("I'm changing");
    var type = $("#laddertypes").val();
   
    if (type === "Private")
    {
        $("#hiddenusername").show();
      
    }
    else
    {
        $("#hiddenusername").hide();
    } 
}



! function(o) {
    "use strict";
    o(".page-scroll a").bind("click", function(t) {
        var l = o(this);
        o("html, body").stop().animate({
            scrollTop: o(l.attr("href")).offset().top - 50
        }, 1250, "easeInOutExpo"), t.preventDefault()
    }), o("body").scrollspy({
        target: ".navbar-fixed-top",
        offset: 51
    }), o(".navbar-collapse ul li a").click(function() {
        o(".navbar-toggle:visible").click()
    }), o("#mainNav").affix({
        offset: {
            top: 100
        }
    }), o(function() {
        o("body").on("input propertychange", ".floating-label-form-group", function(t) {
            o(this).toggleClass("floating-label-form-group-with-value", !!o(t.target).val())
        }).on("focus", ".floating-label-form-group", function() {
            o(this).addClass("floating-label-form-group-with-focus")
        }).on("blur", ".floating-label-form-group", function() {
            o(this).removeClass("floating-label-form-group-with-focus")
        })
    })
}(jQuery);






//;function mmd(s){var h='';function E(s){return new Option(s).innerHTML}function I(s){return E(s).replace(/!\[([^\]]*)]\(([^(]+)\)/g,'<img alt="$1"src="$2">').replace(/\[([^\]]+)]\(([^(]+)\)/g,'$1'.link('$2')).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>')}s.replace(/^\s+|\r|\s+$/g,'').replace(/\t/g,'    ').split(/\n\n+/).forEach(function(b,f,R){R={'*':[/\n\* /,'<ul><li>','</li></ul>'],1:[/\n[1-9]\d*\.? /,'<ol><li>','</li></ol>'],' ':[/\n    /,'<pre><code>','</pre></code>','\n'],'>':[/\n> /,'<blockquote>','</blockquote>','\n']}[f=b[0]];h+=R?R[1]+('\n'+b).split(R[0]).slice(1).map(R[3]?E:I).join(R[3]||'</li>\n<li>')+R[2]:f=='#'?'<h'+(f=b.indexOf(' '))+'>'+I(b.slice(f+1))+'</h'+f+'>':f=='<'?b:'<p>'+I(b)+'</p>'});return h};




