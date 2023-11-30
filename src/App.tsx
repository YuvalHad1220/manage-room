import { createSignal, type Component } from "solid-js";
import DraggableView from "./DraggableView";
import { addPeople, addPlaces, getPeople, getPlaces, removePerson, removePlace } from "./localStateHandler";

const initialPeopleList = getPeople();
const initialPlacesList = getPlaces();
type tUsage = "PERSON" | "PLACE";


const App: Component = () => {
  type display = "MAIN" | "MODIFY_PEOPLE" | "MODIFY_PLACES";
  const [currentDisplayed, setCurrentDisplayed] = createSignal<display>("MAIN");
  const [peopleList, setPeopleList] = createSignal<string[]>(initialPeopleList);
  const [placesList, setPlaceslist] = createSignal<string[]>(initialPlacesList);
  const [people, setPeople] = createSignal<string>("");
  const [places, setPlaces] = createSignal<string>("");
  
  const onAdd = (key: tUsage) => {
    if (key === "PERSON"){
      const values = people().split("\n");
      addPeople(values)
      setPeopleList(getPeople());
      setPeople("")
    }

    else {
      const values = places().split("\n");
      addPlaces(values);
      setPlaceslist(values);
      setPlaces("");
    }
  };

  const onRemove = (key: tUsage, value: string) => {
    if (key === "PERSON"){
      removePerson(value);
      setPeopleList(getPeople());
    }
    else {
      removePlace(value);
      setPlaceslist(getPlaces());
    }
  }

  const AddPeople = (
    <div class="grow bg-base-300 rounded-2xl flex flex-col gap-4 p-4 items-center">
      <div class="flex flex-col items-center gap-4 mt-12 text-center text-lg  w-[75%]">
        <p class="font-bold">פיץ תוסיף רשימה של אנשים כשכל מקום הוא שורה</p>
        <p>אל תשכח שאתה יכול לעשות גם העתק הדבק מהווצאפ</p>
        <p>ד"א הרשימה אמורה להיות מעודכנת אוטומטית כל פעם שאתה נכנס למערכת (כמו שרואים למטה) אז אל תשכח שפה זה רק להוסיף שמות חדשים. אם אתה רוצה למחוק תמחק למטה</p>
        <textarea class="textarea w-full" rows={10} onChange={e => setPeople(e.target.value)} value={people()}/>
        <div class="join flex w-full">
          <button class="join-item btn btn-lg btn-primary grow" onClick={() => onAdd("PERSON")}>הוספה</button>
          <button class="join-item btn btn-lg btn-outlined grow" onClick={() => setPeople("")}>איפוס</button>
        </div>
      </div>
      <div class="overflow-y-auto w-[75%] rounded-2xl">
        <table class="table table-lg table-pin-rows w-full">
          <thead>
            <tr>
              <th class="font-bold text-xl text-white">שם כוח אדם</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {peopleList().map(name => (
              <tr>
                <td class="text-xl">{name}</td>
                <td class="w-[10%]"><button class="btn btn-lg btn-error" onClick={() => onRemove("PERSON", name)}>הסר</button></td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
    </div>
  );


  const AddPlaces = (
    <div class="grow bg-base-300 rounded-2xl flex flex-col gap-4 p-4 items-center">
      <div class="flex flex-col items-center gap-4 mt-12 text-center text-lg  w-[75%]">
        <p class="font-bold">פיץ תוסיף רשימה של מקומות כשכל מקום הוא שורה</p>
        <p>אל תשכח שאתה יכול לעשות גם העתק הדבק מהווצאפ</p>
        <p>ד"א הרשימה אמורה להיות מעודכנת אוטומטית כל פעם שאתה נכנס למערכת (כמו שרואים למטה) אז אל תשכח שפה זה רק להוסיף שמות חדשים. אם אתה רוצה למחוק תמחק למטה</p>
        <textarea class="textarea w-full" rows={10} onInput={e => setPlaces(e.target.value)} value={places()}/>
        <div class="join flex w-full">
          <button class="join-item btn btn-lg btn-primary grow" onClick={() => onAdd("PLACE")}>הוספה</button>
          <button class="join-item btn btn-lg btn-outlined grow" onClick={() => setPlaces("")}>איפוס</button>
        </div>
      </div>
      <div class="overflow-y-auto w-[75%] rounded-2xl">
        <table class="table table-lg table-pin-rows w-full">
          <thead>
            <tr>
              <th class="font-bold text-xl text-white">שם מקום</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {placesList().map(name => (
              <tr>
                <td class="text-xl">{name}</td>
                <td class="w-[10%]"><button class="btn btn-lg btn-error" onClick={() => onRemove("PLACE", name)}>הסר</button></td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
    </div>
  );


  return (
    <div class="h-screen flex flex-col gap-3 p-safe-3">
        {currentDisplayed() === "MAIN" && <DraggableView />}
        {currentDisplayed() === "MODIFY_PEOPLE" && AddPeople}
        {currentDisplayed() === "MODIFY_PLACES" && AddPlaces}
      <div class="flex gap-3 p-3 rounded-2xl bg-base-300">
            <button class="grow btn btn-lg" classList={{"btn-primary": currentDisplayed() === "MAIN", }} onClick={() => setCurrentDisplayed("MAIN")}>מסך ראשי</button>
            <button class="grow btn btn-lg" classList={{"btn-primary": currentDisplayed() === "MODIFY_PLACES" }} onClick={() => setCurrentDisplayed("MODIFY_PLACES")}>עריכת מקומות</button>
            <button class="grow btn btn-lg" classList={{"btn-primary": currentDisplayed() === "MODIFY_PEOPLE" }} onClick={() => setCurrentDisplayed("MODIFY_PEOPLE")}>עריכת סד"כ</button>
      </div>
    </div>
  );
};

export default App;
