import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Price as FalconPrice } from '@deity/falcon-ui-kit';
import { Text } from '@deity/falcon-ui';

export const Price = props => {
  if (props.free && props.value === 0) {
    return (
      <FalconPrice as={Text} {...props}>
        <T id="price.free" />
      </FalconPrice>
    );
  }

  return <FalconPrice {...props} />;
};
