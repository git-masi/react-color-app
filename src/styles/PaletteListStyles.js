// background by SVGBackgrounds.com
import backgroundSVG from '../assets/images/rainbow-vortex-blue-purple.svg';
import sizes from '../styles/sizes';

export default {
  '@global': {
    '.fade-exit': {
      opacity: 1,
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 300ms ease-in-out',
    },
  },

  root: {
    padding: '2rem 0',
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: `url(${backgroundSVG})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    
    '& header': {
      marginBottom: '1rem',
      width: '60%',
      maxWidth: '900px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',

      [sizes.down('md')]: {
        width: '80%',
      },

      '& h1': {
        [sizes.down('sm')]: {
          fontSize: '2.8rem',
        },
      },

      '& h1, a': {
        color: 'white',
        lineHeight: '1',
      },
    }
  },
  
  miniPaletteContainer: {
    width: '60%',
    maxWidth: '900px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '.5rem .5rem',

    [sizes.down('md')]: {
      width: '80%',
    },

    [sizes.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
}