import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

const styles = () => createStyles({
  titleRoot: {
    margin: 0,
  },
});

const Dialog = withStyles(() => ({
  paper: {
    margin: 0,
    width: '296px',
    height: '180px',
    borderRadius: '12px',
  },
}))(MuiDialog);

const DialogTitle = withStyles(styles)(props => {
  const {
    children, classes, onClose, ...other
  } = props;
  if (children) {
    return (
      <MuiDialogTitle disableTypography className={classes.titleRoot} {...other}>
        <Typography variant="h6">{children}</Typography>
      </MuiDialogTitle>
    );
  }
  return '';
});

const DialogContent = withStyles(() => ({
  root: {
    padding: '0px 10px 25px 10px',
    'overflow-y': 'hidden',
  },
}))(MuiDialogContent);

const BackButton = withStyles(() => ({
  root: {
    textTransform: 'none',
    width: '128px !important',
    color: 'white !important',
    background: '#2C2B32 !important',
    borderRadius: '12px',
  },
}))(MuiButton);

const NextButton = withStyles(() => ({
  root: {
    textTransform: 'none',
    width: '128px !important',
    color: 'white !important',
    background: '#FF8D00 !important',
    borderRadius: '12px',
  },
}))(MuiButton);

const DialogContentText = withStyles(() => ({
  root: {
    wordBreak: 'break-all',
    fontSize: '12px',
    'line-height': 2,
  },
}))(MuiDialogContentText);

const DialogActions = withStyles(() => ({
  root: {
    display: 'grid',
    'grid-template-columns': '1fr 1fr',
    'margin-left': '8px',
    'margin-bottom': '17px',
  },
}))(MuiDialogActions);

export default function AlertDailog({
  isOpen,
  handleClose,
  title,
  msg,
  handleYes,
  yesText,
  noText,
  importVaultFileName,
}) {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText align="center">{importVaultFileName}</DialogContentText>
          <DialogContentText align="center" className="dialog-msg">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="button-primary">
            <BackButton onClick={handleClose} autoFocus>
              {noText}
            </BackButton>
          </div>
          <div className="button-secondary">
            <NextButton onClick={handleYes}>{yesText}</NextButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
