import React from 'react';
import { FlexLayout, Button, Text } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { SignInFormProvider } from '@deity/falcon-front-kit';
import { FormField, Form, PasswordRevealInput, FormSubmit, ErrorSummary } from '@deity/falcon-ui-kit';

export const SignInForm = ({ onSuccess, onForgotPassword, onCreateNewAccount, mutationOptions, ...formProps }) => (
  <SignInFormProvider onSuccess={onSuccess} mutationOptions={mutationOptions}>
    {({ status }) => (
      <Form i18nId="signIn" {...formProps}>
        <Text my="sm">
          <T id="signIn.doNotHaveAnAccountP1" />
          <Button
            type="button"
            variant="textLink"
            onClick={() => onCreateNewAccount()}
            color="accent"
            css={({ theme }) => ({
              textDecoration: 'underline',
              ':hover': {
                color: theme.colors.accentDark
              }
            })}
          >
            <T id="signIn.doNotHAveAnAccountLink" />
          </Button>
          <T id="signIn.doNotHaveAnAccountP2" />
        </Text>
        <FormField name="email" type="email" required autoComplete="email" />
        <FormField
          name="password"
          type="password"
          // pass empty array, so default password strength validator does not get triggered
          validate={[]}
          required
          autoComplete="current-password"
          help={
            <>
              <T id="signIn.forgotPasswordP1" />
              <Button
                type="button"
                variant="textLink"
                onClick={() => onForgotPassword()}
                color="accent"
                fontSize="xs"
                css={({ theme }) => ({
                  textDecoration: 'underline',
                  ':hover': {
                    color: theme.colors.accentDark
                  }
                })}
              >
                <T id="signIn.forgotPasswordLink" />
              </Button>
              <T id="signIn.forgotPasswordP2" />
            </>
          }
        >
          {({ field }) => <PasswordRevealInput {...field} />}
        </FormField>
        <FlexLayout justifyContent="space-between" alignItems="center" mt="md">
          <FormSubmit />
        </FlexLayout>

        <ErrorSummary errors={status.error} />
      </Form>
    )}
  </SignInFormProvider>
);
