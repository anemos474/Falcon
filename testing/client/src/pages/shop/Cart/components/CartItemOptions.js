import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from '@deity/falcon-ui';

export const CartItemOptions = ({ options = [], ...props }) => {
  if (!options.length) {
    return null;
  }

  return (
    <Box {...props}>
      {options.map(option => (
        <Text key={option.label}>
          <span>{option.label}: </span>
          <span>{option.value}</span>
        </Text>
      ))}
    </Box>
  );
};

CartItemOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};
