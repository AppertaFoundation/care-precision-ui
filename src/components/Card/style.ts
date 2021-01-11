import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  card: () => ({
    width: '100%',
    marginBottom: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: '#ffff',
    border: 'none',
    boxShadow: 'none',
    color: '#4D4D4D',
    padding: '15px',
  }),
  header: () => ({
    backgroundColor: '#ffff',
    paddingBottom: '0px',
  }),
  roundedCorners: () => ({
    borderRadius: '35px',
    zIndex: 1000,
  }),
  rootContent: {
    paddingBottom: '10px',
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
