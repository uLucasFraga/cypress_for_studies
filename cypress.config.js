const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = {
    video: false,
    e2e: {
        baseUrl: Cypress.env("baseUrl"),
        setupNodeEvents(on, config) {
            allureWriter(on, config);
            return config;
        },
    },
    env: {
        "allureResultsPath": "allure-results",
        "allureLogCypress": true
    }
}
