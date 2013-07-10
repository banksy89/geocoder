define(["require"], function (require) {

    var support_placeholder = (function(){
        return "placeholder" in document.createElement("input");
    }());
    
    if (!support_placeholder) {
        var html = document.documentElement;
        	html.className += ' no-placeholder';
        	
        require(["../Polyfills/placeholder"]);
    }

});