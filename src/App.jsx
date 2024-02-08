import React,{useState,useCallback,useRef} from 'react'

function App() {
const[password, setPassword] = useState("")
const [length,setLength]=useState(8)
const[character, setCharacter]=useState(false)
const[number, setNumber] = useState(false)

 const passwordRef = useRef(null)

const passwordGenerator = useCallback(()=>{
  let pass= ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(number) str += "0123456789"
  if(character) str += "!@#$%^&*_+=[]{}~`"

  for (let i = 1; i <= length; i++){
   const char = Math.floor(Math.random() * str.length + 1)
   pass += str.charAt(char)  
  }
  setPassword(pass)
},[length,character,number,setPassword])
  
const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,20);
  window.navigator.clipboard.writeText(password)
},[password])

  return (
   <>
   <div className= 'w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8  my-8 text-white bg-sky-800'>
   <h1 className ='text-white text-center my-3'>Random Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
         <input 
         type = "text"
         value={password}
         className="outline-none text-black w-full py-1 px-3"
         placeholder = "random password"
         readOnly
         ref={passwordRef}
         />
         <button 
         onClick={copyPasswordToClipboard}
         className='outline-none bg-sky-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
    </div>
    <div className='flex flex-col items-center text-md gap-x-2 gap-y-4'>
    <div className='flex items-center gap-x-1'>
       <input 
       type="range"
       min={6}
       max={100}
       value={length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
       />
       <label>Length:{length}</label>
       </div>
       <div className='flex items-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked = {number}
        id="numberInput"
        onChange = {()=>{
          setNumber((prev)=> !prev);
        }}
        />
        <label htmlFor='numberInput'>Number</label>
       </div>
       <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked = {character}
        id="characterInput"
        onChange={()=>{
          setCharacter((prev)=> !prev);
        }}
        />
        <label htmlFor='characterInput'>Characters</label>
       </div>
       <div className='flex items-center gap-x-1'>
        <button
        onClick = {passwordGenerator}
        className ='outline outline-2 rounded bg-sky-700 text-white px-3 py-0.5 shrink-0'> 
        Generator Password
        </button>
       </div>
    </div>
   </div>
   </>
  )
}
export default App