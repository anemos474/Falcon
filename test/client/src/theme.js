import React from 'react';
import ShoppingCart from 'react-feather/dist/icons/shopping-cart';
import ChevronDown from 'react-feather/dist/icons/chevron-down';
import ChevronUp from 'react-feather/dist/icons/chevron-up';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import User from 'react-feather/dist/icons/user';
import Close from 'react-feather/dist/icons/x';
import LogOut from 'react-feather/dist/icons/log-out';
import Remove from 'react-feather/dist/icons/x-circle';
import ChevronsRight from 'react-feather/dist/icons/chevrons-right';
import ChevronsLeft from 'react-feather/dist/icons/chevrons-left';
import Lock from 'react-feather/dist/icons/lock';
import Trash from 'react-feather/dist/icons/trash-2';
import Check from 'react-feather/dist/icons/check';
import CheckCircle from 'react-feather/dist/icons/check-circle';
import Eye from 'react-feather/dist/icons/eye';
import EyeOff from 'react-feather/dist/icons/eye-off';
import Package from 'react-feather/dist/icons/package';
import CreditCard from 'react-feather/dist/icons/credit-card';
import Edit from 'react-feather/dist/icons/edit';
import Info from 'react-feather/dist/icons/info';
import List from 'react-feather/dist/icons/list';
import Search from 'react-feather/dist/icons/search';
import { createTheme } from '@deity/falcon-ui';
import { SignInIcon, AccountIcon } from '@deity/falcon-ui-kit';
import { DeityLogo } from 'src/components/DeityLogo';

const inputStyling = {
  height: { xs: 'xxl', sm: 'xl' },
  px: { xs: 'xs', sm: 'sm' },
  py: 'xs',
  fontSize: { xs: 'md', sm: 'sm' }
};

