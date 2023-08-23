#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { setSatellite } from "@junobuild/admin";
import fetch from "node-fetch";
import { Principal } from "@dfinity/principal";

const identity = getIdentity();

const missionControlId = process.argv
  .find((arg) => arg.indexOf(`--mission_control_id`) > -1)
  ?.replace(`--mission_control_id=`, "");
const satelliteId = process.argv
  .find((arg) => arg.indexOf(`--satellite_id`) > -1)
  ?.replace(`--satellite_id=`, "");
const name = process.argv
  .find((arg) => arg.indexOf(`--name`) > -1)
  ?.replace(`--name=`, "");

const missionControl = {
  identity,
  missionControlId,
  fetch,
};

console.log(
  `About to set satellite ID ${satelliteId} (name: ${name}) into the list of satellites of the mission control ID ${satelliteId}.`,
);

try {
  await setSatellite({
    missionControl,
    satelliteId: Principal.fromText(satelliteId),
    satelliteName: name,
  });

  console.log("Done.");
} catch (err) {
  console.error(err);
}
