/*
<div id="ironichitcounter">
    <span class="ihc-title">IHC</span>
    <span class="ihc-site">site <em>15</em></span>
    <span class="ihc-page">page <em>3</em></span>
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
    
    var titleSpan = document.createElement('span');
    titleSpan.setAttribute('class', 'ihc-title');
    var titleSpanText = document.createTextNode('IHC');
    titleSpan.appendChild(titleSpanText);
    
    var siteSpan = document.createElement('span');
    siteSpan.setAttribute('class', 'ihc-site');
    var siteSpanText = document.createTextNode('site ');
    siteSpan.appendChild(siteSpanText)
    var siteSpanEm = document.createElement('em');
    var siteSpanCountText = document.createTextNode('{{ site_count }}');
    siteSpanEm.appendChild(siteSpanCountText);
    siteSpan.appendChild(siteSpanEm);
    
    var pageSpan = document.createElement('span');
    pageSpan.setAttribute('class', 'ihc-page');
    var pageSpanText = document.createTextNode('page ');
    pageSpan.appendChild(pageSpanText)
    var pageSpanEm = document.createElement('em');
    var pageSpanCountText = document.createTextNode('{{ page_count }}');
    pageSpanEm.appendChild(pageSpanCountText);
    pageSpan.appendChild(pageSpanEm);
    
    elt.appendChild(titleSpan);
    elt.appendChild(siteSpan);
    elt.appendChild(pageSpan);
})();