import { FlexLayout, themed } from '@deity/falcon-ui';

export const CheckoutSectionFooter = themed({
  tag: FlexLayout,
  defaultTheme: {
    checkoutSection: {
      pt: 'sm',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse'
    }
  }
});
