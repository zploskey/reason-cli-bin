#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */

const process = require('process');

import download from 'download-package-tarball';

const baseurl = "https://github.com/reasonml/reason-cli/archive/"
const version = '1.13.7';
const ext = '.tar.gz';

const installReasonCli = (platform) => {
  const supportedPlatforms = ['darwin', 'linux'];

  if (!supportedPlatforms.includes(platform)) {
    throw 'Unsupport platform: ' + platform;
  }

  const filename = 'beta-v-' + version + '-bin-' + platform + ext;
  const url = baseurl + filename;

  console.log('Attempting to download ' + url + '.');
  extractTarballFromUrl(url);

  console.log('reason-cli package installed successfully');
  process.exit(0);
}

const extractTarballFromUrl = (url) => {
  return download({
    url: url,
    dir: './reason-cli'
  }).then(() => {
    console.log('file is now downloaded!');
  }).catch(err => {
    console.log('Installation of package ' + url + 'failed.');
    console.log(err);
    process.exit(1);
  });
}

installReasonCli(process.platform);
