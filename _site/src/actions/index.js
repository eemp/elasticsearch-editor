import { GET_DOC, GET_MAPPING, DOC_CHANGE, SAVE_DOC, SETTINGS_CHANGE } from '../constants';

function receiveDocument(response) {
    return {
        type: GET_DOC,
        data: {
            index: response._index,
            id: response._id,
            type: response._type,
            doc: response._source,
        }
    };
}

function receiveMapping(index, type, response) {
    index = aliases[index] ? aliases[index] : index;
    return {
        type: GET_MAPPING,
        data: {
            mapping: response[index].mappings[type],
        }
    };
}

function receiveResponseToIndex(response) {
    return {
        type: SAVE_DOC,
    };
}

export function getDocument(index, type, id) {
    return dispatch => {
        return esclient.get({
            index: index,
            type: type,
            id: id,
        }).then(res => {
            dispatch(receiveDocument(res));
        });
    };
}

export function getMapping(index, type) {
    return dispatch => {
        return esclient.indices.getMapping({
            index: index,
            type: type,
        }).then(res => {
            dispatch(receiveMapping(index, type, res));
        });
    };
}

export function saveDocument(index, type, id, data) {
    return dispatch => {
        return esclient.index({
            index: index,
            type: type,
            id: id,
            body: data
        }).then(res => {
            dispatch(receiveResponseToIndex(res));

            // TODO: assuming here that save succeeded
            dispatch(getDocument(index, type, id));
            dispatch(getMapping(index, type, id));
        });
    };
}

export function handleDocumentChange(text) {
    return {
        type: DOC_CHANGE,
        data: {
            changed_doc: text,
        }
    };
}

export function updateSettings(data) {
    return {
        type: SETTINGS_CHANGE,
        data
    };
}

