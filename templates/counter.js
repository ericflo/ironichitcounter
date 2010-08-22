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
    
    var ihc = document.getElementById('ironichitcounter');
    if(!ihc) {
        return;
    }
    
    var listenForEvent = function(element, eventName, callback) {
        if(element.addEventListener) {
            element.addEventListener(eventName, callback, false);
        }
        else if(element.attachEvent) {
            element.attachEvent(eventName, callback);
        }
    };
    
    var showPage = (ihc.getAttribute('class') || '').indexOf('site') === -1;
    
    var addClear = function(elt) {
        var clear = document.createElement('div');
        clear.setAttribute('class', 'clear');
        elt.appendChild(clear);
    };
    
    var siteCount = '{{ site_count }}';
    var pageCount = '{{ page_count }}';
    
    var site = document.createElement('div');
    var siteClass = 'ihc-site';
    if(showPage) {
        siteClass += ' hide';
    }
    site.setAttribute('class', siteClass);

    var page = document.createElement('div');
    var pageClass = 'ihc-page';
    if(!showPage) {
        pageClass += ' hide';
    }
    page.setAttribute('class', pageClass);
    
    var render = function() {
        for(var i = 0; i < siteCount.length; ++i) {
            var digitDiv = document.createElement('div');
            digitDiv.setAttribute('class', 'digit');
            var digitText = document.createTextNode(siteCount[i]);
            digitDiv.appendChild(digitText);
            site.appendChild(digitDiv);
        }
        addClear(site);
    
        for(var i = 0; i < pageCount.length; ++i) {
            var digitDiv = document.createElement('div');
            digitDiv.setAttribute('class', 'digit');
            var digitText = document.createTextNode(pageCount[i]);
            digitDiv.appendChild(digitText);
            page.appendChild(digitDiv);
        }
        addClear(page);
    };
    
    ihc.appendChild(site);
    ihc.appendChild(page);
    addClear(ihc);
    
    var jsonpCount = 1;
    
    var poll = function() {
        var jsonp = 'jsonpfunc' + jsonpCount++;
        window[jsonp] = function(data) {
            siteCount = '' + data.site_count;
            pageCount = '' + data.page_count;
            while(site.childNodes.length > 0) {
                site.removeChild(site.firstChild);
            }
            while(page.childNodes.length > 0) {
                page.removeChild(page.firstChild);
            }
            render();
            setTimeout(poll, 6000);
        };
        var script = document.createElement('script');
        var src = '{{ url_for('data', referrer=referrer, _external=True) }}&jsonp=' + jsonp;
        script.setAttribute('src', src);
        document.body.appendChild(script);
    };

    var clickHandler = function(e) {
        document.location = '{{ url_for('home', _external=True) }}';
    };
    var mouseOverHandler = function(e) {
        var tempSiteClass = '' + siteClass;
        var tempPageClass = '' + pageClass;
        if(showPage) {
            tempPageClass += ' hide';
            tempSiteClass = tempSiteClass.replace(' hide', '');
        }
        else {
            tempSiteClass += ' hide';
            tempPageClass = tempPageClass.replace(' hide', '');
        }
        site.setAttribute('class', tempSiteClass);
        page.setAttribute('class', tempPageClass);
    };
    var mouseOutHandler = function(e) {
        site.setAttribute('class', siteClass);
        page.setAttribute('class', pageClass);
    }
    listenForEvent(ihc, 'click', clickHandler);
    listenForEvent(ihc, 'mouseover', mouseOverHandler);
    listenForEvent(ihc, 'mouseout', mouseOutHandler);
    render();
    setTimeout(poll, 6000);
})();