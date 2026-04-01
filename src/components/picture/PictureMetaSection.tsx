import {
  PictureMetaArea,
  AttributionLink,
  AttributionText,
} from './PictureAttribution.styles'
import { MetaErrorText } from './PictureMetaSection.styles'
import type { PictureAttribution } from '@/app/appState'

type PictureMetaSectionProps = {
  pictureFetchError: string | null
  isPictureLoading: boolean
  pictureAttribution: PictureAttribution
}

// Picture metadata section: web fetch error, attribution, or empty.
const PictureMetaSection = ({
  pictureFetchError,
  isPictureLoading,
  pictureAttribution,
}: PictureMetaSectionProps) => {
  if (isPictureLoading) {
    return <PictureMetaArea />
  }

  return (
    <PictureMetaArea aria-live="polite">
      {pictureFetchError && (
        <MetaErrorText role="alert">{pictureFetchError}</MetaErrorText>
      )}

      {pictureAttribution && (
        <AttributionText>
          Photo by{' '}
          <AttributionLink
            href={pictureAttribution.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pictureAttribution.photographerName}
          </AttributionLink>{' '}
          on{' '}
          <AttributionLink
            href={pictureAttribution.unsplashUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </AttributionLink>
        </AttributionText>
      )}
    </PictureMetaArea>
  )
}

export default PictureMetaSection
