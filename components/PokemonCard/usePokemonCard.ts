import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { pokemons, pokemonNames, getPokemonBaseStats, Pokemon } from '../../data/pokemons'


import { atom, selector, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'

const atoms = {
  // ポケモン名
  name: atom<string>({
    key: 'name',
    default: pokemonNames[0],
  }),
  // レベル
  level: atom<number>({
    key: 'level',
    default: 50
  }),
  // 個体値
  individualValue: atom<number>({
    key: 'individualValue',
    default: 31
  }),
  // 努力値
  effortValue: atom<number>({
    key: 'effortValue',
    default: 252
  }),
  // 性格補正
  correction: atom<number>({
    key: 'correction',
    default: 1
  }),
  // ランク補正
  rank: atom<number>({
    key: 'rank',
    default: 0
  }),
}

const selectors = {
  // 種族値
  baseStats: selector<Pokemon | null>({
    key: 'baseStats',
    get: ({ get }) => {
      const name = get(atoms.name)
      return getPokemonBaseStats(name)
    }
  }),
  // ランク補正倍率 ( 計算用 )
  rankMagnification: selector<number>({
    key: 'rankMagnification',
    get: ({ get }) => {
      const rank = get(atoms.rank)
      return 0 <= rank ? (2 + rank) / 2 : 2 / (2 - rank)
    }
  }),
  // 実数値
  // [[(種族値*2+個体値+努力値/4)×レベル/100+5]*せいかく補正*ランク補正]
  actualSpeed: selector<number | null>({
    key: 'actualSpeed',
    get: ({ get }) => {
      const baseStats = get<Pokemon | null>(selectors.baseStats)
      if (!baseStats) {
        return null
      }

      const speed = parseInt(baseStats.s)

      const level = get(atoms.level)
      const individualValue = get(atoms.individualValue)
      const effortValue = get(atoms.effortValue)
      const correction = get(atoms.correction)
      const rankMagnification = get(selectors.rankMagnification) as number // FIXME: as をつけないとうごかない

      const calcedSpeed = Math.floor(
        (speed * 2 + individualValue + (effortValue / 4)) * level / 100 + 5
      )
      return Math.floor(calcedSpeed * correction * rankMagnification)
    }
  })
}

const usePokemonCard = () => {
  const [name, setName] = useRecoilState(atoms.name)
  const baseStats = useRecoilValue(selectors.baseStats)
  const [effortValue, setEffortValue] = useRecoilState(atoms.effortValue)
  const setCorrection = useSetRecoilState(atoms.correction)
  const [rank, setRank] = useRecoilState(atoms.rank)
  const actualSpeed = useRecoilValue(selectors.actualSpeed)

  return {
    name,
    setName,
    baseStats,
    effortValue,
    setEffortValue,
    setCorrection,
    rank,
    setRank,
    actualSpeed
  }
}

export { usePokemonCard, atoms, selectors }
