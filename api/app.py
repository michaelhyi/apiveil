from flask import Flask
from flask_cors import CORS
from api.auth.auth_controller import auth_bp
from api.proxy.proxy_controller import proxy_bp
from api.proxy_log.proxy_log_controller import proxy_log_bp
from api.util import UnauthorizedError

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
app.register_blueprint(proxy_bp, url_prefix='/api/v1/proxies')
app.register_blueprint(proxy_log_bp, url_prefix='/api/v1/proxies')

@app.errorhandler(Exception)
def handle_error(e):
    if isinstance(e, ValueError):
        return {"error": str(e)}, 400
    if isinstance(e, type(UnauthorizedError)):
        return {"error": str(e)}, 401
    return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(port=8080, debug=True)