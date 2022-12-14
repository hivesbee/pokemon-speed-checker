import { useEffect, useMemo, useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import LinearProgress from '@mui/material/LinearProgress'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import pokemons from '../data/pokemons'
import PokemonCardEffortValue from './PokemonCardEffortValue'
import PokemonCardCorrection from './PokemonCardCorrection'
import PokemonCardResult from './PokemonCardResult'

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
const PokemonCard = (props: any) => {
  const { type, result, originSpeed, onChange } = props 

  const [pokemonName, setPokemonName] = useState<string>('')

  const pokeStats = useMemo(() => {
    const stats = getPokemonStats(pokemonName)
    return stats ? `種族値 : ${stats.h} - ${stats.a} - ${stats.b} - ${stats.c} - ${stats.d} - ${stats.s}` : '対応するポケモンがみつかりません'
  }, [pokemonName])

  const handleChange = (value: string | null) => {
    setPokemonName(value ?? '')
  }

  const [effortValue, setEffortValue] = useState<string>('252')
  const handleEffortValueChange = (value: string) => {
    setEffortValue(value)
  }

  const [correction, setCorrection] = useState<number>(1.0)
  const handleCorrectionChange = (value: string) => {
    setCorrection(parseFloat(value))
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
  }, [onChange, actualValue])

  const min = 0
  const max = 2
  const normalise = (value: number) => ((value - min) * 100) / (max - min)

  const speedRatio = useMemo(() => {
    const ratio = originSpeed / actualValue
    console.log(normalise(max < ratio ? max : ratio))
    return normalise(max < ratio ? max : ratio)
  }, [originSpeed, actualValue])

  const progressColor = useMemo(() => {
    // return speedRatio < 50 ? '#F44336' :
    //   50 < speedRatio ? '#3F51B5' : '#FFEF62'
    return speedRatio < 50 ? 'error' :
      50 < speedRatio ? 'primary' : 'warning'
  }, [speedRatio])

  const progressLabel = useMemo(() => {
    return originSpeed < actualValue ? '遅い' :
      actualValue < originSpeed ? '早い' : '同速'
  }, [speedRatio, actualValue])

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
          renderInput={(params) => <TextField label="Pokemon" {...params} helperText={pokeStats} />}
          value={pokemonName}
          onChange={(event: any, newValue: string | null) => { handleChange(newValue) }}
        />
        <br />
        <PokemonCardEffortValue onChange={handleEffortValueChange} />
        <PokemonCardCorrection onChange={handleCorrectionChange}/>
        
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ランク補正
        </Typography>
        <Select
          value={rank}
          onChange={handleRankChange}
        >
          { ranks.map((x, i) => (<MenuItem key={i} value={x}>{x}</MenuItem>)) }
        </Select>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          スピード実数値
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {actualValue}
        </Typography>
        {type !== 'origin' &&
          <PokemonCardResult originSpeed={originSpeed} actualSpeed={actualValue} />
        }
      </CardContent>
    </Card>
  )
}

export default PokemonCard
