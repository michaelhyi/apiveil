from api.proxy.proxy import Proxy
from api.proxy.proxy_dao import ProxyDao
from api.user.user_dao import UserDao
from api.util import valid_string

class ProxyService():
    @staticmethod
    def get_all_proxies_by_user_id(user_id: int) -> list[dict]:
        if not user_id:
            raise ValueError("invalid proxy id")

        if not UserDao.get_user_by_id(user_id):
            raise ValueError("user not found")

        return [proxy.to_dict() for proxy in ProxyDao.get_all_proxies_by_user_id(user_id)]

    @staticmethod
    def create_proxy(
        user_id: int,
        name: str,
        cloud_provider: str,
        cloud_region: str,
        pricing_plan: str,
        api_protocol: str,
        api_base_url: str
    ) -> int:
        if not user_id:
            raise ValueError("invalid user id")
        if not valid_string(name):
            raise ValueError("invalid name")
        if not valid_string(cloud_provider):
            raise ValueError("invalid cloud provider")
        if not valid_string(cloud_region):
            raise ValueError("invalid cloud region")
        if not valid_string(pricing_plan):
            raise ValueError("invalid pricing plan")
        if not valid_string(api_protocol):
            raise ValueError("invalid API protocol")
        if not valid_string(api_base_url):
            raise ValueError("invalid API base URL")

        if ProxyDao.get_proxy_by_name(name):
            raise ValueError("a proxy with that name already exists")

        return ProxyDao.create_proxy(
            user_id,
            name,
            cloud_provider,
            cloud_region,
            pricing_plan,
            api_protocol,
            api_base_url,
            '',
            '',
            ''
        )
