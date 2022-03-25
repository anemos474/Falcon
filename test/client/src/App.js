import React from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider, Box, Button } from '@deity/falcon-ui';
import { AppLayout, Sidebar, NotFound } from '@deity/falcon-ui-kit';
import { ServiceWorkerRegistrar, ServiceWorker } from '@deity/falcon-service-worker';
import {
  NetworkStatus,
  ScrollToTop,
  OnlyUnauthenticatedRoute,
  ProtectedRoute,
  LocaleProvider,
  Locale,
  CurrencyProvider,
  SearchProvider,
  SwitchDynamicURL,
  SidebarContainerProvider,
  DynamicRedirect
} from '@deity/falcon-front-kit';
import { ThemeEditor, ThemeEditorState } from '@deity/falcon-theme-editor';
import loadable from 'src/components/loadable';
import logo from 'src/assets/logo.png';
import { Header, PageFooter, TTISidebarWrapper, ErrorBoundary, LoaderWrapper } from './components';
import { deityGreenTheme, globalCss } from './theme';
import { themePresets } from './styling/presets';

const HeadMetaTags = () => (
  <Locale>
    {({ locale }) => (
      <Helmet
        htmlAttributes={{ lang: locale }}
        defaultTitle="Deity Shop with Blog"
        titleTemplate="%s | Deity Shop with Blog"
      >
        <meta name="description" content="This is example of Shop with Blog powered by Deity Falcon" />
        <meta name="keywords" content="pwa,reactjs,ecommerce,magento,shop,webshop,deity" />
        <meta name="theme-color" content="#fff" />
        <meta name="format-detection" content="telephone=yes" />
        <meta property="og:title" content="Deity Shop with Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="This is example of Shop with Blog powered by Deity Falcon" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content={logo} />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="107" />
      </Helmet>
    )}
  </Locale>
);

const Home = loadable(() => import(/* webpackChunkName: "home/home" */ './pages/home/Home'));
const Account = loadable(() => import(/* webpackChunkName: "account/account" */ './pages/shop/Account/Account'));
const SignIn = loadable(() => import(/* webpackChunkName: "account/sign-in" */ './pages/account/SignIn'));
const ResetPassword = loadable(() =>
  import(/* webpackChunkName: "shop/reset-password" */ './pages/shop/ResetPassword')
);
const Blog = loadable(() => import(/* webpackChunkName: "blog/blog" */ './pages/blog/Blog'));
const Cart = loadable(() => import(/* webpackChunkName: "shop/cart" */ './pages/shop/Cart/Cart'));
const CheckoutSignIn = loadable(() =>
  import(/* webpackChunkName: "shop/checkout" */ './pages/shop/Checkout/CheckoutSignIn')
);
const Checkout = loadable(() => import(/* webpackChunkName: "shop/checkout" */ './pages/shop/Checkout/Checkout'));
const CheckoutConfirmation = loadable(() =>
  import(/* webpackChunkName: "shop/checkout" */ './pages/shop/Checkout/CheckoutConfirmation')
);
const CheckoutPending = loadable(() =>
  import(/* webpackChunkName: "shop/checkout" */ './pages/shop/Checkout/CheckoutPending')
);
const CheckoutFailure = loadable(() =>
  import(/* webpackChunkName: "shop/checkout" */ './pages/shop/Checkout/CheckoutFailure')
);
const CheckoutSuccess = loadable(() =>
  import(/* webpackChunkName: "shop/checkout" */ './pages/shop/Checkout/CheckoutSuccess')
);
const SidebarContents = loadable(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "shop/sidebar" */ './pages/shop/Sidebar/SidebarContents')
);

const BlogPost = loadable(() => import(/* webpackChunkName: "blog/post" */ './pages/blog/Post'));
const BlogPage = loadable(() => import(/* webpackChunkName: "blog/post" */ './pages/blog/Page'));
const Category = loadable(() => import(/* webpackChunkName: "shop/category" */ './pages/shop/Category/Category'));
const Product = loadable(() => import(/* webpackChunkName: "shop/product" */ './pages/shop/Product'));
const Search = loadable(() => import(/* webpackChunkName: "shop/search" */ './pages/shop/Search/Search'));

