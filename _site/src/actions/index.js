import elasticsearch from 'elasticsearch';
import { GET_DOC, GET_MAPPING, DOC_CHANGE, SAVE_DOC } from '../constants';

let esclient = new elasticsearch.Client({
    host: 'localhost:9200', // TODO: avoid hardcoding
});

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

export function saveDocument(index, type, id, text) {
    var updatedDoc = JSON.parse(text);

    return dispatch => {
        return esclient.index({
            index: index,
            type: type,
            id: id,
            body: updatedDoc
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

