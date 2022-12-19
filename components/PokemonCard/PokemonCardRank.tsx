import { useState } from 'react'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardRank = (props: Props) => {
  const { sx } = props

  const { setRank } = usePokemonCard()

  const handleChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      return
    }

    setRank(value)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
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
