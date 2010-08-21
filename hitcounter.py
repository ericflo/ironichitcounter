import eventlet
import eventlet.wsgi
import eventlet.pools
eventlet.monkey_patch(all=True)

import sys
import traceback
import urlparse

from cStringIO import StringIO

import redis

from jsmin import JavascriptMinify

from flask import Flask, request, render_template

class ErrorPrintingApp(Flask):
    
    def handle_exception(self, e):
        exc_info = sys.exc_info()
        formatted_exception = traceback.format_exception(*exc_info)
        print >> sys.stderr, '\n'.join(formatted_exception)
        super(ErrorPrintingApp, self).handle_exception(e)

app = ErrorPrintingApp(__name__)

class RedisPool(eventlet.pools.Pool):

    def create(self):
        return redis.Redis()

REDIS_POOL = RedisPool()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/counter.js')
def counter():
    referrer = request.headers.get('Referer')
    site_count = 0
    page_count = 0
    if referrer:
        parsed = urlparse.urlparse(referrer)
        site_key = (u'site|%s' % (parsed.netloc,)).encode('utf-8')
        page_key = (u'page|%s|%s' % (parsed.netloc, parsed.path)).encode('utf-8')
        with REDIS_POOL.item() as client:
            site_count = client.incr(site_key)
            page_count = client.incr(page_key)
    context = {
        'site_count': site_count,
        'page_count': page_count,
    }
    rendered = StringIO(
        render_template('counter.js', **context).encode('utf-8'))
    minified = StringIO()
    JavascriptMinify().minify(rendered, minified)
    resp = app.make_response(minified.getvalue())
    resp.headers['Content-Type'] = 'appliction/javascript'
    return resp

if __name__ == '__main__':
    sock = None
    try:
        sock = eventlet.listen(('', 8080))
        eventlet.wsgi.server(sock, app)
    except (KeyboardInterrupt, SystemError):
        if sock:
            sock.close()