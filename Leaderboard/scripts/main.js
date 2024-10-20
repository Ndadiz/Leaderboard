function timePicker(){
    const now = new Date()
    const date = now.getDate()
    const year = now.getFullYear()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    const month = now.toLocaleString('default', { month: 'short' });
    const fullTime = ''
    if (minutes > 9 && seconds > 9){
        return `${month.toUpperCase()} ${date}, ${year} ${hours}:${minutes}:${seconds}`
    }
    else if(minutes < 9){
        return `${month.toUpperCase()} ${date}, ${year} ${hours}:0${minutes}:${seconds}`
    }
    else{
         return `${month.toUpperCase()} ${date}, ${year} ${hours}:${minutes}:0${seconds}`
    }
}
let leaderboard = []
function sort(){
    wrapper.innerHTML = ''
    const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score)
    console.log(sortedLeaderboard)
    for (player of sortedLeaderboard){
        const flexPlayer = document.createElement('div')
        flexPlayer.className = 'flex-player'
        const flexInfo = document.createElement('div')
        flexInfo.className = 'flex-info'
        const nameDate = document.createElement('div')
        nameDate.className = 'name-date'
        const name = document.createElement('p')
        name.textContent = player.name
        const date = document.createElement('p')
        date.textContent = player.date
        date.style.color = 'grey'
        nameDate.appendChild(name)
        nameDate.appendChild(date)
        const country = document.createElement('p')
        country.textContent = player.country
        const score = document.createElement('p')
        score.textContent = player.score
        flexInfo.appendChild(nameDate)
        flexInfo.appendChild(country)
        flexInfo.appendChild(score)
        const flexButtons = document.createElement('div')
        flexButtons.className = 'flex-buttons'
        const buttonOne = document.createElement('button')
        buttonOne.className = `player-button trash`
        buttonOne.innerHTML = '<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5001 6H3.5" stroke="#a32719" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9.5 11L10 16" stroke="#a32719" stroke-width="1.5" stroke-linecap="round"></path> <path d="M14.5 11L14 16" stroke="#a32719" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#a32719" stroke-width="1.5"></path> <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#a32719" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>'
        const buttonTwo = document.createElement('button')
        buttonTwo.className = `player-button plus-five`
        buttonTwo.textContent = '+5'
        const buttonThree = document.createElement('button')
        buttonThree.className = `player-button minus-five`
        buttonThree.textContent = '-5'
        flexButtons.appendChild(buttonOne)
        flexButtons.appendChild(buttonTwo)
        flexButtons.appendChild(buttonThree)
        flexPlayer.appendChild(flexInfo)
        flexPlayer.appendChild(flexButtons)
        wrapper.appendChild(flexPlayer)
    }
    const trashButton = document.getElementsByClassName('trash')
    const plusFive = document.getElementsByClassName('plus-five')
    const minusFive = document.getElementsByClassName('minus-five')
    for(let k = 0; k < minusFive.length; k++){
        minusFive[k].addEventListener('click', e=>{
            leaderboard[k].score -= 5
            sort()
        })
    }
    for(let j = 0; j < plusFive.length; j++){
        plusFive[j].addEventListener('click', e=>{
            leaderboard[j].score += 5
            sort()
        })
    }
    for ( let i = 0; i < trashButton.length; i++){
        trashButton[i].addEventListener('click', e => {
            leaderboard.splice(i, 1)
            sort()
        })
    }
}

const inputField = document.getElementsByClassName('input-field')
const button = document.getElementById('add-player')
const header = document.getElementsByTagName('header')[0]
const wrapper = document.getElementsByClassName('wrapper')[0]
const message = document.createElement('p')
wrapper.appendChild(message)
let isRequired = true
button.addEventListener('click', e =>{
    for (input of inputField){
        if(input.value === ''){
            message.textContent = 'All fields are required'
            message.style.color = 'red'
            message.style.fontSize = '20px'
            message.style.fontWeight = '700'
            isRequired = false
            break
        }
        else{
            isRequired = true
        }
    }
    if (isRequired){
        message.textContent = ''
        leaderboard.push({
            name: `${inputField[0].value.toUpperCase()} ${inputField[1].value.toUpperCase()}`,
            date: timePicker(),
            country: inputField[2].value.toUpperCase(),
            score: parseInt(inputField[3].value)
        });
        sort()
    }
})  