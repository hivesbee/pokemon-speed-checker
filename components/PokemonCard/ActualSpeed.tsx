import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Title from './layout/Title'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardActualSpeed = (props: Props) => {
  const { sx } = props
  const { actualSpeed } = usePokemonCard()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Title>
        すばやさ実数値
      </Title>
      <Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { actualSpeed }
        </Typography>
      </Box>
    </Box>
  )
}

export default PokemonCardActualSpeed
