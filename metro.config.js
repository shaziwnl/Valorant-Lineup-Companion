// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require("nativewind/metro");

// /** @type {import('expo/metro-config').MetroConfig} */
const deafaultConfig = getDefaultConfig(__dirname);

deafaultConfig.resolver.assetExts.push('db')

module.exports = withNativeWind(deafaultConfig, { input: "./global.css" });