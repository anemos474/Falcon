import React, { useState, forwardRef } from 'react';
import { useI18n, T } from '@deity/falcon-i18n';
import { ShippingMethodListQuery } from '@deity/falcon-shop-data';
import { SetShippingMethod, useCheckout, CheckoutStep } from '@deity/falcon-front-kit';
import { ErrorSummary } from '@deity/falcon-ui-kit';
import { H1, H2, H3, Text, GridLayout, Box, Button, FlexLayout } from '@deity/falcon-ui';
import { CheckoutOptionRadio, CheckoutOptionDetails } from '../components';
import { NextStepButton } from '../components/NextStepButton';
import { Alert } from '../../../../components/Alert';

const ShippingMethodOption = ({ onSelect, checked, option, disabled }) => (
  <CheckoutOptionRadio
    name="shipping"
    value={option.provider}
    checked={checked}
    onChange={onSelect}
    disabled={disabled}
  >
    <CheckoutOptionDetails title={option.methodTitle} description={option.carrierTitle} price={option.priceInclTax} />
  </CheckoutOptionRadio>
);

export const ShippingMethodSection = forwardRef((props, ref) => {
  const { t } = useI18n();
  const { values, setStep } = useCheckout();
  const [state, setState] = useState(values.shippingMethod);

  return (
    <GridLayout gridGap="xxl" ref={ref}>
      <Box>
        <H2 as={H1} lineHeight="small">
          <T id="checkout.shippingMethodSectionTitle" />
        </H2>
        <Text mt="md" color="secondaryText" fontSize="md">
          <T id="checkout.shippingMethodSectionDescription" />
        </Text>
      </Box>

      <ShippingMethodListQuery fetchPolicy="network-only">
        {({ data: { shippingMethodList } }) => {
          if (shippingMethodList.length === 0) {
            return (
              <Alert canHide={false}>
                <Text mb="lg" fontSize="md">
                  <T id="checkout.noShippingMethodsAvailable" />
                </Text>
                <Button onClick={() => setStep(CheckoutStep.shippingAddress)} variant="secondary">
                  <T id="checkout.prevStep" replace={{ step: CheckoutStep.shippingAddress }} />
                </Button>
              </Alert>
            );
          }

          return (
            <SetShippingMethod>
              {(setShipping, { error, loading }) => (
                <>
                  <Box>
                    <H3 as={H2} mb="lg" lineHeight="large">
                      {t('checkout.chooseShippingMethod')}
                    </H3>
                    <GridLayout gridGap="xs">
                      {shippingMethodList.map(method => (
                        <ShippingMethodOption
                          key={method.provider}
                          onSelect={() => setState(method)}
                          checked={method.provider === (state && state.provider)}
                          option={method}
                          disabled={loading}
                        />
                      ))}
                    </GridLayout>
                  </Box>

                  <FlexLayout flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
                    <NextStepButton
                      onClick={() => setShipping(state, { refetchQueries: ['Cart'] })}
                      disabled={!state}
                      loading={loading}
                    />
                    <ErrorSummary errors={error} mt="sm" />
                  </FlexLayout>
                </>
              )}
            </SetShippingMethod>
          );
        }}
      </ShippingMethodListQuery>
    </GridLayout>
  );
});
