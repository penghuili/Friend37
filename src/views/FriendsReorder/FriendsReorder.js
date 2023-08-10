import React from 'react';

import { calculateItemPosition } from '../../shared/js/position';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DragDrop from '../../shared/react-pure/DragDrop';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function FriendsReorder({ isLoading, friends, onFetch, onUpdate }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Reorder friends" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <DragDrop
          items={friends}
          titleKey="name"
          onDragEnd={(sourceId, targetId) => {
            const newPosition = calculateItemPosition(friends, sourceId, targetId);
            onUpdate({ childId: sourceId, position: newPosition, goBack: false, reorder: true });
          }}
        />
      </ContentWrapper>
    </>
  );
}

export default FriendsReorder;
