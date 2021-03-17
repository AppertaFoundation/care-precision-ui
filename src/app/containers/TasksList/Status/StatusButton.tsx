import { styled, withStyles } from '@material-ui/core/styles';
import MuiIconButton from '@material-ui/core/IconButton';

const Label = styled('p')({
  fontSize: '12px',
  marginTop: 0,
  marginBottom: 0,
});

const StatusButton = withStyles(() => ({
  label: {
    flexDirection: 'column',
  },
}))(MuiIconButton);

export { Label, StatusButton };
