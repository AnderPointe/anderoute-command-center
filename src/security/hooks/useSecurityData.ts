/** Phase 8 — Hooks over the security/compliance mock catalog. */
import {
  POSTURE_CARDS, CONTROLS, FINDINGS, POLICIES, EVIDENCE, CHANGES,
  INCIDENTS, VENDORS, VULNS, BACKUPS, RETENTION, TESTS, DEPLOYMENTS,
  METRICS, readinessScore,
} from "../data/mockSecurity";

export function useSecurityPosture()    { return { cards: POSTURE_CARDS, score: readinessScore() }; }
export function useComplianceControls() { return { controls: CONTROLS, score: readinessScore() }; }
export function useSecurityFindings()   { return { findings: FINDINGS }; }
export function usePolicyLibrary()      { return { policies: POLICIES }; }
export function useEvidenceVault()      { return { evidence: EVIDENCE }; }
export function useChangeManagement()   { return { changes: CHANGES }; }
export function useIncidents()          { return { incidents: INCIDENTS }; }
export function useVendorRisk()         { return { vendors: VENDORS }; }
export function useVulnerabilities()    { return { vulns: VULNS }; }
export function useBackupRecovery()     { return { backups: BACKUPS }; }
export function useRetentionRules()     { return { rules: RETENTION }; }
export function useQaDashboard()        { return { tests: TESTS }; }
export function useDeploymentStatus()   { return { deployments: DEPLOYMENTS }; }
export function useObservability()      { return { metrics: METRICS }; }
