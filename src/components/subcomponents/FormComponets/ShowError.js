const ShowError = ({ errorMessage, setErrorMessage }) => {
  return (
    <div className="errordiv">
      <p className="error">{errorMessage?.username} {errorMessage?.email} {errorMessage?.detail} </p>
    </div>
  )
}

export default ShowError