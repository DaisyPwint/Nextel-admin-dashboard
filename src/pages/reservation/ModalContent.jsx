import styles from '../pages.module.css';
import CustomButton from "../../components/button/CustomButton";

const ModalContent = ({ title, content, onCancel, onConfirm, className }) => {
  return (
    <div className={styles["modal-container"]}>
      <h2>{title}</h2>
      <p>{content}</p>
      <div className={styles["button-container"]}>
        <CustomButton className={styles["no-button"]} onClick={onCancel}>
          No
        </CustomButton>
        <CustomButton className={className} onClick={onConfirm}>
          Yes
        </CustomButton>
      </div>
  </div>
  )
}

export default ModalContent