export const deityGreenTheme = createTheme({
  colors: {
    primary: '#222222',
    primaryLight: '#95c110',
    black: '#000000',
    error: '#EB5757',
    warning: '#F2994A',
    success: '#4AAE4E',
    info: '#176FF2'
  },

  fontWeights: {
    bold: 500
  },

  outlines: {
    default: '1px solid rgba(0, 103, 244, 0.5)'
  },
  sizes: {
    none: 0,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48,
    xxxl: 64,

    auto: 'auto',
    full: '100%',

    XXS: `${100 / 8}%`, // 12.5%
    XS: `${200 / 8}%`, // 25 %
    SM: `${300 / 8}%`, // 37.5 %
    MD: `${400 / 8}%`, // 50 %
    LG: `${500 / 8}%`, // 62.5 %
    XL: `${600 / 8}%`, // 75 %
    XXL: `${700 / 8}%` // 87.5 %
  },

  icons: {
    logo: {
      icon: DeityLogo,
      stroke: 'none'
    },
    signIn: { icon: SignInIcon },
    account: { icon: AccountIcon },
    loader: {
      icon: props => (
        <svg viewBox="0 0 50 50" {...props}>
          <path
            d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
            transform="rotate(241.969 25 25)"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      ),
      size: 'xxl',
      stroke: 'transparent',
      fill: 'primaryLight'
    },
    cart: { icon: ShoppingCart },
    user: { icon: User },
    arrowRight: { icon: ChevronRight },
    dropdownArrowDown: {
      icon: ChevronDown,
      size: 'md',
      ml: 'xs'
    },
    dropdownArrowUp: {
      icon: ChevronUp,
      size: 'md',
      ml: 'xs'
    },
    buttonArrowRight: {
      icon: ChevronRight,
      size: 'md',
      ml: 'xs',
      stroke: 'white'
    },
    close: {
      icon: Close,
      css: {
        cursor: 'pointer'
      }
    },
    logOut: { icon: LogOut },
    remove: { icon: Remove },
    nextPage: {
      icon: ChevronsRight,
      stroke: 'black'
    },
    prevPage: {
      icon: ChevronsLeft,
      stroke: 'black'
    },
    lock: { icon: Lock },
    trash: { icon: Trash },
    check: { icon: Check },
    checkCircle: { icon: CheckCircle },
    eye: { icon: Eye },
    eyeOff: { icon: EyeOff },
    shipping: { icon: Package },
    payment: { icon: CreditCard },
    confirmation: { icon: Info },
    list: { icon: List },
    edit: { icon: Edit },
    search: { icon: Search }
  },
  keyframes: {
    loader: {
      '0%': {
        transform: 'rotateZ(0)'
      },
      '100%': {
        transform: 'rotateZ(360deg)'
      }
    }
  },
  components: {
    icon: {
      stroke: 'black'
    },

    gridLayout: {
      gridGap: 'md'
    },

    breadcrumb: {
      css: ({ theme }) => ({
        ':last-child': {
          pointerEvents: 'none',
          fontWeight: theme.fontWeights.bold,
          color: theme.colors.primaryLight,
          '::after': {
            display: 'none'
          }
        }
      })
    },

    navbar: {
      bgFullWidth: 'primary',
      css: {
        zIndex: 2
      }
    },

    sidebar: {
      px: 'sm',
      pt: 'sm',
      boxShadow: 'subtle',
      css: {
        boxSizing: 'border-box',
        width: {
          xs: '80vw',
          sm: 510
        }
      }
    },

    badge: {
      bg: 'primaryLight',
      color: 'black'
    },

    button: {
      px: 'xl',
      height: 'xl',
      bg: 'black',
      css: {
        transitionProperty: 'all',
        textTransform: 'capitalize'
      },

      variants: {
        loader: {
          size: 'xl',
          borderRadius: 'round',
          border: 'bold',
          borderColor: 'primary',
          p: 'none',
          css: props => ({
            animation: `${props.theme.keyframes.loader} .8s linear infinite`,
            borderRightColor: props.theme.colors.white,
            background: 'none',
            fontSize: 0,
            whiteSpace: 'nowrap',
            cursor: 'default',
            overflow: 'hidden',

            ':hover': {
              borderColor: props.theme.colors.primaryLight,
              borderRightColor: props.theme.colors.white
            }
          })
        },
        checkout: {
          fontSize: 'xs'
        },
        textLink: {
          bg: 'transparent',
          px: 'none',
          borderRadius: 'none',
          fontWeight: 'semiBold',
          css: ({ theme }) => ({
            height: 'auto',
            color: 'inherit',
            letterSpacing: 'inherit',
            lineHeight: 'inherit',
            background: 'none',
            textDecoration: 'underline',
            '&[href]:hover, :hover:enabled': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            },
            '&[href]:active:enabled, :active:enabled': {
              backgroundColor: 'transparent'
            },
            '&[href]:focus, :focus': {
              backgroundColor: 'transparent',
              outline: theme.outlines.default
            },
            ':disabled': {
              color: theme.colors.secondaryText,
              cursor: 'not-allowed'
            }
          })
        },
        transparent: {
          bg: 'transparent',
          color: 'primaryText',
          css: ({ theme }) => ({
            '&[href]:hover, :hover:enabled': {
              backgroundColor: theme.colors.secondary
            },
            '&[href]:active:enabled, :active:enabled': {
              backgroundColor: theme.colors.secondaryDarker
            },
            '&[href]:focus, :focus': {
              backgroundColor: theme.colors.secondaryDarker
            },
            ':disabled': {
              color: theme.colors.secondaryDarker,
              cursor: 'not-allowed'
            }
          })
        }
      }
    },

    input: {
      ...inputStyling
    },
    select: {
      ...inputStyling
    },
    label: {
      fontSize: { xs: 'sm', sm: 'xs' },
      fontWeight: 'bold'
    },
    footer: {
      mt: 'md'
    }
  }
});

export const globalCss = {
  body: {
    margin: 0
  },
  html: {
    overflowY: 'scroll'
  }
};