let ThemeEditorComponent;
// ThemeEditor gets loaded only in dev mode
// condition below helps with tree shaking of unused exports
// so ThemeEditor gets dead code eliminated in production mode
if (process.env.NODE_ENV !== 'production') {
  ThemeEditorComponent = ThemeEditor;
}

const App = () => (
  <ErrorBoundary>
    <ServiceWorkerRegistrar>
      <ThemeEditorState initial={deityGreenTheme} presets={themePresets}>
        {({ theme, ...editorRest }) => (
          <>
            <ThemeProvider theme={theme} globalCss={globalCss}>
              <SidebarContainerProvider>
                <LocaleProvider>
                  <CurrencyProvider>
                    <SearchProvider>
                      <AppLayout>
                        <ScrollToTop />
                        <HeadMetaTags />
                        <ServiceWorker>
                          {({ isWaiting, skipWaiting }) =>
                            isWaiting ? (
                              <Box>
                                Site has updated. To see changes close other tabs or
                                <Button size="ms" p="xs" m="sm" onClick={() => skipWaiting()}>
                                  click here
                                </Button>
                              </Box>
                            ) : null
                          }
                        </ServiceWorker>
                        <NetworkStatus>{({ isOnline }) => !isOnline && <Box>you are offline.</Box>}</NetworkStatus>
                        <Header />
                        <ErrorBoundary>
                          <Box position="relative">
                            <SwitchDynamicURL onLoading={({ component }) => <LoaderWrapper>{component}</LoaderWrapper>}>
                              <Route exact path="/" component={Home} />
                              <Route exact path="/blog/:page?" component={Blog} />
                              <Route exact path="/cart" component={Cart} />
                              <Route exact path="/checkout" component={Checkout} />
                              <Route exact path="/checkout/sign-in" component={CheckoutSignIn} />
                              <Route exact path="/checkout/confirmation" component={CheckoutConfirmation} />
                              <Route exact path="/checkout/pending" component={CheckoutPending} />
                              <Route exact path="/checkout/failure" component={CheckoutFailure} />
                              {/* CheckoutSuccess is a dummy success page with no order information - this is used for the embedded checkout */}
                              <Route exact path="/checkout/success" component={CheckoutSuccess} />
                              <Route exact path="/search" component={Search} />
                              <ProtectedRoute path="/account" component={Account} />
                              <OnlyUnauthenticatedRoute exact path="/sign-in" component={SignIn} />
                              <OnlyUnauthenticatedRoute exact path="/reset-password" component={ResetPassword} />
                              <Route exact type="blog-page" component={BlogPage} />
                              <Route exact type="blog-post" component={BlogPost} />
                              <Route exact type="shop-category" component={Category} />
                              <Route exact type="shop-product" component={Product} />
                              <Route exact type="redirect" component={DynamicRedirect} />
                              <Route component={NotFound} />
                            </SwitchDynamicURL>
                          </Box>
                          <PageFooter />
                          <TTISidebarWrapper>
                            {sidebar => (
                              <Sidebar {...sidebar} side={sidebar.isOpen ? sidebar.content.side : undefined}>
                                <SidebarContents {...sidebar} />
                              </Sidebar>
                            )}
                          </TTISidebarWrapper>
                        </ErrorBoundary>
                      </AppLayout>
                    </SearchProvider>
                  </CurrencyProvider>
                </LocaleProvider>
              </SidebarContainerProvider>
            </ThemeProvider>
            {ThemeEditorComponent && (
              <ThemeEditorComponent
                theme={theme}
                {...editorRest}
                side="left"
                enableComponentFinder={process.env.THEME_EDITOR_ENABLE_COMPONENT_FINDER !== 'false'}
              />
            )}
          </>
        )}
      </ThemeEditorState>
    </ServiceWorkerRegistrar>
  </ErrorBoundary>
);

export default App;
