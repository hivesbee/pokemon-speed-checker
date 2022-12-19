const items = [
  'なし',
  'こだわりスカーフ',
  'からぶりほけん',
  'カムラのみ',
  'ビビりだま',
  'スピードパウダー',
  'スターのみ',
] as const

export type Items = typeof items[number]

export type ItemEffectTarget = 'item' | 'rank'

export type ItemEffectValue = null | {
  target: ItemEffectTarget,
  value: number
}

export type ItemEffect = {
  [k in Items]: ItemEffectValue
}

const itemEffects: ItemEffect = {
  'なし': null,
  'こだわりスカーフ': {
    target: 'item',
    value: 1.5
  },
  'からぶりほけん': {
    target: 'rank',
    value: 2
  },
  'カムラのみ': {
    target: 'rank',
    value: 1
  },
  'ビビりだま': {
    target: 'rank',
    value: 1
  },
  'スピードパウダー': {
    target: 'item',
    value: 2
  },
  'スターのみ': {
    target: 'rank',
    value: 2
  },
}

const getItemEffect = (item: Items) => {
  const itemEffect = itemEffects[item]
  return itemEffect ?? null
}

export { items, itemEffects }