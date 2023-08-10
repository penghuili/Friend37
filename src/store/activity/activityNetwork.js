import apps from '../../shared/js/apps';
import asyncForEach from '../../shared/js/asyncForEach';
import { decryptMessageSymmetric, encryptMessageSymmetric } from '../../shared/js/encryption';
import HTTP from '../../shared/react/HTTP';

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

export async function fetchActivity(friendId, activityId, decryptedPassword) {
  try {
    const activity = await HTTP.get(
      apps.friend37.name,
      `/v1/friends/${friendId}/activities/${activityId}`
    );

    const decrypted = await decryptActivityContent(activity, decryptedPassword);

    return {
      data: decrypted,
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
