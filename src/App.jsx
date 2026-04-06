import { useContext } from 'react'
import './App.css'
import { ScreenContext } from './context/ScreenContext';
import { SCREENS } from './config/screens'
import Instructions from './pages/Instructions';
import Landing from './pages/Landing';
import Game from './pages/Game';
import Quiz from './pages/Quiz';
import Congratulations from './pages/Congratulations';
import Sorry from './pages/Sorry';

function App() {
  const { screen } = useContext(ScreenContext);

  return (
    <>
      {screen === SCREENS.LANDING && <Landing />}
      {screen === SCREENS.INSTRUCTIONS && <Instructions />}
      {screen === SCREENS.GAME && <Game />}
      {screen === SCREENS.QUIZ && <Quiz />}
      {screen === SCREENS.RESULT_SUCCESS && <Congratulations />}
      {screen === SCREENS.RESULT_FAIL && <Sorry />}
    </>
  )
}

export default App
