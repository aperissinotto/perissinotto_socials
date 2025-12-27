document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const user = document.getElementById('user');
  const password = document.getElementById('password');
  const submit = document.getElementById('submit');
  const remember = document.getElementById('remember');
  const toggle = document.getElementById('toggle-password');
  const toast = document.getElementById('toast');

  // Prefill if remembered
  if (localStorage.getItem('ps_remember') === 'true') {
    user.value = localStorage.getItem('ps_user') || '';
    remember.checked = true;
  }

  // Toggle password visibility
  toggle.addEventListener('click', () => {
    const visible = password.type === 'text';
    password.type = visible ? 'password' : 'text';
    toggle.textContent = visible ? '👁️' : '🙈';
    toggle.setAttribute('aria-label', visible ? 'Mostrar senha' : 'Ocultar senha');
  });

  function showError(el, msg) {
    el.classList.add('invalid');
    const err = document.getElementById(el.id + '-error');
    if (err) err.textContent = msg;
    el.setAttribute('aria-invalid', 'true');
  }

  function clearError(el) {
    el.classList.remove('invalid');
    const err = document.getElementById(el.id + '-error');
    if (err) err.textContent = '';
    el.removeAttribute('aria-invalid');
  }

  user.addEventListener('input', () => clearError(user));
  password.addEventListener('input', () => clearError(password));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError(user); clearError(password);
    let ok = true;
    if (user.value.trim() === '') { showError(user, 'Informe seu email ou usuário'); ok = false; }
    if (password.value.length < 6) { showError(password, 'Senha precisa ter ao menos 6 caracteres'); ok = false; }
    if (!ok) return;

    // Simula request
    submit.disabled = true; submit.textContent = 'Entrando…';
    setTimeout(() => {
      submit.disabled = false; submit.textContent = 'Entrar';
      if (remember.checked) {
        localStorage.setItem('ps_remember', 'true');
        localStorage.setItem('ps_user', user.value);
      } else {
        localStorage.removeItem('ps_remember');
        localStorage.removeItem('ps_user');
      }
      showToast('Login realizado com sucesso — apenas simulação.');
    }, 1000);
  });

  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    toast.appendChild(t);
    requestAnimationFrame(() => t.classList.add('visible'));
    setTimeout(() => { t.classList.remove('visible'); setTimeout(() => t.remove(), 300); }, 3000);
  }
});
