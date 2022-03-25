import React from 'react';
import PropTypes from 'prop-types';
import { useI18n } from '@deity/falcon-i18n';
import { Price } from '@deity/falcon-ui-kit';
import { Box, Badge } from '@deity/falcon-ui';

export const ProductPrice = ({ regular, special, min, displayBadge, ...rest }) => {
  const { t } = useI18n();
  if (min) {
    return (
      <Box display="flex" alignItems="center">
        {t('price.from')} <Price ml="xs" value={min} {...rest} />
      </Box>
    );
  }
  if (!special) {
    return <Price value={regular} {...rest} />;
  }

  const discountPercentage = Math.round(((special - regular) / regular) * 100 * -1);

  return (
    <>
      <Price value={special} {...rest} variant="special" />
      <Price value={regular} {...rest} variant="old" />
      {displayBadge && (
        <Badge variant="success" ml="sm">
          Save {discountPercentage.toFixed(0)}%
        </Badge>
      )}
    </>
  );
};

ProductPrice.propTypes = {
  regular: PropTypes.number.isRequired,
  special: PropTypes.number,
  displayBadge: PropTypes.bool
};
