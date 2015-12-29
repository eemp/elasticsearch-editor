import elasticsearch from 'elasticsearch';
import { GET_DOC, DOC_CHANGE, SAVE_DOC } from '../constants';

let esclient = new elasticsearch.Client({
    host: 'localhost:9200', // TODO: avoid hardcoding
});

const type = 'scribetest';
const id = '4ae2d32c';
let defaultData = {
    type: type,
    id: id,
    data: {
        id: id,
        type: type,
        name: 'simple test',
        description: 'this is a test',
    }
};

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

function receiveResponseToIndex(response) {
    return {
        type: SAVE_DOC,
        data: {}
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
        });
    };

    return {
        type: SAVE_DOC,
        data: {
            index: index,
            type: mapping,
            id: id,
            doc: data,
        }
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

