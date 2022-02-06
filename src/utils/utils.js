
function utils(){
  export function isGranted(permissionName) {
    return abp.auth.isGranted(permissionName);
  }
}
export default utils;