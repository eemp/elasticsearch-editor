class MappingPropsCompleter {
    constructor(mapping) {
        this.setMapping(mapping);
    }

    setMapping(mapping) {
        if(mapping) this.mapping = mapping;
    }

    aceCompleter() {
        let self = this;

        function getAllProperties(mapping) {
            const MAPPING = 'mapping';
            let props = [];

            for(let prop in mapping.properties) {
                let def = mapping.properties[prop];
                let propType = def.type;
                let propAnalyzer = def.analyzer;
                let meta = MAPPING + ' (' + propType + ')';

                if(propType === 'string' && propAnalyzer)
                    meta = MAPPING + ' (' + propType + ':' + propAnalyzer + ')';

                props.push({
                    name: prop,
                    value: prop,
                    meta: meta,
                });

                if(def.properties) {
                    let nestedProps = getAllProperties(def);
                    props.concat(nestedProps);
                }
            }

            return props;
        }

        return {
            getCompletions: function(editor, session, pos, prefix, callback) {
                let props = [];

                // TODO: very simple completer... no context basis
                if(self.mapping) props = getAllProperties(self.mapping);

                callback(null, props);
            }
        };
    }
}

module.exports = MappingPropsCompleter;

