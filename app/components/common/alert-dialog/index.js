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
    height: '211px',
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
  },
}))(MuiDialogContent);

const Button = withStyles(() => ({
  root: {
    textTransform: 'none',
    width: '128px !important',
  },
}))(MuiButton);

const DialogContentText = withStyles(() => ({
  root: {
    wordBreak: 'break-all',
    fontSize: '12px',
    'line-height': 3,
  },
}))(MuiDialogContentText);

const DialogActions = withStyles(() => ({
  root: {
    display: 'grid',
    'grid-template-columns': '1fr 1fr',
    'margin-left': '8px',
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
          <DialogContentText align="center">{msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="button-primary">
            <Button onClick={handleClose} color="primary" variant="contained" autoFocus>
              {noText}
            </Button>
          </div>
          <div className="button-secondary">
            <Button onClick={handleYes} color="primary">
              {yesText}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
