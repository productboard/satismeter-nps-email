BIN = node_modules/.bin

dist:
	$(BIN)/webpack src/index.ts -o dist/index.js

clean:
	rm -fr dist

storybook:
	$(BIN)/start-storybook -p 6006

test:
	$(BIN)/webpack src/tests/test.ts -o dist/tests/test.js --display=errors-only
	$(BIN)/mocha dist/tests/test.js

publish: test clean dist
	yarn semantic-release

.PHONY: clean storybook test publish
