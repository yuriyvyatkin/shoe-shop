import { NavLink } from 'react-router-dom';
import composeClassName from '../../functions/composeClassName';

export default function CustomNavLink({ className, ...props }) {
  return <NavLink {...props} className={className || composeClassName} />;
}
