function addToLocalStorage(key, value){
    if(typeof(value) === "object"){
        localStorage.setItem(key, JSON.stringify(value));
    }else{
        localStorage.setItem(key, value);
    }
}

function getFromLocalStorage(key){
    let value = localStorage.getItem(key);
    if(!value){
        return null;
    }

    try{
        return JSON.parse(value);
    }catch(err){
        return value;
    }
}

function updateFromLocalStorage(key, newValue){
    let value = localStorage.getItem(key);
    if(!value){
        return null;
    }

    try{
        localStorage.setItem(key, newValue);
    }catch(err){
        return value;
    }
}

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
}

const methods = {
    addToLocalStorage,
    getFromLocalStorage,
    updateFromLocalStorage,
    removeFromLocalStorage,
};

export default methods;