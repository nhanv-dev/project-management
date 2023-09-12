/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // compiler: {
    //     removeConsole: false,
    // },
    modularizeImports: {
        "react-icons": {
            transform: 'react-icons/{{member}}',
        }, 
        "@nextui-org": {
            transform: '@nextui-org/{{member}}',
        }, 
    },
    env: { 
    },
}

module.exports = nextConfig
