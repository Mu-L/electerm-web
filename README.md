<h1 align="center" style="padding-top: 60px;padding-bottom: 40px;">
    <a href="https://electerm.github.io/electerm">
        <img src="https://github.com/electerm/electerm-resource/raw/master/static/images/electerm.png", alt="" />
    </a>
</h1>

[中文](README_cn.md)

# electerm-web [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Open%20sourced%20terminal%2Fssh%2Fsftp%20client(linux%2C%20mac%2C%20win)&url=https%3A%2F%2Fgithub.com%2Felecterm%2Felecterm-web&hashtags=electerm,ssh,terminal,sftp)

This is web app version of [electerm app](https://github.com/electerm/electerm), running in browser, almost has the same features as the desktop version.

Powered by [manate](https://github.com/tylerlong/manate)

[![GitHub version](https://img.shields.io/github/release/electerm/electerm/all.svg)](https://github.com/electerm/electerm/releases)
[![license](https://img.shields.io/github/license/electerm/electerm.svg)](https://github.com/electerm/electerm-dev/blob/master/LICENSE)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Get it from the Snap Store](https://img.shields.io/badge/Snap-Store-green)](https://snapcraft.io/electerm)
[![Get it from the Microsoft Store](https://img.shields.io/badge/Microsoft-Store-blue)](https://www.microsoft.com/store/apps/9NCN7272GTFF)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/electerm?label=Sponsors)](https://github.com/sponsors/electerm)

Open-sourced terminal/ssh/telnet/serialport/sftp client(linux, mac, win).

<div align="center">
  <img src="https://github.com/electerm/electerm-resource/raw/master/static/images/electerm.gif", alt="" />
</div>

## Features

- Works as a terminal/file manager or ssh/telnet/serialport/RDP/VNC/sftp client
- Global hotkey to toggle window visibility (similar to guake, default is `ctrl + 2`)
- Multi platform(linux, mac, win)
- 🇺🇸 🇨🇳 🇧🇷 🇷🇺 🇪🇸 🇫🇷 🇹🇷 🇭🇰 🇯🇵 🇸🇦 🇩🇪 🇰🇷 Multi-language support([electerm-locales](https://github.com/electerm/electerm-locales), contributions/fixes welcome)
- Double click to directly edit (small) remote files.
- Auth with publicKey + password.
- Support Zmodem(rz, sz).
- Support ssh tunnel.
- Support [Trzsz](https://github.com/trzsz/trzsz)(trz/tsz), similar to rz/sz, and compatible with tmux.
- Transparent window(Mac, win).
- Terminal background image.
- Global/session proxy.
- Quick commands
- UI/terminal theme
- Sync bookmarks/themes/quick commands to github/gitee secret gist
- Quick input to one or all terminals.
- Init from url query string [wiki](https://github.com/electerm/electerm-web/wiki/Init-from-url-query-string)
- Support mobile device(responsive design)

## Download

todo

## Upgrade

todo

## Support

Would love to hear from you, please tell me what you think, [submit an issue](https://github.com/electerm/electerm-web/issues/new/choose), [Start a new discussion](https://github.com/electerm/electerm-web/discussions/new), [create/fix language files](https://github.com/electerm/electerm-locales) or create pull requests, all welcome.

## Sponsor this project

github sponsor

[https://github.com/sponsors/electerm](https://github.com/sponsors/electerm)

kofi

[https://ko-fi.com/zhaoxudong](https://ko-fi.com/zhaoxudong)

wechat donate

[![wechat donate](https://electerm.html5beta.com/electerm-wechat-donate.png)](https://github.com/electerm)

## Prerequisites

- git
- Nodejs 18+/npm, recommend use [nvm](https://github.com/nvm-sh/nvm) to install nodejs/npm for Linux and MacOS
- python/make tools, for Linux: `sudo apt install -y make python g++ build-essential`, for MacOS: install Xcode, for Windows, install `vs studio` or `npm install --global --production windows-build-tools`

## One line script to deploy from source code

for Linux or Mac

```sh
curl -o- https://electerm.html5beta.com/scripts/one-line-web.sh | bash
```
or

```sh
wget -qO- https://electerm.html5beta.com/scripts/one-line-web.sh | bash
```

for Windows

```powershell
Invoke-WebRequest -Uri "https://electerm.html5beta.com/scripts/one-line-web.bat" -OutFile "one-line-web.bat"
cmd.exe /c ".\one-line-web.bat"

```

## Deploy from docker image

Check [electerm-web-docker](https://github.com/electerm/electerm-web-docker)

## Dev

```bash
# tested in ubuntu16.04+/mac os 10.13+ only
# needs nodejs/npm, suggest using nvm to install nodejs/npm
# https://github.com/creationix/nvm
# with nodejs 18.x

git clone git@github.com:electerm/electerm-web.git
cd electerm-web
cp .sample.env .env
# edit DB_PATH to set db path, default path ./database
# to use same data as desktop electerm
# for Mac OS DB_PATH="/Users/<your-user-name>/Library/Application Support/electerm"
# for Linux OS DB_PATH="/home/<your-user-name>/.config/electerm"
# for Windows OS DB_PATH="C:\\Users\\<your-user-name>\\AppData\\Roaming\\electerm"

npm i

# start webpack dev server
npm start

# in a separate terminal session run app
npm run dev

#then visit http://127.0.0.1:5580 with browser

# code format check
npm run lint

# code format fix
npm run fix
```

## Build && run in production

```sh
npm run build

# run production server
npm run prod

# or ./build/bin/run-prod.sh

#then visit http://127.0.0.1:5577 with browser
```

## Run in server

```sh
# Edit .env, set
ENABLE_AUTH=1 # if not enabled, everyone can use it without login
SERVER_SECRET=some-server-secret
SERVER_PASS=some-login-pass-word
SERVER=http://xxx.com # if you want to bind domain
CDN=http://xxx.com # if you want to use cdn serve static files

# run prod app
./run-electerm-web.sh

# Check examples/nginx.conf examples/nginx-ssl.conf  for domain binding nginx conf example
```

## Test

```bash
npx playwright install --with-deps chromium
# or with a proxy if needed
HTTPS_PROXY=http://127.0.0.1:1087 npx playwright install --with-deps chromium
# then edit .env, edit test related env
npm run test
```

## License

MIT
