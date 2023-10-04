import 'scss/UI/Widget.scss'

function Widget({children, number, title, bgColor}: any) {
    return (
        <div className="dashboard-widget radius-large space-24 card-4 space-content dark:bg-gray-700">
            {title && <h5 className="size-24">{title}</h5>}
            <>{children}</>
        </div>
    );
}

export default Widget;