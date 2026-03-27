import React from 'react'
import {
  Attribution,
  AttributionText,
  AttributionLink,
} from './PictureAttribution.styles'

const PictureAttribution = ({ enabled, attribution }) => (
  <Attribution>
    {enabled && attribution && (
      <AttributionText>
        Photo by{' '}
        <AttributionLink
          href={attribution.photographerUrl}
          target="_blank"
          rel="noreferrer"
        >
          {attribution.photographerName}
        </AttributionLink>{' '}
        on{' '}
        <AttributionLink
          href={attribution.unsplashUrl}
          target="_blank"
          rel="noreferrer"
        >
          Unsplash
        </AttributionLink>
      </AttributionText>
    )}
  </Attribution>
)

export default PictureAttribution
