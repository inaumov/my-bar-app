angular.module('myBar.config', [])
    .constant('GENERAL_CONFIG',
        {
            "APP_NAME": "My Bar",
            "APP_VERSION": "0.1",
            "BASE_URL": "http://localhost:8089/api/bar/v1",
            "AUTH_URL": "http://localhost:8089/api/bar/oauth/token",
            "debugInfoEnabled": false
        }
    );
