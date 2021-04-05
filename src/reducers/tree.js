// action type constants
export const GET_TREE = 'GET_TREE';
export const SET_TREE = 'SET_TREE';
export const MOVE_INTO_FOLDER = 'MOVE_INTO_FOLDER';

// actionCreators
export const getTree = () => ({ type: GET_TREE });
export const setTree = (tree) => ({ type: SET_TREE, tree });
export const moveIntoFolder = ({ ids, folder }) => ({ type: MOVE_INTO_FOLDER, ids, folder });

const initialState = {
  folders: [],
  workshopItems: [],
  selected: [],
};

// reducer
const reducer = (state = initialState, { type, tree }) => {
  switch (type) {
    case SET_TREE:
      return { ...tree, selected: [] };
    default:
      return state;
  }
};

export default reducer;
