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
    background: ({ selected }) => (selected ? 'pink' : '#fff'),
    cursor: 'move',
    opacity: ({ opacity }) => opacity,
  },
  icon: {
    color: 'rgba(200, 100, 255, 0.54)',
    width: '100%',
    height: 80,
  },
});

const WorkshopItem = memo(({ data, selected, handleSelect }) => {
  const { id, name, imgUrl } = data;
  const type = ITEM_TYPES.MOD;
  const [{ opacity }, drag] = useDrag(() => ({
    type,
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }), [id]);

  const classes = useStyles({ opacity, selected });
  return (
    <Grid item xs={6} sm={2} md={2} ref={drag} className={classes.itemRoot} onClick={handleSelect(id)}>
      <img src={imgUrl} alt={name} className={classes.icon} />
      <Typography className={classes.text}>{name}</Typography>
    </Grid>
  );
});

export default WorkshopItem;
