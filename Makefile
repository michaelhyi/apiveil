compile:
	g++ -std=c++17 ./proxy/*.cpp -I/opt/homebrew/include -L/opt/homebrew/lib \
	-lPocoNet -lPocoFoundation -lPocoUtil -lPocoNetSSL -lPocoJson \
	-o proxy_compiled