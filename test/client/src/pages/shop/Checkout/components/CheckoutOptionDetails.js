import React from 'react';
import { FlexLayout, Box, H3, Text } from '@deity/falcon-ui';
import { Price } from '../../components';

export const CheckoutOptionDetails = ({ title, description, price }) => (
  <FlexLayout flex="1" flexWrap="nowrap" justifyContent="space-between" ml="xs" mt="xxs">
    <Box>
      <Text as={H3} color="black" fontSize="sm" fontWeight="bold" css={{ lineHeight: '24px' }}>
        {title}
      </Text>
      {description && (
        <Text mt="xs" color="secondaryText" fontWeight="regular">
          {description}
        </Text>
      )}
    </Box>
    {price !== undefined && (
      <Price flex="0 0 auto" value={price} free fontSize="sm" fontWeight="semiBold" css={{ lineHeight: '24px' }} />
    )}
  </FlexLayout>
);
