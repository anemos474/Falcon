import React, { useState } from 'react';
import { StripePlugin, CardElement } from '@deity/falcon-stripe-plugin';
import { Box, themed } from '@deity/falcon-ui';

const StripeCardLayout = themed({
  tag: Box,
  defaultTheme: {
    stripeCardLayout: {
      my: 'md',
      css: ({ theme }) => ({
        width: '100%',
        '.StripeElement': {
          border: theme.borders.regular,
          borderColor: theme.colors.secondaryDark,
          borderRadius: theme.borderRadius.md,
          padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`
        }
      })
    }
  }
});

const Payment = ({ children, ...props }) => {
  const [loading, setLoading] = useState(false);
  const fn = () => {
    setLoading(true);
    return Promise.resolve();
  };

  return (
    <StripePlugin {...props}>
      {pay =>
        children(
          () =>
            fn()
              .then(() => pay())
              .then(x => {
                setLoading(false);
                return x;
              })
              .catch(x => {
                setLoading(false);
                return Promise.reject(x);
              }),
          { loading }
        )
      }
    </StripePlugin>
  );
};
Payment.UI = () => (
  <StripeCardLayout>
    {/* https://stripe.com/docs/stripe-js/reference#element-options */}
    <CardElement hidePostalCode />
  </StripeCardLayout>
);

export default Payment;
