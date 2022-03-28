import React from 'react';
import { Link, Icon } from '@deity/falcon-ui';

const calculateColorFor = ({ isActive, isCompleted }) => {
  if (isActive) return 'black';
  if (isCompleted) return 'success';
  return 'secondaryText';
};

export const CheckoutSectionLink = ({ icon, isActive, isCompleted, children, onClick, ...rest }) => (
  <Link
    fontSize="md"
    fontWeight="bold"
    letterSpacing="normal"
    lineHeight="small"
    display="inline-flex"
    alignItems="center"
    color={calculateColorFor({ isActive, isCompleted })}
    borderBottom="regular"
    borderColor="secondaryDark"
    pb="md"
    {...(isCompleted ? { onClick } : {})}
    {...rest}
  >
    <Icon
      src={`${isCompleted ? 'checkCircle' : icon}`}
      stroke={calculateColorFor({ isActive, isCompleted })}
      flex="0 0 auto"
      mr="xs"
      size="md"
    />
    {children}
  </Link>
);
