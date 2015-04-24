// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-03-27 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular-ui-sortable/sortable.js',
      'bower_components/ng-grid/build/ng-grid.js',
      'bower_components/Sortable/Sortable.js',
      'bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.js',
      'bower_components/swfobject/swfobject/swfobject.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angularLocalStorage/src/angularLocalStorage.js',
      'bower_components/showdown/src/showdown.js',
      'bower_components/angular-markdown-directive/markdown.js',
      'bower_components/highcharts-ng/dist/highcharts-ng.js',
      'bower_components/highcharts/highcharts.js',
      'bower_components/highcharts/highcharts-more.js',
      'bower_components/highcharts/modules/exporting.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/json3/lib/json3.min.js',
      // endbower
      'app/scripts/**/*.js',
      // 'test/mock/**/*.js',
      // 'dist/**/**/*.js',
      'test/spec/controllers/mainSpec.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
