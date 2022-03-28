import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { Price, toGridTemplate } from '@deity/falcon-ui-kit';
import { Box, GridLayout, Input, Button, Text, themed, Divider, FlexLayout, Group } from '@deity/falcon-ui';
import { useI18n } from '@deity/falcon-i18n';
import { useApplyCouponMutation, useCancelCouponMutation } from '@deity/falcon-shop-data';
import { getCartTotalByCode, CartTotalCode, PropertyNameText } from '../../components';

export const CartSummaryLayout = themed({
  tag: GridLayout,
  defaultTheme: {
    cartSummaryLayout: {
      gridGap: {
        xs: 'lg',
        sm: 'xl'
      },
      py: {
        xs: 'lg',
        sm: 'xl'
      }
    }
  }
});

export const CouponForm = ({ couponCode, ...rest }) => {
  const { t } = useI18n();
  const [applyCoupon, applyCouponResult] = useApplyCouponMutation();
  const [cancelCoupon, cancelCouponResult] = useCancelCouponMutation();

  return (
    <Box {...rest}>
      <Formik
        initialValues={{ couponCode }}
        validate={values => {
          if (!values.couponCode) {
            return { couponCode: t('cart.invalidCouponCode') };
          }
        }}
        onSubmit={values => {
          if (!couponCode) {
            applyCoupon({
              variables: {
                input: {
                  code: values.couponCode
                }
              }
            });
          } else {
            cancelCoupon({
              variables: {
                input: {
                  code: values.couponCode
                }
              }
            });
          }
        }}
      >
        {({ errors, handleChange, handleBlur }) => {
          const errorMessage = !errors.couponCode && !!applyCouponResult.error && applyCouponResult.error.message;

          const loading = applyCouponResult.loading || cancelCouponResult.loading;

          return (
            <FormikForm>
              <FlexLayout
                mx={{ xs: 'none', sm: 'lg' }}
                flexDirection="column"
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <Group>
                  <Input
                    type="text"
                    name="couponCode"
                    required
                    disabled={!!couponCode}
                    aria-label={t('cart.couponCode')}
                    placeholder={t('cart.couponCode')}
                    icon={loading ? 'loader' : 'gift'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={couponCode || ''}
                    height="xl"
                    css={({ theme }) => ({
                      minWidth: 80,
                      borderRadius: 0,
                      borderTopLeftRadius: theme.borderRadius.sm,
                      borderBottomLeftRadius: theme.borderRadius.sm
                    })}
                    wrapperProps={{
                      css: {
                        flexGrow: 1
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    height="xl"
                    fontSize="sm"
                    css={({ theme }) => ({
                      borderRadius: 0,
                      borderTopRightRadius: theme.borderRadius.sm,
                      borderBottomRightRadius: theme.borderRadius.sm
                    })}
                  >
                    {couponCode ? t(`cart.cancelCouponCode`) : t(`cart.applyCouponCode`)}
                  </Button>
                </Group>
                {errorMessage && (
                  <Text mt="xxs" fontSize="xs" color="error" css={{ textAlign: 'center' }}>
                    {errorMessage.replace('GraphQL error: ', '')}
                  </Text>
                )}
              </FlexLayout>
            </FormikForm>
          );
        }}
      </Formik>
    </Box>
  );
};

export const TotalsItem = ({ children }) => (
  <FlexLayout flexWrap="none" justifyContent="space-between" alignItems="center">
    {children}
  </FlexLayout>
);

export const CouponTotalsItem = ({ children }) => (
  <GridLayout
    css={() => ({
      alignItems: 'center',
      // prettier-ignore
      gridTemplate: {
        xs: toGridTemplate([
          ['1fr',   '1fr'  ],
          ['label', 'price'],
          ['form',  'form' ]
        ]),
        sm: toGridTemplate([
          ['auto',  '1fr',  'auto' ],
          ['label', 'form', 'price']
        ])
      }
    })}
  >
    {children}
  </GridLayout>
);

export const CartSummary = ({ cart }) => {
  const { t } = useI18n();

  const subTotal = getCartTotalByCode(cart.totals, CartTotalCode.SUBTOTAL);
  const discountTotal = getCartTotalByCode(cart.totals, CartTotalCode.DISCOUNT);
  const paymentTotal = getCartTotalByCode(cart.totals, CartTotalCode.PAYMENT);
  const shippingTotal = getCartTotalByCode(cart.totals, CartTotalCode.SHIPPING);
  const grandTotal = getCartTotalByCode(cart.totals, CartTotalCode.GRAND_TOTAL);
  const taxTotal = getCartTotalByCode(cart.totals, CartTotalCode.TAX);

  let couponCode = null;
  if (cart.coupons && cart.coupons.length > 0) {
    couponCode = cart.coupons[0].code;
  }

  return (
    <CartSummaryLayout>
      <TotalsItem>
        <PropertyNameText fontSize="xs">{subTotal.title}</PropertyNameText>
        <Price value={subTotal.value} fontSize="xs" css={{ flexShrink: 0 }} />
      </TotalsItem>
      {shippingTotal && (
        <TotalsItem>
          <PropertyNameText fontSize="xs">{shippingTotal.title}</PropertyNameText>
          <Price value={shippingTotal.value} fontSize="xs" css={{ flexShrink: 0 }} />
        </TotalsItem>
      )}
      {paymentTotal && paymentTotal.value > 0 && (
        <TotalsItem>
          <PropertyNameText fontSize="xs">{paymentTotal.title}</PropertyNameText>
          <Price value={paymentTotal.value} fontSize="xs" css={{ flexShrink: 0 }} />
        </TotalsItem>
      )}
      <Divider />
      <CouponTotalsItem>
        <PropertyNameText fontSize="xs" gridArea="label" css={{ justifySelf: 'left' }}>
          {t('checkout.couponLabel')}
        </PropertyNameText>
        <CouponForm gridArea="form" couponCode={couponCode} />
        <Price
          gridArea="price"
          value={discountTotal ? discountTotal.value : 0}
          fontSize="xs"
          css={{
            justifySelf: 'right',
            visibility: discountTotal && discountTotal.value !== 0 ? 'visible' : 'hidden'
          }}
        />
      </CouponTotalsItem>
      <Divider />
      <TotalsItem>
        <PropertyNameText fontSize="xs">{taxTotal.title}</PropertyNameText>
        <Price value={taxTotal.value} fontSize="xs" css={{ flexShrink: 0 }} />
      </TotalsItem>
      <TotalsItem>
        <PropertyNameText fontSize="md">{grandTotal.title}</PropertyNameText>
        <Price value={grandTotal.value} fontSize="md" fontWeight="bold" css={{ flexShrink: 0 }} />
      </TotalsItem>
    </CartSummaryLayout>
  );
};
