export function CIDRtoBinarySubnetMask(cidr: string) {
  const binSM =
    "1".repeat(parseInt(cidr, 10)) + "0".repeat(32 - parseInt(cidr, 10));

  let result = "";

  for (let i = 0; i < 4; i++) {
    result += binSM.slice(i * 8, (i + 1) * 8);
    if (i != 3) result += ".";
  }

  return result;
}
