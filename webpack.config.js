const path = require('path');

module.exports = {
  mode: 'production',
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            query: { partialDirs: [path.resolve(__dirname, 'src/partials')] }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.hbs']
  }
};
