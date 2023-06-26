import { NodeList, NoteForm } from '../components'

export default function Home() {
  return (
    <div className="flex flex-col p-4 gap-4 max-w-xl m-auto h-screen py-20 pb-4" >

      <h1 className='text-5xl font-bold text-center py-5' >Notes</h1>
   
      <NoteForm />

      <div className="h-screen overflow-auto" >
      <NodeList />
      </div>
    </div>
  )
}
