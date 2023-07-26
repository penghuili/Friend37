import { Anchor, Box, Button, Menu, Text } from 'grommet';
import { Checkmark, MoreVertical } from 'grommet-icons';
import React from 'react';
import { formatDateWeekTime } from '../../../../shared/js/date';
import HorizontalCenter from '../../../../shared/react-pure/HorizontalCenter';
import RouteLink from '../../../../shared/react/RouteLink';
import { useEffectOnce } from '../../../../shared/react/hooks/useEffectOnce';

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
}) {
  useEffectOnce(() => {
    onFetchTodos(friendId);
  });

  function renderTodos() {
    if (!todos?.length) {
      return <Text margin="0 0 1rem">No todos</Text>;
    }

    return todos.map(todo => (
      <HorizontalCenter key={todo.sortKey}>
        <Checkmark onClick={() => onMarkAsDone(friendId, todo.sortKey)} />
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
              onClick: () => onDelete(friendId, todo.sortKey),
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
        <Anchor
          label="Load done todos"
          onClick={() => onFetchDoneTodos(friendId, doneTodosStartKey)}
          size="xsmall"
        />
      );
    }

    if (!doneTodos?.length) {
      return <Text margin="0 0 1rem">No done todos</Text>;
    }

    return (
      <>
        <Text weight="bold">Done:</Text>
        {doneTodos.map(todo => (
          <Box key={todo.sortKey} margin="0 0 1rem">
            <HorizontalCenter>
              <Text size="xsmall">{formatDateWeekTime(new Date(todo.createdAt))}</Text>
              <Menu
                icon={<MoreVertical />}
                items={[
                  {
                    label: 'Undo',
                    onClick: () => onMarkAsUndone(friendId, todo.sortKey),
                    margin: '0.25rem 0',
                  },
                  {
                    label: 'Delete',
                    onClick: () => onDelete(friendId, todo.sortKey),
                    margin: '0.25rem 0',
                    color: 'status-critical',
                  },
                ]}
              />
            </HorizontalCenter>
            <Text style={{ textDecoration: 'line-through' }}>
              {todo.title}
            </Text>
          </Box>
        ))}
        {hasMoreDoneTodos && (
          <Button
            label="Load done todos"
            onClick={() => onFetchDoneTodos(friendId, doneTodosStartKey)}
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
