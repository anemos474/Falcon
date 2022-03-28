import React, { useState } from 'react';
import { Text, GridLayout } from '@deity/falcon-ui';
import { SimplePayment } from '@deity/falcon-payment-plugin';
import PayPal from './payments/Magento/PayPal';
import { CheckoutOptionRadio } from './CheckoutOptionRadio';
import Stripe from './payments/Stripe';
import Mollie from './payments/Mollie/Default';
import Adyen from './payments/Adyen';

const paymentCodeToPluginMap = {
  adyen_cc: Adyen,
  paypal_express: PayPal,
  checkmo: SimplePayment,
  cash: SimplePayment,
  stripe: Stripe,
  mollie: Mollie
};

const PaymentMethodPicker = ({ nextButtonRef, options, selected, onChange, disabled }) => {
  const [method, setMethod] = useState(selected);
  const isPaymentCodeMapDefined = code => code in paymentCodeToPluginMap;
  const getPaymentPluginFor = code => (isPaymentCodeMapDefined(code) ? paymentCodeToPluginMap[code] : undefined);

  return (
    <GridLayout>
      {options.map(option => {
        const checked = option.code === (method && method.code);
        const SelectedPaymentPlugin = (checked && getPaymentPluginFor(option.code)) || undefined;
        if (checked && !SelectedPaymentPlugin) {
          if (process.env.NODE_ENV !== 'production') {
            console.error(`No Payment Method Plugin found for ${option.code}`);
          }
        }

        return (
          <CheckoutOptionRadio
            key={option.code}
            value={option.code}
            name="payment"
            checked={checked}
            isSelected={selected && 'data' in selected}
            onChange={() => {
              setMethod(option);
              onChange(undefined);
            }}
            disabled={disabled}
          >
            <Text as="span">{option.title}</Text>
            {checked && SelectedPaymentPlugin && (
              <SelectedPaymentPlugin
                nextButtonRef={nextButtonRef}
                config={option.config}
                onPaymentDetailsReady={details => {
                  onChange({ ...option, data: details });
                }}
              />
            )}
          </CheckoutOptionRadio>
        );
      })}
    </GridLayout>
  );
};

export default PaymentMethodPicker;
