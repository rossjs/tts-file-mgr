import { memo } from 'react';
import { useDrag } from 'react-dnd';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ITEM_TYPES } from '../config/constants';

const useStyles = makeStyles({
  itemRoot: {
    border: '1px rgba(0,0,0,0.2) solid',
    borderRadius: 5,
    boxShadow: '1px 2px rgba(0,0,0,0.2)',
    margin: 5,
    textAlign: 'center',
    background: '#fff',
    cursor: 'move',
    opacity: ({ opacity }) => opacity,
  },
  icon: {
    color: 'rgba(200, 100, 255, 0.54)',
    width: '100%',
    height: 80,
  },
});

const WorkshopItem = memo(({ data, isSelected, handleSelect }) => {
  const { id, name, imgUrl } = data;
  const type = ITEM_TYPES.MOD;
  const [{ opacity }, drag] = useDrag(() => ({
    type,
    item: { name },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }), [name, type]);

  const classes = useStyles({ opacity });
  return (
    <Grid item className={classes.item} xs={6} sm={2} md={2} ref={drag} className={classes.itemRoot}>
      <img src={imgUrl} alt={name} className={classes.icon} />
      <Typography className={classes.text}>{name}</Typography>
    </Grid>
  );
});

export default WorkshopItem;
