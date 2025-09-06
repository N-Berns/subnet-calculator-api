export function CIDRtoWildcardMask(cidr: string) {
  const cidrInt = parseInt(cidr, 10);
  const octets = [];

  for (let i = 0; i < 4; i++) {
    const ones = Math.max(0, Math.min(8, cidrInt - i * 8));
    const binary = "0".repeat(ones).padEnd(8, "1");
    octets.push(parseInt(binary, 2));
  }

  return octets.join(".");
}
