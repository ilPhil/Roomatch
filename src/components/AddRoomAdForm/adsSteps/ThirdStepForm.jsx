import { BsArrowLeftCircle } from "react-icons/bs";
import styles from "./ThirdStepForm.module.scss";
import { uploadImg } from "../../../libs/http";

const ThirdStepForm = ({ values, prevStep, setImage }) => {
  const submitFormData = (e) => {
    e.preventDefault();
    prevStep();
  };

  const photoGallery = (e) => {
    uploadImg(e.target.files[0]).then((result) => {
      setImage(result.data.display_url)
      console.log(values)
    }
    );
  };

  return (
    <div className={styles.containerForm}>
      <h4>Upload min. 3 pics</h4>
      {/* {values.roomPhotos.map((photo, index) => (
        <img src={photo} key={index} alt="roomatch" />
      ))} */}
      <form className={styles.flexForm} onSubmit={(e) => submitFormData(e)}>
        <div className={styles.img}>
          <label htmlFor="upload" className={styles.uploadBtn}>
            +
          </label>
        </div>
        <input
          type="file"
          onChange={(e) => photoGallery(e)}
          accept=".jpg, .jpeg, .png"
          placeholder="carica"
          name="upload"
          id="upload"
          title="Carica"
          className={styles.hidden}
        />
        <button className={styles.prevStep} onSubmit={prevStep}>
          <BsArrowLeftCircle />
        </button>
      </form>
    </div>
  );
};

export default ThirdStepForm;
