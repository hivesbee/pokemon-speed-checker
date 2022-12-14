import { useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

type Props = {
  onChange: (value: number) => void
}

const PokemonCardRank = (props: Props) => {
  const { onChange } = props

  const [rank, setRank] = useState<number>(0)
  const handleChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      return
    }

    setRank(value)
    onChange(value)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '7rem', mr: 1 }}>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          ランク補正
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Slider
          marks
          step={1}
          defaultValue={0}
          min={-6}
          max={6}
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
      </Box>
    </Box>
  )
}

export default PokemonCardRank
