#!/bin/bash

set -e;

source ../../../../autobuild/common_include.sh;

if command -v npm --version &> /dev/null; then
	npm install;
	npm run build;

	DEST_DIR=${AUTOBUILD_OUT_DIR}/virola_web_client

	rm -rf ${DEST_DIR}
	mkdir -p ${DEST_DIR}

	cp -r dist/* ${DEST_DIR}/
fi