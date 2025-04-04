from api.proxy_log.proxy_log import ProxyLog
from api.proxy_log.proxy_log_dao import ProxyLogDao
from api.proxy.proxy_dao import ProxyDao

class ProxyLogService():
    @staticmethod
    def get_all_proxy_logs_by_proxy_id(proxy_id: int) -> list[ProxyLog]:
        if not proxy_id:
            raise ValueError("invalid proxy id")

        if not ProxyDao.get_proxy_by_id(proxy_id):
            raise ValueError("proxy not found")

        return ProxyLogDao.get_all_proxy_logs_by_proxy_id(proxy_id)