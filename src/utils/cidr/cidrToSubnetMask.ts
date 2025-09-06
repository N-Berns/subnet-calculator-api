export function CIDRtoSubnetMask(cidr: string) {
  const cidrInt = parseInt(cidr, 10);
  const octets = [];

  for (let i = 0; i < 4; i++) {
    const ones = Math.max(0, Math.min(8, cidrInt - i * 8));
    const binary = "1".repeat(ones).padEnd(8, "0");
    octets.push(parseInt(binary, 2));
  }

  return octets.join(".");
}
