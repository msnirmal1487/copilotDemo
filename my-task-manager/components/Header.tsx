import { useUser } from "@/contexts/UserContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AppBar, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavigationDrawer from './NavigationDrawer';

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
                <NavigationDrawer />
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