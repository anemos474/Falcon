import React, { useCallback } from 'react';
import { T } from '@deity/falcon-i18n';
import { Text, FlexLayout, withTheme } from '@deity/falcon-ui';

const Payment = withTheme(({ children }) => {
  const pay = useCallback(() => Promise.resolve({ id: undefined }), []);
  return children(pay, { loading: false });
});

Payment.UI = () => (
  <FlexLayout as="section" my="xs" css={{ width: '100%' }}>
    <Text mt="xs" color="secondaryText" fontWeight="regular">
      <T id="payment.redirect.default" />
    </Text>
  </FlexLayout>
);

export default Payment;
