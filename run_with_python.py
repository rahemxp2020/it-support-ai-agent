#!/usr/bin/env python3
"""
Autonomous IT Support AI Agent - Portable Python Launcher
Developer: Eng. Abdelrahim Mohamed Ahmed Mohamed (جمهورية مصر العربية - محافظة قنا)
Portfolio: https://github.com/rahemxp2020
Contact: +201009125279 | rahemxp2020@gmail.com | Telegram: 5516879336
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
TARGET_DIR = "dist" if os.path.exists("dist") else "."

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=TARGET_DIR, **kwargs)

    def end_headers(self):
        # Enable CORS and disable aggressive caching for local offline development
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

def main():
    print("=" * 65)
    print(" 🚀 Autonomous IT Support AI Agent - Portable Python Server")
    print(" 👨‍💻 Developer: Eng. Abdelrahim Mohamed Ahmed Mohamed (Egypt - Qena)")
    print(" 📂 Serving directory:", os.path.abspath(TARGET_DIR))
    print(f" 🌐 Local Address:   http://localhost:{PORT}")
    print("=" * 65)
    print(" Press Ctrl+C to stop the server anytime.\n")

    try:
        webbrowser.open(f"http://localhost:{PORT}")
    except Exception:
        pass

    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped successfully. Goodbye!")
            sys.exit(0)

if __name__ == "__main__":
    main()
