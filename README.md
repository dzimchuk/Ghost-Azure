# [Ghost (0.11.11)](https://github.com/TryGhost/Ghost) [![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

Want to install [Ghost](https://ghost.org/) on Azure? Just click the 'Deploy to Azure' button and you're well on your way to have a Ghost Blog running within a minute or two!

## Ghost-Azure

Ghost Azure is a project that maintains the minimum configuration required to run [Ghost](https://ghost.org/) in Azure Web Apps. This project does not contain alterations to Ghost itself.

Please make sure you use either Basic or Standard App Service plan otherwise the deployment may fail due to NPM using more resources than the Azure [sandbox](https://github.com/projectkudu/kudu/wiki/Azure-Web-App-sandbox) allows.  To work around this, deploy into a Basic or higher plan and then scale down if needed.  More information in [#30](https://github.com/felixrieseberg/Ghost-Azure/issues/30#issuecomment-217028469) and [npm/npm#7200](https://github.com/npm/npm/issues/7200).

After deployment, Ghost will continue setup - resulting in your brand new website staying blank on the very first load. Please give your website a solid minute of time. It will appear like the site isn't loading, but in reality, it's just creating your database in the background. This only happens the very first time you load your website - simply refresh, you'll see that everything worked well!

## Configuration

### Custom Domain
Directly after installation, Ghost will assume that your blog runs at `http://sitename.azurewebsites.net`. Should you switch to a custom domain, please inform Ghost about that change - you can do by setting the App Setting `websiteUrl` and restarting your website.

### HTTPS

You have a few options here:

1. Going all HTTPS (both front end and admin). Just assign an https address to `websiteUrl` envrionment variable, e.g. `https://sitename.azurewebsites.net`. If you use a custom domain make sure to set it to `websiteUrl` envrionment variable, e.g. `https://mycustomdomain.com`. Do not set `websiteUrlSSL` envrionment variable.
2. HTTPS for admin area only (no custom domain). Do **NOT** set `websiteUrl` and `websiteUrlSSL` envrionment variables. `forceAdminSSL` is already set to `true` in `production` configuration and Ghost will redirect to `https://sitename.azurewebsites.net` when you try to access the admin area.
3. HTTPS for admin area only (custom domain). Assign your http address to `websiteUrl`. If you want the admin area to be served from a different domain, set it to `websiteUrlSSL` environment variable with the `https` scheme.

### Email

You're going to need to add a few more environment variables as defined in config.json:

- emailFromAddress
- emailService (e.g. SendGrid)
- emailHost (e.g. smtp.sendgrid.net)
- emailPort (e.g. 587)
- emailUsername
- emailPassword

### Blog Storage

This deployment has been preconfigured to enable Azure Blob Storage for images. It installs [Azure Blob Storage adapter](https://github.com/dzimchuk/ghost-azure-blob-storage) and you should set the following environment variables to configure it:

- storage_connectionString
- storage_container (lowercase, 3-63 characters, only letters, numbers or dashes (-), default is 'ghost')
- storage_cdnUrl (optional, e.g. https://az******.vo.msecnd.net)

If you don't want to store images in Azure please remove or reconfigure the `storage` section in config.json. If you want to install your own storage adapter at deployment time check out action 4 in deploy.cmd.

## Running Locally

To run ghost locally run `npm install --production`, then `npm start`. By default NODE_ENV will default to `development` and will run on `http://localhost:2368`.

In Azure Ghost will run with NODE_ENV value of `production`. If you decide to run NODE_ENV as production locally, you're going to have to add `websiteUrl` to your environment variables (see config.json).

## Upgrading Ghost
The most comfortable way to update is to synchronize your Ghost installation with this respository. When you hit the deploy button, Azure will be aware of the source - and allow you to synchronize content (check out 'Deployment options' blade in your web app on the Portal).

## Copyright & License

Ghost is Copyright (c) 2013-2017 Ghost Foundation - Released under the [MIT license](LICENSE).
