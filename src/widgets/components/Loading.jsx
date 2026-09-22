import "../../styles/widgets/loading.css"

function Loading() {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <span className="loading-text">
                Loading...
            </span>
        </div>
    )
}

export default Loading