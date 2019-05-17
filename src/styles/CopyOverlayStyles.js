export default {
  copyOverlay: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: '0',
    opacity: '0',
    transform: 'scale(.1)',
    transition: 'transform 800ms ease-in-out',
  },

  message: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  
    color: 'white',
    opacity: 0,
    transform: 'scale(.1)',
    transition: 'all 400ms ease-in-out 400ms',

    '& h2': {
      margin: 0,
      padding: '1rem 0 2rem 0',
      width: '100%',
    
      fontSize: '6rem',
      fontWeight: 400,
      textShadow: '.1rem .2rem black',
      background: 'rgba(255,255,255,0.2)',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    
    '& p': {
      fontSize: '2rem',
      fontWeight: 100,
    },
  },

  copyOverlayShow: {
    zIndex: 10,
    opacity: 1,
    transform: 'scale(50)',
  },

  messageShow: {
    zIndex: 11,
    opacity: 1,
    transform: 'scale(1)',  
  },
  
  'h2light-color': {
    background: 'rgba(0,0,0,.3) !Important'
  },
  
  'plight-color': {
    color: 'black'
  }
}