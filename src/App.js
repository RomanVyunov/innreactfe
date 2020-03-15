import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';


/*class App extends React.Component {
  render() {
    //return <h1 class="display-1">Привет, {this.props.name}!</h1>;
    return <div class="container-fluid align-items-center">
             <h1 class="display-1">Таймер</h1>
             <div>
               <button class="display-4" onClick={this.myMethod}>Остановить</button>
               <button class="display-4">Сбросить</button>
             </div>
           </div>
  }

  myMethod(){
  console.log("MY METHOD");

  }
}*/
//import Navigation from './components/Navbar';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}
export default App;
