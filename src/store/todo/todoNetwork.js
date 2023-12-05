import { apps } from '../../shared/js/apps';
import { asyncForEach } from '../../shared/js/asyncForEach';
import { decryptMessageSymmetric, encryptMessageSymmetric } from '../../shared/js/encryption';
import HTTP from '../../shared/react/HTTP';

export async function fetchTodos(friendId, decryptedPassword) {
  try {
    const items = await HTTP.get(apps.friend37.name, `/v1/friends/${friendId}/todos`);

    const decryptedItems = [];
    await asyncForEach(items, async item => {
      const decrypted = await decryptTodoContent(item, decryptedPassword);
      decryptedItems.push(decrypted);
    });

    return { data: { items: decryptedItems }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchTodo(friendId, todoId, decryptedPassword) {
  try {
    const todo = await HTTP.get(apps.friend37.name, `/v1/friends/${friendId}/todos/${todoId}`);

    const decrypted = await decryptTodoContent(todo, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createTodo(friendId, { title, note, date }, decryptedPassword) {
  try {
    const { title: encryptedTitle, note: encryptedNote } = await encryptTodoContent(
      { title, note },
      decryptedPassword
    );

    const response = await HTTP.post(apps.friend37.name, `/v1/friends/${friendId}/todos`, {
      title: encryptedTitle,
      note: encryptedNote,
      date,
    });

    const decrypted = await decryptTodoContent(response, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function markTodoAsDone(friendId, todoId, decryptedPassword) {
  try {
    const response = await HTTP.put(
      apps.friend37.name,
      `/v1/friends/${friendId}/todos/${todoId}/done`
    );

    const decrypted = await decryptTodoContent(response, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function markTodoAsUndone(friendId, todoId, decryptedPassword) {
  try {
    const response = await HTTP.put(
      apps.friend37.name,
      `/v1/friends/${friendId}/done-todos/${todoId}/undo`
    );

    const decrypted = await decryptTodoContent(response, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateTodo(
  friendId,
  todoId,
  { title, note, date, position },
  decryptedPassword
) {
  try {
    const { title: encryptedTitle, note: encryptedNote } = await encryptTodoContent(
      { title, note },
      decryptedPassword
    );

    const response = await HTTP.put(apps.friend37.name, `/v1/friends/${friendId}/todos/${todoId}`, {
      title: encryptedTitle,
      note: encryptedNote,
      date,
      position,
    });

    const decrypted = await decryptTodoContent(response, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteTodo(friendId, todoId) {
  try {
    const result = await HTTP.delete(apps.friend37.name, `/v1/friends/${friendId}/todos/${todoId}`);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function encryptTodoContent(data, decryptedPassword) {
  const { title, note } = data;

  const encryptedTitle = await encryptMessageSymmetric(decryptedPassword, title);
  const encryptedNote = note ? await encryptMessageSymmetric(decryptedPassword, note) : note;

  return {
    ...data,
    title: encryptedTitle,
    note: encryptedNote,
  };
}

export async function decryptTodoContent(data, decryptedPassword) {
  const { title, note } = data;

  const decryptedTitle = await decryptMessageSymmetric(decryptedPassword, title);
  const decryptedNote = note ? await decryptMessageSymmetric(decryptedPassword, note) : null;

  return {
    ...data,
    title: decryptedTitle,
    note: decryptedNote,
  };
}
