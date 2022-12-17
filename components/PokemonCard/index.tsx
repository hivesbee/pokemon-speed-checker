import { RecoilRoot } from 'recoil'

import PokemonCardContainer from './PokemonCardContainer'

// FIXME: 型定義
const PokemonCard = (props: any) => {
  const { type, originSpeed, onChange } = props

  const handleChange = (value: number | null) => {
    onChange(value)
  }

  return (
    <RecoilRoot>
      <PokemonCardContainer
        type={type}
        originSpeed={originSpeed}
        onChange={handleChange}
      />
    </RecoilRoot>
  )
}

export default PokemonCard
