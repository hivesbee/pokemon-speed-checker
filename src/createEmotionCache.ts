import createCache from '@emotion/cache'

// FIXME : モダンに
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}