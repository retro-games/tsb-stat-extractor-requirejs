/**
 * Created by Ed on 12/4/14.
 */

var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start spec run, once Require.js is done
    callback: window.__karma__.start
});