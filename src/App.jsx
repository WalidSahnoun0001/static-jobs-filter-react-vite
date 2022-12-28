import './App.css'
import BG from '../public/images/bg-header-desktop.svg'
import data from '../data/data.json'
import { useState } from 'react'
import { useEffect } from 'react'


function App() {

  const [filterBox, setFilter] = useState([])
  const [tags, setTags] = useState(data)
  const addTag = (target) => {
    if(!filterBox.includes(target)) {
      setFilter([...filterBox, target])
  }
  }
  const removeTag = (target) => {
    setFilter(filterBox.filter(tag => tag != target))
  }

  useEffect(() => {

    if(filterBox.length > 0) {
      for(let i = 0; i < filterBox.length; i++) {
        setTags(data.filter(x => x.languages[i] == filterBox[i]))
      }
    }
    else {
      setTags(data)
    }
  }, [filterBox])

  return (
    <section className="jobs">
      <header>
        <figure>
          <img src={BG} alt="" />
        </figure>
      </header>
      <div className="jobs-logic">
        {
          filterBox.length > 0? (
            <div className="filter">
            {
              filterBox && filterBox.map((ftr) => (
                <div className="ftr-box" key={ftr}>
                  <span className='ftr'>{ftr}</span>
                  <span className='close' onClick={()=> removeTag(ftr)}><img src={'/images/icon-remove.svg'} alt="" /></span>
                </div>
              ))
            }
            <span className='clear' onClick={()=> setFilter([])}>Clear</span>
          </div>
          ):
          ''
        }
        {
          
          tags.map((job) => (
            <div className='job' key={job.id}>
              <div className="part">
                <figure>
                  <img src={job.logo} alt="" />
                </figure>
                <div className="job-details">
                  <div className="title-and-states">
                    <h5>{job.company}</h5>
                    {job.new && <h5 className='new'>New!</h5>}
                    {job.featured && <h5 className='featured'>featured</h5>}
                  </div>
                  <h4>{job.position}</h4>
                  <ul>
                    <li>{job.postedAt}</li>
                    <li>{job.contract}</li>
                    <li>{job.location}</li>
                  </ul>
              </div>
              </div>
              <ul className="job-tags">
                {
                  job.languages.map((tag)=> (
                    <li key={tag} onClick={(e) => addTag(e.target.textContent)}>{tag}</li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default App
