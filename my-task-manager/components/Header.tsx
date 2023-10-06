import { useUser } from "@/contexts/UserContext";
import { AppBar, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, Toolbar, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import Menu from '@mui/material/Menu';
import { isSmallScr } from '../utils/screenSize';

const Header = () => {
    const router = useRouter();
    const { user, setUser } = useUser();
    var [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        if (!user) {
            console.log('no user');
            // router.push('/login');
        } else {
            console.log(user);
        }

    }
        , [user, setUser]);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        setUser(null);
        router.push('/login');
    }

    const handlePlaceholder = () => {
        handleMenuClose();
    }
    const open = Boolean(anchorEl);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <IconButton color="inherit"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => handleMenuClick(event)}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem color="inherit" onClick={handlePlaceholder}>
                        placeholder
                    </MenuItem>
                    <MenuItem color="inherit" onClick={handleLogout}>
                        Logout
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    );
};

export default Header;