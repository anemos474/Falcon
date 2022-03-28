import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { LastOrderQuery } from '@deity/falcon-shop-data';
import { Box, H1, Text, FlexLayout, Button } from '@deity/falcon-ui';
import { Loader, PageLayout } from '@deity/falcon-ui-kit';

const OrderSummary = ({ order }) => (
  <Box>
    {order.items.map(item => (
      <Text fontWeight="bold" key={item.id}>
        {item.name}
      </Text>
    ))}
  </Box>
);

const CheckoutConfirmation = () => (
  <PageLayout variant="gray" gridGap="lg">
    <H1 variant="title" justifySelf="center" css={{ textAlign: 'center' }}>
      <T id="checkoutConfirmation.title" />
    </H1>
    <LastOrderQuery fetchPolicy="network-only">
      {({ data, loading }) => {
        if (loading || !data) {
          return <Loader />;
        }
        return (
          <>
            <FlexLayout flexDirection="column" alignItems="center">
              <Text>
                <T id="checkoutConfirmation.orderReceived" referenceNo={data?.lastOrder?.referenceNo} />
              </Text>
              <OrderSummary my="sm" order={data?.lastOrder} />
              <Text my="sm">
                <T id="checkoutConfirmation.realizationNotice" />
              </Text>
              <Text>
                <T id="checkoutConfirmation.shippingNotice" />
              </Text>
            </FlexLayout>
            <FlexLayout justifySelf="center">
              <Button as={RouterLink} to="/">
                <T id="checkoutConfirmation.goShoppingButton" />
              </Button>
            </FlexLayout>
          </>
        );
      }}
    </LastOrderQuery>
  </PageLayout>
);

export default CheckoutConfirmation;
