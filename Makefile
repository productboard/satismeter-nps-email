BIN = node_modules/.bin
SRC := $(shell find src -name '*')

dist: dist/.touch

dist/.touch: $(SRC) tsconfig.json
	$(BIN)/webpack src/index.ts -o dist/index.js
	touch dist/.touch

clean:
	rm -fr dist

storybook:
	$(BIN)/start-storybook -p 6006

test:
	$(BIN)/webpack src/tests/test.ts -o dist/tests/test.js --display=errors-only
	$(BIN)/mocha dist/tests/test.js

publish: test clean dist
	yarn semantic-release

format:
	yarn prettier --write "**/*.{ts,js,json}"

.PHONY: clean storybook test publish format
