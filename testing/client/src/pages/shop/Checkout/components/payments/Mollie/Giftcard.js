import React, { createContext, useState, useContext } from 'react';
import { Formik } from 'formik';
import { T } from '@deity/falcon-i18n';
import { Text, FlexLayout, withTheme, Select, Image, List, ListItem, Input } from '@deity/falcon-ui';
import { FormFieldLayout, FormFieldLabel } from '@deity/falcon-ui-kit';
import { MolliePlugin } from '@deity/falcon-mollie-plugin'; // eslint-disable-line import/no-extraneous-dependencies

const GiftcardContext = createContext([
  {
    data: { issuer: '', voucherNumber: '' },
    issuers: []
  },
  () => {}
]);

const Payment = withTheme(({ children, ...props }) => {
  const [loading, setLoading] = useState(false);

  const [giftcardData, setGiftcardData] = useState({
    data: { issuer: '', voucherNumber: '' },
    issuers: []
  });

  return (
    <GiftcardContext.Provider value={[giftcardData, setGiftcardData]}>
      <MolliePlugin {...props}>
        {(pay, _, issuers) => {
          if (issuers !== giftcardData.issuers) setGiftcardData(data => ({ ...data, issuers }));
          const { voucherNumber, issuer } = giftcardData.data;
          return children(
            () => {
              if (!voucherNumber || !issuer) return Promise.reject(new Error('Please endter a giftcard number'));
              setLoading(true);
              return pay(giftcardData.data)
                .then(x => {
                  setLoading(false);
                  return x;
                })
                .catch(x => {
                  setLoading(false);
                  return Promise.reject(x);
                });
            },
            { loading, disabled: !voucherNumber || !issuer }
          );
        }}
      </MolliePlugin>
    </GiftcardContext.Provider>
  );
});

/**
 * https://docs.mollie.com/guides/gift-cards
 */
const UI = () => {
  const [giftcardData, setGiftcardData] = useContext(GiftcardContext);
  const { issuers, data } = giftcardData;

  const currentIssuer = issuers[0]?.id;
  if (data.issuer === '') {
    data.issuer = currentIssuer;
  }

  return (
    <FlexLayout as="section" my="xs" flexDirection="column" css={{ width: '100%' }}>
      <Text mb="sm" color="secondaryText" fontWeight="regular">
        <T id="payment.redirect.giftcard" />
      </Text>

      <List display="flex">
        {issuers.map(issuer => (
          <ListItem key={issuer.id} mb="xs" mr="xs">
            <Image
              src={issuer.image.svg}
              title={issuer.name}
              alt={`${issuer.name} Logo`}
              loading="lazy"
              style={{ opacity: issuer.id === currentIssuer ? '1' : '.3' }}
            />
          </ListItem>
        ))}
      </List>

      <Formik
        initialValues={data}
        validateOnChange
        validate={newData => {
          setGiftcardData(old => ({ ...old, data: { ...newData, issuer: newData.issuer || currentIssuer } }));
        }}
      >
        {({ handleChange, handleBlur }) => (
          <>
            {issuers.length > 1 ? (
              <FormFieldLayout>
                <FormFieldLabel htmlFor="issuer">
                  <T id="payment.giftcard.issuer" />
                </FormFieldLabel>
                <Select
                  name="issuer"
                  id="issuer"
                  value={currentIssuer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  validate={[]}
                >
                  {issuers.map(issuer => (
                    <option key={issuer.id} value={issuer.id}>
                      {issuer.name}
                    </option>
                  ))}
                </Select>
              </FormFieldLayout>
            ) : (
              <Input name="issuer" type="hidden" value={currentIssuer} />
            )}

            <FormFieldLayout>
              <FormFieldLabel htmlFor="voucherNumber">
                <T id="payment.giftcard.number" />
              </FormFieldLabel>
              <Input
                name="voucherNumber"
                id="voucherNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                validate={[]}
                mb="none"
              />
            </FormFieldLayout>
          </>
        )}
      </Formik>
    </FlexLayout>
  );
};
Payment.UI = UI;
export default Payment;
