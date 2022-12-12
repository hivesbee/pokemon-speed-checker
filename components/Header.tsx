import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Typography variant="h1" component="h1" sx={{ padding: '0.5rem 1rem', fontSize: 24 }}>
          Pokemon speed checker (9 gen)
        </Typography>
      </AppBar>
    </Box>
  )
}

export default Header
