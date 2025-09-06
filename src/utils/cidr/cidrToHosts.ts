export function CIDRtoHosts(cidr: string) {
  return 2 ** (32 - parseInt(cidr, 10));
}
