import { atom, selector, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'

import { pokemonNames, getPokemonBaseStats, Pokemon } from '../../data/pokemons'
import { items, itemEffects, Items } from '../../data/items'

// atoms
const nameState = atom<string>({
  key: 'nameState',
  default: pokemonNames[0],
})

// レベル
const levelState = atom<number>({
  key: 'levelState',
  default: 50
})

// 個体値
const individualValueState = atom<number>({
  key: 'individualValueState',
  default: 31
})

// 努力値
const effortValueState = atom<number>({
  key: 'effortValueState',
  default: 252
})

// 性格補正
const correctionState = atom<number>({
  key: 'correctionState',
  default: 1
})

// ランク補正
const rankState = atom<number>({
  key: 'rankState',
  default: 0
})

// もちもの
const itemState = atom<Items>({
  key: 'itemState',
  default: items[0]
})

// 状態異常
const statusAlimentState = atom<boolean>({
  key: 'statusAlimentState',
  default: false
})

// フィールド
const fieldState = atom<boolean>({
  key: 'fieldState',
  default: false
})

// selectors

// 種族値
const baseStatsState = selector<Pokemon | null>({
  key: 'baseStatsState',
  get: ({ get }) => {
    const name = get(nameState)
    return getPokemonBaseStats(name)
  }
})

// もちものによるランク補正
const itemRankState = selector<number>({
  key: 'itemRankState',
  get: ({ get }) => {
    const item = get(itemState)
    const itemEffect = itemEffects[item]

    return (!itemEffect || itemEffect.target === 'item') ? 0 : itemEffect.value
  }
})

// ランク補正倍率 ( 計算用 )
// rankState と itemRankState から算出
const rankMagnificationState = selector<number>({
  key: 'rankMagnificationState',
  get: ({ get }) => {
    const rank = get(rankState) + get(itemRankState)

    if (0<= rank) {
      const r = 6 < rank ? 6 : rank
      return (2 + r) / 2
    } else {
      const r = rank < -6 ? -6 : rank
      return 2 / (2 - r)
    }
  }
})

// もちものによる実数値補正
const itemMagnificationState = selector<number>({
  key: 'itemMagnificationState',
  get: ({ get }) => {
    const item = get(itemState)
    const itemEffect = itemEffects[item]

    return (!itemEffect || itemEffect.target === 'rank') ? 1 : itemEffect.value
  }
})

// 状態異常による実数値補正
const statusAlimentMagnificationState = selector<number>({
  key: 'statusAlimentMagnificationState',
  get: ({ get }) => get(statusAlimentState) ? 0.5 : 1
})

// フィールドによる実数値補正
const fieldMagnificationState = selector<number>({
  key: 'fieldMagnificationState',
  get: ({ get }) => get(fieldState) ? 2 : 1
})

// 実数値
// [[(種族値*2+個体値+努力値/4)×レベル/100+5]*せいかく補正*ランク補正*もちもの補正*状態異常補正*フィールド補正]
const actualSpeedState = selector<number | null>({
  key: 'actualSpeedState',
  get: ({ get }) => {
    const baseStats = get<Pokemon | null>(baseStatsState)
    if (!baseStats) {
      return null
    }

    const speed = parseInt(baseStats.s)

    const level = get(levelState)
    const individualValue = get(individualValueState)
    const effortValue = get(effortValueState)
    const correction = get(correctionState)
    const rankMagnification = get(rankMagnificationState)
    const itemMagnification = get(itemMagnificationState)
    const statusAlimentMagnification = get(statusAlimentMagnificationState)
    const fieldMagnification = get(fieldMagnificationState)

    const calcedSpeed = Math.floor(
      (speed * 2 + individualValue + (effortValue / 4)) * level / 100 + 5
    )
    return Math.floor(
      calcedSpeed
      * correction
      * rankMagnification
      * itemMagnification
      * statusAlimentMagnification
      * fieldMagnification
    )
  }
})

const usePokemonCard = () => {
  const [name, setName] = useRecoilState(nameState)
  const baseStats = useRecoilValue(baseStatsState)
  const [effortValue, setEffortValue] = useRecoilState(effortValueState)
  const setCorrection = useSetRecoilState(correctionState)
  const setRank = useSetRecoilState(rankState)
  const [item, setItem] = useRecoilState(itemState)
  const setStatusAliment = useSetRecoilState(statusAlimentState)
  const setField = useSetRecoilState(fieldState)
  const actualSpeed = useRecoilValue(actualSpeedState)

  return {
    name,
    setName,
    baseStats,
    effortValue,
    setEffortValue,
    setCorrection,
    setRank,
    item,
    setItem,
    setStatusAliment,
    setField,
    actualSpeed
  }
}

export { usePokemonCard }
