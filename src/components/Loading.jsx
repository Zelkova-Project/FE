const Loading = () => {
  const loadingStyle = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
    <>
      <div>
        <img src={'/loading.gif'} alt={'Loading'} style={loadingStyle} />
      </div>
      ;
    </>
  );
};

export default Loading;
