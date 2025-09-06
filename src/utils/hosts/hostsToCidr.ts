export function HostsToCIDR(hosts: number) {
  if (hosts == 1) return 31;

  let newCIDR = 0;

  for (let i = 0; i < 32; i++) {
    const hostsNum = 2 ** i - 2;
    if (hostsNum >= hosts) {
      newCIDR = 32 - i;
      break;
    }
  }

  return newCIDR;
}
