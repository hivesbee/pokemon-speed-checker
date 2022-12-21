import { ReactNode } from 'react'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import { grey } from '@mui/material/colors'

import Box from '@mui/material/Box'

type Props = {
  children: ReactNode
  sx?: SxProps<Theme>
}

const PokemonCardLayoutModeContainer = (props: Props) => {
  const { children, sx } = props

  return (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mb: 1,
      p: 1,
      border: `1px solid ${grey[300]}`,
      ...sx
    }}>
      { children }
    </Box>
  )
}

export default PokemonCardLayoutModeContainer
