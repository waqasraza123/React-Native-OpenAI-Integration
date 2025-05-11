const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { resetCache: true });
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './src/styles/global.css' })