//set new formData
export const setFormData = function (data) {
    console.log('is data =>' , data)
    let formData = new FormData()
    for (let i = 0; i <= data.length ; i++) {
        formData.append(data[i].name , data[i].value)
    }
    console.log('is form data =>' , formData)
    return formData
}
