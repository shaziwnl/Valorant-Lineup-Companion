// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
const deafaultConfig = getDefaultConfig(__dirname);

deafaultConfig.resolver.assetExts.push('db')

module.exports = deafaultConfig;
