export const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '320px',
  },
  underline: {
    borderBottom: 'none !important',
    '&:after': {
      borderBottom: 'none !important',
    },
    '&:before': {
      borderBottom: 'none !important',
    },
  },
  inputRoot: {
    background: '#F0F1F5',
    borderRadius: '12px',
    paddingTop: '18px',
    paddingLeft: '18px',
    paddingRight: '18px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: '16px',
    width: '328px',
  },
  input: {
    '&::placeholder': {
      opacity: '0.6',
      fontSize: '14px',
      fontFamily: 'Roboto-Regular',
    },
  },
  inputError: {},
  helperText: {
    '&$helperTextError': {
      color: '#FA5050',
      fontFamily: 'Roboto-Regular',
      fontSize: '11px',
    },
  },
  helperTextError: {},
});
