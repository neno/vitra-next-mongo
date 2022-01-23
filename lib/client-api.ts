import { IListItem } from './../types/clientTypes';

async function fetchAutoComplete(q: string, url: string) {
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

export async function fetchAutoCompleteObjects(
  q: string
): Promise<IListItem[]> {
  const url = `/api/objects/autocomplete`;
  return await fetchAutoComplete(q, url);
  // const response = await fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(q),
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8',
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error(`${response.text()}`);
  // }

  // return await response.json();
}

export async function fetchAutoCompleteDesigners(
  q: string
): Promise<IListItem[]> {
  const url = `/api/designers/autocomplete`;
  return await fetchAutoComplete(q, url);
  // const response = await fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(q),
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8',
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error(`${response.text()}`);
  // }

  // return await response.json();
}

export async function fetchAutoCompleteManufacturers(
  q: string
): Promise<IListItem[]> {
  const url = `/api/manufacturers/autocomplete`;
  return await fetchAutoComplete(q, url);
  // const response = await fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(q),
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8',
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error(`${response.text()}`);
  // }

  // return await response.json();
}
