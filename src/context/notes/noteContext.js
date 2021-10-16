import { createContext } from "react";

const noteContext = createContext(); //yeh context create krne ka syntax hai
 //context basically saari states hold krega notes se related
 
 export default noteContext;


//  toh basically hum NoteState me state banaayenge or ushe NoteContext.provider(jo yaha(notContext) se export kiya hai) syntax me daalenge
// fr app.js me saare components ko NotesState k andr rkh denge taaki vo NotesState k var access kr ske
//uske baad kisi bhi component me jaake yeh(notContext) or useContext hooks ka use krke state ki value(jo NoteState me state bnaai ti) ko use kr skte h.. or hum function bhi use kr skte hai aise hi

// so basically yeh (noteContext) state ki value ko components use krne me kamm aayega
//or
// NoteState state bnaane me, function bnaane me or fr ushe provide krne me kaam aayega
