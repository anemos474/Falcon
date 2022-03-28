import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, FlexLayout, Label, themed, withTheme } from '@deity/falcon-ui';
import { MollieCardPlugin } from '@deity/falcon-mollie-plugin'; // eslint-disable-line import/no-extraneous-dependencies
import { T } from '@deity/falcon-i18n';

const CreditCardFieldLayout = themed({
  tag: Box,
  defaultTheme: {
    creditCardFieldLayout: {
      my: 'xs',
      css: ({ theme }) => ({
        width: '100%',
        '.mollieInput': {
          border: theme.borders.regular,
          borderColor: theme.colors.secondaryDark,
          borderRadius: theme.borderRadius.md,
          padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`
        }
      }),
      variants: {
        small: {
          mr: 'sm',
          css: {
            maxWidth: '150px'
          }
        }
      }
    }
  }
});

const camelize = s => s.replace(/-./g, x => x[1].toUpperCase());

const Payment = withTheme(({ theme, children, submitting, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [mollieInstance, setMollieInstance] = useState(null);
  const [formLoaded, setFormLoaded] = useState(false);
  const validState = useRef({
    'card-holder': false,
    'card-number': false,
    'expiry-date': false,
    'verification-code': false
  });
  const [disabled, setDisabled] = useState(true);

  const setPayingState = paying => {
    setLoading(paying);
    return Promise.resolve();
  };

  useEffect(() => {
    const fieldsDisabled = loading || submitting;
    Object.keys(validState.current).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.parentNode.style.pointerEvents = fieldsDisabled ? 'none' : 'all';
      }
    });
  }, [loading, submitting, formLoaded]);

  const fieldsFormatting = useMemo(
    () => ({
      styles: {
        base: {
          backgroundColor: 'none',
          color: theme.colors.primary,
          fontSize: `${theme.fontSizes.md}px`,
          '::placeholder': {
            color: 'rgba(0, 0, 0, 0.8)'
          }
        },
        valid: {
          color: theme.colors.success
        },
        invalid: {
          color: theme.colors.error
        }
      }
    }),
    [theme]
  );

  useEffect(() => {
    if (mollieInstance) {
      setFormLoaded(true);
      const updateValid = (field, { valid, error, touched }) => {
        // Update the overall status
        const vc = validState.current;
        vc[field] = valid;
        const allValid = Object.values(vc).reduce((cur, v) => cur && v);
        setDisabled(!allValid);

        // Update the error message for this field
        if (
          // Touched indicates the user unfocused the field at least once
          touched
        ) {
          const errorEl = document.getElementById(`${field}-error`);
          if (error) {
            errorEl.style.display = 'block';
            errorEl.innerText = error;
          } else {
            errorEl.style.display = 'none';
          }
        }
      };

      const vc = validState.current;
      const disposers = Object.keys(vc).map(key => {
        const camelKey = camelize(key);

        const elem = mollieInstance.createComponent(camelKey, fieldsFormatting);
        elem.mount(`#${key}`);
        const listener = data => updateValid(key, data);
        elem.addEventListener('change', listener);

        return () => {
          elem.removeEventListener('change', listener);
          elem.unmount();
        };
      });

      return () => disposers.forEach(dispose => dispose());
    }
  }, [mollieInstance, fieldsFormatting]);

  return (
    <MollieCardPlugin {...props}>
      {(pay, mollie) => {
        setMollieInstance(mollie);
        return children(
          () =>
            setPayingState(true)
              .then(() => pay())
              .then(x => {
                setPayingState(false);
                return x;
              })
              .catch(x => {
                setPayingState(false);
                return Promise.reject(x);
              }),
          { loading, disabled }
        );
      }}
    </MollieCardPlugin>
  );
});

const Error = ({ id }) => {
  return <Box id={id} color="error" mt="xs" display="none" />;
};

Payment.UI = () => (
  // TODO: put everything in some form, such that we can catch an enter key submit
  <FlexLayout as="section" css={{ width: '100%' }}>
    <CreditCardFieldLayout>
      <Label htmlFor="card-holder">
        <T id="creditCard.namePlaceholder" />
      </Label>
      <Box id="card-holder" className="mollieInput" />
      <Error id="card-holder-error" />
    </CreditCardFieldLayout>

    <CreditCardFieldLayout>
      <Label htmlFor="card-number">
        <T id="creditCard.numberPlaceholder" />
      </Label>
      <Box id="card-number" className="mollieInput" />
      <Error id="card-number-error" />
    </CreditCardFieldLayout>

    <CreditCardFieldLayout variant="small">
      <Label htmlFor="expiry-date">
        <T id="creditCard.expiryPlaceholder" />
      </Label>
      <Box id="expiry-date" className="mollieInput" />
      <Error id="expiry-date-error" />
    </CreditCardFieldLayout>

    <CreditCardFieldLayout variant="small">
      <Label htmlFor="verification-code">
        <T id="creditCard.cvcPlaceholder" />
      </Label>
      <Box id="verification-code" className="mollieInput" />
      <Error id="verification-code-error" />
    </CreditCardFieldLayout>
  </FlexLayout>
);

export default Payment;
