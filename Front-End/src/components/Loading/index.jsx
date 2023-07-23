import "./styles.css"; 
export default function Loading() {
  return (
    <div className="conteiner-loading">
        <div className="main-loading">
            <span style={{gridArea:"long"}}></span>
            <span style={{gridArea:"top"}} className="small"></span>
            <span style={{gridArea:"bottom"}} className="small"></span>
        </div>
    </div>
  )
}
