const displayBRLCurrency = (num) => {
    const formatter = new Intl.NumberFormat('pt-BR',{
        style : "currency",
        currency : 'BRL',
        minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default displayBRLCurrency