
OUTPUT ?= prime.wrup.js
OUTPUT_MIN ?= prime.min.js
AMD ?= amd

all: test

clean:
	rm -rf ./cov*

test: test-node test-phantomjs

test-node:
	@./node_modules/mocha/bin/mocha \
		./test/prime/* \
		./test/es5/* \
		./test/util/* \
		./test/shell/*

test-browser:
	@./node_modules/wrapup/bin/wrup.js --require ./test/main.js --output ./test/browser.js

test-phantomjs: test-browser
	@python -m SimpleHTTPServer & echo $$! > server.pid
	@./node_modules/.bin/mocha-phantomjs http://localhost:8000/test/index.html
	@kill `cat server.pid`
	@rm server.pid

.PHONY: cov
cov:
	rm -rf ./cov
	mkdir ./cov
	echo "{}" > ./cov.json
	cp -R test cov/test
	cp -R node_modules cov/node_modules
	cp Makefile cov/Makefile
	coverjs --recursive -o cov/ array/ date/ function/ number/ object/ string/ _shell.js array.js date.js defer.js emitter.js function.js index.js map.js number.js object.js regexp.js shell.js string.js type.js --template node --result ./cov.json
	cd cov; make test-node; cd ..
	cat ./cov.json | coverjs-report -r html > cov.html
	echo "open cov.html"
