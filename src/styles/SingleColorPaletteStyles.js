import sizes from '../styles/sizes';

export default {
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  
  boxContainer: { 
    height: '90vh',  
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridTemplateColumns: 'repeat(5, 1fr)',

    [sizes.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    },
  },

  'back-box': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'black',
  },

  backButton: {
    width: '100px',
    height: '30px',
    display: 'inline-block',
  
    fontSize: '1rem',
    lineHeight: '30px',
    textAlign: 'center',
    
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    border: 'none',

    textTransform: 'uppercase'
  },

  PaletteFooter: {
    paddingRight: '1rem',
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textTransform: 'uppercase'
  }
}