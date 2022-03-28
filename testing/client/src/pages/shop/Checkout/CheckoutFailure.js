import React, { useState } from 'react';
import { FlexLayout, H1, Text, Button } from '@deity/falcon-ui';
import { RestoreCartMutation } from '@deity/falcon-shop-data';
import { Loader, PageLayout, RouterLink } from '@deity/falcon-ui-kit';
import { T } from '@deity/falcon-i18n';

const CheckoutFailure = () => {
  const [cartRestored, setCartRestored] = useState(false);
  const [canCartBeRestored, setCanCartBeRestored] = useState(true);
  return (
    <RestoreCartMutation>
      {(restoreCart, { loading }) => (
        <PageLayout variant="gray" gridGap="lg">
          <H1 variant="title" justifySelf="center" css={{ textAlign: 'center' }}>
            <T id="checkoutFailure.title" />
          </H1>
          <FlexLayout flexDirection="column" alignItems="center">
            <Text mb="md">
              <T id="checkoutFailure.body" />
            </Text>
            {loading && <Loader />}
            {!cartRestored && canCartBeRestored && (
              <>
                <Text mb="md">
                  <T id="checkoutFailure.restoreCartInformation" />
                </Text>
                <Button
                  css={{ margin: '0 auto' }}
                  onClick={() => {
                    restoreCart().then(response => {
                      const { restoreCart: restoreCartResponse } = response.data;
                      setCartRestored(restoreCartResponse);
                      setCanCartBeRestored(false);
                    });
                  }}
                >
                  <T id="checkoutFailure.restoreCartButton" />
                </Button>
              </>
            )}
            {!cartRestored && !canCartBeRestored && (
              <Text mb="md" color="error">
                <T id="checkoutFailure.restoreCartFailed" />
              </Text>
            )}
            {cartRestored && (
              <>
                <Text mb="md">
                  <T id="checkoutFailure.restoreCartSuccess" />
                </Text>
                <FlexLayout flexDirection="row" alignItems="center">
                  <Button as={RouterLink} to="/checkout" m="sm">
                    <T id="checkoutFailure.goToCheckoutButton" />
                  </Button>
                  <Button as={RouterLink} to="/" m="sm" variant="textLink">
                    <T id="checkoutFailure.goShoppingButton" />
                  </Button>
                </FlexLayout>
              </>
            )}
          </FlexLayout>
        </PageLayout>
      )}
    </RestoreCartMutation>
  );
};

export default CheckoutFailure;
