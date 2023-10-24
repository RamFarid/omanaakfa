import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ThemeContext = createContext()

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const toggleTheme = () => {
    const newerTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newerTheme)
    localStorage.setItem('theme', newerTheme)
  }
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeContextProvider.propTypes = {
  children: PropTypes.any,
}

export default ThemeContextProvider
