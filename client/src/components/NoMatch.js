import { useNavigate } from "react-router";

export default function NoMatch() {
    const navigate = useNavigate();
    function navi() {
        navigate('/');
    }
    return (
      <>
        <div className="mt-10 ml-20">
          <h1 className="text-4xl mb-10 ">Error 404. Page does not exist.</h1>
          <button className="border p-3 bg-black text-white cursor-pointer " onClick={navi}>
            Back to home
          </button>
        </div>
      </>
    );
}