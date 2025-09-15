import { BlurImage } from "./MediaComponents/BlurImage"
import placeholder from "../public/images/placeholder.webp"

export default function Placeholder({className}: {className?: string}){
  return <BlurImage blurUrl="/images/placeholder-small.webp" src={placeholder} className={className} alt="alt"/>
}