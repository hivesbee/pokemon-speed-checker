import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import TextField from '@mui/material/TextField'

import Title from './layout/Title'

import { usePokemonCard } from './usePokemonCard'

type Props = {
  sx?: SxProps<Theme>
}

const PokemonCardEffortValue = (props: Props) => {
  const { sx } = props

  const { effortValue, setEffortValue } = usePokemonCard()

  const handleEffortValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffortValue(parseInt(event.target.value))
  }

  const handleSetButtonClick = (value: number) => {
    setEffortValue(value)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', ...sx }}>
      <Title>
        努力値
      </Title>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Box sx={{ mr: 1 }}>
          <TextField
            type="number" 
            InputLabelProps={{ shrink: true }}
            variant="standard"
            inputProps={{
              min: '0',
              max: '252',
              step: 4,
              style: {
                textAlign: 'center'
             }
            }}
            value={effortValue}
            onChange={handleEffortValueChange}
            sx={{ width: '4rem' }}
          />
        </Box>
        <Box>
          <ButtonGroup variant="outlined" color="inherit" aria-label="outlined secondary button group">
            <Button onClick={(e) => handleSetButtonClick(0)} sx={{ width: '3rem' }}>0</Button>
            <Button onClick={(e) => handleSetButtonClick(252)} sx={{ width: '3rem' }}>252</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  )
}

export default PokemonCardEffortValue
