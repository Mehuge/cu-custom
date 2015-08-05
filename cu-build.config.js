module.exports = {
  type: 'multi',
  path: __dirname,
  legacy: true,
  exclude: [
    'node_modules',
    'dist',
    'dist2'
  ],
  glob: { 
      js: ['src/**/*.js', 'src/**/*.jsx'], 
      ts: ['src/**/*.ts', 'src/**/*.tsx'],
      stylus: [ 'src/**/*.styl', 'src/**/*.css' ]
  },
  dir: {
    publish: 'dist2'
  }
};