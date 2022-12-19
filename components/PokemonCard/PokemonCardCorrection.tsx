import { useState } from 'react'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import { usePokemonCard } from './usePokemonCard'

const corrections = ['0.9', '1.0', '1.1']
const correctionsComponents = corrections.map((x, i) => (
  <ToggleButton
    key={i}
    value={x}
    aria-label={`correction x${x}`}
    sx={{ fontSize: '14', padding: '0.5rem' }}
  >
    {`x${x}`}
  </ToggleButton>
))

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardCorrection = (props: Props) => {
  const { sx } = props

  const { setCorrection } = usePokemonCard()

  const [correctionLabel, setCorrectionLabel] = useState<string>(corrections[1])
  const handleChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (!value) {
      return
    }

    setCorrectionLabel(value)
    setCorrection(parseFloat(value))
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Box sx={{ flexGrow: 1, width: '7rem', mr: 1 }}>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          性格補正
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 1 }}>
        <ToggleButtonGroup
          value={correctionLabel}
          exclusive
          onChange={handleChange}
          aria-label="correction"
        >
          { correctionsComponents }
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}

export default PokemonCardCorrection
