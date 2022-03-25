import { themed, Box } from '@deity/falcon-ui';

export const FormFieldHelp = themed({
  tag: Box,
  defaultTheme: {
    formFieldHelp: {
      color: 'secondaryDarker',
      fontSize: 'xs',
      position: 'absolute',
      pt: 'xs',
      css: {
        top: '100%',
        fontWeight: 500
      }
    }
  }
});
