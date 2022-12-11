import { useEffect, useMemo, useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import pokemons from '../data/pokemons'

type PokemonStates = {
  h: number
  a: number
  b: number
  c: number
  d: number
  s: number
}

const pokemonNames = Object.entries(pokemons).map(([k, _]) => k)
const getPokemonStats = (name: string): PokemonStates | null => {
  const pokemon = pokemons[name] ?? null

  if (!pokemon) {
    return null
  }

  return {
    h: pokemon.h,
    a: pokemon.a,
    b: pokemon.b,
    c: pokemon.c,
    d: pokemon.d,
    s: pokemon.s,
  }
}

const ranks = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]

// FIXME: 型定義
export default (props: any) => {
  const { type, result, onChange } = props 

  const [pokemonName, setPokemonName] = useState<string>('')

  const pokeStats = useMemo(() => {
    const stats = getPokemonStats(pokemonName)
    return stats ? `${stats.h} - ${stats.a} - ${stats.b} - ${stats.c} - ${stats.d} - ${stats.s}` : '0 - 0 - 0 - 0 - 0 - 0'
  }, [pokemonName])

  const handleChange = (value: string | null) => {
    setPokemonName(value ?? '')
  }

  const [effortValue, setEffortValue] = useState<string>('252')
  const handleEffortValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffortValue(event.target.value)
  }

  const handleButtonClick = (value: number) => {
    const ev = parseInt(effortValue) + value

    if (0 > ev) {
      setEffortValue('0')
      return
    }

    if (252 < ev) {
      setEffortValue('252')
      return
    }

    setEffortValue(`${ev}`)
  }

  const [correction, setCorrection] = useState<number>(1.0)
  const handleCorrectionChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    setCorrection(parseFloat(newValue ?? '1.0'))
  }

  const [rank, setRank] = useState<string>('0')
  const handleRankChange = (event: SelectChangeEvent) => {
    setRank(event.target.value)
  }

  
  const actualValue = useMemo(() => {
    // 実数値
    // {(種族値×2+個体値+努力値÷4)×レベル÷100+5}×せいかく補正
    const stats = getPokemonStats(pokemonName)
    const s = stats?.s ?? 0
    const ev = parseInt(effortValue)

    const v = Math.floor((s * 2 + 31 + (ev / 4)) * 50 / 100 + 5) * correction

    // ランク補正・持ち物補正
    const r = parseInt(rank)
    const rc = (2 + (0 <= r ? r : 0)) / (2 - (0 > r ? r : 0))


    return Math.floor(v * rc)
  }, [pokemonName, effortValue, correction, rank])

  useEffect(() => {
    onChange(actualValue)
  }, [actualValue])

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          調整したいポケモン
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={pokemonNames}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField label="Pokemon" {...params} />}
          value={pokemonName}
          onChange={(event: any, newValue: string | null) => { handleChange(newValue) }}
        />
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          種族値
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { pokeStats }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          努力値
        </Typography>
        <TextField type="number" 
          InputLabelProps={{
            shrink: true,
          }}
          label="努力値"
          variant="outlined"
          value={effortValue}
          onChange={handleEffortValueChange}
        />
        <ButtonGroup variant="outlined" color="primary" aria-label="outlined secondary button group">
          <Button onClick={(e) => handleButtonClick(-4)}>-</Button>
          <Button onClick={(e) => handleButtonClick(4)}>+</Button>
        </ButtonGroup>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          性格補正
        </Typography>
        <ToggleButtonGroup
          value={correction}
          exclusive
          onChange={handleCorrectionChange}
          aria-label="correction"
        >
          <ToggleButton value={0.9} aria-label="correction x0.9">
            x0.9
          </ToggleButton>
          <ToggleButton value={1.0} aria-label="correction x1.0">
            x1.0
          </ToggleButton>
          <ToggleButton value={1.1} aria-label="correction x1.1">
            x1.1
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ランク補正
        </Typography>
        <Select
          value={rank}
          onChange={handleRankChange}
        >
          { ranks.map(x => (<MenuItem value={x}>{x}</MenuItem>)) }
        </Select>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          スピード実数値
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {actualValue}
        </Typography>
        {type !== 'origin' &&
          <>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              つまり
            </Typography>
            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
              { result === 'fast' ? '早い' : '遅い'}
            </Typography>
          </>
        }
      </CardContent>
    </Card>
  )
}