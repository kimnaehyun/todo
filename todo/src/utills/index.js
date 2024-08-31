const local = 'http://localhost:3000'

export const all = async () => {
  const response = await fetch(`${local}/all`);
  const data = await response.json();
  return data;
};

export const checkData = (id, done) => {
  fetch(`${local}/check`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, done }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export const add = (title, content) => {
  fetch(`${local}/insert`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, done: 0 }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export const updateData = (id, title, content) => {
  fetch(`${local}/update`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, content }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export const remove = (id) => {

  fetch(`${local}/remove`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}