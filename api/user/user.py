import datetime

class User():
    def __init__(self, user_id: int, name: str, email: str, password: str, provider: str, role: str, is_active: bool, created_at: datetime, updated_at: datetime):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.password = password
        self.provider = provider
        self.role = role
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at