import colorWheel from '../assets/images/color-wheel-solid.png';
import sizes from '../styles/sizes';

export default {
  root: {
    height: '6vh',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },

  logo: {
    padding: '0 1rem',
    height: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    fontSize: '2rem',
    background: 'lightgray',
    
    [sizes.down('sm')]: {
      display: 'none',
    },
  },
  
  cycleColors: {
    transition: 'all 1.6s ease-in-out',
  },
  
  sliderContainer: {
    padding: '0 1rem',
    height: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',

    [sizes.down('sm')]: {
      padding: '0 .5rem',
    },

    '& .rc-slider': {
      padding: '0 1rem',
      width: '400px',
      display: 'inline-block',

      [sizes.down('md')]: {
        width: '320px',
      },

      [sizes.down('sm')]: {
        padding: '0 .5rem',
        width: '280px',
      },

      [sizes.down('xs')]: {
        width: '200px',
      },
    },

    '& .rc-slider-rail': {
      marginTop: '4px',
      background: '#b3d8fb',
    },

    '& .rc-slider-handle': {
      marginTop: '-4px',
      width: '24px',
      height: '24px',
      border: 'none',
      background: `url(${colorWheel})`,
      
      '&:focus': {
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
      },
    },
  },

  levelDisp: {
    [sizes.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  
  backButton: {
    display: 'none',

    [sizes.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
}