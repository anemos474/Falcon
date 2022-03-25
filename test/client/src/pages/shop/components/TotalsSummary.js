import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@deity/falcon-i18n';
import { GridLayout, Divider } from '@deity/falcon-ui';
import { PropertyRowLayout } from '@deity/falcon-ui-kit';
import { Price } from './Price';
import { getCartTotalByCode, CartTotalCode } from './CartTotals';
import { PropertyNameText } from './PropertyNameText';

export const TotalsSummary = ({
  cart,
  showItems = false,
  showDiscount = false,
  showShipping = false,
  showPayment = false
}) => {
  const subTotal = getCartTotalByCode(cart.totals, CartTotalCode.SUBTOTAL);
  const discountTotal = getCartTotalByCode(cart.totals, CartTotalCode.DISCOUNT);
  const paymentTotal = getCartTotalByCode(cart.totals, CartTotalCode.PAYMENT);
  const shippingTotal = getCartTotalByCode(cart.totals, CartTotalCode.SHIPPING);
  const grandTotal = getCartTotalByCode(cart.totals, CartTotalCode.GRAND_TOTAL);
  const taxTotal = getCartTotalByCode(cart.totals, CartTotalCode.TAX);

  return (
    <>
      <GridLayout gridGap="xs">
        {showItems && (
          <PropertyRowLayout variant="spaceBetween">
            <PropertyNameText color="black">
              <T id="checkout.itemsLabel" />
            </PropertyNameText>
            <Price value={subTotal.value} fontSize="xs" />
          </PropertyRowLayout>
        )}
        {showDiscount && discountTotal && (
          <PropertyRowLayout variant="spaceBetween">
            <PropertyNameText color="black">
              <T id="checkout.discountLabel" />
            </PropertyNameText>
            <Price value={discountTotal.value} fontSize="xs" />
          </PropertyRowLayout>
        )}
        {showShipping && shippingTotal && (
          <PropertyRowLayout variant="spaceBetween">
            <PropertyNameText color="black">
              <T id="checkout.shippingLabel" />
            </PropertyNameText>
            <Price value={shippingTotal.value} free fontSize="xs" />
          </PropertyRowLayout>
        )}
        {showPayment && paymentTotal && (
          <PropertyRowLayout variant="spaceBetween">
            <PropertyNameText color="black">
              <T id="checkout.paymentLabel" />
            </PropertyNameText>
            <Price value={paymentTotal.value} free fontSize="xs" />
          </PropertyRowLayout>
        )}
      </GridLayout>

      <Divider />

      <GridLayout gridGap="xs" pt="sm">
        {taxTotal && (
          <PropertyRowLayout variant="spaceBetween">
            <PropertyNameText fontSize="xxs" color="black">
              {taxTotal.title}
            </PropertyNameText>
            <Price value={taxTotal.value} fontSize="xs" fontWeight="bold" />
          </PropertyRowLayout>
        )}
        <PropertyRowLayout variant="spaceBetween" fontWeight="bold">
          <PropertyNameText fontSize="sm" color="black">
            {grandTotal.title}
          </PropertyNameText>
          <Price value={grandTotal.value} fontSize="md" fontWeight="bold" />
        </PropertyRowLayout>
      </GridLayout>
    </>
  );
};
TotalsSummary.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
    totals: PropTypes.arrayOf(PropTypes.shape({}))
  })
};
