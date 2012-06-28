
output ?= './prime.wrup.js'
output_compress ?= './prime.min.js'
amd ?= ''

all: test build build-compress

test: test-node

test-node:
	@./node_modules/mocha/bin/mocha --reporter nyan \
		./test/es5/* \
		./test/util/* \
		./test/prime/* \
		./test/collection/*

build:
	@./node_modules/wrapup/bin/wrup.js -r prime ./ > $(output)
	@echo "File written to $(output)"

build-compress:
	@./node_modules/wrapup/bin/wrup.js -r prime ./ --compress yes > $(output_compress)
	@echo "File written to $(output_compress)"

convert-amd:
	@bash ./bin/convert-amd.sh $(amd)
