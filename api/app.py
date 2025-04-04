from flask import Flask
from api.auth.auth_controller import auth_bp
from api.proxy.proxy_controller import proxy_bp
from api.util import UnauthorizedError

app = Flask(__name__)

app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
app.register_blueprint(proxy_bp, url_prefix='/api/v1/proxy')

@app.errorhandler(Exception)
def handle_error(e):
    if isinstance(e, ValueError):
        return {"error": str(e)}, 400
    if isinstance(e, type(UnauthorizedError)):
        return {"error": str(e)}, 401
    return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(port=8080, debug=True)