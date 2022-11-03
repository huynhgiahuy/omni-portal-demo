import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

/**
 * @param {[string]} proAuthority
 * @returns
 */
export function getAuthority(proAuthority = []) {
  const authority = proAuthority;

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority;
}

export function setAuthority(authority: any, userId: string) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  reloadAuthorized(proAuthority);
}
