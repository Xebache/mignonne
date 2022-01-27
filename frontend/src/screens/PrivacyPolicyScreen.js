import React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { H2, H3, P, Li } from "../styles/GlobalStyles";

const PrivacyPolicyScreen = () => {
  return (
    <Container>
      <ListGroup as="ol" numbered variant="flush">
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <H2>
              Who is responsible for the processing of your personnal data ?
            </H2>
            <div className="my-2">
              <ul style={{ listStyle: "none" }}>
                <Li>adress</Li>
                <Li>phone number</Li>
                <Li>email</Li>
              </ul>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <H2>How do we collect information ?</H2>
            <div className="my-2">
              <ul>
                <li>
                  <div>
                    <H3>When you place an order online</H3>
                    <P>
                      We will gather all the information we need to process your
                      order (for example: name, email, postal address, biling
                      address, card number or other payment method details,
                      contact phone number). We also capture your IP address for
                      fraud check purpose only.
                    </P>
                    <P>
                      When you first place an order online, you will be given
                      the option to opt in for email marketing. We will not send
                      you email marketing unless you tick the box to ask us to
                      or unless you have asked us previously.
                    </P>
                    <P>
                      As with all sensitive data, we keep all these details
                      securely in our system. The exception is payment details
                      which are sent and managed securely by Paypal. We do not
                      keep a record of your credit card apart form the card type
                      and the last four digits as reference.
                    </P>
                  </div>
                </li>
                <li>
                  <div>
                    <H3>
                      When you choose to receive marketing communication from us
                    </H3>
                    <P>Using an online form (contact, newsletter)</P>
                  </div>
                </li>
                <li>
                  <div>
                    <H3>When you first sign up for emails</H3>
                    <P>
                      You can unsubscribe from the newsletter at any time by
                      clicking the unsubscribe link at the bottom of any email
                      or by contacting us.
                    </P>
                  </div>
                </li>
                <li>
                  <div>
                    <H3>When you contact customer services</H3>
                    <P>
                      We keep records of any communication we have with you so
                      that we are able to offer you the best service. By doing
                      so, we could refer to them later if needed. As weith al
                      sensitive data, it is kept securely.
                    </P>
                  </div>
                </li>
                <li>
                  <div>
                    <H3>Using cookies in our website</H3>
                    <P>
                      See the cookie policy for details about cookie and how we
                      use them.
                    </P>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <H2>How long will we keep your data ?</H2>
            <div className="my-2">
              <Li>
                You data will be kept as long as we have a contractual
                relationship or until you request its cancelation, as well as
                for the time needed to comply our legal obligations.
              </Li>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <H2>Why is your personnal data collected ?</H2>
            <div className="my-2">
              <ul>
                <Li>Managing orders and dealing with you</Li>
                <Li>
                  Provision of information to customers about offers and
                  commercial information from Mignonne
                </Li>
                <Li>
                  Boosting and improving communication by the website and the
                  brand through the sending of newsletters and special offers
                  based on the customer's preference as observed on the website.
                </Li>
                <Li>Improving the personalisation of the service provided</Li>
                <Li>Compliance with legal and statutory obligations</Li>
              </ul>
              <P className="my-2">
                All the data gathered for statistical and business purposes is
                used to optimize the website and the customer's experience. The
                customer has a right to access, rectify and oppose his personnal
                data.
              </P>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <H2>To who will your personnal data be communicated ?</H2>
            <div className="my-2">
              <P>
                Your personnal data will not be disclosed to any third party,
                except to those whose intervention is necessary for the correct
                management of the service provided (transport, payment, ...).
              </P>
              <P>
                Your data may also be disclosed to public authorities
                (administrative or judicial) if a legal regulation establishes
                it.
              </P>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <H2>What are you rights regarding your data ?</H2>
            <div className="my-2">
              <P>
                You have the right to access your personnal data(ask us what
                information we hold about you). You have the right to ask for
                your data to be deleted or modified. You have the right to ask
                us to stop processing your data. You have the right to stop
                receiving marketing from us.
              </P>
              <P>
                For any of these inqueries, please contact us. We are obliged to
                comply with your request and we will do so as quickly as
                possible.
              </P>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <H2>Cookies Policy</H2>
            <div className="my-2">
              <ul>
                <li>
                  <div>
                    <H3>Cookies</H3>
                    <P>
                      This website uses cookies.A cookie is a computer file
                      stored on the user's hard disk. It's purpose is to
                      highlight earlier visits by the user to the website.
                      Mignonne uses cookies only for the purpose of
                      personalising the user's experience on the site.
                    </P>
                    <P>
                      The user reserves the right to disable cookies by
                      configuring the settings on his/her browser. By doing so,
                      the user will no longer be able to use the personalised
                      service provided by Mignonne.
                    </P>
                  </div>
                </li>
                <li>
                  <div>
                    <H3>Web beacons</H3>
                    <P>
                      Some pages of the site may contain web beacons used to
                      count the number of visitors or to supply some indicators
                      to Mignonne.
                    </P>
                    <P>
                      In any event, the information obtained using these beacons
                      is strictly anonymous and is used merely to gather
                      statitistics for certain pages.
                    </P>
                  </div>
                </li>
                <li>
                  <div>
                    <H3>Comments</H3>
                    <P>
                      When visitors leave a comment on the website, we collect
                      the data from the form, the visitor's IP address and
                      user's browser agent string to help spam detection.
                    </P>
                  </div>
                </li>
              </ul>
              <P>
                If you leave a comment on our site, you may choose to save your
                name and email address in cookies. This is for your convenience
                so that you will not have to fill your details again when you
                leave another comment. These cookies will last for one year.
              </P>
              <P>
                If you have an account and log in to this site, we will set a
                temporary cookie to determine if your browser accepts cookies.
                This cookie contains no personal data and will be discarded when
                you close your browser.
              </P>
              <P>
                When you log in, we will also set up several cookies to save
                your login information. Login cookies last for one day. If you
                log out of your account, the login cookie will be removed.
              </P>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default PrivacyPolicyScreen;
