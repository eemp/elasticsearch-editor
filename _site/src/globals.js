import elasticsearch from 'elasticsearch';
import { GLOBAL_REFRESH_RATE } from './constants';

let host = 'localhost:9200'; // default
if(document.location.href.match(/_plugin/)) { // actually a plugin
    host = document.location.host;
}

let esclient = new elasticsearch.Client({
    host: host,
});

global.host = host;
global.esclient = esclient;

let indices = [],
    aliases = {},
    mappings = {};

global.indices = indices;
global.aliases = aliases;
global.mappings = mappings;

getIndicesInformation();
setInterval(getIndicesInformation, GLOBAL_REFRESH_RATE);

getMappingInformation();
setInterval(getMappingInformation, GLOBAL_REFRESH_RATE);

function getIndicesInformation() {
    esclient.indices.getAliases(function(err, res) {
        if(err) {
            console.error('ERROR: unable to retrieve indices information - ', err);
            return;
        }

        let curr_indices = Object.keys(res);

        // indices.splice(0, indices.length, ...curr_indices);
        global.indices = curr_indices;

        let curr_aliases = {};
        for(let idx in res) {
            curr_aliases = Object.keys(res[idx].aliases).reduce(function(map, alias) {
                map[alias] = idx;
                return map;
            }, curr_aliases);
        }

        global.aliases = curr_aliases;
    });
}

function getMappingInformation() {
    esclient.indices.getMapping(function(err, res) {
        if(err) {
            console.error('ERROR: unable to retrieve mapping information - ', err);
            return;
        }

        global.mappings = res;
    });
}

