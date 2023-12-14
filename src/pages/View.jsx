import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getVideo } from '../serviece/allapi'


function View(serverRes) {

  // to store api responce

  const [allVideos, setallVideos] = useState([])
  const [deleteStatus, setdeleteStatus] = useState(false)


  useEffect(() => {

    // call getallVideos
    getallVideos()
  }, [serverRes, deleteStatus])


  // create a function

  const getallVideos = async () => {
    const responce = await getVideo()
    // console.log(responce.data);
    setallVideos(responce.data);
  }

  console.log(allVideos);

  // to get delete response
  const handleDeleteStatus = (res) => {
    setdeleteStatus(res)
  }

  return (

    <>

      <div className='border p-3 rounded m-4'>

        <Row>
          {

            allVideos.map(video => (

              <Col className='p-3 mb-3' sm={12} md={6}>

                <VideoCard card={video} handleDeleteStatus={handleDeleteStatus} />

              </Col>

            ))

          }

        </Row>

      </div>

    </>
  )
}

export default View