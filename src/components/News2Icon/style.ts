export const useStyles = (
  backgroundColor: string,
  color: string,
  double: boolean,
) => ({
  root: {
    width: '100%',
  },
  outside: {
    display: 'inline-block',
    lineHeight: '0px',
    borderRadius: '50%',
    backgroundColor,
    fontSize: '16px',
  },
  inside: {
    width: double ? 24 : 15,
    display: 'inline-block',
    paddingTop: '56%',
    paddingBottom: '44%',
    color,
    fontWeight: 900,
    marginLeft: double ? '2px' : '6px',
    marginRight: double ? '1px' : '6px',
  },
});
