import React from 'react';
import { T } from '@deity/falcon-i18n';
import { useCheckout, usePlaceOrder } from '@deity/falcon-front-kit';
import { FlexLayout, Text } from '@deity/falcon-ui';
import { ErrorSummary } from '@deity/falcon-ui-kit';
import { NextStepButton } from '../../components/NextStepButton';

export const NoPaymentSubmission = () => {
  const { values, isLoading } = useCheckout();
  const [placeOrder, { error }] = usePlaceOrder();

  return (
    <FlexLayout flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
      <Text mb="sm">
        <T id="checkout.noPayment" />
      </Text>
      <NextStepButton
        variant="accent"
        loading={isLoading}
        onClick={() =>
          placeOrder(
            {
              ...values
            },
            {
              awaitRefetchQueries: false
            }
          )
        }
      >
        <T id="checkout.placeOrder" />
      </NextStepButton>
      <ErrorSummary errors={error} mt="sm" />
    </FlexLayout>
  );
};
