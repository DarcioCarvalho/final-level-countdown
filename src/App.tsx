import './App.css'
import CountdownInterval from './countDownInterval'
import CountdownTimeout from './countDownTimeout'

function App() {


  return (
    <main>
      <header className="header">Final Level Co. - Teste Técnico</header>

      <div className="container">
        <header className="countdown-header">Countdown - setInterval function</header>
        <CountdownInterval />
      </div>

      <div className="container">
        <header className="countdown-header">Countdown - setTimeout function</header>
        <CountdownTimeout />
      </div>

    </main>
  )
}

export default App
