import React from 'react'
import { Attribution, AttributionLink } from './PictureAttribution.styles'

const PictureAttribution = ({ attribution }) => {
  if (!attribution) {
    return null
  }

  return (
    <Attribution>
      Photo by{' '}
      <AttributionLink
        href={attribution.photographerUrl}
        target="_blank"
        rel="noreferrer"
      >
        {attribution.photographerName}
      </AttributionLink>{' '}
      on{' '}
      <AttributionLink href={attribution.unsplashUrl} target="_blank" rel="noreferrer">
        Unsplash
      </AttributionLink>
    </Attribution>
  )
}

export default PictureAttribution
