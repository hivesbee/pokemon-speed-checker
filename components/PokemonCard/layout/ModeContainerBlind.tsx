import Box from '@mui/material/Box'

const PokemonCardLayoutModeContainerBlind = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(158, 158, 158, 0.3)', // grey[500]
        zIndex: 1
      }}
    />
  )
}

export default PokemonCardLayoutModeContainerBlind
