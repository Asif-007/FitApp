export default function Display({ value }) {
  return (
    <div>
      <div className="flex flex-nowrap flex-col object-cover border border-none bg-gray-200 w-100 m-10 p-4 gap-1 rounded-2xl transition ease-in duration-300 hover:scale-110 ">
        <div>
          <img className="w-500 h-50" src={value.img}></img>
        </div>
        <div>
          <h3 className="font-bold">{value.name}</h3>
          <p>Sets : {value.sets}</p>
          <p>Reps : {value.reps}</p>
        </div>
      </div>
    </div>
  );
}
