import React from 'react';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';

const App = () => {
  console.log(generatePalette(seedPalettes[4]));
  return (
    <div>
      <Palette {...seedPalettes[4]}/>
    </div>
  );
}

export default App;
