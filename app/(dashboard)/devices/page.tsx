import React from "react";
import { DevicesStateTable } from "../../../component/tables/devices-state-table";

export default async function DevicesPage() {
  return (
    <div>
      <DevicesStateTable data={devices} />
    </div>
  );
}

const devices = [
  {
    device_id: "6792cce0-925d-4d05-9687-4499c7de562f",
    device_name: "96adced",
    x: [42035, 56817, 28590, 51653, 7965, 5255, 16414, 71169, 19815, 8163],
  },
  {
    device_id: "ffbe42f3-82d2-4bf5-9f62-f534babd76c7",
    device_name: "67c878d",
    x: [15341, 46685, 20435, 12074, 26088, 60913, 95260, 93691, 91088, 22112],
  },
  {
    device_id: "3a0284f3-bd20-4ead-9361-11942d5a58a3",
    device_name: "9c6cc23",
    x: [93191, 43910, 98181, 15331, 47823, 61989, 9699, 21849, 92919, 67663],
  },
  {
    device_id: "8c0a42da-d1aa-4cc2-b9a8-cc54bca46dd5",
    device_name: "c600797",
    x: [87232, 74434, 70606, 19775, 40365, 9052, 43816, 37848, 62418, 47457],
  },
  {
    device_id: "1f21897a-3bfb-472e-95fc-73d937ecb6d1",
    device_name: "5ec1bcf",
    x: [81695, 68599, 67519, 29489, 36951, 46565, 94328, 28494, 54801, 3427],
  },
  {
    device_id: "55eb8ab7-4dd7-43a9-b278-d07ae708202a",
    device_name: "b8a58e9",
    x: [19088, 59163, 46907, 97552, 30364, 54733, 48207, 68139, 48520, 23034],
  },
  {
    device_id: "1309adae-8338-4a79-8f51-a14902a01296",
    device_name: "fdbc92d",
    x: [81788, 86342, 16644, 63010, 53146, 79987, 36869, 77693, 2234, 25799],
  },
  {
    device_id: "4f79ea0a-8ecf-4d42-b98a-fe5c703da6e0",
    device_name: "9896a6a",
    x: [52394, 14423, 85810, 71884, 95704, 29415, 90182, 66918, 28109, 70920],
  },
  {
    device_id: "42106e8f-84f0-4d6b-a2c0-5a945db605b3",
    device_name: "fd8bb91",
    x: [762, 30665, 58898, 27585, 66729, 50061, 62504, 69720, 81606, 90706],
  },
  {
    device_id: "45854d31-a967-4827-b1b5-33980d86f78d",
    device_name: "87bf79e",
    x: [51868, 57324, 80719, 95635, 28911, 60381, 75419, 83824, 47931, 51372],
  },
];
