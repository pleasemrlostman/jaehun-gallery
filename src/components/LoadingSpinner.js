import Loader from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader
                type="Oval"
                color="#337aee"
                height={80}
                width={80}
                timeout={30000}
            ></Loader>
        </div>
    );
};

export default LoadingSpinner;
