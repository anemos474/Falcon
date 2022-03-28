import React, { useEffect, useState, forwardRef } from 'react';
import { Redirect } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { useCheckout, CheckoutStep } from '@deity/falcon-front-kit';
import { Box, H1, H2, H4, Icon, Button, GridLayout, Text } from '@deity/falcon-ui';
import { AddressDetails } from '@deity/falcon-ui-kit';
import { TestAdditionalPaymentStep } from '@deity/falcon-payment-plugin';
import { PaymentMethodListQuery } from '@deity/falcon-shop-data';
import { Container } from 'src/components';
import { CheckoutOptionRadio, CheckoutOptionDetails } from '../../components';
import { PaymentSubmission } from './PaymentSubmission';
import { NoPaymentSubmission } from './NoPaymentSubmission';
import { PaymentMethodSection } from './PaymentMethodSelection';

export const PlaceOrderSection = forwardRef((props, ref) => {
  // Use result from checkout instead of directly from place order mutation,
  // so there is a single source of truth for checkout state
  const { values, setStep, step, result } = useCheckout();
  const [showSelect, setShowSelect] = useState(true);
  useEffect(() => {
    setShowSelect(false);
  }, [values.paymentMethod]);

  return (
    <GridLayout gridGap="xxl" ref={step === CheckoutStep.paymentMethod ? ref : null}>
      <Box>
        <H1 lineHeight="small">
          <T id="checkout.paymentMethodSectionTitle" />
        </H1>
        <Text mt="md" color="secondaryText" fontSize="md">
          <T id="checkout.placeOrderSectionDescription" />
        </Text>
      </Box>

      <GridLayout gridRowGap="xxl" gridColumnGap="lg" gridAutoFlow={{ xs: 'row', lg: 'column' }}>
        <Box>
          <H4 as={H2} mb="md">
            <T id="checkout.shippingAddress" />
          </H4>
          <Container borderColor="accent" alignItems="flex-start">
            <AddressDetails {...values.shippingAddress} />
            <Button
              onClick={() => setStep(CheckoutStep.shippingAddress)}
              variant="textLink"
              display="flex"
              alignItems="center"
              mt="lg"
              color="accent"
              fontSize="sm"
              fontWeight="semiBold"
            >
              <Icon src="edit" mr="xxs" css={{ width: 20, height: 20 }} />
              <T id="checkout.edit" />
            </Button>
          </Container>
        </Box>
        <Box>
          <H4 as={H2} mb="md">
            <T id="checkout.billingAddress" />
          </H4>
          <Container borderColor="accent" alignItems="flex-start">
            <AddressDetails {...values.billingAddress} />
            <Button
              onClick={() => setStep(CheckoutStep.billingAddress)}
              variant="textLink"
              display="flex"
              alignItems="center"
              mt="lg"
              color="accent"
              fontSize="sm"
              fontWeight="semiBold"
            >
              <Icon src="edit" mr="xxs" css={{ width: 20, height: 20 }} />
              <T id="checkout.edit" />
            </Button>
          </Container>
        </Box>
      </GridLayout>

      <Box>
        <H4 as={H2} mb="md">
          <T id="checkout.shippingMethod" />
        </H4>
        <CheckoutOptionRadio checked readOnly>
          <CheckoutOptionDetails
            title={values.shippingMethod.title}
            description={values.shippingMethod.carrierTitle}
            price={values.shippingMethod.priceInclTax}
          />
        </CheckoutOptionRadio>
      </Box>

      <Box ref={step === CheckoutStep.placeOrder ? ref : null}>
        <H4 as={H2} mb="md">
          <T id="checkout.paymentMethod" />
        </H4>
        <PaymentMethodListQuery fetchPolicy="cache-and-network">
          {({ data: { paymentMethodList } }) => {
            if (paymentMethodList === null) {
              return <NoPaymentSubmission />;
            }
            return (
              <>
                {!values.paymentMethod || showSelect ? (
                  <PaymentMethodSection methods={paymentMethodList} />
                ) : (
                  <PaymentSubmission changeMethod={() => setShowSelect(true)} />
                )}
              </>
            );
          }}
        </PaymentMethodListQuery>
      </Box>

      {result && result.url && <TestAdditionalPaymentStep {...result} />}
      {result && result.id && <Redirect to="/checkout/confirmation" />}
    </GridLayout>
  );
});
