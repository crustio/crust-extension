import { CRUST_COLOR1 } from '../../../constants/colors';
export const styles = () => ({
  tabsRoot: {
    backgroundColor: 'transparent',
  },
  tabsIndicator: {
    backgroundColor: CRUST_COLOR1,
    height: '2px',
  },
  tabRoot: {
    color: '#858B9C',
    width: '180px',
    height: '48px',
    textTransform: 'none',
    fontSize: '14px',
    fontFamily: 'Roboto-Medium',
    borderBottom: '1px solid #C5CAD5',
    '&:hover': {
      color: CRUST_COLOR1,
      opacity: 1,
    },
    '&$tabSelected': {
      color: CRUST_COLOR1,
      fontSize: '14px',
      borderBottom: '1px solid #FF8D00'
    },
    '&:focus': {
      color: CRUST_COLOR1,
    },
  },
  tabSelected: {},
});
