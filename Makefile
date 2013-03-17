
OUTPUT ?= prime.wrup.js
OUTPUT_MIN ?= prime.min.js
AMD ?= amd

all: test doc/prime.html

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

coverage:
	rm -rf ./cov
	mkdir ./cov
	echo "{}" > ./cov.json
	cp -R test cov/test
	cp -R node_modules cov/node_modules
	cp Makefile cov/Makefile
	coverjs --recursive -o cov/ es5/ shell/ emitter.js index.js map.js shell.js type.js --template node --result ./cov.json
	cd cov; make test; cd ..
	cat ./cov.json | coverjs-report -r html > cov.html
	echo "open cov.html"
