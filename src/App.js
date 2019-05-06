import React from 'react';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';

const App = () => {
  return (
    <div>
      <Palette {...generatePalette(seedPalettes[4])}/>
    </div>
  );
}

export default App;
