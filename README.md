# elasticsearch-editor
Elasticsearch site plugin to edit JSON records

## Dev Notes

Since this is a site plugin, all the key files reside in `_site` directory.  `_site/index.html` acts as the entry point for the plugin and call in some bundled javascript.

### Tools

* React.js
* Redux
* Material-UI
* Official Elasticsearch JS Client
* Sass

### Dev work

In order to make changes to the plugin, work in the `_site/src` directory.  To build and bundle the javascript:

```bash
npm run build-js
```

To use watchify:

```bash
npm run watch-js
```

### Styling

Currently, the styles are inlined, but if there is any reuseable blocks, add some SASS to `_site/src/sass` directory.  To build:

```bash
npm run build-css
```

To watch:

```bash
npm run watch-css
```

## Roadmap

* Refactor entire plugin
 * support editing of multiple docs
 * vertical split - show doc + mapping
* basic functionality
 * create
 * delete
 * action log
 * error handling
  * insufficient information specified
  * fail to retrieve doc
  * fail to save
* enhancements
 * allow mapping modifications and updates
 * enforce versions
 * merges

