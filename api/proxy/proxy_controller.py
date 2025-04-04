from flask import Blueprint, request
from api.jwt.jwt_service import JwtService
from api.proxy.proxy_service import ProxyService

proxy_bp = Blueprint('proxy', __name__)

@proxy_bp.route('/', methods=['POST'])
def create_proxy():
    token = request.cookies.get('auth_token')
    jwt_payload = JwtService.decode_token(token)
    user_id = jwt_payload['sub']

    proxy_id = ProxyService.create_proxy(
        user_id,
        request.json['name'],
        request.json['cloudProvider'],
        request.json['cloudRegion'],
        request.json['pricingPlan'],
        request.json['apiProtocol'],
        request.json['apiBaseUrl']
    )

    return { 'proxyId': proxy_id }, 201