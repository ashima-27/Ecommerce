
export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(item),
  headers:{'content-type':'application/json'}
    })
    const data= await response.json();
    resolve({data});
  }
  );
}

export function fetchItemsByUserId(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/cart?user=${id}`)
    const data= await response.json();
    console.log(data)
    resolve({data});
  }
  );
}

export function updateCart(update){
  return new Promise(async(resolve)=>{
    const response = await fetch(`http://localhost:8080/cart/${update.id}`,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    })
    const data= await response.json();
    resolve({data});
  }
   
  );
}

export function deleteItemFromCart(itemId){
  return new Promise(async(resolve)=>{
    const response = await fetch(`http://localhost:8080/cart/${itemId}`,{
      method:'DELETE',
      // body:JSON.stringify(itemId),
      headers:{'content-type':'application/json'}
    })
    
    const data= await response.json();
    console.log(data);
    resolve({data:{id:itemId}});
  }
   
  );
}

export async function resetCart(userId){
  return new Promise(async(resolve)=>{
const response = await fetchItemsByUserId(userId);
const items=response.data;

for(let item of items){
  await deleteItemFromCart(item.id)
}

resolve({status:'success'})
  }
  )
  
}