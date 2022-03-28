import React from 'react';
import { T } from '@deity/falcon-i18n';
import { H1, Divider } from '@deity/falcon-ui';
import { PageLayout, FixCenteredLayout, SignInForm, NewAccount } from '@deity/falcon-ui-kit';
import { useSidebarContainer } from '@deity/falcon-front-kit';
import { SIDEBAR_TYPE } from 'src/components';

const SignIn = ({ history, location }) => {
  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const next = queryParams.get('next') || '/';

  const sidebar = useSidebarContainer();

  return (
    <PageLayout>
      <H1>
        <T id="signIn.title" />
      </H1>

      <FixCenteredLayout maxWidth={400}>
        <SignInForm
          id="sign-in-page"
          onSuccess={() => history.replace(next)}
          onForgotPassword={() => sidebar.open(SIDEBAR_TYPE.forgotPassword)}
        />
        <Divider my="lg" />
        <NewAccount onCreateNewAccount={() => sidebar.open(SIDEBAR_TYPE.signUp)} />
      </FixCenteredLayout>
    </PageLayout>
  );
};

export default SignIn;
