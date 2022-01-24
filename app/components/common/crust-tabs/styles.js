import { CRUST_COLOR1 } from '../../../constants/colors';

export const styles = () => ({
  tabsRoot: {
    backgroundColor: 'transparent',
    paddingLeft: '18px',
    paddingRight: '18px',
  },
  tabsIndicator: {
    backgroundColor: CRUST_COLOR1,
    height: '2px',
  },
  tabRoot: {
    color: '#CCCCCC',
    width: '100px',
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
    },
    '&:focus': {
      color: 'rgba(25, 25, 25, 1)',
    },
  },
  tabSelected: {},
});
