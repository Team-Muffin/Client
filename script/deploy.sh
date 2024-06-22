#!/bin/bash

if [ -z "$1"]; then
  echo 'No arg passed'
  exit 1
fi

IMAGE_NAME=$1

echo 'pull docker image'
docker pull bkkmw/${IMAGE_NAME}

echo 'clean existing file'
rm -rf ./output/

echo 'execute container'
mkdir output
docker run --name ${IMAGE_NAME} -v ./output:/output -d bkkmw/${IMAGE_NAME}

echo 'remove existing files'
rm -rf /home/ubuntu/ws/nginx/html/
cp -rfT ./output/ /home/ubuntu/ws/nginx/html/

echo 'remove container'

docker rm ${IMAGE_NAME}

exit 0
