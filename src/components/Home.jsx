import Header from './Header'
function Home() {

  return (
    <div className="w-[90vw] h-[100vh] text-center mx-auto">
      <Header></Header>

      <div className="form">
        <div className="form-title">
          Youre Name?
        </div>
        <div className="name-input">
          <input type="text" id="name" placeholder='John' />
        </div>
        <div className="form-title">
          Youre a?
        </div>
        <div className="job-input">
          <button>Client</button>
          <button>Expert</button>
        </div>
      </div>
    </div>



  )
}

export default Home
