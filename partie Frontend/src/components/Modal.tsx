import { FunctionComponent } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'min(90%, 800px)',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.default',
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FunctionComponent<Props> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <div>
      <MuiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </MuiModal>
    </div>
  );
};
