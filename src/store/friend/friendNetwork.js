import apps from '../../shared/js/apps';
import asyncForEach from '../../shared/js/asyncForEach';
import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessage,
  encryptMessageSymmetric,
} from '../../shared/js/encryption';
import generatePassword from '../../shared/js/generatePassword';
import { LocalStorage, sharedLocalStorageKeys } from '../../shared/js/LocalStorage';
import HTTP from '../../shared/react/HTTP';

export async function fetchFriends() {
  try {
    const items = await HTTP.get(apps.friend37.name, `/v1/friends`);

    const decryptedItems = [];
    await asyncForEach(items, async item => {
      const decrypted = await decryptFriendContent(item);
      decryptedItems.push(decrypted);
    });

    return { data: decryptedItems, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createFriend({ name, summary, email, phone, birthday }) {
  try {
    const password = generatePassword(20, true);
    const {
      name: encryptedName,
      summary: encryptedSummary,
      email: encryptedEmail,
      phone: encryptedPhone,
      birthday: encryptedBirthday,
    } = await encryptFriendContent({ name, summary, email, phone, birthday }, password);
    const encryptedPassword = await encryptMessage(
      LocalStorage.get(sharedLocalStorageKeys.publicKey),
      password
    );

    const data = await HTTP.post(apps.friend37.name, `/v1/friends`, {
      password: encryptedPassword,
      name: encryptedName,
      summary: encryptedSummary,
      email: encryptedEmail,
      phone: encryptedPhone,
      birthday: encryptedBirthday,
    });

    const decrypted = await decryptFriendContent(data);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateFriend(
  friendId,
  { name, summary, email, phone, birthday, position },
  decryptedPassword
) {
  try {
    const {
      name: encryptedName,
      summary: encryptedSummary,
      email: encryptedEmail,
      phone: encryptedPhone,
      birthday: encryptedBirthday,
    } = await encryptFriendContent({ name, summary, email, phone, birthday }, decryptedPassword);

    const response = await HTTP.put(apps.friend37.name, `/v1/friends/${friendId}`, {
      name: encryptedName,
      summary: encryptedSummary,
      email: encryptedEmail,
      phone: encryptedPhone,
      birthday: encryptedBirthday,
      position,
    });

    const decrypted = await decryptFriendContent(response);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteFriend(friendId) {
  try {
    const result = await HTTP.delete(apps.friend37.name, `/v1/friends/${friendId}`);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchActivities(friendId, startKey, decryptedPassword) {
  try {
    const query = startKey ? `?startKey=${startKey}` : '';
    const {
      items,
      startKey: newStartKey,
      limit,
    } = await HTTP.get(apps.friend37.name, `/v1/friends/${friendId}/activities${query}`);

    const decryptedItems = [];
    await asyncForEach(items, async item => {
      const decrypted = await decryptActivityContent(item, decryptedPassword);
      decryptedItems.push(decrypted);
    });

    return {
      data: {
        items: decryptedItems,
        startKey: newStartKey,
        hasMore: decryptedItems.length >= limit,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createActivity(friendId, { note, date }, decryptedPassword) {
  try {
    const { note: encryptedNote } = await encryptActivityContent({ note }, decryptedPassword);

    const response = await HTTP.post(apps.friend37.name, `/v1/friends/${friendId}/activities`, {
      note: encryptedNote,
      date,
    });

    const decrypted = await decryptActivityContent(response, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateActivity(friendId, activityId, { note }, decryptedPassword) {
  try {
    const { note: encryptedNote } = await encryptActivityContent({ note }, decryptedPassword);

    const response = await HTTP.put(
      apps.friend37.name,
      `/v1/friends/${friendId}/activities/${activityId}`,
      {
        note: encryptedNote,
      }
    );

    const decrypted = await decryptActivityContent(response, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteActivity(friendId, activityId) {
  try {
    const result = await HTTP.delete(
      apps.friend37.name,
      `/v1/friends/${friendId}/activities/${activityId}`
    );

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchTodos(friendId, decryptedPassword) {
  try {
    const items = await HTTP.get(apps.friend37.name, `/v1/friends/${friendId}/todos`);

    const decryptedItems = [];
    await asyncForEach(items, async item => {
      const decrypted = await decryptTodoContent(item, decryptedPassword);
      decryptedItems.push(decrypted);
    });

    return { data: decryptedItems, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchDoneTodos(friendId, startKey, decryptedPassword) {
  try {
    const query = startKey ? `?startKey=${startKey}` : '';
    const {
      items,
      startKey: newStartKey,
      limit,
    } = await HTTP.get(apps.friend37.name, `/v1/friends/${friendId}/done-todos${query}`);

    const decryptedItems = [];
    await asyncForEach(items, async item => {
      const decrypted = await decryptTodoContent(item, decryptedPassword);
      decryptedItems.push(decrypted);
    });

    return {
      data: {
        items: decryptedItems,
        startKey: newStartKey,
        hasMore: decryptedItems.length >= limit,
      },
      error: null,
    };
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
    const result = await HTTP.delete(
      apps.friend37.name,
      `/v1/friends/${friendId}/todos/${todoId}`
    );

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function encryptFriendContent(data, decryptedPassword) {
  const { name, summary, email, phone, birthday } = data;

  const encryptedName = name ? await encryptMessageSymmetric(decryptedPassword, name) : name;
  const encryptedSummary = summary
    ? await encryptMessageSymmetric(decryptedPassword, summary)
    : summary;
  const encryptedEmail = email ? await encryptMessageSymmetric(decryptedPassword, email) : email;
  const encryptedPhone = phone ? await encryptMessageSymmetric(decryptedPassword, phone) : phone;
  const encryptedBirthday = birthday
    ? await encryptMessageSymmetric(decryptedPassword, birthday)
    : birthday;

  return {
    ...data,
    name: encryptedName,
    summary: encryptedSummary,
    email: encryptedEmail,
    phone: encryptedPhone,
    birthday: encryptedBirthday,
  };
}

async function decryptFriendContent(data) {
  const { password, name, summary, email, phone, birthday } = data;

  const privateKey = LocalStorage.get(sharedLocalStorageKeys.privateKey);
  const decryptedPassword = await decryptMessage(privateKey, password);
  const decryptedName = await decryptMessageSymmetric(decryptedPassword, name);
  const decryptedSummary = summary
    ? await decryptMessageSymmetric(decryptedPassword, summary)
    : null;
  const decryptedEmail = email ? await decryptMessageSymmetric(decryptedPassword, email) : null;
  const decryptedPhone = phone ? await decryptMessageSymmetric(decryptedPassword, phone) : null;
  const decryptedBirthday = birthday
    ? await decryptMessageSymmetric(decryptedPassword, birthday)
    : null;

  return {
    ...data,
    name: decryptedName,
    summary: decryptedSummary,
    email: decryptedEmail,
    phone: decryptedPhone,
    birthday: decryptedBirthday,
    decryptedPassword,
    todos: data.todos || [],
    doneTodos: data.doneTodos || [],
    activities: data.activities || [],
  };
}

async function encryptActivityContent(data, decryptedPassword) {
  const { note } = data;

  const encryptedNote = note ? await encryptMessageSymmetric(decryptedPassword, note) : note;

  return {
    ...data,
    note: encryptedNote,
  };
}

async function decryptActivityContent(data, decryptedPassword) {
  const { note } = data;

  const decryptedNote = note ? await decryptMessageSymmetric(decryptedPassword, note) : null;

  return {
    ...data,
    note: decryptedNote,
  };
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

async function decryptTodoContent(data, decryptedPassword) {
  const { title, note } = data;

  const decryptedTitle = await decryptMessageSymmetric(decryptedPassword, title);
  const decryptedNote = note ? await decryptMessageSymmetric(decryptedPassword, note) : null;

  return {
    ...data,
    title: decryptedTitle,
    note: decryptedNote,
  };
}
