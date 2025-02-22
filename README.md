###APIVeil

This project consists of two servers:

Proxy Server (proxy.cpp)

Listens on port 3000 for incoming HTTP requests.
Sends the request body to the OpenAI API (GPT‑3.5‑turbo) for processing.
Wraps the processed text in JSON and sends it to a base API (here, a simple echo server).
Returns the base API’s response back to the original client.
Echo Server (echo_server.cpp)

Listens on port 4000.
Receives HTTP POST requests.
Echoes back the received JSON payload.
Prerequisites
A. Install POCO

macOS

Install Homebrew (if not already installed):
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Then install POCO:
brew install poco
Windows

Install vcpkg (Microsoft’s C++ package manager):
a) git clone https://github.com/microsoft/vcpkg.git
b) cd vcpkg
c) .\bootstrap-vcpkg.bat
Install POCO:
.\vcpkg install poco
Make sure you have a C++ compiler (e.g., MinGW or Visual Studio) properly installed.
B. Set Up Your OpenAI API Key

macOS (Bash or Zsh)
export OPENAI_API_KEY=YOUR_OPENAI_API_KEY

Windows (PowerShell)
$env:OPENAI_API_KEY="YOUR_OPENAI_API_KEY"

Replace YOUR_OPENAI_API_KEY with your actual key from OpenAI’s platform.

Build and Run
A. Compile & Run the Echo Server

The echo server listens on port 4000 and returns (echoes) any JSON payload you send.

macOS (Apple Silicon example): g++ -std=c++17 -I/opt/homebrew/include -L/opt/homebrew/lib echo_server.cpp -lPocoNet -lPocoUtil -lPocoFoundation -pthread -o echo_server
./echo_server
(If on Intel macOS, replace /opt/homebrew with /usr/local)

You should see:
Echo server listening on port 4000

Windows (PowerShell, using vcpkg): g++ -std=c++17 -IC:\vcpkg\installed\x64-windows\include -LC:\vcpkg\installed\x64-windows\lib echo_server.cpp -lPocoNet -lPocoUtil -lPocoFoundation -pthread -o echo_server.exe
.\echo_server.exe

You should see:
Echo server listening on port 4000

B. Compile & Run the Proxy Server

The proxy server listens on port 3000 and communicates with both the OpenAI API and the echo server.

macOS (Apple Silicon example): g++ -std=c++17 -I/opt/homebrew/include -L/opt/homebrew/lib proxy.cpp -lPocoNet -lPocoUtil -lPocoFoundation -lPocoNetSSL -lPocoCrypto -lPocoJSON -pthread -o proxy
./proxy
(If on Intel macOS, replace /opt/homebrew with /usr/local)

You should see:
Proxy server listening on port 3000

Windows (PowerShell, using vcpkg): g++ -std=c++17 -IC:\vcpkg\installed\x64-windows\include -LC:\vcpkg\installed\x64-windows\lib proxy.cpp -lPocoNet -lPocoUtil -lPocoFoundation -lPocoNetSSL -lPocoCrypto -lPocoJSON -pthread -o proxy.exe
.\proxy.exe

You should see:
Proxy server listening on port 3000

Testing
A. Test the Echo Server Directly

Open a new terminal window and run:

curl -X POST -d '{"test": "hello"}' http://127.0.0.1:4000/echo

Expected response (it simply echoes back the JSON body you sent):

{"test": "hello"}

B. Test the Proxy Server

Send a POST request to the proxy on port 3000:

curl -X POST -d "What is the capital of France?" http://127.0.0.1:3000/test

Expected flow:

The proxy reads your request and sends "What is the capital of France?" to the OpenAI GPT-3.5-turbo endpoint.
The OpenAI API responds with something like "The capital of France is Paris."
The proxy wraps that text in a JSON object (e.g. {"processed": "The capital of France is Paris."}) and forwards it to the echo server on port 4000.
The echo server echoes that JSON back.
Finally, the proxy returns the echoed JSON to your curl command.
Example output: {"processed":"The capital of France is Paris."}

Troubleshooting
Connection Refused

Make sure the echo server is running on port 4000 before you send a request to the proxy.
If you see IPv6 issues, change "localhost" to "127.0.0.1" in proxy.cpp.
OpenAI Deprecation

If you see a warning about text-davinci-003, make sure your proxy uses "gpt-3.5-turbo."
Missing Libraries

On Windows, confirm you installed POCO via vcpkg and provided the correct paths with -I and -L.
API Key Not Set

Ensure OPENAI_API_KEY is set in the same terminal session you use to run the proxy.
