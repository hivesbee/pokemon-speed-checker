import { useState, useMemo } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import Header from '../components/Header'
import PokemonCard from '../components/PokemonCard'

export default function Home() {
  const [originStatus, setOriginStatus] = useState<number>(0)
  const handleOriginChange = (value: number) => {
    console.log('origin', value, 'target', targetStatus)
    setOriginStatus(value)
  }

  const [targetStatus, setTargetStatus] = useState<number>(0)
  const handleTargetChange = (value: number) => {
    console.log('origin', value, 'target', targetStatus)
    setTargetStatus(value)
  }

  return (
    <div>
      <Header />
      <main>
        <Container>
          <Grid container spacing={2} style={{padding: '1rem 0'}}>
            <Grid item>
              <PokemonCard type="origin" onChange={handleOriginChange} />
            </Grid>
            <Grid item>
              <PokemonCard type="target" originSpeed={originStatus} onChange={handleTargetChange} />
            </Grid>
          </Grid>
        </Container>
      </main>

      <footer>
      </footer>
    </div>
  )
}
