import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



function Landingpage() {

  // function defiition
  // redirect from one page to another page we can use ie useNavigate

  const Navigate = useNavigate()
  const handleNavigate = () => {


    Navigate('/home')
  }

  return (
    < >
      <Row>

        <Col></Col>

        <Col lg={6}>

          <h1>Welcome Videooo.com</h1>
          <p style={{ textAlign: 'justify' }}>User can use their favorite videos .User can upload any youtube vdeos by copying and pasting thier url in to the Videoo.com ,it will allow them to add or remove uploaded videos.it will also allow them to arrange them in different categories by drag and ddrop, it is free to try now !!!!</p>

          <button onClick={handleNavigate} className='btn btn-success'>Click Here to Know More</button>

        </Col>

        <Col lg={5}>
          <img className='img-fluid' src="https://previews.123rf.com/images/mejn/mejn2305/mejn230500300/203950885-multimedia-streaming-video-player-app-with-clapboard-icon-on-mobile-phone-vector-illustration.jpg" alt="" />
        </Col>

      </Row>


    </>
  )
}

export default Landingpage