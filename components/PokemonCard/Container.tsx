import { useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Name from './Name'
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

  useEffect(() => {
    onChange(actualSpeed)
  }, [actualSpeed])

  return (
    <Card>
      <CardContent>
        <Name sx={{ mb: 1 }} />
        <EffortValue sx={{ mb: 1 }} />
        <Correction sx={{ mb: 1 }} />
        <Rank sx={{ mb: 1 }} />
        <Item sx={{ mb: 1 }} />
        <StatusAilment sx={{ mb: 1 }} />
        <Field />
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
