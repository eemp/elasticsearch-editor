import { combineReducers } from 'redux';
import { GET_DOC, GET_MAPPING, DOC_CHANGE, SAVE_DOC } from '../constants';

function scribe(state, action) {
    var nextState = {force: false};

    if(action.type === GET_DOC ||
        action.type === GET_MAPPING ||
        action.type === DOC_CHANGE ||
        action.type === SAVE_DOC) {
        nextState = Object.assign({}, state, action.data);
        nextState.force = action.type === GET_DOC || action.type === GET_MAPPING ? true : false;
    }

    return nextState;
}

const scribeApp = combineReducers({
    scribe
});

export default scribeApp;
