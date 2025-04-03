CREATE TABLE IF NOT EXISTS proxy (
    proxy_id       SERIAL PRIMARY KEY,
    user_id        INT NOT NULL,
    name           VARCHAR(100) NOT NULL,
    cloud_provider VARCHAR(50) NOT NULL,      -- like AWS, Azure, GCP
    cloud_region   VARCHAR(50) NOT NULL,      -- like us-east-1
    pricing_plan   VARCHAR(50) NOT NULL,      -- like Free Tier, Enterprise
    api_protocol   VARCHAR(50) NOT NULL,      -- like HTTP, gRPC
    api_base_url   VARCHAR(255) NOT NULL,     -- like https://api.example.com
    ip_address     VARCHAR(50),              -- optional
    server_id      VARCHAR(50),          -- optional
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_proxy_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);