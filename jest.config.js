/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // https://jestjs.io/es-ES/docs/code-transformation#typescript-with-type-checking
  // replace babel-est as default transpiler for ts-jest for typescript types
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Run tests from one or more projects
  projects: [
    // {
    //   displayName: 'linting',
    //   runner: 'jest-runner-tsc',
    //   testMatch: [
    //     '<rootDir>/test/*.ts',
    //   ],
    //   transform: {
    //     '^.+\\.(ts|tsx)$': 'ts-jest',
    //   },
    // },
    {
      displayName: 'testing',
      testMatch: [
        '<rootDir>/test/*.spec.ts',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      moduleDirectories: [
        'node_modules',
        'src',
      ],
      coverageDirectory: 'coverage',
    },
  ],
}
