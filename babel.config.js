module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/hooks': './src/hooks',
            '@/store': './src/store',
            '@/utils': './src/utils',
            '@/types': './src/types',
            '@/constants': './src/constants',
          },
        },
      ],
    ],
  };
};