import React, { useCallback } from 'react';
import { T } from '@deity/falcon-i18n';
import { Text, FlexLayout, withTheme } from '@deity/falcon-ui';
import PayPal from '../../../../../../assets/paypal.svg';

const Payment = withTheme(({ children }) => {
  const pay = useCallback(() => Promise.resolve({ id: undefined }), []);
  return children(pay, { loading: false });
});

Payment.UI = () => (
  <FlexLayout as="section" my="xs" flexDirection="column" css={{ width: '100%' }}>
    <Text mb="sm" color="secondaryText" fontWeight="regular">
      <T id="payment.redirect.paypal" />
    </Text>
    <PayPal />
  </FlexLayout>
);

export default Payment;
