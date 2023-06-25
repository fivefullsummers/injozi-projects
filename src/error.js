const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-error font-semibold">Oops! Seems the engine is busted!</h1>
      <button
        className="btn btn-info text-sm"
        onClick={() => window.location.reload() }><p>reload</p></button>
    </div>
  );
}

export default Error;