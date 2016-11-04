// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).
// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    websiteUrl = process.env.websiteUrl,
    websiteUrlSSL = process.env.websiteUrlSSL,
    config;

// Azure Feature
// ------------------------------------------------------------------------
// If the App Setting 'websiteUrl' is set, Ghost will use that URL as base.
// If it isn't set, we'll go with the default sitename.
if (!websiteUrl || websiteUrl === '' ||  websiteUrl.length === 0) {
    websiteUrl = 'http://' + process.env.WEBSITE_HOSTNAME;
    console.log(websiteUrl);
}

if (!websiteUrlSSL || websiteUrlSSL === '' ||  websiteUrlSSL.length === 0) {
    websiteUrlSSL = 'https://' + process.env.WEBSITE_HOSTNAME;
    console.log(websiteUrlSSL);
}

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: websiteUrl,
        urlSSL: websiteUrlSSL,
        
        mail: {
            from: process.env.emailFromAddress,
            transport: 'SMTP',
            options: {
                service: process.env.emailService,
                host: process.env.emailHost,
                port: process.env.emailPort,
                auth: {
                    user: process.env.emailUsername,
                    pass: process.env.emailPassword
                }
            }
        },
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost.db')
            },
            debug: false
        },

        server: {
            host: '127.0.0.1',
            port: process.env.PORT
        },
        
        forceAdminSSL: true
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:2368',

        // Example refferer policy
        // Visit https://www.w3.org/TR/referrer-policy/ for instructions
        // default 'origin-when-cross-origin',
        // referrerPolicy: 'origin-when-cross-origin',

        
        mail: {},

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    }
};

module.exports = config;
