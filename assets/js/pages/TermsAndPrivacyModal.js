import React, { Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function TermsAndPrivacyModal(props) {
  const toggle = () => props.setModalOpen(!props.modalOpen);
  return (
    <div>
      <Modal isOpen={props.modalOpen} toggle={toggle} className="modal-dialog">
        <ModalHeader toggle={toggle}>
          {props.privacyPolicy ? (
            <h2>Privacy Policy</h2>
          ) : (
            <h2>Terms &amp; Conditions</h2>
          )}
        </ModalHeader>
        <ModalBody className="modal-body">
          {props.privacyPolicy ? (
            <Fragment>
              <p>Last updated: 2021/08/28</p>
              <p>Wernix operates http://www.wernix.com</p>
              <p>
                This page informs you of our policies regarding the collection,
                use and disclosure of Personal Information we receive from users
                of the Site. We use your Personal Information only for providing
                and improving the Site.
              </p>
              <p>
                By using the Site, you agree to the collection and use of
                information in accordance with this policy.
              </p>
              <h4>Information Collection And Use</h4>
              <p>
                While using our Site, we may ask you to provide us with certain
                personally identifiable information that can be used to contact
                or identify you. Personally identifiable information may
                include, but is not limited to your name.
              </p>
              <h4>Log Data</h4>
              <p>
                Like many site operators, we collect information that your
                browser sends whenever you visit our Site ("Log Data"). This Log
                Data may include information such as your computer's Internet
                Protocol ("IP") address, browser type, browser version, the
                pages of our Site that you visit, the time and date of your
                visit, the time spent on those pages and other statistics. In
                addition, we may use third party services such as Google
                Analytics that collect, monitor and analyze this
              </p>
              <h4>Communications</h4>
              <p>
                We may use your Personal Information to contact you with
                newsletters, marketing or promotional materials and other
                information
              </p>
              <h4>Cookies</h4>
              <p>
                Cookies are files with small amount of data, which may include
                an anonymous unique identifier. Cookies are sent to your browser
                from a web site and stored on your computer's hard drive. Like
                many sites, we use "cookies" to collect information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our Site.
              </p>
              <h4>Security</h4>
              <p>
                The security of your Personal Information is important to us,
                but remember that no method of transmission over the Internet,
                or method of electronic storage, is 100% secure. While we strive
                to use commercially acceptable means to protect your Personal
                Information, we cannot guarantee its absolute security.
              </p>
              <h4>Changes To This Privacy Policy</h4>
              <p>
                This Privacy Policy is effective as of 2021/08/21 and will
                remain in effect except with respect to any changes in its
                provisions in the future, which will be in effect immediately
                after being posted on this page. We reserve the right to update
                or change our Privacy Policy at any time and you should check
                this Privacy Policy periodically. Your continued use of the
                Service after we post any modifications to the Privacy Policy on
                this page will constitute your acknowledgment of the
                modifications and your consent to abide and be bound by the
                modified Privacy Policy. If we make any material changes to this
                Privacy Policy, we will notify you either through the email
                address you have provided us, or by placing a prominent notice
                on our website.
              </p>
              <h4>Contact Us</h4>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us.
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <p>
                Please read these terms and conditions carefully before using
                Wernix.
              </p>

              <h4>Conditions of use</h4>

              <p>
                By using this website, you certify that you have read and
                reviewed this Agreement and that you agree to comply with its
                terms. If you do not want to be bound by the terms of this
                Agreement, you are advised to leave the website accordingly.
                Wernix only grants use and access of this website, its products,
                and its services to those who have accepted its terms.
              </p>

              <h4>Privacy</h4>
              <p>
                policy Before you continue using our website, we advise you to
                read our privacy policy regarding our user data collection. It
                will help you better understand our practices.
              </p>

              <h4>Age restriction</h4>
              <p>
                You must be at least 18 (eighteen) years of age before you can
                use this website or have parental permission. By using this
                website, you warrant that you are at least 18 years of age and
                you may legally adhere to this Agreement, or have parental
                permission. Wernix assumes no responsibility for liabilities
                related to age misrepresentation.
              </p>

              <h4>Intellectual property</h4>
              <p>
                You agree that all materials, products, and services provided on
                this website are the property of Wernix, its affiliates,
                directors, officers, employees, agents, suppliers, or licensors
                including all copyrights, trade secrets, trademarks, patents,
                and other intellectual property. You also agree that you will
                not reproduce or redistribute Wernix’s intellectual property in
                any way, including electronic, digital, or new trademark
                registrations. You grant Wernix a royalty-free and non-exclusive
                license to display, use, copy, transmit, and broadcast the
                content you upload and publish. For issues regarding
                intellectual property claims, you should contact the company in
                order to come to an agreement.
              </p>

              <h4>User accounts</h4>
              <p>
                As a user of this website, you may be asked to register with us
                and provide private information. You are responsible for
                ensuring the accuracy of this information, and you are
                responsible for maintaining the safety and security of your
                identifying information. You are also responsible for all
                activities that occur under your account or password. If you
                think there are any possible issues regarding the security of
                your account on the website, inform us immediately so we may
                address them accordingly. We reserve all rights to terminate
                accounts, edit or remove content and cancel orders at our sole
                discretion.
              </p>

              <h4>Applicable law</h4>
              <p>
                By visiting this website, you agree that the laws of the United
                States of America, without regard to principles of conflict
                laws, will govern these terms and conditions, or any dispute of
                any sort that might come between Wernix and you, or its business
                partners and associates.
              </p>

              <h4>Disputes</h4>
              <p>
                Any dispute related in any way to your visit to this website or
                to products you purchase from us shall be arbitrated by state or
                federal court in USA and you consent to exclusive jurisdiction
                and venue of such courts.
              </p>

              <h4>Indemnification</h4>
              <p>
                You agree to indemnify Wernix and its affiliates and hold Wernix
                harmless against legal claims and demands that may arise from
                your use or misuse of our services. We reserve the right to
                select our own legal counsel. Limitation on liability Wernix is
                not liable for any damages that may occur to you as a result of
                your misuse of our website. Wernix reserves the right to edit,
                modify, and change this Agreement at any time. We shall let our
                users know of these changes through electronic mail. This
                Agreement is an understanding between Wernix and the user, and
                this supersedes and replaces all prior agreements regarding the
                use of this website.
              </p>
            </Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
