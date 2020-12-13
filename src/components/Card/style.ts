import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  card: () => ({
    width: '100%',
    height: '128px',
    marginBottom: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: '#ffff',
    border: '1px solid #666666',
    boxShadow: '10px 11px 7px -7px rgba(102,102,102,0.45);',
    color: '#4D4D4D',
    [theme.breakpoints.down(600)]: {
      height: 216,
    },
  }),
  header: () => ({
    backgroundColor: '#ffff',
    paddingBottom: '0px',
  }),
  subheader: () => ({ color: '#4D4D4D' }),
  roundedCorners: () => ({
    borderRadius: '5px',
  }),
  rootContent: {
    paddingBottom: 0,
    paddingTop: 0,
    color: '#4D4D4D',
  },
  headerRoot: {
    paddingRight: '16px',
    paddingBottom: 0,
  },
}));

export const useStylesLastResponse = makeStyles(() => ({
  container: {
    width: 'inherit',
  },
}));
