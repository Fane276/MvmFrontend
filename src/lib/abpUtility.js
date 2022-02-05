import AppConsts from './appconst';

export function isGranted(permissionName) {
  return abp.auth.isGranted(permissionName);
}