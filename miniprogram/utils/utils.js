let utils = {
    randomColor(){
        return '#'+Math.floor(Math.random()*0xffffff).toString(16);
    },
    today(){
        let date = new Date()
        let month = date.getMonth()
        let day = date.getDay()
        if (month < 10)
            month = '0' + month
        if (day < 10)
            day = '0' + day
        return date.getFullYear() + '-' + month + '-' + day
    }
}
module.exports = utils