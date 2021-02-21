import { CRUST_COLOR1 } from '../../../constants/colors';
export const styles = () => ({
  tabsRoot: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderBottom: '1px solid #999'
  },
  tabsIndicator: {
    backgroundColor: CRUST_COLOR1,
    height: '2px',
  },
  tabRoot: {
    color: CRUST_COLOR1,
    width: '180px',
    height: '48px',
    textTransform: 'capitalise',
    fontSize: '14px',
    fontFamily: 'Roboto-Medium',
    '&:hover': {
      color: CRUST_COLOR1,
      opacity: 1,
    },
    '&$tabSelected': {
      color: CRUST_COLOR1,
      fontSize: '14px',
    },
    '&:focus': {
      color: CRUST_COLOR1,
    },
  },
  tabSelected: {},
});
