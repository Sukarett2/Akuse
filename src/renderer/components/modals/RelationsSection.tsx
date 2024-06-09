import { MediaRelations } from '../../../types/anilistGraphQLTypes';
import { getParsedRelationEdges, getParsedRelationType } from '../../../modules/utils';

interface RelationsSectionProps {
  relations: MediaRelations;
}

const RelationsSection: React.FC<RelationsSectionProps> = ({
  relations
}) => (
  <div className='relations-section'>
    <h2>Relations</h2>
    <div className='relations'>
      {getParsedRelationEdges(relations).map(({ relationType, node: media }) => (
        <div className='relation-entry'>
          <div className='relation-cover' style={{ backgroundImage: `url(${media.coverImage.large})` }} />
          <div className='relation-content'>
            <div className='type'>{getParsedRelationType(relationType)}</div>
            <div className='title'>{media.title.userPreferred}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RelationsSection;