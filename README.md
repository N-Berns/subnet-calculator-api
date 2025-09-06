# IP Subnet Calculator

A simple **IP Subnet Calculator** built with **TypeScript** and **ExpressJS**.  
It allows users to calculate network information based on:

- IP Address + CIDR
- IP Address + Number of Subnets
- IP Address + Number of Hosts

Supports **Class A–E addresses** (for learning/demonstration purposes).  

---

## 🚀 Features

- Calculate network address, broadcast, usable range, and subnet mask
- Input formats:
  - **CIDR Notation** (e.g., `192.168.25.67/26`)
  - **# of Subnets** (e.g., `192.168.25.67 + 4 subnets`)
  - **# of Hosts** (e.g., `192.168.25.67 + 500 hosts`)
- Validity checks for IP, CIDR, Subnets, and Hosts
- CIDR-agnostic mode (also works with Class D/E)
- Works with `/31` and `/32` edge cases

---

## 📦 Installation & Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ip-subnet-calculator.git
   cd ip-subnet-calculator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. The server will be running at:
    ```bash
    http://localhost:3000
    ```


## ⚡ Usage
Example 1. Using CIDR
```bash
GET /subnet?ip=192.168.25.67&cidr=26
```
   
Example 2. Using # of Subnets
```bash
GET /subnet?ip=192.168.25.67&subnets=4
```

Example 3. Using # of Hosts
```bash
GET /subnet?ip=192.168.25.67&hosts=500
```

## 💡 Sample Output JSON
```
    {
      "result": {
        "networkAddress": "192.168.25.64",
        "subnetMask": "255.255.255.192",
        "wildcardMask": "0.0.0.63",
        "binarySubnetMask": "11111111.11111111.11111111.11000000",
        "networkClass": "C",
        "totalIPs": 64,
        "usableIPs": 62,
        "subnets": 4,
        "subnetList": [
          {
            "networkID": "192.168.25.64",
            "firstUsable": "192.168.25.65",
            "lastUsable": "192.168.25.126",
            "broadcastAddress": "192.168.25.127"
          }
        ]
      }
    }
```
## 🛠 Tech Stack
  * ExpressJS     - backend framework
  * TypeScript    - type safety
  * Node.js       - runtime
  * Vercel        - deployed

## 📖 Notes
  * This project is for learning/demo purposes — not meant for production networking use.

  * Class D/E IPs are allowed for calculations but have no real-world subnetting meaning.

  * Edge cases like /31 and /32 are supported.

## 📜 License
MIT License © 2025 N-Berns
