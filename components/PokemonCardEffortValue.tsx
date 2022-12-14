import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type Props = {
  onChange: (value: string) => void
}

const PokemonCardEffortValue = (props: Props) => {
  const { onChange } = props

  const [effortValue, setEffortValue] = useState<string>('252')
  const handleEffortValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffortValue(event.target.value)
  }

  const handleCountButtonClick = (value: number) => {
    const v = parseInt(effortValue) + value
    const ev = v < 0 ? '0' : (252 < v ? '252' : `${v}`)

    setEffortValue(ev)
    onChange(ev)
  }

  const handleSetButtonClick = (value: number) => {
    const ev = `${value}`
    setEffortValue(ev)
    onChange(ev)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '7rem', mr: 1 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          努力値
        </Typography>
      </Box>
      {/* <Box>
        <Button size="small" variant="outlined">
          0
        </Button>
      </Box> */}

      <Box sx={{ mr: 1 }}>
        <TextField
          type="number" 
          InputLabelProps={{ shrink: true }}
          variant="standard"
          inputProps={{ min: '0', max: '252' }}
          value={effortValue}
          onChange={handleEffortValueChange}
          style={{ width: '3rem' }}
        />
      </Box>
      <Box sx={{ mr: 1}}>
        <ButtonGroup variant="outlined" color="inherit" aria-label="outlined secondary button group">
          <Button onClick={(e) => handleCountButtonClick(-4)}>-</Button>
          <Button onClick={(e) => handleCountButtonClick(4)}>+</Button>
        </ButtonGroup>
      </Box>
        <Grid item>
          <ButtonGroup variant="outlined" color="inherit" aria-label="outlined secondary button group">
            <Button onClick={(e) => handleSetButtonClick(0)}>0</Button>
            <Button onClick={(e) => handleSetButtonClick(252)}>252</Button>
          </ButtonGroup>
        </Grid>
    </Box>
  )
}

export default PokemonCardEffortValue
