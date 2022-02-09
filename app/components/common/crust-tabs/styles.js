import { CRUST_COLOR1 } from '../../../constants/colors';

export const styles = () => ({
  tabsRootHome: {
    paddingLeft: '18px',
    paddingRight: '18px',
  },
  tabsRootAccountMainnet: {
    marginLeft: '18px',
    marginRight: '18px',
    padding: '5px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.05)',
  },
  tabsRootAccountMaxwell: {
    marginLeft: '18px',
    marginRight: '18px',
    padding: '5px',
    background: 'rgba(0, 0, 0, 0.06)',
    borderRadius: '12px',
  },
  tabsIndicator: {
    backgroundColor: CRUST_COLOR1,
    height: '2px',
  },
  tabRootHomeMainnet: {
    color: '#CCCCCC',
    width: '105px',
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
  tabRootHomeMaxwell: {
    color: '#4F4D59',
    width: '105px',
    height: '48px',
    textTransform: 'none',
    fontSize: '20px',
    fontFamily: 'Roboto-Medium',
    '&:hover': {
      color: '#FFFFFF',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#FFFFFF',
      outline: 'none',
      fontSize: '20px',
    },
    '&:focus': {
      color: '#FFFFFF',
    },
  },
  tabRootAccountMainnet: {
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
  tabRootAccountMaxwell: {
    color: '#999999',
    width: '155px',
    height: '48px',
    textTransform: 'none',
    fontSize: '14px',
    fontFamily: 'Roboto-Medium',
    '&:hover': {
      color: '#FFFFFF',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#FFFFFF',
      outline: 'none',
      fontSize: '14px',
      background: '#4F4D59',
      borderRadius: '12px',
    },
    '&:focus': {
      color: '#FFFFFF',
    },
  },
  tabSelected: {},
});
