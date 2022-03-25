import React from 'react';
import PropTypes from 'prop-types';
import { FlexLayout } from '@deity/falcon-ui';
import AdyenCCPlugin from '@deity/falcon-adyen-plugin';
import { CreditCardInput } from '@deity/falcon-ui-kit';

const Adyen = ({ config, onPaymentDetailsReady }) => (
  <AdyenCCPlugin config={config} onPaymentDetailsReady={onPaymentDetailsReady}>
    {({ setCreditCardData }) => (
      <FlexLayout my="md" css={{ width: '100%' }}>
        <CreditCardInput onCompletion={setCreditCardData} />
      </FlexLayout>
    )}
  </AdyenCCPlugin>
);
Adyen.icon = AdyenCCPlugin.icon;
Adyen.propTypes = {
  config: PropTypes.object.isRequired,
  onPaymentDetailsReady: PropTypes.func.isRequired
};

export default Adyen;
