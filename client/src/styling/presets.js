export const themePresets = [
  {
    name: 'Deity Green',
    theme: {
      colors: {
        primary: '#fff',
        primaryLight: '#fff',
        primaryDark: '#fff',
        primaryText: '#fff'
      },
      components: {
        navbar: {
          bgFullWidth: 'primary'
        },

        navbarItem: {
          color: 'primaryText'
        }
      }
    }
  },

  {
    name: 'Ocean Blue',
    theme: {
      colors: {
        primary: '#fff',
        primaryLight: '#fff',
        primaryDark: '#fff',
        primaryText: '#ffffff',

        secondary: '#fff',
        secondaryLight: '#fff',
        secondaryDark: '#fff',
        secondaryText: '#fff',

        error: '#fff',
        errorText: '#000000'
      },
      spacing: {
        none: 0,
        xs: 12,
        sm: 20,
        md: 28,
        lg: 36,
        xl: 44,
        xxl: 52,
        xxxl: 70
      },
      fonts: {
        sans: 'Bubblegum Sans'
      },
      fontSizes: {
        xs: 13,
        sm: 18,
        md: 22,
        lg: 28,
        xl: 45,
        xxl: 56,
        xxxl: 120
      },
      borderRadius: {
        medium: 333
      },

      components: {
        headerBarLayout: {
          gridTemplate: '"logo cart signIn login" / 1fr auto auto auto',
          alignItems: 'center',
          css: {
            justifyItems: 'center'
          }
        },
        productListLayout: {
          gridTemplateColumns: 'repeat(auto-fill,minmax(420px,1fr))',
          gridAutoRows: '340px',
          gridGap: 'md'
        },

        navbar: {
          bgFullWidth: 'transparent',
          bg: 'primary',
          borderRadius: 'round',
          mt: 'xs',
          justifyContent: 'center'
        },

        navbarItem: {
          color: 'primaryText'
        },

        productDetailsLayout: {
          p: 'sm',
          gridTemplateColumns: {
            md: '1fr 1fr'
          },
          gridTemplateAreas: {
            md:
              '"sku gallery" "title gallery" "price gallery" "options gallery" "cta gallery" "description gallery" "meta gallery"'
          }
        }
      }
    }
  },
  {
    name: 'Insanely Pink',
    theme: {
      colors: {
        primary: '#fff',
        primaryLight: '#fff',
        primaryDark: '#fff',
        primaryText: '#fff',

        errorText: '#fff',
        black: '#fff'
      },

      fonts: {
        sans: 'Bangers'
      },

      components: {
        headerBarLayout: {
          gridTemplate: '"cart logo signIn login" / auto 1fr auto auto',
          alignItems: 'center',
          my: 'sm',
          css: {
            justifyItems: 'center'
          }
        },

        icon: {
          stroke: 'secondaryDark'
        },

        productListLayout: {
          css: {
            '& img': {
              transform: 'skew(15deg)'
            }
          }
        },
        navbar: {
          bgFullWidth: 'transparent',
          borderColor: 'primary',
          justifyContent: 'center',

          css: {
            transform: 'skew(15deg)',
            borderBottomStyle: 'solid',
            borderBottomWidth: 2
          }
        },
        navbarItem: {
          fontSize: 'xl',
          css: props => ({
            color: props.theme.colors.black
          })
        }
      }
    }
  }
];
