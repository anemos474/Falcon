import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { CustomerQuery } from '@deity/falcon-shop-data';
import { H1, H2, H3, Text, Button, FlexLayout, GridLayout } from '@deity/falcon-ui';
import { PageLayout } from '@deity/falcon-ui-kit';
import { useSidebarContainer } from '@deity/falcon-front-kit';
import { useI18n, T } from '@deity/falcon-i18n';
import { Container, SIDEBAR_TYPE } from 'src/components';

const CheckoutChooseAccount = () => {
  const { t } = useI18n();
  const sidebar = useSidebarContainer();

  return (
    <PageLayout variant="gray">
      <CustomerQuery>
        {({ data: { customer } }) => {
          if (customer) {
            return <Redirect to="/checkout" />;
          }

          return (
            <FlexLayout flexDirection="column" flexWrap="nowrap" css={{ textAlign: 'center' }}>
              <H1>{t('checkoutSignIn.title')}</H1>
              <Text py="sm">{t('checkoutSignIn.description')}</Text>

              <GridLayout
                gridGap="lg"
                gridTemplateColumns={{ xs: 'unset', lg: 'repeat(auto-fit, minmax(100px, 1fr))' }}
                css={{ justifyItems: 'center' }}
              >
                <Container css={{ maxWidth: 600 }} justifyContent="space-between">
                  <FlexLayout justifyContent="center">
                    <H3 as={H2}>{t('checkoutSignIn.newCustomer')}</H3>
                    <Text py="sm">{t('checkoutSignIn.newCustomerMessage')}</Text>
                  </FlexLayout>
                  <Button variant="accent" mt="lg" onClick={() => sidebar.open(SIDEBAR_TYPE.signUp)}>
                    {t('checkoutSignIn.newCustomerButton')}
                  </Button>
                </Container>
                <Container css={{ maxWidth: 600 }} justifyContent="space-between">
                  <FlexLayout justifyContent="center">
                    <H3 as={H2}>{t('checkoutSignIn.haveAccount')}</H3>
                    <Text py="sm">
                      <T id="checkoutSignIn.haveAccountMessage" />
                      <span> </span>
                      <T id="signIn.forgotPasswordP1" />
                      <Button
                        type="button"
                        variant="textLink"
                        onClick={() => sidebar.open(SIDEBAR_TYPE.forgotPassword)}
                        color="accent"
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
                    </Text>
                  </FlexLayout>

                  <Button onClick={() => sidebar.open(SIDEBAR_TYPE.account, { next: '/checkout' })} mt="lg">
                    {t('checkoutSignIn.haveAccountButton')}
                  </Button>
                </Container>
                <Container css={{ maxWidth: 600 }} justifyContent="space-between">
                  <FlexLayout justifyContent="center">
                    <H3 as={H2}>{t('checkoutSignIn.guest')}</H3>
                    <Text py="sm">{t('checkoutSignIn.guestMessage')}</Text>
                  </FlexLayout>
                  <Button
                    as={RouterLink}
                    to={{ pathname: '/checkout', search: `?${new URLSearchParams({ 'as-guest': true })}` }}
                    variant="secondary"
                    mt="lg"
                  >
                    {t('checkoutSignIn.guestButton')}
                  </Button>
                </Container>
              </GridLayout>
            </FlexLayout>
          );
        }}
      </CustomerQuery>
    </PageLayout>
  );
};

export default CheckoutChooseAccount;
