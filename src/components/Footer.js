import {LINKEDIN_LINK} from "../public/constants";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      Created By
      <span>❤️</span>
      <a className="linkedin-name" href={LINKEDIN_LINK} target="_blank">
        Shivaprasad Aili
      </a>
      <span>&copy;</span>
      {year}
      <strong>
        Shopee<span>Food</span>
      </strong>
    </div>
  );
};

export default Footer;