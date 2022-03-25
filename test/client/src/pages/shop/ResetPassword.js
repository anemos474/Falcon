import React from 'react';
import { Value } from 'react-powerplug';
import { T } from '@deity/falcon-i18n';
import { ValidatePasswordTokenQuery } from '@deity/falcon-shop-data';
import { H1 } from '@deity/falcon-ui';
import {
  PageLayout,
  FixCenteredLayout,
  ResetPasswordForm,
  InvalidResetPasswordToken,
  ResetPasswordSuccess
} from '@deity/falcon-ui-kit';
import { useSidebarContainer } from '@deity/falcon-front-kit';
import { SIDEBAR_TYPE } from 'src/components';

export default ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('token') || '';

  const sidebar = useSidebarContainer();

  return (
    <PageLayout>
      <H1>
        <T id="resetPassword.title" />
      </H1>
      <FixCenteredLayout maxWidth={400} gridGap="md">
        <Value initial={false}>
          {({ set, value }) =>
            value ? (
              <ResetPasswordSuccess onSignIn={() => sidebar.open(SIDEBAR_TYPE.account)} />
            ) : (
              <ValidatePasswordTokenQuery variables={{ token: resetToken }}>
                {({ data: { validatePasswordToken: isTokenValid } }) =>
                  isTokenValid ? (
                    <ResetPasswordForm resetToken={resetToken} onSuccess={() => set(true)} />
                  ) : (
                    <InvalidResetPasswordToken
                      onRequestAnotherToken={() => sidebar.open(SIDEBAR_TYPE.forgotPassword)}
                    />
                  )
                }
              </ValidatePasswordTokenQuery>
            )
          }
        </Value>
      </FixCenteredLayout>
    </PageLayout>
  );
};
