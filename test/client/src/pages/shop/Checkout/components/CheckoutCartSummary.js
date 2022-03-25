import React from 'react';
import { GridLayout } from '@deity/falcon-ui';
import { CartQuery } from '@deity/falcon-shop-data';
import { TotalsSummary } from '../../components';
import { CheckoutSectionsSummary } from './CheckoutSectionsSummary';

export const CheckoutCartSummary = props => {
  return (
    <GridLayout
      gridGap="sm"
      fontSize="sm"
      bg="secondaryLighter"
      p="xxl"
      css={({ theme }) => ({
        marginTop: -theme.spacing.xxxl, // should be equal to the top padding of PageLayout
        borderBottomLeftRadius: theme.borderRadius.md,
        borderBottomRightRadius: theme.borderRadius.md
      })}
      {...props}
    >
      <CartQuery>
        {({ data: { cart } }) => (
          <>
            <CheckoutSectionsSummary cart={cart} />
            <TotalsSummary cart={cart} />
          </>
        )}
      </CartQuery>
    </GridLayout>
  );
};
