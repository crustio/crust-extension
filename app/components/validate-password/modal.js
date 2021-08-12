import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  OutlinedInput,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { keccak512 } from 'js-sha3';
import { connect } from 'react-redux';
import { promiseTimeout } from '../../utils/helper';
import * as APITypes from '../../api';
import { closeAppValidatePass } from '../../containers/actions';

const MDialogTitle = withStyles({
  root: {
    fontSize: 16,
    fontWeight: 500,
    color: '#111A34',
    textAlign: 'center',
    padding: '16px',
  },
})(DialogTitle);

function ValidatePasswordModal(p) {
  const { showValidatePass = {}, handleClose } = p;
  const { onSuccess, show = false } = showValidatePass;
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [password, setPassword] = useState('');
  const handleCancel = () => {
    setPassword('');
    setErrorText('');
    setError(false);
    handleClose();
  };
  const handleOk = async () => {
    try {
      setError(false);
      setErrorText('');
      const ret = await promiseTimeout(
        60000,
        APITypes.OnBoarding.setHashKey(keccak512(password)),
        false,
      );
      if (ret.result === false) {
        throw new Error('Time out.');
      }
      if (onSuccess) onSuccess();
      handleCancel();
    } catch (e) {
      setError(true);
      setErrorText(e.message || 'Password is incorrect');
    }
  };

  const { t } = useTranslation();
  return (
    <Dialog open={show}>
      <MDialogTitle>{t('Validate password')}</MDialogTitle>
      <DialogContent>
        <OutlinedInput
          label="Password"
          value={password}
          error={isError}
          helperText={errorText}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  showValidatePass: state.appStateReducer.showValidatePass,
});

const mapDispatchToProps = {
  handleClose: closeAppValidatePass,
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePasswordModal);
