import { memo } from 'react';
import { useDrop } from 'react-dnd';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';

import { ITEM_TYPES } from '../config/constants';

const useStyles = makeStyles({
  folderRoot: {
    border: '1px rgba(0,0,0,0.2) solid',
    borderRadius: 5,
    boxShadow: '1px 2px rgba(0,0,0,0.2)',
    margin: 5,
    textAlign: 'center',
    background: '#fff',
    backgroundColor: ({ isActive }) => (isActive ? 'rgba(123,215,50,0.5)' : 'white'),
  },
  icon: {
    color: 'rgba(200, 100, 255, 0.54)',
    width: '100%',
    height: 80,
  },
});

const Folder = memo(({ folder, handleDrop }) => {
  const onDrop = ({ id }) => {
    handleDrop({ id, folder });
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ITEM_TYPES.MOD],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;

  const classes = useStyles({ isActive });

  // const activeText = isActive ? 'Release to drop' : '';
  return (

    <Grid item ref={drop} className={classes.folderRoot} xs={6} sm={2} md={2}>
      <FolderIcon className={classes.icon} />
      <Typography>
        {folder}
      </Typography>
    </Grid>
  );
});

export default Folder;
