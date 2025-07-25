const Title = () => {
  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        height='40px'
        className="rounded me-2"
      />
      <h1 className="my-auto">Find Streaming</h1>
    </div>
  )
}

export default Title;
