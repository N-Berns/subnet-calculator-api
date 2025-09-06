import {
  IPValidityCheck,
  SubnetValidityCheck,
  CIDRValidityCheck,
  HostsValidityCheck,
} from "./validityCheck";

import { CIDRtoSubnetMask } from "./cidr/cidrToSubnetMask";
import { CIDRtoWildcardMask } from "./cidr/cidrToWildcardMask";
import { ClassIdentifier } from "./classIdentifier";
import { CIDRtoHosts } from "./cidr/cidrToHosts";
import { CIDRtoSubnets } from "./cidr/cidrToSubnets";
import { CIDRtoBinarySubnetMask } from "./cidr/cidrToBinarySubnetMask";
import { CIDRtoSubnetList } from "./cidr/cidrToSubnetList";
import { Subnet } from "../types/types";
import { SubnetsToCIDR } from "./subnets/subnetsToCidr";
import { HostsToCIDR } from "./hosts/hostsToCidr";

export function mainCalculate(
  ip: string,
  options: { subnets?: string; hosts?: string; cidr?: string }
) {
  const { cidr, subnets, hosts } = options;

  // Run all checks and store results
  const ipCheck = IPValidityCheck(ip);
  const cidrCheck =
    cidr !== undefined
      ? CIDRValidityCheck(cidr)
      : { cidrBool: true, message: "Not provided" };
  const subnetCheck =
    subnets !== undefined
      ? SubnetValidityCheck(subnets)
      : { subnetsNum: 0, subnetBool: true, message: "Not provided" };
  const hostsCheck =
    hosts !== undefined
      ? HostsValidityCheck(hosts)
      : { hostsNum: 0, hostsBool: true, message: "Not provided" };

  const valid =
    cidrCheck.cidrBool && subnetCheck.subnetBool && hostsCheck.hostsBool;

  // Set initial variables
  let message = "None";
  let cidrNum = "";
  let subnetMask = "";
  let wildcardMask = "";
  let binarySubnetMask = "";
  let networkClass = "";
  let hostsNum = 0;
  let usableHostsNum = 0;
  let subnetsNum = 0;
  let subnetList: Subnet[] = [];

  // Second Parameters
  if (valid) {
    if (cidr) {
      calculate(cidr);
    } else if (subnets) {
      subnetsNum = subnetCheck.subnetsNum;
      calculate(SubnetsToCIDR(subnetsNum.toString()));
    } else if (hosts) {
      hostsNum = hostsCheck.hostsNum;

      console.log(hostsNum);

      calculate(HostsToCIDR(hostsNum).toString());
    }
  }

  // Calculation
  function calculate(cidr: string) {
    cidrNum = cidr;

    if (cidr == "32") {
      message =
        "/32 is a single-host prefix (host route). Network/broadcast are the same address; no extra usable hosts.";
      hostsNum = usableHostsNum = 1;
      subnetsNum = CIDRtoSubnets(cidr, hostsNum);
      subnetList.push({
        networkID: ip,
        firstUsable: ip,
        lastUsable: ip,
        broadcastID: ip,
      });
    } else if (cidr == "31") {
      message =
        "Using RFC3021: /31 treated as point-to-point; both addresses are usable.";
      hostsNum = CIDRtoHosts(cidr);
      usableHostsNum = hostsNum - 2;
      subnetsNum = CIDRtoSubnets(cidr, hostsNum);
      subnetList = CIDRtoSubnetList(
        ip,
        cidr,
        subnetsNum,
        hostsNum,
        CIDRtoBinarySubnetMask(cidr)
      );
    } else {
      hostsNum = CIDRtoHosts(cidr);
      usableHostsNum = hostsNum - 2;
      subnetsNum = CIDRtoSubnets(cidr, hostsNum);
      subnetList = CIDRtoSubnetList(
        ip,
        cidr,
        subnetsNum,
        hostsNum,
        CIDRtoBinarySubnetMask(cidr)
      );
    }

    subnetMask = CIDRtoSubnetMask(cidr);
    wildcardMask = CIDRtoWildcardMask(cidr);
    binarySubnetMask = CIDRtoBinarySubnetMask(cidr);
    networkClass = ClassIdentifier(ip);
  }

  // Result output
  return {
    request: {
      ipAddress: ip,
      cidr: cidr !== undefined ? cidr : "Not provided",
      subnets: subnets !== undefined ? subnets : "Not provided",
      hosts: hosts !== undefined ? hosts : "Not provided",
    },
    validityCheck: {
      ip: { isValid: ipCheck.IPBool, message: ipCheck.message },
      cidr: { isValid: cidrCheck.cidrBool, message: cidrCheck.message },
      subnet: { isValid: subnetCheck.subnetBool, message: subnetCheck.message },
      hosts: { isValid: hostsCheck.hostsBool, message: hostsCheck.message },
    },
    result: {
      message: message,
      cidr: `/${cidrNum}`,
      subnetMask: subnetMask,
      wildcardMask: wildcardMask,
      binarySubnetMask: binarySubnetMask,
      networkClass: networkClass,
      totalIPs: hostsNum,
      usableIPs: usableHostsNum,
      subnets: subnetsNum,
      subnetList: subnetList,
    },
  };
}
