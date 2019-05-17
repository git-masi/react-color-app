import sizes from '../styles/sizes';

export default {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    cursor: 'grab',
  },

  boxContent: {
    padding: '.7rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    textTransform: 'uppercase',
    color: '#555',
    fontSize: '1.2rem',

    [sizes.down('xs')]: {
      padding: '.3rem',
    },
  },

  deleteIcon: {
    padding: '.2rem',
    background: 'rgba(255,255,255,0.3)',
    borderRadius: '50%',
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'all 200ms ease-in-out',

    '&:hover': {
      color: 'white',
      background: 'rgba(255,255,255,0.0)',
      transform: 'scale(1.5)',
    },

    [sizes.down('xs')]: {
      transform: 'scale(.9)',
    },
  },

  darkColor: {
    color: 'white',
  }
}