import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';

const Accordion = withStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {},
    marginBottom: theme.spacing(4),
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#515F9C',
    color: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    border: '1px solid #fff',
    marginBottom: -1,
    minHeight: 20,
    '&$expanded': {
      minHeight: 20,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

export { Accordion, AccordionDetails, AccordionSummary };
