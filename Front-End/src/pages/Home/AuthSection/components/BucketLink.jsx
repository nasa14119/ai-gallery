import { Link } from "react-router-dom"
import { DatabaseIcon } from "../../../../assets/Icons/DatabaseIcon"

function BucketLink() {
  return (
    <Link to={"/settings/ai"} className="absolute bottom-4 right-20">
      <div className="p-2 bg-slate-600/40 rounded-full">
        <DatabaseIcon className="h-6 w-6"/>
      </div>
    </Link>
  )
}

export default BucketLink