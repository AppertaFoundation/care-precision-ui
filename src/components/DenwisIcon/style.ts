export const useStyles = color => ({
  root: {
    width: '23px',
    height: '23px',
    border: `2px solid ${color}`,
    color: color,
    margin: '2px',
  },
  inside: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 700,
    margin: '1px',
  },
});
