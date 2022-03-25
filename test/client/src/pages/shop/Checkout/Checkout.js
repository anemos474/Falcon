import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { H1, Box, GridLayout, Text } from '@deity/falcon-ui';
import { CheckoutProvider, useCheckout, CheckoutStep } from '@deity/falcon-front-kit';
import { toGridTemplate, PageLayout, Loader } from '@deity/falcon-ui-kit';
import { TestAdditionalPaymentStep } from '@deity/falcon-payment-plugin';
import {
  CartQuery as FalconCartQuery,
  CustomerQuery,
  CheckoutStateQuery,
  useRestoreCartMutation
} from '@deity/falcon-shop-data';
import { T } from '@deity/falcon-i18n';
import { CheckoutSectionLink, CheckoutCartSummary } from './components';
import { CustomerInfoSection, ShippingMethodSection, PlaceOrderSection } from './sections';

const CheckoutNavigation = () => {
  const { step, setStep, values, result } = useCheckout();

  return (
    <GridLayout gridGap="lg">
      <CheckoutSectionLink
        icon="user"
        isCompleted={values.shippingAddress && values.billingAddress && values.email}
        isActive={[CheckoutStep.shippingAddress, CheckoutStep.billingAddress, CheckoutStep.email].includes(step)}
        onClick={() => setStep(CheckoutStep.shippingAddress)}
      >
        <T id="checkout.customerSectionTitle" />
      </CheckoutSectionLink>
      <CheckoutSectionLink
        icon="shipping"
        isCompleted={values.shippingMethod}
        isActive={step === CheckoutStep.shippingMethod}
        onClick={() => setStep(CheckoutStep.shippingMethod)}
      >
        <T id="checkout.shippingMethodSectionTitle" />
      </CheckoutSectionLink>
      <CheckoutSectionLink
        icon="payment"
        isCompleted={result}
        isActive={step === CheckoutStep.paymentMethod || step === CheckoutStep.placeOrder}
      >
        <T id="checkout.paymentMethodSectionTitle" />
      </CheckoutSectionLink>
    </GridLayout>
  );
};

const CheckoutWizard = () => {
  const { step, result } = useCheckout();
  const sectionRef = useRef(null);

  // Scroll to top when changing step
  // We have merged the payment method and summary step
  const scrollStep = step === CheckoutStep.placeOrder ? CheckoutStep.paymentMethod : step;
  useEffect(() => {
    window.scrollTo({ top: sectionRef.current.offsetTop, behavior: 'smooth' });
  }, [scrollStep, result]);

  return (
    <Box position="relative">
      {[CheckoutStep.shippingAddress, CheckoutStep.billingAddress, CheckoutStep.email].includes(step) && (
        <CustomerInfoSection ref={sectionRef} />
      )}
      {step === CheckoutStep.shippingMethod && <ShippingMethodSection ref={sectionRef} />}
      {(step === CheckoutStep.paymentMethod || step === CheckoutStep.placeOrder) && (
        <PlaceOrderSection ref={sectionRef} />
      )}
    </Box>
  );
};

export const CartQuery = props => {
  return <FalconCartQuery fetchPolicy="cache-and-network" {...props} />;
};

const EnsureCanProceedCheckout = ({ location, isSignedIn, email, children }) => {
  const queryParams = new URLSearchParams(location.search);
  const { result } = useCheckout();
  const [restoreCart, { called, loading }] = useRestoreCartMutation();
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    if (cartLoading && !called) {
      restoreCart().then(() => {
        setCartLoading(false);
      });
    }
  }, [cartLoading, loading, called, restoreCart]);

  useEffect(() => {
    if (result && result.url) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [result]);

  if (result && result.url) {
    return (
      <GridLayout gridGap="xxl">
        <Box display="flex" alignItems="center" flexDirection="column">
          <H1 lineHeight="small">
            <T id="checkout.paymentRedirectTitle" />
          </H1>
          <Text mt="md" color="secondaryText" fontSize="md">
            <T id="checkout.paymentRedirectDescription" />
          </Text>
          <Loader height="auto" my="xl" />
        </Box>
        <TestAdditionalPaymentStep {...result} />
      </GridLayout>
    );
  }

  if (loading || cartLoading) {
    return <Loader />;
  }

  return (
    <CartQuery>
      {({ data: { cart } }) => {
        if (!cart || cart.itemsQty === 0 || cart.items.length === 0) {
          // try to restore the cart if you can
          if (!called) {
            setCartLoading(true);
            return <Loader />;
          }

          // If we have a cart but the items haven't loaded
          if (cart && cart.itemsQty !== 0 && cart.items.length === 0) {
            return <Loader />;
          }

          // We can't restore the cart or there are no items
          return <Redirect to="/cart" />;
        }

        if (!isSignedIn && !queryParams.get('as-guest') && !email) {
          return <Redirect to="/checkout/sign-in" />;
        }

        if (isSignedIn && queryParams.get('as-guest')) {
          return <Redirect to="/checkout" />;
        }

        return children;
      }}
    </CartQuery>
  );
};

const CheckoutArea = {
  nav: 'nav',
  content: 'content',
  summary: 'summary'
};

const CheckoutPage = ({ location }) => {
  const dataKey = useRef({ key: 0 });
  return (
    <PageLayout variant="gray">
      <CustomerQuery>
        {({ loading: customerLoading, data: { customer } }) => {
          if (customerLoading) {
            return <Loader />;
          }
          return (
            <CheckoutStateQuery>
              {({ loading: checkoutStateLoading, data }) => {
                if (checkoutStateLoading) {
                  return <Loader />;
                }
                const { checkoutState = {} } = data;

                // Update the key when the data changed to force the context values to be
                if (dataKey.current.data !== data) {
                  dataKey.current = {
                    data,
                    key: Math.random()
                  };
                }
                return (
                  <CheckoutProvider
                    key={dataKey.current.key}
                    // if logged in, use customer email as initial value so we don't need to ask for email again
                    initialValues={{ email: customer ? customer.email : checkoutState.email, ...checkoutState }}
                    stepsOrder={['shippingAddress', 'billingAddress', 'shippingMethod', 'paymentMethod', 'placeOrder']}
                    billingSameAsShipping
                  >
                    <EnsureCanProceedCheckout location={location} isSignedIn={!!customer} email={checkoutState.email}>
                      {/* <ConfirmLeavePrompt /> */}
                      <GridLayout
                        gridGap={{ xs: 'xxl', md: 'md' }}
                        // prettier-ignore
                        gridTemplate={{
                        xs: toGridTemplate([
                          ['1fr'               ],
                          [CheckoutArea.nav    ],
                          [CheckoutArea.content],
                          [CheckoutArea.summary]
                        ]),
                        md: toGridTemplate([
                          ['2fr',            '6fr',                '4fr'               ],
                          [CheckoutArea.nav, CheckoutArea.content, CheckoutArea.summary]
                        ])
                      }}
                      >
                        <Box gridArea={CheckoutArea.nav}>
                          <CheckoutNavigation />
                        </Box>
                        <Box gridArea={CheckoutArea.content}>
                          <CheckoutWizard />
                        </Box>
                        <Box gridArea={CheckoutArea.summary}>
                          <CheckoutCartSummary display={{ xs: 'none', md: 'grid' }} />
                        </Box>
                      </GridLayout>
                    </EnsureCanProceedCheckout>
                  </CheckoutProvider>
                );
              }}
            </CheckoutStateQuery>
          );
        }}
      </CustomerQuery>
    </PageLayout>
  );
};
export default CheckoutPage;
