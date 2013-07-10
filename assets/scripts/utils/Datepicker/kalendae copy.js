define(function(){var e;var t=function(e,t){if(!(e instanceof Element||typeof e==="string"))t=e;var i=this,u=i.classes,a=i.settings=r.merge(i.defaults,{attachTo:e},t||{}),f=i.container=r.make("div",{"class":u.container}),l=i.calendars=[],c=o().day(a.weekStart),h,p=[],d,v,m,g,y,b=[],w,E=0,S=a.months;if(r.isIE8())r.addClassName(f,"ie8");E=7;while(E--){p.push(c.format("ddd").substr(0,a.columnHeaderLength));c.add("days",1)}s(i);if(typeof a.subscribe==="object"){for(E in a.subscribe)if(a.subscribe.hasOwnProperty(E)){i.subscribe(E,a.subscribe[E])}}i._sel=[];if(!!a.selected)i.setSelected(a.selected,false);if(!!a.viewStartDate){h=o(a.viewStartDate,a.format)}else if(i._sel.length>0){h=o(i._sel[0])}else{h=o()}i.viewStartDate=h.date(1);var x={past:a.months-1,"today-past":a.months-1,any:a.months>2?Math.floor(a.months/2):0,"today-future":0,future:0}[this.settings.direction];if(x&&o().month()==o(i.viewStartDate).month()){i.viewStartDate=o(i.viewStartDate).subtract({M:x}).date(1)}if(typeof a.blackout==="function"){i.blackout=a.blackout}else if(!!a.blackout){var T=n(a.blackout,a.parseSplitDelimiter);i.blackout=function(e){e=o(e).yearDay();if(e<1||!i._sel||i._sel.length<1)return false;var t=T.length;while(t--)if(T[t].yearDay()===e)return true;return false}}else{i.blackout=function(){return false}}i.direction=i.directions[a.direction]?i.directions[a.direction]:i.directions["any"];S=Math.max(a.months,1);while(S--){d=r.make("div",{"class":u.calendar},f);d.setAttribute("data-cal-index",S);if(a.months>1){if(S==Math.max(a.months-1,1))r.addClassName(d,u.monthFirst);else if(S===0)r.addClassName(d,u.monthLast);else r.addClassName(d,u.monthMiddle)}v=r.make("div",{"class":u.title},d);r.make("a",{"class":u.previousYear},v);r.make("a",{"class":u.previousMonth},v);r.make("a",{"class":u.nextYear},v);r.make("a",{"class":u.nextMonth},v);m=r.make("span",{"class":u.caption},v);g=r.make("div",{"class":u.header},d);E=0;do{w=r.make("span",{},g);w.innerHTML=p[E]}while(++E<7);y=r.make("div",{"class":u.days},d);E=0;b=[];while(E++<42){b.push(r.make("span",{},y))}l.push({caption:m,days:b});if(S)r.make("div",{"class":u.monthSeparator},f)}i.draw();r.addEvent(f,"mousedown",function(e,t){var n;if(r.hasClassName(t,u.nextMonth)){if(!i.disableNext&&i.publish("view-changed",i,["next-month"])!==false){i.viewStartDate.add("months",1);i.draw()}return false}else if(r.hasClassName(t,u.previousMonth)){if(!i.disablePreviousMonth&&i.publish("view-changed",i,["previous-month"])!==false){i.viewStartDate.subtract("months",1);i.draw()}return false}else if(r.hasClassName(t,u.nextYear)){if(!i.disableNext&&i.publish("view-changed",i,["next-year"])!==false){i.viewStartDate.add("years",1);i.draw()}return false}else if(r.hasClassName(t,u.previousYear)){if(!i.disablePreviousMonth&&i.publish("view-changed",i,["previous-year"])!==false){i.viewStartDate.subtract("years",1);i.draw()}return false}else if(r.hasClassName(t.parentNode,u.days)&&r.hasClassName(t,u.dayActive)&&(n=t.getAttribute("data-date"))){n=o(n,a.dayAttributeFormat).hours(12);if(i.publish("date-clicked",i,[n])!==false){switch(a.mode){case"multiple":if(!i.addSelected(n))i.removeSelected(n);break;case"range":i.addSelected(n);break;case"single":default:i.addSelected(n);break}}return false}return false});if(!!(a.attachTo=r.$(a.attachTo))){a.attachTo.appendChild(f)}};t.prototype={defaults:{attachTo:null,months:1,weekStart:0,direction:"any",directionScrolling:true,viewStartDate:null,blackout:null,selected:null,mode:"single",format:null,subscribe:null,columnHeaderLength:2,titleFormat:"MMMM, YYYY",dayNumberFormat:"D",dayAttributeFormat:"YYYY-MM-DD",parseSplitDelimiter:/,\s*|\s+-\s+/,rangeDelimiter:" - ",multipleDelimiter:", ",dateClassMap:{}},classes:{container:"kalendae",calendar:"k-calendar",monthFirst:"k-first-month",monthMiddle:"k-middle-month",monthLast:"k-last-month",title:"k-title",previousMonth:"k-btn-previous-month",nextMonth:"k-btn-next-month",previousYear:"k-btn-previous-year",nextYear:"k-btn-next-year",caption:"k-caption",header:"k-header",days:"k-days",dayOutOfMonth:"k-out-of-month",dayActive:"k-active",daySelected:"k-selected",dayInRange:"k-range",dayToday:"k-today",monthSeparator:"k-separator",disablePreviousMonth:"k-disable-previous-month-btn",disableNextMonth:"k-disable-next-month-btn",disablePreviousYear:"k-disable-previous-year-btn",disableNextYear:"k-disable-next-year-btn"},disablePreviousMonth:false,disableNextMonth:false,disablePreviousYear:false,disableNextYear:false,directions:{past:function(t){return o(t).yearDay()>=e.yearDay()},"today-past":function(t){return o(t).yearDay()>e.yearDay()},any:function(e){return false},"today-future":function(t){return o(t).yearDay()<e.yearDay()},future:function(t){return o(t).yearDay()<=e.yearDay()}},getSelectedAsDates:function(){var e=[];var t=0,n=this._sel.length;for(;t<n;t++){e.push(this._sel[t].nativeDate())}return e},getSelectedAsText:function(e){var t=[];var n=0,r=this._sel.length;for(;n<r;n++){t.push(this._sel[n].format(e||this.settings.format||"YYYY-MM-DD"))}return t},getSelectedRaw:function(){var e=[];var t=0,n=this._sel.length;for(;t<n;t++){e.push(o(this._sel[t]))}return e},getSelected:function(e){var t=this.getSelectedAsText(e);switch(this.settings.mode){case"range":t.splice(2);return t.join(this.settings.rangeDelimiter);case"multiple":return t.join(this.settings.multipleDelimiter);case"single":default:return t[0]}},isSelected:function(e){e=o(e).yearDay();if(e<1||!this._sel||this._sel.length<1)return false;switch(this.settings.mode){case"range":var t=this._sel[0]?this._sel[0].yearDay():0,n=this._sel[1]?this._sel[1].yearDay():0;if(t===e||n===e)return 1;if(!t||!n)return 0;if(e>t&&e<n||t<n&&e<t&&e>n)return-1;return false;case"multiple":var r=this._sel.length;while(r--){if(this._sel[r].yearDay()===e){return true}}return false;case"single":default:return this._sel[0]&&this._sel[0].yearDay()===e}return false},setSelected:function(e,t){this._sel=n(e,this.settings.parseSplitDelimiter,this.settings.format);this._sel.sort(function(e,t){return e.yearDay()-t.yearDay()});if(t!==false)this.draw()},addSelected:function(e,t){e=o(e).hours(12);switch(this.settings.mode){case"multiple":if(!this.isSelected(e))this._sel.push(e);else return false;break;case"range":if(this._sel.length!==1)this._sel=[e];else{if(e.yearDay()>this._sel[0].yearDay())this._sel[1]=e;else this._sel=[e,this._sel[0]]}break;case"single":default:this._sel=[e];break}this._sel.sort(function(e,t){return e.yearDay()-t.yearDay()});this.publish("change",this);if(t!==false)this.draw();return true},removeSelected:function(e,t){e=o(e).yearDay();var n=this._sel.length;while(n--){if(this._sel[n].yearDay()===e){this._sel.splice(n,1);this.publish("change",this);if(t!==false)this.draw();return true}}return false},draw:function(){var n=o(this.viewStartDate).hours(12),i,s=this.classes,u,a,f,l=0,c,h=0,p,d,v,m=this.settings;c=this.calendars.length;do{i=o(n).date(1);i.day(i.day()<this.settings.weekStart?this.settings.weekStart-7:this.settings.weekStart);u=this.calendars[l];u.caption.innerHTML=n.format(this.settings.titleFormat);h=0;do{a=u.days[h];f=[];d=this.isSelected(i);if(d)f.push({"-1":s.dayInRange,1:s.daySelected,"true":s.daySelected}[d]);if(i.month()!=n.month())f.push(s.dayOutOfMonth);else if(!(this.blackout(i)||this.direction(i))||d>0)f.push(s.dayActive);if(i.yearDay()===e.yearDay())f.push(s.dayToday);v=i.format(this.settings.dayAttributeFormat);if(m.dateClassMap[v])f.push(m.dateClassMap[v]);a.innerHTML=i.format(m.dayNumberFormat);a.className=f.join(" ");a.setAttribute("data-date",v);i.add("days",1)}while(++h<42);n.add("months",1)}while(++l<c);if(m.directionScrolling){var g=-o().diff(n,"months");if(m.direction==="today-past"||m.direction==="past"){if(g<=0){this.disableNextMonth=false;r.removeClassName(this.container,s.disableNextMonth)}else{this.disableNextMonth=true;r.addClassName(this.container,s.disableNextMonth)}}else if(m.direction==="today-future"||m.direction==="future"){if(g>m.months){this.disablePreviousMonth=false;r.removeClassName(this.container,s.disablePreviousMonth)}else{this.disablePreviousMonth=true;r.addClassName(this.container,s.disablePreviousMonth)}}if(m.direction==="today-past"||m.direction==="past"){if(n.add({Y:1}).diff(o(),"years")<0){this.disableNextYear=false;r.removeClassName(this.container,s.disableNextYear)}else{this.disableNextYear=true;r.addClassName(this.container,s.disableNextYear)}}else if(m.direction==="today-future"||m.direction==="future"){if(n.subtract({Y:1}).diff(o(),"years")>0){this.disablePreviousYear=false;r.removeClassName(this.container,s.disablePreviousYear)}else{this.disablePreviousYear=true;r.addClassName(this.container,s.disablePreviousYear)}}}}};var n=function(e,t,n){var s=[];if(typeof e==="string"){e=e.split(t)}else if(!r.isArray(e)){e=[e]}var u=e.length;i=0;do{if(e[i])s.push(o(e[i],n).hours(12))}while(++i<u);return s};window.Kalendae=t;var r=t.util={isIE8:function(){return!!(/msie 8./i.test(navigator.appVersion)&&!/opera/i.test(navigator.userAgent)&&window.ActiveXObject&&XDomainRequest&&!window.msPerformance)},$:function(e){return typeof e=="string"?document.getElementById(e):e},$$:function(e){return document.querySelectorAll(e)},make:function(e,t,n){var r,i=document.createElement(e);if(!!t)for(r in t)if(t.hasOwnProperty(r))i.setAttribute(r,t[r]);if(!!n)n.appendChild(i);return i},isVisible:function(e){return e.offsetWidth>0||e.offsetHeight>0},getStyle:function(e,t){var n;if(e.currentStyle){n=e.currentStyle[t]}else if(window.getComputedStyle){n=window.getComputedStyle(e,null)[t]}return n},domReady:function(e){/in/.test(document.readyState)?setTimeout(function(){r.domReady(e)},9):e()},addEvent:function(e,t,n){var r=function(t){t=t||window.event;var r=t.target||t.srcElement;var i=n.apply(e,[t,r]);if(i===false){if(!!t.preventDefault)t.preventDefault();else{t.returnValue=false;t.cancelBubble=true}}return i};if(e.attachEvent){e.attachEvent("on"+t,r)}else{e.addEventListener(t,r,false)}return r},removeEvent:function(e,t,n){if(e.detachEvent){e.detachEvent("on"+t,n)}else{e.removeEventListener(t,n,false)}},hasClassName:function(e,t){if(!(e=r.$(e)))return false;var n=e.className;return n.length>0&&(n==t||(new RegExp("(^|\\s)"+t+"(\\s|$)")).test(n))},addClassName:function(e,t){if(!(e=r.$(e)))return;if(!r.hasClassName(e,t))e.className+=(e.className?" ":"")+t},removeClassName:function(e,t){if(!(e=r.$(e)))return;e.className=r.trimString(e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," "))},isFixed:function(e){do{if(r.getStyle(e,"position")==="fixed")return true}while(e=e.offsetParent);return false},getPosition:function(e,t){var n=e.offsetLeft,r=e.offsetTop,i={};if(!t){while(e=e.offsetParent){n+=e.offsetLeft;r+=e.offsetTop}}i[0]=i.left=n;i[1]=i.top=r;return i},getHeight:function(e){return e.offsetHeight||e.scrollHeight},getWidth:function(e){return e.offsetWidth||e.scrollWidth},trimString:function(e){return e.replace(/^\s+/,"").replace(/\s+$/,"")},merge:function(){var e=arguments[0]===true,t={},n=e?1:0;var r=function(t,n){if(typeof n!=="object")return;for(var r in n)if(n.hasOwnProperty(r)){if(e&&typeof t[r]==="object"&&typeof n[r]==="object")_update(t[r],n[r]);else t[r]=n[r]}return t};for(;n<arguments.length;n++){r(t,arguments[n])}return t},isArray:function(e){return!(!e||!e.length||e.length===0||typeof e!=="object"||!e.constructor||e.nodeType||e.item)}};t.util.domReady(function(){var e=r.$$(".auto-kal"),n=e.length,i;while(n--){i=e[n];if(i.tagName==="INPUT"){new t.Input(i)}else{new t({attachTo:i})}}});t.Input=function(e,n){var i=this.input=r.$(e),s;if(!i||i.tagName!=="INPUT")throw"First argument for Kalendae.Input must be an <input> element or a valid element id.";var o=this,u=o.classes;opts=o.settings=r.merge(o.defaults,n);opts.attachTo=window.document.body;if(!opts.selected)opts.selected=i.value;else s=true;t.call(o,opts);if(opts.closeButton){var a=r.make("a",{"class":u.closeButton},o.container);r.addEvent(a,"click",function(){i.blur()})}if(s)i.value=o.getSelected();var f=o.container,l=false;f.style.display="none";r.addClassName(f,u.positioned);r.addEvent(f,"mousedown",function(e,t){l=true});r.addEvent(window.document,"mousedown",function(e,t){l=false});r.addEvent(i,"focus",function(){o.setSelected(this.value);o.show()});r.addEvent(i,"blur",function(){if(l){l=false;i.focus()}else o.hide()});r.addEvent(i,"keyup",function(e){o.setSelected(this.value)});o.subscribe("change",function(){i.value=o.getSelected()})};t.Input.prototype=r.merge(t.prototype,{defaults:r.merge(t.prototype.defaults,{format:"MM/DD/YYYY",side:"bottom",closeButton:true,offsetLeft:0,offsetTop:0}),classes:r.merge(t.prototype.classes,{positioned:"k-floating",closeButton:"k-btn-close"}),show:function(){var e=this.container,t=e.style,n=this.input,i=r.getPosition(n);t.display="";switch(opts.side){case"left":t.left=i.left-r.getWidth(e)+this.settings.offsetLeft+"px";t.top=i.top+this.settings.offsetTop+"px";break;case"right":t.left=i.left+r.getWidth(n)+"px";t.top=i.top+this.settings.offsetTop+"px";break;case"top":t.left=i.left+this.settings.offsetLeft+"px";t.top=i.top-r.getHeight(e)+this.settings.offsetTop+"px";break;case"bottom":default:t.left=i.left+this.settings.offsetLeft+"px";t.top=i.top+r.getHeight(n)+this.settings.offsetTop+"px";break}t.position=r.isFixed(n)?"fixed":"absolute"},hide:function(){this.container.style.display="none"}});var s=function(e){if(!e)e=this;var t=e.c_||{};e.publish=function(e,n,r){var i=t[e],s=i?i.length:0,o;while(s--){o=i[s].apply(n,r||[]);if(typeof o==="boolean")return o}};e.subscribe=function(e,n,r){if(!t[e]){t[e]=[]}if(r)t[e].push(n);else t[e].unshift(n);return[e,n]};e.unsubscribe=function(e){var n=t[e[0]],r=e[1],i=n?n.length:0;while(i--){if(n[i]===r){n.splice(i,1)}}}};var o=t.moment=function(e,t){function m(e){this._d=e}function g(e,t){var n=e+"";while(n.length<t){n="0"+n}return n}function y(t,n,r,i){var s=typeof n==="string",o=s?{}:n,u,a,f,l;if(s&&i){o[n]=i}u=(o.ms||o.milliseconds||0)+(o.s||o.seconds||0)*1e3+(o.m||o.minutes||0)*6e4+(o.h||o.hours||0)*36e5;a=(o.d||o.days||0)+(o.w||o.weeks||0)*7;f=(o.M||o.months||0)+(o.y||o.years||0)*12;if(u){t.setTime(+t+u*r)}if(a){t.setDate(t.getDate()+a*r)}if(f){l=t.getDate();t.setDate(1);t.setMonth(t.getMonth()+f*r);t.setDate(Math.min((new e(t.getFullYear(),t.getMonth()+1,0)).getDate(),l))}return t}function b(e){return Object.prototype.toString.call(e)==="[object Array]"}function w(t){return new e(t[0],t[1]||0,t[2]||1,t[3]||0,t[4]||0,t[5]||0,t[6]||0)}function E(t,r){function w(r){var i,a;switch(r){case"M":return s+1;case"Mo":return s+1+y(s+1);case"MM":return g(s+1,2);case"MMM":return n.monthsShort[s];case"MMMM":return n.months[s];case"D":return o;case"Do":return o+y(o);case"DD":return g(o,2);case"DDD":i=new e(u,s,o);a=new e(u,0,1);return~~((i-a)/864e5+1.5);case"DDDo":i=w("DDD");return i+y(i);case"DDDD":return g(w("DDD"),3);case"d":return c;case"do":return c+y(c);case"ddd":return n.weekdaysShort[c];case"dddd":return n.weekdays[c];case"w":i=new e(u,s,o-c+5);a=new e(i.getFullYear(),0,4);return~~((i-a)/864e5/7+1.5);case"wo":i=w("w");return i+y(i);case"ww":return g(w("w"),2);case"YY":return g(u%100,2);case"YYYY":return u;case"a":return h>11?b.pm:b.am;case"A":return h>11?b.PM:b.AM;case"H":return h;case"HH":return g(h,2);case"h":return h%12||12;case"hh":return g(h%12||12,2);case"m":return p;case"mm":return g(p,2);case"s":return d;case"ss":return g(d,2);case"zz":case"z":return(t.toString().match(l)||[""])[0].replace(f,"");case"Z":return(v>0?"+":"-")+g(~~(Math.abs(v)/60),2)+":"+g(~~(Math.abs(v)%60),2);case"ZZ":return(v>0?"+":"-")+g(~~(10*Math.abs(v)/6),4);case"L":case"LL":case"LLL":case"LLLL":case"LT":return E(t,n.longDateFormat[r]);default:return r.replace(/(^\[)|(\\)|\]$/g,"")}}var i=new m(t),s=i.month(),o=i.date(),u=i.year(),c=i.day(),h=i.hours(),p=i.minutes(),d=i.seconds(),v=i.zone(),y=n.ordinal,b=n.meridiem;return r.replace(a,w)}function S(t,r){function v(e,t){var r;switch(e){case"M":case"MM":i[1]=~~t-1;break;case"MMM":case"MMMM":for(r=0;r<12;r++){if(n.monthsParse[r].test(t)){i[1]=r;break}}break;case"D":case"DD":case"DDD":case"DDDD":i[2]=~~t;break;case"YY":t=~~t;i[0]=t+(t>70?1900:2e3);break;case"YYYY":i[0]=~~Math.abs(t);break;case"a":case"A":d=t.toLowerCase()==="pm";break;case"H":case"HH":case"h":case"hh":i[3]=~~t;break;case"m":case"mm":i[4]=~~t;break;case"s":case"ss":i[5]=~~t;break;case"Z":case"ZZ":u=true;r=t.match(p);if(r[1]){s=~~r[1]}if(r[2]){o=~~r[2]}if(r[0]==="-"){s=-s;o=-o}break}}var i=[0,0,1,0,0,0,0],s=0,o=0,u=false,a=t.match(h),f=r.match(c),l,d;for(l=0;l<f.length;l++){v(f[l],a[l])}if(d&&i[3]<12){i[3]+=12}if(d===false&&i[3]===12){i[3]=0}i[3]+=s;i[4]+=o;return u?new e(e.UTC.apply({},i)):w(i)}function x(e,t){var n=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),i=0,s;for(s=0;s<n;s++){if(~~e[s]!==~~t[s]){i++}}return i+r}function T(e,t){var n,r=e.match(h),i=[],s=99,o,u,a;for(o=0;o<t.length;o++){u=S(e,t[o]);a=x(r,E(u,t[o]).match(h));if(a<s){s=a;n=u}}return n}function N(e,t,r){var i=n.relativeTime[e];return typeof i==="function"?i(t||1,!!r,e):i.replace(/%d/i,t||1)}function C(e,t){var n=r(Math.abs(e)/1e3),i=r(n/60),s=r(i/60),o=r(s/24),u=r(o/365),a=n<45&&["s",n]||i===1&&["m"]||i<45&&["mm",i]||s===1&&["h"]||s<22&&["hh",s]||o===1&&["d"]||o<=25&&["dd",o]||o<=45&&["M"]||o<345&&["MM",r(o/30)]||u===1&&["y"]||["yy",u];a[2]=t;return N.apply({},a)}function k(e,t){n.fn[e]=function(e){if(typeof e!=="undefined"){this._d["set"+t](e);return this}else{return this._d["get"+t]()}}}var n,r=Math.round,i={},s=typeof module!=="undefined",o="months|monthsShort|monthsParse|weekdays|weekdaysShort|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),u,a=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|zz?|ZZ?|LT|LL?L?L?)/g,f=/[^A-Z]/g,l=/\([A-Za-z ]+\)|:[0-9]{2} [A-Z]{3} /g,c=/(\\)?(MM?M?M?|dd?d?d|DD?D?D?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|ZZ?|T)/g,h=/(\\)?([0-9]+|([a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|([\+\-]\d\d:?\d\d))/gi,p=/([\+\-]|\d\d)/gi,d="1.3.0",v="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|");n=function(n,r){if(n===null){return null}var i;if(n&&n._d instanceof e){i=new e(+n._d)}else if(r){if(b(r)){i=T(n,r)}else{i=S(n,r)}}else{i=n===t?new e:n instanceof e?n:b(n)?w(n):new e(n)}return new m(i)};n.version=d;n.lang=function(e,t){var r,u,a,f=[];if(t){for(r=0;r<12;r++){f[r]=new RegExp("^"+t.months[r]+"|^"+t.monthsShort[r].replace(".",""),"i")}t.monthsParse=t.monthsParse||f;i[e]=t}if(i[e]){for(r=0;r<o.length;r++){u=o[r];n[u]=i[e][u]||n[u]}}else{if(s){a=require("./lang/"+e);n.lang(e,a)}}};n.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:{AM:"AM",am:"am",PM:"PM",pm:"pm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(e){var t=e%10;return~~(e%100/10)===1?"th":t===1?"st":t===2?"nd":t===3?"rd":"th"}});n.fn=m.prototype={clone:function(){return n(this)},valueOf:function(){return+this._d},nativeDate:function(){return this._d},toString:function(){return this._d.toString()},toDate:function(){return this._d},format:function(e){return E(this._d,e)},add:function(e,t){this._d=y(this._d,e,1,t);return this},subtract:function(e,t){this._d=y(this._d,e,-1,t);return this},diff:function(e,t,i){var s=n(e),o=this._d-s._d,u=this.year()-s.year(),a=this.month()-s.month(),f=this.day()-s.day(),l;if(t==="months"){l=u*12+a+f/30}else if(t==="years"){l=u+a/12}else{l=t==="seconds"?o/1e3:t==="minutes"?o/6e4:t==="hours"?o/36e5:t==="days"?o/864e5:t==="weeks"?o/6048e5:t==="days"?o/3600:o}return i?l:r(l)},from:function(e,t){var r=this.diff(e),i=n.relativeTime,s=C(r,t);return t?s:(r<=0?i.past:i.future).replace(/%s/i,s)},fromNow:function(e){return this.from(n(),e)},calendar:function(){var e=n(),t=n([e.year(),e.month(),e.date()]),r=this.diff(t,"days",true),i=n.calendar,s=i.sameElse,o=r<-6?s:r<-1?i.lastWeek:r<0?i.lastDay:r<1?i.sameDay:r<2?i.nextDay:r<7?i.nextWeek:s;return this.format(typeof o==="function"?o.apply(this):o)},isLeapYear:function(){var e=this.year();return e%4===0&&e%100!==0||e%400===0},isDST:function(){return this.zone()!==n([this.year()]).zone()},day:function(e){var t=this._d.getDay();return typeof e==="undefined"?t:this.add({d:e-t})}};for(u=0;u<v.length;u++){k(v[u].toLowerCase(),v[u])}k("year","FullYear");n.fn.zone=function(){return this._d.getTimezoneOffset()};return n}(Date);o.fn.stripTime=function(){this._d=new Date(Math.floor(this._d.valueOf()/864e5)*864e5);return this};o.fn.yearDay=function(e){var t=Math.floor(this._d/864e5);return typeof e==="undefined"?t:this.add({d:e-t})};e=o().stripTime();if(typeof jQuery!=="undefined"){jQuery.fn.kalendae=function(e){this.each(function(n,r){if(r.tagName==="INPUT"){$(r).data("kalendae",new t.Input(r,e))}else{$(r).data("kalendae",new t($.extend({},{attachTo:r},e)))}});return this}}return t})