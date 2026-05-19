export type DriverStatus =
  | "waiting"
  | "offered"
  | "accepted"
  | "pickup"
  | "loaded"
  | "transit"
  | "break"
  | "offduty"
  | "delayed"
  | "delivered";

export type VehicleType =
  | "CDL Freight"
  | "Hotshot"
  | "Box Truck"
  | "Cargo Van"
  | "Personal Vehicle"
  | "Flatbed"
  | "Reefer"
  | "Dry Van"
  | "Power Only"
  | "Step Deck";

export type LoadStatus =
  | "draft"
  | "available"
  | "offered"
  | "accepted"
  | "denied"
  | "assigned"
  | "pickup"
  | "picked_up"
  | "loaded"
  | "transit"
  | "delayed"
  | "delivered"
  | "completed"
  | "cancelled";

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface GeoPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseType: "CDL-A" | "CDL-B" | "Non-CDL";
  cdlStatus: boolean;
  status: DriverStatus;
  vehicleType: VehicleType;
  vehicleId: string;
  currentSpeed: number;
  averageMpg: number;
  currentLocation: GeoPoint;
  currentLoadId: string | null;
  activeShipmentId: string | null;
  eta: string | null;
  onTimePercentage: number;
  safetyScore: number;
  milesToday: number;
  loadsToday: number;
  dispatcher: string;
  lastUpdated: string;
}

export interface Vehicle {
  id: string;
  unitNumber: string;
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  plate: string;
  fuelType: "Diesel" | "Gas" | "Electric";
  averageMpg: number;
  currentDriverId: string | null;
  status: "Active" | "Idle" | "Maintenance" | "Out of Service";
}

export interface Load {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  commodity: string;
  packageType: string;
  weight: number;
  quantity: number;
  requiredVehicleType: VehicleType;
  requiresCDL: boolean;
  requiresHazmat: boolean;
  status: LoadStatus;
  assignedDriverId: string | null;
  estimatedMiles: number;
  estimatedDuration: string;
  pickupWindow: string;
  deliveryWindow: string;
  dispatcherNote: string;
  customer: string;
  rate: number;
}

export interface Shipment {
  id: string;
  loadId: string;
  customerName: string;
  commodity: string;
  packageType: string;
  weight: number;
  quantity: number;
  pickupAddress: string;
  dropoffAddress: string;
  status: LoadStatus;
  eta: string;
  specialInstructions: string;
  proofOfDeliveryUrl: string | null;
}

export interface TurnStep {
  id: string;
  instruction: string;
  distance: string;
  duration: string;
  street: string;
}

export interface Route {
  id: string;
  loadId: string;
  driverId: string;
  routeStatus: "planned" | "active" | "completed";
  totalMiles: number;
  remainingMiles: number;
  eta: string;
  currentStep: number;
  turnByTurnSteps: TurnStep[];
}

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  type: string;
  driverId: string | null;
  loadId: string | null;
  message: string;
  recommendedAction: string;
  createdAt: string;
  resolved: boolean;
}
