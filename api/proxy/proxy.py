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
        self.ip_address = ip_address
        self.server_id = server_id
        self.created_at = created_at
        self.updated_at = updated_at