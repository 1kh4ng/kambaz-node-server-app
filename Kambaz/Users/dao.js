export default function UsersDao(db) {
  const findAllUsers = () => db.users;

  const findUserById = (userId) =>
    db.users.find((u) => u._id === userId);

  const findUserByUsername = (username) =>
    db.users.find((u) => u.username === username);

  const findUserByCredentials = (username, password) =>
    db.users.find((u) => u.username === username && u.password === password);

  const createUser = (user) => {
    const newUser = { ...user, _id: new Date().getTime().toString() };
    db.users.push(newUser);
    return newUser;
  };

  const updateUser = (userId, userUpdates) => {
    db.users = db.users.map((u) =>
      u._id === userId ? { ...u, ...userUpdates } : u
    );
  };

  const deleteUser = (userId) => {
    db.users = db.users.filter((u) => u._id !== userId);
  };

  return {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    createUser,
    updateUser,
    deleteUser,
  };
}
