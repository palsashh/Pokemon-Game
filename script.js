const fight = document.getElementById('fight');
const cardHeader = document.getElementById('card_header');
const p1Name = document.getElementById('p1_name');
const p1Score = document.getElementById('p1_score');
const p2Name = document.getElementById('p2_name');
const p2Score = document.getElementById('p2_score');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');

const imgElement1 = card1.querySelector('#img');
const nameElement1 = card1.querySelector('#name');
const experienceElement1 = card1.querySelector('#experience');
const abilitiesList1 = card1.querySelector('#abilities');

const imgElement2 = card2.querySelector('#img');
const nameElement2 = card2.querySelector('#name');
const experienceElement2 = card2.querySelector('#experience');
const abilitiesList2 = card2.querySelector('#abilities');


let scorePalyer1 = 0;
let scorePalyer2 = 0;

function getResponse(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      return response.json();
    });
}

async function cardData() {
  try {
    const dataResponse = await getResponse('https://pokeapi.co/api/v2/pokemon/');
    fight.addEventListener('click', () => {
      displayCards(dataResponse);
    });
  } catch (error) {
    console.error(error);
  }
}

async function displayCards(data) {
  imgElement1.innerHTML = '';
  imgElement2.innerHTML = '';
//   abilitiesList1.innerHTML = '';
//   abilitiesList2.innerHTML = '';

abilitiesList1.querySelectorAll('li').forEach((li) => {
    li.textContent = '';
  });
  abilitiesList2.querySelectorAll('li').forEach((li) => {
    li.textContent = '';
  });

  const cardList = data.results;

  const firstPlayerData = shuffleArray([...cardList]);
  const secondPlayerData = shuffleArray([...cardList]);

  p1Name.textContent = 'John';
  p2Name.textContent = 'Alice';
  nameElement1.textContent = firstPlayerData.name;
  nameElement2.textContent = secondPlayerData.name;

  try {
    
    const response1 = await getResponse(firstPlayerData.url);
    response1.abilities.forEach((element) => {
      const ability = document.createElement('li');
      ability.textContent = element.ability.name;
      abilitiesList1.appendChild(ability);
    });
    experienceElement1.textContent = response1.base_experience;
    const image1 = document.createElement('img');
    image1.setAttribute('src', response1.sprites.front_default);
    imgElement1.appendChild(image1);
  } catch (error) {
    console.error(error);
  }

  try {
    
    const response2 = await getResponse(secondPlayerData.url);
    response2.abilities.forEach((element) => {
      const ability = document.createElement('li');
      ability.textContent = element.ability.name;
      abilitiesList2.appendChild(ability);
    });
    experienceElement2.textContent = response2.base_experience;
    const image2 = document.createElement('img');
    image2.setAttribute('src', response2.sprites.front_default);
    imgElement2.appendChild(image2);

    const experience1 = parseInt(experienceElement1.textContent);
    const experience2 = parseInt(experienceElement2.textContent);

    if (experience1 > experience2) {
      // Increment score for player 1
      scorePalyer1++;
    } else if (experience2 > experience1) {
      // Increment score for player 2
      scorePalyer2++;
    }

    // Update the score elements
    p1Score.textContent = `Score: ${scorePalyer1}`;
    p2Score.textContent = `Score: ${scorePalyer2}`;
  } catch (error) {
    console.error(error);
  }
}

function shuffleArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

cardData();
