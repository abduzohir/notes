function randomId(){return Math.round(Math.random() * 100000)}
// const tasks = [
//   {
//     id: randomId(),
//     title: '1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, fugit?',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident totam nostrum saepe cupiditate aliquam quisquam reiciendis est, eum, temporibus harum molestias recusandae itaque illum doloremque aperiam deserunt vel incidunt a.',
//   },
//   {
//     id: randomId(),
//     title: '2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, fugit?',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident totam nostrum saepe cupiditate aliquam quisquam reiciendis est, eum, temporibus harum molestias recusandae itaque illum doloremque aperiam deserunt vel incidunt a.',
//   },
//   {
//     id: randomId(),
//     title: '3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, fugit?',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident totam nostrum saepe cupiditate aliquam quisquam reiciendis est, eum, temporibus harum molestias recusandae itaque illum doloremque aperiam deserunt vel incidunt a.',
//   },
// ]
const themes = {
  light: {
    'asdf' : 'asdf',
    '--bg': '#deb887',
    '--color-text': '#010101',
    '--del-btn': '#990000',
    '--body-bg': '#f2f2f2',
    '--icon-sun-color': '#deb887',
    '--icon-moon-color': '#010101',
  },
  dark: {
    'asdf' : 'asdf',
    '--bg': '#111111',
    '--color-text': '#ffffff',
    '--del-btn': '#ffbb00',
    '--body-bg': '#2e2e2e',
    '--icon-sun-color': '#ffffff',
    '--icon-moon-color': '#010101',
  },
}
// elements
const contentItems = document.querySelector('.content-items');
const tasksForm = document.tasksForm
const inpTitle = tasksForm.elements.title
const areaContent = tasksForm.elements.content
const btnLightOrDark = document.querySelector('.navbar-theme'); 
// events
tasksForm.addEventListener('submit', onFormSubmit)
btnLightOrDark.addEventListener('click', selectedTheme)
document.addEventListener('DOMContentLoaded', addTasks)
document.addEventListener('DOMContentLoaded', addTheme)
// изменение темы сайта
function selectedTheme(){
  if(btnLightOrDark.classList.contains('light')){
    btnLightOrDark.classList.remove('light')
    btnLightOrDark.classList.add('dark')
    btnLightOrDark.setAttribute('data-theme', 'dark')
  }else{
    btnLightOrDark.classList.remove('dark')
    btnLightOrDark.classList.add('light')
    btnLightOrDark.setAttribute('data-theme', 'light')
  }
  const themeAttr = btnLightOrDark.getAttribute('data-theme')
  const themeObj = themes[themeAttr];
  let themeStr = '';
  for(const key in themeObj){
    themeStr += `${key}: ${themeObj[key]}; `
  }
// DZ
  let locThemeStr = []
  if(localStorage.getItem('theme') === null){
    locThemeStr.push(themeStr)
  }else{
    locThemeStr.push(themeStr)
  }
  localStorage.setItem('theme', JSON.stringify(locThemeStr))
  addTheme(themeStr, locThemeStr)
  // btn start
  function nam() {
    let btnAttr = [btnLightOrDark.getAttribute('data-theme')]
    localStorage.setItem('btn', btnAttr)
  }
  nam()
}
if (localStorage.getItem('btn') == 'dark') {
  btnLightOrDark.classList.remove('light')
  btnLightOrDark.classList.add('dark')
  btnLightOrDark.setAttribute('data-theme', 'dark')
}
  // btn end
function addTheme(themeStr, locThemeStr){
  let sws
  if(localStorage.getItem('theme') === null){
    locThemeStr.push(themeStr)
  }else{
    sws = JSON.parse(localStorage.getItem('theme'))
  }
  sws.forEach(function(s, key){
    document.documentElement.style = `${key}: ${s}; `
    console.log(s);
  })
}
// DZ

// вытаскиваем данные из массива и через генерацию карточки вставляем данные в HTML
// tasks.forEach(function(task){
//   const card = createCardTemplate(task)
//   contentItems.append(card)
// })
// отправка данных формы
function onFormSubmit(event){
  event.preventDefault()
  const valueTitle = inpTitle.value
  const valueContent = areaContent.value
  if(!valueContent || !valueTitle){
    alert('Заполните все поля')
    return
  }
  const task = newObj(valueTitle, valueContent)
  saveInLocalStorrage(task)
  const card = createCardTemplate(task)
  contentItems.insertAdjacentElement('afterbegin', card)
  tasksForm.reset()
}
function newObj(title, content){
  const newTasks = {id: randomId(), title: title, content: content}
  return newTasks
}
function saveInLocalStorrage(obj){
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(obj)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// вывод из локальной истории
function addTasks(){
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.reverse()
  tasks.forEach(function(task, key){
    contentItems.append(createCardTemplate(task));
  })
}
// функция генерации шаблона карточки
function createCardTemplate({id, title, content}){
  const item = document.createElement('div')
        item.classList.add('item')
        item.setAttribute('item-id', id)
  const itemText = document.createElement('div')
        itemText.classList.add('item__text')
  const h3 = document.createElement('h3')
        h3.innerHTML = title
  const p = document.createElement('p')
        p.innerHTML = content
  const delBtn = document.createElement('a')
        delBtn.classList.add('del-btn','icon-trash')
        delBtn.href = '#!'
        delBtn.innerHTML = 'Удалить'
  delBtn.addEventListener('click', function () {
    item.style = `display: none;`
    localStorage.removeItem('tasks')
  })
  item.append(itemText, delBtn)
  itemText.append(h3, p)
  return item
}

