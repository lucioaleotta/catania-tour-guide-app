module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './app',
            '@components': './app/components',
            '@features': './app/features',
            '@assets': './app/assets',
            '@hooks': './app/hooks',
            '@services': './app/services'
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      ]
    ]
  };
};