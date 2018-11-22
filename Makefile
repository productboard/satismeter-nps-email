BIN = node_modules/.bin
SRC := $(shell find src -name '*')

dist: $(SRC)
	$(BIN)/tsc
	mkdir -p dist/templates
	$(BIN)/handlebars src/templates/inline.hbs -f dist/templates/inline.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/templates/survey.hbs -f dist/templates/survey.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/templates/zonky-survey.hbs -f dist/templates/zonky-survey.js -c handlebars/dist/handlebars.runtime.js
	touch $@	

clean:
	rm -fr dist

serve: dist
	node dist/examples/server.js

test: dist
	$(BIN)/mocha dist/tests/test.js

publish: clean dist test
	yarn publish --access public
	git push --tag
	git push origin head

.PHONY: clean serve test publish
