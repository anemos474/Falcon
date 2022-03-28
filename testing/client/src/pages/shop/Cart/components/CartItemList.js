import React from 'react';
import PropTypes from 'prop-types';
import { Divider, GridLayout } from '@deity/falcon-ui';
import { CartItem } from './CartItem';

export const CartItemList = ({ items, readOnly, ...restProps }) => (
  <GridLayout gridGap={{ xs: 'xl', sm: 'md' }} {...restProps}>
    {items.map(item => (
      <React.Fragment key={item.id}>
        <CartItem item={item} readOnly={readOnly} />
        <Divider />
      </React.Fragment>
    ))}
  </GridLayout>
);
CartItemList.propTypes = {
  items: PropTypes.arrayOf(CartItem.propTypes.item)
};
