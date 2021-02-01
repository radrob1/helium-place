import React, { useState } from "react";
import QRCode from "react-qr-code";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  

const Footer = () => {
    const [modal, setModal]  = useState(false);
    const modalOpen = () => {
        setModal(true);
    }
    
    const modalClose = () => {
        setModal(false);
    }

    return (
        <div className="footer">
            <center>
        <p>Find this useful? Help support it! </p> 
        <p>HNT: <a  onClick={modalOpen}> 139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp </a></p>
            <Modal open={modal} onClose={modalClose} center>
                <center>
                    <p>To send HNT to this address, open the Helium app and click Send.</p>
                    <p>Click the qr code icon in the top left to scan this code using your phone camera.</p>
                    <QRCode value="139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp" />
                    <p><button onClick={() => {navigator.clipboard.writeText("139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp")}}>139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp</button></p>
                    <p>Alternatively, you can copy the address above (click it to copy) and paste it manually</p>
                     <p>into the Recipient Address field in the Helium app.</p>
                    <p>Thank you for your support!</p>
                </center>
            </Modal>
        </center>
        </div>
    );
};

export default Footer;