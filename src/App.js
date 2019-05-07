import React from 'react';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';

const App = () => {
  return (
    <div>
      <Palette {...generatePalette(seedPalettes[0])}/>
    </div>
  );
}

export default App;
