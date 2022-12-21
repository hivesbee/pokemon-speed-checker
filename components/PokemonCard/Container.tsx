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

import ModeContainer from './layout/ModeContainer'
import ModeContainerBlind from './layout/ModeContainerBlind'

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
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: '1rem',
                },
              }}
            />
          }
          sx={{
            '& .MuiTypography-root': {
              fontSize: '0.75rem'
            }
          }}
        />
        <ModeContainer>
          <Quick />
          {!isQuickMode && <ModeContainerBlind />}
        </ModeContainer>
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
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: '1rem',
                },
              }}
            />
          }
          sx={{
            '& .MuiTypography-root': {
              fontSize: '0.75rem'
            }
          }}
        />
        <ModeContainer>
          <EffortValue sx={{ mb: 1 }} />
          <Correction sx={{ mb: 1 }} />
          <Rank sx={{ mb: 1 }} />
          <Item sx={{ mb: 1 }} />
          <StatusAilment sx={{ mb: 1 }} />
          <Field />
          {!isDetailMode && <ModeContainerBlind />}
        </ModeContainer>
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
