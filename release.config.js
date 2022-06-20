/** @type {import('semantic-release').Options} */

module.exports = {
    branches: ['main'],
    preset: 'eslint',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md'],
            },
        ],
        '@semantic-release/npm'
    ],
}
