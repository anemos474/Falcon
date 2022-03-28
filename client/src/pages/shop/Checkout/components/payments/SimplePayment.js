import { useCallback } from 'react';

const SimplePaymentProvider = ({ children }) => {
  const pay = useCallback(() => Promise.resolve({ id: undefined }), []);

  return children(pay, { loading: false });
};
SimplePaymentProvider.UI = () => null;

export default SimplePaymentProvider;
