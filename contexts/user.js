import { createContext } from 'react'

const userContext = createContext({
  user: {
    email: null,
    token: null,
  },
  setUser: () => {},
})

export default userContext
