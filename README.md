# [Ghost (0.11.3)](https://github.com/TryGhost/Ghost) [![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

Want to install [Ghost](https://ghost.org/) on Azure? Just click the 'Deploy to Azure' button and you're well on your way to have a Ghost Blog running within a minute or two!

## Ghost-Azure

Ghost Azure is a project that maintains the minimum configuration required to run [Ghost](https://ghost.org/) in Azure Web Apps. This project does not contain alterations to Ghost itself.

Please make sure you use either Basic or Standard App Service plan otherwise the deployment may fail due to NPM using more resources than the Azure [sandbox](https://github.com/projectkudu/kudu/wiki/Azure-Web-App-sandbox) allows.  To work around this, deploy into a Basic or higher plan and then scale down if needed.  More information in [#30](https://github.com/felixrieseberg/Ghost-Azure/issues/30#issuecomment-217028469) and [npm/npm#7200](https://github.com/npm/npm/issues/7200).

After deployment, Ghost will continue setup - resulting in your brand new website staying blank on the very first load. Please give your website a solid minute of time. It will appear like the site isn't loading, but in reality, it's just creating your database in the background. This only happens the very first time you load your website - simply refresh, you'll see that everything worked well!

## Configuration

### Custom Domain
Directly after installation, Ghost will assume that your blog runs at `http://sitename.azurewebsites.net`. Should you switch to a custom domain, please inform Ghost about that change - you can do by setting the App Setting `websiteUrl` and restarting your website.

### SSL

You have a couple of options here:

1. Going all HTTPS (both front end and admin). Just assign an https address to `websiteUrl` envrionment variable, e.g. `https://sitename.azurewebsites.net`
2. HTTPS for admin area only. If you don't use a custom domain, no changes are required as the provided config.json already sets `forceAdminSSL` to `true`. If you use a custom domain, then add `websiteUrlSSL` environment variable and assign your https address to it.

### Email

You're going to need to add a few more environment variables as defined in config.json:

- emailFromAddress
- emailService
- emailHost
- emailPort
- emailUsername
- emailPassword

### Blog Storage

If you're interested in hosting your blog's images on Azure Blob Storage, check out Tommy Parnell's [ghost-azure-storage module](https://github.com/tparnell8/ghost-azurestorage) that plugs directly into Ghost.

## Running Locally

To run ghost locally run `npm install --production`, then `npm start`. By default NODE_ENV will default to `development` and will run on `http://localhost:2368`.

In Azure Ghost will run with NODE_ENV value of `production`. If you decide to run NODE_ENV as production locally, you're going to have to add `websiteUrl` to your environment variables (see config.json).

## Upgrading Ghost
The most comfortable way to update is to synchronize your Ghost installation with this respository. When you hit the deploy button, Azure will be aware of the source - and allow you to synchronize content (check out 'Deployment options' blade in your web app on the Portal).

## Copyright & License

Ghost is Copyright (c) 2013-2016 Ghost Foundation - Released under the [MIT license](LICENSE).
