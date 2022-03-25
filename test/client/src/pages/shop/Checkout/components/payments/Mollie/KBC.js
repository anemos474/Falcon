import React from 'react';
import { IssuerSelectionInner, IssuerSelectionWrapper } from './IssuerSelection';

const Payment = props => <IssuerSelectionWrapper {...props} />;
Payment.UI = IssuerSelectionInner;

export default Payment;
