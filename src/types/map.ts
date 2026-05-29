// Anderoute Map Intelligence Layer — shared map types

// ─── POI ─────────────────────────────────────────────────────────────────────

export type PoiCategory =
  | "depot"
  | "warehouse"
  | "customer"
  | "truck_stop"
  | "fuel"
  | "maintenance"
  | "airport"
  | "port"
  | "rail_yard"
  | "store"
  | "landmark"
  | "lake"
  | "river"
  | "custom";

export interface MapPoi {
  id: string;
  company_id: string;
  name: string;
  category: PoiCategory;
  latitude: number;
  longitude: number;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  phone?: string | null;
  website?: string | null;
  description?: string | null;
  is_active: boolean;
  is_public: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ─── Driver location ─────────────────────────────────────────────────────────

export type DriverLocationStatus =
  | "driving"
  | "idle"
  | "loading"
  | "unloading"
  | "break"
  | "offline";

export interface LiveDriverLocation {
  driver_id: string;
  company_id: string;
  unit_number?: string | null;
  vehicle_type?: string | null;
  latitude: number;
  longitude: number;
  speed_mph?: number | null;
  heading?: number | null;
  status: DriverLocationStatus;
  current_load_number?: string | null;
  eta_minutes?: number | null;
  last_ping_at: string;
  /** Populated by joining drivers table */
  driver_name?: string;
  battery_level?: number | null;
  signal_strength?: number | null;
  is_stale?: boolean;
}

// ─── Geofence ─────────────────────────────────────────────────────────────────

export type GeofenceType =
  | "delivery_zone"
  | "customer_zone"
  | "yard_zone"
  | "restricted"
  | "airport_zone"
  | "port_zone"
  | "warehouse_zone"
  | "dispatch_zone"
  | "custom";

export interface GeoJsonPolygon {
  type: "Polygon";
  coordinates: number[][][];
}

export interface MapGeofence {
  id: string;
  company_id: string;
  name: string;
  description?: string | null;
  geofence_type: GeofenceType | string;
  /** GeoJSON Polygon or radius-based circle represented as simple lat/lng + radius */
  geometry?: GeoJsonPolygon | null;
  latitude?: number | null;
  longitude?: number | null;
  radius_m?: number | null;
  color: string;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

// ─── Layer preferences ────────────────────────────────────────────────────────

export type LayerKey =
  | "drivers"
  | "loads"
  | "pickups"
  | "dropoffs"
  | "depots"
  | "warehouses"
  | "customers"
  | "truck_stops"
  | "fuel"
  | "maintenance"
  | "airports"
  | "ports"
  | "rail_yards"
  | "stores"
  | "landmarks"
  | "lakes"
  | "rivers"
  | "custom_pins"
  | "geofences"
  | "buildings_3d"
  | "traffic"
  | "weather";

export interface MapLayerState {
  key: LayerKey;
  label: string;
  enabled: boolean;
  group: string;
}

export const DEFAULT_LAYER_CONFIG: MapLayerState[] = [
  { key: "drivers", label: "Drivers", enabled: true, group: "Fleet" },
  { key: "loads", label: "Loads", enabled: true, group: "Fleet" },
  { key: "pickups", label: "Pickups", enabled: true, group: "Fleet" },
  { key: "dropoffs", label: "Drop-offs", enabled: true, group: "Fleet" },
  { key: "depots", label: "Depots", enabled: true, group: "Locations" },
  { key: "warehouses", label: "Warehouses", enabled: true, group: "Locations" },
  { key: "customers", label: "Customers", enabled: false, group: "Locations" },
  { key: "truck_stops", label: "Truck Stops", enabled: true, group: "Locations" },
  { key: "fuel", label: "Fuel", enabled: false, group: "Locations" },
  { key: "maintenance", label: "Maintenance", enabled: false, group: "Locations" },
  { key: "airports", label: "Airports", enabled: false, group: "Infrastructure" },
  { key: "ports", label: "Ports", enabled: false, group: "Infrastructure" },
  { key: "rail_yards", label: "Rail Yards", enabled: false, group: "Infrastructure" },
  { key: "stores", label: "Stores", enabled: false, group: "Locations" },
  { key: "landmarks", label: "Landmarks", enabled: false, group: "Locations" },
  { key: "lakes", label: "Lakes", enabled: false, group: "Environment" },
  { key: "rivers", label: "Rivers", enabled: false, group: "Environment" },
  { key: "custom_pins", label: "Custom Pins", enabled: true, group: "Other" },
  { key: "geofences", label: "Geofences", enabled: true, group: "Other" },
  { key: "buildings_3d", label: "3D Buildings", enabled: false, group: "Map" },
  { key: "traffic", label: "Traffic", enabled: false, group: "Map" },
  { key: "weather", label: "Weather", enabled: false, group: "Map" },
];

// ─── Saved views ──────────────────────────────────────────────────────────────

export interface MapSavedView {
  id: string;
  name: string;
  description?: string | null;
  center_lng: number;
  center_lat: number;
  zoom: number;
  pitch: number;
  bearing: number;
  layer_settings: Partial<Record<LayerKey, boolean>>;
  is_default?: boolean;
  is_shared?: boolean;
}

export const DEFAULT_SAVED_VIEWS: MapSavedView[] = [
  {
    id: "usa",
    name: "United States",
    description: "National logistics command view",
    center_lng: -98.5795,
    center_lat: 39.8283,
    zoom: 3.5,
    pitch: 25,
    bearing: 0,
    is_default: true,
    is_shared: true,
    layer_settings: { drivers: true, geofences: false, buildings_3d: false },
  },
  {
    id: "texas",
    name: "Texas",
    description: "Texas regional logistics view",
    center_lng: -99.9018,
    center_lat: 31.9686,
    zoom: 5.5,
    pitch: 35,
    bearing: 0,
    layer_settings: { drivers: true, geofences: true, buildings_3d: false },
  },
  {
    id: "dfw",
    name: "Dallas / Fort Worth",
    description: "DFW dispatch operations view",
    center_lng: -96.797,
    center_lat: 32.7767,
    zoom: 10,
    pitch: 45,
    bearing: 0,
    layer_settings: { drivers: true, geofences: true, buildings_3d: true },
  },
  {
    id: "active_dispatch",
    name: "Active Dispatch",
    description: "All active loads and drivers",
    center_lng: -98.5795,
    center_lat: 39.8283,
    zoom: 4,
    pitch: 30,
    bearing: 0,
    layer_settings: { drivers: true, loads: true, pickups: true, dropoffs: true, geofences: true },
  },
  {
    id: "all_drivers",
    name: "All Drivers",
    description: "Driver tracking overview",
    center_lng: -98.5795,
    center_lat: 39.8283,
    zoom: 4,
    pitch: 20,
    bearing: 0,
    layer_settings: { drivers: true },
  },
  {
    id: "alerts_only",
    name: "Alerts Only",
    description: "Drivers with active alerts",
    center_lng: -98.5795,
    center_lat: 39.8283,
    zoom: 4,
    pitch: 0,
    bearing: 0,
    layer_settings: { drivers: true, geofences: true },
  },
  {
    id: "warehouses",
    name: "Warehouses",
    description: "All warehouse locations",
    center_lng: -98.5795,
    center_lat: 39.8283,
    zoom: 4,
    pitch: 0,
    bearing: 0,
    layer_settings: { warehouses: true, depots: true },
  },
  {
    id: "airports",
    name: "Airports",
    description: "Airport and air freight hubs",
    center_lng: -98.5795,
    center_lat: 39.8283,
    zoom: 4,
    pitch: 0,
    bearing: 0,
    layer_settings: { airports: true },
  },
  {
    id: "truck_stops",
    name: "Truck Stops",
    description: "Truck stops and fuel stations",
    center_lng: -98.5795,
    center_lat: 39.8283,
    zoom: 4,
    pitch: 0,
    bearing: 0,
    layer_settings: { truck_stops: true, fuel: true },
  },
];

// ─── Selected map object ──────────────────────────────────────────────────────

export type SelectedObjectType = "driver" | "poi" | "geofence" | null;

export interface SelectedMapObject {
  type: SelectedObjectType;
  data: LiveDriverLocation | MapPoi | MapGeofence | null;
}

// ─── Search result ────────────────────────────────────────────────────────────

export interface MapSearchResult {
  id: string;
  label: string;
  type: "driver" | "poi" | "location";
  lat?: number;
  lng?: number;
  meta?: string;
}

// ─── Map viewport ─────────────────────────────────────────────────────────────

export interface MapViewport {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
}
