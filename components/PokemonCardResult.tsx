import { useMemo } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

const min = 0
const max = 2
const normalise = (value: number) => ((value - min) * 100) / (max - min)

type Props = {
  originSpeed: number
  actualSpeed: number
}

const PokemonCardResult = (props: Props) => {
  const { originSpeed, actualSpeed } = props
  const ratio = useMemo(() => {
    const r = originSpeed / actualSpeed
    return normalise(max < r ? max : r)
  }, [originSpeed, actualSpeed])

  const color = useMemo(() => {
    return ratio < 50 ? 'error' :
      50 < ratio ? 'primary' : 'warning'
  }, [ratio])

  const label = useMemo(() => {
    return originSpeed < actualSpeed ? '遅い' :
      actualSpeed < originSpeed ? '早い' : '同速'
  }, [ratio, actualSpeed])

  return (
    <>
      <hr />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1, mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={ratio}
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
              （{ Math.round(ratio) } %）
            </Typography>
          </Box>
      </Box>
    </>
  )
}

export default PokemonCardResult
