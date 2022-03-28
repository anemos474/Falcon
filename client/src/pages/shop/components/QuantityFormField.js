import React from 'react';
import PropTypes from 'prop-types';
import { Box, NumberInput } from '@deity/falcon-ui';
import { ErrorSummary, Loader } from '@deity/falcon-ui-kit';
import { Field, getDefaultInputValidators } from '@deity/falcon-front-kit';
import { NumberStepInput } from './NumberStepInput';

/**
 * component which is dedicated to controls product quantity,
 * so accept only natural numbers
 * @param {*} props
 */
export const QuantityFormField = props => {
  const { name, validate, required, children, variant, ...restProps } = props;

  return (
    <Field name={name} validate={getDefaultInputValidators(props)} {...restProps}>
      {({ form: { isSubmitting, setFieldValue }, field, label, error }) => (
        <>
          <Box position="relative">
            {variant === 'small' && isSubmitting && <Loader variant="overlaySmall" />}
            <NumberStepInput
              {...field}
              variant={variant}
              disabled={isSubmitting}
              aria-label={label}
              onChange={value => setFieldValue(field.name, value)}
            />
          </Box>
          {field.invalid && <ErrorSummary errors={{ message: error }} fontSize="xs" />}
        </>
      )}
    </Field>
  );
};
QuantityFormField.defaultProps = {
  required: true,
  min: 1,
  max: 99,
  readOnly: false,
  type: 'number'
};
QuantityFormField.propTypes = {
  ...NumberInput.propTypes,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  type: PropTypes.string
};
