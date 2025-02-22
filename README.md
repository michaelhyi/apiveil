# APIVeil

Currently APIVeil consists of two servers:

* **Proxy Server (proxy.cpp)**: Listens on port 3000 for incoming HTTP requests. Sends the request body to the OpenAI API (GPT-3.5-turbo) for processing. Wraps the processed text in JSON and sends it to a base API (here, a simple echo server). Returns the base API’s response back to the original client.
* **Echo Server (echo_server.cpp)**: Listens on port 4000. Receives HTTP POST requests. Echoes back the received JSON payload.

## Prerequisites

### A. Install POCO

#### macOS

1.  Install Homebrew (if not already installed):

    ```bash
    /bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh))"
    ```

2.  Install POCO:

    ```bash
    brew install poco
    ```

#### Windows

1.  Install vcpkg (Microsoft’s C++ package manager):

    ```bash
    git clone [https://github.com/microsoft/vcpkg.git](https://github.com/microsoft/vcpkg.git)
    cd vcpkg
    .\bootstrap-vcpkg.bat
    ```

2.  Install POCO:

    ```bash
    .\vcpkg install poco
    ```

    * Make sure you have a C++ compiler (e.g., MinGW or Visual Studio) properly installed.
