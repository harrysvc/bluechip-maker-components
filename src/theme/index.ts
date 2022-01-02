import { createTheme } from '@mui/material/styles';

/*
 * Rules:
 *  Color HEX:
 *   - Correct: #ffffff
 *   - Incorrect: #FFF, #ffffff, #FFFfff
 */

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1368,
    },
  },
  palette: {
    primary: {
      main: '#CD0D0E',
    },
    secondary: {
      main: '#272727',
    },

    grey: {
      50: '#e0e0e0',
      100: '#d9d9d9',
      200: '#c4c4c4',
      300: '#b3b3b3',
      400: '#acacac',
      500: '#999999',
      600: '#808080',
      700: '#666666',
      800: '#595959',
      900: '#28282b',
      A100: '#fafafa',
      A200: '#f1f1f1',
      A400: '#555555',
      A700: '#dddddd',
    },
    error: {
      main: '#ff4a00',
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#ffffff',
          background: '#000000',
          '&:hover': {
            borderColor: 'transparent',
          },
          '& ~ .MuiSvgIcon-root': {
            color: '#CD0D0E',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: '#000000',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover, &.Mui-selected:hover': {
            background: '#272727',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              border: 0,
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiFormHelperText-root': {
            marginTop: '8px',
            marginLeft: 0,
            marginRight: 0,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        contained: {
          '&.Mui-disabled': {
            color: '#ffffff',
          },
        },
        containedPrimary: {
          background: '#CD0D0E',
          color: '#ffffff',
          '&:hover': {
            color: '#CD0D0E',
            background: '#ffffff',
          },
        },
        containedSecondary: {
          background: '#000000',
          color: '#ffffff',
          '&:hover': {
            color: '#000000',
            background: '#ffffff',
          },
        },
        containedInherit: {
          '&:hover': {
            color: '#CD0D0E',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`,
    allVariants: { color: '#ffffff' },
    h1: {
      fontSize: '27px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '25px',
      fontWeight: 700,
      lineHeight: '30px',
    },
    h3: {
      fontSize: '22px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '22px',
    },
    h5: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '22px',
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '16px',
    },
    subtitle2: {
      fontSize: '14px',
      lineHeight: '17px',
    },
    body1: {
      fontSize: '15px',
      lineHeight: '18px',
    },
    body2: {
      fontSize: '13px',
      lineHeight: '16px',
    },
    caption: {
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
});

export type CustomizedTheme = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomizedTheme {}
}
