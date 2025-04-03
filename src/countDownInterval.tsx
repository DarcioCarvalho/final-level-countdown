import { useState, useEffect, ChangeEvent } from 'react';

export default function CountdownInterval() {
  const [seconds, setSeconds] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSeconds(Number(value) || 0);
  };

  const startCountdown = () => {
    if (isCounting) {
      return;
    }


    if (timer) {
      clearInterval(timer);
    }

    setIsCounting(true);
    const newTimer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(newTimer);
          setIsCounting(false);
          setInputValue("");

          return 0
        }

        return prevSeconds - 1
      });
    }, 1000);


    setTimer(newTimer);
  };

  useEffect(() => {

    return () => {
      clearInterval(Number(timer));
    }

  }, [timer]);


  const handleReset = () => {
    setTimer(null);
    setInputValue("");
    setSeconds(0);
    setIsCounting(false);
  };

  return (
    <div>
      <div className="container-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Digite os segundos"
        />
        <button onClick={startCountdown} disabled={isCounting || seconds <= 0}>
          Iniciar Contagem Regressiva
        </button>
        <button onClick={handleReset} disabled={!isCounting}>
          Reiniciar
        </button>
      </div>
      <p className="countdown">{seconds} segundos restantes</p>
    </div>
  );
}
