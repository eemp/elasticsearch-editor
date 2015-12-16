SERVER=localhost:9200
INDEX=test-index

CURL="curl -w '\n'"

## delete $INDEX if it exists
$CURL -XDELETE $SERVER/$INDEX

## create the test index
$CURL -XPUT $SERVER/$INDEX -d '
    index: 
        number_of_shards : 1
        number_of_replicas : 0
'

## stall or get IndexPrimaryShardNotAllocatedException
sleep 1

## create some analyzers
$CURL -XPOST $SERVER/$INDEX/_close
$CURL -XPUT $SERVER/$INDEX/_settings -d @analyzers.json
$CURL -XPOST $SERVER/$INDEX/_open

## put some mappings
$CURL -XPUT $SERVER/$INDEX/test-mapping-1/_mapping -d @mappings/test-mapping-1.json
$CURL -XPUT $SERVER/$INDEX/test-mapping-2/_mapping -d @mappings/test-mapping-2.json

## put some docs
$CURL -XPUT $SERVER/$INDEX/test-mapping-1/1 -d @docs/test-mapping-1/1.json
$CURL -XPUT $SERVER/$INDEX/test-mapping-1/2 -d @docs/test-mapping-1/2.json
$CURL -XPUT $SERVER/$INDEX/test-mapping-2/1 -d @docs/test-mapping-2/1.json


