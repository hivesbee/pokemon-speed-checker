import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const style = {
  padding: '1rem'

}

const HeaderContainer = styled(Container)(({ theme }) => ({
  ...theme.typography.h1,
  width: '100vw',
  padding: '0.5rem 0',
  fontsize: '1.5rem',
  color: theme.palette.text.primary,
  backGroundColor: '#00FFFF'
}))

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
