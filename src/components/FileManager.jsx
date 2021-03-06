import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Folder from './Folder';
import WorkshopItem from './WorkshopItem';

import { createDispatchBindings } from '../utils/redux';
import { getTree, moveIntoFolder } from '../reducers/tree';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
  },
}));

const FileManager = ({ folders, workshopItems, getTree, moveIntoFolder }) => {
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => history.listen(getTree), []);
  // get tree on load
  useEffect(() => { getTree(); }, [getTree]);

  const [selected, setSelected] = useState(new Set());

  // reset selection if tree changes
  useEffect(() => { setSelected(new Set()); }, [folders, workshopItems]);

  const handleDrop = ({ id, folder }) => {
    if (selected.size && selected.has(id)) {
      return moveIntoFolder({ ids: Array.from(selected), folder });
    }
    moveIntoFolder({ ids: [id], folder });
  };

  const handleSelect = (id) => (event) => {
    // event.stopPropagation();
    const { metaKey, ctrlKey } = event;
    // if mutli-selecting via cmd/ctrl
    if (metaKey || ctrlKey) {
      if (selected.has(id)) {
        selected.delete(id);
        return setSelected(new Set(selected));
      }
      selected.add(id);
      return setSelected(new Set(selected));
    }

    if (selected.has(id)) return setSelected(new Set());

    setSelected(new Set([id]));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.root}>
        <Grid container>
          {folders.map((folder) => (
            <Folder folder={folder} key={folder} handleDrop={handleDrop} />
          ))}
          {workshopItems.map((data, index) => (
            <WorkshopItem data={data} key={data.id} selected={selected.has(data.id)} handleSelect={handleSelect} />
          ))}
        </Grid>
      </div>
    </DndProvider>
  );
};

const mapStateToProps = ({ tree }) => ({ ...tree });
const mapDispatchToProps = createDispatchBindings({ getTree, moveIntoFolder });

export default connect(mapStateToProps, mapDispatchToProps)(FileManager);
