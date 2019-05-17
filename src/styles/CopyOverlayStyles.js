export default {
  copyOverlay: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'none',
    zIndex: '0',
    opacity: '0',
  },

  message: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'none',
    zIndex: '0',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  
    color: 'white',
    opacity: 0,

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
    display: 'block',
    zIndex: 10,
    animationName: '$zoomInOverlay',
    animationDuration: '1800ms',
    animationTimingFunction: 'ease-in-out',
  },
  
  messageShow: {
    display: 'flex',
    zIndex: 11,
    animationName: '$zoomInMessage',
    animationDuration: '1400ms',
    animationDelay: '400ms',
    animationTimingFunction: 'ease-in-out',
  },
  
  'h2light-color': {
    background: 'rgba(0,0,0,.3) !Important'
  },
  
  'plight-color': {
    color: 'black'
  },

  '@keyframes zoomInOverlay': {
    '0%': {
      transform: 'scale(.1)',
      opacity: 0
    },
    '25%': {
      transform: 'scale(50)',
      opacity: 1
    },
    '75%': {
      transform: 'scale(50)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(.1)',
      opacity: 0
    }
  },

  '@keyframes zoomInMessage': {
    '0%': {
      transform: 'scale(.1)',
      opacity: 0
    },
    '15%': {
      transform: 'scale(1)',
      opacity: 1
    },
    '60%': {
      transform: 'scale(1)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(.1)',
      opacity: 0
    }
  },
}