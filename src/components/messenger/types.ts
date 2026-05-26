export type Role =
  | "Carrier"
  | "Driver"
  | "Broker"
  | "Dispatcher"
  | "Customer"
  | "Warehouse";

export type Category =
  | "pinned"
  | "active_loads"
  | "dispatch"
  | "invoices"
  | "completed";

export type Contact = {
  id: string;
  name: string;
  role: Role;
  preview: string;
  time: string;
  unread: number;
  pinned?: boolean;
  typing?: boolean;
  company?: string;
  avatar: string;
  category: Category;
};

export type Message =
  | {
      id: string;
      kind: "text";
      from: "me" | "them";
      time: string;
      text: string;
      quote?: { name: string; text: string };
    }
  | {
      id: string;
      kind: "file";
      from: "me" | "them";
      time: string;
      filename: string;
      filetype: string;
    };

export type Attachment = { name: string; type: string; size?: number };

export type TypeFilter =
  | "all"
  | "Driver"
  | "Courier"
  | "Carrier"
  | "Broker"
  | "Customer"
  | "Warehouse";

export type CategoryFilter = "all" | Category;

export const roleStyles: Record<Role, string> = {
  Carrier: "bg-[#6D35E8]/20 text-[#B79CFF] border border-[#6D35E8]/40",
  Driver: "bg-[#22C55E]/15 text-[#5EE6A0] border border-[#22C55E]/35",
  Broker: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  Dispatcher: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  Customer: "bg-pink-500/15 text-pink-300 border border-pink-500/30",
  Warehouse: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
};

export const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Driver", label: "Drivers" },
  { id: "Courier", label: "Couriers" },
  { id: "Carrier", label: "Carriers" },
  { id: "Broker", label: "Brokers" },
  { id: "Customer", label: "Customers" },
  { id: "Warehouse", label: "Warehouses" },
];

export const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pinned", label: "Pinned" },
  { id: "active_loads", label: "Active Loads" },
  { id: "dispatch", label: "Dispatch" },
  { id: "invoices", label: "Invoices" },
  { id: "completed", label: "Completed" },
];
