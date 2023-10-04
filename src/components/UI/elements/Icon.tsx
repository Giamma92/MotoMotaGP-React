import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Icon({ icon = '', size = '1x', color = 'currentColor', className = '', ...rest }: any) {
    return (
        <FontAwesomeIcon icon={icon} size={size} color={color} className={className} {...rest} />
    );
}

export default Icon;