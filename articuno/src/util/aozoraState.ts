import create from 'zustand/vanilla'

// TODO: figure out a use case for this now that it confirmed works lol
const aozoraStore = create(() => ({
  salmon: 1,
  tuna: 2,
}))

// const {
//   getState,
//   setState,
//   subscribe,
//   destroy,
// } = aozoraStore

export default aozoraStore
