import './style.css';

const refresh = document.querySelector('.btn-refresh');
const leadersName = document.querySelector('leaders-name');
const leadersScore = document.querySelector('leaders-score');
const btnSubmit = document.querySelector('btn-submit');
const listScore = document.querySelector('listscore');

const gameId = 'Ni1OxKmEJWvyYe0xcLQq';

const submitScore = async (userName, userScore) => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
    method: 'POST',
    body: JSON.stringify({
      user: userName,
      score: userScore,
    }),
    headers: {
      'Content-Type': 'application/json', charset:"UTF-8",
    },
  });
  const gameResult = await response.json();
  return gameResult;
};

const fetchDataFromAPI = async () => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
  const getResult = await response.json();
  const resultArray = getResult.result;
  const values = resultArray.map((result) => `<li class="display-table-list">
                      <p>${result.user}: ${result.score}</p>
                  </li>`).join('');
  listScore.innerHTML = values;
};

btnSubmit.addEventListener('click', async () => {
  await submitScore(leadersName.value, leadersScore.value);
  leadersName.value = '';
  leadersScore.value = '';
  fetchData();
});

refresh.addEventListener('click', async () => {
  fetchData();
});

document.addEventListener('DOMContentLoaded', async () => {
  fetchData();
});