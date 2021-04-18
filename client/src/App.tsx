import { Main } from './components/pages/main'
import {MainContextProvider}from'./utils'


function App() {
  return (
    <div className="App">
      <MainContextProvider>
      <Main />
      </MainContextProvider>
    </div>
  );
}

export default App;
