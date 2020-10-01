/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
import axios from 'axios'

console.log(axios)

axios.get('https://api.github.com/users/aldenho52')
  .then(res => {
    console.log(res)
    const userData = res.data
    const card = cardMaker(userData)
    const cards = document.querySelector('.cards')
    cards.appendChild(card)


  })
  .catch(err => {
    console.log(err)
  })

  const followersArray = ['JuniorDugue', 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
  
  followersArray.forEach(user => {
    axios.get(`https://api.github.com/users/${user}`)
    .then(res => {
      // console.log(res)
      const userData = res.data
      const card = cardMaker(userData)
      const cards = document.querySelector('.cards')
      cards.appendChild(card)
    })
    .catch(err => {
      console.log(err)
    })
  })

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/aldenho52/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/


function cardMaker(userData) {

  // Instantiating the elements
  const card = document.createElement('div')
  const image = document.createElement('img')
  const cardInfo = document.createElement('div')
  const name = document.createElement('h3')
  const username = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const address = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')

  //creating heirachy
  card.appendChild(image)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(address)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)

  // setting up class names, 
  card.classList.add('card')
  cardInfo.classList.add('card-info')
  name.classList.add('name')
  username.classList.add('username')

  // attributes, text
  image.src = userData.avatar_url
  name.textContent = userData.name
  username.textContent = userData.login
  location.textContent = userData.location
  profile.href = userData.url 
  profile.textContent = userData.url
  followers.textContent = userData.followers
  following.textContent = userData.following
  bio.textContent = userData.bio

    // expand card extra info
    const extraInfo = document.createElement('div')
    const id = document.createElement('p')
    const repos = document.createElement('p')
    const reposURL = document.createElement('p')
    const createdAt = document.createElement('p')

  
    extraInfo.appendChild(id)
    extraInfo.appendChild(repos)
    extraInfo.appendChild(reposURL)
    extraInfo.appendChild(createdAt)
    card.appendChild(extraInfo)

    extraInfo.classList.add('extraInfo')

    id.textContent = `id: ${userData.id}`
    repos.textContent = `public repos: ${userData.public_repos}`
    reposURL.textContent = `repos URL: ${userData.repos_url}`
    createdAt.textContent = `account created on: ${userData.created_at}`
  
    // expand and close button
    const button = document.createElement('button')
    button.textContent = 'Click to Expand'
    button.classList.add('button')
    card.appendChild(button)

    button.addEventListener('click', event => {
      extraInfo.classList.toggle('card-open')
      if (button.textContent === 'Click to Expand') {
        button.textContent = 'Click to Close'
      } else {
        button.textContent = 'Click to Expand'
      }
    })

  return card
}
// ### Stretch Goals

// * Instead of manually creating a list of followers, do it programmatically. Create a function that requests the followers data from the API after it has received your data and create a card for each of your followers. Hint: you can chain promises.

function followersList (user) {

axios.get(`https://api.github.com/users/${user}/followers`)
  .then(res => {
    const followers = res.data
    // console.log(followers)
    return followers
  })
  .then(res => {
    const array = res
    // console.log(array)
    array.forEach(data => {
      axios.get(`https://api.github.com/users/${data.login}`)
      const card = cardMaker(data)
      const cards = document.querySelector('.cards')
      cards.appendChild(card)
    })
  })
  .catch(err => {
    console.log(err)
  })
  
}

followersList('aldenho52')   
//  Junior Dugue and Jahteo, my 2 followers..

followersList('tetondan')  
// tetondan has much more followers than me..

// * Look into adding more info as an expanding card. You will need to create some new CSS and a button that expands and contracts the card. 



// * Look into adding your GitHub contribution graph. There are a number of different ways of doing this, [this Stack Overflow discussion](https://stackoverflow.com/questions/34516592/embed-github-contributions-graph-in-website) will get you started.

// Note: Just a reminder the stretch goals are just extra practice using the tools we have learned. These are not required. Only parts 1-3 are required portions of the project. If you do not get to the stretch goals, don't worry.