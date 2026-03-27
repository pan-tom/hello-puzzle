import React from 'react'
import {
  Attribution,
  AttributionText,
  AttributionLink,
} from './PictureAttribution.styles'

const PictureAttribution = ({ visible, attribution }) => (
  <Attribution>
    {visible && attribution && (
      <AttributionText>
        Photo by{' '}
        <AttributionLink
          href={attribution.photographerUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {attribution.photographerName}
        </AttributionLink>{' '}
        on{' '}
        <AttributionLink
          href={attribution.unsplashUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </AttributionLink>
      </AttributionText>
    )}
  </Attribution>
)

export default PictureAttribution
