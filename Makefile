BIN = node_modules/.bin
SRC := $(shell find src -name '*')

dist: $(SRC)
	$(BIN)/tsc
	mkdir -p dist/templates
	# compile templates
	$(BIN)/handlebars src/templates/inline.hbs -f dist/templates/inline.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/templates/survey.hbs -f dist/templates/survey.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/templates/surveyV2.hbs -f dist/templates/surveyV2.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/templates/zonky-survey.hbs -f dist/templates/zonky-survey.js -c handlebars/dist/handlebars.runtime.js
	# compile partials
	$(BIN)/handlebars src/partials/choice-list.hbs -f dist/templates/choice-list.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/partials/number-scale.hbs -f dist/templates/number-scale.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/partials/paragraph.hbs -f dist/templates/paragraph.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/partials/survey-layout.hbs -f dist/templates/survey-layout.js -c handlebars/dist/handlebars.runtime.js
	$(BIN)/handlebars src/partials/survey-style.hbs -f dist/templates/survey-style.js -c handlebars/dist/handlebars.runtime.js
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
