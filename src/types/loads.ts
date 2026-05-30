// Anderoute Load Board — domain types

export type LoadStatus =
  | "open"
  | "offered"
  | "accepted"
  | "assigned"
  | "pickup" // en route to pickup
  | "at_pickup"
  | "loaded"
  | "transit" // en route to drop-off
  | "at_dropoff"
  | "delivered"
  | "cancelled";

export type LoadPriority = "low" | "normal" | "high" | "urgent";

export interface Load {
  id: string;
  company_id: string;
  load_number: string;
  customer_name?: string | null;
  broker_name?: string | null;
  status: LoadStatus;
  priority: LoadPriority;
  commodity?: string | null;
  equipment_type?: string | null;
  weight_lbs?: number | null;
  miles?: number | null;
  rate?: number | null;
  // Pickup
  pickup_name?: string | null;
  pickup_address?: string | null;
  pickup_city?: string | null;
  pickup_state?: string | null;
  pickup_zip?: string | null;
  pickup_latitude?: number | null;
  pickup_longitude?: number | null;
  pickup_window_start?: string | null;
  pickup_window_end?: string | null;
  // Drop-off
  dropoff_name?: string | null;
  dropoff_address?: string | null;
  dropoff_city?: string | null;
  dropoff_state?: string | null;
  dropoff_zip?: string | null;
  dropoff_latitude?: number | null;
  dropoff_longitude?: number | null;
  dropoff_window_start?: string | null;
  dropoff_window_end?: string | null;
  // Assignment
  assigned_driver_id?: string | null;
  assigned_driver_name?: string | null;
  assigned_unit_number?: string | null;
  // Meta
  created_by?: string | null;
  updated_by?: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface LoadEvent {
  id: string;
  company_id: string;
  load_id: string;
  event_type: string;
  title: string;
  description?: string | null;
  old_status?: string | null;
  new_status?: string | null;
  created_by?: string | null;
  created_by_name?: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface LoadNote {
  id: string;
  company_id: string;
  load_id: string;
  note: string;
  created_by?: string | null;
  created_by_name?: string | null;
  is_internal: boolean;
  created_at: string;
}

export interface LoadOffer {
  id: string;
  company_id: string;
  load_id: string;
  driver_id: string;
  offer_status: "sent" | "accepted" | "declined" | "expired";
  offered_by?: string | null;
  offered_at: string;
  responded_at?: string | null;
  response_note?: string | null;
  expires_at?: string | null;
  metadata: Record<string, unknown>;
  // Joined
  driver_name?: string;
  driver_unit?: string;
}

export interface LoadDocument {
  id: string;
  company_id: string;
  load_id: string;
  document_type: string;
  file_name?: string | null;
  file_url?: string | null;
  uploaded_by?: string | null;
  created_at: string;
}

// ─── Kanban column definitions ────────────────────────────────────────────────

export interface KanbanColumn {
  status: LoadStatus;
  label: string;
  color: string;
  bgColor: string;
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { status: "open", label: "Open", color: "#94a3b8", bgColor: "#94a3b820" },
  { status: "offered", label: "Offered", color: "#3b82f6", bgColor: "#3b82f620" },
  { status: "accepted", label: "Accepted", color: "#8b5cf6", bgColor: "#8b5cf620" },
  { status: "assigned", label: "Assigned", color: "#f97316", bgColor: "#f9731620" },
  { status: "pickup", label: "En Route Pickup", color: "#eab308", bgColor: "#eab30820" },
  { status: "at_pickup", label: "At Pickup", color: "#f59e0b", bgColor: "#f59e0b20" },
  { status: "loaded", label: "Loaded", color: "#14b8a6", bgColor: "#14b8a620" },
  { status: "transit", label: "En Route Drop-off", color: "#0ea5e9", bgColor: "#0ea5e920" },
  { status: "at_dropoff", label: "At Drop-off", color: "#6366f1", bgColor: "#6366f120" },
  { status: "delivered", label: "Delivered", color: "#22c55e", bgColor: "#22c55e20" },
  { status: "cancelled", label: "Cancelled", color: "#ef4444", bgColor: "#ef444420" },
];

export const STATUS_LABELS: Record<LoadStatus, string> = Object.fromEntries(
  KANBAN_COLUMNS.map((c) => [c.status, c.label]),
) as Record<LoadStatus, string>;

export const STATUS_COLORS: Record<LoadStatus, string> = Object.fromEntries(
  KANBAN_COLUMNS.map((c) => [c.status, c.color]),
) as Record<LoadStatus, string>;

export const PRIORITY_COLORS: Record<LoadPriority, string> = {
  low: "#94a3b8",
  normal: "#64748b",
  high: "#f97316",
  urgent: "#ef4444",
};

export const PRIORITY_LABELS: Record<LoadPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

// ─── Filter state ────────────────────────────────────────────────────────────

export interface LoadFilters {
  search: string;
  status: LoadStatus | "";
  priority: LoadPriority | "";
  equipment_type: string;
  pickup_state: string;
  dropoff_state: string;
  assigned_driver_id: string;
  high_priority_only: boolean;
  unassigned_only: boolean;
}

export const DEFAULT_FILTERS: LoadFilters = {
  search: "",
  status: "",
  priority: "",
  equipment_type: "",
  pickup_state: "",
  dropoff_state: "",
  assigned_driver_id: "",
  high_priority_only: false,
  unassigned_only: false,
};

// ─── Driver match ─────────────────────────────────────────────────────────────

export interface DriverMatch {
  driver_id: string;
  driver_name: string;
  unit_number?: string | null;
  vehicle_type?: string | null;
  status: string;
  latitude?: number | null;
  longitude?: number | null;
  current_load_number?: string | null;
  last_ping_at?: string | null;
  battery_level?: number | null;
  is_available: boolean;
}

// ─── Demo data (fallback when Supabase tables not yet created) ────────────────

export const DEMO_LOADS: Load[] = [
  {
    id: "demo-load-1001",
    company_id: "11111111-1111-1111-1111-111111111111",
    load_number: "LOAD-1001",
    customer_name: "Walmart DC",
    broker_name: "Anderoute Demo Broker",
    status: "open",
    priority: "high",
    commodity: "Retail Freight",
    equipment_type: "Box Truck",
    weight_lbs: 12000,
    miles: 214,
    rate: 850,
    pickup_name: "Dallas Warehouse 01",
    pickup_city: "Dallas",
    pickup_state: "TX",
    pickup_zip: "75201",
    pickup_latitude: 32.7767,
    pickup_longitude: -96.797,
    pickup_window_start: new Date(Date.now() + 2 * 3600000).toISOString(),
    pickup_window_end: new Date(Date.now() + 4 * 3600000).toISOString(),
    dropoff_name: "Fort Worth Customer Site",
    dropoff_city: "Fort Worth",
    dropoff_state: "TX",
    dropoff_zip: "76102",
    dropoff_latitude: 32.7555,
    dropoff_longitude: -97.3308,
    dropoff_window_start: new Date(Date.now() + 6 * 3600000).toISOString(),
    dropoff_window_end: new Date(Date.now() + 8 * 3600000).toISOString(),
    metadata: { demo: true },
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-load-1002",
    company_id: "11111111-1111-1111-1111-111111111111",
    load_number: "LOAD-1002",
    customer_name: "DFW Airport Logistics",
    broker_name: "Anderoute Demo Broker",
    status: "assigned",
    priority: "normal",
    commodity: "Airport Freight",
    equipment_type: "Hotshot",
    weight_lbs: 6500,
    miles: 88,
    rate: 525,
    pickup_name: "DFW International Airport",
    pickup_address: "2400 Aviation Dr",
    pickup_city: "DFW Airport",
    pickup_state: "TX",
    pickup_zip: "75261",
    pickup_latitude: 32.8998,
    pickup_longitude: -97.0403,
    pickup_window_start: new Date(Date.now() + 1 * 3600000).toISOString(),
    pickup_window_end: new Date(Date.now() + 3 * 3600000).toISOString(),
    dropoff_name: "Arlington Delivery Point",
    dropoff_city: "Arlington",
    dropoff_state: "TX",
    dropoff_zip: "76010",
    dropoff_latitude: 32.7357,
    dropoff_longitude: -97.1081,
    assigned_driver_name: "Marcus Reed",
    assigned_unit_number: "VH-101",
    metadata: { demo: true },
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "demo-load-1003",
    company_id: "11111111-1111-1111-1111-111111111111",
    load_number: "LOAD-1003",
    customer_name: "Acme Manufacturing",
    broker_name: "Anderoute Demo Broker",
    status: "transit",
    priority: "normal",
    commodity: "Industrial Parts",
    equipment_type: "Flatbed",
    weight_lbs: 22000,
    miles: 312,
    rate: 1200,
    pickup_name: "Houston Distribution",
    pickup_city: "Houston",
    pickup_state: "TX",
    pickup_zip: "77001",
    pickup_latitude: 29.7604,
    pickup_longitude: -95.3698,
    dropoff_name: "San Antonio Plant",
    dropoff_city: "San Antonio",
    dropoff_state: "TX",
    dropoff_zip: "78201",
    dropoff_latitude: 29.4241,
    dropoff_longitude: -98.4936,
    assigned_driver_name: "Selena Ortega",
    assigned_unit_number: "VH-102",
    metadata: { demo: true },
    created_at: new Date(Date.now() - 14400000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "demo-load-1004",
    company_id: "11111111-1111-1111-1111-111111111111",
    load_number: "LOAD-1004",
    customer_name: "Target Corp",
    broker_name: "Anderoute Demo Broker",
    status: "delivered",
    priority: "normal",
    commodity: "Consumer Goods",
    equipment_type: "Dry Van",
    weight_lbs: 18000,
    miles: 540,
    rate: 1850,
    pickup_name: "Austin Fulfillment",
    pickup_city: "Austin",
    pickup_state: "TX",
    pickup_zip: "78701",
    pickup_latitude: 30.2672,
    pickup_longitude: -97.7431,
    dropoff_name: "Oklahoma City Store",
    dropoff_city: "Oklahoma City",
    dropoff_state: "OK",
    dropoff_zip: "73101",
    dropoff_latitude: 35.4676,
    dropoff_longitude: -97.5164,
    assigned_driver_name: "Tyrell Brooks",
    assigned_unit_number: "VH-103",
    metadata: { demo: true },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "demo-load-1005",
    company_id: "11111111-1111-1111-1111-111111111111",
    load_number: "LOAD-1005",
    customer_name: "Home Depot",
    broker_name: "Anderoute Demo Broker",
    status: "offered",
    priority: "urgent",
    commodity: "Building Materials",
    equipment_type: "Flatbed",
    weight_lbs: 35000,
    miles: 180,
    rate: 950,
    pickup_name: "Dallas Depot",
    pickup_city: "Dallas",
    pickup_state: "TX",
    pickup_zip: "75202",
    pickup_latitude: 32.78,
    pickup_longitude: -96.81,
    dropoff_name: "Waco Store",
    dropoff_city: "Waco",
    dropoff_state: "TX",
    dropoff_zip: "76701",
    dropoff_latitude: 31.5493,
    dropoff_longitude: -97.1467,
    metadata: { demo: true },
    created_at: new Date(Date.now() - 1800000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];
