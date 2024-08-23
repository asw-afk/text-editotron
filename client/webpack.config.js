const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
// TODO: Add and configure workbox plugins for a service worker and manifest file.


module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }), new InjectManifest({
      swSrc: './src-sw.js', swDest: 'src-sw.js'
    })
    , new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Just Another Text Editor',
      short_name: 'J.A.T.E',
      description: 'Takes notes with JavaScript syntax highlighting!',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: '/',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};


// // TODO: Add CSS loaders and babel to webpack.
// module.exports = {
//   mode: 'development',
//   entry: './src/js/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },

//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.m?js$/,
//         exclude: /node_modules/,
//         use: {
//           loader : "babel-loader",
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
//  }; 
