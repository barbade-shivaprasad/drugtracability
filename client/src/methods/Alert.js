const toggleAlert=(type,message)=>{
    let ele = document.getElementById(`alert${type}`);
    let arr = document.querySelectorAll('.MuiAlert-message');
    arr[0].textContent = message;
    arr[1].textContent = message;
    ele.style.display="block"
     console.log("TOGGLE ALERT")
    setTimeout(() => {
        ele.style.display = "none"
    }, 2000);

}

module.exports = toggleAlert;