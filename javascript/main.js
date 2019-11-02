let allActivities = [
  {
    name: 'Klippa häcken'
  },
  {
    name: 'Dricka kaffet'
  },
  {
    name: 'Mata djuren'
  }
]

const todoForm = document.querySelector('#todoForm')
const activityInputField = document.querySelector('#activityInputField')
const submitButton = document.querySelector('#submitButton')
// const activitiesList = document.querySelector('#activitiesList')

submitButton.addEventListener('click', function (event) {
  event.preventDefault()
  if(activityInputField.value !== '' && activityInputField.value !== null) {
    const newActivity = {}
  newActivity.name = activityInputField.value
  allActivities.push(newActivity)
  activityInputField.value = ''
  drawActivities(allActivities)
  }
})

function drawActivities(activitiesList) {
  const elementList = document.querySelector('#activitiesList')
  elementList.innerHTML=''
  activitiesList.forEach(function(activity, i) {
    const li = document.createElement('li')
    li.classList.add('list-row')
    liRowContent = document.createElement('div')
    liRowContent.classList.add('list-row-content')
    const span = document.createElement('span')
    span.classList.add('activity')
    span.textContent = activity.name
    const delBtn = document.createElement('button')
    delBtn.addEventListener('click', removeActivity)
    delBtn.dataset.indexInArray = i
    delBtn.classList.add('del-btn')
    
    liRowContent.appendChild(span)
    liRowContent.appendChild(delBtn)
    li.appendChild(liRowContent)
    elementList.appendChild(li)
  })

}

drawActivities(allActivities)

function removeActivity() {
  const clickedBtn = this;
  const shouldDelete = confirm('Vill du ta bort aktiviteten?')
  if(shouldDelete) {
    allActivities = allActivities.filter(function(activity, i) {
      return i !== parseInt(clickedBtn.dataset.indexInArray);
    });
    drawActivities(allActivities);
  }
}

const filterByField = document.querySelector('#filterByField')
filterByField.addEventListener('input', function(event) {
  const filteredActivities = allActivities.filter(function(activity) {
    return activity.name.toLowerCase().includes(event.currentTarget.value.toLowerCase())
  }) 
  drawActivities(filteredActivities)
})