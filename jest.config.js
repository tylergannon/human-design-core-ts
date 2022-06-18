// import utils from 'ts-jest'
// import tsconfig from './tsconfig.json' assert { type: 'json' }

/** @type {import('jest').Config} */
export default {
    preset: 'ts-jest/presets/js-with-ts-esm',
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.spec.ts'],
    "transformIgnorePatterns": [
        "node_modules/(?!(.*union-find-ts|.*internmap|.*d3-?(color|transition|timer|ease|chord|contour|delaunay|dsv|path|array|axis|brush|dispatch|drag|selection|interpolate)?)/)"
    ],
    extensionsToTreatAsEsm: ['.ts'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/astro/**/*.ts',
        '!<rootDir>/src/types/**/*.ts',
    ],
    moduleNameMapper: {
        '^\\$astro$': '<rootDir>/src/astro/index.ts',
        '^\\$astro/(.*)$': '<rootDir>/src/astro/$1',
        '^\\$hd$': '<rootDir>/src/humandesign/index.ts',
        '^\\$hd/(.*)$': '<rootDir>/src/humandesign/$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    globals: {
        'ts-jest': {
            diagnostics: false,
            isolatedModules: true,
            useESM: true
        },
    },
}
