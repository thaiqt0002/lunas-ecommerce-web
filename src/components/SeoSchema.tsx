import { FC, Fragment } from 'react'
interface IProps {
  json: Record<string, unknown>
}
const SeoSchema: FC<IProps> = ({ json }) => {
  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
    </Fragment>
  )
}
export default SeoSchema
