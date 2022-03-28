import React, { useState, useEffect } from 'react';
import { T } from '@deity/falcon-i18n';
import {
  useSetBillingAddress,
  SetCheckoutAddressFormProvider,
  checkoutAddressToSetCheckoutAddressFormValues,
  useCheckout,
  isCustomAddress
} from '@deity/falcon-front-kit';
import { Form, AddressFormFields, FormFieldLayout, FormFieldLabel, ErrorSummary } from '@deity/falcon-ui-kit';
import { FlexLayout } from '@deity/falcon-ui';
import { Container } from 'src/components/Container';
import { AddressPicker } from './AddressPicker';
import { NextStepButton } from './NextStepButton';

export const BillingAddressEditor = ({ addresses, initialAddress }) => {
  const defaultBilling = addresses.length > 0 ? addresses[0] : null;
  const [setBillingAddress] = useSetBillingAddress();
  const { values, setBillingSameAsShipping } = useCheckout();
  const [address, setAddress] = useState(values.billingAddress || defaultBilling);

  useEffect(() => {
    // It is possible to submit a billing address even though `billingSameAsShipping` is true,
    // for example when the user decides to edit billing address from the summary page.
    // If the user submits the billing address form,
    // we can assume that they don't want `billingSameAsShipping` to be true anymore
    setBillingSameAsShipping(false);
  }, [setBillingSameAsShipping]);

  const handleSetAddress = newAddress => {
    // Take email from checkout state since it is not asked in billing address step
    const newAddressWithEmail = newAddress;
    if (values.email) {
      newAddressWithEmail.email = values.email;
    }

    return setBillingAddress(newAddressWithEmail, { refetchQueries: ['Cart'] });
  };

  return (
    <SetCheckoutAddressFormProvider setAddress={handleSetAddress} address={address} initialValues={initialAddress}>
      {({ setValues, isSubmitting, status: { error } }) => (
        <Form id="billing-address" i18nId="addressForm" gridGap="xxxl">
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
            {isCustomAddress(address) && <AddressFormFields autoCompleteSection="billing" gridRowGap="sm" />}
          </Container>
          <FlexLayout flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
            <NextStepButton type="submit" loading={isSubmitting} />
            <ErrorSummary errors={error} mt="sm" />
          </FlexLayout>
        </Form>
      )}
    </SetCheckoutAddressFormProvider>
  );
};
