const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = {
    video: false,
    e2e: {
        baseUrl: "https://serverest.dev",
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
