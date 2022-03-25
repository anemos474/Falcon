import React from 'react';
import { T } from '@deity/falcon-i18n';
import { SetPaymentMethod } from '@deity/falcon-front-kit';
import { Box, GridLayout, Text } from '@deity/falcon-ui';
import { ErrorSummary } from '@deity/falcon-ui-kit';
import { CheckoutOptionDetails, CheckoutOptionRadio } from '../../components';

export const getMethodID = method => method.provider + (method.method ? ` ${method.method}` : '');

const PaymentMethodOption = ({ onChange, checked, option, disabled }) => (
  <CheckoutOptionRadio
    name="payment"
    value={getMethodID(option)}
    checked={checked}
    onChange={onChange}
    disabled={disabled}
  >
    <CheckoutOptionDetails
      title={<T id={`checkout.payments.${option.provider}.${option.method}`} />}
      price={option?.surcharge?.amount || 0}
    />
  </CheckoutOptionRadio>
);

export const PaymentMethodSection = ({ methods }) => {
  if (methods.length === 0) {
    return (
      <Text color="error" mb="sm">
        <T id="checkout.noPaymentMethodsAvailable" />
      </Text>
    );
  }

  return (
    <SetPaymentMethod>
      {(setPayment, { error, loading }) => (
        <>
          <Box>
            <GridLayout gridGap="xs">
              {methods.map(method => (
                <PaymentMethodOption
                  key={getMethodID(method)}
                  onChange={v => {
                    if (v.target.checked) {
                      setPayment(method);
                    }
                  }}
                  option={method}
                  disabled={loading}
                />
              ))}
            </GridLayout>
          </Box>
          <ErrorSummary errors={error} mt="sm" />
        </>
      )}
    </SetPaymentMethod>
  );
};
