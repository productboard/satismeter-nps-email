serve:
	supervisor -e js,hbs examples/server.js

serve-client:
	node_modules/.bin/beefy examples/client.js

test:
	mocha tests/test.js

.PHONY: test
