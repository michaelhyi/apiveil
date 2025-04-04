import psycopg2
from api.user.user import User

connection = psycopg2.connect(
    host="localhost",
    database="apiveil",
    user="postgres"
)

class UserDao():
    @staticmethod
    def get_user_by_email(email: str) -> User | None:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM public.user WHERE email = %s", (email,))
            result_user = cursor.fetchone()

            if result_user is None:
                return None

            return User(*result_user)

    @staticmethod
    def create_user(name: str, email: str, password: str, provider: str):
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO public.user (name, email, password, provider) VALUES (%s, %s, %s, %s) RETURNING user_id",
                (name, email, password, provider)
            )
            user_id = cursor.fetchone()[0]
            connection.commit()
            return user_id