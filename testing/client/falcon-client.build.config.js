const config = require('config');

module.exports = {
  devServerPort: (config.port || 3000) + 1,
  CI: process.env.CI && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false'),
  clearConsole: false,
  useWebmanifest: true,
  envToBuildIn: ['THEME_EDITOR_ENABLE_COMPONENT_FINDER'],
  serviceWorker: {
    precache: process.env.NODE_ENV === 'production',
    blacklistRoutes: config.proxyEndpoints || []
  },
  i18n: {
    resourcePackages: ['@deity/falcon-i18n']
  },
  moduleOverride: {
    '@deity/falcon-data/dist/Query/Loader': '@deity/falcon-ui-kit/dist/Loader/Loader',
    '@deity/falcon-data/dist/Query/OperationError': '@deity/falcon-ui-kit/dist/Error/OperationError',
    '@deity/falcon-ui-kit/dist/Layouts/SidebarLayout': 'src/components/Sidebar/SidebarLayout'
  }
};
