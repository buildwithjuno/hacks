# Hacks

A collection of hacks and workarounds for Juno and its outer ecosystem.

## Table of contents

- [Canister to Satellite](#canister-to-satellite)

## Canister to Satellite

This hack aims to transform an existing canister on the IC mainnet into a Juno satellite that can be administered by a developer and their mission control.

1. Collect following principals on Juno's console:

a. Your mission control ID available in [https://console.juno.build/mission-control/](https://console.juno.build/mission-control/)

b. Your developer ID in [https://console.juno.build/settings](https://console.juno.build/settings)

2. Collect your terminal Juno CLI controller ID running `juno whoami`.

3. Ensure that your local dfx principal currently in use is a controller of your existing canister.

Following command must succeed:

```bash
dfx canister status <your-canister-id> --network ic
```

4. Add your two Juno's principals to the list of controllers of your existing canister.

```bash
dfx canister update-settings <your-canister-id> --add-controller <mission-control-id> --network ic
dfx canister update-settings <your-canister-id> --add-controller <developer-id> --network ic
dfx canister update-settings <your-canister-id> --add-controller <cli-id> --network ic
```

5. Edit [canister-to-satellite.sh] to set your Juno's principals and targeted canister ID.

6. Run the script [canister-to-satellite.sh] to transform the canister into a Satellite.

⚠️ Be aware that transforming the canister will wipe its state ⚠️

7. At this point you might want to deploy your dapp to your new Satellite.

- In your dapp project, manually edit the `satelliteId` in `juno.json`.
- Build your dapp if required.
- Deploy running `juno deploy`.

8. Finally, we need to add your new satellite to your mission control. That way, it shall appear in Juno's console.

```bash
npm ci
npm run set-satellite -- --mission_control_id=<mission-control-id> --satellite_id=<your-canister-id> --name=<a-name-for-your-satellite>
```
