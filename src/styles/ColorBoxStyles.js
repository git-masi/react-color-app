export default {
  colorBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover $copyButton': {
      opacity: 1,
      transition: '0.5s',
    },
  },
  
  copyButton: {
    width: '100px',
    height: '25px',
    display: 'inline-block',
    zIndex: 9,
  
    fontSize: '1rem',
    lineHeight: '25px',
    textAlign: 'center',
    
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    border: 'none',
    opacity: 0,
    
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  
  boxContent: {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    padding: '3px 10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    color: 'white',
    width: '60px',
    height: '25px',
    textAlign: 'center',
    lineHeight: '25px',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  
  darkColor: {
    color: 'white',
  },
  
  lightColor: {
    background: 'rgba(0, 0, 0, 0.7)',
  },
}