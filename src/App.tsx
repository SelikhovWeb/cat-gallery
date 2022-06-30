import React, { useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Gallery from './components/Gallery/Gallery';
import { getBreeds } from './redux/features/catBreeds';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Gallery />
      </div>
    </div>
  );
}

export default App;
