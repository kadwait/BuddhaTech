export default function HeaderLog(props){

    return (
        <header>
        <div className="back-holder"></div>
        <div className="img-text">
            <p>{props.value}</p>
        </div>
        <div className="top-layer"></div>
        </header>
    )
}