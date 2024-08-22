
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// const {
//   resolver: { sourceExts, assetExts },
// } = getDefaultConfig(__dirname);

// const config = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg'],
//   },
// };

// module.exports = mergeConfig(defaultConfig, config);const { getDefaultConfig } = require('@expo/metro-config');

// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
//   ...defaultConfig,
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
//   },
// };

// const { getDefaultConfig } = require('expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// defaultConfig.transformer = {
//   ...defaultConfig.transformer,
//   babelTransformerPath: require.resolve('metro-react-native-babel-transformer'), // Specifies the Babel transformer
// };

// defaultConfig.resolver = {
//   ...defaultConfig.resolver,
//   sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'], // Specifies file extensions to be resolved by Metro
// };

// module.exports = defaultConfig;