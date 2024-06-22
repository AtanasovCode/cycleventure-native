const formatMoney = (number) => {
    let numStr = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + numStr;
}


export { formatMoney }