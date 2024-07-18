const DesplayUserDetail = ({name, value}) => {
  return (
    <div className="details" >
      <p>{name}:&nbsp;</p>
      <p>{value}</p>
    </div>
  )
}

export default DesplayUserDetail