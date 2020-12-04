# Website Template

## Summary

This website uses Flickr and Tumblr as it's datastores and is built using the ReactJS platform. TailwindCSS is used for layout.

## Environment variables

### appsettings.json

`{`
   ` ...`
` "FLICKR_API": "...",`
  `"FLICKR_USER": "...",`
  `"FLICKR_URI": "...",`
  `"TUMBLR_API": "...",`
  `"TUMBLR_URI": "..."`
`}`


## Development notes

This site is deployed to a Raspberry Pi development server. More to come regarding TailwindCSS, ASP.NET app settings & ReactJS.

## systemctl examples

### executable

                #!/bin/sh

                git clone user@server:/cieclarke.com stage.cieclarke.com
                cd cieclarke.com
                git fetch
                git checkout origin/stage
                dotnet publish ...
                rsync /build/stage.cieclarke.com/**/*.* /www/stage.cieclarke.com

### serivce

                [Unit]
                Description=cieclarke.com deploy to live
                Wants=cieclarke.com.deploy-live.timer

                [Service]
                WorkingDirectory=/naboo/src
                User=cieclarke
                ExecStart=/naboo/bin/ciec-deploy

### service timer

                [Install]
                WantedBy=cieclarke.com.deploy-live.target

                [Unit]
                Description=deploy ciecclarke.com live Timer

                [Timer]
                OnCalendar=*-*-* 18:00:00
                Unit=cieclarke.com.deploy-live.service

                [Install]
                WantedBy=multi-user.target