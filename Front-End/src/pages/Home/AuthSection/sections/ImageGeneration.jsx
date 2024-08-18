import BucketLink from "../components/BucketLink";
import { ImageAi } from "../components/ImageAi";
import {ImageAiBtn} from "../components/ImageAiBtn"
export function ImageGeneration() {
  return (
    <div className="row-span-2 relative p-8">
        <ImageAi/>
        <ImageAiBtn/>
        <BucketLink/>
    </div>
  )
}