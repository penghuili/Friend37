import { LocalStorage, sharedLocalStorageKeys } from '../../shared/js/LocalStorage';
import { apps } from '../../shared/js/apps';
import { asyncForEach } from '../../shared/js/asyncForEach';
import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessage,
  encryptMessageSymmetric,
} from '../../shared/js/encryption';
import { generatePassword } from '../../shared/js/generatePassword';
import HTTP from '../../shared/react/HTTP';

export async function fetchFriends() {
  try {
    const items = await HTTP.get(apps.friend37.name, `/v1/friends`);

    const decryptedItems = [];
    await asyncForEach(items, async item => {
      const decrypted = await decryptFriendContent(item);
      decryptedItems.push(decrypted);
    });

    return { data: { items: decryptedItems }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchFriend(friendId) {
  try {
    const item = await HTTP.get(apps.friend37.name, `/v1/friends/${friendId}`);

    const decrypted = await decryptFriendContent(item);

    return { data: decrypted, error: null };
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
