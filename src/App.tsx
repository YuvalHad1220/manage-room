import { createSignal, type Component } from "solid-js";
import DraggableView from "./DraggableView";
import { addPeople, addPlaces, getPeople, getPlaces, removeAllPeople, removeAllPlaces, removePerson, removePlace } from "./localStateHandler";

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

  const reset = (key: tUsage) => {
    if (key === "PERSON") {
      setPeopleList([]);
      removeAllPeople();
    }
    else {
      setPlaceslist([]);
      removeAllPlaces();
    }
  }
  
  const onAdd = (key: tUsage) => {
    if (key === "PERSON"){
      const values = people().split("\n").map(value => value.trim());
      addPeople(values)
      setPeopleList(getPeople());
      setPeople("")
    }

    else {
      const values = places().split("\n").map(value => value.trim());
      addPlaces(values);
      setPlaceslist(getPlaces());
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
    <div class="grow bg-base-300 rounded-2xl flex flex-col gap-2 p-2 items-center">
      <div class="flex flex-col items-center gap-3 mt-6 text-center text-xs w-[90%]">
        <p class="font-bold">פיץ תוסיף רשימה של אנשים כשכל מקום הוא שורה</p>
        <p>אל תשכח שאתה יכול לעשות גם העתק הדבק מהווצאפ</p>
        <textarea class="textarea w-full" rows={7} onChange={e => setPeople(e.target.value)} value={people()}/>
        <div class="join flex w-full">
          <button class="join-item btn btn-xs btn-primary grow" onClick={() => onAdd("PERSON")}>הוספה</button>
          <button class="join-item btn btn-xs btn-outlined grow" onClick={() => setPeople("")}>איפוס</button>
          <button class="join-item btn btn-xs btn-outlined grow" onClick={() => reset("PERSON")}>הסרת כל השמות בטבלה</button>
        </div>
      </div>
      <div class="overflow-y-scroll w-[90%] rounded-2xl">
        <table class="table table-pin-rows w-full">
          <thead>
            <tr>
              <th class="font-bold text-xs text-white">שם כוח אדם</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {peopleList().map(name => (
              <tr>
                <td class="text-xs">{name}</td>
                <td class="w-[10%]"><button class="btn  btn-error" onClick={() => onRemove("PERSON", name)}>הסר</button></td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
    </div>
  );


  const AddPlaces = (
    <div class="grow bg-base-300 rounded-2xl flex flex-col gap-2 p-2 items-center">
      <div class="flex flex-col items-center gap-3 mt-6 text-center text-xs w-[90%]">
        <p class="font-bold">הוספת מקומות</p>
        <p>אל תשכח שאתה יכול לעשות גם העתק הדבק מהווצאפ</p>
        <textarea class="textarea w-full" rows={7} onInput={e => setPlaces(e.target.value)} value={places()}/>
        <div class="join flex w-full">
          <button class="join-item btn btn-primary grow" onClick={() => onAdd("PLACE")}>הוספה</button>
          <button class="join-item btn btn-outlined grow" onClick={() => setPlaces("")}>איפוס</button>
          <button class="join-item btn btn-outlined grow" onClick={() => reset("PLACE")}>הסרת כל השמות בטבלה</button>
        </div>
      </div>
      <div class="w-[90%] rounded-2xl">
        <table class="table  table-pin-rows w-full">
          <thead>
            <tr>
              <th class="font-bold text-xs text-white">שם מקום</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {placesList().map(name => (
              <tr>
                <td class="text-xs">{name}</td>
                <td class="w-[10%]"><button class="btn btn-error" onClick={() => onRemove("PLACE", name)}>הסר</button></td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
    </div>
  );


  return (
    <div class="h-[70%] flex flex-col gap-1 p-1">
        {currentDisplayed() === "MAIN" && <DraggableView />}
        {currentDisplayed() === "MODIFY_PEOPLE" && AddPeople}
        {currentDisplayed() === "MODIFY_PLACES" && AddPlaces}
      <div class="flex flex-wrap gap-2 p-2 rounded-2xl bg-base-300">
            <button class="grow btn" classList={{"btn-primary": currentDisplayed() === "MAIN", }} onClick={() => setCurrentDisplayed("MAIN")}>מסך ראשי</button>
            <button class="grow btn" classList={{"btn-primary": currentDisplayed() === "MODIFY_PLACES" }} onClick={() => setCurrentDisplayed("MODIFY_PLACES")}>עריכת מקומות</button>
            <button class="grow btn" classList={{"btn-primary": currentDisplayed() === "MODIFY_PEOPLE" }} onClick={() => setCurrentDisplayed("MODIFY_PEOPLE")}>עריכת סד"כ</button>
      </div>
    </div>
  );
};

export default App;
