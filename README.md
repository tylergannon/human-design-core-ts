# @tylergannon/human-design-core-ts

[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> Human Design Core Computations and Objects


## Install

```bash
pnpm install @tylergannon/human-design-core-ts
```

## Usage

```ts
import { myPackage } from '@tylergannon/human-design-core-ts';

myPackage('hello');
//=> 'hello from my package'
```

## Contributing

Open a pull request.

Commit format is [eslint][build-format]. Here is a copy of a part of the guideline.

```
Tag: Short description (fixes #1234)

Longer description here if necessary
```
The first line of the commit message (the summary) must have a specific format. This format is checked by our build tools.

The `Tag` is one of the following:

* `Fix` - for a bug fix.
* `Update` - either for a backwards-compatible enhancement or for a rule change that adds reported problems.
* `New` - implemented a new feature.
* `Breaking` - for a backwards-incompatible enhancement or feature.
* `Docs` - changes to documentation only.
* `Build` - changes to build process only.
* `Upgrade` - for a dependency upgrade.
* `Chore` - for refactoring, adding tests, etc. (anything that isn't user-facing).

Use the [labels of the issue you are working on](working-on-issues.md#issue-labels) to determine the best tag.

The message summary should be a one-sentence description of the change, and it must be 72 characters in length or shorter. If the pull request addresses an issue, then the issue number should be mentioned at the end. If the commit doesn't completely fix the issue, then use `(refs #1234)` instead of `(fixes #1234)`.

Here are some good commit message summary examples:

```
Build: Update Travis to only test Node 0.10 (refs #734)
Fix: Semi rule incorrectly flagging extra semicolon (fixes #840)
Upgrade: Esprima to 1.2, switch to using comment attachment (fixes #730)
```

The commit message format is important because these messages are used to create a changelog for each release. The tag and issue number help to create more consistent and useful changelogs.

[build-format]:https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-eslint
[build-img]:https://github.com/tylergannon/human-design-core-ts/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/tylergannon/human-design-core-ts/actions/workflows/release.yml
[issues-img]:https://img.shields.io/github/issues/tylergannon/human-design-core-ts
[issues-url]:https://github.com/tylergannon/human-design-core-ts/issues
[codecov-img]:https://codecov.io/gh/tylergannon/human-design-core-ts/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/tylergannon/human-design-core-ts
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
