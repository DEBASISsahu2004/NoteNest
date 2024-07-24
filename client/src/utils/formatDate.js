const formatDate= (date)=>{
    const d = new Date(date);
    return d.toDateString();
}

export default formatDate;