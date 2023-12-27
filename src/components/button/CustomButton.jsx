import styles from './button.module.css';

const CustomButton = (props) => {
  const buttonClassName = props.className ? `${styles.button} ${props.className}` : styles.button;

  return (
    <button className={buttonClassName} type={props.type || 'button'} onClick={props.onClick}>{props.children}</button>
  )
}

export default CustomButton