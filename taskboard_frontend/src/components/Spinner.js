import PuffLoader from "react-spinners/PuffLoader";

function Spinner() {
  return (
    <div style={{
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <PuffLoader color={'#15A1C2'} size={60} />
    </div>
    // <div className="loadingSpinnerContainer">
    //   <div className="loadingSpinner">
    //   </div>
    // </div>
  );
}

export default Spinner;