import React from 'react';
import PropTypes from 'prop-types';
import { NumberInput } from '@deity/falcon-ui';

export const NumberStepInput = props => {
  const { onChange } = props;

  return (
    <NumberInput
      {...props}
      onPaste={e => {
        e.preventDefault();
      }}
      onKeyDown={e => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
          if (e.target.value.length === 1) {
            e.preventDefault();
            onChange(props.min);
          }
        }
      }}
      onChange={e => {
        let value = parseInt(e.target.value, 10) || -1;
        if (value < props.min) {
          value = props.min;
        }
        if (value > props.max) {
          value = props.max;
        }

        onChange(value);
      }}
    />
  );
};
NumberStepInput.defaultProps = {
  min: 1,
  max: 99,
  step: 1,
  readOnly: false
};
NumberStepInput.propTypes = {
  ...NumberInput.propTypes,
  readOnly: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
