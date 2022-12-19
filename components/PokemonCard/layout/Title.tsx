import { ReactNode } from 'react'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Props = {
  children: ReactNode
  sx?: SxProps<Theme>
}

const PokemonCardLayoutTitle = (props: Props) => {
  const { children, sx } = props

  return (
    <Box sx={{ width: '7rem', mr: 1, ...sx }}>
      <Typography
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        { children }
      </Typography>
    </Box>
  )
}

export default PokemonCardLayoutTitle
