import { useEffect, useMemo, useState } from 'react'

import { grey } from '@mui/material/colors'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import Name from './Name'
import Quick from './Quick'
import EffortValue from './EffortValue'
import Correction from './Correction'
import Rank from './Rank'
import Item from './Item'
import StatusAilment from './StatusAilment'
import ActualSpeed from './ActualSpeed'
import Field from './Field'
import Result from './Result'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  type: 'origin' | 'target'
  originSpeed?: number
  onChange: (value: number | null) => void
}

const PokemonCardContainer = (props: Props) => {
  const { type, originSpeed, onChange } = props

  const { actualSpeed } = usePokemonCard()

  const [ mode, setMode ] = useState<string>('quick')

  const isQuickMode = useMemo(() => mode === 'quick', [mode])
  const isDetailMode = useMemo(() => mode === 'detail', [mode])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value)
  }

  useEffect(() => {
    onChange(actualSpeed)
  }, [actualSpeed])

  return (
    <Card>
      <CardContent>
        <Name sx={{ mb: 1 }} />
        <FormControlLabel
          label="クイックモード"
          control={
            <Radio
              size="small"
              checked={isQuickMode}
              onChange={handleChange}
              value="quick"
              name="quick mode"
              inputProps={{ 'aria-label': 'quick mode' }}
            />
          }
          // sx={{ fontSize: '0.75rem' }}
        />
        <Box sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 1,
          p: 1,
          border: `1px solid ${grey[300]}`
        }}>
          <Quick />
          {isDetailMode && <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(158, 158, 158, 0.3)', // grey[500]
              zIndex: 1
            }}
          />}
        </Box>
        <FormControlLabel
          label="詳細モード"
          control={
            <Radio
              size="small"
              checked={isDetailMode}
              onChange={handleChange}
              value="detail"
              name="detail mode"
              inputProps={{ 'aria-label': 'detail mode' }}
            />
          }
          // sx={{ fontSize: '0.75rem' }}
        />
        <Box sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 1,
          p: 1,
          border: `1px solid ${grey[300]}`
        }}>
          <EffortValue sx={{ mb: 1 }} />
          <Correction sx={{ mb: 1 }} />
          <Rank sx={{ mb: 1 }} />
          <Item sx={{ mb: 1 }} />
          <StatusAilment sx={{ mb: 1 }} />
          <Field />
          {isQuickMode && <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(158, 158, 158, 0.3)', // grey[500]
              zIndex: 1
            }}
          />}
        </Box>
        <hr />
        <ActualSpeed />
        {
          type !== 'origin' && originSpeed &&
            <Result originSpeed={originSpeed} />
        }
      </CardContent>
    </Card>
  )
}

export default PokemonCardContainer
