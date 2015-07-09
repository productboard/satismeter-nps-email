serve:
	supervisor -e js,jade examples/server.js

test:
	mocha tests/test.js

.PHONY: test
