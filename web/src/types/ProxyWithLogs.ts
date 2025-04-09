import Proxy from "./Proxy";
import { ProxyLog } from "./ProxyLog";

export type ProxyWithLogs = Proxy & { logs: ProxyLog[] };
