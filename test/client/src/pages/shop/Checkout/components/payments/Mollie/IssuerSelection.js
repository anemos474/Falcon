import React, { useCallback, createContext, useContext, useState, useRef } from 'react';
import { T } from '@deity/falcon-i18n';
import { Text, FlexLayout, withTheme, Select, Option } from '@deity/falcon-ui';
import { MolliePlugin } from '@deity/falcon-mollie-plugin'; // eslint-disable-line import/no-extraneous-dependencies
import { FormFieldLabel, FormFieldLayout } from '@deity/falcon-ui-kit';

const IssuerContext = createContext({ current: { selected: null, options: [] } });

export const IssuerSelectionWrapper = withTheme(({ children, ...props }) => {
  const [loading, setLoading] = useState(false);
  const issuer = useRef({ selected: null, options: [] });
  return (
    <IssuerContext.Provider value={issuer}>
      <MolliePlugin {...props}>
        {(pay, issuers) => {
          issuer.current.options = issuers;
          issuer.current.selected = issuers[0]?.id;
          return children(
            () => {
              if (!issuer.current.selected) return Promise.reject(new Error('Please select an issuer')); // TODO: show some kind of error
              setLoading(true);
              return pay({ issuer: issuer.current.selected })
                .then(x => {
                  setLoading(false);
                  return x;
                })
                .catch(x => {
                  setLoading(false);
                  return Promise.reject(x);
                });
            },
            { loading }
          );
        }}
      </MolliePlugin>
    </IssuerContext.Provider>
  );
});

export const IssuerSelectionInner = ({
  children = (
    <Text my="xs" color="secondaryText" fontWeight="regular">
      <T id="payment.redirect.default" />
    </Text>
  ),
  issuerLabel = (
    <FormFieldLabel htmlFor="issuer">
      <T id="payment.issuer" />
    </FormFieldLabel>
  )
}) => {
  const issuerRef = useContext(IssuerContext);
  const issuers = issuerRef.current.options;

  const [currentIssuer, _setIssuer] = useState(issuerRef.current.selected || issuers[0].id);
  const setIssuer = useCallback(
    event => {
      const newIssuer = event.target.value;
      issuerRef.current.selected = newIssuer;
      _setIssuer(newIssuer);
    },
    [issuerRef]
  );

  return (
    <FlexLayout as="section" my="xs" flexDirection="column" css={{ width: '100%' }}>
      {children}
      <FormFieldLayout>
        {issuerLabel}
        <Select name="issuer" id="issuer" value={currentIssuer} onChange={setIssuer}>
          {issuers.map(issuer => (
            <Option key={issuer.id} value={issuer.id}>
              {issuer.name}
            </Option>
          ))}
        </Select>
      </FormFieldLayout>
    </FlexLayout>
  );
};
