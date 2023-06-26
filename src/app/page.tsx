import { NodeList, NoteForm } from '../components'

export default function Home() {
  return (
    <div className="flex flex-col p-4 gap-4" >
      Hello

      <NodeList />

      <NoteForm />
    </div>
  )
}
