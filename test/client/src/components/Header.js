import React from 'react';
import { gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { MenuQuery, CustomerQuery, CartQuery, SignOutMutation } from '@deity/falcon-shop-data';
import { T } from '@deity/falcon-i18n';
import { Link, ListItem, Icon } from '@deity/falcon-ui';
import { RouterLink, MenuNavbar, HeaderBanner, CartIcon, HeaderBarLayout, HeaderBarArea } from '@deity/falcon-ui-kit';
import { useSidebarContainer } from '@deity/falcon-front-kit';
import { SIDEBAR_TYPE } from 'src/components';

export const GET_CART = gql`
  query Cart {
    cart {
      itemsQty
    }
  }
`;

export const Header = () => {
  const history = useHistory();
  const sidebar = useSidebarContainer();

  return (
    <CustomerQuery>
      {({ data: { customer } }) => (
        <header>
          <HeaderBanner>
            {customer && (
              <ListItem>
                <SignOutMutation>
                  {signOut => (
                    <Link onClick={() => signOut().then(() => history.push('/'))}>
                      <T id="signOut.link" />
                    </Link>
                  )}
                </SignOutMutation>
              </ListItem>
            )}
            <ListItem>
              <RouterLink to="#">
                <T id="banner.contactLink" />
              </RouterLink>
            </ListItem>
            <ListItem>
              <RouterLink to="/blog">
                <T id="banner.blogLink" />
              </RouterLink>
            </ListItem>
          </HeaderBanner>

          <HeaderBarLayout>
            <RouterLink gridArea={HeaderBarArea.logo} to="/" aria-label="DEITY">
              <Icon src="logo" size="xxl" />
            </RouterLink>
            {customer ? (
              <RouterLink gridArea={HeaderBarArea.signIn} to="/account">
                <Icon src="account" />
              </RouterLink>
            ) : (
              <Link gridArea={HeaderBarArea.signIn} onClick={() => sidebar.open(SIDEBAR_TYPE.account)}>
                <Icon src="signIn" />
              </Link>
            )}
            <Link gridArea={HeaderBarArea.cart} onClick={() => sidebar.open(SIDEBAR_TYPE.cart)}>
              <CartQuery passLoading query={GET_CART}>
                {({ data: { cart } }) => <CartIcon itemsQty={cart && cart.itemsQty} />}
              </CartQuery>
            </Link>
          </HeaderBarLayout>

          <nav>
            <MenuQuery>{({ data: { menu } }) => <MenuNavbar items={menu} />}</MenuQuery>
          </nav>
        </header>
      )}
    </CustomerQuery>
  );
};
