import React, { useEffect, useState } from 'react'
import { Card, CardGroup, Col, ListGroupItem, Row, ListGroup } from 'react-bootstrap'
import axios from 'axios';

function SuperAdminCar() {
      const [carsInfo, setcarsInfo] = useState([])

      useEffect(() => {
            getCarsInfo()
      }, [])

      let getCarsInfo = async () => {
            try {
                  let jwtToken = localStorage.getItem("jwtToken");
                  let token = `Bearer ${jwtToken}`
                  let res = await axios.get("http://localhost:8085/superAdmin/car/info", {
                        headers: {
                              'Authorization': token,
                        }
                  })
                  if (!res.data.error) {
                        setcarsInfo(res.data.carDetailsWithAdminName)
                  } else {
                        alert(res.data.message)
                  }
            } catch (error) {
                  alert("server problem please try later from superadmin")
            }

      }
      let powerSteering = "";
      let getSteering = (data) => {
            if (data) {
                  powerSteering = "true"
            } else {
                  powerSteering = "false"
            }
      }

      return (
            <div>
                  <CardGroup className='bg-secondary bg-gradient'>
                        <Row >
                              {carsInfo.map((car, index) => {
                                    getSteering()
                                    return (
                                          <Col key={index} className='mt-5'>
                                                <Card key={index} md={4} className='m-3' style={{ width: '25rem' }}>
                                                      <Card.Img variant="top" width={"24rem"} height={"150rem"} src={car.imageURL} />
                                                      <Card.Body>
                                                            <Card.Title>{car.name}</Card.Title>
                                                      </Card.Body>
                                                      <ListGroup className="list-group-flush">
                                                            <ListGroupItem>Brand Name:{car.company}</ListGroupItem>
                                                            <ListGroupItem className='bg-info bg-gradient'>Created By:{car.adminName}</ListGroupItem>
                                                            <ListGroupItem>Fuel Type:{car.fuelType}</ListGroupItem>
                                                            <ListGroupItem>Showromm Price:{car.showroomPrice}</ListGroupItem>
                                                            <ListGroupItem>Onroad Price:{car.onroadPrice}</ListGroupItem>
                                                            <ListGroupItem>Power Steering:{powerSteering}</ListGroupItem>
                                                            <ListGroupItem>Break System:{car.breakSystem}</ListGroupItem>
                                                            <ListGroupItem>Mileage:{car.mileage}</ListGroupItem>
                                                            <ListGroupItem>Seating Capacity:{car.seatingCapacity}</ListGroupItem>
                                                            <ListGroupItem>Engine Capacity:{car.engineCapacity}</ListGroupItem>
                                                            <ListGroupItem>Gear Type:{car.gearType}</ListGroupItem>

                                                      </ListGroup>
                                                </Card>
                                          </Col>)
                              })}
                        </Row>
                        <br></br>
                  </CardGroup>
            </div>
      )
}

export default SuperAdminCar