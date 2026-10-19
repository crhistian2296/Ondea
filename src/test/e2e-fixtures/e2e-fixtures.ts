const E2E_ENABLED = "1";

function isEnvFlag(name: string): boolean {
  return process.env[name] === E2E_ENABLED;
}

export function isE2EFixturesMode(): boolean {
  return isEnvFlag("ONDEA_E2E_FIXTURES");
}

export function isE2EFixturesFailMode(): boolean {
  return isEnvFlag("ONDEA_E2E_FIXTURES_FAIL");
}

export function isE2EApiFailMode(): boolean {
  return isEnvFlag("ONDEA_E2E_API_FAIL");
}

export async function withE2EFixturesElse<T>(
  onE2E: () => T | Promise<T>,
  onProduction: () => T | Promise<T>,
): Promise<T> {
  if (isE2EFixturesMode()) {
    return await onE2E();
  }
  return await onProduction();
}
