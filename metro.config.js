// eslint-disable-next-line
const { getDefaultConfig } = require('@expo/metro-config')

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname)
config.resolver.sourceExts.push('cjs')
config.resolver.unstable_enablePackageExports = false

// eslint-disable-next-line no-undef
module.exports = config