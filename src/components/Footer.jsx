import { Col, Row } from "antd";
import { footer } from "./data.jsx";

function Footer() {
  return (
    <div>
      <footer className="footer page-wrapper">
        <div className="footer-wrap page">
          <Row>
            {footer.map((foot, index) => (
              <Col
                key={index.toString()}
                md={6}
                xs={24}
                className="footer-item-col"
              >
                <div className="footer-item">
                  <h2>
                    {foot.icon && (
                      <img
                        style={{ width: 50, marginRight: 16 }}
                        src={foot.icon}
                        alt="img"
                      />
                    )}
                    {foot.title}
                  </h2>
                  {foot.children.map((child) => (
                    <div key={child.link}>
                      <a target="_blank " href={child.link}>
                        {child.icon}
                        {child.title}
                        {child.desc && (
                          <span style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                            {" "}
                            - {child.desc}
                          </span>
                        )}
                      </a>
                    </div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className="footer-bottom">
          <div className="page">
            <Row>
              <Col
                md={4}
                xs={24}
                style={{ textAlign: "left" }}
                className="mobile-hide"
              >
                <a
                  href="https://www.hella.com/hella-com/en/"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{
                    color: "rgba(256, 256, 256, 0.9)",
                    textAlign: "left",
                  }}
                >
                  HELLA
                </a>
              </Col>
              <Col md={20} xs={24}>
                <span
                  className="mobile-hide"
                  style={{
                    lineHeight: "16px",
                    paddingRight: 12,
                    marginRight: 11,
                  }}
                >
                  <a href="" rel="noopener noreferrer" target="_blank">
                    hellaBookingTour@gmail.com
                  </a>
                </span>
                <span style={{ marginRight: 24 }} className="mobile-hide">
                  <a href="" rel="noopener noreferrer" target="_blank">
                    Fb: Hella Booking Tour
                  </a>
                </span>
                <span style={{ marginRight: 12 }}>Tele-phone: 0112233444</span>
                <span style={{ marginRight: 12 }}>Copyright © 20124</span>
              </Col>
            </Row>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
