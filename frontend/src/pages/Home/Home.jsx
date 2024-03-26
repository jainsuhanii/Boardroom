import react from "react";
import styles from './Home.module.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const signInLinkStyle = {
    color:'0077ff',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '10px',
};
  const navigate = useNavigate();
  function startRegister(){
   navigate('/authenticate');
    console.log('button clicked...');
  }
    return (
    <div className ={styles.cardWrapper}>
      <Card title="Welcome to codershouse!" icon="logo"> 
      <p className = {styles.text}>
            CodersHouse is a platform for learning full stack web development. It is open to all. 
            It is a community of programmers who come together to learn and grow their programming skills. 
            We have a variety of courses including HTML, CSS, JavaScript, React, Node, MongoDB and many more. 
       </p>
       <div>
        <Button onClick={startRegister} text="Get your username" />
        </div>
      <div className={styles.signinWrapper}>
        <span className={styles.hasInvite}>
          Have an invite text? 
        </span>
      </div>
       </Card>
    
    </div>
    );     
}

  export default Home;