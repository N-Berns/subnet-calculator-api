import { CIDRtoBinarySubnetMask } from "./cidrToBinarySubnetMask";

export function CIDRtoSubnets(cidr: string, hostsNum: number) {
  let binaryMask = CIDRtoBinarySubnetMask(cidr).split(".").join("");

  // Split into octets
  const octets = [
    binaryMask.slice(0, 8),
    binaryMask.slice(8, 16),
    binaryMask.slice(16, 24),
    binaryMask.slice(24, 32),
  ];

  // Count octets that have at least one host bit ("0")
  let hostOctets = 0;
  for (const octet of octets) {
    if (octet.includes("0")) hostOctets++;
  }

  // Total number of addresses in host octets
  const totalAddresses = 256 ** hostOctets;

  // Divide by hosts per subnet to get number of subnets
  return Math.floor(totalAddresses / hostsNum);
}
