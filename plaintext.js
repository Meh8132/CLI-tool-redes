// Almacenamiento inseguro de contraseñas
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'password' }
  ];
  
  function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    return user ? 'Login exitoso' : 'Credenciales inválidas';
  }
  
  console.log(login('admin', 'admin123'));