import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Title from './layout/Title'

import { items, Items } from '../../data/items'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardItem = (props: Props) => {
  const { sx } = props

  const { item, setItem } = usePokemonCard()

  const handleChange = (newValue: string | null) => {
    setItem(newValue as Items ?? items[0])
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Title>
        もちもの
      </Title>
      <Box sx={{ flexShrink: 1 }}>
        <Autocomplete
          disablePortal
          options={items}
          size="small"
          sx={{ width: '14rem' }}
          renderInput={(params) => <TextField label="" {...params} helperText="" />}
          value={item}
          onChange={(event: any, newValue: string | null) => { handleChange(newValue) }}
        />
      </Box>
    </Box>
  )
}

export default PokemonCardItem