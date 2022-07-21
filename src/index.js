import './style.css';

const refresh = document.querySelector('.btn-refresh');
const form = document.getElementById('form');
const listScore = document.getElementById('score_list');

const gameId = 'Ni1OxKmEJWvyYe0xcLQq';

const submitScore = async (userName, userScore) => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
    method: 'POST',
    body: JSON.stringify({
      user: userName,
      score: userScore,
    }),
    headers: {
      'Content-Type': 'application/json', charset: 'UTF-8',
    },
  });
  const gameResult = await response.json();
  return gameResult;
};

const fetchData = async () => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
  const getResult = await response.json();
  const resultArray = getResult.result;
  const values = resultArray.map((result) => `<li class="display-table-list">
                      <p>${result.user}: ${result.score}</p>
                  </li>`).join('');
  listScore.innerHTML = values;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await submitScore(form.name.value, form.score.value);
  form.name.value = '';
  form.score.value = '';
});

refresh.addEventListener('click', async () => {
  fetchData();
});

fetchData();