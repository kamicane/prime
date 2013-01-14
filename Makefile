
OUTPUT ?= prime.wrup.js
OUTPUT_MIN ?= prime.min.js
AMD ?= amd

all: test build build-compress

clean:
	rm -rf prime.*
	rm -rf ./cov*

test: test-node

test-node:
	@./node_modules/mocha/bin/mocha \
		./test/prime/* \
		./test/es5/* \
		./test/util/* \
		./test/shell/*

$(OUTPUT): es5 prime shell util
	@./node_modules/wrapup/bin/wrup.js -r prime ./ > $(OUTPUT)
	@echo "File written to $(OUTPUT)"

$(OUTPUT_MIN): es5 prime shell util
	@./node_modules/wrapup/bin/wrup.js -r prime ./ --compress yes > $(OUTPUT_MIN)
	@echo "File written to $(OUTPUT_MIN)"

$(AMD): es5 prime shell util
	@bash ./bin/convert-amd.sh $(AMD)

doc/prime.html: doc/prime.md
	@./node_modules/.bin/procs -f ./doc/prime.md -t ./doc/layout.html

docs: doc/prime.html

docs-watch:
	@./node_modules/.bin/procs -f ./doc/prime.md -t ./doc/layout.html --watch

coverage:
	rm -rf ./cov
	mkdir ./cov
	echo "{}" > ./cov.json
	cp -R test cov/test
	cp -R node_modules cov/node_modules
	cp Makefile cov/Makefile
	coverjs --recursive -o cov/ es5/ prime/ shell/ util/ --template node --result ./cov.json
	cd cov; make test; cd ..
	cat ./cov.json | coverjs-report -r html > cov.html
	echo "open cov.html"
