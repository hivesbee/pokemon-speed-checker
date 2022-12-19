import { useMemo } from 'react'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Title from './layout/Title'

import { pokemonNames } from '../../data/pokemons'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardName = (props: Props) => {
  const { sx } = props

  const { name, setName, baseStats } = usePokemonCard()

  const baseStatsLabel = useMemo(() => {
    return baseStats ? `種族値 : ${baseStats.h}-${baseStats.a}-${baseStats.b}-${baseStats.c}-${baseStats.d}-${baseStats.s}` : 'ポケモンがみつかりません'
  }, [name])

  const handleChange = (value: string | null) => {
    setName(value ?? pokemonNames[0])
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Title sx={{ mb: '22px' }}>
        調整ポケモン
      </Title>
      <Box sx={{ flexShrink: 1 }}>
        <Autocomplete
          disablePortal
          options={pokemonNames}
          size="small"
          sx={{ width: '14rem' }}
          renderInput={(params) => <TextField label="" {...params} helperText={baseStatsLabel} />}
          value={name}
          onChange={(event: any, newValue: string | null) => { handleChange(newValue) }}
        />
      </Box>
    </Box>
  )
}

export default PokemonCardName
