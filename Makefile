serve:
	supervisor -e js,jade examples/example.js

test:
	mocha tests/test.js

.PHONY: test
