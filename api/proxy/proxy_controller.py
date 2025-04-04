from flask import Blueprint, request
from api.jwt.jwt_service import JwtService
from api.proxy.proxy_service import ProxyService
from api.util import UnauthorizedError

proxy_bp = Blueprint('proxy', __name__)

@proxy_bp.route('/<user_id>', methods=['GET'])
def get_all_proxies_by_user_id(user_id: int):
    token = request.cookies.get('auth_token')
    jwt_payload = JwtService.decode_token(token)

    if user_id != jwt_payload['sub']:
        raise UnauthorizedError('unauthorized access to this resource')

    proxies = ProxyService.get_all_proxies_by_user_id(user_id)
    return { 'proxies': proxies }, 200

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