import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

function Home() {
  
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Material-UI Next.js App</Typography>
        </Toolbar>
      </AppBar>
      <Button variant="contained" color="primary" >
        Primary Button
      </Button>
    </div>
  );
}

export default Home;