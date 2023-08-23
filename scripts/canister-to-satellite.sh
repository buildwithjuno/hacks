#!/usr/bin/env bash

CANISTER_ID=edit-canister-id

MISSION_CONTROL_ID=edit-mission-control-id
DEVELOPER_ID=edit-developer-id
CLI_ID=edit-cli-id

DFX_ID=$(dfx identity get-principal)

JUNO_VERSION=v0.0.16
SATELLITE_VERSION=v0.0.11

curl -L -o satellite.wasm.gz "https://github.com/buildwithjuno/juno/releases/download/${JUNO_VERSION}/satellite-${SATELLITE_VERSION}.wasm.gz"

dfx canister install ${CANISTER_ID} --argument '(record { controllers = vec { principal"'${MISSION_CONTROL_ID}'"; principal"'${DEVELOPER_ID}'"; principal"'${CLI_ID}'"; principal"'${DFX_ID}'";} })' --mode reinstall
