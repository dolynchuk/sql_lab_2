import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class GroupEditDialog extends Component {
  render(){
    const {
      open,
      onClose,
      group,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          Спільнота {group}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}