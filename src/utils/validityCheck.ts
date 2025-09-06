export function IPValidityCheck(ip: string) {
  let IPBool = true;
  let message = "OK";
  const IPArray = ip.split(".");

  // Check if IP has 4 octets
  if (IPArray.length != 4) {
    IPBool = false;
    message = "Invalid IP: Incorrect number of octets.";
  }
  if (IPBool == true) {
    // Check for non-numeric characters and range of 0-255 for all octets
    for (const octet of IPArray) {
      // Reject empty strings (like "192..1.1")
      if (octet.trim() === "") {
        return { IPBool: false, message: "Invalid IP: Empty octet." };
      }

      // Ensure whole number, not "01a"
      if (!/^\d+$/.test(octet)) {
        return {
          IPBool: false,
          message: "Invalid IP: Non-numeric characters present.",
        };
      }

      const octetInt = parseInt(octet, 10);

      if (octetInt < 0 || octetInt > 255) {
        return {
          IPBool: false,
          message: "Invalid IP: Octet out of range (0-255).",
        };
      }
    }

    // Checks if first octet is between 1-223, not 127
    if (
      parseInt(IPArray[0], 10) < 1 ||
      parseInt(IPArray[0], 10) > 223 ||
      parseInt(IPArray[0], 10) == 127
    ) {
      IPBool = false;
      message = "Invalid IP: First octet out of range (1-223, excluding 127).";
    }
  }
  return { IPBool, message };
}

export function CIDRValidityCheck(cidr: string) {
  let cidrBool = true;
  let message = "OK";

  // Check if it's all digits
  if (!/^\d+$/.test(cidr)) {
    cidrBool = false;
    message = "Invalid CIDR: Must be a whole number between 0 - 32";
  } else {
    const cidrNum = Number(cidr);

    if (!Number.isInteger(cidrNum) || cidrNum < 0 || cidrNum > 32) {
      cidrBool = false;
      message = "Invalid CIDR: Must be a whole number between 0 - 32";
    }
  }

  return { cidrBool, message };
}

export function SubnetValidityCheck(subnets: string) {
  let subnetBool = true;
  let message = "OK";

  const subnetsInt = Number(subnets);
  let subnetsNum = subnetsInt;

  // Check if it's all digits
  if (!Number.isInteger(subnetsInt) || subnetsInt <= 0 || subnetsInt > 128) {
    subnetBool = false;
    message = "Invalid Subnets: Must be a whole number between 1 - 128.";
  } else {
    const subnetBits = Math.ceil(Math.log2(subnetsInt));

    if (subnetsInt != 2 ** subnetBits) {
      subnetsNum = 2 ** subnetBits;
      message = `Provided ${subnets} subnets, rounded up to ${subnetsNum} subnets.`;
    }
  }

  return { subnetsNum, subnetBool, message };
}

export function HostsValidityCheck(hosts: string) {
  let hostsBool = true;
  let message = "OK";

  const hostsInt = Number(hosts);
  let hostsNum = hostsInt;

  // Check if it's all digits
  if (!Number.isInteger(hostsInt) || hostsInt < 0 || hostsInt > 4294967294) {
    hostsBool = false;
    message = "Invalid Hosts: Must be a whole number between 0 - 4,294,967,294";
  } else {
    let hostBits = 0;
    let correctedHosts = 0;

    while (correctedHosts < hostsInt && hostBits <= 32) {
      correctedHosts = Math.pow(2, hostBits) - 2;
      hostBits++;
    }

    if (correctedHosts !== hostsInt) {
      message = `Provided ${hosts} hosts, rounded up to ${correctedHosts} hosts.`;
    }
  }
  return { hostsNum, hostsBool, message };
}
