.PHONY: bump-version:
bump-version:
	npm version minor
	git add package.json
	git commit -m "RELEASE $(cat package.json | jq -r .version)"

.PHONY: publish
publish:
	npm test
	npm publish --access public