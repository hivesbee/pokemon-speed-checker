import { useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import PokemonCardName from './PokemonCardName'
import PokemonCardEffortValue from './PokemonCardEffortValue'
import PokemonCardCorrection from './PokemonCardCorrection'
import PokemonCardRank from './PokemonCardRank'
import PokemonCardActualSpeed from './PokemonCardActualSpeed'
import PokemonCardResult from './PokemonCardResult'

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
    console.log('Container#actualSpeed', actualSpeed)
    onChange(actualSpeed)
  }, [actualSpeed])

  return (
    <Card>
      <CardContent>
        <PokemonCardName sx={{ mb: 1 }} />
        <PokemonCardEffortValue sx={{ mb: 1 }} />
        <PokemonCardCorrection sx={{ mb: 1 }} />
        <PokemonCardRank />
        <hr />
        <PokemonCardActualSpeed />
        {
          type !== 'origin' && originSpeed &&
            <PokemonCardResult originSpeed={originSpeed} />
        }
      </CardContent>
    </Card>
  )
}

export default PokemonCardContainer
