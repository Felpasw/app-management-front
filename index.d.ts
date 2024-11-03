interface computers {
  _id: string;
  IP: string;
  SN: string;
  model: string;
  online: boolean;
}
interface tests {
  _id: string;
  success: boolean;
  msg: string;
  SN: string;
  type:  "USB" | "Ethernet" | "Ping" | "CPUStress";
  madeAt: date;
}

interface performedTest{
  _id: string
  msg: string,
  SN: string,
  type: "USB" | "Ethernet" | "Ping" | "CPUStress"
  success: boolean
  madeAt: string
}

interface graphParams{
  success: number,
  fail: number,
}

interface user{
  _id: string,
  username: string,
  password: string,
}

interface queue {
  _id: string;
  status: number;
  method: string;
  SN: string;
  requestedAt: string;
}
