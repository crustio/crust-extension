import React from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonCustom from '../buttons/button-custom';
import { styles } from './styles';
import { CRUST_MAXWELL_NETWORK, CRUST_NETWORK } from '../../../../lib/constants/networks';

function ModalWithThreeButton(props) {
  const {
    show,
    colortheme,
    handleCancel,
    topButton,
    bottomButton,
    cancelButton,
    handleTopClick,
    handleBottomClick,
    network,
    oneAction,
    sameStyleButton,
    classes,
  } = props;

  const { t } = useTranslation();
  return (
    <Dialog
      open={show}
      fullWidth
      classes={{
        paper:
          network.value === CRUST_MAXWELL_NETWORK.value
            ? classes.paperRootMaxwell
            : network.value === CRUST_NETWORK.value
              ? classes.paperRootMainnet
              : null,
      }}
    >
      <DialogContent classes={{ root: classes.contentRoot }}>
        <div style={{ marginBottom: 10 }}>
          <ButtonCustom
            textColor={
              sameStyleButton ? colortheme.button.secondary.text : colortheme.button.primary.text
            }
            background={
              sameStyleButton ? colortheme.button.secondary.main : colortheme.button.primary.main
            }
            onClick={handleTopClick}
          >
            {t(topButton)}
          </ButtonCustom>
        </div>
        {!oneAction && (
          <div>
            <ButtonCustom
              textColor={colortheme.button.secondary.text}
              background={colortheme.button.secondary.main}
              onClick={handleBottomClick}
            >
              {t(bottomButton)}
            </ButtonCustom>
          </div>
        )}
      </DialogContent>
      <DialogActions
        classes={{
          root:
            network.value === CRUST_MAXWELL_NETWORK.value
              ? classes.rootMaxwell
              : network.value === CRUST_NETWORK.value
                ? classes.rootMainnet
                : null,
        }}
      >
        <ButtonCustom
          onClick={handleCancel}
          textColor={colortheme.text.primary}
          background="transparent"
        >
          {cancelButton ? t(cancelButton) : t('Cancel')}
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(ModalWithThreeButton);
