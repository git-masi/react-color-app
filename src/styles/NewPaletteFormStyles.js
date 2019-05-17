import { theme } from '@material-ui/core/styles';
import dWidth from '../drawerWidth';
import sizes from '../styles/sizes';

const drawerWidth = dWidth;

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    overflow: 'hidden',
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,

    [sizes.down('xs')]: {
      width: '100vw',
    },
  },

  drawerPaper: {
    width: drawerWidth,

    [sizes.down('xs')]: {
      width: '100vw',
    },
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  drawerContent: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& > *': {
      marginBottom: '1rem',
      width: '94% !important',
      textAlign: 'center',
    },

    '& button': {
      fontSize: '1.4rem !important',
    },
  },

  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,

    [sizes.down('xs')]: {
      marginLeft: '-100vw',
    },
  },
  
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

export default styles;