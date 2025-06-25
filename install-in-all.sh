#!/bin/bash

cd api-server
echo "Installing in api-server..."
npm i 

cd ../engine
echo "Installing in engine..."
npm i

cd ../ws-server
echo "Installing in ws-server..."
npm i 

cd ../db-processor
echo "Installing in db-processor..."
npm i

cd ../mm
echo "Installing in mm..."
npm i