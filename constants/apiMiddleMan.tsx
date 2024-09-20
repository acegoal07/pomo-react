const apiUrl = 'https://aw1443.brighton.domains/pomo/assets/php/database.php';

//////////////// Account Management //////////////////
/**
 * Login the user
 * @param {string} username The username of the user
 * @param {string} password The password of the user
 * @returns {{ success: boolean; code: number; secureID: string; partialPomoScore: number; fullPomoScore: number; }}
 */
export async function login(
  username: string,
  password: string
): Promise<{
  success: boolean;
  secureID: string;
  partialPomoScore: number;
  fullPomoScore: number;
}> {
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

/**
 * Register the user
 * @param {string} username The username of the user
 * @param {string} password The password of the user
 * @returns {{ success: boolean; code: number; secureID: string; }}
 */
export async function register(
  username: string,
  password: string
): Promise<{ success: boolean; code: number; secureID: string }> {
  const form = new FormData();
  form.append('requestType', 'register');
  form.append('username', username);
  form.append('password', password);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}

/**
 * Change the user's password
 * @param {string} username The username of the user
 * @param {string} secureID The secureID of the user
 * @param {string} oldPassword The old password of the user
 * @param {string} newPassword The new password of the user
 * @param {string} confirmNewPassword The new password of the user
 * @returns {{ success: boolean; code: number; }}
 */
export async function changePassword(
  username: string,
  secureID: string,
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
): Promise<{ success: boolean; code: number }> {
  const form = new FormData();
  form.append('requestType', 'updatePassword');
  form.append('username', username);
  form.append('secureID', secureID);
  form.append('currentPassword', oldPassword);
  form.append('newPassword', newPassword);
  form.append('confirmNewPassword', confirmNewPassword);

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
 * @returns {{ success: boolean; code: number; todos: { taskID: number; taskContent: string; }[]; }}
 */
export async function getTodos(
  username: string,
  secureID: string
): Promise<{ success: boolean; code: number; todos: { taskID: number; taskContent: string }[] }> {
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
 * @returns {{ success: boolean; taskID: number; }}
 */
export async function addTodo(
  username: string,
  secureID: string,
  taskContent: string
): Promise<{ success: boolean; taskID: number }> {
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
 * @returns {{ success: boolean; }}
 */
export async function deleteTodo(
  username: string,
  secureID: string,
  taskID: number
): Promise<{ success: boolean }> {
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

/**
 * Update a todo in the database
 * @param {string} username The username of the user
 * @param {string} secureID The secureID of the user
 * @param {number} taskID The id of the task to update
 * @param {string} taskContent The content of the task
 * @returns {{ success: boolean; }}
 */
export async function updateTodo(
  username: string,
  secureID: string,
  taskID: number,
  taskContent: string
): Promise<{ success: boolean }> {
  const form = new FormData();
  form.append('requestType', 'updateTodo');
  form.append('username', username);
  form.append('secureID', secureID);
  form.append('taskID', taskID.toString());
  form.append('taskContent', taskContent);

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
 * @returns {{ success: boolean; partialPomoScore: number; fullPomoScore: number; }}
 */
export async function getPomoScore(
  username: string,
  secureID: string
): Promise<{ success: boolean; partialPomoScore: number; fullPomoScore: number }> {
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

/**
 * Update the user's score in the database
 * @param {string} username The username of the user
 * @param {string} secureID The secureID of the user
 * @param {number} partialPomoScore The partial pomo score of the user
 * @param {number} fullPomoScore The full pomo score of the user
 * @returns {{ success: boolean; }}
 */
export async function updatePomoScore(
  username: string,
  secureID: string,
  partialPomoScore: number,
  fullPomoScore: number
): Promise<{ success: boolean }> {
  const form = new FormData();
  form.append('requestType', 'updatePomoScore');
  form.append('username', username);
  form.append('secureID', secureID);
  form.append('partialPomoScore', partialPomoScore.toString());
  form.append('fullPomoScore', fullPomoScore.toString());

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}

//////////////// Leaderboard Management //////////////////
/**
 * Get the all time leaderboard
 * @returns {{ success: boolean; leaderboard: { username: string; fullPomoScore: number; }[]; }}
 */
export async function getAllTimeLeaderboard(): Promise<{
  success: boolean;
  leaderboard: { username: string; fullPomoScore: number }[];
}> {
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
 * @returns {{ success: boolean; leaderboard: { username: string; fullPomoScore: number; }[]; }}
 */
export async function getWeeklyLeaderboard(): Promise<{
  success: boolean;
  leaderboard: { username: string; fullPomoScore: number }[];
}> {
  const form = new FormData();
  form.append('requestType', 'getWeeklyLeaderboard');

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form,
  });
  return response.json();
}
