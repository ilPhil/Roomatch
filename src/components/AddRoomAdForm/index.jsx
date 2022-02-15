import styles from "./AddRoomAdForm.module.scss";
import { useState } from "react";
import FirstStepForm from "./adsSteps/FirstStepForm";
import SecondStepForm from "./adsSteps/SecondStepForm";
import ThirdStepForm from "./adsSteps/ThirdStepForm";
import HeaderAddRoomForm from "../HeaderAddRoomAdForm/HeaderAddRoomForm";

const initialForm = {
  roomType: "",
  // roomOwner: "",
  // roomAddress: "",
  // city: "",
  // town: "",
  roomPhotos: [],
  // roommates: {
  //   females: 0,
  //   males: 0,
  // },
  aboutFlat: {
    bedrooms: 0,
    bathrooms: 0,
    kitchen: 0,
    airCond: 0,
    billsIncl: 0,
    wifi: 0,
  },
  address: "",
  friendlyfor: {
    lgbtq: 0,
    multicultural: 0,
    pet_owner: 0,
    veg: 0,
    party_lover: 0,
    smooker: 0,
  },
  // ilike: [],
  // wholikesme: [],
  // matches: [],
};

const AddRoomAdForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const handleInputData = (input) => (e) => {
    setFormData({
      ...formData,
      [input]: e.target.value,
    });
  };
  const setImage = (input) => {
    setFormData({
      ...formData,
      roomPhotos: input,
    });
  };

  const handleInputPref = (input, e) => {
    // console.log(input, e.target.checked)
    setFormData({
      ...formData,
      aboutFlat: { ...formData.aboutFlat, [input]: e.target.checked ? 1 : 0 },
      friendlyfor: { ...formData.friendlyfor, [input]: e.target.checked ? 1 : 0 },
    });
  };

  switch (step) {
    case 1:
      return (
        <div className={styles.containerForm}>
          <HeaderAddRoomForm step={step} />
          <FirstStepForm
            nextStep={nextStep}
            handleFormData={handleInputData}
            handleInputPref={handleInputPref}
            values={formData}
          />
        </div>
      );
    case 2:
      return (
        <div className={styles.containerForm}>
          <HeaderAddRoomForm step={step} />
          <SecondStepForm
            prevStep={prevStep}
            nextStep={nextStep}
            handleFormData={handleInputData}
            handleInputPref={handleInputPref}
            values={formData}
          />
        </div>
      );
    case 3:
      return (
        <div className={styles.containerForm}>
          <HeaderAddRoomForm step={step} />
          <ThirdStepForm
            prevStep={prevStep}
            values={formData}
            setImage={setImage}
          />
        </div>
      );
    default:
      return (
        <div className={styles.containerForm}>
          <FirstStepForm
            nextStep={nextStep}
            handleFormData={handleInputData}
            values={formData}
          />
        </div>
      );
  }
};
export default AddRoomAdForm;
