import { apps } from '../../shared/js/apps';
import { asyncForEach } from '../../shared/js/asyncForEach';
import HTTP from '../../shared/react/HTTP';
import { decryptTodoContent } from '../todo/todoNetwork';

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
