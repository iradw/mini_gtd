let utils = {
    randomColor(){
			let colors = ['#FF0000 ', '#FF7F00', '#FFFF00 ', '#00FF00 ', '#00FFFF ', '#70F3FF', '#8D4BBB', '#3FBF00', '#3385FF', '#16A085', '#5CB85C', '#FF6600', '#5AA9F3']
       // return '#'+Math.floor(Math.random()*0xffff00).toString(16);
			return colors[Math.round(Math.random() * (colors.length-1))]
    },
    formatNow(){
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let day = now.getDate()
        if (month < 10){
            month = '0' + month
        }
        if (day < 10){
            day = '0' + day
        }
        return year + '-' + month + '-' + day
    }
}
module.exports = utils