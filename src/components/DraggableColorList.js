import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';
import { withStyles } from '@material-ui/styles';

const styles = {
  boxContainer: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
  }
}

const DraggableColorList = ({ paletteColors, deleteBoxHandler, classes }) => {
  return (
    <div className={classes.boxContainer}>
      {paletteColors.map((c, i) => (
        <DraggableColorBox
          index={i}
          deleteBoxHandler={() => deleteBoxHandler(c.id)}
          color={c.color}
          name={c.name}
          key={c.id}
          id={c.id}
        />
        )
      )}
    </div>
  )
}

export default SortableContainer(withStyles(styles)(DraggableColorList));