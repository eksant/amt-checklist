export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('group')
  window.location.href = '/'
  // window.location.reload()
}
