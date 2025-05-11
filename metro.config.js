const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { resetCache: true });

config.resolver.unstable_enablePackageExports = false;

const { assetExts, sourceExts } = config.resolver;
config.resolver.assetExts = assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...sourceExts, 'svg'];

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

module.exports = withNativeWind(config, {
  input: './src/styles/global.css',
  unstable_css: {
    darkMode: 'class',
  },
});
