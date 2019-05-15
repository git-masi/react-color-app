import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';
import { withStyles } from '@material-ui/styles';
import sizes from '../styles/sizes';
// import lifecycle from 'react-pure-lifecycle';

const styles = {
  boxContainer: {
    width: '100%',
    height: '100%',
    display: 'grid',
    // gridTemplateColumns: 'repeat(5, 1fr)',
    // gridTemplateRows: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',

    // [sizes.down('md')]: {
    //   gridTemplateColumns: 'repeat(4, 1fr)',
    // },

    // [sizes.down('sm')]: {
    //   gridTemplateColumns: 'repeat(2, 1fr)',
    //   gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    // },

    // [sizes.down('xs')]: {
    //   gridTemplateColumns: '1fr',
    //   gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    // },

    
  }
}

class DraggableColorList extends Component {
  // static defaultProps = {
  //   container: document.getElementById('boxContainer')
  // }
  state = {
    globalID: null
  }

  componentDidMount() {
    // this.state.globalID = window.requestAnimationFrame(this.changeGrid);
    window.requestAnimationFrame(this.changeGrid);
  }

  // componentWillUnmount() {
  //   cancelAnimationFrame(this.state.globalID)
  // }

  changeGrid = () => {
    const container = document.getElementById('boxContainer');
    
    switch (true) {
      case container.clientWidth < 575.98:
        container.style.gridTemplateColumns = '1fr'    
        break;
      case container.clientWidth < 767.98:
        container.style.gridTemplateColumns = 'repeat(2, 1fr)'    
        break;
      case container.clientWidth < 991.98:
        container.style.gridTemplateColumns = 'repeat(4, 1fr)'    
        break;
      default:
        container.style.gridTemplateColumns = 'repeat(5, 1fr)'
        break;
    }
    window.requestAnimationFrame(this.changeGrid);
  }

  
  render() {
    // const container = document.getElementById('boxContainer');
    // const globalID = window.requestAnimationFrame(this.changeGrid)

    const { classes, deleteBoxHandler, paletteColors } = this.props
    return (
      <div className={classes.boxContainer} id="boxContainer">
        {paletteColors.map((c, i) => (
          <DraggableColorBox
            index={i}
            deleteBoxHandler={() => deleteBoxHandler(c.name)}
            color={c.color}
            name={c.name}
            key={c.name}
          />
          )
        )}
      </div>
    )
  }
}

export default SortableContainer(withStyles(styles)(DraggableColorList));