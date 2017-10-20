angular.module('myBar.config', [])
    .constant('GENERAL_CONFIG',
        {
            "APP_NAME": "My Bar",
            "APP_VERSION": "0.1.dev",
            "BASE_URL": "/mocks",
            "debugInfoEnabled": false
        }
    );
