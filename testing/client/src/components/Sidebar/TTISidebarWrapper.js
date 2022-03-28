import React from 'react';
import PropTypes from 'prop-types';
import { useSidebarContainer, EnsureTTI } from '@deity/falcon-front-kit';

export const TTISidebarWrapper = ({ children }) => {
  const sidebar = useSidebarContainer();

  return (
    <EnsureTTI forceReady={sidebar.isOpen}>
      {({ isReady }) => {
        return isReady ? children({ ...sidebar }) : null;
      }}
    </EnsureTTI>
  );
};

TTISidebarWrapper.propTypes = {
  children: PropTypes.func.isRequired
};
