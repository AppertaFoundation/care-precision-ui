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
        color: '#4D4D4D',
        lineHeight: '24px',
      },
    },
    palette: {
      background: {
        default: '#0000',
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': ['Open Snas'],
          body: {
            backgroundColor: '#ffff',
          },
        },
      },
      MuiListItem: {
        root: {
          '&$selected': {
            backgroundColor: '#3F51B5',
            color: '#fff',
          },
        },
      },
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
      MuiInputBase: {
        root: { backgroundColor: '#fff' },
        input: { color: '#4D4D4D' },
      },
      MuiOutlinedInput: { root: { backgroundColor: '#fff' } },
      MuiButton: {
        label: {
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(16),
          },
        },
      },
      MuiTypography: {
        body2: {
          // fontSize: pxToRem(24),
          // [breakpoints.up('sm')]: {
          //   fontSize: pxToRem(20),
          // },
        },
        h6: {
          // fontSize: pxToRem(24),
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(24),
          },
        },
        h5: {
          // fontSize: pxToRem(24),
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(26),
          },
        },
        subtitle2: {
          fontSize: pxToRem(16),
          // [breakpoints.up('sm')]: {
          //   fontSize: pxToRem(26),
          // },
        },
        caption: {
          fontSize: pxToRem(10),
          [breakpoints.up('sm')]: {
            color: 'grey',
            fontSize: pxToRem(14),
          },
        },
      },
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000',
    },
  }),
);

// const login = {
//   ...main,
//   ...createMuiTheme({
//     palette: {
//       background: {
//         default: '#9FC9D9',
//       },
//     },
//     overrides: {
//       MuiInputBase: { root: { backgroundColor: '#fff' } },
//       MuiOutlinedInput: { root: { borderRadius: 8, backgroundColor: '#fff' } },
//       MuiCssBaseline: {
//         '@global': {
//           body: {
//             backgroundColor: '#9FC9D9',
//           },
//         },
//       },
//     },
//   }),
// };

export default theme;
