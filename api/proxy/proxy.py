import datetime

class Proxy:
    def __init__(
        self,
        proxy_id: int,
        user_id: int,
        name: str,
        cloud_provider: str,
        cloud_region: str,
        pricing_plan: str,
        api_protocol: str,
        api_base_url: str,
        proxy_url: str,
        ip_address: str,
        server_id: str,
        created_at: datetime,
        updated_at: datetime,
    ):
        self.proxy_id = proxy_id
        self.user_id = user_id
        self.name = name
        self.cloud_provider = cloud_provider
        self.cloud_region = cloud_region
        self.pricing_plan = pricing_plan
        self.api_protocol = api_protocol
        self.api_base_url = api_base_url
        self.proxy_url = proxy_url
        self.ip_address = ip_address
        self.server_id = server_id
        self.created_at = created_at
        self.updated_at = updated_at

    def to_dict(self) -> dict:
        return {
            "proxy_id": self.proxy_id,
            "user_id": self.user_id,
            "name": self.name,
            "cloud_provider": self.cloud_provider,
            "cloud_region": self.cloud_region,
            "pricing_plan": self.pricing_plan,
            "api_protocol": self.api_protocol,
            "api_base_url": self.api_base_url,
            "proxy_url": self.proxy_url,
            "ip_address": self.ip_address,
            "server_id": self.server_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }