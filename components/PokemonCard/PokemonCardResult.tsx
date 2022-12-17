import { useMemo } from 'react'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import { usePokemonCard } from './usePokemonCard'

const min = 0
const max = 2
const normalise = (value: number) => ((value - min) * 100) / (max - min)

type Props = {
  originSpeed: number
  sx?: SxProps<Theme>
}

const PokemonCardResult = (props: Props) => {
  const { originSpeed, sx } = props
  const { actualSpeed } = usePokemonCard()

  const ratio = useMemo(() => originSpeed / (actualSpeed ?? 1), [originSpeed, actualSpeed])
  const correctedRatio = useMemo(() => normalise(max < ratio ? max : ratio), [ratio])

  const color = useMemo(() => {
    return correctedRatio < 50 ? 'error' :
      50 < correctedRatio ? 'primary' : 'warning'
  }, [correctedRatio])

  const label = useMemo(() => {
    if (!actualSpeed) {
      return '計測不可'
    }

    return originSpeed < actualSpeed ? '遅い' :
      actualSpeed < originSpeed ? '早い' : '同速'
  }, [correctedRatio, actualSpeed])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Box sx={{ flexGrow: 1, mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={correctedRatio}
          color={ color }
          sx={{
            height: '1rem',
            borderRadius: '0.25rem'
          }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            { label }
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
            （{ Math.round(ratio * 100) } %）
          </Typography>
        </Box>
    </Box>
  )
}

export default PokemonCardResult
