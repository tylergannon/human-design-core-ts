import utils from 'ts-jest'
import tsconfig from './tsconfig.json' assert { type: 'json' }

console.log('yo yo yo')
console.log(utils.pathsToModuleNameMapper(tsconfig.compilerOptions.paths))

export default {
    preset: 'ts-jest',
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.spec.ts'],
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
    },
    globals: {
        'ts-jest': {
            diagnostics: false,
            isolatedModules: true,
        },
    },
}
