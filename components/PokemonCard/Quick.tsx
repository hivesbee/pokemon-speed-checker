import { useState } from 'react'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import { usePokemonCard } from './usePokemonCard'

const quickSettingLabels = ['0', '4 振り', '準速', '最速'] as const
type quickSettingLabels = typeof quickSettingLabels[number]

type QuickSettingMap = {
  [k in quickSettingLabels]: {
    effortValue: number
    correction?: number
  }
}

const quickSettingMap: QuickSettingMap = {
  '0': {
    effortValue: 0
  },
  '4 振り': {
    effortValue: 4
  },
  '準速': {
    effortValue: 252
  },
  '最速': {
    effortValue: 252,
    correction: 1.1
  }
}

const quickSettingComponents = quickSettingLabels.map((x, i) => (
  <ToggleButton
    key={i}
    value={x}
    aria-label={`quick setting x${x}`}
    sx={{ width: '4rem', fontSize: '14', padding: '0.5rem' }}
  >
    {`${x}`}
  </ToggleButton>
))

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardQuick = (props: Props) => {
  const { sx } = props

  const { setEffortValue, setCorrection } = usePokemonCard()

  const [state, setState] = useState<string>('')

  const handleChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (!value) {
      return
    }

    const v = value as quickSettingLabels

    setState(v)
    setEffortValue(quickSettingMap[`${v}`].effortValue)
    setCorrection(quickSettingMap[`${v}`]?.correction ?? 1.0)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <ToggleButtonGroup
        value={state}
        exclusive
        onChange={handleChange}
      >
        { quickSettingComponents }
      </ToggleButtonGroup>
    </Box>
  )
}

export default PokemonCardQuick
