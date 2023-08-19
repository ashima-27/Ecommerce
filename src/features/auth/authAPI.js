
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    // const response = await fetch('http://localhost:8080/users/createuser',{
      const response = await fetch('http://localhost:4000/users/createUser',{
      method:'POST',
      body:JSON.stringify(userData),
  headers:{'content-type':'application/json'}
    })
    const data= await response.json();
    const token = data.token;
    localStorage.setItem('token', token);
    resolve({data});
  }

  
  );
}
export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}


export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
 
    const email= loginInfo.email;
    const password= loginInfo.password;
    // const response = await fetch(`http://localhost:8080/users/fetchUserById`)
    const response = await fetch(`http://localhost:4000/users/fetchUserById/${email}`)
    
    const data = await response.json();
    console.log(data)
    const token = data.token;
        localStorage.setItem("email",email)
     
    if(data.length){
      if(password===data[0].password){
        resolve({data:data[0]})
         return token;
      }else{
        reject({message:'wrong credentials'})
      }
    }else{
      reject({message:'user not found !'})
    }
  });
}

export function updateUser(update){
  return new Promise(async (resolve)=>{
    const response= await fetch(`http://localhost:8080/users/${update.id}`,{
      method:'POST',
      body:JSON.stringify(update),
  headers:{'content-type':'application/json'}
    })
    const data= await response.json();
    resolve({data});
  }
  );
}

export function signOut(userId){
  return new Promise(async (resolve)=>{
    const response= await fetch(`http://localhost:4000/users/${userId}`)
    const data= await response.json();
    resolve({data:'success'});
  }
  );
}
export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:4000/users/forgetpass/'+email, {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}
export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:4000/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}