import { DragDropProvider, DragDropSensors } from "@thisbeyond/solid-dnd";
import { createSignal, type Component } from "solid-js";
import Sandbox from "./DraggablePlaces";

const App: Component = () => {
  type display = "MAIN" | "MODIFY_PEOPLE" | "MODIFY_PLACES";
  const [currentDisplayed, setCurrentDisplayed] = createSignal<display>("MAIN");
  const peopleList = ["יובל הדר", "אלירן שדה", "אלירן לוי"];
  const placesList = ["מטבח", "שירותים", "אנא עארף"];

  const AddPeople = (
    <>
      <div class="flex flex-col items-center gap-4 mt-12 text-center text-lg">
        <p class="font-bold">פיץ תוסיף רשימה של אנשים כשכל שם הוא שורה</p>
        <p>אל תשכח שאתה יכול לעשות גם העתק הדבק מהווצאפ</p>
        <p>ד"א הרשימה אמורה להיות מעודכנת אוטומטית כל פעם שאתה נכנס למערכת (כמו שרואים למטה) אז אל תשכח שפה זה רק להוסיף שמות חדשים. אם אתה רוצה למחוק תמחק למטה</p>
        <textarea class="textarea w-[75%]" rows={10}/>
        <div>
          <button class="btn btn-primary">הוספת אנשים למערכת</button>
          <button class="btn btn-outlined">איפוס רשימה (מוחק את כל מה שרשום)</button>
        </div>
      </div>
      <div class="overflow-x-auto w-full">
        <table class="table table-pin-rows w-full">
          <thead>
            <tr>
              <th class="font-bold">שם בנאדם</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {peopleList.map(name => (
              <tr>
                <td>{name}</td>
                <td class="w-[10%]"><button class="btn btn-error">הסר</button></td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
    </>
  );


  const AddPlaces = (
    <>
      <div class="flex flex-col items-center gap-4 mt-12 text-center text-lg">
        <p class="font-bold">פיץ תוסיף רשימה של מקומות כשכל מקום הוא שורה</p>
        <p>אל תשכח שאתה יכול לעשות גם העתק הדבק מהווצאפ</p>
        <p>ד"א הרשימה אמורה להיות מעודכנת אוטומטית כל פעם שאתה נכנס למערכת (כמו שרואים למטה) אז אל תשכח שפה זה רק להוסיף שמות חדשים. אם אתה רוצה למחוק תמחק למטה</p>
        <textarea class="textarea w-[75%]" rows={10}/>
        <div>
          <button class="btn btn-primary">הוספת מקום למערכת</button>
          <button class="btn btn-outlined">איפוס רשימה (מוחק את כל מה שרשום)</button>
        </div>
      </div>
      <div class="overflow-x-auto w-full">
        <table class="table table-pin-rows w-full">
          <thead>
            <tr>
              <th class="font-bold">שם מקום</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {placesList.map(name => (
              <tr>
                <td>{name}</td>
                <td class="w-[10%]"><button class="btn btn-error">הסר</button></td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
    </>
  );
  const DraggableMain = (
    <>
        <div class="join join-vertical w-full h-full flex flex-col p-3">
      <p class="join-item font-bold text-white bg-success p-3">שירותים</p>
      <div class="join-item bg-gray-600 grow">
        <div class="flex gap-5 m-3">
        {peopleList.map(name => (
          <div class="rounded-2xl bg-white p-3 text-black">
            {name}
          </div>
        ))}
        </div>
      </div>
    </div>

    <div class="flex gap-5 bg-error">
        {peopleList.map(name => (
          <div class="rounded-2xl bg-white p-3 text-black">
            {name}
          </div>
        ))}
        </div>
    </>
  );

  return (
    <div class="h-screen flex flex-col gap-3 p-3">
      <div class="grow bg-gray-700 rounded-2xl flex flex-col gap-4 items-center">
        {currentDisplayed() === "MAIN" && DraggableMain}
        {currentDisplayed() === "MODIFY_PEOPLE" && AddPeople}
        {currentDisplayed() === "MODIFY_PLACES" && AddPlaces}
      </div>
      <div class="flex gap-3 p-3 rounded-2xl bg-gray-700">
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MAIN" }} onClick={() => setCurrentDisplayed("MAIN")}>מסך ראשי</button>
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MODIFY_PLACES" }} onClick={() => setCurrentDisplayed("MODIFY_PLACES")}>עריכת מקומות</button>
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MODIFY_PEOPLE" }} onClick={() => setCurrentDisplayed("MODIFY_PEOPLE")}>עריכת סד"כ</button>
      </div>
    </div>
  );
};

export default App;
