const {
    override,
    fixBabelImports,
    addWebpackAlias,
    addBundleVisualizer,
    overrideDevServer,
    addWebpackPlugin,
    setWebpackPublicPath,
    addLessLoader,
} = require('customize-cra');
const path = require('path');
const webpack = require('webpack');

function resolve (dir) {
    return path.join(__dirname, '.', dir);
}

function getIPAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family.toLocaleLowerCase() === 'ipv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const localIP = getIPAddress();
console.log(localIP);
const devServerConfig = () => config => {
    return {
        ...config,
        // 多路由不同代理路径
        // proxy: {
        //     '/api/': {
        //         target: 'http://localhost:8888',
        //         // changeOrigin: true,
        //     },
        // },
        // 多路由同代理路径
        proxy: [{
            context: ['/srv/'],
            target: 'https://test-api.com/',
            changeOrigin: true,
        }, {
            context: ['/m/'],
            target: 'https://test-m.com/',
            changeOrigin: true,
        }]
    };
};

module.exports = {
    webpack: override(
        setWebpackPublicPath(process.env.NODE_ENV === 'production' ? '/m' : ''),
        fixBabelImports('import', {
            libraryName: 'antd-mobile',
            style: 'css',
        }),
        addWebpackAlias({
            ['@']: resolve('src')
        }),
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
                strictMath: true,
                noIeCompat: true,
                cssLoaderOptions: {
                    test: /\.less$/,
                    exclude: /\.module\.less$/,
                }, // .less file used css-loader option, not all CSS file.
                cssModules: {
                    localIdentName: "[path][name]__[local]__[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
                },
            },
        }),
        process.env.NODE_ENV === 'development' ? addWebpackPlugin(new webpack.DefinePlugin({
            LOCALIP: JSON.stringify(localIP),
        })) : null,
        process.env.NODE_ENV === 'production' ? addBundleVisualizer() : null,
    ),
    devServer: overrideDevServer(
        devServerConfig()
    ),
};

