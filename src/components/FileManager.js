import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';

import getAllFiles from '../utils/files/getAllFiles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
  },
  gridList: {
    width: '100vw',
    height: '100vh',
  },
  item: {
    border: '1px rgba(0,0,0,0.2) solid',
    borderRadius: 5,
    boxShadow: '1px 2px rgba(0,0,0,0.2)',
    margin: 5,
    textAlign: 'center',
    background: '#fff',
  },
  icon: {
    color: 'rgba(200, 100, 255, 0.54)',
    width: '100%',
    height: 80,
  },
}));

const FileManager = () => {
  const classes = useStyles();
  const [folderItems, setFolderItems] = useState({ folders: [], mods: [] });
  useEffect(() => {
    getAllFiles().then(setFolderItems);
  }, []);

  const { folders, mods } = folderItems;

  return (
    <div className={classes.root}>
      <Grid container>
        {folders.map((folder) => (
          <Grid item key={folder} className={classes.item} xs={6} sm={2} md={2}>
            <FolderIcon className={classes.icon} />
            <Typography>
              {folder}
            </Typography>
          </Grid>
        ))}
        {mods.map(({ id, name, imgUrl }) => (
          <Grid item key={id} className={classes.item} xs={6} sm={2} md={2}>
            <img src={imgUrl} alt={name} className={classes.icon} />
            <Typography>
              {name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FileManager;
