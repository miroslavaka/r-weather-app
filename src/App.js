import Weather from './Weather';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <Weather defaultCity="London" />
        <footer>
          This project was coded by{' '}
          <a href="https://mira-codes.netlify.app/" target="_blank">
            Miroslava
          </a>{' '}
          and is {''}
          <a href="https://github.com/miroslavaka/weather-app" target="_blank">
            open-sourced on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
