import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getAuthority()); // Reload the rights component

/**
 * @param {[string]} proAuthority
 */
const reloadAuthorized = (proAuthority: any) => {
  Authorized = RenderAuthorize(getAuthority(proAuthority));
};

window.reloadAuthorized = reloadAuthorized;
export { reloadAuthorized };
export default Authorized;
