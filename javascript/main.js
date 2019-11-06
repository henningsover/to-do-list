const filterByField = document.querySelector('#filterByField')
const todoForm = document.querySelector('#todoForm')
const activityInputField = document.querySelector('#activityInputField')
const submitButton = document.querySelector('#submitButton')
const select = document.querySelector('select')
const dateSelect = document.querySelector('#dateSelect')
const filterBtns = document.querySelectorAll('.filterBtns')

const allCategories = {
  clean: 'Städ',
  decoration: 'Dekoration',
  cooking: 'Matlagning'
}

let allActivities = [
  {
    name: 'Klä granen',
    date: '2019-11-01',
    category: 'decoration'
  },
  {
    name: 'Griljera skinkan ',
    date: '2019-12-05',
    category: 'cooking'
  },
  {
    name: 'Dammsuga',
    date: '2019-12-14',
    category: 'clean'
  }
]

const currentDate = new Date()
let defaultDate
if (currentDate.getDate() < 10) {
  defaultDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + '-0' + currentDate.getDate()
  dateSelect.value = defaultDate
} else {
  defaultDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
  dateSelect.value = defaultDate
}
let chosenDate = defaultDate
dateSelect.addEventListener('change', function () {
  chosenDate = dateSelect.value
})

const defaultCategoryText = 'clean'
const defaultCategoryValue = select.options[select.selectedIndex].value
let chosenCategory = defaultCategoryText
select.addEventListener('change', function () {
  chosenCategory = select.value
})

submitButton.addEventListener('click', function (event) {
  event.preventDefault()
  if (activityInputField.value !== '' && activityInputField.value !== null) {
    if (chosenDate !== '' && chosenDate !== null) {
      const newActivity = {}
      newActivity.name = activityInputField.value
      newActivity.date = chosenDate
      newActivity.category = chosenCategory
      allActivities.push(newActivity)
      setFormToDefault()
      drawActivities()
    } else{
      alert('Ange ett giltigt datum')
    }
  } else {
    alert('Ange ett aktivitetsnamn')
  }
})

function setFormToDefault() {
  activityInputField.value = ''
  chosenDate = defaultDate
  dateSelect.value = defaultDate
  chosenCategory = defaultCategoryText
  select.value = defaultCategoryValue
}

function drawActivities() {
  const elementList = document.querySelector('#activitiesList')
  elementList.innerHTML = ''

  let activitiesToDraw = allActivities;

  const filterText = filterByField.value.toLowerCase()
  if (filterText) {
    activitiesToDraw = activitiesToDraw.filter(function (activity) {
      return activity.name.toLowerCase().includes(filterText)
    })
  }

  let filterCategory
  for (let i = 0; i < filterBtns.length; i++) {
    if (filterBtns[i].checked) {
      filterCategory = filterBtns[i].value
    }
  }

  if (filterCategory && filterCategory !== 'all') {
    activitiesToDraw = activitiesToDraw.filter(function (activity) {
      return activity.category.includes(filterCategory)
    })
  }

  activitiesToDraw.forEach(function (activity, i) {

    const li = document.createElement('li')
    li.classList.add('list-row')
    liRowContent = document.createElement('div')
    liRowContent.classList.add('list-row-content')

    const activityName = document.createElement('span')
    activityName.classList.add('activity')
    activityName.textContent = activity.name

    const date = document.createElement('span')
    date.textContent = activity.date
    date.classList.add('list-date')

    const expired = document.createElement('span')
    expired.textContent = '⚠️Datumet har passerat'
    expired.classList.add('list-expired')

    const category = document.createElement('span')
    category.textContent = allCategories[activity.category]
    category.classList.add('list-category')

    const delBtn = document.createElement('button')
    delBtn.addEventListener('click', removeActivity)
    delBtn.dataset.indexInArray = i
    delBtn.classList.add('del-btn')

    liRowContent.appendChild(activityName)
    liRowContent.appendChild(date)
    if (Date.parse(activity.date) < Date.parse(defaultDate)) {
      liRowContent.appendChild(expired)
    }
    liRowContent.appendChild(category)
    liRowContent.appendChild(delBtn)
    li.appendChild(liRowContent)
    elementList.appendChild(li)
  })

}
drawActivities()

function removeActivity() {
  const clickedBtn = this;
  const shouldDelete = confirm('Vill du ta bort aktiviteten?')
  if (shouldDelete) {
    allActivities = allActivities.filter(function (activity, i) {
      return i !== parseInt(clickedBtn.dataset.indexInArray);
    });
    drawActivities();
  }
}

filterByField.addEventListener('input', function (event) {
  drawActivities()
})


filterBtns.forEach(function (btn) {
  btn.addEventListener('change', function () {
    drawActivities()
  })
})