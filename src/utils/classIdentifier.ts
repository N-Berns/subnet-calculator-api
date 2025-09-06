export function ClassIdentifier(ip: string) {
  const firstOctet = parseInt(ip.split(".")[0], 10);

  if (firstOctet >= 1 && firstOctet <= 126) return "Class A";
  else if (firstOctet >= 128 && firstOctet <= 191) return "Class B";
  else if (firstOctet >= 192 && firstOctet <= 223) return "Class C";
  else if (firstOctet >= 224 && firstOctet <= 239) return "Class D";
  else if (firstOctet >= 240 && firstOctet <= 255) return "Class E";
  else return "Invalid IP for classful addressing";
}
