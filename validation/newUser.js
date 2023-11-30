const userValidation = (data) => {
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.gender = !isEmpty(data.gender) ? data.gender: "";
    data.avatar = !isEmpty(data.avatar) ? data.avatar: "";
    data.domain = !isEmpty(data.domain) ? data.domain: "";
    data.available = !isEmpty(data.available) ? data.available: false;
}


module.exports = userValidation;