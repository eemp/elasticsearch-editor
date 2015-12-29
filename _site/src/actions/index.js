import elasticsearch from 'elasticsearch';

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
        index: response._index,
        id: response._id,
        type: response._type,
        data: response._source,
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

export function saveDocument(index, mapping, id, data) {
    return {
        index: index,
        type: mapping,
        id: id,
        data: data,
    };
}

