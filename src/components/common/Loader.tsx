import { useSelector } from 'react-redux';
import '../../styles/loader.css';
import { RootState } from '../../redux/store';

function Loader() {
  const isLoading = useSelector((store: RootState) => store.loading.value);

  return (
    isLoading && (
      <div className="absolute w-screen h-screen top-0 flex justify-center items-center">
        <div className="loadingio-spinner-double-ring-2by998twmg8 bg-transparent">
          <div className="ldio-yzaezf3dcmj">
            <div></div>
            <div></div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Loader;
