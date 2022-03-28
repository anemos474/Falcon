import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { GridLayout, Text, Link } from '@deity/falcon-ui';
import { PropertyRowLayout, AddressDetailsLayout } from '@deity/falcon-ui-kit';
import { useCheckout } from '@deity/falcon-front-kit';
import { getCartTotalByCode, CartTotalCode, PropertyNameText, Price } from '../../components';

const MiniAddressDetails = ({ firstname, lastname, street, postcode, city, country }) => (
  <AddressDetailsLayout>
    <Text fontSize="xs">{`${firstname} ${lastname}`}</Text>
    {street.map((x, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Text key={i}>{x}</Text>
    ))}
    <Text fontSize="xs">{`${postcode} ${city}, ${country.localName || country.code}`}</Text>
  </AddressDetailsLayout>
);

export const CheckoutSectionsSummary = ({ cart }) => {
  const { values } = useCheckout();
  const subTotal = getCartTotalByCode(cart.totals, CartTotalCode.SUBTOTAL);

  let coupon;
  if (cart.coupons && cart.coupons[0]) {
    coupon = cart.coupons[0];
  }

  return (
    <>
      <GridLayout gridGap="xs">
        <PropertyNameText color="black" fontSize="sm">
          <T id="checkout.cartLabel" />
        </PropertyNameText>
        <PropertyRowLayout variant="spaceBetween">
          <Text fontSize="xs">
            <T id="checkout.cartItems" count={cart.itemsQty} />
            <Link as={RouterLink} to="/cart" display="inline-flex" ml="xs" variant="textLink">
              <T id="checkout.edit" />
            </Link>
          </Text>
          <Price value={subTotal.value} fontSize="xs" />
        </PropertyRowLayout>
      </GridLayout>
      {coupon && (
        <GridLayout gridGap="xs">
          <PropertyNameText color="black" fontSize="sm">
            <T id="checkout.couponLabel" />
          </PropertyNameText>
          <PropertyRowLayout variant="spaceBetween">
            <Text fontSize="xs">{coupon.name || coupon.code}</Text>
            <Price value={coupon.discount} fontSize="xs" />
          </PropertyRowLayout>
        </GridLayout>
      )}
      {values.shippingAddress && (
        <GridLayout gridGap="xs">
          <PropertyNameText color="black" fontSize="sm">
            <T id="checkout.shippingAddressLabel" />
          </PropertyNameText>
          <MiniAddressDetails {...values.shippingAddress} />
        </GridLayout>
      )}
      {values.shippingMethod && (
        <GridLayout gridGap="xs">
          <PropertyNameText color="black" fontSize="sm">
            <T id="checkout.shippingMethodLabel" />
          </PropertyNameText>
          <PropertyRowLayout variant="spaceBetween">
            <Text fontWeight="semiBold">{values.shippingMethod.carrierTitle || values.shippingMethod.title}</Text>
            <Price value={values.shippingMethod.amount} free fontSize="xs" />
          </PropertyRowLayout>
        </GridLayout>
      )}
      {values.paymentMethod && (
        <GridLayout gridGap="xs">
          <PropertyNameText color="black" fontSize="sm">
            <T id="checkout.paymentMethodLabel" />
          </PropertyNameText>
          <PropertyRowLayout variant="spaceBetween">
            <Text fontWeight="semiBold">
              <T id={`checkout.payments.${values.paymentMethod.provider}.${values.paymentMethod.method}`} />
            </Text>
            {values.paymentMethod.surcharge?.amount && values.paymentMethod.surcharge?.amount !== 0 && (
              <Price value={values.paymentMethod.surcharge.amount} fontSize="xs" />
            )}
          </PropertyRowLayout>
        </GridLayout>
      )}
    </>
  );
};
