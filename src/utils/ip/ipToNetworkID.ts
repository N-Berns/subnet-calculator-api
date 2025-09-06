export function IPtoNetworkID(
  ip: string,
  hostsNum: number,
  binSubnetMask: string
) {
  let networkID = "";
  let digits = 0;
  let dots = 0;

  // IP to Binary
  const binIP = ip
    .split(".")
    .map((oct) => Number(oct).toString(2).padStart(8, "0"))
    .join("");

  const binSM = binSubnetMask.split(".").join("");

  // Determine Network ID
  for (let bit = 0; bit < binSM.length; bit++) {
    const bitRef = binSM[bit];

    if (bitRef == "1") networkID += binIP[bit];
    else networkID += "0";

    digits++;

    if (dots != 3 && digits == 8) {
      networkID += ".";
      dots++;
      digits = 0;
    }
  }

  const networkIDoctets = networkID.split(".").map((oct) => parseInt(oct, 2));

  // Set octet to 0 based on # of hosts
  if (hostsNum < 256) networkIDoctets[3] = 0;
  else if (hostsNum >= 256 && hostsNum <= 256 ** 2) {
    networkIDoctets[2] = networkIDoctets[3] = 0;
  } else if (hostsNum > 256 ** 2 && hostsNum <= 256 ** 3) {
    networkIDoctets[1] = networkIDoctets[2] = networkIDoctets[3] = 0;
  } else {
    networkIDoctets[0] =
      networkIDoctets[1] =
      networkIDoctets[2] =
      networkIDoctets[3] =
        0;
  }
  return networkIDoctets.join(".");
}
