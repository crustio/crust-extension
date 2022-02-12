import { CRUST_COLOR1 } from '../../../constants/colors';

export const styles = () => ({
  seedPhraseCopy: {
    '&:hover': { color: CRUST_COLOR1 },
    '&:active': {
      opacity: 1,
    },
    fontFamily: 'Roboto-Regular',
    fontSize: '12px',
    marginLeft: '18px',
    cursor: 'pointer',
    height: '16px',
    width: '74px',
    color: CRUST_COLOR1,
    marginTop: '5px',
  },
});
