import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Categories from './Categories'
import { Link } from 'react-router-dom'


function Home() {

  const[serverRes,setserverRes]=useState({})

  const handleresponse=(res)=>{
    setserverRes(res)
  }
  return (
    <>

      <h1 className='text-info ms-5 mb-5'>All Video cards</h1>

      <Link to={'/watchHistory'} style={{textDecoration:"none",fontSize:"25px",color:"blue"}} className='MS-auto'>Watch History</Link>

      <div className='container-fluid'>

        <Row>
          {/* add component selector */}
          <Col lg={1}>
            <Add handleresponse={handleresponse} />
          </Col>

          {/* view component selector */}
          <Col lg={7}>
            <View serverRes={serverRes} />
          </Col>

          {/* categories component selector */}
          <Col lg={4}>
            <Categories />
          </Col>

        </Row>

      </div>

    </>
  )
}

export default Home