// =============================================================
// ARQUIVO app.js PARA FIREBASE
// =============================================================

// 1. Cole aqui o objeto de configuração que você copiou do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_AUTH_DOMAIN_AQUI",
  projectId: "SEU_PROJECT_ID_AQUI",
  appId: "SEU_APP_ID_AQUI"
};

// 2. Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// 3. Cria uma referência para o serviço de autenticação
const auth = firebase.auth();

// --- Lógica de Cadastro ---
const formCadastro = document.getElementById('form-cadastro');

if (formCadastro) {
  formCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const email = evento.target.email.value;
    const senha = evento.target.password.value;

    auth.createUserWithEmailAndPassword(email, senha)
      .then(() => {
        // Mensagem de sucesso estilizada
        const alerta = document.createElement('div');
        alerta.className = 'alert alert-success text-center mt-3';
        alerta.textContent = '✅ Usuário cadastrado com sucesso! Redirecionando...';
        formCadastro.appendChild(alerta);

        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      })
      .catch((error) => {
        const alerta = document.createElement('div');
        alerta.className = 'alert alert-danger text-center mt-3';
        alerta.textContent = '❌ Erro ao cadastrar: ' + error.message;
        formCadastro.appendChild(alerta);
      });
  });
}

// --- Lógica de Login ---
const formLogin = document.getElementById('form-login');

if (formLogin) {
  formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const email = evento.target.email.value;
    const senha = evento.target.password.value;

    auth.signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Login realizado com sucesso! Bem-vindo, " + user.email);
        // Redirecionar para dashboard futuramente
        // window.location.href = "dashboard.html";
      })
      .catch((error) => {
        const alerta = document.createElement('div');
        alerta.className = 'alert alert-danger text-center mt-3';
        alerta.textContent = '⚠️ Erro ao logar: verifique seu e-mail e senha.';
        formLogin.appendChild(alerta);
      });
  });
}
