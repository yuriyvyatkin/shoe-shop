import { NavLink } from 'react-router-dom';
import composeLinkClass from '@/utils/composeLinkClass';

export default function CustomNavLink({ className, ...props }) {
  return <NavLink {...props} className={className || composeLinkClass} />;
}
