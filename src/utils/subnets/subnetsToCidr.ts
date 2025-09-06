import { CIDRtoHosts } from "../cidr/cidrToHosts";
import { CIDRtoSubnets } from "../cidr/cidrToSubnets";

export function SubnetsToCIDR(subnets: string) {
  let newCIDR = "";

  for (let i = 32; i > 0; i--) {
    let tempCIDR = i.toString();

    if (CIDRtoSubnets(tempCIDR, CIDRtoHosts(tempCIDR)) == Number(subnets)) {
      newCIDR = tempCIDR;
      break;
    }
  }

  return newCIDR;
}
