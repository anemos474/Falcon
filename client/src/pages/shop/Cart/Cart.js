import React from 'react';
import { CartQuery } from '@deity/falcon-shop-data';
import { Box, H1, Text, Button, Link, FlexLayout } from '@deity/falcon-ui';
import { PageLayout, FixCenteredLayout, RouterLink } from '@deity/falcon-ui-kit';
import { T } from '@deity/falcon-i18n';
import { Container } from 'src/components';
import { CartSummary, CartItemList } from './components';

const EmptyCart = () => (
  <FlexLayout flexDirection="column" alignItems="center">
    <Text mt="lg">
      <T id="cart.emptyCart" />
    </Text>
    <Button mt="sm" as={RouterLink} to="/">
      <T id="cart.goShoppingButton" />
    </Button>
  </FlexLayout>
);

const CartPage = () => (
  <PageLayout variant="gray">
    <FixCenteredLayout maxWidth={800} display="flex" gridGap="none" flexDirection="column" alignItems="stretch">
      <Box mb="xxxl" css={{ textAlign: 'center' }}>
        <H1 mb="sm">
          <T id="cart.title" />
        </H1>
        <Text color="secondaryText" fontSize="md">
          <T id="cart.subtitle" />
        </Text>
      </Box>
      {/* TODO: remove the network-only, if the incorrect cart totals bug is resolved */}
      <CartQuery fetchPolicy="network-only">
        {({ data: { cart } }) => {
          if (!cart.items.length) {
            return <EmptyCart />;
          }

          return (
            <Box>
              <Text fontSize="lg" fontWeight="heavy" mb="md">
                <T id="miniCart.cartCount" count={cart.itemsQty} />
              </Text>
              <Container px="md" pt="md" pb="none">
                <CartItemList items={cart.items} />
                <CartSummary cart={cart} />
              </Container>
              <FlexLayout flexDirection="column" alignItems="center" mt="xxl">
                <Button as={RouterLink} to="/checkout" variant="accent" px="xxxl">
                  <T id="cart.checkout" />
                </Button>
                <Link
                  as={RouterLink}
                  to="/"
                  mt="md"
                  color="secondaryText"
                  fontWeight="semiBold"
                  css={{ textDecoration: 'underline' }}
                >
                  <T id="cart.continueShopping" />
                </Link>
              </FlexLayout>
            </Box>
          );
        }}
      </CartQuery>
    </FixCenteredLayout>
  </PageLayout>
);

export default CartPage;
