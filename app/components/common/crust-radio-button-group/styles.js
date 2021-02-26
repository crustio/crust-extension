import { CRUST_COLOR1 } from '../../../constants/colors';

export const styles = () => ({
  root: {
    marginRight: 0,
    marginLeft: 0
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    fontWeight: 'bolder',
    color: '#111A34'
  },
  colorSecondary: {
    color: 'none',
    padding: '0px 3px 0px 0px',
    '&$checked': {
      color: CRUST_COLOR1,
      padding: '0px 3px 0px 0px',
    },
  },
  checked: {},
  radioGroupRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
  radioRoot: {
    marginRight: 0,
    marginLeft: 0,
  },

  radioGroupRootVertical: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },

  rootVertical: {
    marginRight: 0,
    marginLeft: 0,
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: '10px'
  },

  labelVertical: {
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    position: 'absolute',
    left: '36px',
    color: '#111A34',
  },
});
