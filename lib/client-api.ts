import { IListItem } from './../types/clientTypes';

export async function fetchAutoCompleteObjects(
  q: string
): Promise<IListItem[]> {
  const url = `/api/objects/autocomplete`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(q),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(`${response.text()}`);
  }

  return await response.json();
}
