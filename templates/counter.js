/*
<div id="ironichitcounter">
    <span class="ihc-site">15</span>
    <span class="ihc-page">3</span>
</div>
*/
(function() {
    var css = document.getElementById('ironichitcounter-css');
    if(!css) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('media', 'screen');
        css.setAttribute('href', '{{ url_for('static', filename='css/counter.css', _external=True) }}');
        css.setAttribute('id', 'ironichitcounter-css');
    	document.getElementsByTagName('head')[0].appendChild(css);
	}
    
    var elt = document.getElementById('ironichitcounter');
    if(!elt) {
        return;
    }
    
    var siteSpan = document.createElement('span');
    siteSpan.setAttribute('class', 'ihc-site');
    var siteSpanText = document.createTextNode('{{ site_count }}');
    siteSpan.appendChild(siteSpanText);
    
    var pageSpan = document.createElement('span');
    pageSpan.setAttribute('class', 'ihc-page');
    var pageSpanText = document.createTextNode('{{ page_count }}');
    pageSpan.appendChild(pageSpanText);
    
    elt.appendChild(siteSpan);
    elt.appendChild(pageSpan);
})();