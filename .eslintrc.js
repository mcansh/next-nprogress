module.exports = {
  extends: ['mcansh/typescript'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['prettier.config.js'],
      },
    ],
  },
};
