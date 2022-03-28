import React, { useRef } from 'react';
import { T } from '@deity/falcon-i18n';
import { useCheckout, usePlaceOrder } from '@deity/falcon-front-kit';
import { Box, Button, FlexLayout } from '@deity/falcon-ui';
import { ErrorSummary } from '@deity/falcon-ui-kit';
import loadable from 'src/components/loadable';
import { CartQuery } from '@deity/falcon-shop-data';
import { TotalsSummary } from '../../../components';
import { CheckoutOptionRadio, CheckoutOptionDetails } from '../../components';
import { NextStepButton } from '../../components/NextStepButton';

const paymentCodeToPluginMap = {
  cash: `SimplePayment`,
  stripe: `Stripe`,
  mollie: {
    creditcard: `Mollie/CreditCard`,
    paypal: 'Mollie/PayPal',
    ideal: 'Mollie/Ideal',
    klarnapaylater: 'Mollie/KlarnaPayLater',
    giftcard: 'Mollie/Giftcard',
    kbc: 'Mollie/KBC',
    default: 'Mollie/Default'
  }
};
paymentCodeToPluginMap.getFor = (providerCode, method) => {
  const provider = providerCode in paymentCodeToPluginMap ? paymentCodeToPluginMap[providerCode] : undefined;
  if (typeof provider === 'object') {
    return provider[method] ? provider[method] : provider.default;
  }
  return provider;
};

const getPaymentUI = provider =>
  loadable(() =>
    import(/* webpackChunkName: "shop/checkout/payments/[request]" */ `../../components/payments/${provider}`)
  );

export const PaymentSubmission = ({ changeMethod }) => {
  const { values, isLoading } = useCheckout();
  const { paymentMethod } = values;
  const [placeOrder, { error }] = usePlaceOrder();

  const paymentPlugin = paymentCodeToPluginMap.getFor(paymentMethod.provider, paymentMethod.method);
  if (!paymentPlugin) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`No Payment Method Plugin found for ${paymentMethod.provider}`);
    }
  }
  const PaymentComp = useRef(getPaymentUI(paymentPlugin)).current;

  return (
    <PaymentComp {...paymentMethod} submitting={isLoading}>
      {(pay, { loading: paying, disabled }) => (
        <>
          <Box>
            <CheckoutOptionRadio checked readOnly>
              <CheckoutOptionDetails
                title={<T id={`checkout.payments.${paymentMethod.provider}.${paymentMethod.method}`} />}
                price={paymentMethod?.surcharge?.amount || 0}
              />

              {PaymentComp.UI && <PaymentComp.UI mt="md" />}
            </CheckoutOptionRadio>

            <Button type="button" variant="textLink" fontSize="xs" onClick={changeMethod} mb="md" mt="xs">
              <T id="checkout.changePaymentMethod" />
            </Button>
          </Box>

          <Box display={{ xs: 'block', md: 'none' }}>
            <CartQuery>{({ data: { cart } }) => <TotalsSummary cart={cart} showShipping />}</CartQuery>
          </Box>

          <FlexLayout flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
            <NextStepButton
              variant="accent"
              disabled={!pay || disabled}
              onClick={() =>
                pay().then(payResult =>
                  placeOrder(
                    {
                      ...values,
                      paymentMethod: {
                        ...values.paymentMethod,
                        data: {
                          ...values.paymentMethod.data,
                          ...payResult
                        }
                      }
                    },
                    {
                      awaitRefetchQueries: false
                    }
                  )
                )
              }
              loading={paying || isLoading}
            >
              <T id="checkout.placeOrder" />
            </NextStepButton>
            <ErrorSummary errors={error} mt="sm" />
          </FlexLayout>
        </>
      )}
    </PaymentComp>
  );
};
