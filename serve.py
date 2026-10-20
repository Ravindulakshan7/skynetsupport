"""Local preview with correct module MIME types and no stale development cache."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class SiteHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        '.js': 'text/javascript',
        '.mjs': 'text/javascript',
        '.css': 'text/css',
        '.splinecode': 'application/octet-stream',
    }

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


if __name__ == '__main__':
    root = Path(__file__).resolve().parent
    handler = partial(SiteHandler, directory=str(root))
    print('SKYNET preview: http://127.0.0.1:5173/site.html', flush=True)
    try:
        ThreadingHTTPServer(('127.0.0.1', 5173), handler).serve_forever()
    except KeyboardInterrupt:
        pass
