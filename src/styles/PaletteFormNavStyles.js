import sizes from '../styles/sizes';
import dWidth from '../drawerWidth';

const drawerWidth = dWidth;

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  hide: {
    display: 'none',
  },
  toolBarLeft: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    
    '& button': {
      marginRight: '1rem',
      marginLeft: '-16px',
    },
  },
  toolBarRight: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',

    '& > :first-child': {
      marginRight: '1rem',

      [sizes.down('xs')]: {
        marginRight: '.2rem',
      },
    },

    '& button': {
      [sizes.down('xs')]: {
        padding: '.6rem 1rem',
      }
    }
  },
})

export default styles;