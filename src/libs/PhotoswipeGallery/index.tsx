import { FC } from 'react'
import { Gallery } from 'react-photoswipe-gallery'

interface IProps {
  children?: React.ReactNode
}
const PhotoswipeGallery: FC<IProps> = ({ children }) => {
  return <Gallery>{children}</Gallery>
}

export default PhotoswipeGallery
