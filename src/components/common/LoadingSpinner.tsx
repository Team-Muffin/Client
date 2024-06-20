import SyncLoader from "react-spinners/SyncLoader";

const LoadingSpinner = () => {
  return (
    <div
      className="text-center"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <SyncLoader color="#758BFF" />
    </div>
  );
};

export default LoadingSpinner;
