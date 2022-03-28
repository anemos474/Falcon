import React from 'react';
import PropTypes from 'prop-types';
import { themed, Box, FlexLayout, Icon, Button, H3 } from '@deity/falcon-ui';
import { useI18n } from '@deity/falcon-i18n';

const SidebarLayoutInnerDOM = ({ title, onClose, sidebarId, children, ...rest }) => {
  const { t } = useI18n();
  return (
    <Box as="section" role="dialog" aria-labelledby={`sidebar-title-${sidebarId}`} {...rest}>
      <FlexLayout mb="md" alignItems="center">
        <Box flex={1}>
          {!!title && (
            <H3 id={`sidebar-title-${sidebarId}`} css={{ lineHeight: 1.6 }}>
              {title}
            </H3>
          )}
        </Box>
        <Button variant="textLink" onClick={onClose} aria-label={t('sidebar.close')}>
          <Icon src="close" size="lg" css={{ opacity: 0.2 }} />
        </Button>
      </FlexLayout>
      <SidebarContentLayout flex={1}>{children}</SidebarContentLayout>
    </Box>
  );
};

export const SidebarLayout = themed({
  tag: SidebarLayoutInnerDOM,
  defaultTheme: {
    sidebarLayout: {
      display: 'flex',
      flexDirection: 'column',
      px: 'md',
      py: 'sm',
      css: {
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        overflowY: 'auto'
      }
    }
  }
});

SidebarLayout.propTypes = {
  title: PropTypes.string,
  sidebarId: PropTypes.string,
  onClose: PropTypes.func
};

export const SidebarContentLayout = themed({
  tag: FlexLayout,
  defaultTheme: {
    sidebarContentLayout: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
      css: {
        width: '100%'
      }
    }
  }
});
