
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { useState, useMemo } from 'react'

import PokemonCard from '../components/PokemonCard'

import pokemons from '../data/pokemons'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [originStatus, setOriginStatus] = useState<number>(0)
  const handleOriginChange = (value: number) => {
    setOriginStatus(value)
  }

  const [targetStatus, setTargetStatus] = useState<number>(0)
  const handleTargetChange = (value: number) => {
    setTargetStatus(value)
  }

  const result = useMemo(() => {
    return originStatus > targetStatus ? 'fast' : 'slow'
  }, [originStatus, targetStatus])

  return (
    <div>
      <main>
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item>
              <PokemonCard type="origin" result="" onChange={handleOriginChange} />
            </Grid>
            <Grid item>
              <PokemonCard type="target" result={result} onChange={handleTargetChange} />
            </Grid>
          </Grid>
        </Container>
      </main>

      <footer>
      </footer>
    </div>
  )
}
