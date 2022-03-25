import React, { useEffect } from 'react';
import { T, useI18n } from '@deity/falcon-i18n';
import { Helmet } from 'react-helmet-async';
import { H1, Text, Button } from '@deity/falcon-ui';
import { useEmptyCartMutation } from '@deity/falcon-shop-data';
import { PageLayout, RouterLink } from '@deity/falcon-ui-kit';

const CheckoutSuccess = () => {
  const { t } = useI18n();
  const [emptyCart, { called }] = useEmptyCartMutation();

  useEffect(() => {
    // Clear the cart when this component is loaded
    if (!called) {
      emptyCart();
    }
  }, [called, emptyCart]);

  return (
    <>
      <Helmet>
        <title>{t('checkoutConfirmation.pageTitle')}</title>
      </Helmet>
      <PageLayout variant="gray" css={{ textAlign: 'center' }}>
        <H1 variant="title" justifySelf="center" css={{ textAlign: 'center' }}>
          <T id="checkoutConfirmation.title" />
        </H1>
        <Text>
          <T id="checkoutConfirmation.shippingNotice" />
        </Text>
        <Button as={RouterLink} to="/" css={{ margin: '0 auto' }}>
          <T id="checkoutConfirmation.goShoppingButton" />
        </Button>
      </PageLayout>
    </>
  );
};

export default CheckoutSuccess;
