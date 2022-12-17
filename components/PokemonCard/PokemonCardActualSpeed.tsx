import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardActualSpeed = (props: Props) => {
  const { sx } = props
  const { actualSpeed } = usePokemonCard()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
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
