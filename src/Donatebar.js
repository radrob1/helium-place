import React from "react";
import Switch from "react-switch";
import QRCode from "react-qr-code";
export default class Donatebar extends React.Component {

  closeDonatebar = (e) => {
    e.preventDefault()
    const donatebar = document.getElementsByClassName('donatebar')[0]
    donatebar.classList.remove('open')
  }

  render() {
    return (
      <div className="donatebar">
        <div className="wrap">
          <section aria-labelledby="slide-over-heading">
            <div className="wrap">
              <div className="content">
                <div className="content-header-wrap">
                  <div className="content-header">
                    <div className="close-wrap">
                      <button onClick={this.closeDonatebar}>
                        <span className="sr-only">Close panel</span>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="content-body-wrap">
                  <div className="content-body">
                    <div className="donate">
                      <center>
                        <h4>Find this useful? Help support it! </h4>
                        <p>
                          HNT:
                            <a style={{ color: "blue" }} onClick={() => {
                            navigator.clipboard.writeText(
                              "139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp"
                            );
                          }}>
                            139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp
                            </a>
                        </p>
                        <center>
                          <p>
                            To send HNT to this address, open the Helium app and click Send then
                            click the qr code icon in the top left to scan this code using
                            your phone camera.
                          </p>
                          <QRCode size={100} value="139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp" />
                          <p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  "139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp"
                                );
                              }}
                            >
                              Copy address
                            </button>
                          </p>
                          <p>
                            Alternatively, you can copy the address above (click it to copy)
                            and paste it manually
                            into the Recipient Address field in the Helium app.
                          </p>
                          <p>Thank you for your support!</p>
                        </center>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div >
    );
  }
}
