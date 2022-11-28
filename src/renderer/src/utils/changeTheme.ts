function changeTheme(theme: 'dark' | 'light') {
  if (theme === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
}

export default changeTheme;
