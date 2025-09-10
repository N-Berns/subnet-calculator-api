import { Subnet } from "../../types/types";
import { IPtoNetworkID } from "../ip/ipToNetworkID";

export function CIDRtoSubnetList(
  ip: string,
  cidr: string,
  subnetsNum: number,
  hostsNum: number,
  binSM: string
) {
  let ipStart = ip;
  let ipEnd = "";

  let networkID = IPtoNetworkID(ip, hostsNum, binSM);
  let broadcastID = "";

  let subnetsList: Subnet[] = [];

  const divNum = Math.floor(Math.log(hostsNum) / Math.log(256));
  const remainder = hostsNum / Math.pow(256, divNum);

  while (subnetsNum > 0) {
    let ipArray = networkID.split(".");

    // Starting usable IP
    ipArray[3] = (parseInt(ipArray[3], 10) + 1).toString();
    ipStart = ipArray.join(".");

    // Ending usable IP
    // Calculations for exceeded byte range
    if (hostsNum < 256) {
      ipArray[3] = (parseInt(ipArray[3], 10) + hostsNum - 3).toString();
    } else {
      for (let i = divNum; i > 0; i--) {
        if (i == 1) ipArray[3] = "254";
        else ipArray[-(i - 4)] = "255";
      }

      ipArray[-(divNum - 3)] = (
        parseInt(ipArray[-(divNum - 3)], 10) +
        remainder -
        1
      ).toString();
    }

    ipEnd = ipArray.join(".");

    if (cidr == "32") ipEnd = ipStart;

    // Broadcast ID
    ipArray[3] = (parseInt(ipArray[3], 10) + 1).toString();
    broadcastID = ipArray.join(".");

    subnetsList.push({
      networkID: networkID,
      firstUsable: ipStart,
      lastUsable: ipEnd,
      broadcastID: broadcastID,
    });

    // Network ID
    // 4th Octet exceeds byte range
    if (parseInt(ipArray[3], 10) + 1 > 255) {
      ipArray[2] = (parseInt(ipArray[2], 10) + 1).toString();
      ipArray[3] = "0";

      // 3rd Octet exceeds byte range
      if (parseInt(ipArray[2], 10) + 1 > 255) {
        ipArray[1] = (parseInt(ipArray[1], 10) + 1).toString();
        ipArray[2] = ipArray[3] = "0";

        // 2nd Octet exceeds byte range
        if (parseInt(ipArray[1], 10) + 1 > 255) {
          ipArray[0] = (parseInt(ipArray[0], 10) + 1).toString();
          ipArray[1] = ipArray[2] = ipArray[3] = "0";
        }
      }
    } else {
      ipArray[3] = (parseInt(ipArray[3], 10) + 1).toString();
    }
    networkID = ipArray.join(".");

    // IP Start
    ipArray[3] = parseInt(ipArray[3], 10).toString();
    ipStart = ipArray.join(".");

    subnetsNum--;
  }

  return subnetsList;
}
