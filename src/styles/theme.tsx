import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

function pxToRem(value) {
  return `${value / 16}rem`;
}

const breakpoints = createBreakpoints({});
const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: ['"Open Snas"', 'sans-serif'].join(','),
      subtitle1: {
        lineHeight: '24px',
      },
    },
    palette: {
      background: {
        default: '#0000',
      },
      primary: {
        light: '#546088',
        main: '#28365b',
        dark: '#001031',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffa441',
        main: '#EE7402',
        dark: '#e94e1b',
        contrastText: '#000000',
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          // '@font-face': ["Open Snas"],
          body: {
            backgroundColor: '#DADADA',
          },
        },
      },
      // MuiListItem: {
      //   root: {
      //     '&$selected': {
      //       backgroundColor: '#28365b',
      //       color: '#fff',
      //     },
      //   },
      // },
      MuiChip: {
        labelSmall: {
          display: 'table',
          whiteSpace: 'normal',
        },
        outlinedPrimary: {
          '&:hover': {
            backgroundColor: '#005EB8',
          },
        },
        clickable: {
          '&:hover': {
            backgroundColor: '#005EB8',
          },
        },
        clickableColorPrimary: {
          '&:hover, &:focus': {
            backgroundColor: '#005EB8',
          },
          '&:active': {
            backgroundColor: '#005EB8',
          },
        },
      },
      MuiPaper: { outlined: { border: '1px solid rgba(0, 0, 0, 0.87)' } },
      MuiButton: {
        label: {
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(16),
          },
        },
      },
      MuiTypography: {
        body2: {},
        h6: {
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(24),
          },
        },
        h5: {
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(26),
          },
        },
        subtitle2: {
          fontSize: pxToRem(16),
        },
        caption: {
          fontSize: pxToRem(10),
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(14),
          },
        },
      },
    },
  }),
);

export default theme;
