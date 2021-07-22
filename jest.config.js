/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // Run tests from one or more projects
  projects: [
    {
      displayName: 'linting',
      runner: 'jest-runner-eslint',
      testMatch: [
        '<rootDir>/src/*.js',
        '<rootDir>/src/**/*.js',
      ],
    },
    {
      displayName: 'testing',
      testMatch: [
        '<rootDir>/src/**/*.spec.js',
      ],
      moduleDirectories: [
        'node_modules',
        'src',
      ],
      coverageDirectory: 'coverage',
    },
  ],
}
