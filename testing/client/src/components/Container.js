import { themed, Box } from '@deity/falcon-ui';

export const Container = themed({
  tag: Box,
  defaultTheme: {
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      px: 'md',
      py: 'sm',
      border: 'regular',
      borderRadius: 'md',
      borderColor: 'secondaryDark',
      bg: 'light'
    }
  }
});
