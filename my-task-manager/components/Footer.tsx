import { Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      {'Made by '}
      <Link color="inherit" href="#">
        Nirmal M S
      </Link>
      {' © '}
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Footer;