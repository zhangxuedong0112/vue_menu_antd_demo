const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 引入插件

function resolve(dir) {
  return path.join(__dirname, dir);
}

let isDev = process.env.NODE_ENV == "development";

//  vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                modifyVars: {
                    // 'primary-color': '#d9d9d9',
                    // 'normal-color': '#d9d9d9',
                    // // 'link-color': '#d9d9d9',
                    // 'border-color-base': '#d9d9d9',
                    // 'text-color-secondary': '#222',
                    // 'primary-6': '#d9d9d9',
                    // 'primary-5': '#d9d9d9',
                    // 'primary-1': '#FBF2ED',
                    // 'shadow-color': '#d9d9d9',
                    // 'link-hover-color': '#d9d9d9',//FBF2ED
                    // 'border-radius-base': '2px',
                },
                javascriptEnabled: true,
                },
            },
        },
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("public", resolve("public"));
    },
    configureWebpack: isDev?{}:{
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    // parallel: true,
                    // sourceMap: false,
                    uglifyOptions: {
                        compress: {
                        drop_console: isDev ? false : true, //console
                        drop_debugger: false,
                        ie8: false,
                        pure_funcs: ["console.log"] //移除console
                        },
                        warnings: false,
                    }
                })
            ]
        }
    },
    devServer: {
        proxy: {
            '/api': {     //这里最好有一个 /
                target: 'http://192.168.1.106:9000',  // 后台接口域名
                changeOrigin: true,  //是否跨域
                logLevel: "debug",
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}
