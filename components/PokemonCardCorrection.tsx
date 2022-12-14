import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

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
  onChange: (value: string) => void
}

const PokemonCardCorrection = (props: Props) => {
  const { onChange } = props

  const [correction, setCorrection] = useState<string>(corrections[1])
  const handleChange = (event: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (!value) {
      return
    }

    setCorrection(value)
    onChange(value)
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          value={correction}
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
