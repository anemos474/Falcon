import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, H4, Text, FlexLayout, themed, GridLayout, Button, Icon } from '@deity/falcon-ui';
import { toGridTemplate, ProductPrice, Form, ErrorSummary, Image } from '@deity/falcon-ui-kit';
import { OnChangeFormSubmit } from '../../../../components';
import { UpdateCartItemFormProvider, QuantityFormField } from '../../components';
import { RemoveItemButton } from './RemoveItemButton';
import { CartItemOptions } from './CartItemOptions';

export const CartItemArea = {
  thumb: 'thumb',
  details: 'details',
  qty: 'qty',
  price: 'price',
  remove: 'remove'
};

const CartItemLayout = themed({
  tag: GridLayout,
  defaultTheme: {
    cartItemLayout: {
      gridRowGap: {
        xs: 'sm',
        sm: 'none'
      },
      gridColumnGap: {
        xs: 'sm',
        md: 'md'
      },
      css: ({ readOnly }) => ({
        minHeight: {
          xs: 'auto',
          sm: 104,
          md: 120
        },
        // prettier-ignore
        gridTemplate: {
          xs: toGridTemplate([
            ['96px',                '1fr'                       ],
            [CartItemArea.thumb,    CartItemArea.details, 'auto'],
            [CartItemArea.thumb,    CartItemArea.price,   '1fr' ],
            readOnly ? (
              [CartItemArea.qty,    CartItemArea.remove,  'auto']
            ) : (
              [CartItemArea.remove, CartItemArea.qty,     'auto']
            )
          ]),
          sm: toGridTemplate([
            ['104px',            '1fr',                'auto',           '0.4fr'                   ],
            [CartItemArea.thumb, CartItemArea.details, CartItemArea.qty, CartItemArea.price,  '50%'],
            [CartItemArea.thumb, CartItemArea.details, CartItemArea.qty, CartItemArea.remove, '50%'],
          ]),
          md: toGridTemplate([
            ['120px',            '1fr',                'auto',           '0.4fr'                   ],
            [CartItemArea.thumb, CartItemArea.details, CartItemArea.qty, CartItemArea.price,  '50%'],
            [CartItemArea.thumb, CartItemArea.details, CartItemArea.qty, CartItemArea.remove, '50%'],
          ]),
        }
      })
    }
  }
});

export const CartItem = ({ item, readOnly, ...rest }) => {
  const [expanded, setExpanded] = useState(false);

  const hasOptions = !!item.itemOptions.length;

  return (
    <CartItemLayout readOnly={readOnly} {...rest}>
      <Box gridArea={CartItemArea.thumb} position="relative">
        <Image
          src={item.thumbnailUrl}
          alt={item.name}
          loading="lazy"
          position={{ xs: 'static', sm: 'absolute' }} // must be absolute to respect parent's height
          display="block"
          borderRadius="sm"
          css={{
            width: '100%',
            minWidth: 48,
            height: '100%',
            maxHeight: 120,
            objectFit: 'cover'
          }}
        />
      </Box>
      <FlexLayout gridArea={CartItemArea.details} flexDirection="column" flexWrap="nowrap" css={{ height: '100%' }}>
        <FlexLayout flexWrap="nowrap" alignItems="flex-start" justifyContent="space-between" minHeight="md">
          <H4 to={item.urlKey} fontSize="md" fontWeight="bold" lineHeight="default">
            {item.name}
          </H4>
          {item.itemOptions.length > 3 && (
            <Button variant="transparent" p="none" css={{ height: 'auto' }} onClick={() => setExpanded(prev => !prev)}>
              <Icon src={expanded ? 'chevronDown' : 'chevronUp'} />
            </Button>
          )}
        </FlexLayout>
        {hasOptions && (
          <CartItemOptions
            options={item.itemOptions}
            color="secondaryText"
            fontSize="xs"
            css={{ maxHeight: expanded ? 'none' : { xs: 64, sm: 72 }, overflowY: 'hidden' }}
          />
        )}
        <Text variant="caps" mt="xs" fontSize="xxs" fontWeight="bold" color="secondaryText">
          SKU: {item.sku}
        </Text>
      </FlexLayout>
      <Box gridArea={CartItemArea.qty} css={{ justifySelf: readOnly ? 'start' : 'end' }}>
        {readOnly ? (
          <Text>
            <span aria-label="quantity">Qty:</span> {item.qty}
          </Text>
        ) : (
          <UpdateCartItemFormProvider item={item}>
            {({ status = {} }) => (
              <Box as={Form} id={`update-cart-item-${item.id}`} flexDirection="column">
                <QuantityFormField name="qty" variant="small" />
                <ErrorSummary errors={status.error} fontSize="sm" />
                <OnChangeFormSubmit />
              </Box>
            )}
          </UpdateCartItemFormProvider>
        )}
      </Box>
      <FlexLayout
        gridArea={CartItemArea.price}
        flexDirection={{ xs: 'row', sm: 'column' }}
        css={{ textAlign: { xs: 'left', sm: 'right' }, '> :last-of-type': { marginRight: 0 } }}
      >
        <ProductPrice
          regular={item.rowTotalInclTax}
          special={item.rowTotalInclDiscount}
          fontSize="md"
          mr={{ xs: 'sm', sm: 'none' }}
        />
      </FlexLayout>
      {!readOnly && (
        <RemoveItemButton
          gridArea={CartItemArea.remove}
          css={{ alignSelf: 'end', justifySelf: { xs: 'start', sm: 'end' } }}
          id={item.id}
        />
      )}
    </CartItemLayout>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    itemOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    qty: PropTypes.number,
    price: PropTypes.number,
    rowTotalInclTax: PropTypes.number.isRequired,
    rowTotalInclDiscount: PropTypes.number
  })
};
