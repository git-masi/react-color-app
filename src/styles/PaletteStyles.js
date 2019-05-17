import sizes from '../styles/sizes';

export default {
  palette: {
    height: '100vh',
    overflow: 'hidden',
  },
  
  paletteColors: {
    height: '90vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    
    [sizes.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    },
  },
  
  paletteFooter: {
    paddingRight: '1rem',
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}