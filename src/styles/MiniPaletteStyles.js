export default {
  root: {
    position: 'relative',
    height: '100%',
    minHeight: '160px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    border: '.1rem solid rgba(0,0,0,0.3)',
    borderRadius: '.5rem',
    cursor: 'pointer',

    '&:hover > $fab': {
      opacity: 1,
    }
  },
  
  miniBoxes: {
    width: '100%',
    flex: '5',
    display: 'grid',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridTemplateColumns: 'repeat(5, 1fr)',
    borderRadius: '.5rem',
    overflow: 'hidden',
  },

  paletteText: {
    width: '100%',
    flex: '1',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  fab: {
    position: 'absolute !important',
    top: '.2rem',
    right: '.2rem',
    opacity: 0,
    transition: 'all 180ms ease-in-out !important',
  },
};