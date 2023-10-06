import { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Divider } from '@mui/material';
import { isSmallScr } from '../utils/screenSize';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NoSsr from '@mui/material/NoSsr';

const NavigationDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(isSmallScr());

  useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(isSmallScr());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <NoSsr>
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <div style={{backgroundColor: '#0070f3'}}>
        <Typography variant="h6" sx={{ my: 2, color: '#fff' }}>
        My Task
        </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Mail" />
          </ListItem>
        </List>
      </Drawer>
      <IconButton color="inherit" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
    </NoSsr>
  );
};

export default NavigationDrawer;