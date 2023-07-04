import React from 'react';
import { DataProvider } from './GlobalState';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/header/Header'
import MainPages from './components/mainpages/MainPages'
import Footer from './components/footer/Footer'

function App(props) {
  return (
    <DataProvider>
      <Router>
        <article className='App'>
          <Header/>
          <MainPages/>
          <Footer/>
        </article>
      </Router>
    </DataProvider>
  );
}

export default App;