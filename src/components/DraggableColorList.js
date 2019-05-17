import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';
import { withStyles } from '@material-ui/styles';

const styles = {
  boxContainer: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
  }
}

class DraggableColorList extends Component {
  globalID = null;

  componentDidMount() {
    window.requestAnimationFrame(this.changeGrid);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.globalID)
  }

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
    this.globalID = window.requestAnimationFrame(this.changeGrid);
  }

  
  render() {
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