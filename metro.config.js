const {getDefaultConfig} = require('metro-config');

module.exports = async () => {
  const {
    resolver: {sourceExts},
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      extraNodeModules: {
        stream: './node_modules/react-native-stream',
      },
      sourceExts: [...sourceExts, 'cjs', 'svg'],
    },
  };
};
