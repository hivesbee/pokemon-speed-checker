import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import Title from './layout/Title'

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
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', ...sx }}>
      <Title>
        ランク補正
      </Title>
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
