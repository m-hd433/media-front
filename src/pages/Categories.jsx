import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getAllCategory, getVideos, updatecategory } from '../serviece/allapi';
import { Trash2 } from 'react-feather';
import VideoCard from './VideoCard'



function Category({ handleDeleteStatus }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryItem, setcategoryItem] = useState({

    id: "", name: "", allVideos: []
  })


  // create a state for 
  const [AllCategory, setAllCategory] = useState([])

  useEffect(() => {

    getcategoryList()

  }, [])


  // define function

  const addCategoryForm = (e) => {

    const { name, value } = e.target
    setcategoryItem({ ...categoryItem, [name]: value })
  }

  console.log(categoryItem);

  const handleAddcategory = async (e) => {
    e.preventDefault()
    const { id, name } = categoryItem
    if (!id || !name) {

      toast.error("please fill the form completely")
    }
    else {
      const response = await addCategory(categoryItem)
      console.log(response);

      if (response.status >= 200 && response.status <= 300) {


        setShow(false);

        toast.success("new category updated successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",

        })

        getcategoryList()

      } else {

        toast.warn("provide a unique id !!!!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

      }

    }

  }

  const getcategoryList = async () => {
    // api callfor get category
    const res = await getAllCategory()
    console.log(res);
    setAllCategory(res.data)
    console.log(AllCategory);
  }


  // //  remove category
  // const removeCat = async (id) => {
  //   // api call
  //   const response = await deleteCategory(id)
  //   console.log(response);
  //   if (response.status >= 200 && response.status < 300) {
  //     handleDeleteStatus(true)
  //   }
  // }

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()
    console.log(id);
    // api call
    await deleteCategory(id)
    getcategoryList()
  }

  // function definition

  const dragOver=(e)=>{
    e.preventDefault()
    console.log("dragging over the categoy board");
  }

  const dropped=async (e,categoryId)=>{
    console.log("ctagoryId",categoryId);

    let sourceCardId=e.dataTransfer.getData("cardid")
    console.log("sourceCardId",sourceCardId);

    // logic to implement adding card in the given category
    const {data} =  await getVideos(sourceCardId)
    console.log('source video data',data);

    // dropped category details
    let selectedCategory=AllCategory.find(item=>item.id==categoryId)
    console.log("target category details",selectedCategory);
    // to push data ito array 
    selectedCategory.allVideos.push(data)
    // update drop data in allvideos array
    await updatecategory(categoryId,selectedCategory)
    getcategoryList()

  }

  return (
    <>
      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'>  Add Category</div>
      </div>

      {

        AllCategory.map(item => (

          <div droppable onDragOver={e=>dragOver(e)} onDrop={e=>dropped(e,item?.id)}>
            <div className='d-flex justify-content-between border rounded mt-3 p-2'>
              <h4>{item.name}</h4>
              <span onClick={e => handleDeleteCategory(e, item?.id)}><Trash2 color='red' /></span>

              <Row>
                {
                  item?.allVideos.map((card)=>(

                    <Col className='p-3 mb-1 sm={12}'>
                    <VideoCard card={card} insideCategory={true} />
                    
                    </Col>
                  ))
                }
              </Row>

            </div>
          </div>

        ))
      }

      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <FloatingLabel className='mb-3' controlId="floatingid" label="ID">
              <Form.Control name='id' onChange={addCategoryForm} type="text" placeholder="Category ID" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingcategory" label="Category">
              <Form.Control name='name' onChange={addCategoryForm} type="text" placeholder="Category" />
            </FloatingLabel>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddcategory} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  )
}

export default Category