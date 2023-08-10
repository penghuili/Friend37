import { Anchor, Box, Button, Menu, Spinner, Text } from 'grommet';
import { Checkmark, MoreVertical } from 'grommet-icons';
import React, { useState } from 'react';

import { formatDateWeekTime } from '../../../../shared/js/date';
import HorizontalCenter from '../../../../shared/react-pure/HorizontalCenter';
import { useEffectOnce } from '../../../../shared/react/hooks/useEffectOnce';
import RouteLink from '../../../../shared/react/RouteLink';

function Todos({
  todos,
  doneTodos,
  hasLoadedDoneTodos,
  hasMoreDoneTodos,
  doneTodosStartKey,
  onFetchTodos,
  onFetchDoneTodos,
  onMarkAsDone,
  onMarkAsUndone,
  onDelete,
  onNav,
  friendId,
  isMarkingDone,
  isMarkingUndone,
  isDeleting,
  isLoadingDoneTodos,
}) {
  const [markingDoneId, setMarkingDoneId] = useState(null);
  const [markingUndoneId, setMarkingUndoneId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffectOnce(() => {
    onFetchTodos({ id: friendId });
  });

  function showSpinnerForItem(todo) {
    return (
      (isMarkingDone && markingDoneId === todo.sortKey) ||
      (isMarkingUndone && markingUndoneId === todo.sortKey) ||
      (isDeleting && deleteId === todo.sortKey)
    );
  }

  function renderTodos() {
    if (!todos?.length) {
      return <Text margin="0 0 1rem">No todos</Text>;
    }

    return todos.map(todo => (
      <HorizontalCenter key={todo.sortKey}>
        {showSpinnerForItem(todo) ? (
          <Spinner size="xsmall" />
        ) : (
          <Checkmark
            onClick={() => {
              setMarkingDoneId(todo.sortKey);
              onMarkAsDone({ id: friendId, childId: todo.sortKey });
            }}
          />
        )}
        <Text margin="0 0 0 1rem">{todo.title}</Text>
        <Menu
          icon={<MoreVertical />}
          items={[
            {
              label: 'Update',
              onClick: () => onNav(`/friends/${friendId}/todos/${todo.sortKey}/update`),
              margin: '0.25rem 0',
            },
            {
              label: 'Delete',
              onClick: () => {
                setDeleteId(todo.sortKey);
                onDelete({ id: friendId, childId: todo.sortKey });
              },
              margin: '0.25rem 0',
              color: 'status-critical',
            },
          ]}
        />
      </HorizontalCenter>
    ));
  }

  function renderDoneTodos() {
    if (!hasLoadedDoneTodos) {
      return (
        <HorizontalCenter>
          <Anchor
            label="Load done todos"
            onClick={() => onFetchDoneTodos({ id: friendId, startKey: doneTodosStartKey })}
            size="xsmall"
          />
          {isLoadingDoneTodos && <Spinner size="xsmall" />}
        </HorizontalCenter>
      );
    }

    if (!doneTodos?.length) {
      return <Text margin="0 0 1rem">No done todos</Text>;
    }

    return (
      <>
        <Text weight="bold" margin="1rem 0 0">
          Done:
        </Text>
        {doneTodos.map(todo => (
          <Box key={todo.sortKey} margin="0 0 1rem">
            <HorizontalCenter>
              <Text size="xsmall">{formatDateWeekTime(new Date(todo.createdAt))}</Text>
              <Menu
                icon={<MoreVertical />}
                items={[
                  {
                    label: 'Undo',
                    onClick: () => {
                      setMarkingUndoneId(todo.sortKey);
                      onMarkAsUndone({ id: friendId, childId: todo.sortKey });
                    },
                    margin: '0.25rem 0',
                  },
                  {
                    label: 'Delete',
                    onClick: () => {
                      setDeleteId(todo.sortKey);
                      onDelete({ id: friendId, childId: todo.sortKey });
                    },
                    margin: '0.25rem 0',
                    color: 'status-critical',
                  },
                ]}
              />
              {showSpinnerForItem(todo) && <Spinner size="xsmall" />}
            </HorizontalCenter>
            <Text style={{ textDecoration: 'line-through' }}>{todo.title}</Text>
          </Box>
        ))}
        {hasMoreDoneTodos && (
          <Button
            label="Load done todos"
            onClick={() => onFetchDoneTodos({ id: friendId, startKey: doneTodosStartKey })}
            size="xsmall"
          />
        )}
      </>
    );
  }

  return (
    <>
      <Box margin="0 0 1rem">
        <HorizontalCenter>
          <RouteLink to={`/friends/${friendId}/todos/add`} label="Add todo" size="small" />
        </HorizontalCenter>
        {renderTodos()}
      </Box>

      {renderDoneTodos()}
    </>
  );
}

export default Todos;
