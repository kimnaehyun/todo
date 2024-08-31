const local = 'http://localhost:3000'

export const all = async () => {
  try {
    const response = await fetch(`${local}/all`);
    if (!response.ok) {
      throw new Error("네트워크 응답이 OK가 아님");
    }
    const data = await response.json();
    sessionStorage.setItem('todo', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("취득에 문제가 있었습니다:", error);
    const sessionData = JSON.parse(sessionStorage.getItem('todo'));
    return sessionData || [];
  }
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