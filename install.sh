#!/bin/bash

clear

cd server; touch .env ormconfig.json; npm install & cd ../client; touch .env; npm install
