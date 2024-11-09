import { createTheme, ThemeOptions } from '@mui/material'

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: '6rem',
      lineHeight: 1.167,
      fontWeight: 300
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 300,
      lineHeight: 1.2
    },
    h3: {
      fontSize: '32px',
      fontWeight: 400,
      lineHeight: '36px'
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '32px'
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.334
    },
    h6: {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '24px'
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px'
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px'
    },
    body1: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px'
    },
    body2: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px'
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px'
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 2.66
    }
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 400,
          color: '#353A46'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingLeft: '12px',
          paddingRight: '12px',
          paddingTop: '2px',
          paddingBottom: '2px',
          minHeight: '20px',
          height: 'fit-content'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          boxShadow: '0px 0px 2px 0px rgba(53, 58, 70, 0.16), 0px 2px 4px 0px rgba(53, 58, 70, 0.12)',
          variants: [
            {
              props: { variant: 'outlined' },
              style: {
                border: 'none',
                color: '#4F5668',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                  outline: 'none',
                  border: 'none',
                  color: '#4F5650'
                }
              }
            }
          ]
        }
      }
    }
  }
}

export const theme = createTheme(themeOptions)
