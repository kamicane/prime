
all: test build

test: test-node

test-node:
	@mocha \
		./test/es5/* \
		./test/util/* \
		./test/prime/*

build:
	@if [ ! -e ./dist ]; then mkdir dist; fi
	@wrup -r prime ./main.js > ./dist/prime.js
	@wrup -r prime ./main.js --compress yes > ./dist/prime.min.js

convert-amd:
	@bash ./bin/convert-amd.sh
