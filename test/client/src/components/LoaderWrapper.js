import React from 'react';
import { Loader } from '@deity/falcon-ui-kit';

export const LoaderWrapper = ({ children }) => (
  <>
    <Loader variant="overlay" />
    {children}
  </>
);
