import React from 'react';
import { T } from '@deity/falcon-i18n';
import { OrderQuery } from '@deity/falcon-shop-data';
import { H1, Text, Divider, Box, FlexLayout, GridLayout } from '@deity/falcon-ui';
import {
  OrderLayout,
  OrderLayoutArea,
  OrderItemSummary,
  FormattedDate,
  AddressDetails,
  PropertyRowLayout,
  Price
} from '@deity/falcon-ui-kit';
import { CurrencyProvider } from '@deity/falcon-front-kit';
import { getCartTotalByCode, CartTotalCode } from '../../components';

const Order = ({ match }) => {
  const id = parseInt(match.params.id, 10);

  return (
    <GridLayout>
      <OrderQuery variables={{ id }}>
        {({ data: { order } }) => (
          <CurrencyProvider currency={order.currency}>
            <H1>
              <T id="order.title" orderId={order.referenceNo} />
            </H1>
            <OrderLayout>
              <FlexLayout gridArea={OrderLayoutArea.status}>
                <Text fontWeight="bold" mr="md">
                  <T id="order.statusLabel" />
                </Text>
                <T id="order.status" context={order.status || 'na'} />
              </FlexLayout>
              <GridLayout gridArea={OrderLayoutArea.items} alignContent="flex-start" gridGap="sm">
                <Divider />
                {order.items.map(x => (
                  <React.Fragment key={x.sku}>
                    <OrderItemSummary {...x} />
                    <Divider />
                  </React.Fragment>
                ))}
                <Box>
                  <PropertyRowLayout variant="spaceBetween">
                    <T id="order.subtotalLabel" />
                    <Price value={getCartTotalByCode(order.totals, CartTotalCode.SUBTOTAL)?.value} />
                  </PropertyRowLayout>
                  <PropertyRowLayout variant="spaceBetween">
                    <T id="order.shippingAmountLabel" />
                    <Price value={getCartTotalByCode(order.totals, CartTotalCode.SHIPPING)?.value} />
                  </PropertyRowLayout>
                  <PropertyRowLayout variant="spaceBetween">
                    <T id="order.paymentAmountLabel" />
                    <Price value={getCartTotalByCode(order.totals, CartTotalCode.PAYMENT)?.value} />
                  </PropertyRowLayout>
                </Box>
                <Divider />
                <PropertyRowLayout variant="spaceBetween" fontWeight="bold">
                  <T id="order.grandTotalLabel" />
                  <Price value={getCartTotalByCode(order.totals, CartTotalCode.GRAND_TOTAL)?.value} />
                </PropertyRowLayout>
              </GridLayout>
              <Divider gridArea={OrderLayoutArea.divider} />
              <GridLayout gridArea={OrderLayoutArea.summary} alignContent="flex-start" gridGap="sm">
                <Box>
                  <Text fontWeight="bold">
                    <T id="order.billingAddressLabel" />
                  </Text>
                  <AddressDetails {...order.billingAddress} />
                </Box>
                <Box>
                  <Text fontWeight="bold">
                    <T id="order.shippingAddressLabel" />
                  </Text>
                  <AddressDetails {...order.shippingAddress} />
                </Box>
                <Box>
                  <Text fontWeight="bold">
                    <T id="order.createdAtLabel" />
                  </Text>
                  <FormattedDate value={order.createdAt} />
                </Box>
                <Box>
                  <Text fontWeight="bold">
                    <T id="order.shippingMethodLabel" />
                  </Text>
                  {order.shippingMethod?.title}
                </Box>
                <Box>
                  <Text fontWeight="bold">
                    <T id="order.paymentMethodLabel" />
                  </Text>
                  {order.paymentMethod && (
                    <T id={`checkout.payments.${order.paymentMethod.provider}.${order.paymentMethod.method}`} />
                  )}
                </Box>
              </GridLayout>
            </OrderLayout>
          </CurrencyProvider>
        )}
      </OrderQuery>
    </GridLayout>
  );
};

export default Order;
