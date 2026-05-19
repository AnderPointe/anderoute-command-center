import type { Driver, Vehicle } from "@/types/elitenav";

export const mockDriver: Driver = {
  id: "drv_001",
  name: "Marcus Trent",
  phone: "+1 (555) 204-7781",
  email: "marcus.trent@anderoute.com",
  licenseClass: "CDL-A",
  cdl: true,
  status: "available",
  vehicleId: "veh_001",
  safetyScore: 98,
  onTimePct: 96,
  dispatcher: "Alicia Romero",
};

export const mockVehicle: Vehicle = {
  id: "veh_001",
  unit: "AR-4471",
  type: "CDL Freight Truck",
  cdlRequired: true,
  heightFt: 13.5,
  widthFt: 8.5,
  lengthFt: 53,
  weightLbs: 78400,
  axles: 5,
  hazmatEnabled: false,
  trailerType: "Refrigerated 53ft",
  fuelType: "Diesel",
  averageMpg: 6.8,
  plate: "TX 8K-2204",
};
