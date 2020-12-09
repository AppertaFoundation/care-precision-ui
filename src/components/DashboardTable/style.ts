import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 5px',
    padding: '5px',
    color: 'rgb(77, 77, 77)',
  },
  row: {
    outlineColor: 'black',
    outlineStyle: 'solid',
    outlineWidth: '1px',
    boxShadow: '0 4px 2px -2px gray',
  },
  cell: { width: '', borderBottom: 'none' },
  subheader: () => ({ color: '#4D4D4D' }),
});
