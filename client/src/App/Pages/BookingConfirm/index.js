import { React, useState } from "react";
import { Button, Drawer, Space, message, Select } from "antd";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { getLoggedInUser } from "../../utils";
import { serviceOptions } from "../constants";

import "./styles.sass";

const BookingConfirm = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const { state } = useLocation();
  const data = state?.data;
  const date = dayjs(data?.date);
  let total = 0;
  let services = [];
  const numberRegex = new RegExp("/^\d*\.?\d*$/");
  const [open, setOpen] = useState(false);
  const [openCamDrawer, setOpenCamDrawer] = useState(false);
  const [thickness, setThickness] = useState(null);
  const [length, setLength] = useState(Math.floor(Math.random() * (15 - 7) ) + 7);
  const [playing, setPlaying] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  console.log("data", data);

  const startVideo = () => {
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName("app__videoFeed")[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = () => {
    setPlaying(false);
    let video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Please enter your hair thickness and length to finish booking ',
    });
  };

  const renderServiceItems = () => {
    return data.services.map((service) => {
      const item = findServiceItem(service);
      total += parseInt(item.price);
      services.push(item);
      return (
        <div className="item-info">
          <p>{item.label.replace(/ *\([^)]*\) */g, "")}</p>
          <p>{item.price}/=</p>
        </div>
      );
    });
  };

  const findServiceItem = (value) => {
    let serviceItem;
    console.log("serviceOptions", serviceOptions);
    serviceOptions.forEach((type) => {
      const item = type.options.find((option) => {
        console.log("optionval", option.value);
        console.log("val", value);
        return option.value === value;
      });
      if (item) {
        serviceItem = item;
      }
    });
    return serviceItem;
  };

  const renderSelectedServices = () => {
    let services = "";
    console.log("services", data.services);
    data.services.forEach((service) => {
      services +=
        findServiceItem(service).label.replace(/ *\([^)]*\) */g, "") + ", ";
    });
    return services;
  };

  const submitBooking = async () => {
    console.log(thickness, length)
    if(!length || length === "" || !thickness || numberRegex.test(length)){
      error();
      return;
    }
    try {
      let info = {
        id: user._id,
        empid: data.stylists,
        bookingDate: data.date,
        services: services,
        hair_thickness: thickness,
        hair_length: length,
        isPaid: false,
      };
      const res = await axios.post(
        `http://localhost:5500/api/appointment/${user._id}/${data.stylists}`,
        info
      );
      info = res.data.appointment;
      console.log("user appointments", res.data.appointment);
      navigate("/booking-summary", { state: { info } });
    } catch (error) {
      console.log(error);
    }
  };

  const setInput = (value) => {
    console.log("value", value)
    setThickness(value);
  };

  const onClose = () => {
    setOpenCamDrawer(false);
  };

  const renderBookingSection = () => {
    if (!data) {
      return <div>Please retry from home page</div>;
    }
    return (
      <div div className="booking-confirm-section background-theme">
        {contextHolder}
        <div className="date-time-info">
          <div className="date-time-item">
            <h4>Selected Time</h4>
            <div>
              <p>{date.format("h:mm A")}</p>
            </div>
          </div>
          <div className="date-time-item">
            <h4>Selected Date</h4>
            <div>
              <p>{date.format("DD/MM/YYYY")}</p>
            </div>
          </div>
        </div>
        <div className="selected-services-info">
          <h4>Selected Services</h4>
          <div>
            <p>{renderSelectedServices()}</p>
          </div>
        </div>
        <div className="measurements-info">
          <h4>Measurements</h4>
          <div className="measurement-item-wrapper">
            <div className="measurement-item">
              <Button
                size={"large"}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Thickness : Check
              </Button>
            </div>
            <div className="measurement-item">
              <Button
                size={"large"}
                onClick={() => {
                  setOpenCamDrawer(true);
                }}
              >
                Length: Check
              </Button>
            </div>
          </div>
        </div>
        <div className="price-info">
          {renderServiceItems()}
          <div className="item-totals">
            <p>Total</p>
            <p>{total}/=</p>
          </div>
        </div>
        <div className="btn-row">
          <Button size={"large"} type="primary" onClick={submitBooking}>
            Confirm Booking
          </Button>
        </div>
        <Drawer
          title="Instructions"
          placement="right"
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          <div className="service-drawer">
            <h6>
              Determining the thickness of hair can be done through a few simple
              steps:
            </h6>
            <ol>
              <br></br>
              <li>
                First, take a small section of hair, about the width of a
                pencil, and hold it up to a light source.
              </li>
              <br></br>
              <li>
                Observe the hair closely and notice the width of the hair shaft.
                If the hair appears to be thicker than the pencil lead, it is
                considered to be thick. If the hair appears to be thinner than
                the pencil lead, it is considered to be thin.
              </li>
              <br></br>
              <li>
                Another way to determine hair thickness is by feeling the hair
                between your fingers. If you can feel the hair easily and it
                seems to be coarse and strong, it is likely to be thick. If the
                hair feels fine and you can barely feel it, it is likely to be
                thin
              </li>
            </ol>

            <div>
              <b>
                <ExclamationCircleOutlined style={{ color: "red" }} />
                {" Keep in mind that hair thickness can also vary"}
                {" throughout the head, so it's important to take"}
                {" multiple measurements from different areas of"}
                {" the scalp to get an accurate overall assessment."}
              </b>
            </div>
            <div className="thickness-input">
              <Select
                style={{ width: 120 }}
                options={[
                  { value: 'thick', label: 'Thick' },
                  { value: 'thin', label: 'Thin' }
                ]}
                onChange={setInput}

              />
            </div>
            <br />
            <Button
              type="primary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Confirm Thickness
            </Button>
          </div>
        </Drawer>
        <Drawer
          title="Measure Length"
          placement="right"
          onClose={onClose}
          open={openCamDrawer}
        >
          <div>
            <video
              height={600}
              width= {600}
              autoPlay
              className="app__videoFeed"
            ></video>
            <div className="app__input">
              {playing ? (
                <><Button type="primary" onClick={stopVideo}>Stop</Button></>
              ) : (
                <><Button type="primary" onClick={startVideo}>Stop</Button></>
              )}
            </div>
            <div>Face the camera</div>
          </div>
        </Drawer>
      </div>
    );
  };

  return renderBookingSection();
};

export default BookingConfirm;

// 	return (
// 		<div className="app">
// 			<div className="app__container">
// 				<video
// 					height={HEIGHT}
// 					width={WIDTH}
// 					muted
// 					autoPlay
// 					className="app__videoFeed"
// 				></video>
// 			</div>
//
// 		</div>
// 	);
