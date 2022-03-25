import React from 'react';
import PropTypes from 'prop-types';
import { Label, FlexLayout, Radio, Icon } from '@deity/falcon-ui';
import { Container } from 'src/components';

export const CheckoutOptionRadio = props => {
  const { value, name, checked, disabled, readOnly, onChange, children, ...rest } = props;
  return (
    <Container
      as={Label}
      key={value}
      htmlFor={`opt-${value}`}
      p="sm"
      borderColor={checked ? 'accent' : 'secondaryDark'}
      css={({ theme }) => ({
        cursor: disabled || readOnly ? 'auto' : 'pointer',
        opacity: disabled && 0.5,
        ':hover': {
          borderColor: !(disabled || readOnly) && theme.colors.accent
        }
      })}
      {...rest}
    >
      <FlexLayout>
        <Radio
          id={`opt-${value}`}
          value={value}
          name={name}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={!(disabled || readOnly) ? onChange : undefined}
          size="lg"
          icon={<Icon className="-inner-radio-icon" src="checkCircle" size="lg" />}
          css={({ theme }) => ({
            cursor: disabled && 'auto',
            '.-inner-radio-frame': {
              // frame takes up whole radio button
              width: '100%',
              height: '100%',
              // frame is always invisible
              background: 'none !important',
              border: 'none !important',
              opacity: '1 !important'
            },
            '.-inner-radio-icon': {
              // icon takes up whole radio button
              width: '100%',
              height: '100%',
              background: 'none !important',
              fill: 'none'
            },
            'input:checked + .-inner-radio-frame .-inner-radio-icon': {
              fill: theme.colors.primaryLight
            }
          })}
        />
        {children}
      </FlexLayout>
    </Container>
  );
};
CheckoutOptionRadio.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  // if true, the state of the input cannot be changed by the user
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};
