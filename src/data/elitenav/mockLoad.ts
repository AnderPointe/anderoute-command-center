import type { Load, Shipment } from "@/types/elitenav";

export const mockLoad: Load = {
  id: "LD-29481",
  pickup: "Coldfront Distribution · 2410 S Industrial Blvd, Dallas TX",
  dropoff: "Meridian Foods DC · 18420 Logistics Pkwy, Fort Worth TX",
  commodity: "Refrigerated Produce",
  packageType: "Palletized — 48x40",
  weightLbs: 42800,
  quantity: 24,
  requiredVehicle: "CDL Freight Truck",
  requiresCDL: true,
  requiresHazmat: false,
  pickupWindow: "Today · 14:00 – 15:30 CT",
  deliveryWindow: "Today · 18:00 – 19:30 CT",
  estimatedMiles: 86,
  estimatedDuration: "1h 38m",
  dispatcherNote:
    "Reefer pre-cooled to 36°F. Gate 4. Ask for Marcus at receiving. Lumper paid by shipper.",
  customer: "Meridian Foods",
  rate: 845,
};

export const mockShipment: Shipment = {
  id: "SHP-77120",
  loadId: mockLoad.id,
  customer: mockLoad.customer,
  commodity: mockLoad.commodity,
  packageType: mockLoad.packageType,
  weightLbs: mockLoad.weightLbs,
  quantity: mockLoad.quantity,
  pickupAddress: mockLoad.pickup,
  dropoffAddress: mockLoad.dropoff,
  deliveryWindow: mockLoad.deliveryWindow,
  specialHandling: "Maintain 34–38°F. Seal must remain intact until receiving signs.",
  status: "available",
};
