import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { useCheckout } from '@deity/falcon-front-kit';

const NextStepButtonText = () => {
  const { nextStep } = useCheckout();

  if (nextStep) {
    return <T id="checkout.nextStep" replace={{ step: nextStep }} />;
  }
  return <T id="checkout.nextStepGeneric" />;
};

export const NextStepButton = ({ children, type, disabled, loading, onClick, errors, ...rest }) => {
  return (
    <Button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      css={{
        width: { xs: '100%', md: 'auto' },
        maxWidth: 360
      }}
      {...rest}
    >
      {children || <NextStepButtonText />}
      {loading && <Icon src="loader" ml="sm" />}
    </Button>
  );
};
NextStepButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)])
};
