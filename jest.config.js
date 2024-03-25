module.exports = {
  testRunner: 'jest-circus/runner',
  testEnvironment: 'node',
  testRegex: 'test.js',
  moduleFileExtensions: ['js', 'json'],
  reporters: [
    'default',
    [
      'jest-allure',
      {
        outputDir: 'allure-results',
        updateScreenshots: true,
        updateDiffs: true,
        outputFile: 'allure-results/allure-results.xml',
      },
    ],
  ],
};
