import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  title: string;
  content?: string | JSX.Element;
  width?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

const Modal = (props: SimpleDialogProps) => {
  const { onClose, title, onConfirm, open, content } = props;

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      handleClose();
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ width: props.width || "auto" }}>
        {content && (
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          {onConfirm ? "Cancelar" : "Fechar"}
        </Button>
        {onConfirm && (
          <Button onClick={handleConfirm} variant="outlined">
            Confirmar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
