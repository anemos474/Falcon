import React, { forwardRef } from 'react';
import { T } from '@deity/falcon-i18n';
import { CustomerWithAddressesQuery } from '@deity/falcon-shop-data';
import { useCheckout, CheckoutStep, useSidebarContainer } from '@deity/falcon-front-kit';
import { H1, H2, H3, GridLayout, Button, Box, Text } from '@deity/falcon-ui';
import { Alert, SIDEBAR_TYPE } from 'src/components';
import { BillingAddressEditor, ShippingAddressEditor } from '../components';

const INITIAL_ADDRESS = {
  email: '',
  firstname: '',
  lastname: '',
  company: '',
  telephone: '',
  street1: '',
  street2: '',
  postcode: '',
  city: '',
  country: {}
};

const GuestCheckoutMessage = props => {
  const sidebar = useSidebarContainer();

  return (
    <Alert canHide={false} variant="warning" {...props}>
      <T id="checkout.guestCheckoutMessageP1" />

      <Button
        variant="textLink"
        fontSize="sm"
        fontWeight="bold"
        mx="none"
        css={{ textDecoration: 'underline' }}
        onClick={() => sidebar.open(SIDEBAR_TYPE.account)}
      >
        <T id="checkout.signInLink" />
      </Button>

      <T id="checkout.guestCheckoutMessageP2" />
    </Alert>
  );
};

export const CustomerInfoSection = forwardRef((props, ref) => {
  const { step } = useCheckout();

  return (
    <GridLayout gridGap="lg" ref={ref}>
      <CustomerWithAddressesQuery>
        {({ data: { customer } }) => {
          const addresses = (customer && customer.addresses) || [];

          return (
            <>
              <Box>
                <H2 as={H1} lineHeight="small">
                  <T id="checkout.customerSectionTitle" />
                </H2>
                <Box mt="md">
                  {customer ? (
                    <Text color="secondaryText" fontSize="md">
                      <T id="checkout.customerCheckoutMessage" />
                    </Text>
                  ) : (
                    <GuestCheckoutMessage />
                  )}
                </Box>
              </Box>

              {step === CheckoutStep.shippingAddress && (
                <Box>
                  <H3 as={H2} mb="sm" lineHeight="large">
                    <T id="checkout.shippingAddress" />
                  </H3>
                  {/* if user is not logged in, we ask for email in the shipping address step */}
                  <ShippingAddressEditor addresses={addresses} askEmail={!customer} initialAddress={INITIAL_ADDRESS} />
                </Box>
              )}

              {step === CheckoutStep.billingAddress && (
                <Box>
                  <H3 as={H2} mb="sm" lineHeight="large">
                    <T id="checkout.billingAddress" />
                  </H3>
                  {/* we never ask for email in the billing address step */}
                  <BillingAddressEditor addresses={addresses} initialAddress={INITIAL_ADDRESS} />
                </Box>
              )}
            </>
          );
        }}
      </CustomerWithAddressesQuery>
    </GridLayout>
  );
});
