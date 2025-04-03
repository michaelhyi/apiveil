CREATE TABLE IF NOT EXISTS proxy_log (
    log_id     SERIAL PRIMARY KEY,
    proxy_id   INT NOT NULL,
    timestamp  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    method     VARCHAR(10),         -- like GET or POST
    path       VARCHAR(255),
    status_code INT,
    headers    TEXT,
    body       TEXT,
    protocol   VARCHAR(50),         -- like HTTP, WebSocket, gRPC
    -- If we want to differentiate request vs. response, add a column here
    request_or_response CHAR(1) DEFAULT 'R',

    CONSTRAINT fk_log_proxy
        FOREIGN KEY (proxy_id) REFERENCES proxy(proxy_id)
        ON DELETE CASCADE
);