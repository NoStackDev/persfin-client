import React, { useState } from "react";

import Nav from "./Components/Nav";

import "./Styles/main.scss";

function App() {

  const [theme, setTheme] = useState('light')

  const changeTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTheme(theme==='light'? 'dark': 'light')
    document.documentElement.className = ""
    document.documentElement.classList.add(`theme-${theme}`)
  }

  return (
    <div>
      <button onClick={changeTheme}>Change Theme</button>
      <Nav />
    </div>
  );
}

export default App;
