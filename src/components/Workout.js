import chestDay from "../utils/Chest";
import Display from "./Display";
export default function Workout() {
    return (
      <>
        <div>
          <h1 className="text-4xl font-bold bg-gray-200 p-2 mt-4">
            List of Workouts
          </h1>
          <div className="mt-4">
            <h2 className="text-3xl p-2 font-bold">Chest Workouts</h2>
            <div className="flex flex-row flex-wrap">
              {chestDay.map((values) => (
                <Display key={values.id} value={values}></Display>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}