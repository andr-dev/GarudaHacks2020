#!/bin/bash

build() {
    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    yarn build
}

build