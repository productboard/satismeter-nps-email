serve:
	node_modules/.bin/supervisor -e js,hbs examples/server.js

serve-client:
	node_modules/.bin/beefy examples/client.js

test:
	node_modules/.bin/mocha tests/test.js

version:
	node_modules/.bin/mversion -mn

.PHONY: test serve serve-client version
