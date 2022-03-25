import React, { useState } from 'react';
import { T } from '@deity/falcon-i18n';
import { Checkbox, Label, FlexLayout } from '@deity/falcon-ui';
import {
  useSetShippingAddress,
  SetCheckoutAddressFormProvider,
  checkoutAddressToSetCheckoutAddressFormValues,
  useCheckout,
  isCustomAddress
} from '@deity/falcon-front-kit';
import { Form, AddressFormFields, FormFieldLayout, FormFieldLabel, ErrorSummary } from '@deity/falcon-ui-kit';
import { Container } from 'src/components';
import { AddressPicker } from './AddressPicker';
import { NextStepButton } from './NextStepButton';

export const ShippingAddressEditor = ({ addresses, askEmail, initialAddress }) => {
  const defaultShipping = addresses.length > 0 ? addresses[0] : null;
  const [setShippingAddress] = useSetShippingAddress();
  const { values, isBillingSameAsShipping, setBillingSameAsShipping, setEmail } = useCheckout();
  const [address, setAddress] = useState(values.shippingAddress || defaultShipping);

  const handleSuccess = submittedAddress => {
    if (submittedAddress && submittedAddress.email) {
      setEmail(submittedAddress.email);
    }
  };

  return (
    <SetCheckoutAddressFormProvider
      setAddress={addr => setShippingAddress(addr, { refetchQueries: ['Cart'] })}
      address={address}
      initialValues={initialAddress}
      onSuccess={handleSuccess}
    >
      {({ setValues, isSubmitting, status: { error } }) => (
        <Form id="shipping-address" i18nId="addressForm" gridGap="xxxl">
          <Container display="grid" gridGap="sm" gridTemplateColumns="1fr" p="lg">
            {addresses.length > 0 && (
              <FormFieldLayout>
                <FormFieldLabel>
                  <T id="checkout.savedAddress" />
                </FormFieldLabel>
                <AddressPicker
                  options={addresses}
                  selected={address}
                  onChange={newAddress => {
                    setAddress(newAddress);
                    setValues(checkoutAddressToSetCheckoutAddressFormValues(newAddress));
                  }}
                />
              </FormFieldLayout>
            )}
            {isCustomAddress(address) && (
              <AddressFormFields autoCompleteSection="shipping" askEmail={askEmail} gridRowGap="sm" />
            )}
            <FlexLayout alignItems="center">
              <Checkbox
                id="same-as-shipping"
                checked={isBillingSameAsShipping}
                onChange={e => setBillingSameAsShipping(e.target.checked)}
              />
              <Label htmlFor="same-as-shipping" ml="xs">
                <T id="checkout.useTheSameAddress" />
              </Label>
            </FlexLayout>
          </Container>
          <FlexLayout flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
            <NextStepButton type="submit" loading={isSubmitting}>
              {/* need to override the button text because next step in checkout state is incorrect when
              "same as shipping" is checked */}
              <T
                id="checkout.nextStep"
                replace={{ step: isBillingSameAsShipping ? 'shippingMethod' : 'billingAddress' }}
              />
            </NextStepButton>
            <ErrorSummary errors={error} mt="sm" />
          </FlexLayout>
        </Form>
      )}
    </SetCheckoutAddressFormProvider>
  );
};
