import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FlexLayout, H1, Text, Box } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { Loader, PageLayout } from '@deity/falcon-ui-kit';
import { useHistory } from 'react-router-dom';
import { GET_LAST_ORDER } from '@deity/falcon-shop-data';

const pendingStatuses = ['paymentPending', 'paymentIncomplete'];
const successfulStatuses = ['fulfillmentPending'];

const CheckoutPendingPoll = () => {
  const { data, loading, stopPolling } = useQuery(GET_LAST_ORDER, {
    pollInterval: 250
  });
  const history = useHistory();
  const status = data?.lastOrder?.status || 'paymentPending';
  const [pollTimedOut, setPollTimedOut] = useState(false);

  // If we've been polling for more than 20 seconds we display a message
  const isPending = pendingStatuses.includes(status);
  useEffect(() => {
    if (isPending) {
      const timeout = setTimeout(() => {
        setPollTimedOut(true);
        stopPolling();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isPending, stopPolling]);

  useEffect(() => {
    if (!isPending && !loading) {
      stopPolling();
      if (successfulStatuses.includes(status)) {
        history.push('/checkout/confirmation');
      } else {
        history.push('/checkout/failure');
      }
    }
  }, [isPending, loading]);

  return (
    <PageLayout variant="gray" gridGap="lg">
      <H1 variant="title" justifySelf="center" css={{ textAlign: 'center' }}>
        <T id="checkoutPending.title" />
      </H1>
      <FlexLayout flexDirection="column" alignItems="center">
        {pollTimedOut ? (
          <Box textAlign="center" style={{ maxWidth: '750px' }}>
            <Text>
              <T id="checkoutPending.pendingOrder" />
            </Text>
            <Text>
              <T id="checkoutPending.pendingOrder2" />
            </Text>
          </Box>
        ) : (
          <>
            <Text>
              <T id="checkoutPending.body" />
            </Text>
            <Loader />
          </>
        )}
      </FlexLayout>
    </PageLayout>
  );
};

const CheckoutPending = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) {
    return <Text>No order id was specified</Text>;
  }
  return <CheckoutPendingPoll id={id} />;
};

export default CheckoutPending;
