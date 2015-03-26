// conf.js
exports.config = {
  seleniumServerJar: 'lib/selenium-server-standalone-2.45.0.jar',
  specs: ['spec.js'],
  multiCapabilities: [
    //{
    //  'browserName': 'chrome'
    //},
    {
      'browserName': 'firefox'
    }
  ]
};
