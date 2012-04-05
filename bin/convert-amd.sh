#!/bin/bash

path=`dirname $0`
SOURCE="$path/../"
if [ -z $1 ]; then
	DEST="$path/../amd"
else
	DEST="$path/../$1"
fi

# create amd folder
if [ -e $DEST ]; then rm -rf $DEST; fi
mkdir $DEST

# copy all files
cp -r $SOURCE/collection $DEST/collection
cp -r $SOURCE/es5 $DEST/es5
cp -r $SOURCE/prime $DEST/prime
cp -r $SOURCE/types $DEST/types
cp -r $SOURCE/util $DEST/util
cp $SOURCE/main.js $DEST/main.js
mv $DEST/prime/index.js $DEST/prime.js

# wrap with define(function(){...})
for FILE in `find $DEST -name '*.js'`;
do
	JS="define(function(require, exports, module){
`cat $FILE`
});"
	# use -E option, to make sure \\ is not converted
	echo -E "$JS" > $FILE
done
