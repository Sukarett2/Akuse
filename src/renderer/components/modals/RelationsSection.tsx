import React, { useState } from 'react';
import { MediaRelations } from '../../../types/anilistGraphQLTypes';
import { getParsedRelationEdges, getParsedRelationType, getTitle } from '../../../modules/utils';
import { getAnimeInfo } from '../../../modules/anilist/anilistApi';
import { ListAnimeData } from '../../../types/anilistAPITypes';
import AnimeModal from './AnimeModal';

interface RelationsSectionProps {
  relations: MediaRelations;
  closeParent: () => void;
};

const RelationsSection: React.FC<RelationsSectionProps> = ({
  relations,
  closeParent
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [relatedAnime, setRelatedAnime] = useState<any | null>(null);

  const handleRelationClick = async (mediaId: number) => {
    const animeData = await getAnimeInfo(mediaId);
  
    setShowModal(true);
    setRelatedAnime({
      id: animeData.mediaListEntry?.id,
      mediaId,
      progress: animeData.mediaListEntry?.progress,
      media: animeData
    } as ListAnimeData);
  };

  return (
    <>
      <div className='relations-section'>
        <h2>Relations</h2>
        <div className='relations'>
          {getParsedRelationEdges(relations).map(({ relationType, node: media }, index) => (
            <div
              className='relation-entry'
              key={index}
              onClick={() => {
                closeParent();
                handleRelationClick(media.id);
              }}
            >
              <div
                className='relation-cover'
                style={{ backgroundImage: `url(${media.coverImage?.large})` }}
              />
              <div className='relation-content'>
                <div className='type'>{getParsedRelationType(relationType)}</div>
                <div className='title'>{getTitle(media)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {relatedAnime && (
        <AnimeModal
          listAnimeData={relatedAnime}
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default RelationsSection;