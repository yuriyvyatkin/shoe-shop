export default function composeLinkClass(state) {
  return state.isActive ? 'nav-link nav-link_active' : 'nav-link';
}
