import Layout from '../components/Layout'
import Create from '../components/Create'

export default function CreatePage() {
  return (
    <Layout 
      header={true}
      logo="dark"
      title="Create Zeme — Zeme Team 🛡️" 
      url="https://zeme.team/create" >

          <Create display="modal" />

        <style jsx>{`
        
        `}</style>
    </Layout>
  )
}
