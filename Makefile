
output ?= './prime.wrup.js'
output_compress ?= './prime.min.js'
amd ?= ''

all: test build build-compress

test: test-node

test-node:
	@mocha \
		./test/es5/* \
		./test/util/* \
		./test/prime/*

build:
	@wrup -r prime ./ > $(output)
	@echo "File written to $(output)"

build-compress:
	@wrup -r prime ./ --compress yes > $(output_compress)
	@echo "File written to $(output_compress)"

convert-amd:
	@bash ./bin/convert-amd.sh $(amd)
