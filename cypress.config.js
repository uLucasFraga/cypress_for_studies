const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = {
    video: false,
    e2e: {
        setupNodeEvents(on, config) {
            allureWriter(on, config);
            return config;
        },
    },
    env: {
        baseUrl: Cypress.env("baseUrl"),
        "allureResultsPath": "allure-results",
        "allureLogCypress": true
    }
}
