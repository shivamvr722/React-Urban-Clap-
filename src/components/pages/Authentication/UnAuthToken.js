const UnAuthToken = () => {
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  window.location = "/"
}

export default UnAuthToken