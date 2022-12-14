import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Props = {
  actualSpeed: number
}

const PokemonCardActualSpeed = (props: Props) => {
  const { actualSpeed } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '7rem', mr: 1 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          すばやさ実数値
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { actualSpeed }
        </Typography>
      </Box>
    </Box>
  )
}

export default PokemonCardActualSpeed
