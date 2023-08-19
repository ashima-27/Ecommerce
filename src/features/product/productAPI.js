
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:4000/products/fetchAllProducts')
    const data= await response.json();
    resolve({data});
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:4000/products/fetchProductById/${id}`)
    const data= await response.json();
    resolve({data});
  }
  );
}

export function fetchProductsByFilters(filter,sort,pagination) {
 //filter={"category":"smartphone"}
 //sort={_sort:"price",_order="desc"}
 //pagination:{_page:1,_limit=10}
  let queryString=''

  for (let key in filter) {
    const categoryValues = filter[key];
    // if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    // }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
  }
 for (let key in pagination){
  queryString += `${key}=${pagination[key]}&`;
 }
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:4000/products/fetchAllProducts/?'+ queryString)
    const data= await response.json();
    const totalItems=await response.headers.get('X-Total-Count')
    resolve({data:{products:data},totalItems:{totalItems}});
  }
  );
}

export function fetchCategories(){
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:4000/categories/fetchCategory')
    const data= await response.json();
    resolve({data});
  }
  );
}

export function fetchBrands(){
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:4000/brands/fetchBrands')
    const data= await response.json();
    resolve({data});
  }
  );
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:4000/products/createProduct', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    console.log(update)
    const response = await fetch(
      'http://localhost:4000/products/updateProduct/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    console.log(data)
    resolve({ data });
  });
}
