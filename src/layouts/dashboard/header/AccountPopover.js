import { useState } from 'react';
import { Button } from 'primereact/button'
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { logout } from '../../../Redux/actions/userActions';

import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [valueshow, setValueShow] = useState(false)
  const dispatch = useDispatch()


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleShowClose = () => {
    setValueShow(!valueshow)
  }

  const handleCloseConfirm = () => {
    setValueShow(!valueshow)
    dispatch(logout())
  }


    const renderFooterDeconnexion = () => {
      return(
        <div style={{marginTop:-20}}>
          <Button label="Non" className="p-button-rounded p-button-info p-button-text" icon="pi pi-times" aria-label="Non" onClick={() => handleShowClose()} />
          <Button label="Oui, bien-sûr" className="p-button-rounded p-button-danger p-button-text" icon="pi pi-check" aria-label="Oui, bien-sûr" onClick={() => handleCloseConfirm()} />
        </div>
      )
    }

    const handleClose = () => {
      console.log("okko");
    }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={()=> renderFooterDeconnexion()} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
