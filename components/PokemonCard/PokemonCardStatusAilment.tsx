import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardStatusAliment = (props: Props) => {
  const { sx } = props

  const { setStatusAliment } = usePokemonCard()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusAliment(event.target.checked)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Box sx={{ flexGrow: 1, width: '7rem', mr: 1 }}>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          状態異常
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 1 }}>
        <FormControlLabel control={<Checkbox onChange={handleChange} />} label="まひ" />
      </Box>
    </Box>
  )
}

export default PokemonCardStatusAliment
