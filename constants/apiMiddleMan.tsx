const apiUrl = 'https://aw1443.brighton.domains/pomo/assets/php/database.php';

//////////////// Account Management //////////////////
/**
 * Login the user
 * @param {string} username The username of the user
 * @param {string} password The password of the user
 * @returns
 */
export async function login(username: string, password: string) {
  const form = new FormData();
  form.append('requestType', 'login');
  form.append('username', username);
  form.append('password', password);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}

//////////////// Todos Management //////////////////
/**
 * Get users todos from the database
 * @param {string} username The username of the user
 * @param {string} secureID The secureID of the user
 * @returns
 */
export async function getTodos(username: string, secureID: string) {
  const form = new FormData();
  form.append('requestType', 'getTodos');
  form.append('username', username);
  form.append('secureID', secureID);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}

/**
 * Add a todo to the database
 * @param {string} username The username of the user
 * @param {string} secureID The secureID of the user
 * @param {string} taskContent The content of the task
 * @returns
 */
export async function addTodo(username: string, secureID: string, taskContent: string) {
  const form = new FormData();
  form.append('requestType', 'addTodo');
  form.append('username', username);
  form.append('secureID', secureID);
  form.append('taskContent', taskContent);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}

/**
 * Delete a todo from the database
 * @param {string} username The username of the user
 * @param {string} secureID The secureID of the user
 * @param {number} taskID The id of the task to delete
 * @returns
 */
export async function deleteTodo(username: string, secureID: string, taskID: number) {
  const form = new FormData();
  form.append('requestType', 'deleteTodo');
  form.append('username', username);
  form.append('secureID', secureID);
  form.append('taskID', taskID.toString());

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}

//////////////// Score Management //////////////////
/**
 * Get the user's score from the database
 * @param {string} username The username of the user
 * @param {string} secureID The secureID of the user
 * @returns
 */
export async function getPomoScore(username: string, secureID: string) {
  const form = new FormData();
  form.append('requestType', 'getPomoScore');
  form.append('username', username);
  form.append('secureID', secureID);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}

//////////////// Leaderboard Management //////////////////
/**
 * Get the all time leaderboard
 * @returns
 */
export async function getAllTimeLeaderboard() {
  const form = new FormData();
  form.append('requestType', 'getAllTimeLeaderboard');

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}

/**
 * Get the weekly leaderboard
 * @returns
 */
export async function getWeeklyLeaderboard() {
  const form = new FormData();
  form.append('requestType', 'getWeeklyLeaderboard');

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}
