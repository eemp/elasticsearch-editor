import { combineReducers } from 'redux';

function scribe(state, action) {
    return action;
}

const scribeApp = combineReducers({
    scribe
});

export default scribeApp;
