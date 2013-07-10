var fdSlider=(function(){var sliders={},uniqueid=0,mouseWheelEnabled=true,fullARIA=true,describedBy="fd-slider-describedby",varSetRules={onfocus:true,onvalue:true},noRangeBar=false,html5Animation="jump",isOpera=Object.prototype.toString.call(window.opera)==="[object Opera]",fpRegExp=/^([\-]{0,1}[0-9]+(\.[0-9]+){0,1})$/,stepRegExp=/^([0-9]+(\.[0-9]+){0,1})$/;var parseJSON=function(str){if(typeof str!=="string"||str===""){return{}}try{if(typeof JSON==="object"&&typeof(JSON.parse)==="function"){return JSON.parse(str)}else if(/mousewheelenabled|fullaria|describedby|norangebar|html5animation|varsetrules/.test(str.toLowerCase())){var f=Function(['var document,top,self,window,parent,Number,Date,Object,Function,','Array,String,Math,RegExp,Image,ActiveXObject;','return (',str.replace(/<\!--.+-->/gim,'').replace(/\bfunction\b/g,'function-'),');'].join(''));return f()}}catch(e){}return{"err":"Could not parse the JSON object"}};var affectJSON=function(json){if(typeof json!=="object"){return}for(var key in json){value=json[key];switch(key.toLowerCase()){case"mousewheelenabled":mouseWheelEnabled=!!value;break;case"fullaria":fullARIA=!!value;break;case"describedby":describedBy=String(value);break;case"norangebar":noRangeBar=!!value;break;case"html5animation":html5Animation=String(value).search(/^(jump|tween|timed)$/i)!=-1?String(value).toLowerCase():"jump";break;case"varsetrules":if("onfocus"in value){varSetRules.onfocus=!!value.onfocus}if("onvalue"in value){varSetRules.onvalue=!!value.onvalue}break}}};var addEvent=function(obj,type,fn){if(obj.attachEvent){obj.attachEvent("on"+type,fn)}else{obj.addEventListener(type,fn,true)}};var removeEvent=function(obj,type,fn){try{if(obj.detachEvent){obj.detachEvent("on"+type,fn)}else{obj.removeEventListener(type,fn,true)}}catch(err){}};var stopEvent=function(e){e=e||window.event;if(e.stopPropagation){e.stopPropagation();e.preventDefault()}return false};var preventDefault=function(e){e=e||window.event;if(e.preventDefault){e.preventDefault();return}e.returnValue=false};var addClass=function(e,c){if(new RegExp("(^|\\s)"+c+"(\\s|$)").test(e.className)){return}e.className+=(e.className?" ":"")+c};var removeClass=function(e,c){e.className=!c?"":e.className.replace(new RegExp("(^|\\s)"+c+"(\\s|$)")," ").replace(/^\s\s*/,'').replace(/\s\s*$/,'')};var getValueSet=function(){var obj={};for(var id in sliders){obj[id]=sliders[id].getValueSet()}return obj};var setValueSet=function(sliderId,tf){sliders[sliderId].setValueSet(!!tf)};var sliderExists=function(slider){return!!(slider in sliders&&sliders.hasOwnProperty(slider))};var createSlider=function(options){if(!options||!options.inp||!options.inp.tagName||options.inp.tagName.search(/^input|select/i)==-1){return false}options.html5Shim=false;if(options.inp.tagName.toLowerCase()=="select"){if(options.inp.options.length<2){return false}options.min=0;options.max=options.inp.options.length-1;options.step=1;options.precision=0;options.scale=false;options.forceValue=true}else{if(String(options.inp.type).search(/^(text|range)$/i)==-1){return false}options.min=options.min&&String(options.min).search(fpRegExp)!=-1?+options.min:0;options.max=options.max&&String(options.max).search(fpRegExp)!=-1?+options.max:100;options.step=options.step&&String(options.step).search(stepRegExp)!=-1?options.step:1;options.precision=options.precision&&String(options.precision).search(/^[0-9]+$/)!=-1?options.precision:(String(options.step).search(/\.([0-9]+)$/)!=-1?String(options.step).match(/\.([0-9]+)$/)[1].length:0);options.scale=options.scale||false;options.forceValue=("forceValue"in options)?!!options.forceValue:false;options.userSnap=("userSnap"in options)?!!options.userSnap:false}options.ariaFormat=("ariaFormat"in options)&&typeof options.ariaFormat=="function"?options.ariaFormat:false;options.maxStep=options.maxStep&&String(options.maxStep).search(stepRegExp)!=-1?+options.maxStep:+options.step*2;options.classNames=options.classNames||"";options.callbacks=options.callbacks||false;destroySingleSlider(options.inp.id);sliders[options.inp.id]=new fdRange(options);return true};var getAttribute=function(elem,att){return elem.getAttribute(att)||""};var init=function(){var inputs=document.getElementsByTagName("input"),options;for(var i=0,inp;inp=inputs[i];i++){if(inp.className.indexOf('js-ignore-input')!==-1){continue}if(inp.tagName.toLowerCase()=="input"&&(inp.type.toLowerCase()=="text"||inp.type.toLowerCase()=="range")&&(getAttribute(inp,"min")&&getAttribute(inp,"min").search(fpRegExp)!=-1||getAttribute(inp,"max")&&getAttribute(inp,"max").search(fpRegExp)!=-1||getAttribute(inp,"step")&&getAttribute(inp,"step").search(/^(any|([0-9]+(\.[0-9]+){0,1}))$/i)!=-1)){if(inp.id&&document.getElementById("fd-slider-"+inp.id)){continue}else if(inp.id&&!document.getElementById("fd-slider-"+inp.id)){destroySingleSlider(inp.id)}if(!inp.id){inp.id="fd-slider-form-elem-"+uniqueid++}options={inp:inp,callbacks:[],animation:html5Animation,vertical:getAttribute(inp,"data-fd-slider-vertical")?true:(inp.offsetHeight>inp.offsetWidth),classNames:getAttribute(inp,"data-fd-slider-vertical"),html5Shim:true};if(options.vertical&&!getAttribute(inp,"data-fd-slider-vertical")){options.inpHeight=inp.offsetHeight}options.min=getAttribute(inp,"min")||0;options.max=getAttribute(inp,"max")||100;options.step=getAttribute(inp,"step").search(/^any$/i)!=-1?options.max-options.min:getAttribute(inp,"step").search(stepRegExp)!=-1?inp.getAttribute("step"):1;options.precision=String(options.step).search(/\.([0-9]+)$/)!=-1?String(options.step).match(/\.([0-9]+)$/)[1].length:0;options.maxStep=options.step*2;destroySingleSlider(options.inp.id);sliders[options.inp.id]=new fdRange(options)}}return true};var destroySingleSlider=function(id){if(id in sliders&&sliders.hasOwnProperty(id)){sliders[id].destroy();delete sliders[id];return true}return false};var destroyAllsliders=function(e){for(var slider in sliders){if(sliders.hasOwnProperty(slider)){sliders[slider].destroy()}}sliders=[]};var unload=function(e){destroyAllsliders();sliders=null};var resize=function(e){for(var slider in sliders){if(sliders.hasOwnProperty(slider)){sliders[slider].onResize()}}};var onDomReady=function(){removeOnLoadEvent();init()};var removeOnLoadEvent=function(){removeEvent(window,"load",init)};function fdRange(options){var inp=options.inp,disabled=false,tagName=inp.tagName.toLowerCase(),min=+options.min,max=+options.max,rMin=+options.min,rMax=+options.max,range=Math.abs(max-min),step=tagName=="select"?1:+options.step,maxStep=options.maxStep?+options.maxStep:step*2,precision=options.precision||0,steps=Math.ceil(range/step),scale=options.scale||false,hideInput=!!options.hideInput,animation=options.animation||"",vertical=!!options.vertical,callbacks=options.callbacks||{},classNames=options.classNames||"",html5Shim=!!options.html5Shim,defaultVal=max<min?min:min+((max-min)/2),resetDef=tagName=="select"?inp.selectedIndex:inp.defaultValue||defaultVal,forceValue=html5Shim||!!options.forceValue,inpHeight=html5Shim&&vertical&&("inpHeight"in options)?options.inpHeight:false,ariaFormat=!html5Shim&&options.ariaFormat?options.ariaFormat:false,userSnap=!html5Shim&&!(tagName=="select")&&("userSnap"in options)?!!options.userSnap:false,userInput=false,timer=null,kbEnabled=true,initialVal=tagName=="select"?inp.selectedIndex:inp.value,sliderH=0,sliderW=0,tweenX=0,tweenB=0,tweenC=0,tweenD=0,frame=0,x=0,y=0,rMaxPx=0,rMinPx=0,handlePos=0,destPos=0,mousePos=0,stepPx=0,userSet=false,touchEvents=false,outerWrapper,innerWrapper,ieBlur,handle,rangeBar,bar;if(tagName=="input"&&forceValue&&!inp.defaultValue){inp.defaultValue=getWorkingValueFromInput()}if(max<min){step=-Math.abs(step);maxStep=-Math.abs(maxStep)}if(scale){scale[100]=max}function valueSet(tf){tf=!!tf;if(tf!=userSet){userSet=tf;valueToPixels(getWorkingValueFromInput())}}function disableSlider(noCallback){if(disabled&&!noCallback){return}try{setTabIndex(handle,-1);removeEvent(handle,"focus",onFocus);removeEvent(handle,"blur",onBlur);if(!isOpera){removeEvent(handle,"keydown",onKeyDown);removeEvent(handle,"keypress",onKeyPress)}else{removeEvent(handle,"keypress",onKeyDown)}removeEvent(outerWrapper,"mouseover",onMouseOver);removeEvent(outerWrapper,"mouseout",onMouseOut);removeEvent(outerWrapper,"mousedown",onMouseDown);removeEvent(outerWrapper,"touchstart",onMouseDown);if(mouseWheelEnabled){if(window.addEventListener&&!window.devicePixelRatio)window.removeEventListener('DOMMouseScroll',trackMouseWheel,false);else{removeEvent(document,"mousewheel",trackMouseWheel);removeEvent(window,"mousewheel",trackMouseWheel)}}}catch(err){}removeClass(innerWrapper,"fd-slider-focused");removeClass(innerWrapper,"fd-slider-active");addClass(innerWrapper,"fd-slider-disabled");outerWrapper.setAttribute("aria-disabled",true);inp.disabled=disabled=true;clearTimeout(timer);if(!noCallback){callback("disable")}}function enableSlider(noCallback){if(!disabled&&!noCallback){return}setTabIndex(handle,0);addEvent(handle,"focus",onFocus);addEvent(handle,"blur",onBlur);if(!isOpera){addEvent(handle,"keydown",onKeyDown);addEvent(handle,"keypress",onKeyPress)}else{addEvent(handle,"keypress",onKeyDown)}addEvent(outerWrapper,"touchstart",onMouseDown);addEvent(outerWrapper,"mousedown",onMouseDown);addEvent(outerWrapper,"mouseover",onMouseOver);addEvent(outerWrapper,"mouseout",onMouseOut);removeClass(innerWrapper,"fd-slider-disabled");outerWrapper.setAttribute("aria-disabled",false);inp.disabled=disabled=touchEvents=false;if(!noCallback){callback("enable")}}function destroySlider(){clearTimeout(timer);ieBlur=bar=handle=outerWrapper=innerWrapper=timer=null;callback("destroy");callbacks=null}function redraw(){locate();try{var sW=outerWrapper.offsetWidth,sH=outerWrapper.offsetHeight,hW=handle.offsetWidth,hH=handle.offsetHeight,bH=bar.offsetHeight,bW=bar.offsetWidth,mPx=vertical?sH-hH:sW-hW;stepPx=mPx/steps;rMinPx=Math.max(scale?percentToPixels(valueToPercent(rMin)):Math.abs((rMin-min)/step)*stepPx,0);rMaxPx=Math.min(scale?percentToPixels(valueToPercent(rMax)):Math.abs((rMax-min)/step)*stepPx,Math.floor(vertical?sH-hH:sW-hW));sliderW=sW;sliderH=sH;valueToPixels(forceValue?getWorkingValueFromInput():(tagName=="select"?inp.selectedIndex:parseFloat(inp.value)),false)}catch(err){}callback("redraw")}function callback(type){if(!html5Shim){if(callbacks.hasOwnProperty(type)){var cbObj={"userSet":userSet,"disabled":disabled,"elem":inp,"value":tagName=="select"?inp.options[inp.selectedIndex].value:inp.value};for(var i=0,func;func=callbacks[type][i];i++){func.call(inp,cbObj)}}}else if(type.match(/^(blur|focus|change)$/i)){var e;if(typeof(document.createEventObject)!='undefined'){try{e=document.createEventObject();inp.fireEvent('on'+type.toLowerCase(),e)}catch(err){}}else if(typeof(document.createEvent)!='undefined'){e=document.createEvent('HTMLEvents');e.initEvent(type,true,true);inp.dispatchEvent(e)}}}function onFocus(e){addClass(innerWrapper,'fd-slider-focused');if(varSetRules.onfocus){userSet=true;valueToPixels(getWorkingValueFromInput())}if(mouseWheelEnabled){addEvent(window,'DOMMouseScroll',trackMouseWheel);addEvent(document,'mousewheel',trackMouseWheel);if(!isOpera){addEvent(window,'mousewheel',trackMouseWheel)}}callback("focus");return true}function onBlur(e){removeClass(innerWrapper,'fd-slider-focused');if(mouseWheelEnabled){removeEvent(document,'mousewheel',trackMouseWheel);removeEvent(window,'DOMMouseScroll',trackMouseWheel);if(!isOpera){removeEvent(window,'mousewheel',trackMouseWheel)}}kbEnabled=true;callback("blur")}function trackMouseWheel(e){if(!kbEnabled){return}e=e||window.event;var delta=0,value;if(e.wheelDelta){delta=e.wheelDelta/120;if(isOpera&&window.opera.version()<9.2){delta=-delta}}else if(e.detail){delta=-e.detail/3}if(vertical){delta=-delta}if(delta){value=getWorkingValueFromInput();value+=(delta<0)?-step:step;userSet=true;valueToPixels(getValidValue(value))}preventDefault(e)}function onKeyPress(e){e=e||window.event;if((e.keyCode>=33&&e.keyCode<=40)||!kbEnabled||e.keyCode==45||e.keyCode==46){return stopEvent(e)}return true}function onKeyDown(e){if(!kbEnabled){return true}e=e||window.event;var kc=e.keyCode!==null?e.keyCode:e.charCode,value;if(kc<33||(kc>40&&(kc!=45&&kc!=46))){return true}value=getWorkingValueFromInput();if(kc==37||kc==40||kc==46||kc==34){value-=(e.ctrlKey||kc==34?+maxStep:+step)}else if(kc==39||kc==38||kc==45||kc==33){value+=(e.ctrlKey||kc==33?+maxStep:+step)}else if(kc==35){value=rMax}else if(kc==36){value=rMin}userSet=true;valueToPixels(getValidValue(value));callback("update");preventDefault(e)}function onMouseOver(e){addClass(innerWrapper,'fd-slider-hover')}function onMouseOut(e){removeClass(innerWrapper,'fd-slider-hover')}function onMouseDown(e){e=e||window.event;preventDefault(e);var targ;if(e.target){targ=e.target}else if(e.srcElement){targ=e.srcElement}if(targ&&targ.nodeType==3){targ=targ.parentNode}if(e.touches){if(e.targetTouches&&e.targetTouches.length!=1){return false}e=e.touches[0];touchEvents=true}clearTimeout(timer);timer=null;kbEnabled=false;userSet=true;if(targ.className.search("fd-slider-handle")!=-1){mousePos=vertical?e.clientY:e.clientX;handlePos=parseInt(vertical?handle.offsetTop:handle.offsetLeft)||0;trackMouse(e);if(!touchEvents){addEvent(document,'mousemove',trackMouse);addEvent(document,'mouseup',stopDrag)}else{addEvent(document,'touchmove',trackMouse);addEvent(document,'touchend',stopDrag);removeEvent(outerWrapper,"mousedown",onMouseDown)}addClass(innerWrapper,'fd-slider-active');addClass(document.body,"fd-slider-drag-"+(vertical?"vertical":"horizontal"));callback("dragstart")}else{locate();var posx=0;if(e.pageX||e.pageY){posx=vertical?e.pageY:e.pageX}else if(e.clientX||e.clientY){posx=vertical?e.clientY+document.body.scrollTop+document.documentElement.scrollTop:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft}posx-=vertical?y+Math.round(handle.offsetHeight/2):x+Math.round(handle.offsetWidth/2);posx=snapToPxValue(posx);if(animation=="tween"){addClass(innerWrapper,'fd-slider-active');tweenTo(posx)}else if(animation=="timed"){addClass(innerWrapper,'fd-slider-active');addEvent(document,touchEvents?'touchend':'mouseup',onDocMouseUp);destPos=posx;onTimer()}else{pixelsToValue(posx)}}return false}function onDocMouseUp(e){e=e||window.event;preventDefault(e);removeEvent(document,touchEvents?'touchend':'mouseup',onDocMouseUp);removeClass(innerWrapper,"fd-slider-active");clearTimeout(timer);timer=null;kbEnabled=true;return false}function stopDrag(e){e=e||window.event;preventDefault(e);if(touchEvents){removeEvent(document,'touchmove',trackMouse);removeEvent(document,'touchend',stopDrag)}else{removeEvent(document,'mousemove',trackMouse);removeEvent(document,'mouseup',stopDrag)}kbEnabled=true;removeClass(document.body,"fd-slider-drag-"+(vertical?"vertical":"horizontal"));removeClass(innerWrapper,"fd-slider-active");callback("dragend");return false}function trackMouse(e){e=e||window.event;preventDefault(e);if(e.touches){if(e.targetTouches&&e.targetTouches.length!=1){return false}e=e.touches[0]}pixelsToValue(snapToPxValue(handlePos+(vertical?e.clientY-mousePos:e.clientX-mousePos)));return false}function increment(inc){var value=getWorkingValueFromInput();userSet=true;value+=inc*step;valueToPixels(getValidValue(value))}function locate(){var curleft=0,curtop=0,obj=outerWrapper;try{while(obj.offsetParent){curleft+=obj.offsetLeft;curtop+=obj.offsetTop;obj=obj.offsetParent}}catch(err){}x=curleft;y=curtop}function onTimer(){var xtmp=parseInt(vertical?handle.offsetTop:handle.offsetLeft,10);xtmp=Math.round((destPos<xtmp)?Math.max(destPos,Math.floor(xtmp-stepPx)):Math.min(destPos,Math.ceil(xtmp+stepPx)));pixelsToValue(snapToPxValue(xtmp));if(xtmp!=destPos){timer=setTimeout(onTimer,steps>20?50:100)}else{kbEnabled=true;removeClass(innerWrapper,"fd-slider-active");callback("finalise")}}var tween=function(){frame++;var c=tweenC,d=20,t=frame,b=tweenB,x=Math.ceil((t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b);pixelsToValue(t==d?tweenX:x);if(t!=d){callback("move");timer=setTimeout(tween,20)}else{clearTimeout(timer);timer=null;kbEnabled=true;removeClass(innerWrapper,"fd-slider-focused");removeClass(innerWrapper,"fd-slider-active");callback("finalise")}};function tweenTo(tx){kbEnabled=false;tweenX=parseInt(tx,10);tweenB=parseInt(vertical?handle.offsetTop:handle.offsetLeft,10);tweenC=tweenX-tweenB;tweenD=20;frame=0;if(!timer){timer=setTimeout(tween,20)}}function checkValue(value){if(isNaN(value)||value===""||typeof value=="undefined"){userSet=false;return defaultVal}else if(value<Math.min(rMin,rMax)){userSet=false;return Math.min(rMin,rMax)}else if(value>Math.max(rMin,rMax)){userSet=false;return Math.max(rMin,rMax)}userSet=true;return value}function getWorkingValueFromInput(){return getValidValue(tagName=="input"?parseFloat(inp.value):inp.selectedIndex)}function getValidValue(value){return(isNaN(value)||value===""||typeof value=="undefined")?defaultVal:Math.min(Math.max(value,Math.min(rMin,rMax)),Math.max(rMin,rMax))}function pixelsToValue(px){var val=getValidValue(scale?percentToValue(pixelsToPercent(px)):vertical?max-(Math.round(px/stepPx)*step):min+(Math.round(px/stepPx)*step));handle.style[vertical?"top":"left"]=(px||0)+"px";redrawRange();setInputValue((tagName=="select"||step==1)?Math.round(val):val)}function valueToPixels(val,updateInputValue){var clearVal=false,value;if((typeof val==="undefined"||isNaN(val)||val==="")&&tagName=="input"&&!forceValue){value=defaultVal;clearVal=true;userSet=false}else{value=checkValue(val)}handle.style[vertical?"top":"left"]=(scale?percentToPixels(valueToPercent(value)):vertical?Math.round(((max-value)/step)*stepPx):Math.round(((value-min)/step)*stepPx))+"px";redrawRange();if(typeof updateInputValue!==false){setInputValue(clearVal?"":value)}}function snapToPxValue(px){if(scale){return Math.max(Math.min(rMaxPx,px),rMinPx)}else{var rem=px%stepPx;if(rem&&rem>=(stepPx/2)){px+=(stepPx-rem)}else{px-=rem}if(px<Math.min(Math.abs(rMinPx),Math.abs(rMaxPx))){px=Math.min(Math.abs(rMinPx),Math.abs(rMaxPx))}else if(px>Math.max(Math.abs(rMinPx),Math.abs(rMaxPx))){px=Math.max(Math.abs(rMinPx),Math.abs(rMaxPx))}return Math.min(Math.max(px,0),rMaxPx)}}function percentToValue(pct){var st=0,fr=min,value;for(var s in scale){if(!scale.hasOwnProperty(s)){continue}if(pct>=st&&pct<=+s){value=fr+((pct-st)*(+scale[s]-fr))/(+s-st)}st=+s;fr=+scale[s]}return value}function valueToPercent(value){var st=0,fr=min,pct=0;for(var s in scale){if(!scale.hasOwnProperty(s)){continue}if(value>=fr&&value<=+scale[s]){pct=st+(value-fr)*(+s-st)/(+scale[s]-fr)}st=+s;fr=+scale[s]}return pct}function percentToPixels(percent){return((outerWrapper[vertical?"offsetHeight":"offsetWidth"]-handle[vertical?"offsetHeight":"offsetWidth"])/100)*percent}function pixelsToPercent(pixels){return pixels/((outerWrapper[vertical?"offsetHeight":"offsetWidth"]-outerWrapper[handle?"offsetHeight":"offsetWidth"])/100)}function setInputValue(val){callback("update");if(!userSet){addClass(innerWrapper,"fd-slider-no-value")}else{removeClass(innerWrapper,"fd-slider-no-value")}if(tagName=="select"){try{val=parseInt(val,10);if(inp.selectedIndex===val){updateAriaValues();return}inp.options[val].selected=true}catch(err){}}else{if(val!==""&&!userInput){val=(min+(Math.round((val-min)/step)*step)).toFixed(precision)}if(inp.value===val){updateAriaValues();return}inp.value=val}updateAriaValues();callback("change")}function checkInputValue(value){return!(isNaN(value)||value===""||value<Math.min(rMin,rMax)||value>Math.max(rMin,rMax))}function setSliderRange(newMin,newMax){if(rMin>rMax){newMin=Math.min(min,Math.max(newMin,newMax));newMax=Math.max(max,Math.min(newMin,newMax));rMin=Math.max(newMin,newMax);rMax=Math.min(newMin,newMax)}else{newMin=Math.max(min,Math.min(newMin,newMax));newMax=Math.min(max,Math.max(newMin,newMax));rMin=Math.min(newMin,newMax);rMax=Math.max(newMin,newMax)}if(defaultVal<Math.min(rMin,rMax)){defaultVal=Math.min(rMin,rMax)}else if(defaultVal>Math.max(rMin,rMax)){defaultVal=Math.max(rMin,rMax)}handle.setAttribute("aria-valuemin",rMin);handle.setAttribute("aria-valuemax",rMax);checkValue(tagName=="input"?parseFloat(inp.value):inp.selectedIndex);redraw()}function redrawRange(){if(noRangeBar){return}if(vertical){rangeBar.style["height"]=Math.max(1,(bar.offsetHeight-handle.offsetTop))+"px"}else{rangeBar.style["width"]=Math.max(1,handle.offsetLeft)+"px"}}function findLabel(){var label=false,labelList=document.getElementsByTagName('label');for(var i=0,lbl;lbl=labelList[i];i++){if((lbl['htmlFor']&&lbl['htmlFor']==inp.id)||(lbl.getAttribute('for')==inp.id)){label=lbl;break}}if(label&&!label.id){label.id=inp.id+"_label"}return label}function updateAriaValues(){var val=tagName=="select"?inp.options[inp.selectedIndex].value:inp.value,valTxt=ariaFormat?ariaFormat(val):tagName=="select"?(inp.options[inp.selectedIndex].text?inp.options[inp.selectedIndex].text:val):val;handle.setAttribute("aria-valuenow",val);handle.setAttribute("aria-valuetext",valTxt)}function onInputChange(e){userSet=true;userInput=userSnap;valueToPixels(tagName=="input"?parseFloat(inp.value):inp.selectedIndex);updateAriaValues();userInput=false}function onReset(e){if(tagName=="input"){inp.value=inp.defaultValue}else{inp.selectedIndex=resetDef}checkValue(tagName=="select"?inp.options[inp.selectedIndex].value:inp.value);redraw();updateAriaValues()}function valueSet(tf){userSet=!!tf}function setTabIndex(e,i){e.setAttribute(!false?"tabIndex":"tabindex",i);e.tabIndex=i}(function(){if(html5Shim||hideInput){addClass(inp,"fd-form-element-hidden")}else{addEvent(inp,'change',onInputChange)}if(html5Shim){inp.stepUp=function(n){increment(n||1)};inp.stepDown=function(n){increment(n||-1)}}outerWrapper=document.createElement('span');outerWrapper.className="fd-slider"+(vertical?"-vertical ":" ")+classNames;outerWrapper.id="fd-slider-"+inp.id;if(vertical&&inpHeight){outerWrapper.style.height=inpHeight+"px"}innerWrapper=document.createElement('span');innerWrapper.className="fd-slider-wrapper"+(!html5Shim?" fd-slider-no-value":"");ieBlur=document.createElement('span');ieBlur.className="fd-slider-inner";bar=document.createElement('span');bar.className="fd-slider-bar";if(fullARIA){handle=document.createElement('span')}else{handle=document.createElement('a');handle.setAttribute("href","#");addEvent(handle,"click",stopEvent)}setTabIndex(handle,0);handle.className="fd-slider-handle";handle.appendChild(document.createTextNode(String.fromCharCode(160)));innerWrapper.appendChild(ieBlur);if(!noRangeBar){rangeBar=document.createElement('span');rangeBar.className="fd-slider-range";innerWrapper.appendChild(rangeBar)}innerWrapper.appendChild(bar);innerWrapper.appendChild(handle);outerWrapper.appendChild(innerWrapper);inp.parentNode.insertBefore(outerWrapper,inp);if(isOpera||!true){handle.unselectable="on";bar.unselectable="on";ieBlur.unselectable="on";outerWrapper.unselectable="on";innerWrapper.unselectable="on";if(!noRangeBar){rangeBar.unselectable="on"}}outerWrapper.setAttribute("role","application");handle.setAttribute("role","slider");handle.setAttribute("aria-valuemin",tagName=="select"?inp.options[0].value:min);handle.setAttribute("aria-valuemax",tagName=="select"?inp.options[inp.options.length-1].value:max);var lbl=findLabel();if(lbl){handle.setAttribute("aria-labelledby",lbl.id);handle.id="fd-slider-handle-"+inp.id}if(document.getElementById(describedBy)){handle.setAttribute("aria-describedby",describedBy)}if(inp.getAttribute("disabled")==true){disableSlider(true)}else{enableSlider(true)}if(varSetRules.onvalue){userSet=true;checkValue(tagName=="input"?parseFloat(inp.value):inp.selectedIndex)}if(inp.form){addEvent(inp.form,"reset",onReset)}updateAriaValues();callback("create");redraw()})();return{onResize:function(e){if(outerWrapper.offsetHeight!=sliderH||outerWrapper.offsetWidth!=sliderW){redraw()}},destroy:function(){destroySlider()},reset:function(){valueToPixels(tagName=="input"?parseFloat(inp.value):inp.selectedIndex)},stepUp:function(n){increment(Math.abs(n)||1)},stepDown:function(n){increment(-Math.abs(n)||-1)},increment:function(n){increment(n)},disable:function(){disableSlider()},enable:function(){enableSlider()},setRange:function(mi,mx){setSliderRange(mi,mx)},getValueSet:function(){return!!userSet},setValueSet:function(tf){valueSet(tf)},checkValue:function(){if(varSetRules.onvalue){userSet=true;checkValue(tagName=="input"?parseFloat(inp.value):inp.selectedIndex)}updateAriaValues();redraw()}}}addEvent(window,"load",init);addEvent(window,"load",function(){setTimeout(function(){var slider;for(slider in sliders){sliders[slider].checkValue()}},0)});addEvent(window,"resize",resize);addEvent(window,"unload",unload);(function(){var scriptFiles=document.getElementsByTagName('script'),scriptInner=String(scriptFiles[scriptFiles.length-1].innerHTML).replace(/[\n\r\s\t]+/g," ").replace(/^\s+/,"").replace(/\s+$/,""),json=parseJSON(scriptInner);if(typeof json==="object"&&!("err"in json)){affectJSON(json)}})();return{rescanDocument:init,createSlider:function(opts){return createSlider(opts)},onDomReady:function(){onDomReady()},destroyAll:function(){destroyAllsliders()},destroySlider:function(id){return destroySingleSlider(id)},redrawAll:function(){resize()},addEvent:addEvent,removeEvent:removeEvent,stopEvent:stopEvent,increment:function(id,numSteps){if(!sliderExists(id)){return false}sliders[id].increment(numSteps)},stepUp:function(id,n){if(!sliderExists(id)){return false}sliders[id].stepUp(Math.abs(n)||1)},stepDown:function(id,n){if(!sliderExists(id)){return false}sliders[id].stepDown(-Math.abs(n)||-1)},setRange:function(id,newMin,newMax){if(!sliderExists(id)){return false}sliders[id].setRange(newMin,newMax)},updateSlider:function(id){if(!sliderExists(id)){return false}sliders[id].onResize();sliders[id].reset()},disable:function(id){if(!sliderExists(id)){return false}sliders[id].disable()},enable:function(id){if(!sliderExists(id)){return false}sliders[id].enable()},getValueSet:function(){return getValueSet()},setValueSet:function(a,tf){if(!sliderExists(id)){return false}setValueSet(a,tf)},setGlobalVariables:function(json){affectJSON(json)},removeOnload:function(){removeOnLoadEvent()}}})();