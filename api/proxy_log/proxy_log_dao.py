import psycopg2
from api.proxy_log.proxy_log import ProxyLog

connection = psycopg2.connect(
    host="localhost",
    database="apiveil",
    user="postgres"
)

class ProxyLogDao():
    @staticmethod
    def get_all_proxy_logs_by_proxy_id(proxy_id: int) -> list[ProxyLog]:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM public.proxy_log WHERE proxy_id = %s", (proxy_id,))
            result_set = cursor.fetchall()

            if not result_set:
                return []

            return [ProxyLog(*result) for result in result_set]