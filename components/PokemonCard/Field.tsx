import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import Title from './layout/Title'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardField = (props: Props) => {
  const { sx } = props

  const { setField } = usePokemonCard()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setField(event.target.checked)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Title>
      フィールド
      </Title>
      <Box sx={{ flexShrink: 1 }}>
        <FormControlLabel control={<Checkbox onChange={handleChange} />} label="おいかぜ" />
      </Box>
    </Box>
  )
}

export default PokemonCardField
