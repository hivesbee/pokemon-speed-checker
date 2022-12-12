import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

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
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <TextField type="number" 
            InputLabelProps={{
              shrink: true,
            }}
            label="努力値"
            variant="outlined"
            inputProps={{ min: '0', max: '252' }}
            value={effortValue}
            onChange={handleEffortValueChange}
            style={{ width: '5rem' }}
          />
        </Grid>
        <Grid item>
          <ButtonGroup variant="outlined" color="inherit" aria-label="outlined secondary button group">
            <Button onClick={(e) => handleCountButtonClick(-4)}>-</Button>
            <Button onClick={(e) => handleCountButtonClick(4)}>+</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup variant="outlined" color="inherit" aria-label="outlined secondary button group">
            <Button onClick={(e) => handleSetButtonClick(0)}>0</Button>
            <Button onClick={(e) => handleSetButtonClick(252)}>252</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PokemonCardEffortValue
