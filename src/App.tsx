import { createSignal, type Component } from "solid-js";
import DraggableView from "./DraggableView";

const App: Component = () => {
  type display = "MAIN" | "MODIFY_PEOPLE" | "MODIFY_PLACES";
  const [currentDisplayed, setCurrentDisplayed] = createSignal<display>("MAIN");
  const peopleList = ["יובל הדר", "אלירן שדה", "אלירן לוי"];
  const placesList = ["מטבח", "שירותים", "אנא עארף"];


  const AddPeople = (
    <div class="grow bg-base-300 rounded-2xl flex flex-col gap-4 p-4 items-center">
      <div class="flex flex-col items-center gap-4 mt-12 text-center text-lg  w-[75%]">
        <p class="font-bold">פיץ תוסיף רשימה של אנשים כשכל מקום הוא שורה</p>
        <p>אל תשכח שאתה יכול לעשות גם העתק הדבק מהווצאפ</p>
        <p>ד"א הרשימה אמורה להיות מעודכנת אוטומטית כל פעם שאתה נכנס למערכת (כמו שרואים למטה) אז אל תשכח שפה זה רק להוסיף שמות חדשים. אם אתה רוצה למחוק תמחק למטה</p>
        <textarea class="textarea w-full" rows={10}/>
        <div class="join flex w-full">
          <button class="join-item btn btn-primary grow">הוספה</button>
          <button class="join-item btn btn-outlined grow">איפוס</button>
        </div>
      </div>
      <div class="overflow-y-auto w-[75%] rounded-2xl">
        <table class="table table-pin-rows w-full">
          <thead>
            <tr>
              <th class="font-bold text-lg text-white">שם כוח אדם</th>
              <th></th>
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
    </div>
  );


  const AddPlaces = (
    <div class="grow bg-base-300 rounded-2xl flex flex-col gap-4 p-4 items-center">
      <div class="flex flex-col items-center gap-4 mt-12 text-center text-lg  w-[75%]">
        <p class="font-bold">פיץ תוסיף רשימה של מקומות כשכל מקום הוא שורה</p>
        <p>אל תשכח שאתה יכול לעשות גם העתק הדבק מהווצאפ</p>
        <p>ד"א הרשימה אמורה להיות מעודכנת אוטומטית כל פעם שאתה נכנס למערכת (כמו שרואים למטה) אז אל תשכח שפה זה רק להוסיף שמות חדשים. אם אתה רוצה למחוק תמחק למטה</p>
        <textarea class="textarea w-full" rows={10}/>
        <div class="join flex w-full">
          <button class="join-item btn btn-primary grow">הוספה</button>
          <button class="join-item btn btn-outlined grow">איפוס</button>
        </div>
      </div>
      <div class="overflow-y-auto w-[75%] rounded-2xl">
        <table class="table table-pin-rows w-full">
          <thead>
            <tr>
              <th class="font-bold text-lg text-white">שם מקום</th>
              <th></th>
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
    </div>
  );


  return (
    <div class="h-screen flex flex-col gap-3 p-3">
        {currentDisplayed() === "MAIN" && <DraggableView />}
        {currentDisplayed() === "MODIFY_PEOPLE" && AddPeople}
        {currentDisplayed() === "MODIFY_PLACES" && AddPlaces}
      <div class="flex gap-3 p-3 rounded-2xl bg-base-300">
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MAIN", }} onClick={() => setCurrentDisplayed("MAIN")}>מסך ראשי</button>
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MODIFY_PLACES" }} onClick={() => setCurrentDisplayed("MODIFY_PLACES")}>עריכת מקומות</button>
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MODIFY_PEOPLE" }} onClick={() => setCurrentDisplayed("MODIFY_PEOPLE")}>עריכת סד"כ</button>
      </div>
    </div>
  );
};

export default App;
