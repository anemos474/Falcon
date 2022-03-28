import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { I18n } from '@deity/falcon-i18n';
import { Box, Button, Icon, themed } from '@deity/falcon-ui';

export const AlertLayout = themed({
  tag: Box,
  defaultTheme: {
    alertLayout: {
      color: 'light',
      bg: 'info',
      p: 'sm',
      borderRadius: 'sm',
      display: 'flex',
      alignItems: 'flex-start',
      fontSize: 'sm',
      fontWeight: 'semiBold',
      letterSpacing: 'normal',
      css: {
        width: '100%'
      },
      variants: {
        error: {
          bg: 'error'
        },
        success: {
          bg: 'success'
        },
        warning: {
          bg: 'warning'
        }
      }
    }
  }
});

export const AlertCloseLayout = themed({
  tag: Button,
  defaultTheme: {
    alertCloseLayout: {
      color: 'light',
      bg: 'transparent',
      borderRadius: 'none',
      p: 'none',
      css: {
        height: 'auto',
        marginLeft: 'auto',
        '&[href]:hover, :hover:enabled': {
          backgroundColor: 'transparent',
          transform: 'scale(1.2)'
        },
        '&[href]:active:enabled, :active:enabled': {
          backgroundColor: 'transparent'
        }
      }
    }
  }
});

export const Alert = ({ canHide, children, variant, visible, ...restProps }) => {
  const [isVisible, setIsVisible] = useState(visible);

  if (isVisible) {
    return (
      <AlertLayout variant={variant} {...restProps}>
        <div role="alert">{children}</div>
        {canHide && (
          <I18n>
            {t => (
              <AlertCloseLayout title={t('alert.hide')} variant={variant} onClick={() => setIsVisible(false)}>
                <Icon src="close" />
              </AlertCloseLayout>
            )}
          </I18n>
        )}
      </AlertLayout>
    );
  }

  return null;
};

Alert.defaultProps = {
  visible: true,
  canHide: true
};

Alert.propTypes = {
  visible: PropTypes.bool,
  // Is it possibe to hide the alert
  canHide: PropTypes.bool
};
