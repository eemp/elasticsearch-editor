import { combineReducers } from 'redux';
import { GET_DOC, GET_MAPPING, DOC_CHANGE, SAVE_DOC, SETTINGS_CHANGE } from '../constants';

function scribe(state, action) {
    var nextState = {force: false};

    if(action.type === GET_DOC ||
        action.type === GET_MAPPING ||
        action.type === DOC_CHANGE ||
        action.type === SAVE_DOC ||
        action.type === SETTINGS_CHANGE) {
        nextState = Object.assign({}, state, action.data);
        nextState.force = action.type === GET_DOC || 
            action.type === GET_MAPPING ||
            action.type === SETTINGS_CHANGE ? true : false;
    }

    return nextState;
}

const scribeApp = combineReducers({
    scribe
});

export default scribeApp;
