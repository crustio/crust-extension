import { CRUST_COLOR1 } from '../../../constants/colors';

export const styles = () => ({
  tabsRootHome: {
    paddingLeft: '18px',
    paddingRight: '18px',
  },
  tabsRootAccount: {
    marginLeft: '18px',
    marginRight: '18px',
    padding: '5px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.05)',
  },
  tabsIndicator: {
    backgroundColor: CRUST_COLOR1,
    height: '2px',
  },
  tabRootHome: {
    color: '#CCCCCC',
    width: '100px',
    height: '48px',
    textTransform: 'none',
    fontSize: '20px',
    fontFamily: 'Roboto-Medium',
    '&:hover': {
      color: 'rgba(25, 25, 25, 1)',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'rgba(25, 25, 25, 1)',
      outline: 'none',
      fontSize: '20px',
    },
    '&:focus': {
      color: 'rgba(25, 25, 25, 1)',
    },
  },
  tabRootAccount: {
    color: '#CCCCCC',
    width: '155px',
    height: '48px',
    textTransform: 'none',
    fontSize: '14px',
    fontFamily: 'Roboto-Medium',
    '&:hover': {
      color: 'rgba(25, 25, 25, 1)',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'rgba(25, 25, 25, 1)',
      outline: 'none',
      fontSize: '14px',
      background: '#EEEEEE',
      borderRadius: '12px',
    },
    '&:focus': {
      color: 'rgba(25, 25, 25, 1)',
    },
  },
  tabSelected: {},
});
