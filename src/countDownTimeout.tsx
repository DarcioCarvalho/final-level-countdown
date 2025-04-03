import { useState, useEffect, ChangeEvent } from 'react';

export default function CountdownTimeout() {
  const [seconds, setSeconds] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isCounting, setIsCounting] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSeconds(Number(value) || 0);
  };


  const startCountdown = () => {
    if (seconds > 0) {
      setIsCounting(true);
    }
  };

  const handleClearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  }

  const decreaseSeconds = () => {
    if (seconds <= 0) {
      setIsCounting(false);
      setInputValue("");
      return;
    }

    handleClearTimer();

    const newTimer = setTimeout(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    setTimer(newTimer);
  }

  useEffect(() => {
    if (!isCounting) {
      return
    }

    decreaseSeconds();

    return () => {
      handleClearTimer();
    };
  }, [isCounting, seconds]);



  const handleReset = () => {
    handleClearTimer();

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

