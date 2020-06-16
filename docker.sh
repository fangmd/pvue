#!/bin/bash

echo "start npm run install & npm run build"

npm install & npm run build

container=$(docker container ls -a | grep vuenginxnew)
if [ -n "$container" ]; then
    echo "container is existed, restart container"
    docker stop vuenginxnew
    docker start vuenginxnew 
else
    echo "container not exist , create & start container success"
    docker run \
    -p 3000:80 \
    -d --name vuenginxnew \
    --mount type=bind,source=/Users/double/webWorkSpace/pvue/nginx,target=/etc/nginx/conf.d \
    --mount type=bind,source=/Users/double/webWorkSpace/pvue/dist,target=/usr/share/nginx/html \
    nginx
fi




