import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addvideo } from '../serviece/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Add() {

    const [uploaddata, setuploaddata] = useState({

        id: "", caption: "", thumbnail: "", url: ""

    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // define setInput function
    const setInput = (e) => {
        const { name, value } = e.target

        setuploaddata({ ...uploaddata, [name]: value })

    }

    console.log(uploaddata);

    // extract embedded url from youtube original url

    const extractUrl = (e) => {

        let youtubeurl = e.target.value

        if (youtubeurl.includes("v=")) {

            let index = youtubeurl.indexOf("v=")

            console.log(index);

            let videourl = youtubeurl.substring(index + 2, index + 13)

            console.log(videourl);

            let videodata = uploaddata

            videodata.url = `https://www.youtube.com/embed/${videourl}`

            setuploaddata(videodata)



        }

        console.log(uploaddata);

    }

    const handleAdd = async () => {

        const { id, caption, thumbnail, url } = uploaddata

        if (!id || !caption || !thumbnail || !url) {

            toast.warn("please fill the form completely")

        } else {

            // make api call

            const responce = await addvideo(uploaddata)

            if (responce.status >= 200 && responce.status < 300) {

                console.log(responce.data);

                setShow(false);

                toast.success("new video uploaded successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",

                })

            } else {


                toast.warn("provide a unique id !!!!!" , {
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

    return (
        <>

            <div onClick={handleShow} className='btn'>
                <PlusCircle color='black' size={90} />
            </div>


            {/* modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Video Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >

                        {/* id */}
                        <FloatingLabel className='mb-3' controlId="floatingid" label="id">
                            <Form.Control name='id' onChange={setInput} type="text" placeholder="uploading video id" />
                        </FloatingLabel>

                        {/* caption */}
                        <FloatingLabel className='mb-3' controlId="floatingcaption" label="uploading video caption">
                            <Form.Control name='caption' onChange={setInput} type="text" placeholder="video caption" />
                        </FloatingLabel>

                        {/* video cover image URL */}
                        <FloatingLabel className='mb-3' controlId="floatingimage" label="video cover image URL">
                            <Form.Control name='thumbnail' onChange={setInput} type="text" placeholder="video cover image URL" />
                        </FloatingLabel>

                        {/* uploading video link */}
                        <FloatingLabel className='mb-3' controlId="floatinglink" label="uploading video link ">
                            <Form.Control name='url' onChange={extractUrl} type="text" placeholder="video link " />
                        </FloatingLabel>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
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

export default Add