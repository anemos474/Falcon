import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { RemoveCartItemMutation } from '@deity/falcon-shop-data';

export const RemoveItemButton = ({ id, ...props }) => (
  <RemoveCartItemMutation>
    {(removeCartItem, { loading }) => (
      <Button
        onClick={() =>
          removeCartItem({
            variables: { input: { id } },
            optimisticResponse: {
              removeCartItem: { __typename: 'RemoveCartItemPayload', id }
            }
          })
        }
        disabled={loading}
        variant="transparent"
        p="none"
        color="secondaryText"
        fontWeight="semiBold"
        lineHeight="large"
        {...props}
      >
        <T id="miniCart.remove" />
        <Icon src={loading ? 'loader' : 'trash'} ml="xxs" css={{ width: 20, height: 20 }} stroke="secondaryText" />
      </Button>
    )}
  </RemoveCartItemMutation>
);
RemoveItemButton.propTypes = {
  id: PropTypes.string.isRequired
};
