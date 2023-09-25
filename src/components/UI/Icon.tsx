function Icon({ icon = '', size = '1x', color = 'currentColor', className = '', ...rest }) {
    return (
        <i className={`${icon} ${size} ${className}`} {...rest} />
    );
}

export default Icon;