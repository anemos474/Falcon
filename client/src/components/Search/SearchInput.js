import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from '@deity/falcon-ui';

export const SearchInput = withRouter(({ placeholder, ...rest }) => {
  return (
    <Input
      type="search"
      autoComplete="off"
      name="q"
      icon="search"
      placeholder={placeholder}
      aria-label={placeholder}
      boxShadow="distant"
      css={({ theme }) => ({
        fontSize: theme.fontSizes.md,
        width: '100%',
        minWidth: 160,
        maxWidth: 300,
        lineHeight: theme.lineHeights.large,
        paddingLeft: 44,
        ':focus': {
          background: theme.colors.light,
          borderColor: theme.colors.light
        }
      })}
      wrapperProps={{
        css: ({ theme }) => ({
          svg: {
            width: theme.spacing.md,
            height: theme.spacing.md,
            left: '14px'
          }
        })
      }}
      {...rest}
    />
  );
});
