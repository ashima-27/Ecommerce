
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/orders/?users.id=${userId}`)
    const data= await response.json();
    resolve({data});
  }
  );
}
export function fetchLoggedInUser(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:4000/users/?users.id=${id}`) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:4000/users/updateUser/${update.email}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}