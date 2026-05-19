/**
 * Adapters: Supabase row shapes → the frontend's existing UI types.
 * Lets existing components keep working while data comes from the DB.
 */
import type { Driver, Vehicle, Load, Shipment, AlertItem, Route, TurnStep } from "@/types";
import type {
  DriverRow,
  VehicleRow,
  LoadRow,
  ShipmentRow,
  AlertRow,
  RouteRow,
  RouteStepRow,
} from "@/api/anderoute";

const ago = (iso: string) => {
  const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
};

export const toDriver = (r: DriverRow): Driver => ({
  id: r.id,
  name: r.name,
  phone: r.phone ?? "",
  email: r.email ?? "",
  licenseType: r.license_type,
  cdlStatus: r.cdl_status,
  status: r.status,
  vehicleType: (r.vehicle_type ?? "Cargo Van") as Driver["vehicleType"],
  vehicleId: r.vehicle_id ?? "",
  currentSpeed: Number(r.current_speed ?? 0),
  averageMpg: Number(r.average_mpg ?? 0),
  currentLocation: {
    lat: Number(r.current_lat ?? 0),
    lng: Number(r.current_lng ?? 0),
    label: r.current_location_label ?? "",
  },
  currentLoadId: r.current_load_id,
  activeShipmentId: r.active_shipment_id,
  eta: r.eta,
  onTimePercentage: Number(r.on_time_percentage ?? 0),
  safetyScore: Number(r.safety_score ?? 0),
  milesToday: r.miles_today ?? 0,
  loadsToday: r.loads_today ?? 0,
  dispatcher: r.dispatcher_name ?? "—",
  lastUpdated: ago(r.last_updated),
});

export const toVehicle = (r: VehicleRow): Vehicle => ({
  id: r.id,
  unitNumber: r.unit_number,
  type: r.type,
  make: r.make ?? "",
  model: r.model ?? "",
  year: r.year ?? 0,
  plate: r.plate ?? "",
  fuelType: r.fuel_type,
  averageMpg: Number(r.average_mpg ?? 0),
  currentDriverId: r.current_driver_id,
  status: r.status,
});

export const toLoad = (r: LoadRow): Load => ({
  id: r.id,
  pickupLocation: r.pickup_location,
  dropoffLocation: r.dropoff_location,
  commodity: r.commodity ?? "",
  packageType: r.package_type ?? "",
  weight: Number(r.weight ?? 0),
  quantity: r.quantity ?? 0,
  requiredVehicleType: (r.required_vehicle_type ?? "Dry Van") as Load["requiredVehicleType"],
  requiresCDL: r.requires_cdl,
  requiresHazmat: r.requires_hazmat,
  status: r.status,
  assignedDriverId: r.assigned_driver_id,
  estimatedMiles: r.estimated_miles ?? 0,
  estimatedDuration: r.estimated_duration ?? "",
  pickupWindow: r.pickup_window ?? "",
  deliveryWindow: r.delivery_window ?? "",
  dispatcherNote: r.dispatcher_note ?? "",
  customer: r.customer ?? "",
  rate: Number(r.rate ?? 0),
});

export const toShipment = (r: ShipmentRow): Shipment => ({
  id: r.id,
  loadId: r.load_id,
  customerName: r.customer_name ?? "",
  commodity: r.commodity ?? "",
  packageType: r.package_type ?? "",
  weight: Number(r.weight ?? 0),
  quantity: r.quantity ?? 0,
  pickupAddress: r.pickup_address ?? "",
  dropoffAddress: r.dropoff_address ?? "",
  status: r.status,
  eta: r.eta ?? "—",
  specialInstructions: r.special_instructions ?? "",
  proofOfDeliveryUrl: r.proof_of_delivery_url,
});

export const toAlert = (r: AlertRow): AlertItem => ({
  id: r.id,
  severity: r.severity,
  type: r.type,
  driverId: r.driver_id,
  loadId: r.load_id,
  message: r.message,
  recommendedAction: r.recommended_action ?? "",
  createdAt: ago(r.created_at),
  resolved: r.resolved,
});

export const toRoute = (r: RouteRow, steps: RouteStepRow[] = []): Route => ({
  id: r.id,
  loadId: r.load_id,
  driverId: r.driver_id ?? "",
  routeStatus: r.route_status,
  totalMiles: r.total_miles ?? 0,
  remainingMiles: r.remaining_miles ?? 0,
  eta: r.eta ?? "",
  currentStep: r.current_step ?? 0,
  turnByTurnSteps: steps.map(
    (s): TurnStep => ({
      id: s.id,
      instruction: s.instruction,
      distance: s.distance ?? "",
      duration: s.duration ?? "",
      street: s.street ?? "",
    }),
  ),
});
