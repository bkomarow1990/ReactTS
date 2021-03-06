
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { IRegister } from "./types";
import { RegisterSchema } from "./validation";
import classNames from "classnames";
import axios from "axios";
import CropperDialog from "../../common/CropperDialog";
import { Constants } from "../../../constants";
import Swal from "sweetalert2";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom";

const RegisterPage = (props : any) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isBot, setIsbot] = useState<boolean>(false);
  const navigate = useNavigate();
  const initialValues: IRegister = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    password: "",
    confirmPassword: "",
  };

  const onHandleSubmit = async (values: IRegister) => {
    try{
      if(!executeRecaptcha){
        setIsbot(true);
        alert('bot');
        return;
      }
      const recaptchaToken = await executeRecaptcha();
      const model = {...values, RecaptchaToken: recaptchaToken};
      axios
      .post(Constants.apiUrl + "/api/Account/register", model)
      .then((data) => {
        console.log("data", data);
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Happy registration!",
        });
        navigate('/');
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
      });
    }
    catch(error){
      console.error("problem submit", error);
    }
    console.log(values);

  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: onHandleSubmit,
  });
  const { errors, touched, handleSubmit, handleChange, setFieldValue } = formik;

  //   const onChange = (e: any) => {
  //     e.preventDefault();
  //     let files;
  //     if (e.dataTransfer) {
  //         files = e.dataTransfer.files;
  //     } else if (e.target) {
  //         files = e.target.files;
  //     }
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //         setImage(reader.result as any);
  //     };
  //     reader.readAsDataURL(files[0]);
  // };

  return (
    <div className="row p-5">
      <div className="offset-md-3 col-md-6">
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.email && errors.email },
                  { "is-valid": touched.email && !errors.email }
                )}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password*
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.password && errors.password },
                  { "is-valid": touched.password && !errors.password }
                )}
              />
              {touched.password && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password*
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  {
                    "is-invalid":
                      touched.confirmPassword && errors.confirmPassword,
                  },
                  {
                    "is-valid":
                      touched.confirmPassword && !errors.confirmPassword,
                  }
                )}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.firstName && errors.firstName },
                  { "is-valid": touched.firstName && !errors.firstName }
                )}
              />
              {touched.firstName && errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.lastName && errors.lastName },
                  { "is-valid": touched.lastName && !errors.lastName }
                )}
              />
              {touched.lastName && errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.phone && errors.phone },
                  { "is-valid": touched.phone && !errors.phone }
                )}
              />
              {touched.phone && errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>

            <div className="mb-3">
              {/* <label htmlFor="photo" className="form-label">
                Photo
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                hidden
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.photo && errors.photo },
                  { "is-valid": touched.photo && !errors.photo }
                )}
              />
              {touched.photo && errors.photo && (
                <div className="invalid-feedback">{errors.photo}</div>
              )} */}
              <h3>Select profile picture</h3>
              <CropperDialog
                onChange={setFieldValue}
                field="image"
                error={errors.image}
                touched={touched.image}
                aspectRation={1 / 1}
              ></CropperDialog>
              {/* <img id="avatar-crop" src=""></img>  */}
              {/* <ImageCropper></ImageCropper> */}
              {/* <Cropper
                style={{ height: 400, width: "100%" }}
                initialAspectRatio={16 / 9}
                preview=".img-preview"
                guides={true}
                src={image}
                ref={imageRef}
                dragMode={"move"}
                checkOrientation={true}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
              <div>
                <div className="box" style={{ width: "50%", float: "right" }}>
                  <h1>Preview</h1>
                  <div
                    className="img-preview"
                    style={{ width: "100%", float: "left", height: 300 }}
                  />
                </div>
                <div className="box" style={{ width: "50%", float: "right" }}>
                  <h1>
                    <span>Crop</span>
                    <button style={{ float: "right" }} onClick={getCropData}>
                      Crop Image
                    </button>
                  </h1>
                  <img
                    style={{ width: "100%" }}
                    src={cropData}
                    alt="cropped image"
                  />
                </div>
              </div> */}
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};
export default RegisterPage;
