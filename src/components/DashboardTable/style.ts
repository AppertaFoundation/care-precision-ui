import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    border: '2px solid #DADADA',
    backgroundColor: '#fff',
    padding: '25px 10px 25px 10px',
    borderRadius: '35px',
  },
  table: {
    width: '100%',
  },
  row: {
    outlineColor: 'black',
    outlineStyle: 'solid',
    outlineWidth: '1px',
    boxShadow: '0 4px 2px -2px gray',
  },
  cell: { borderBottom: 'none' },
  xsCell: { width: '25%', height: 52 },
  xsCellButton: { height: 52 },
});
